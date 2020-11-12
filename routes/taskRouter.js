const express = require('express');
const mysql = require('mysql')
const router = express.Router()
const pool = require('../configDB');
const Task = require('../model/taskmodel');
const User = require('../model/userModel')

router.get('/',  async (req, res) => {

        if (req.session.loggedin) {

            const tasks = await Task.getAllTasks()
            res.render('main.ejs', {
                tasks: tasks  
            })

        } else {
            res.send('Please login to view this page!');
        } 
    
})

router.post('/create', async (req, res) => {

    if (req.session.loggedin) {

        const taskcontent = req.body.task; 
        const idproject = +req.body.idproject;
        const taskdeadline  = new Date(req.body.date).toLocaleDateString()
        
        const task = await new Task(taskcontent, taskdeadline, idproject)
        await task.createTask()
    
        res.redirect('/')

    } else {
        res.send('Please login to view this page!');
    }
})


router.post('/edit', async (req, res) => {
    
    if (req.session.loggedin) {

        const taskcontent = req.body.task;
        const taskdeadline = new Date(req.body.date).toLocaleDateString()
        const id = req.body.idtasks;

        const task = new Task(taskcontent, taskdeadline)
        
        await task.editTask(id)


        res.redirect('/')

    } else {
        res.send('Please login to view this page!')
    }

})

router.post('/delete/:idtasks', async (req, res) => {

    if (req.session.loggedin) {
        await Task.deleteTask(req.params.idtasks)
        res.redirect('/')

    } else {
        res.send('Please login to view this page!');
    }
 })

module.exports = router