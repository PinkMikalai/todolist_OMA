const { env } = require('../config/env.js');
const { pool, testConnection } = require('../db/index.js');

async function createTask(req, res) {

    console.log('createTask');

    


}

//afficher toute les routes de la todolist

async function getTasks(req, res) {
    console.log('getTasks');
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
