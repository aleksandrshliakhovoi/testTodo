const express = require('express');
const router = express.Router()
const Task = require('../model/taskmodel');
const Project = require('../model/projectModel')
const User = require('../model/userModel')

router.get('/',   async (req, res) => {
    
    if (req.session.loggedin) {

        const projects = await Project.getAllProjects()
        const tasks = await Task.getAllTasks()
        const iduser = +req.session.iduser  

        res.render('project.ejs', {
            projects: projects,
            tasks: tasks,
            iduser: iduser
        })

	} else {
		res.redirect('login.ejs')
	}
    
})

router.post('/create',  async (req, res) => {

    if (req.session.loggedin) {
    
    const idproject = Date.now().toString()
    const projectName = req.body.projectname
    const iduser = req.body.iduser
    const project = new Project(projectName, idproject, iduser)

    await project.createProject()

    res.redirect('/')

    } else {
		res.send('Please login to view this page!');
	}
})

router.post('/edit/:idproject',  async (req, res) => {

    if (req.session.loggedin) {

        const projectName = req.body.projectname;
        const projectId = req.params.idproject
        const project = new Project(projectName, projectId)
    
        await project.editProject()
    
        res.redirect('/')
        
    } else {
		res.send('Please login to view this page!');
	}

})

router.post('/delete/:idproject',  async (req, res) => {

    if (req.session.loggedin) {

        await Project.deleteProject(req.params.idproject)
        res.redirect('/')

    } else {
		res.send('Please login to view this page!');
	}


})

module.exports = router