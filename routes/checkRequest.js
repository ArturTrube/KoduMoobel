function requireAuth(userType) {
    return function(req, res, next) {

      if (!req.session || !req.session.user) {
        return res.redirect('/login');
      }
  
      if (req.session.user.type !== userType) {
        return res.redirect('/login');
      }
  
      next();
    };
  }
  
  module.exports = requireAuth;