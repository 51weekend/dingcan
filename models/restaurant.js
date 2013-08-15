exports.getAllrestaurants = function (callback) {

	pool.getConnection(function(err, connection) {
		if(err){
			return callback(err);
		}

	  	connection.query( 'SELECT id,name,address,longitude,latitude,phone,description FROM restaurant', function(err, rows) {
		    connection.end();
		    if(err){
		    	return callback(err);
		    }
			callback(rows);
	  	});
	});
  
}

exports.generateOrderKey = function (userId,restaurant_id,public_order_key,callback) {

	//TODO 这里先实现集体点餐的逻辑	
	pool.getConnection(function (err,connection) {
		if(err){
			return callback(err);
		}
		connection.query('insert into current_order set userId = ?, restaurantId = ?, orderKey = ? , type = ?',[userId,restaurant_id,public_order_key, 'public'],function  (err,result) {
			connection.end();
			if(err){
				return callback(err);
			}

			callback(err,result);
		})
		
	});
}

exports.getMenuOfRestaurant = function(restaurantId,next) {
	pool.getConnection(function (err,connection) {
		if(err){
			return next(err);
		}
		connection.query('SELECT id,name,price,image,description,restaurant FROM menu where restaurant = ? ',[restaurantId],function menus(err,menus) {
			connection.end();
			if(err){
				return next(err);
			}
			next(err,menus);
		})

	})
}

exports.publicOrder = function (req,res){
	console.log(req.params.public_order_key);
}


exports.orderLink =  function (req,res) {
	res.json({link_code:uuid.v1()});
}