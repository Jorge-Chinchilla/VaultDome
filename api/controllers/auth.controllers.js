const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/User");


authCtrl = {}

authCtrl.createAccessToken = function (user) {
    return jwt.sign({ 'data': JSON.stringify(user) }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 })
}

authCtrl.checkSession = async function verifyToken(req, res, next) {
    // Se busca el token en los headers
    const token = req.headers.authorization;
    // Si no encuentra el token
    if (!token) {
        req.auth = false;
        return res.status(400).json({"message": "No authorization token"});
    }
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) =>{
        if (err){
            return res.status(400).json({"message": err});
        }else if(decoded){
            req.userData = await User.findById(JSON.parse(decoded.data)._id);
            req.auth = true;
            next();
        }
    })   
    
}

authCtrl.getUserData = function decryptUserData(token){

    try{
        return JSON.parse(jwt.verify(token, process.env.TOKEN_SECRET).data);
    }catch(err){
        return undefined;
    }
    
}



module.exports = authCtrl