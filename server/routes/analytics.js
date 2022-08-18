const express = require('express');
const router = express.Router();
const dataFunc = require('../data');
const analyticsData = dataFunc.analytics;

router.get('/analytics', async (req, res) => {
    try {
        let itemCreationsUrl = await analyticsData.getFrameUrl(4);

        res.status(200).render("pages/analytics", {
            iframeUrl: itemCreationsUrl,
            partial: "analytics-scripts"
        });
    } catch (error) {
        res.status(404).json({Error: "404 Page not found!"});
    }
});

module.exports = router;