const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))
app.use(express.json())


const homeRouter = require('./routes/homeRouter')

app.use('/', homeRouter)


const port = process.env.APP_PORT

app.listen(port, (error) => {
    console.log('Server started', new Date())
})
