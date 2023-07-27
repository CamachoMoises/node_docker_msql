import express from 'express';
import { createPool } from 'mysql2/promise';
import { config } from 'dotenv';

config();

const pool = createPool({
	host: process.env.MYSQLDB_HOST,
	user: 'root',
	password: process.env.MYSQLDB_ROOT_PASSWORD,
	port: process.env.MYSQLDB_DOCKER_PORT,
});

const app = express();

app.get('/', (req, res) => {
	res.send('hola mundo');
});

app.get('/sqlDate', async (req, res) => {
	const result = await pool.query('SELECT NOW()');
	res.json(result[0]);
});

app.listen(process.env.NODE_DOCKER_PORT);
console.log('server listen on port', process.env.NODE_DOCKER_PORT);
