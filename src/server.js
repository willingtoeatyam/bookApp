const express = require('express');
const app = express();
require('dotenv').config();
const { port } = process.env; //get sensitive info from .env file
const dbSetup = require('./database/setup');
const bookRoutes = require('./routes/bookRoutes')

app.use(express.json());

//DB Setup
dbSetup();

app.use(bookRoutes)

app.listen(port, ()=> console.log('Server is running'));