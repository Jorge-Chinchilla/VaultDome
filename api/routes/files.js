const router = require('express').Router();
// const User = require('../models/User');
const bcrypt = require("bcrypt");
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const {createAccessToken, checkSession} = require('../controllers/auth.controllers');
const { upload } = require('../firebase');

router.route('/upload')
    .post(async (req,res) => {
        let file = req.files.uploadedFile;
        console.log("File:", file);
        try{
            let url = await upload(file);
            res.status(200).json(url);
        }catch(err){
            console.log(err)
            res.status(500).json(err);
        }
        

    });


module.exports = router;