exports.restaurants = function (req, res) {

	pool.getConnection(function(err, connection) {
	  // Use the connection
	  connection.query( 'SELECT id,name,address,longitude,latitude,phone,description FROM restaurant', function(err, rows) {
	    // And done with the connection.
	    connection.end();
	    
		res.setHeader('Content-Type', 'application/json;charset=UTF-8');
	    res.json({restaurants: rows});

	    // Don't use the connection here, it has been returned to the pool.
	  });
	});
  
}

exports.menu = function (req,res) {
	// body...
	var login_message = req.cookies.login_message
	if(!login_message){
		res.render('error',{error:{message:"need login"}});
	}

	var messages = login_message.split(",");
	//TODO 这里先实现集体点餐的逻辑	
	pool.getConnection(function (err,connection) {
		// body...
		var public_order_key = uuid.v1();
		connection.query('insert into current_order set userId = ?, restaurantId = ?, orderKey = ? , type = ?',[messages[0],req.params.restaurant_id,public_order_key, 'public'],function  (err,result) {
			// body...
			if(err){
				console.log(err);
				connection.end();
				res.render('error');
				return;
			}

			connection.query('SELECT id,name,price,image,description,restaurant FROM menu where restaurant = ? ',[req.params.restaurant_id],function(err,rows) {
			// body...
			connection.end();
			//res.setHeader('Content-Type','application/json;charset=UTF-8');
			res.render('menu', {
                menus: rows,
                public_order_key:public_order_key,
                restaurant:req.params.restaurant_id
            });
		})
		})

		
	});
}

exports.publicOrder = function (req,res) {
	// body...
	//TODO 去掉这个方法,没有任何作用.
	res.json({restaurant:req.params.restaurant});
}

exports.orderLink =  function (req,res) {
	// body...
	console.log(uuid.v1());
	res.json({link_code:uuid.v1()});
}