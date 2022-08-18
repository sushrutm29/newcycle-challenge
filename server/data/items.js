const pool = require('../config/db_connection');
const errors = require('../public/strings/errors');
const analyticsData = require('./analytics');

module.exports = {
    getItemById: async (id) => {
        if (!id)
            throw new Error(errors.ARGUMENT_MISSING);
        let res = await pool.query(`SELECT * FROM items WHERE id=${id}`);
        if(!res || !res.rows.length === 0)
            throw new Error(errors.RESOURCE_NOT_FOUND);
        return res.rows[0];
    },
    getAllItems: async () => {
        let res = await pool.query(`SELECT * FROM items`);
        if(!res || !res.rows.length === 0)
            throw new Error(errors.RESOURCE_NOT_FOUND);
        return res.rows;
    },
    addItem: async (name, owner_id) => {
        if (!name || !owner_id)
            throw new Error(errors.ARGUMENT_MISSING);
        let res = await pool.query(`INSERT INTO items(name, owner_id) VALUES('${name}', ${owner_id}) RETURNING id`);
        if(!res)
            throw new Error(errors.INSERT_FAILED);
        await analyticsData.recordItemCreation();
        return res.rows[0];
    },
    transferItem: async (item_id, owner_id) => {
        if (!item_id || !owner_id)
            throw new Error(errors.ARGUMENT_MISSING);
        let res = await pool.query(`UPDATE items SET owner_id=${owner_id} WHERE id=${item_id}`);
        if(!res)
            throw new Error(errors.UPDATE_FAILED);
    }
};