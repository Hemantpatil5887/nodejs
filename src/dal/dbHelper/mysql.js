const mysql = require('mysql-await');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
});

connection.on(`error`, (err) => {
    console.error(`Connection error ${err.code}`);
});

// connection.end();

module.exports = connection;