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
    //Get all your files and shared files
    .get(checkSession, async(req, res)=>{
        const userData = await User.findById(getUserData(req.headers.authorization)._id);
        try {
            const userFiles = await File.find({ userID: userData._id });
            const sharedUserFiles = await Promise.all(
                userData.sharedFiles.map(async (fileID) => {
                    const currFile = await File.findById(fileID);
                    console.log(currFile);
                    if(currFile) {
                        return currFile;
                    }else{
                        console.log("No encontre")
                        await userData.updateOne({$pull: {sharedFiles: fileID}});
                    }
                })
            );
            res.status(200).json(userFiles.concat(...sharedUserFiles));
        } catch (err) {
            res.status(500).json(err);
        }
    });

//Sharing a file to another user
router.route('/share')
    .post(checkSession, async (req, res) => {
        const userData = getUserData(req.headers.authorization);
        const sharedFileID = await File.findById(req.body.fileID);
        if(userData._id === sharedFileID.userID) {
            console.log("Sharing the file");
            const sharedUser = await User.findById(req.body.sharedUserID)
            if(!sharedUser.sharedFiles.includes(req.body.fileID)){
                await sharedUser.updateOne({$push: {sharedFiles: req.body.fileID}});
                res.status(200).json("File shared");
            }else{
                res.status(403).json("File was already shared");
            }
        }else{
            res.status(403).json("You can't share files that you don't own")
        }
    })
    .delete(checkSession, async (req, res) => {
        const userData = await User.findById(getUserData(req.headers.authorization)._id);
        if(userData.sharedFiles.includes(req.body.fileID)){
            await userData.updateOne({$pull: {sharedFiles: req.body.fileID}});
            res.status(200).json("File removed from your shared files");
        }else{
            res.status(403).json("File doesn't exists");
        }
    });

//Get a file
router.route('/:id')
    .get(checkSession, async(req, res) => {
        const userData = await User.findById(getUserData(req.headers.authorization)._id);
        const currFile = await File.findById(req.params.id);
        if(userData.id === currFile.userID || userData.sharedFiles.includes(req.params.id)) {
            const currUrl = jwt.verify(currFile.hash, process.env.TOKEN_SECRET).url;
            res.status(200).json(currUrl);
        }else{
            res.status(403).json("User has no access to the file");
        }
    });

module.exports = router;