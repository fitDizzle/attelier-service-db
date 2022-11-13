function Related(id, current_product_id, related_product_id) {
  this.id = id;
  this.current_product_id = current_product_id;
  this.related_product_id = related_product_id;
};

module.exports = { Related };