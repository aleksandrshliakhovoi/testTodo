const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

// const pool = mysql.createPool({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     connectionLimit: 10
// })

const pool = mysql.createPool({
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'bd419084d34966',
    password: '94bd8da7',
    database: 'heroku_737034524489d85',
    connectionLimit: 10
})

module.exports = pool;