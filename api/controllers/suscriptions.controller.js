subsCtrl = {}


subsCtrl.hardCheckSubscription = async function verifyToken(req, res, next) {
    if(req.userData){
        if(req.userData.subscription > Date.now()){
            next();
        }else{
            return res.status(403).json("subscription expired");
        }
    }else{
        return res.status(403).json("No subscription")    
    }
       
}


subsCtrl.softCheckSubscription = async function verifyToken(req, res, next) {
    if(req.userData){
        if(req.userData.subscription > Date.now()){
            req.subscribed = true;
        }
        else{
            req.subscribed = false;
        }        
        next();
    }
}




module.exports = subsCtrl