/* 
'/api/hospitales'
*/

var { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getHospitales, borrarHospital, actualizarHospital, crearHospital } = require('../controllers/hospitales');
var router = Router();

router.get('/', getHospitales);
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del hosp es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearHospital
);

router.put('/:id', [


    ],
    actualizarHospital
);

router.delete('/:id', borrarHospital);

module.exports = router;