const Usuario = require("../models/Usuario");
const router = require("express").Router();

exports.getAllUsuarios = async (req, res) => {
  const categoriaQuery = req.query.categoria;
  try {
   
      let query = Usuario.find().sort({ _id: -1 });
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.limit) || 5;
      const skip = (page - 1) * pageSize;
      const total = await Usuario.countDocuments();
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
    
  } catch (err) {
    res.status(500).json(err);
  }
};
