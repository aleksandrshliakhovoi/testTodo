const express = require('express');
const mysql = require('mysql')
const router = express.Router()

const pool = require('../configDB')


/**
 * routes
 */


router.get('/', (req, res) => {
    pool.query('SELECT * FROM tasks', (err, data) => {
        if(err) throw err;
        //res.json(data)
        
        data.forEach(el => {
            console.log(el.taskdeadline)
        })
        console.log(data)
        res.render('main.ejs', {
            tasks: JSON.parse(JSON.stringify(data))  // obj from mysql
        })
        
    })
})

router.get("/create", function(req, res){
   res.render("create.ejs");
});


router.post('/create', (req, res) => {
    console.log(req.body)
    if(!req.body) return res.sendStatus(400); // почему тут не равно...
    const taskcontent = req.body.task; // received from name
    const taskdeadline  = req.body.date; // перевести в уникс
    pool.query('INSERT INTO tasks (taskcontent, taskdeadline) VALUES(?,?)', [taskcontent, taskdeadline], (err, data) => {
       if(err) return console.log(err);
       res.redirect('/')
   })
})


router.get('/edit/:idtasks', (req, res) => {
   const id = req.params.idtasks  // why here req.params if in post req.body?
   console.log(id)
   pool.query('SELECT * FROM tasks WHERE idtasks=?', [id], (err, data) => {
       console.log(data)
       if(err) throw err;
       res.render('edit.ejs', {
           task: data[0]  //why here data 0???????
       });
   });
});


router.post('/edit', (req, res) => {
   
   if(!req.body) return res.sendStatus(400);
   
   const taskcontent = req.body.task;
   const taskdeadline = req.body.date;
   const id = req.body.idtasks;
   
   pool.query("UPDATE tasks SET taskcontent=?, taskdeadline=? WHERE id=?", [taskcontent, taskdeadline, id], (err, data) => {
       
       if(err) return console.log(err);
       
       res.redirect('/');
   });
});


router.post('/delete/:idtasks', (req, res) => {
   const id = req.params.id;
   pool.query('DELETE FROM tasks WHERE idtasks=?', [id], (err, data) => {
       if(err) throw err;
       res.redirect('/')
   });
});

module.exports = router