import mysql from 'mysql2';

const password = process.env.DBPASSWORD;

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nejmi001!',
  database: 'blog',
});
