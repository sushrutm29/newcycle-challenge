const express = require('express');
const router = express.Router();

router.get('/transfer', async (req, res) => {
    try {
        res.status(200).render("pages/transfer", {
            partial: "transfer-scripts"
        });
    } catch (error) {
        res.status(404).json({Error: "404 Page not found!"});
    }
});

module.exports = router;