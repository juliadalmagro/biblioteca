const bookService = require('../services/bookService');

exports.listBooks = (req, res) => {
  res.json(bookService.listAll());
};

exports.getBook = (req, res) => {
  const book = bookService.get(req.params.id);
  if(!book) return res.status(404).json({ error: 'livro não encontrado' });
  res.json(book);
};

exports.health = (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
};
