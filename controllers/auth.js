var Auth = require('../models/auth');

exports.login = function (req,res,next) {

	Auth.getUserByNameAndPassword(req.body.username,req.body.password,function(err,rows) {
	      if(err){
	        res.setHeader('Content-Type', 'application/json;charset=UTF-8');
	        res.statusCode = 401;
	        res.json(err);
	        return;
	      }
	      if(rows == null || rows.length == 0){
	        res.setHeader('Content-Type', 'application/json;charset=UTF-8');
	        res.statusCode = 401;
	        res.json({error:"用户名或密码错误!"});
	        return;
	      }
	      req.session.user = rows[0];
	      next();
    });
}

exports.genarateToken = function (req,res,next) {
	var login_key = uuid.v1();
	var userId = req.session.user.id;

	Auth.genarateToken(userId,login_key,function (err,result) {

        if(err){
           	res.json(err);
           	return;
        }
         
        res.cookie('login_key', login_key);
        res.cookie('login_message',{id:userId,name:req.session.user.nickname});
        res.json({login_user_nickname:req.session.user.nickname})
    });
	
}

exports.checkLogin = function(req, res){
  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  if (!req.cookies.login_key) {
    res.statusCode = 401;
    res.json({error : 'need to login!'});
    return;
  };
  
  res.statusCode = 200;
  res.json({});
}