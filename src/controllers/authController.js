const user = require('../models/user')
const bcrypt = require('bcrypt');
const { createToken } = require('../services/jwtService')

exports.registerNewUser = (req, res) =>{
    //fetch details from req body
    //check if user actually exists
    user.findOne({ username: req.body.username}, (err, existingUser) => {
        if (err){
            return res.status(500).json({err})
        }
            if (existingUser){
                return res.status(400).json({message: 'A user with this username already exists'})
            }
    })
    //create a new user
    user.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username
    }, (err, newUser)=>{
        if (err){
            return res.status(500).json({err})
        }
        //hash user password
        bcrypt.genSalt(10, (err, salt) =>{
            if (err){
                return res.status(500).json({err})
            }
            bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                if (err){
                    return res.status(500).json({err})
                }
                //save password to db
                newUser.password = hashedPassword;
                newUser.save((err, savedUser) => {
                    if (err){
                        return res.status(500).json({err})
                    }
                    //create jwt for user
                    let token  = createToken(newUser);
                    if(!token) {
                        return res.status(500).json({ message: 'Sorry,we couldn/"t authenticate you'})
                    }
                    //send token to user
                    return res.status(200).json({
                        message: 'User Registration successful',
                        token
                    })
                })
            })
        })
    })
}

exports.loginUser = (req, res) => {
    //check if user exists
    user.findOne({ username: req.body.username}, (err, foundUser) => {
        if(err){
            return res.status(500).json({err})
        }
        if(!foundUser){
            return res.status(401).json({message: 'Incorrect Username'})
        } 
        //Check if password is correct
        let match = bcrypt.compareSync(req.body.password, foundUser.password)
        if(!match){
            return res.status(401).json({message: 'Incorrect Password'})
        }
        //create token
        let token  = createToken(foundUser);
        if(!token) {
            return res.status(500).json({ message: 'Sorry,we couldn/"t authenticate you'})
        }
        //Send token to user
        return res.status(200).json({
            message: 'User logged in',
            token 
        })
    })
}