const bookRepo = require('../repositories/bookRepository');
const userRepo = require('../repositories/userRepository');

module.exports = {
  listAll() { return bookRepo.findAll(); },
  get(id) { return bookRepo.findById(id); },
  add(book) { return bookRepo.add(book); },
  update(id, data) { return bookRepo.update(id, data); },
  remove(id) { return bookRepo.remove(id); },
  borrow(bookId, userId) {
    const book = bookRepo.findById(bookId);
    if(!book) throw new Error('Livro não encontrado');
    if(!book.available) throw new Error('Livro já emprestado');
    bookRepo.setAvailability(bookId, false);
    const loan = { bookId, borrowedAt: new Date().toISOString(), returnedAt: null };
    userRepo.addLoanToUser(userId, loan);
    return loan;
  },
  returnBook(bookId, userId) {
    const active = userRepo.findActiveLoan(userId, bookId);
    if(!active) throw new Error('Empréstimo ativo não encontrado para este usuário e livro');
    userRepo.markReturn(userId, bookId);
    bookRepo.setAvailability(bookId, true);
    return { bookId, returnedAt: new Date().toISOString() };
  },
  getBorrower(bookId) {
    return userRepo.findBorrowerOfBook(bookId);
  }
};
