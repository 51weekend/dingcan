var auth  = require('../models/auth');

var restaurant = require('../models/restaurant');

var RestaurantController = require('../controllers/restaurant');

module.exports = function (app) {
  app.all('/order', auth.checkLogin);

  app.get('/', function(req, res){
  	res.render('index', { title: 'Express' });
  });

  app.post('/login', auth.login);


  app.get('/islogin', auth.checkLogin);

  app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('back');
  });

  app.get('/restaurants', RestaurantController.index);

  app.get('/menu/:restaurant_id',RestaurantController.getMenuOfRestaurant);

  app.get('/public/order/:public_order_key',restaurant.publicOrder);

  app.post('/order/link',restaurant.orderLink);
}