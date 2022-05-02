const { response } = require("express");
const { async } = require("jshint/src/prod-params");
const Medico = require("../models/medico");


const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find().populate('hospital', 'nombre img')
        .populate('usuario', 'nombre img')

    res.json({
        ok: true,
        medicos
    });
};

const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({ usuario: uid, ...req.body });

    try {

        const medicoDB = await medico.save();


        res.json({
            ok: true,
            medico: medicoDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hable con el admin'
        });
    }


};

const actualizarMedico = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: true,
                msg: 'medico no encontrado'

            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        };
        const medicoAct = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            hospital: medicoAct
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hable con el admin'
        });
    }
};

const borrarMedico = async(req, res = response) => {

    const id = req.params.id;


    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: true,
                msg: 'medico no encontrado'

            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'medico borrado'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hable con el admin'
        });
    }
};

module.exports = {
    getMedicos,
    borrarMedico,
    actualizarMedico,
    crearMedico
}