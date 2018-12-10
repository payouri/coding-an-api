const User = require(global.appRoot + '/Models/User'),
    Role = require(global.appRoot + '/Models/Role'),
    { ObjectID } = require('mongoose');

const Controllers = {

    getAllUsers: (req, res) => {
        User.find((err, user) => {
            if (err) {
                res.status(500).json({
                    err
                });
            }
            res.status(200).json(user);
        });
    },

    getUserByName: (req, res) => {
        User.find({
            userName: req.params.user_name
        }, (err, user) => {
            if (user.length > 0) {
                if (err) {
                    res.status(500).json({
                        err
                    });
                }
                res.status(200).json(user);
            } else {
                res.status(404).send({
                    message: 'Not Found'
                });
            }
        });
    },

    createUser: (req, res) => {
        if (req && req.body &&
            req.body.userName &&
            req.body.password &&
            req.body.accountType &&
            req.body.email
        ) {
            let user = new User({
                userName: userName,
                password: '',
                email: '',
                role: Role.find({label: 'member'}, (err, role) => role._id),
            });          
            user.save(err => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        err
                    });
                }
                return res.status(200).json({
                    message: `Bravo, l'utilisateur: ${user.email}, est maintenant stockée en base de données`
                });
            });
        }
    }
};

module.exports = (function () {
    return Controllers;
})();