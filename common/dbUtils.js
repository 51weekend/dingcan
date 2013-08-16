var mysql   = require('mysql');
var pool  = mysql.createPool({
  host            : '42.121.117.61',
  user            : 'dingcan',
  password        : 'woshiniye!82',
  database        : 'dingcan',
  connectionLimit :5,
  queueLimit      :10
});

/**
 * 执行sql语句，支持增删改查
 * Callback:
 * - err, 数据库异常
 * - result, 数据库操作结果
 * @param {String} sql sql语句
 * @param [Object] sql参数数组
 * @param {Function} callback 回调函数
 */
exports.executeSql = function(sql,sqlParamers,callback){
	pool.getConnection(function (err,connection) {
		if(err){
			return callback(err);
		}
		connection.query(sql,sqlParamers,function  (err,result) {
			connection.end();
			if(err){
				return callback(err);
			}

			callback(err,result);
		})
		
	});
}