function Photo(id,styleId,url,thumbnail_url) {
  this.id = id;
  this.styleId = styleId;
  this.url = url;
  this.thumbnail_url = thumbnail_url;
};

module.exports = { Photo };