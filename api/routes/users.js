const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const {createAccessToken, checkSession, getUserData} = require('../controllers/auth.controllers')

//Manejo de usuarios
router.route('/:id')
    //Actualizar un usuario
    .put(checkSession, async(req, res)=>{

        let userData = getUserData(req.headers.authorization);

        if(userData._id === req.params.id || userData.isAdmin){
            if(req.body.password){
                try {
                    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
                    req.body.password = await bcrypt.hash(req.body.password, salt);
                }catch (e) {
                    return res.status(500).json({"message": e});
                }
            }
            try {
                const user = await User.findByIdAndUpdate(req.params.id, {
                    $set:req.body
                });
                res.status(200).json({accessToken: createAccessToken(user)});
            } catch (e) {
                return res.status(500).json({"message": e});
            }
        }else{
            return res.status(403).json({"message": "You can only update your account"});
        }
    })
    //Eliminar un usuario
    .delete(checkSession, async(req, res)=>{

        let userData = getUserData(req.headers.authorization);

        if(userData._id === req.params.id || req.body.isAdmin){          

            try {
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json({"message": "Account deleted"});
            } catch (e) {
                return res.status(500).json({"message": e});
            }
        }else{
            return res.status(403).json({"message": "You can only delete your account"});
        }
    });

//Obtener un usuario por nombre o por id
router.get("/", checkSession, async (req,res)=>{

    const userId = req.query.userId;
    const username = req.query.username;
    try{
        let user = userId
            ? await User.findById(userId)
            : await User.findOne({username: username});
        

        let followers = await Promise.all(user.followers.map(async (userId)=>{
            let user = await User.findById(userId)
            return user
        }))

        

        
        let following = await Promise.all(user.following.map(async (userId)=>{
            let user = await User.findById(userId)
            return user
        }))


        user.followers = followers
        user.following = following

        
        

        //destructuramos en un array el objeto, guardando la información que deseamos imprimir en "others"
        const {password, updatedAt, createdAt, __v, ...other} = user._doc;
        res.status(200).json(other);
    } catch (e) {
        res.status(500).json({"message": e});
    }
});


//Seguir a un usuario
router.route('/:id/follow')
    .put(checkSession, async(req,res)=>{

        let userData = getUserData(req.headers.authorization);

        if(userData._id !== req.params.id){
            try {
                const user = await User.findById(req.params.id);
                const currentUser = await User.findById(userData._id);
                if(!currentUser.following.includes(req.params.id)){
                    //si el usuario no existe en la lista de seguidores
                    await user.updateOne({$push: {followers: userData._id}});
                    await currentUser.updateOne({$push: {following: req.params.id}});
                    let UpdatedCurrentUser = await User.findById(userData._id);
                    res.status(200).json({accessToken: createAccessToken(UpdatedCurrentUser)});
                }else{
                    //si el usuario ya existe en la lista de seguidores
                    res.status(403).json({"message": "You already follow this user"});
                }
            }catch (e) {
                res.status(500).json({"message": e});
            }
        }else{
            res.status(403).json({"message": "You can't follow yourself"});
        }
    });
//Dejar de seguir a un usuario
router.route('/:id/unfollow')
    .put(checkSession, async(req,res)=>{

        let userData = getUserData(req.headers.authorization);
       
        if(userData._id !== req.params.id){
            try {
                const user = await User.findById(req.params.id);
                let currentUser = await User.findById(userData._id);
                if(user.followers.includes(userData._id)){
                    //si el usuario no existe en la lista de seguidores
                    await user.updateOne({$pull: {followers: userData._id}});
                    await currentUser.updateOne({$pull: {following: req.params.id}});
                    currentUser = await User.findById(userData._id);
                    res.status(200).json({accessToken: createAccessToken(currentUser)});
                }else{
                    //si el usuario ya existe en la lista de seguidores
                    res.status(403).json("You don't follow this user");
                }
            }catch (e) {
                res.status(500).json({"message": e});
            }
        }else{
            res.status(403).json({"message": "You can't unfollow yourself"});
        }
    });


module.exports = router