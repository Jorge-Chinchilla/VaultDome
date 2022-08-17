const Log = require("../models/Log");

logCtrl = {}

logCtrl.LogActivity = async function LogActivity(req, res, next) {

    try{

        let newLog = await new Log({
            userID: req.body.userData ? req.body.userData.id : "Unkown" ,
            Date: Date.now(),
            Type: req.method,
            action: req.originalUrl
        });

        newLog = await newLog.save();

    }catch(err){
        console.log(err)
    }

    next()
}


logCtrl.logActivityCustom = async function LogActivity(userID, Type, action) {

    try{

        let newLog = await new Log({
            userID: userID,
            Date: Date.now(),
            Type: Type,
            action: action
        });

        newLog = await newLog.save();

    }catch(err){
        console.log(err)
    }

    next()
}



module.exports = logCtrl