var dbUtils = require('../common/dbUtils.js');

exports.getUserByNameAndPassword = function (username,password, callback) {
  	dbUtils.executeSql('SELECT id, username,nickname FROM user where username = ? and password = ?',[username, password],callback);
}

exports.genarateToken = function (userId,login_key,callback) {
	dbUtils.executeSql('update user_token set token = ?,update_time=now() where userId = ?',[login_key,userId],function(err,result) {
		// body...
		if(result.changedRows == 0){
  			dbUtils.executeSql('insert into user_token set userId = ?, token =?',[userId,login_key],callback);
		}
		callback(err,result);
	});
}

  

