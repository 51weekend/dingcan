
/*
 * GET home page.
 */
exports.index = function(req, res){

	pool.getConnection(function(err,connection){
		connection.query("SELECT * FROM fantuan.today_restaurant where DATE_FORMAT(order_date,'%Y-%m-%d') = CURDATE()",function(error,today_restaurant){
					            	connection.end();
					            	if(today_restaurant.length == 0){
					            		res.render('index', {error:'还没安排今天的饭团',menus:{}});
					            	}else{
					            		pool.getConnection(function(err, connection) {
									  		// Use the connection
									  		connection.query( 'SELECT * FROM menu where restaurant = ?',[today_restaurant[0].restaurant], function(err, rows) {
									    		// And done with the connection.
									    		connection.end();
									    		if (err) throw err;
									        res.render('index', { menus : rows});
									  			});
										});

					            	}
					            	

					            });
	});

	

};