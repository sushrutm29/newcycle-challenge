const express = require('express');
const router = express.Router();
const dataFunc = require('../data');
const errors = require('../public/strings/errors');
const itemsData = dataFunc.items;
const usersData = dataFunc.users;
const xss = require('xss');

router.get('/create', async (req, res) => {
    try {
        res.status(200).render("pages/create", {
            partial: "create-scripts"
        });
    } catch (error) {
        res.status(404).json({Error: errors.PAGE_NOT_FOUND});
    }
});

router.post('/create', async (req, res) => {
    try {
        const itemName = xss(req.body.itemName, {
            whiteList: [], 
            stripIgnoreTag: true,
            stripIgnoreTagBody: []
        });
        const ownerName = xss(req.body.ownerName, {
            whiteList: [], 
            stripIgnoreTag: true,
            stripIgnoreTagBody: []
        });
        let owner = await usersData.getUserByName(ownerName);
        let item = await itemsData.addItem(itemName, owner.id);
        if(!item)
            throw new Error(errors.RESOURCE_NOT_FOUND);
        res.status(200).render("pages/create", {
            partial: "create-scripts"
        });
    } catch (error) {
        res.status(404).json({Error: error});
    }
});

module.exports = router;