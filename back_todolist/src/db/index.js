const mysql = require('mysql2/promise');
const { env } = require('../config/env.js');

const pool = mysql.createPool({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.database,
});

async function testConnection() {
    const [rows] = await pool.query('SELECT NOW() AS now');
    console.log('co a mysql ok a, ' , rows[0].now);
}

module.exports = { pool, testConnection };

