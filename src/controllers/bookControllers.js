const Book = require('../models/book');


exports.createNewBook = (req, res) => {
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
}

exports.fetchAllBooks = (req, res) =>{
    Book.find({}, (err, books) => {
        if (err) {
            return res.status(500).json({message : err})
        } else {
            return res.status(200).json({books})
        }
    })
}

exports.fetchSingleBook = (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if (err) {
            return res.status(500).json({message : err})
        } else if(!book){
            return res.status(404).json({message : "book not found"})
        } else {
            return res.status(200).json({book})
        }
    })
}

exports.updateSingleBook = (req, res) => {
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
}

exports.deleteSingleBook = (req, res) =>{
    Book.findByIdAndDelete(req.params.id, (err, book) => {
        if (err) {
            return res.status(500).json({message : err})
        } else if(!book){
            return res.status(404).json({message : "Book not found"})
        } else {
            return res.status(200).json({message: "Book Deleted Successgully"})
        }
    })
}