import mysql from 'mysql2';
const dotenv = require('dotenv');
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
