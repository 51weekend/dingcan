var Auth = require('../models/auth');
var User = require('../models/user');

exports.login = function (req,res,next) {

	Auth.getUserByNameAndPassword(req.body.username,req.body.password,function(err,rows) {
	      if(err){
	        res.send(401,{error:err});
	        return;
	      }
	      if(rows == null || rows.length == 0){
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
  if (!req.cookies.login_key) {
    res.send(401,{error : 'need to login!'})
    return;
  };
  
  res.send(200,{});
}

exports.setNickName = function(req,res,next) {
	if(!req.body.nickname){
		throw new Error('你还挺坏的,来了就先给自己起个名字呗auth!');
	}
	res.cookie('nickname',req.body.nickname);
	if (req.xhr) {
	    res.send(200,{});
	} else {
	  	res.render('index');
	}
	
}


exports.register = function (req,res,next) {
	if(req.method == 'GET'){
		res.render('register');
		return;
	}
	if(!req.body.username || !req.body.password || !req.body.nickname || !req.body.phone){
		res.render('register',{code:102400,message:'请填写正确的参数'});
		return;
	}
	User.register(req.body.username,req.body.password,req.body.nickname,req.body.phone,function(err,result) {
		// body...
		if(err){
			console.error(err);
			res.render('register',{code:1024401,message:'注册限制，请稍后再试.'});
			return;
		}

		res.render('index');
	})
}