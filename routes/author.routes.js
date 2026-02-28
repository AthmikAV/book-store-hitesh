const express = require('express');
const router = express.Router();
const authorControllers = require('../controllers/authors.controllers');

router.get('/', authorControllers.getAuthors);
router.get('/:id', authorControllers.getAuthorById);
router.get('/:id/books',authorControllers.getAllBooksOfAuthor)
router.post('/', authorControllers.postAuthor);
router.delete('/:id',authorControllers.deleteAuthorById)


module.exports = router;