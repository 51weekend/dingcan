var Auth  = require('../controllers/auth');

var Restaurant = require('../controllers/restaurant');

module.exports = function (app) {
  app.all('/order', Auth.checkLogin);

  app.get('/', function(req, res){
  	res.render('index', { title: 'Express' });
  });

  app.post('/login', Auth.login);
  app.post('/login', Auth.genarateToken);

  app.get('/islogin', Auth.checkLogin);

  app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('back');
  });

  app.get('/restaurants', Restaurant.index);

  app.get('/menu/:restaurant_id',Restaurant.getMenuOfRestaurant);

  app.get('/public/order/:public_order_key',Restaurant.publicOrder);

  app.post('/order/link',Restaurant.orderLink);
}