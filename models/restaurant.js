var dbUtils = require('../common/dbUtils.js');

exports.getAllrestaurants = function (callback) {
	dbUtils.executeSql('SELECT id,name,address,longitude,latitude,phone,description FROM restaurant',[],callback);
}

exports.generateOrderKey = function (userId,restaurant_id,public_order_key,callback) {

	//TODO 这里先实现集体点餐的逻辑	
	dbUtils.executeSql('insert into current_order set userId = ?, restaurantId = ?, orderKey = ? , type = ?',[userId,restaurant_id,public_order_key, 'public'],callback);
}

exports.queryInfoByOrderKey = function(orderKey,callback){
	dbUtils.executeSql('SELECT r.id,r.name,r.address,r.phone FROM current_order co, restaurant r where co.orderKey = ? and co.restaurantId = r.id',[orderKey],callback);
}

exports.getMenuOfRestaurant = function(restaurantId,callback) {
	dbUtils.executeSql('SELECT id,name,price,image,description,restaurant FROM menu where restaurant = ? ',[restaurantId],callback);
}

exports.save = function(rname,address,phone,callback) {
	dbUtils.executeSql('insert into restaurant set name=?,address=?,phone=?',[rname,address,phone],callback);
}

exports.saveMenu = function(name,price,restaurant,callback){
	dbUtils.executeSql('insert into menu set name=?,price=?,restaurant=?',[name,price,restaurant],callback);
}
