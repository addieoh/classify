const newsRoutes = require('news_routes');
const textRoutes = require('texts_routes');

module.exports = function(app, db) {
  newsRoutes(app, db);
  textRoutes(app, db);
};