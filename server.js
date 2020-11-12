const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const User = require('./model/userModel')
const session = require('express-session')
const MemoryStore = require('memorystore')(session)
app.use(express.static(__dirname + '/public'))

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

function addSessionVar (req, res, next) {
    res.locals.sessionIduser = req.session.iduser
    next()
}

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: 60 * 60 * 1000,
    store: new MemoryStore({
        checkPeriod: 86400000
      }),
  
}))

app.use(addSessionVar)

const taskRouter = require('./routes/taskRouter')
const projectRouter = require('./routes/projectRouter')
const loginRouter = require('./routes/loginRouter')
const registerRouter = require('./routes/registerRouter')


app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/', projectRouter)
app.use('/task', taskRouter)



app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
  });

const port = process.env.APP_PORT

app.listen(port, (error) => {
    console.log('Server started', new Date())
})
