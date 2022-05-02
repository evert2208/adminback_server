/*
Medicos
ruta : '/api/medico'
*/

var { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicos, borrarMedico, actualizarMedico, crearMedico } = require('../controllers/medicos');
var router = Router();

router.get('/', getMedicos);
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser valido').isMongoId(),
        validarCampos

    ],
    actualizarMedico
);

router.delete('/:id', borrarMedico);

module.exports = router;