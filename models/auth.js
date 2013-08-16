var dbUtils = require('../common/dbUtils.js');

exports.getUserByNameAndPassword = function (username,password, callback) {
  dbUtils.executeSql('SELECT id, username,nickname FROM user where username = ? and password = ?',[username, password],callback);
}

exports.genarateToken = function (userId,login_key,callback) {
  dbUtils.executeSql('insert into user_token set userId = ?, token =?',[userId,login_key],callback);
}

  

