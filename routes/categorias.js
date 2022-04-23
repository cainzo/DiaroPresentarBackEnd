const router = require("express").Router();
const Categorias = require("../models/Categorias");
const verify = require("../verifyToken");

//get
router.get("/", async (req, res)=>{
    try {
        const categorias = 
           await Categorias.find();
        res.status(200).json(categorias);
      } catch (err) {
        res.status(500).json(err);
      }
});
//crear categoria
router.post("/", verify, async (req, res, next) => {
  if (req.user.isAdmin) {
    const categoriaNueva = new Categorias(req.body);
    try {
      const categoriaGuardar = await categoriaNueva.save();
      res.status(201).json(categoriaGuardar);
    } catch (err) {
      next(err)
    }
  } else {
    res.status(403).json("No tienes permisos para crear una categoria nueva");
  }
});
// update
router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const updatearCategoria = await Categorias.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatearCategoria);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("No tienes permisos para actualizar la noticia ");
    }
  });
// delete
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        await Categorias.findByIdAndDelete(req.params.id);
        res.status(200).json("La categoria fue eliminada");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("No tienes permisos para borrar la categoria");
    }
  });
  

module.exports = router;
