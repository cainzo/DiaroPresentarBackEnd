const mongoose = require("mongoose");

const Noticiachema = new mongoose.Schema(
    {
    titulo:{type:String, required:true, unique:true},
    subtitulo:{type:String, required:true},
    desarrollo:{type:String, required:true},
    imgNoticia:{type:String, required:true},
    categoria:{type:String, required:true},
    autor: {type:String, required:true }
    },
    {
        timestamps:true
    }
);

module.export = mongoose.model("Usuario", Noticiachema);