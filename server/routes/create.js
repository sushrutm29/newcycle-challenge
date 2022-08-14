const express = require('express');
const router = express.Router();

router.get('/create', async (req, res) => {
    try {
        res.status(200).render("pages/create", {
            partial: "create-scripts"
        });
    } catch (error) {
        res.status(404).json({Error: "404 Page not found!"});
    }
});

module.exports = router;