var dbUtils = require('../common/dbUtils.js');

exports.save = function(nickname,orderKey,orders,callback) {
	// body...
	for(var i = 0 ;i<orders.length ; i++){
		dbUtils.executeSql('insert into order_detail set username = ?, menuId = ?, menuName = ? , price = ?,orderKey = ?',[nickname,orders[i].id,orders[i].name,orders[i].price,orderKey],function(err,result) {
			// body...
			if(err){
				callback(err);
				return;
			}
		})
	}

	callback();

}


exports.queryOrderByKey = function(order_key,callback) {
	dbUtils.executeSql('select id,username,menuId,menuName,price from order_detail where orderKey = ?',[order_key],callback);
}