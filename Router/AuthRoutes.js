const AbstractRoute = require('./Route');

const routes = [
    {method: 'post', path: '/signin', controller: 'signInUser'},
    {method: 'post', path: '/:signup', controller: 'signUpUser'},
]

module.exports = class AuthRoute extends AbstractRoute {
    constructor() {
        super(routes);
    }
}