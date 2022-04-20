const express = require('express');
require('dotenv').config();
var cors = require('cors');
const { dbConnection } = require('./database/config');


//Crear servidor de express
const app = express();


// configurar CORS
app.use(cors());

//Lectura y parseo del Body
app.use(express.json());

//base de datos mongodb
dbConnection();

//console.log(process.env);

// admin_user
// rwwWNlDvmDFhRiRL

//rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log('servidor corriendo puerto ' + process.env.PORT);
});