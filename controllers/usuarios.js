const { async } = require('jshint/src/prod-params');
var Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const res = require('express/lib/response');

var getUsuarios = async(req, res = response) => {

    var desde = Number(req.query.desde) || 0;


    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'nombre email role google img')
        .skip(desde)
        .limit(5),
        Usuario.countDocuments()


    ]);



    res.json({
        ok: true,
        usuarios,
        total
    });
};

var crearUsuarios = async(req, res = response) => {
    var { email, password } = req.body;


    try {
        const existeEmail = await Usuario.findOne({ email });

        //valida el email no este ya registrado
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'correo ya registrado'
            })
        }

        var usuario = new Usuario(req.body);

        //encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);



        //guardar usuario
        await usuario.save();

        // Generar TOKEN - JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error revisar logs'
        });
    }


};

const actualizarUsuario = async(req, res = response) => {

    // TODO validar token y comprobar que el user es correcto
    var uid = req.params.id;
    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'no existe usuario con ese id'
            });
        }

        // actualizaciones
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'ya existe un user con ese email'
                });
            }
        }

        if (!usuarioDB.google) {
            campos.email = email;
        } else if (usuarioDB.email !== email) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario de google no puede cambiar el correo'
            });
        }
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            msg: 'usuario actualizado correctamente',
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        });
    }
};

const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;
    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'no existe usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}