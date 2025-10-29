const userService = require('../services/userService');

exports.login = (req, res) => {
  const { username, password } = req.body;
  if(!username || !password) return res.status(400).json({ error: 'usuário e senha são obrigatórios' });
  const user = userService.login(username, password);
  if(!user) return res.status(401).json({ error: 'credenciais inválidas' });
  req.session.user = { id: user.id, username: user.username, role: user.role };
  res.json({ message: 'ok', user: req.session.user });
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if(err) return res.status(500).json({ error: 'falha ao encerrar sessão' });
    res.json({ message: 'desconectado' });
  });
};
