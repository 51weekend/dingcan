var Auth  = require('../controllers/auth');
var Restaurant = require('../controllers/restaurant');
var Order = require('../controllers/order');

module.exports = function (app) {
  app.all('/order', Auth.checkLogin);

  app.get('/', function(req, res){
  	res.render('index', { title: 'Express' });
  });

  app.all('/register',Auth.register);
  app.post('/login', Auth.login);
  app.post('/login', Auth.genarateToken);

  app.get('/islogin', Auth.checkLogin);

  app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('back');
  });

  app.post('/addCar',Order.addCar);
  app.post('/setNickName',Auth.setNickName);

  app.get('/restaurants', Restaurant.index);
  app.all('/restaurant',Restaurant.save);
  app.get('/restaurant/:restaurantId',Restaurant.editRestaurantMenu)

  app.get('/menu/:restaurant_id',Restaurant.getMenuOfRestaurant);
  app.post('/menu',Restaurant.saveMenu);

  app.get('/public/order/:public_order_key',Restaurant.publicOrder);
  app.get('/order/:order_key',Order.queryOrderByKey);

  app.post('/order/link',Restaurant.orderLink);
  app.get('/:userId/account',Order.account);
  app.get('/accountDetail',Order.accountDetail);
}