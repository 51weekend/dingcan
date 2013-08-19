var dbUtils = require('../common/dbUtils.js');

exports.getOrderByOrderKey = function(orderKey,callback) {
	dbUtils.executeSql('select id,userId,restaurantId,type,orderKey,create_time from current_order where orderKey = ?',[orderKey],callback);
}


exports.account = function(userId,callback){
	dbUtils.executeSql('SELECT o.username,sum(o.price) as price FROM current_order c inner join order_detail o on c.orderKey = o.orderKey and c.userId=? group by o.username order by price desc',[userId],callback);
}

exports.accountDetail = function(username,callback) {
	dbUtils.executeSql("SELECT menuName,DATE_FORMAT(create_time,'%Y-%m-%d') as createTime FROM dingcan.order_detail where username = ?",[username],callback);
}