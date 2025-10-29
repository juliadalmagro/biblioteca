exports.requestLogger = (req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl, 'sessionUser=', req.session && req.session.user && req.session.user.username);
  next();
};
