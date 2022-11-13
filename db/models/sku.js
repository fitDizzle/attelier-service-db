function Sku(id, styleId, size, quantity) {
  this.id = id;
  this.styleId = styleId;
  this.size = size;
  this.quantity = quantity;
};

module.exports = { Sku };