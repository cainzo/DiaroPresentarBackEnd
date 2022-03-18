const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const noticiasRoute = require("./routes/noticias");
const mostrarCatRoute = require("./routes/mostrarCat");
dotenv.config();

mongoose.connect(process.env.MONGO_URL);
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/noticias", noticiasRoute);
app.use("/noticias", mostrarCatRoute);
 

app.listen(8800, ()=>{
    console.log('backend serrverrre');
});