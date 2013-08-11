exports.login = function (req, res) {

  // check auth & redirect to main
  // if (req.session.sys_auth) {
  //   res.redirect('/');
  //   return;
  // }

  // navigation cookie for redirect after auth
  //res.cookie('back_after_auth', '/');
  
  // render login
  pool.getConnection(function (err,connection) {
    // body...
    
    connection.query('SELECT id, username,nickname FROM user where username = ? and password = ?',[req.body.username, req.body.password],function(err,rows) {
      // body...
      connection.end();
      if(err){
        res.setHeader('Content-Type', 'application/json;charset=UTF-8');
        res.statusCode = 401;
        res.json({error:{message:"login error"}});
        return;
      }
      if(rows == null || rows.length == 0){
        res.setHeader('Content-Type', 'application/json;charset=UTF-8');
        res.statusCode = 401;
        res.json({error:{message:"用户名或密码错误!"}});
        return;
      }
      pool.getConnection(function (error,connection) {
        // body...
        var login_key = uuid.v1();
        connection.query('insert into user_token set userId = ?, token =?',[rows[0].id,login_key],function (err,result) {
          connection.end();
          // body...
          if(err){
            res.json({error:{message:"login error!"}});
            return;
          }
         
          res.cookie('login_key', login_key);
          res.cookie('login_message',rows[0].id+","+rows[0].nickname);
          res.json({login_user_nickname:rows[0].nickname})
        })
        
      });
      
    })
  });
 
}

exports.checkLogin = function(req, res){

  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  if (!req.cookies.login_key) {
    res.statusCode = 401;
    res.json({error:{message:'need to login!'}});
    return;
  };
  
  res.statusCode = 200;
  res.json({});
}


