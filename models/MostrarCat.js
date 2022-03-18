const mongoose = require("mongoose");

const MostrarCatSchema = new mongoose.Schema(
    {
    titulo:{type:String, required:true, unique:true},
    subtitulo:{type:String, required:true},
    imgNoticia:{type:String, required:true},
    categoria:{type:String, required:true},
    content:{type:Array}
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("MostrarCat", MostrarCatSchema);