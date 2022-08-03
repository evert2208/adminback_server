var { Router } = require('express');
var { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_mismoUSER } = require('../middlewares/validar-jwt');

var router = Router();

router.get('/', validarJWT, getUsuarios);
router.post('/', [
        check('nombre', 'nombre obligatorio').not().isEmpty(),
        check('password', 'password obligatorio').not().isEmpty(),
        check('email', 'email obligatorio').isEmail(),
        validarCampos
    ],
    crearUsuarios
);

router.put('/:id', [
        validarJWT,
        validarADMIN_ROLE_o_mismoUSER,
        check('nombre', 'nombre obligatorio').not().isEmpty(),
        check('email', 'email obligatorio').isEmail(),
        check('role', 'el role obligatorio').not().isEmpty(),
        validarCampos,

    ],
    actualizarUsuario
);

router.delete('/:id', [validarJWT, validarADMIN_ROLE], borrarUsuario);

module.exports = router;