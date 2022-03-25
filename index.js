const express = require('express');
require('dotenv').config();
var cors = require('cors');
const { dbConnection } = require('./database/config');


//Crear servidor de express
const app = express();


// configurar CORS
app.use(cors());

//base de datos mongodb
dbConnection();

//console.log(process.env);

// admin_user
// rwwWNlDvmDFhRiRL

//rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'hola mundo'
    })
});

app.listen(process.env.PORT, () => {
    console.log('servidor corriendo puerto ' + 3000);
});