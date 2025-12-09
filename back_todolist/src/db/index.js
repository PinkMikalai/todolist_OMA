import mysql from 'mysql2/promise';
import { env } from '../env.js';

export const pool = mysql.createPool({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.database,
});

export async function testConnection() {
    const [rows] = await pool.query('SELECT NOW() AS now');
    console.log('co a mysql ok a, ' , rows[0].now);
}

