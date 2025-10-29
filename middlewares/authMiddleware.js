module.exports = function requireAuth(req, res, next) {
  if(!req.session || !req.session.user) {
    return res.status(404).json({ error: 'Não encontrado' });
  }
  next();
};
