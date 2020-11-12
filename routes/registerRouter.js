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

        const user = new User(iduser, username, useremail, userpassword)
        
        await user.createUser()

        res.redirect('/login')

    
})

module.exports = router