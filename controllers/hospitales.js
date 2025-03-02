const { response } = require("express");
const Hospital = require('../models/hospital');

const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre img');



    res.json({
        ok: true,
        hospitales
    });
};

const crearHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({ usuario: uid, ...req.body });


    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el admin'
        });
    }


};

const actualizarHospital = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: true,
                msg: 'hospital no encontrado'

            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        };
        const hospitalAct = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        res.json({
            ok: true,
            hospital: hospitalAct
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hable con el admin'
        });
    }

};

const borrarHospital = async(req, res = response) => {

    const id = req.params.id;


    try {

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: true,
                msg: 'hospital no encontrado'

            });
        }

        await Hospital.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'hospital borrado'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hable con el admin'
        });
    }
    res.json({
        ok: true,
        msg: 'borrarHospital'
    });
};

module.exports = {
    getHospitales,
    borrarHospital,
    actualizarHospital,
    crearHospital
}