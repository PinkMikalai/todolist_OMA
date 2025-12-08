import { env } from '../config/env.js';
import { pool, testConnection } from '../db/index.js';

export async function createTask(req, res) {

    console.log('createTask');

    


}

//afficher toute les routes de la todolist

export async function getTasks(req, res) {
    console.log('getTasks');
}

//afficher todolist par son id
export async function getTaskById(req, res) {
    console.log('getTaskById');
}