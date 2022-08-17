const Log = require("../models/Log");
const router = require('express').Router();
const { createAccessToken, checkSession, getUserData } = require('../controllers/auth.controllers');


router.route('/')
    .get(checkSession, async (req, res) => {
        try {

            if(! req.body.userData.isAdmin){
                return res.status(403).json({ "message": "No es usuario administrador"  });    
            }

            const logs = await Log.find({});

            return res.status(200).json(logs);
        } catch (err) {
            res.status(500).json({ "message": err });
            console.log(err)
        }
    });

module.exports = router;