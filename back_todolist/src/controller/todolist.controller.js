const { env } = require('../config/env.js');
const { pool, testConnection } = require('../db/index.js');

async function createTask(req, res) {

    console.log('createTask');
}

//afficher toute les routes de la todolist

async function getTasks(req, res) {
    try {
        const [tasks] = await pool.query('SELECT * FROM tasks');
        console.log('Nombre de tâches:', tasks.length);
        console.log('Tâches:', tasks);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
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
}

async function updateTask(req, res) {
    console.log('updateTask');
}

async function deleteTask(req, res) {
    console.log('deleteTask');
}

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
