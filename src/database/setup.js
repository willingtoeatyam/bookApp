
const mongoose = require('mongoose');
require('dotenv').config();
const { connectionurl } = process.env; //get sensitive info from .env file

module.exports= () => {
    //Mongoose Setup
    mongoose.connect(connectionurl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, (err) =>{
        if (err) throw console.log('err', err);
        console.log('Connection Worked');
    })
}