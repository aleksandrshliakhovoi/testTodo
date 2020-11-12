const mysql = require('mysql')
const pool = require('../configDB')
const Task = require('./taskmodel');

class Project {
    constructor(projectName, projectId, iduser){
        this.projectName = projectName
        this.projectId = projectId
        this.iduser = iduser
    }

   static getAllProjects(){
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM projects', (err, data) => {
                if(err) {
                    reject(err)
                } else {
                    //console.log(JSON.parse(JSON.stringify(data)))
                    resolve (JSON.parse(JSON.stringify(data)));
                }
            })
        })
    }	

    async editProject() {
        
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE projects SET projectname=? WHERE idproject=?;`,
            [this.projectName, this.projectId], 
            (err, result) => {
                if(err) {
                    reject (err)
                } else {
                    resolve()
                }
            })
        })
    }

    static async deleteProject(id){

        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM projects WHERE idproject=?',
            [id],
            (err, data) => {
                if(err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    async createProject() {

        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO projects (projectname, idproject, iduser) VALUES(?,?,?)', 
            [this.projectName, this.projectId, this.iduser], (err, data) => {
                if(err) {
                    reject (err)
                } else {
                    resolve()
                }
            })
            
        })
    }
}


module.exports = Project