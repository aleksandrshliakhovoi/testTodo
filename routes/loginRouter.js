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

router.post('/', function(req, res) {
    
	const useremail = req.body.useremail;
    const userpassword = req.body.userpassword;
	
	if (useremail) {
		pool.query(
            'SELECT * FROM users WHERE useremail = ?', 
            [useremail], 
            (error, results) => {
                handleData = JSON.parse(JSON.stringify(results))
                
			if (bcrypt.compare(userpassword, handleData[0].userpassword)) {
				req.session.loggedin = true;
                req.session.useremail = useremail;
				req.session.iduser = handleData[0].iduser
                
				res.redirect('/');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
		});
	} else {
		res.send('Please enter Username and Password!');
	}
});

module.exports = router