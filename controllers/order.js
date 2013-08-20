var OrderDetail = require('../models/orderDetail');
var Restaurant = require('../models/restaurant');
var Order = require('../models/order');

exports.addCar = function(req,res,next) {
	// body...
	if(!req.cookies.nickname){
		res.send(400,{code:1024400,message:'请给自己起个名字'});
		return;
	}

	if(!req.body.order || req.body.order.length == 0){
		res.send(400,{code:1024401,message:'你够坏的，请先点餐!'});
		return;
	}

	if(!req.cookies.nickname){
		res.send(400,{code:1024400,message:'请给自己起个名字'});
		return;
	}

	//TODO 这里判断orderKey的有效性，
	if(!req.body.orderKey){
		res.send(400,{code:1024402,message:'无效的订餐链接'});
		return;
	}

	//TODO 价格不能信任提交上来的，从menu中读取
	OrderDetail.save(req.cookies.nickname,req.body.orderKey,req.body.order,function(err,result) {
		if(err){
			res.send(400,{code:1024405,message:'订餐出错，请重新提交.'});
			return;
		}
		res.send(200,{});
	});

}

exports.queryOrderByKey = function(req,res,next) {
	// body...
	if(!req.params.order_key){
		if(req.query.dataType =='json'){
			res.send(400,{code:1024400,message:'不正确的订餐链接'});
		}else{
			res.render('order',{code:1024400,message:'不正确的订餐链接'});
		}
		return;
	}

	OrderDetail.queryOrderByKey(req.params.order_key,function(err,orders) {
		if(err){
			if(req.query.dataType=='json'){
				res.send(500,{code:1024405,message:'服务忙，稍后再试.'})
			}else{
				res.render('order',{code:1024405,message:'服务忙，稍后再试.'});
			}
		}

		Restaurant.queryInfoByOrderKey(req.params.order_key,function(err,restaurants) {
			if(err){
				if(req.query.dataType=='json'){
					res.send(500,{code:1024405,message:'服务忙，稍后再试.'});
				}else{
					res.render('order',{code:1024405,message:'服务忙，稍后再试.'});
				}
			}
			if(req.query.dataType=='json'){
				res.send(200,{orders:orders,public_order_key:req.params.order_key,restaurant:restaurants[0]});
			}else{
				res.render('order',{orders:orders,public_order_key:req.params.order_key,restaurant:restaurants[0]});
			}
		})
		
	})
}

exports.account = function(req,res,next) {
	Order.account(req.params.userId,function(err,accounts) {
		if(err){
			res.render('account',{code:1024505,message:'出账失败.请联系管理员.'})
		}
		console.log(accounts);
		res.render('account',{accounts:accounts});

	})

}

exports.accountDetail = function(req,res,next){
	Order.accountDetail(req.query.username,function(err,details) {
		if(err){
			return res.send(500,{code:1024505,message:'查询账单明细出错.请联系管理员.'});
		}
		console.log(details);
		res.send(200,{details:details});

	})
}