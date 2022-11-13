const fs = require("fs");
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const source = process.env.DATABASE || 'attelier-product-db';
const client = new MongoClient(uri, { useUnifiedTopology: true });

// models
const { Product } = require('./models/product.js');
const { Feature } = require('./models/feature.js');
const { Photo } = require('./models/photo.js');
const { Sku } = require('./models/sku.js');
const { Related } = require('./models/related.js');
const { Style } = require('./models/style.js');

const campus = 'hr-rfc';

let parsedProducts = [];
let parsedStyles = [];
let parsedFeatures = [];
let parsedSkus = {};
let parsedRelated = [];
let parsedPhotos = [];
let parsedResults = [];

const loadData = async () => {

  await fs.createReadStream('db/data/features.csv', { encoding: "utf-8" })
    .on("data", (chunk) => {
      setTimeout(() => {

      }, 1000);

      let currentChunk = chunk.split(/\n/).map((x) => x.split(',')).map((chunk) => {
        const id = +chunk[0];
        const product_id = +chunk[1];
        const feature = chunk[2];
        const value = chunk[3];

        const newFeature = new Feature(id, product_id, feature, value);
        parsedFeatures.push(newFeature);

        return newFeature;
      });

      // console.log(parsedFeatures);
    })
    .on("error", (error) => {
      console.log(error);
    });

  await fs.createReadStream('db/data/photos.csv', { encoding: "utf-8" })
    .on("data", (chunk) => {
      setTimeout(() => {

      }, 1000);

      let currentChunk = chunk.split(/\n/).map((x) => x.split(',')).map((chunk) => {
        const id = chunk[0];
        const styleId = +chunk[1];
        const url = chunk[2];
        const thumbnail_url = chunk[3];

        const newPhoto = new Photo(id, styleId, url, thumbnail_url);
        parsedPhotos.push(newPhoto);

        return newPhoto;
      });

      // console.log(parsedPhotos);
    })
    .on("error", (error) => {
      console.log(error);
    });

  await fs.createReadStream('db/data/skus.csv', { encoding: "utf-8" })
    .on("data", (chunk) => {
      setTimeout(() => {

      }, 1000);

      let currentChunk = chunk.split(/\n/).map((x) => x.split(',')).map((chunk) => {
        const id = chunk[0];
        const styleId = chunk[1];
        const size = chunk[2];
        const quantity = chunk[3];

        const newSku = new Sku(id, styleId, size, quantity);
        parsedSkus[id] = { ...newSku };

        return newSku;
      });

      // console.log(parsedSkus);
    })
    .on("error", (error) => {
      console.log(error);
    });

  await fs.createReadStream('db/data/related.csv', { encoding: "utf-8" })
    .on("data", (chunk) => {
      setTimeout(() => {

      }, 1000);

      let currentChunk = chunk.split(/\n/).map((x) => x.split(',')).map((chunk) => {
        const id = +chunk[0];
        const current_product_id = +chunk[1];
        const related_product_id = +chunk[2];

        const newRelated = new Related(id, current_product_id, related_product_id);
        parsedRelated.push(newRelated);

        return newRelated;
      });

      // console.log(parsedRelated);
    })
    .on("error", (error) => {
      console.log(error);
    });

  await fs.createReadStream('db/data/styles.csv', { encoding: "utf-8" })
    .on("data", (chunk) => {
      setTimeout(() => {

      }, 1000);

      let currentChunk = chunk.split(/\n/).map((x) => x.split(',')).map((chunk) => {
        const style_id = +chunk[0];
        const productId = +chunk[1];
        const name = chunk[2];
        const sale_price = chunk[3];
        const original_price = chunk[4];
        const default_style = chunk[5] > 0;
        const photos = parsedPhotos.filter((photo) => photo.styleId === style_id);
        const skus = {};

        for (skew in parsedSkus) {
          if (parsedSkus[skew].styleId === style_id) {
            skus[skew] = parsedSkus[skew];
          }
        }

        // will equal style and style will include photos and skus

        const newStyle = new Style(style_id, productId, name, sale_price, original_price, default_style, photos, skus);
        parsedStyles.push(newStyle);

        return newStyle;
      });

      // console.log(parsedStyles);
    })
    .on("error", (error) => {
      console.log(error);
    });

  await fs.createReadStream('db/data/product.csv', { encoding: "utf-8" })
    .on("data", (chunk) => {
      setTimeout(() => {

      }, 1000);

      let currentChunk = chunk.split(/\n/).map((x) => x.split(',')).map((chunk) => {
        const id = +chunk[0];
        const name = chunk[1];
        const slogan = chunk[2];
        const description = chunk[3];
        const category = chunk[4];
        const default_price = chunk[5];
        const features = parsedFeatures.filter((feature) => feature.product_id === id);
        const results = parsedStyles.filter((style) => style.productId === id);
        const related = parsedRelated.filter((rel) => rel.current_product_id === id);

        const newProduct = new Product(id, campus, name, slogan, description, category, default_price, features, results, related);
        parsedProducts.push(newProduct);

        return newProduct;
      });

      // console.log(parsedProducts)
    })
    .on("error", (error) => {
      console.log(error);
    });

};

loadData();

async function seedData() {
  async function run() {
    console.log('attempting to seed');
    try {
      await client.connect();
      const products = await client.db(source).createCollection('products');
      parsedProducts.forEach((prod) => {
        products.insertOne({ ...prod });
      });
      console.log('done seeding db');
    } catch (err) {
      console.log(err);
    }
  }

  run().catch(console.dir);
}

seedData();