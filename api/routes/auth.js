const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { createAccessToken, checkSession } = require('../controllers/auth.controllers')

router.route('/')
    .get((req, res) => {
        res.send("Hey its auth route");
    });

//Registrar
router.route('/register')
    .post(async (req, res) => {
        try {
            //generar una contraseña encriptada
            const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            //crear nuevo usuario
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashPassword
            });
            //guardar usuario y retornar una respuesta
            try {
                const user = await newUser.save();
                return res.status(200).json({ accessToken: createAccessToken(user), userId: user.id });
            } catch (err) {
                return res.status(400).json({ "message": err });
            }
        } catch (err) {
            console.error(err)
            return res.status(500).json({ "message": err });
        }
    });

//Login
router.route('/login')
    .post(async (req, res) => {
        try {
            //Buscamos el email
            const user = await User.findOne({ email: req.body.email });

            if (!user) {
                return res.status(404).send("User not found");
            }

            //manejamos una contraseña valida
            const validPassword = await bcrypt.compare(req.body.password, user.password);

            // Si la contraseña es válida creamos un token de autenticación
            if (validPassword) {
                return res.status(200).json({ accessToken: createAccessToken(user), userId: user.id })
            } else {
                return res.status(400).json({ "message": "Wrong password" });
            }

        } catch (e) {
            res.status(500).json({ "message": e });
        }
    })


module.exports = router