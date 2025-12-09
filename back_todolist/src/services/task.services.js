const { pool } = require('../db/index.js');
const { env } = require('../config/env.js');

async function createTask(titre, description, theme_id, status_id, priority_id, created_at,updated_at) {

    //validation de creation de notre task:
    if(!titre || !description || !theme_id || !status_id || !priority_id || !created_at || !updated_at) {
        const error = new Error('Tous les champs sont obligatoires');
        error.status = 400;
        throw error;
    }

    // notre sql pour la creation de notre task dans notre bd
    const query = 'INSERT INTO tasks (titre, description, theme_id, status_id, priority_id, created_at,updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    const [result] = await pool.query(query, [titre, description, theme_id, status_id, priority_id, created_at,updated_at]);

    return {
        id: result.insertId,
        titre: titre,
        description: description,
        theme_id: theme_id,
        status_id: status_id,
        priority_id: priority_id,
        created_at: created_at,
        updated_at: updated_at
    };
}

module.exports = { createTask };