const router = require('express').Router();
const File = require('../models/File');
const bcrypt = require("bcrypt");
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { upload, deleteFile } = require('../firebase');
const User = require("../models/User");
const {createAccessToken, checkSession, getUserData} = require('../controllers/auth.controllers');

router.route('/')
    .post(checkSession, async (req,res) => {
        let file = req.files.uploadedFile;
        console.log("File:", file);
        try{
            let {url, firebaseDir} = await upload(file);
            const newFile = await new File({
                userID: getUserData(req.headers.authorization)._id,
                desc: 'Una descripcion',
                hash: jwt.sign({ 'url': url }, process.env.TOKEN_SECRET),
                baseDir: firebaseDir
            });
            try{
                const file = await newFile.save();
            } catch(err){
                return res.status(400).json(err);
            }
            res.status(200).json(url);
        }catch(err){
            console.log(err)
            res.status(500).json(err);
        }
    })
    .delete(checkSession, async(req, res)=>{
        const id = req.body.fileID;
        const userData = getUserData(req.headers.authorization);
        const file = await File.findById(id);
        if(userData._id === file.userID || req.body.isAdmin){
            try {
                await File.findByIdAndDelete(id);
                await deleteFile(file.baseDir);
                res.status(200).json("File deleted");
            } catch (e) {
                return res.status(500).json(e);
            }
        }else{
            return res.status(403).json("You can only delete your files");
        }
    })
    //Get all your files
    .get(checkSession, async(req, res)=>{
        const userData = getUserData(req.headers.authorization);
        try {
            const userFiles = await File.find({ userID: userData._id });
            res.status(200).json(userFiles);
        } catch (err) {
            res.status(500).json(err);
        }
    });


module.exports = router;