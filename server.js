const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
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

// Book.create({
    
// }, (err, book)=> {
//     if (err) console.log(err);
//     console.log(book);
// })

app.listen(port, ()=> console.log('Server is running'));