

module.exports = function (app, routes, obj) {
  // auth form on site
  app.all('/order', obj.checkLogin);

  //app.get('/',  obj.checkLogin, routes.index);
  app.get('/', routes.index);

}