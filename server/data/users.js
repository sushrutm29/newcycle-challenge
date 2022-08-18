const pool = require('../config/db_connection');
const errors = require('../public/strings/errors');

module.exports = {
    getUserById: async (id) => {
        if (!id)
            throw new Error(errors.ARGUMENT_MISSING);
        let res = await pool.query(`SELECT * FROM users WHERE id=${id}`);
        if(!res || !res.rows.length === 0)
            throw new Error(errors.RESOURCE_NOT_FOUND);
        return res.rows[0];
    },
    getAllUsers: async () => {
        let res = await pool.query(`SELECT * FROM users`);
        if(!res || !res.rows.length === 0)
            throw new Error(errors.RESOURCE_NOT_FOUND);
        return res.rows;
    },
    addUser: async (name) => {
        if (!name)
            throw new Error(errors.ARGUMENT_MISSING);
        let res = await pool.query(`INSERT INTO users(name) VALUES('${name}') RETURNING id`);
        if(!res)
            throw new Error(errors.INSERT_FAILED);
        return res.rows[0];
    } 
};