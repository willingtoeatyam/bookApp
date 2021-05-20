const express = require('express');
const router = express.Router();
const BookCtrl = require('../controllers/bookControllers');
const { authenticateUser, checkIfAdmin } = require('../middlewares/authentication')

//POST request to /books to create a new book.
router.post('/books', authenticateUser, checkIfAdmin, BookCtrl.createNewBook)

//GET request to /books to fetch all books
router.get('/books', authenticateUser, BookCtrl.fetchAllBooks)

//GET request to /books/:id to fetch a single book
router.get('/books/:id', authenticateUser, BookCtrl.fetchSingleBook)

//PUT request to /books/:id to update a single book
router.put('/books/:id', authenticateUser, BookCtrl.updateSingleBook)

//DELETE request to /books/:id to delete
router.delete('/books/:id', authenticateUser, BookCtrl.deleteSingleBook)

module.exports = router;
