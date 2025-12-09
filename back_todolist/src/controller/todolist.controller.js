const { env } = require('../config/env.js');
const { pool, testConnection } = require('../db/index.js');

async function createTask(req, res) {

    console.log('createTask');
}

//afficher toute les routes de la todolist

async function getTasks(req, res) {
    try {
        const [tasks] = await pool.query('SELECT * FROM tasks');
        console.log('Tâches:', tasks);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        //retourner les taches en json
        res.end(JSON.stringify({ 
            success: true,
            message: 'Taches récupérées avec succès',
            data: tasks || []
        }));
    } catch (error) {
        console.error('Erreur dans getTasks:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            success: false,
            message: 'Erreur lors de la récupération des taches',
            error: error.message
        }));
    }
}

//afficher todolist par son id
async function getTaskById(req, res) {
    console.log('getTaskById');

    try {

        //on recupere le task par son id
        const [task] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
        console.log(task);

        //on retourne le task en json
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            success: true,
            message: 'Tache récupérée avec succès',
            data: task
        }));

    }catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            success: false,
            message: 'Erreur lors de la récupération de la tache',
            error: error.message
        }));
        console.error('Erreur dans getTaskById:', error);
    }

}

async function updateTask(req, res) {
    console.log('updateTask');
}

async function deleteTask(req, res) {
    console.log('deleteTask');
}

module.exports = { 
    createTask, 
    getTasks, 
    getTaskById, 
    updateTask, 
    deleteTask
 };
