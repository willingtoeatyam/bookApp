const mongoose = require('mongoose');

//Create Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    category: String,
    purchaseCount: Number,
    imageUrl: String,
    tags: Array
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book;