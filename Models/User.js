const mongoose = require('mongoose'),
    { Schema } = mongoose;

const userSchema = Schema({
    userName: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date,
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    },
});



const User = mongoose.model('User', userSchema);


module.exports = User;