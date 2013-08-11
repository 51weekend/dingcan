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
	
}

exports.publicOrder = function (req,res) {
	// body...
	var login_message = req.cookies.login_message
	if(!login_message){
		res.render('error',{error:{message:"need login"}});
	}

	var messages = login_message.split(",");
	console.log(messages[0]);

	// pool.getConnection(function (err,connection) {

	// 	// body...
	// 	connection.query('SELECT id,name,price,image,description,restaurant FROM menu where restaurant = ? ',[req.params.restaurant],function(err,rows) {
	// 		// body...
	// 		connection.end();
	// 		if(err){
	// 			res.render('error',{error:error});
	// 		}
	// 		//res.setHeader('Content-Type','application/json;charset=UTF-8');
	// 		res.render('menu', {
 //                menus: rows,
 //                restaurant:req.params.restaurant
 //            });
	// 	})
	// });
}

exports.orderLink =  function (req,res) {
	// body...
	console.log(uuid.v1());
	res.json({link_code:uuid.v1()});
}