const express = require('express');
const router = express.Router()
const User = require('../model/userModel')
const pool = require('../configDB')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('login.ejs')
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    }) 
})

router.post('/', async (req, res) => {
    
	const useremail = req.body.useremail;
    const userpassword = req.body.userpassword;

	if (useremail && userpassword) {

		await User.getUserByEmail(useremail)
		.then((result) => {
			if(result){
				return result
			} else {
				res.render('error.ejs', {
					message: 'Incorrect Username!'
				})
			}	
		})
		.then(async (result) => {

			const isValid = await bcrypt.compare(userpassword, result.userpassword)

			if(isValid){
				req.session.loggedin = true;
				req.session.useremail = useremail;
				req.session.iduser = result.iduser
				res.redirect('/')
			} else {
				res.render('error.ejs', {
					message: 'Incorrect Password!'
				})
			}			
		})
	} else {
		res.render('error.ejs', {
			message: 'Please enter Username and Password!'
		})
	}
})

module.exports = router