const mongoose = require("mongoose");

const NoticiasSchema = new mongoose.Schema(
    {
    titulo:{type:String, required:[true, "Por favor ingrese el titulo."], unique:[true, "Esta noticia ya existe"] , minLength: [5, "El titulo tiene que tener 5 caracteres o mas."]},
    subtitulo:{type:String, required:[true, "Por favor ingrese el subtitulo."], minLength: [5, "El Subtitulo tiene que tener 5 caracteres o mas."]},
    desarrollo:{type:String, required:[true, "Por favor ingrese el desarrollo."], minLength: [30, "El desarrollo tiene que tener 30 caracteres o mas."]},
    imgNoticia:{type:String, required:[true, "Por favor ingrese URL de la imagen."], },
    categoria:{type:String, required:[true, "Por favor seleccione una categoria."]},
    autor: {type:String, required:[true, "Por favor ingrese el nombre del autor."], minLength: [5, "Imgrese nombre del autor valido (5 caracteres o mas)"] }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("Noticias", NoticiasSchema);