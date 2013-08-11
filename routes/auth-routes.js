module.exports = function (app, obj) {
  // auth form on site
  app.post('/login', obj.login);


  app.get('/islogin', obj.checkLogin);

  // logout
  app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('back');
  });
}