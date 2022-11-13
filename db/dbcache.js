const { run } = require('./client.js');

let productsCache = {};

const loadCache = async () => {
  const db = await run();
  let products = await db.collection('products').find({}).toArray();
  products.forEach((product) => {
    productsCache[product.id] = product;
  });
  return productsCache;
};

loadCache();

module.exports = { loadCache };