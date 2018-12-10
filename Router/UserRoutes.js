const AbstractRoute = require('./Route');

const routes = [
    {method: 'delete', path: '/user_id', controller: 'deleteUser'},
    {method: 'get', path: '/', controller: 'getAllUsers'},
    {method: 'get', path: '/:user_id', controller: 'getUserByName'},
    {method: 'post', path: '/', controller: 'registerUser'},
    {method: 'put', path: '/:user_id', controller: 'updateUser'},
]

module.exports = class UserRoute extends AbstractRoute {
    constructor() {
        super(routes);
    }
}