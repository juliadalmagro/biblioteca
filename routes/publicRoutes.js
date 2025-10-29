const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

router.get('/books', publicController.listBooks);
router.get('/book/:id', publicController.getBook);
router.get('/health', publicController.health);

module.exports = router;
