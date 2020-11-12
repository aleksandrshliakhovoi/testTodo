const mysql = require('mysql')
const pool = require('../configDB')


class Task {

    constructor(taskcontent, taskdeadline, idproject, taskstatus, ){
        this.taskcontent = taskcontent
        this.taskdeadline = taskdeadline
        this.taskstatus = taskstatus
        this.idproject = idproject
    }

    static getAllTasks() {
        
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM tasks', (err, data) => {
                if(err) {
                    reject(err)
                } else {
                    resolve (JSON.parse(JSON.stringify(data)));
                }
            })
        })
    }



    async createTask() {

        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO tasks (taskcontent, taskdeadline, idproject) VALUES(?,?,?)', 
            [this.taskcontent, this.taskdeadline, this.idproject], (err, data) => {
                if(err) {
                    reject (err)
                } else {
                    resolve()
                }
            })
        })
    }


    async editTask(id) {
        return new Promise((resolve, reject) => {
            pool.query("UPDATE tasks SET taskcontent=?, taskdeadline=? WHERE idtasks=?", 
            [this.taskcontent, this.taskdeadline, id], (err, data) => {
                if(err) {
                    reject (err)
                } else {
                    resolve()
                }
            })
        })    
    }


    static async deleteTask(id){
        
        pool.query('DELETE FROM tasks WHERE idtasks=?', [id], (err, data) => {
            if(err) throw err;
        })
    }


    static async getTaskById(id) {

        const tasks = await Task.getAllTasks()
        const queryTask = tasks.find(task => task.idtasks == id)
        //console.log(queryTask)
        return queryTask
    }
}



module.exports = Task