const router = require('express').Router();
// const User = require('../models/User');
const bcrypt = require("bcrypt");
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const {createAccessToken, checkSession} = require('../controllers/auth.controllers');
const { upload } = require('../firebase');

router.route('/upload')
    .post((req,res) => {
        const file = "hola";
        upload(file);
    });


module.exports = router;