const { v4: uuidv4 } = require('uuid');

const books = [
  { id: uuidv4(), title: 'A hipótese do amor', author: 'Ali Hazelwood', available: true },
  { id: uuidv4(), title: 'Um amor problemático de verão', author: 'Ali Hazelwood', available: true },
  { id: uuidv4(), title: 'É assim que acaba', author: 'Collen Hoover', available: true }
];

module.exports = {
  findAll() { return books; },
  findById(id) { return books.find(b => b.id === id); },
  add(book) {
    const newBook = { id: uuidv4(), ...book, available: true };
    books.push(newBook);
    return newBook;
  },
  update(id, data) {
    const b = books.find(x => x.id === id);
    if(!b) return null;
    b.title = data.title ?? b.title;
    b.author = data.author ?? b.author;
    return b;
  },
  remove(id) {
    const idx = books.findIndex(x => x.id === id);
    if(idx === -1) return false;
    books.splice(idx,1);
    return true;
  },
  setAvailability(id, available) {
    const b = books.find(x => x.id === id);
    if(!b) return null;
    b.available = !!available;
    return b;
  }
};
