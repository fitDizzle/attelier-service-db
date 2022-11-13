function Style(id, productId, name, sale_price, original_price, default_style, photos, skus) {
  this.id = id;
  this.productId = productId;
  this.name = name;
  this.sale_price = sale_price || null;
  this.original_price = original_price;
  this.default_style = default_style;
  this.photos = photos;
  this.skus = skus;
};

module.exports = { Style };