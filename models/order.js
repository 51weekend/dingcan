var dbUtils = require('../common/dbUtils.js');

exports.getOrderByOrderKey = function(orderKey,callback) {
	dbUtils.executeSql('select id,userId,restaurantId,type,orderKey,create_time from current_order where orderKey = ?',[orderKey],callback);
}