const AbstractRoute = require('./Route');

const routes = [
    {method: 'delete', path: '/country_id', controller: 'deleteCountry', auth: true},
    {method: 'get', path: '/', controller: 'getAllCountries'},
    {method: 'get', path: '/:country_id', controller: 'getCountryById'},
    {method: 'post', path: '/:country_id', controller: 'addNewCountry', auth: true},
    {method: 'put', path: '/:country_id', controller: 'updateCountry', auth: true},
]

module.exports = class CountryRoute extends AbstractRoute {
    constructor() {
        super(routes);
    }
}