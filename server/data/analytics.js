const pool = require('../config/db_connection');
const errors = require('../public/strings/errors');
const jwt = require("jsonwebtoken");

module.exports = {
    recordItemCreation: async () => {
        let res = await pool.query(`INSERT INTO analytics(type, occurred_at) VALUES('item_creation', TO_TIMESTAMP(${Date.now()} / 1000.0)) RETURNING id`);
        if(!res)
            throw new Error(errors.ANALYTIC_FAILED);
        return res.rows[0];
    },
    recordOwnershipTransfer: async () => {
        let res = await pool.query(`INSERT INTO analytics(type, occurred_at) VALUES('ownership_transfer', TO_TIMESTAMP(${Date.now()} / 1000.0)) RETURNING id`);
        if(!res)
            throw new Error(errors.ANALYTIC_FAILED);
        return res.rows[0];
    },
    getFrameUrl: async (questionNumber) => {
        let payload = {
            resource: { question: questionNumber },
            params: {},
            exp: Math.round(Date.now() / 1000) + (10 * 60)
        };
        let token = jwt.sign(payload, process.env.METABASE_SECRET_KEY);
        let iframeUrl = process.env.METABASE_SITE_URL + "/embed/question/" + token + "#bordered=true&titled=true";
        return iframeUrl;
    }
};