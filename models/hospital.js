var { Schema, model } = require('mongoose');

var HospitalSchema = Schema({
    nombre: {
        type: String,
        require: true
    },

    img: {
        type: String,

    },
    usuario: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, { collection: 'hospitales' });

HospitalSchema.method('toJSON', function() {
    var { __v, ...object } = this.toObject();

    return object;
});

module.exports = model('Hospital', HospitalSchema);