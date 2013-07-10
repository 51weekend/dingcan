module.exports = function (app, obj) {
  // auth form on site
  app.get('/login', obj.login);

  // logout
  app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('back');
  });
}