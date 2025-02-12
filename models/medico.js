var { Schema, model } = require('mongoose');

var MedicoSchema = Schema({
    nombre: {
        type: String,
        require: true
    },

    img: {
        type: String,

    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        require: true
    }

});

MedicoSchema.method('toJSON', function() {
    var { __v, ...object } = this.toObject();

    return object;
});

module.exports = model('Medico', MedicoSchema);