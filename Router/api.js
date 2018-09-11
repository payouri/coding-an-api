const express = require('express');

module.exports = (function() {
    
    'use strict';
    const api = express.Router();

    api.get('/api', function(req, res) {
        res.status(200).json({
            message: 'Welcome to my personal api'
        });
    });

    return api;

})();