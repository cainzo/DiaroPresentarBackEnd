const router = require("express").Router();
const Usuario = require("../models/Usuario");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//registro
router.post("/register", async (req,res)=>{
    const newUser = new Usuario({
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    })
    try{
        const user = await newUser.save();
    res.status(201).json(user);
    }catch(error){
        res.status(500).json(error)
    }
});

//login 
router.post('/login', async (req,res)=>{
    try{
        const user = await Usuario.findOne({email: req.body.email});
        !user && res.status(404).json("el email no existe o la password es incorrecta");
        //encriptamos la pass
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const passwordOriginal = bytes.toString(cryptoJs.enc.Utf8);

        passwordOriginal !== req.body.password && 
            res.status(404).json("el email no existe o la password es incorrecta");
        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin},process.env.SECRET_KEY, {expiresIn:'1d'} ); // token para distigir entre usuarios y admins, tambien expira en un dia  y hay que volver a logear
        const {password, ...info} = user._doc; //devolvemos toda la info sin la password
            res.status(201).json({...info, accessToken});
    }catch(error){
        res.status(500).json(error)
    }
})

module.exports = router;