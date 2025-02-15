const express = require('express');
require('dotenv').config();
var cors = require('cors');
const { dbConnection } = require('./database/config');
const path = require('path');


//Crear servidor de express
const app = express();


// configurar CORS
app.use(cors());

//Lectura y parseo del Body
app.use(express.json());

//base de datos mongodb
dbConnection();

//Directorio Publico
app.use(express.static('public'));

//console.log(process.env);

// admin_user
// rwwWNlDvmDFhRiRL

//rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));

//ultimo
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public/index-google.html'));
// });

app.listen(process.env.PORT, () => {
    console.log('servidor corriendo puerto ' + process.env.PORT);
});