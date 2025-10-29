const { v4: uuidv4 } = require('uuid');

const users = [
  { id: uuidv4(), username: 'admin', password: 'admin', role: 'admin', loans: [] },
  { id: uuidv4(), username: 'alice', password: 'password', role: 'user', loans: [] }
];

module.exports = {
  findAll() { return users; },
  findByUsername(username) { return users.find(u => u.username === username); },
  findById(id) { return users.find(u => u.id === id); },
  add(user) {
    const newUser = { id: uuidv4(), loans: [], ...user };
    users.push(newUser);
    return newUser;
  },
  update(id, data) {
    const u = users.find(x => x.id === id);
    if(!u) return null;
    u.username = data.username ?? u.username;
    if(data.password) u.password = data.password;
    if(data.role) u.role = data.role;
    return u;
  },
  remove(id) {
    const idx = users.findIndex(x => x.id === id);
    if(idx === -1) return false;
    users.splice(idx,1);
    return true;
  },
  addLoanToUser(userId, loan) {
    const u = users.find(x => x.id === userId);
    if(!u) return null;
    u.loans.push(loan);
    return u;
  },
  markReturn(userId, bookId) {
    const u = users.find(x => x.id === userId);
    if(!u) return null;
    const loan = u.loans.find(l => l.bookId === bookId && !l.returnedAt);
    if(!loan) return null;
    loan.returnedAt = new Date().toISOString();
    return loan;
  },
  findActiveLoan(userId, bookId) {
    const u = users.find(x => x.id === userId);
    if(!u) return null;
    return u.loans.find(l => l.bookId === bookId && !l.returnedAt);
  },
  findBorrowerOfBook(bookId) {
    // returns the user who currently has an active loan for bookId, or null
    for(const u of users) {
      const loan = u.loans.find(l => l.bookId === bookId && !l.returnedAt);
      if(loan) return { userId: u.id, username: u.username, loan };
    }
    return null;
  }
};
