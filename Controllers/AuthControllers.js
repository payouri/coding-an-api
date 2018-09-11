const User = require(global.appRoot + '/Models/User');
const config = require(global.appRoot + '/config/main');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Controllers = {

    registerUser: (req, res) => {
        let user = new User({
            userName: req.body.userName,
            email: req.body.email,
            accountType: req.body.accountType,
            password: req.body.password
        });
        if (user.userName && user.email && user.accountType && user.password) {
            user.password = bcrypt.hashSync(user.password, 8);
            user.save((err) => {
                if (err) {
                    return res.status(500).send('Problème en essayant d\'enregistrer l\'utilisateur.');
                }
                // create a token
                let token = jwt.sign({
                    id: user._id
                }, config.auth.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).json({
                    auth: true,
                    token: token,
                    message: `Bravo, l'utilisateur: ${user.userName} est maintenant enregistré.`
                });
            });
        } else {
            return res.status(500).json({
                message: 'Champs Incomplets'
            });
        }
    },

    loginUser: (req, res, next) => {
        User.findOne({
            email: req.body.email
        }, (err, user) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error on the server.'
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No user found.'
                });
            }
            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).json({
                    auth: false,
                    token: null,
                    message: 'Unauthorized'
                });
            }
            let token = jwt.sign({
                id: user._id
            }, config.auth.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).json({
                auth: true,
                token: token
            });
        });
    },

    authUser: (req, res, next) => {
        let token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).json({
                auth: false,
                message: 'No valid token provided.'
            });
        }

        jwt.verify(token, config.auth.secret, (err, decoded) => {
            if (err) {
                return res.status(500).json({
                    auth: false,
                    message: 'Failed to authenticate token.'
                });
            }
            User.findById(decoded.id, {
                /* s'assure de ne pas renvoyer le mot de passe */
                password: 0
            }, (err, user) => {
                if (err) {
                    return res.status(500).json({
                        message: 'There was a problem finding the user.'
                    });
                }
                if (!user) {
                    return res.status(404).json({
                        message: 'No user found.'
                    });
                }
                return next();
            });
        });

    }
};

module.exports = (function () {
    return Controllers;
})();

// router.route('/register')
//     .post((req, res) => {
//         let user = new User({
//             userName: req.body.userName,
//             email: req.body.email,
//             accountType: req.body.accountType,
//             password: req.body.password
//         });
//         if (user.userName && user.email && user.accountType && user.password) {
//             user.password = bcrypt.hashSync(user.password, 8);
//             user.save((err) => {
//                 if (err) {
//                     return res.status(500).send('Problème en essayant d\'enregistrer l\'utilisateur.');
//                 }
//                 // create a token
//                 let token = jwt.sign({
//                     id: user._id
//                 }, config.auth.secret, {
//                     expiresIn: 86400 // expires in 24 hours
//                 });
//                 res.status(200).send({
//                     auth: true,
//                     token: token,
//                     message: `Bravo, l'utilisateur: ${user.userName} est maintenant enregistré.`
//                 });
//             });
//         } else {
//             return res.status(500).send('Champs Incomplets');
//         }
//     }).get((req, res) => {
//         User.find((err, user) => {
//             if (err) {
//                 res.send(err);
//             }
//             res.json(user);
//         });
//     });
// router.get('/me', (req, res) => {
//     let token = req.headers['x-access-token'];
//     if (!token) {
//         return res.status(401).json({
//             auth: false,
//             message: 'No valid token provided.'
//         });
//     }

//     jwt.verify(token, config.auth.secret, (err, decoded) => {
//         if (err) {
//             return res.status(500).json({
//                 auth: false,
//                 message: 'Failed to authenticate token.'
//             });
//         }
//         User.findById(decoded.id, {
//             password: 0
//         }, (err, user) => {
//             /* s'assure de ne pas renvoyer le mot de passe */
//             if (err) {
//                 return res.status(500).json({
//                     message: 'There was a problem finding the user.'
//                 });
//             }
//             if (!user) {
//                 return res.status(404).json({
//                     message: 'No user found.'
//                 });
//             }
//             res.status(200).json( user );
//         });
//     });
// });
// router.post('/login', (req, res) => {
//     User.findOne({
//         email: req.body.email
//     }, (err, user) => {
//         if (err) {
//             return res.status(500).json({
//                 message: 'Error on the server.'
//             });
//         }
//         if (!user) {
//             return res.status(404).json({
//                 message: 'No user found.'
//             });
//         }
//         let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
//         if (!passwordIsValid) {
//             return res.status(401).json({
//                 auth: false,
//                 token: null,
//                 message: 'unauthorized'
//             });
//         }
//         let token = jwt.sign({
//             id: user._id
//         }, config.auth.secret, {
//             expiresIn: 86400 // expires in 24 hours
//         });
//         res.status(200).json({
//             auth: true,
//             token: token
//         });
//     });
// });