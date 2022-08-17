const Log = require("../models/Log");
const router = require('express').Router();


router.route('/')
    .get(async (req, res) => {
        try {
            const logs = await Log.find({});

            return res.status(200).json(logs);
        } catch (err) {
            res.status(500).json({ "message": err });
            console.log(err)
        }
    });

module.exports = router;