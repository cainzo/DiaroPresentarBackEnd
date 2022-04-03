const router = require("express").Router();

const Noticias = require("../models/Noticias");



//mostrar noticia por categoria

router.get("/", async (req, res) => {
  const categoriaQuery = req.query.categoria;
  try {
    if (categoriaQuery) {
      const mostrarNoticias = await Noticias.aggregate([
        {$match: {categoria:categoriaQuery}},
      ]).sort({ _id: -1 }).limit(10);
      res.status(200).json(mostrarNoticias);
    } else {
      const mostrarNoticias = await Noticias.find().sort({ _id: -1 }).limit(20);
      res.status(200).json(mostrarNoticias);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//mostrar noticia por id
router.get("/:id", async (req, res) => {
  try {
      const noticia = await Noticias.findById(req.params.id)
   
    res.status(200).json(noticia);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get categoria
module.exports = router;
