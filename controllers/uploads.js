const { response } = require("express");
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/act-imagen');


const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    //validad tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'no es un medico, usuario o hospital'
        });
    }

    //validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'no hay archivos'
        });
    }

    //procesar la imagen...
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //validar extension
    const extensionesValida = ['png', 'jpg', 'gif', 'jpeg'];
    if (!extensionesValida.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'no es una extension permitida'
        });
    }

    //Generar nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //path para guardar archivo
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //mover la imagen
    file.mv(path, (err) => {
        if (err) {

            return res.status(500).json({
                ok: false,
                msg: 'error al mover la imagen'
            });
        }

        //Actualizar base de datos
        actualizarImagen(tipo, id, nombreArchivo);


        res.json({
            ok: true,
            msg: 'archivo subido',
            nombreArchivo
        })
    });


}

const retornarImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    //imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-image.png`);
        res.sendFile(pathImg);
    }




}

module.exports = {
    fileUpload,
    retornarImagen
}