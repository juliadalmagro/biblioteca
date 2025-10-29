const userService = require('../services/userService');
const userRepo = require('../repositories/userRepository');

exports.me = (req, res) => {
  const user = userRepo.findById(req.session.user.id);
  if(!user) return res.status(404).json({ error: 'usuário não encontrado' });
  const { password, ...safe } = user;
  res.json(safe);
};

exports.requestLoan = (req, res) => {
  try {
    const loan = userService.requestLoan(req.session.user.id, req.params.bookId);
    res.json({ message: 'empréstimo realizado com sucesso', loan });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.returnLoan = (req, res) => {
  try {
    const ret = userService.returnLoan(req.session.user.id, req.params.bookId);
    res.json({ message: 'devolução realizada', returned: ret });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
