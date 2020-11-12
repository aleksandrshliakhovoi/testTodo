const mysql = require('mysql')
const pool = require('../configDB')

class User {

    constructor(iduser, username, useremail, userpassword){

        this.iduser = iduser
        this.username = username
        this.useremail = useremail
        this.userpassword = userpassword
    }

    async createUser() {

        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO users (iduser, username, useremail, userpassword) VALUES(?,?,?,?)', 
            [this.iduser, this.username, this.useremail, this.userpassword], (err, data) => {
                if(err) {
                    reject (err)
                } else {
                    resolve()
                }
            })
        })
    }

    static getAllUsers() {
        
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM users', (err, data) => {
                if(err) {
                    reject(err)
                } else {
                    resolve (JSON.parse(JSON.stringify(data)));
                }
            })
        })
    }

    static async getUserByEmail(email) {

        const allUsers = await User.getAllUsers()
        const currentId = allUsers.find(user => user.useremail == email)

        return currentId
    }


}

module.exports = User