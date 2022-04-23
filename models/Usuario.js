const mongoose = require("mongoose");
const validator = require('validator');
//import validator from 'validator';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required:[ true , "Por favor ingrese un email valido."], unique: [true , "Email ya se encuentra en uso."], validate: [validator.isEmail, 'Email invalido.'] },

    password: { type: String, required: [true , "Ingrese una contrasena"], minLength: [6, 'La contrasena tiene que tener al menos 6 caracteres.'] },

    profilePic: { type: String, default: "" },

    isAdmin: { type: Boolean, default: false },
    
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Usuario", UserSchema);
