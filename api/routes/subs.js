const router = require('express').Router();
const User = require("../models/User");
const {checkSession} = require('../controllers/auth.controllers');

router.route('/')
    .post(checkSession, async (req,res) =>{

        months = req.body.months ? req.body.months : 1

        try{
            let subsDate = new Date();
            await User.findByIdAndUpdate(req.userData.id, {subscription: subsDate.setMonth(subsDate.getMonth() + 1)});
            return res.status(200).json({"message": "Successful"});
        }catch(err){
            console.log(err)
            return res.status(500).json({"message": "Internal Server Error"});
        }
        
    })


module.exports = router;
