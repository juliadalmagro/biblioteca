const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const requireAuth = require('../middlewares/authMiddleware');
const requireAdmin = require('../middlewares/adminMiddleware');

// livros CRUD
router.get('/livros', requireAuth, requireAdmin, adminController.listBooks);
router.post('/livros', requireAuth, requireAdmin, adminController.createBook);
router.put('/livros/:id', requireAuth, requireAdmin, adminController.updateBook);
router.delete('/livros/:id', requireAuth, requireAdmin, adminController.deleteBook);
router.get('/livros/:id/borrower', requireAuth, requireAdmin, adminController.getBookWithBorrower);

// usuários CRUD
router.get('/usuarios', requireAuth, requireAdmin, adminController.listUsers);
router.post('/usuarios', requireAuth, requireAdmin, adminController.createUser);
router.put('/usuarios/:id', requireAuth, requireAdmin, adminController.updateUser);
router.delete('/usuarios/:id', requireAuth, requireAdmin, adminController.deleteUser);

module.exports = router;
