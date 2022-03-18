const router = require("express").Router();
const Noticias = require("../models/Noticias");
const verify = require("../verifyToken");

//creando noticia nueva

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const noticiaNueva = new Noticias(req.body);
    try {
      const noticiaGuardar = await noticiaNueva.save();
      res.status(201).json(noticiaGuardar);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("No puedes crear una noticia nueva");
  }
});

//update

router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatearNoticia = await Noticias.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatearNoticia);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("No puedes actualizar la noticia nueva");
  }
});

//delete

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Noticias.findByIdAndDelete(req.params.id);
      res.status(200).json("La noticia fue eliminada");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("No puedes actualizar la noticia nueva");
  }
});

//GET noticia

router.get("/:id", async (req, res) => {
  try {
      const noticia = await Noticias.findById(req.params.id)
   
    res.status(200).json(noticia);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get todas las noticias
router.get("/",  async (req, res) => {
    
      try {
        const noticias = 
           await Noticias.find().sort({ _id: -1 }).limit(20);
        res.status(200).json(noticias);
      } catch (err) {
        res.status(500).json(err);
      }
  });

module.exports = router;
