const { async } = require('jshint/src/prod-params');
const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('db online');
    } catch (error) {
        console.log(error);
        throw new Error('error al iniciar la bd');
    }

}

module.exports = {
    dbConnection
}