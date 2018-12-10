const mongoose = require('mongoose'),
    { Schema } = mongoose;
const permissionSchemat = mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: true,
        index: true,
        uppercase: true,
    },
    group: {
        type: String,
        lowercase: true,
        default: '',
    },
    active: {
        type: Boolean,
        required: true,
        default: false,
    }
});



const Permission = mongoose.model('Permission', permissionSchemat);


module.exports = Permission;