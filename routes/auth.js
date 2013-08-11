exports.login = function (req, res) {

  // check auth & redirect to main
  // if (req.session.sys_auth) {
  //   res.redirect('/');
  //   return;
  // }

  // navigation cookie for redirect after auth
  //res.cookie('back_after_auth', '/');

  // render login
  res.cookie('user_login_key', "loginname", {maxAge:600000, httpOnly:true, path:'/', secure:true});
  res.render('login', {});
}

exports.checkLogin = function(req, res, next){

  console.log(req.cookies.user_login_key);

  if (!req.cookies.user_login_key) {
    res.setHeader('Content-Type', 'application/json;charset=UTF-8');
    res.statusCode = 401;
    res.json({error:{message:'need to login!'}});
    return;
  };

  next();

}


