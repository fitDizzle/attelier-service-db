function Feature(id, product_id, feature, value) {
  this.id = id;
  this.product_id = product_id;
  this.feature = feature;
  this.value = value;
};

module.exports = { Feature };