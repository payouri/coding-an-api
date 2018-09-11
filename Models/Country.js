const mongoose = require('mongoose');

const paysSchema = mongoose.Schema({
    id: String,
    capital: String,
    name: String,
    zone: String,
    language: String
});



const Pays = mongoose.model('Pays', paysSchema);


module.exports = Pays;