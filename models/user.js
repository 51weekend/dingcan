var dbUtils = require('../common/dbUtils');

exports.register = function(username,password,nickname,phone,callback) {
	// body...
	dbUtils.executeSql('insert into user set username = ?, password = ?, nickname = ? , phone = ?',[username,password,nickname,phone],callback);
}