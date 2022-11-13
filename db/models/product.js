function Product(id, campus, name, slogan, description, category, default_price, features, results, related) {
  this.id = id;
  this.campus = campus;
  this.name = name;
  this.slogan = slogan;
  this.description = description;
  this.category = category;
  this.default_price = default_price;
  this.created_at = new Date(Date.now());
  this.updated_at = new Date(Date.now());
  this.features = [...features];
  this.results = [...results];
  this.related = [...related];
};

module.exports = { Product };