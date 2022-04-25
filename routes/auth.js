const router = require("express").Router();
const Usuario = require("../models/Usuario");
var bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

//registro de nuevo usuario
router.post("/register", async (req,res, next)=>{
    const newUser = new Usuario({
        email: req.body.email,
        password: req.body.password //encripatamos la contrasena de usuario con nuestra key
    })
    try{
        const user = await newUser.save();
        res.status(201).json(user);
    }catch(error){
       // res.status(503).json(error)
        next(error)
    }
});

//login de usuario
router.post('/login', async (req,res, next)=>{
    try{
        const user = await Usuario.findOne({email: req.body.email});//buscamos un usuario por el email provisto en el body de la req
        !user && res.status(455).json("El email ingresado no existe");// si no hay unm usuario que coinsida con nuestra busqueda mostramos el error 
        //encriptamos la pass para compararla con la pass guardada en la DB
       
        const pass = await bcrypt.compare(req.body.password, user.password)
        !pass && res.status(456).json("La password ingresada es incorrecta");

        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin},process.env.SECRET_KEY, {expiresIn:'1d'} ); // token para distigir entre usuarios y admins, tambien expira en un dia  y hay que volver a logear
        const {password, ...info} = user._doc; //devolvemos toda la info sin la password
            res.status(201).json({...info, accessToken});
    }catch(error){
        
     res.status(501).json(error)
    }
})

module.exports = router;