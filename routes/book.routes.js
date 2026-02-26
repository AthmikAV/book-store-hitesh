const express = require('express')

const router = express.Router();
const controllers = require("../controllers/books.controllers")

router.get('/',controllers.getAllBooks);
router.get('/:id', controllers.getBookById);
router.post('/', controllers.postBook);
router.delete('/:id',controllers.deleteBookById);


module.exports = router;