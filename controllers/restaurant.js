
var Restaurant = require('../models/restaurant');

var Order = require('../models/order');

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
		res.send(500,{error: 'need login'});
		return;
	}
	var public_order_key = uuid.v1();
	Restaurant.generateOrderKey(login_message.id,req.params.restaurant_id,public_order_key,function (err,result) {
		// body...
		if(err){
			res.send(500, { error: err });
			return;
		}

		Restaurant.getMenuOfRestaurant(req.params.restaurant_id,function (err,menus) {
			if(err){
				console.error(err);
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


exports.publicOrder = function (req,res){
	console.log(req.params.public_order_key);
	Order.getOrderByOrderKey(req.params.public_order_key,function(err,order) {
		if(err){
			console.error(err);
			res.render('menu',{error:'服务忙,请稍后再试!'});
			return;
		}
		if(order == null || order.length == 0){
			res.render('menu',{error:'无效的订餐链接,请登录系统，重新生成订餐链接!'});
			return;
		}
		Restaurant.getMenuOfRestaurant(order[0].restaurantId,function (err,menus) {
			if(err){
				console.error(err);
				res.render('menu',{error:'服务忙,请稍后再试'});
				return;
			}

			res.render('menu',{menus: menus,
	            public_order_key:req.params.public_order_key,
	            restaurant:order[0].restaurantId})
		})
	});
}


exports.orderLink =  function (req,res) {
	res.json({link_code:uuid.v1()});
}