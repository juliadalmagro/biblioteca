const userService = require('../services/userService');
const bookService = require('../services/bookService');
const userRepo = require('../repositories/userRepository');

// Livros - CRUD
exports.listBooks = (req, res) => {
  res.json(require('../repositories/bookRepository').findAll());
};
exports.createBook = (req, res) => {
  const { title, author } = req.body;
  if(!title || !author) return res.status(400).json({ error: 'título e autor são obrigatórios' });
  const b = bookService.add({ title, author });
  res.json({ message: 'livro adicionado', book: b });
};
exports.updateBook = (req, res) => {
  const updated = bookService.update(req.params.id, req.body);
  if(!updated) return res.status(404).json({ error: 'livro não encontrado' });
  res.json({ message: 'livro atualizado', book: updated });
};
exports.deleteBook = (req, res) => {
  const ok = bookService.remove(req.params.id);
  if(!ok) return res.status(404).json({ error: 'livro não encontrado' });
  res.json({ message: 'livro removido' });
};
exports.getBookWithBorrower = (req, res) => {
  const book = require('../repositories/bookRepository').findById(req.params.id);
  if(!book) return res.status(404).json({ error: 'livro não encontrado' });
  const borrower = bookService.getBorrower(req.params.id);
  res.json({ book, borrower }); // borrower null if nenhum
};

// Usuários - CRUD e alteração de role
exports.listUsers = (req, res) => {
  const users = userRepo.findAll().map(u=>({ id:u.id, username:u.username, role:u.role }));
  res.json(users);
};
exports.createUser = (req, res) => {
  const { username, password, role } = req.body;
  if(!username || !password) return res.status(400).json({ error: 'usuário e senha são obrigatórios' });
  const existing = userRepo.findByUsername(username);
  if(existing) return res.status(400).json({ error: 'usuário já existe' });
  const created = userService.createUser({ username, password, role: role || 'user' });
  res.json({ message: 'usuário criado', user: { id: created.id, username: created.username, role: created.role } });
};
exports.updateUser = (req, res) => {
  const updated = userService.updateUser(req.params.id, req.body);
  if(!updated) return res.status(404).json({ error: 'usuário não encontrado' });
  res.json({ message: 'usuário atualizado', user: { id: updated.id, username: updated.username, role: updated.role } });
};
exports.deleteUser = (req, res) => {
  const ok = userService.removeUser(req.params.id);
  if(!ok) return res.status(404).json({ error: 'usuário não encontrado' });
  res.json({ message: 'usuário removido' });
};
