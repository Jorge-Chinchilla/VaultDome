const router = require('express').Router();
const File = require('../models/File');
const bcrypt = require("bcrypt");
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { upload, deleteFile } = require('../firebase');
const User = require("../models/User");
const { createAccessToken, checkSession, getUserData } = require('../controllers/auth.controllers');
const { hardCheckSubscription, softCheckSubscription } = require("../controllers/suscriptions.controller")

router.route('/')
    .post(checkSession, hardCheckSubscription, async (req, res) => {
        let file = req.files.uploadedFile;
        let desc = req.body.description;

        try {
            let { url, firebaseDir } = await upload(file);
            const newFile = await new File({
                userID: getUserData(req.headers.authorization)._id,
                desc: desc,
                hash: jwt.sign({ 'url': url }, process.env.TOKEN_SECRET),
                baseDir: firebaseDir
            });
            try {
                const file = await newFile.save();
            } catch (err) {
                return res.status(400).json({ "message": err });
            }
            res.status(200).json({ "url": url });
        } catch (err) {
            console.log(err)
            res.status(500).json({ "message": err });
        }
    })
    .delete(checkSession, async (req, res) => {
        const id = req.body.fileID;
        const userData = getUserData(req.headers.authorization);
        const file = await File.findById(id);
        if (userData._id === file.userID || req.body.isAdmin) {
            try {
                await File.findByIdAndDelete(id);
                await deleteFile(file.baseDir);
                res.status(200).json({ "message": "File deleted" });
            } catch (e) {
                return res.status(500).json({ "message": e });
            }
        } else {
            return res.status(403).json({ "message": "You can only delete your files" });
        }
    })
    //Get all your files and shared files
    .get(checkSession, softCheckSubscription, async (req, res) => {
        try {
            const userFiles = await File.find({ userID: req.userData.id });
            if (req.subscribed) {
                const sharedUserFiles = await Promise.all(
                    req.userData.sharedFiles.map(async (fileID) => {
                        const currFile = await File.findById(fileID);
                        console.log(currFile);
                        if (currFile) {
                            return currFile;
                        } else {
                            await userData.updateOne({ $pull: { sharedFiles: fileID } });
                        }
                    })
                );
                return res.status(200).json(userFiles.concat(...sharedUserFiles));
            }

            return res.status(200).json(userFiles);
        } catch (err) {
            res.status(500).json({ "message": err });
            console.log(err)
        }
    });

//Sharing a file to another user
router.route('/share')
    .post(checkSession, hardCheckSubscription, async (req, res) => {
        const userData = getUserData(req.headers.authorization);
        const sharedFileID = await File.findById(req.body.fileID);
        if (userData._id === sharedFileID.userID) {
            console.log("Sharing the file");
            const sharedUser = await User.findById(req.body.sharedUserID)
            if (!sharedUser.sharedFiles.includes(req.body.fileID)) {
                await sharedUser.updateOne({ $push: { sharedFiles: req.body.fileID } });
                res.status(200).json({ "message": "File shared" });
            } else {
                res.status(403).json({ "message": "File was already shared" });
            }
        } else {
            res.status(403).json({ "message": "You can't share files that you don't own" })
        }
    })
    .delete(checkSession, async (req, res) => {
        const userData = await User.findById(getUserData(req.headers.authorization)._id);
        if (userData.sharedFiles.includes(req.body.fileID)) {
            await userData.updateOne({ $pull: { sharedFiles: req.body.fileID } });
            res.status(200).json({ "message": "File removed from your shared files" });
        } else {
            res.status(403).json({ "message": "File doesn't exists" });
        }
    });

//Get a file
router.route('/:id')
    .get(checkSession, async (req, res) => {
        const userData = await User.findById(getUserData(req.headers.authorization)._id);
        const currFile = await File.findById(req.params.id);
        if (userData.id === currFile.userID || userData.sharedFiles.includes(req.params.id)) {
            const currUrl = jwt.verify(currFile.hash, process.env.TOKEN_SECRET).url;
            res.status(200).json({ "url": currUrl });
        } else {
            res.status(403).json({ "message": "User has no access to the file" });
        }
    })

    .delete(checkSession, async (req, res) => {
        const id = req.params.id;
        const userData = getUserData(req.headers.authorization);
        const file = await File.findById(id);
        if(!file){
            return res.status(404).json({ "message": "file not found" });
        }

        if (userData._id === file.userID || req.body.isAdmin) {
            try {
                await File.findByIdAndDelete(id);
                //await deleteFile(file.baseDir);
                res.status(200).json({ "message": "File deleted" });
            } catch (e) {
                return res.status(500).json({ "message": e });
            }
        } else {
            return res.status(403).json({ "message": "You can only delete your files" });
        }
    });

module.exports = router;