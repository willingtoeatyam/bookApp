const mongoose = require('mongoose');

//Create Schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    description: String,
    category: {
        type: String,
        enum: ["fiction", "non-fiction", "comics", "others"]
    },
    purchaseCount: Number,
    imageUrl: String,
    tags: Array
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book;