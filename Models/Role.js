const mongoose = require('mongoose'),
    Permissions = require(global.appRoot + '/Models/Permissions'),
    { Schema } = mongoose;

const roleSchemat = mongoose.Schema({
    label: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    permissions: {
        type: Array,
        permissions: [Permissions],
        required: true,
    }
});



const Role = mongoose.model('Role', roleSchemat);


module.exports = Role;