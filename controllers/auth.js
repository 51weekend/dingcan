var Auth = require('../models/auth');

exports.login = function (req,res,next) {

	Auth.getUserByNameAndPassword(req.body.username,req.body.password,function(err,rows) {
	      if(err){
	        res.setHeader('Content-Type', 'application/json;charset=UTF-8');
	        res.send(401,{error:err});
	        return;
	      }
	      if(rows == null || rows.length == 0){
	        res.setHeader('Content-Type', 'application/json;charset=UTF-8');
	        res.send(401,{error:"用户名或密码错误!"});
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
           	res.send(500, {error:err});
           	return;
        }
         
        res.cookie('login_key', login_key);
        res.cookie('login_message',{name:req.session.user.nickname,id:userId});
        res.cookie('nickname',req.session.user.nickname);
        res.send(200,{login_user_nickname:req.session.user.nickname});
    });
	
}

exports.checkLogin = function(req, res){
  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  if (!req.cookies.login_key) {
    res.send(401,{error : 'need to login!'})
    return;
  };
  
  res.send(200,{});
}

exports.setNickName = function(req,res,next) {
	res.setHeader('Content-Type', 'application/json;charset=UTF-8');
	if(!req.body.nickname){
		//TODO 定义一个错误类，错误码统一配置
		res.send(400,{code:102400,message:'你还挺坏的,来了就先给自己起个名字呗!'});
		return;
	}
	res.cookie('nickname',req.body.nickname);
	res.send(200,{});
}