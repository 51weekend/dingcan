module.exports = function (app, obj) {
  // auth form on site
  app.get('/restaurants', obj.restaurants);

  app.get('/menu/:restaurant_id',obj.menu);

  app.post('/order/link',obj.orderLink);

}