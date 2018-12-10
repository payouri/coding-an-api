const User = require(global.appRoot + '/Models/User'),
    config = require(global.appRoot + '/config/main'),
    { login } = require(global.appRoot + '/Middlewares/AuthMiddleware');


const Controllers = {

    signUpUser: (req, res) => {
        let user = new User({
            userName: req.body.userName,
            email: req.body.email,
            accountType: req.body.accountType,
            password: req.body.password
        });
        if (user.userName && user.email && user.accountType && user.password) {
        } else {
            return res.status(500).json({
                message: 'Champs Incomplets'
            });
        }
    },

    signInUser: (req, res) => {
        if(req && req.body && req.body.email)
            User.findOne({
                email: req.body.email
            }, (err, user) => {
                if (err)
                    return res.status(500).json({
                        message: 'Error on the server.'
                    });
                if (!user)
                    return res.status(404).json({
                        message: 'No user found.'
                    });
                return res.status(200).json({message: 'ok'})
            })
        else
            return res.status(401).json({message: 'missing fields'})
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