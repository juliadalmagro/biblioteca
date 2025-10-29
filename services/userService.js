const userRepo = require('../repositories/userRepository');
const bookService = require('./bookService');

module.exports = {
  login(username, password) {
    const user = userRepo.findByUsername(username);
    if(!user) return null;
    if(user.password !== password) return null;
    const { password: _, ...safe } = user;
    return safe;
  },
  createUser(userData) {
    return userRepo.add(userData);
  },
  updateUser(id, data) {
    return userRepo.update(id, data);
  },
  removeUser(id) {
    return userRepo.remove(id);
  },
  requestLoan(userId, bookId) {
    return bookService.borrow(bookId, userId);
  },
  returnLoan(userId, bookId) {
    return bookService.returnBook(bookId, userId);
  }
};
