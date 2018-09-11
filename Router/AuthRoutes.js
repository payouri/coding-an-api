const express = require('express');

module.exports = (function () {

    'use strict';

    const AuthControllers = require(global.appRoot + '/Controllers/AuthControllers');

    const router = express.Router();

    router
        .post('/register', AuthControllers.registerUser)
        .post('/login', AuthControllers.loginUser)
        .post('/auth', AuthControllers.authUser);
    // .post('/', AuthControllers.registerUser)
    // .put('/:user_id', AuthControllers.updateUser)
    // .delete('/:user_id', AuthControllers.deleteUser);

    return router;

})();