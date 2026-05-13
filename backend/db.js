const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || '34.172.113.167',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASS || 'mypassword',
  database: process.env.DB_NAME || 'notes_123210182',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
