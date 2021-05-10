const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
const { port, connectionurl } = process.env; //get sensitive info from .env file


//Mongoose Setup
mongoose.connect(connectionurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) =>{
    if (err) console.log(err);
    console.log('Connection Worked');
})

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

//POST request to /books to create a new book.
app.post('/books', (req, res) => {
    //retrieve new book details from  req.body
    Book.create({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        category: req.body.category,
        purchaseCount: req.body.purchaseCount,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags
    }, (err, newBook)=>{
        if (err) {
            return res.status(500).json({message: err})
        } else {
            return res.status(200).json({message : "New Book Created", newBook})
        }
    })
    //create new book and save to db

    //send response to client
})

//GET request to /books to fetch all books
app.get('/books', (req, res) =>{
    Book.find({}, (err, books) => {
        if (err) {
            return res.status(500).json({message : err})
        } else {
            return res.status(200).json({books})
        }
    })
})
//GET request to /books/:id to fetch a single book
app.get('/books/:id', (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if (err) {
            return res.status(500).json({message : err})
        } else if(!book){
            return res.status(404).json({message : "book not found"})
        } else {
            return res.status(200).json({book})
        }
    })
})

//PUT request to /books/:id to update a single book
app.put('/books/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, { 
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        category: req.body.category,
        purchaseCount: req.body.purchaseCount,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags
    }, (err, book) =>{
        if (err) {
            return res.status(500).json({message : err})
        } else if(!book){
            return res.status(404).json({message : "book not found"})
        } else {
            book.save((err, savedBook) => {
                if (err) {
                    return res.status(500).json({message : err})
                 } else {
                    return res.status(200).json({message : "vook updated succesfully"})
                }
            });
        }
    })
})

//DELETE request to /books/:id to delete
app.delete('/books/:id', (req, res) =>{
    Book.findByIdAndDelete(req.params.id, (err, book) => {
        if (err) {
            return res.status(500).json({message : err})
        } else if(!book){
            return res.status(404).json({message : "Book not found"})
        } else {
            return res.status(200).json({message: "Book Deleted Successgully"})
        }
    })
})

app.listen(port, ()=> console.log('Server is running'));