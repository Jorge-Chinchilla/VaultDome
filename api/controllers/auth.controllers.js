const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

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
        return res.status(400).json("No authorization token");
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) =>{
        if (err){
            console.log("Error")
            return res.status(400).json(err);
        }else if(decoded){
            console.log(decoded)
            req.userData = decoded.data;
            req.auth = true;
            next();
        }
    })   
    
}



module.exports = authCtrl