const User = require(global.appRoot + '/Models/User');

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
    }
};

module.exports = (function () {
    return Controllers;
})();