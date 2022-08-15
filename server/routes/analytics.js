const express = require('express');
const router = express.Router();
const iframeUrl = require('../config/metabase_connection');

router.get('/analytics', async (req, res) => {
    try {
        res.status(200).render("pages/analytics", {
            iframeUrl: iframeUrl,
            partial: "analytics-scripts"
        });
    } catch (error) {
        res.status(404).json({Error: "404 Page not found!"});
    }
});

module.exports = router;