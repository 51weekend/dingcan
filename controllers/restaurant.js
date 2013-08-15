
var Restaurant = require('../models/restaurant');

exports.index = function (req,res,next) {
	// body...
	Restaurant.getAllrestaurants(function (err, rows) {
		// body...
		if(err){
			res.json(err);
		}
	    res.json(rows);
	})
}

exports.getMenuOfRestaurant = function (req,res,next) {

	var login_message = req.cookies.login_message
	if(!login_message){
		res.send(500,{error: new Error('need login')});
		return;
	}

	var messages = login_message.split(",");
	var public_order_key = uuid.v1();
	Restaurant.generateOrderKey(messages[0],req.params.restaurant_id,public_order_key,function (err,result) {
		// body...
		if(err){
			res.send(500, { error: err });
			return;
		}

		Restaurant.getMenuOfRestaurant(req.params.restaurant_id,function (err,menus) {
			if(err){
				res.send(500, { error: err });
				return;
			}

			res.render('menu', {
				menus: menus,
	            public_order_key:public_order_key,
	            restaurant:req.params.restaurant_id
	        });
		})
	})
}