const Noticia = require("../models/Noticias");
const router = require("express").Router();

exports.getAllNoticias = async (req, res) => {
  const categoriaQuery = req.query.categoria;
  try {
    if (categoriaQuery) {
      let query = Noticia.aggregate([
        { $match: { categoria: categoriaQuery } },
      ]).sort({ _id: -1 });
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.limit) || 5;
      const skip = (page - 1) * pageSize;
      const total = await Noticia.count({ categoria: categoriaQuery });
      const pages = Math.ceil(total / pageSize);

      query = query.skip(skip).limit(pageSize);
      const result = await query;
      res.status(200).json({
        status: "success",
        count: result.length,
        page,
        pages,
        data: result,
      });
    } else {
      let query = Noticia.find().sort({ _id: -1 });
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.limit) || 5;
      const skip = (page - 1) * pageSize;
      const total = await Noticia.countDocuments();
      const pages = Math.ceil(total / pageSize);

      query = query.skip(skip).limit(pageSize);
      const result = await query;
      res.status(200).json({
        status: "success",
        count: result.length,
        page,
        pages,
        data: result,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
