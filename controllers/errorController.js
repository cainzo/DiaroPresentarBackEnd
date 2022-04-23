//handle email or usename duplicates
const handleDuplicateKeyError = (err, res) => {
    const field = Object.keys(err.keyValue);//tomamos la propiedad que  en la que se encuentra el error
    const code = 409;
    const error = `Este ${field} ya esta registrado.`; // mensaje de error que vamos a mostrar con
    res.status(code).send({messages: error, fields: field}); //res
}

//handle field formatting, empty fields
const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map(item => item.message);
    let fields = Object.values(err.errors).map(item => item.path);
    let code = 400;

    if(errors.length > 1) {//si tenemos mas de un error en el formulario mostramos los 2
        const formattedErrors = errors.join(' ');//si no lo unimos con un espacio los mensajes de error van a ser formateados en un array y no en string
        res.status(code).send({messages: formattedErrors, fields: fields});
    } else {
        const formattedErrors = errors.join(' ');
        res.status(code).send({messages: formattedErrors, fields: fields})
    }
}

//error controller function
module.exports = (err, req, res, next) => {
    try {
        console.log('error siendo procesado');
        if(err.name === 'ValidationError') return err = handleValidationError(err, res); 
        if(err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res); //11000 el  codigo de errror por keys duplicadas
    } catch(err) {
        res.status(500).send('Error, vuelva a intentarlo mas tarde.'); //cuando hay otro problemas que no estamos controlando mostramos este mensaje
    }
}