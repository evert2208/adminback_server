const { response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = (req, res = response, next) => {

    //leer token
    const token = req.header('x-token');


    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'no hay token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: ' token no valido'
        });
    }


};

const validarADMIN_ROLE = (req, res, next) => {

    const uid = req.uid;
    try {

        const usuarioDB = Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'usuario no existe'
            });
        }

        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'no es un admin'
            });
        }

        next();


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        });
    }

};

const validarADMIN_ROLE_o_mismoUSER = (req, res, next) => {

    const uid = req.uid;
    const id = req.params.id;
    try {

        const usuarioDB = Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'usuario no existe'
            });
        }

        if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'no es un admin'
            });
        }




    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        });
    }

};

module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_mismoUSER
};