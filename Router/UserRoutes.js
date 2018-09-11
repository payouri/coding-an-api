const express = require('express');

module.exports = (function () {

    'use strict';

    const UserControllers = require(global.appRoot + '/Controllers/UserControllers'),
        AuthControllers = require(global.appRoot + '/Controllers/AuthControllers');

    const router = express.Router();

    router
        .get('/', AuthControllers.authUser, UserControllers.getAllUsers)
        .get('/:user_name', UserControllers.getUserByName);
    // .post('/', UserControllers.registerUser)
    // .put('/:user_id', UserControllers.updateUser)
    // .delete('/:user_id', UserControllers.deleteUser);

    return router;

})();