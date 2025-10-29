const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const requireAuth = require('../middlewares/authMiddleware');

router.get('/me', requireAuth, userController.me);
router.post('/loan/:bookId', requireAuth, userController.requestLoan);
router.post('/return/:bookId', requireAuth, userController.returnLoan);

module.exports = router;
