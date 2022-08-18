const express = require('express');
const router = express.Router();
const dataFunc = require('../data');
const itemsData = dataFunc.items;
const usersData = dataFunc.users;
const xss = require('xss');

router.get('/transfer', async (req, res) => {
    try {
        let items = await itemsData.getAllItems();
        let users = await usersData.getAllUsers();
        res.status(200).render("pages/transfer", {
            partial: "transfer-scripts",
            users: users,
            items: items
        });
    } catch (error) {
        res.status(404).json({Error: error});
    }
});

router.post('/transfer', async (req, res) => {
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
        let item = await itemsData.transferItem(itemName, owner.id);
        if(!item)
            throw new Error(errors.RESOURCE_NOT_FOUND);
        let items = await itemsData.getAllItems();
        let users = await usersData.getAllUsers();
        res.status(200).render("pages/transfer", {
            partial: "transfer-scripts",
            users: users,
            items: items
        });
    } catch (error) {
        res.status(404).json({Error: error});
    }
});

module.exports = router;