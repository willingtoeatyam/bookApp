const jwt = require('jsonwebtoken');
require ('dotenv').config();
const { SECRET } = process.env;

exports.authenticateUser = (req, res, next) => {
    //check for authorization token
    if(!req.headers.authorization){
        return res.status(401).json({ message: 'authorization header required'})
    }
    //decode token
    let splitHeader = req.headers.authorization.split(' ');
    if(splitHeader[0] !== 'Bearer'){
        console.log(splitHeader);
        return res.status(401).json({message : 'Authorization format is Bearer <token>'})
    }    
    let token = splitHeader[1];
    //check if valid
    jwt.verify(token, SECRET, (err, decodedToken) => {
        if(err) return res.status(500).json({err});
        if (!decodedToken){
            return res.status(401).json({message: 'Invalid authorization token. Please Login'})
        }
        req.user = decodedToken;
        //allow user to continue with request
        next()
    }) 
}

exports.checkIfAdmin = (req, res, next) => {
    if (req.user.role !== 'admin'){
        return res.status(401).json({message: 'this route is restricted to admin users'})
    }
    return next()
}