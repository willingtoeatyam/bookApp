const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET, TOKEN_EXPIRY } = process.env;

exports.createToken = (user) =>{
    try {
        let token  = jwt.sign({
            id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        }, SECRET, {expiresIn: TOKEN_EXPIRY})
        return token
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.decodeToken = (token) => {
    try {
        let decodedToken = jwt.verify(token, SECRET);
        return decodedToken;
    } catch (error) {
        console.log(error);
        return null;        
    }
}