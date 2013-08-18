
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
		// res.send(500,{error: 'need login'});
		res.render('login');
		return;
	}
	var public_order_key = uuid.v1();
	Restaurant.generateOrderKey(login_message.id,req.params.restaurant_id,public_order_key,function (err,result) {
		// body...
		if(err){
			res.send(500, { error: err });
			return;
		}

		res.redirect('/public/order/'+public_order_key);
	})
}

exports.editRestaurantMenu = function (req,res,next) {
	// body...
	var login_message = req.cookies.login_message
	if(!login_message){
		// res.send(500,{error: 'need login'});
		return res.render('login');
	}
	Restaurant.getMenuOfRestaurant(req.params.restaurantId,function(err,result) {
		if(err){
			res.render('editMenu',{code:1024405,message:'服务忙，稍后再试.'});
		}
		res.render('editMenu',{menus:result,restaurant:req.params.restaurantId});
	})
}


exports.publicOrder = function (req,res){
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

exports.save =function(req,res,next) {
	if(req.method == 'GET'){
		return res.render('restaurant');
	}

	if(!req.body.name || !req.body.address || !req.body.phone){
		return res.render('restaurant',{code:102400,message:'必填参数不能为空.'})
	}
	Restaurant.save(req.body.name,req.body.address,req.body.phone,function(err,result) {
		if(err){
			return res.render('restaurant',{code:102400,message:'新增餐馆不成功，请稍后再试.'})
		}
		res.redirect('restaurant/'+result.insertId);
	});

}

exports.saveMenu = function(req,res,next) {
	if(!req.body.name || !req.body.price || !req.body.restaurant){
		return res.render('editMenu',{code:102400,message:'必填参数不能为空.',restaurant:req.body.restaurant})
	}
	Restaurant.saveMenu(req.body.name,req.body.price,req.body.restaurant,function(err,result) {
		if(err){
			console.error(err);
			return res.render('editMenu',{code:102400,message:'新增餐馆不成功，请稍后再试.',restaurant:req.body.restaurant})
		}
		res.redirect('restaurant/'+result.insertId);
	});
}