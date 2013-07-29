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