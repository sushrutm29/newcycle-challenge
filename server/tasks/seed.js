require('dotenv').config();
const pool = require('../config/db_connection');
const dataFunc = require('../data/');
const usersData = dataFunc.users;
const itemsData = dataFunc.items;
const moment = require('moment');

(async () => {
    try {
        // Create tables after dropping them if they already exist
        console.log("Creating tables...");
        await pool.query('DROP TABLE IF EXISTS items');
        await pool.query('DROP TABLE IF EXISTS users');
        await pool.query('DROP TABLE IF EXISTS analytics');
        await pool.query('CREATE TABLE users('+
            'id INT GENERATED ALWAYS AS IDENTITY UNIQUE,'+
            'name VARCHAR(50) NOT NULL'+
        ')');

        await pool.query('CREATE TABLE items('+
            'id INT GENERATED ALWAYS AS IDENTITY UNIQUE,'+
            'name VARCHAR(50) NOT NULL,'+
            'owner_id INT NOT NULL,'+
            'PRIMARY KEY(id),'+
            'CONSTRAINT fk_owner '+
                'FOREIGN KEY(owner_id) '+
                    'REFERENCES users(id) '+
                        'ON DELETE CASCADE'+
        ')');

        await pool.query('CREATE TABLE analytics('+
            'id INT GENERATED ALWAYS AS IDENTITY UNIQUE,'+
            'type VARCHAR(20) NOT NULL,'+
            'occurred_at TIMESTAMP NOT NULL'+
        ')');

        // Insert some sample values
        console.log("Populating tables...");
        let sushrut = await usersData.addUser('Sushrut');
        let gabriel = await usersData.addUser('Gabriel');
        let johan = await usersData.addUser('Johan');
        let chris = await usersData.addUser('Chris');

        await itemsData.addItem('Laptop', sushrut.id);
        await itemsData.addItem('iPhone', gabriel.id);
        await itemsData.addItem('Chair', chris.id);
        await itemsData.addItem('Table', johan.id);
        await itemsData.addItem('Microwave', chris.id);
        await itemsData.addItem('Oven', johan.id);
        await itemsData.addItem('Lamp', johan.id);

        //Insert some sample analytics
        let datePtr, daysAgo;
        for(let i=0; i<500; i++){
            daysAgo = Math.floor(Math.random() * 60);
            datePtr = moment().subtract(daysAgo, 'days').format('MMDDYYYY');
            await pool.query(`INSERT INTO analytics(type, occurred_at) VALUES('item_creation', TO_TIMESTAMP('${datePtr}', 'MMDDYYYY')) RETURNING id`);
        }

        console.log("Seed completed successfully!");
    } catch (err) {
        console.log(err.message);
    } finally{
        pool.end();
    }
})();