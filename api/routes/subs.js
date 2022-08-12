const router = require('express').Router();
const User = require("../models/User");
const {checkSession} = require('../controllers/auth.controllers');

router.route('/')
    .post(checkSession, async (req,res) =>{

        try{
            let subsDate = new Date();
            await User.findByIdAndUpdate(req.userData.id, {subscription: subsDate.setMonth(subsDate.getMonth() + 1)});
            return res.status(200).json("Successful");
        }catch(err){
            console.log(err)
            return res.status(400).json("Internal Server Error");
        }
        

    })


module.exports = router;
