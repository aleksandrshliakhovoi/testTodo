const express = require('express');
const router = express.Router()
const User = require('../model/userModel')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('register.ejs')
})

router.post('/', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.userpassword, 10)

    const iduser = Date.now().toString(),
          username = req.body.username,
          useremail = req.body.useremail,
          userpassword = hashedPassword;

    await User.getUserByEmail(useremail)
    .then((result) => {
        if(result){
            res.render('error.ejs', {
                message: 'The email address is already in use. Please choose another one!'
            })
        } else {
            return result
        }	
    })
    .then(async () => {
        const user = new User(iduser, username, useremail, userpassword)
    
        await user.createUser()

        res.redirect('/login')
    })
})

module.exports = router