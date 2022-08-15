require('dotenv').config();
const pool = require('../config/db_connection');

(async () => {
    try {
        // Create item table after dropping it if it already exists
        console.log("Creating table...");
        await pool.query('DROP TABLE IF EXISTS items');
        await pool.query('CREATE TABLE items('+
            'id SERIAL PRIMARY KEY,'+
            'name VARCHAR(50) NOT NULL,'+
            'owner VARCHAR(50) NOT NULL'+
        ')');

        // Insert some sample items
        console.log("Populating table...");
        await pool.query("INSERT INTO items(name, owner) VALUES('Laptop', 'Sushrut')");
        await pool.query("INSERT INTO items(name, owner) VALUES('iPhone', 'Gabriel')");
        await pool.query("INSERT INTO items(name, owner) VALUES('Chair', 'Chris')");
        await pool.query("INSERT INTO items(name, owner) VALUES('Table', 'Johan')");
        await pool.query("INSERT INTO items(name, owner) VALUES('Microwave', 'Sushrut')");
        await pool.query("INSERT INTO items(name, owner) VALUES('Oven', 'Johan')");
        await pool.query("INSERT INTO items(name, owner) VALUES('Lamp', 'Gabriel')");

        console.log("Seed completed successfully!");
    } catch (err) {
        console.log(err.message);
    }
})();