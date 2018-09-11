const express = require('express');

module.exports = (function() {

    'use strict';

    const CountryControllers = require( global.appRoot + '/Controllers/CountryControllers' );

    const router = express.Router();

    router
        .get('/', CountryControllers.getAllCountries)
        .get('/:country_id', CountryControllers.getCountryById)
        .post('/', CountryControllers.addNewCountry)
        .put('/:country_id', CountryControllers.updateCountry)
        .delete('/:country_id', CountryControllers.deleteCountry);

    return router;    

})();