const router = require("express").Router();
const Usuario = require("../models/Usuario");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");
const { getAllUsuarios } = require("../controllers/usuariosTableController");

//Update usuario
router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      //comprobar si estamos cambiando password
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }
    try {
      const updatedUser = await Usuario.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("no se puede cambiar la password");
  }
});
//delete usuario

router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await Usuario.findByIdAndDelete(req.params.id);
      res.status(200).json("Usuario eliminado correctamente");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("No se puede eliminar este usuario");
  }
});

//get

router.get("/find/:id", verify, async (req, res) => {
  try {
    const usuarioInfo = await Usuario.findById(req.params.id);
    const { password, ...info } = usuarioInfo._doc; //devolvemos toda la info sin la password
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get all para tabla dinamica 
router.route("/").get(getAllUsuarios);
//get all

router.get("/ultimos10", verify, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await Usuario.find().sort({ _id: -1 }).limit(10)
        : await Usuario.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("No puedes ver todos los usuarios");
  }
});

//get user stats

router.get("/stats", async (req, res) => {
  const today = new Date();
  const anoPasado = today.setFullYear(today.setFullYear() - 1);
  const monthsArray = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  try {
    const data = await Usuario.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" }
        }
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
