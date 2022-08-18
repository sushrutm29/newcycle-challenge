const { Pool } = require('pg');

const connectionOptions = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT)
};

console.log("Connecting to database...");
const pool = new Pool(connectionOptions);

module.exports = pool;