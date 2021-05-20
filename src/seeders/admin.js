const User = require('../models/user');
const bcrypt = require('bcrypt');
let password = 'eagleboi';  

exports.seedAdmin = () => {
    //check for admin accounts
    User.findOne({ role: 'admin' }, (err, admin) => {
        if(err) throw err;
        if (admin) {
            console.log('Admin Account Already Exists');
            return
        }
        User.create({
            firstName: 'Library',
            lastName: 'Bird',
            username: 'wonshitong',
            role: 'admin'
        }, (err, user) =>{
            if (err) throw err;
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.save((err, savedUser) => {
                        if (err) throw err;
                        console.log('Admin account created')
                    })
                })
            })
        })
    })
}

//create if none