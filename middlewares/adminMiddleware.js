module.exports = function requireAdmin(req, res, next) {
  if(!req.session || !req.session.user || req.session.user.role !== 'admin') {
    return res.status(404).json({ error: 'Não encontrado' });
  }
  next();
};
