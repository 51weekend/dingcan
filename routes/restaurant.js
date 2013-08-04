exports.restaurants = function (req, res) {

	pool.getConnection(function(err, connection) {
	  // Use the connection
	  connection.query( 'SELECT id,name,address,longitude,latitude,phone,description FROM fantuan.restaurant', function(err, rows) {
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
	pool.getConnection(function (err,connection) {
		// body...
		console.log(req.params.restaurant_id);
		connection.query('SELECT id,name,price,image,description,restaurant FROM fantuan.menu where restaurant = ? ',[req.params.restaurant_id],function(err,rows) {
			// body...
			connection.end();
			console.log(err);
			if(err){
				res.render('error',{error:error});
			}
			//res.setHeader('Content-Type','application/json;charset=UTF-8');
			res.render('menu', {
                menus: rows,
                restaurant:req.params.restaurant_id
            });
		})
	});
}

exports.orderLink =  function (req,res) {
	// body...
	console.log(uuid.v1());
	res.json({link_code:uuid.v1()});
}