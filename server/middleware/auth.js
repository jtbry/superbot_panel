function AuthMiddleware(req, res, next) {
  if(req.session.user) {
    next();
  } else {
    return res.sendStatus(403).end();
  }
}

module.exports = AuthMiddleware;
