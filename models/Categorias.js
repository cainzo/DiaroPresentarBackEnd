const mongoose = require("mongoose");
const validator = require('validator');

const CategoriaSchema = new mongoose.Schema(
    {
    categoria:{type:String, required:[true, 'Nombre de la categoria es necesario'], unique:[true, 'Esta categoria ya existe'], lowercase:true, validate: [validator.isAlphanumeric, 'Nombre de categorias solo deben tener letras y numers.']}
    }
);

module.exports = mongoose.model("Categorias", CategoriaSchema);