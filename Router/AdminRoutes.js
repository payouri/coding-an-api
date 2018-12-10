const AbstractRoute = require('./Route');

const routes = [
    {method: 'delete', path: '/roles/:role_id', controller: 'deleteRole'},
    {method: 'delete', path: '/permissions/:perm_id', controller: 'deletePermission'},
    {method: 'get', path: '/permissions', controller: 'getPermissions'},
    {method: 'get', path: '/roles', controller: 'getRoles'},
    {method: 'post', path: '/permissions', controller: 'createPermission'},
    {method: 'post', path: '/roles', controller: 'createRole'},
    {method: 'put', path: '/roles/:role_label', controller: 'updateRoleByLabel'},
    {method: 'put', path: '/permissions/:permission_label', controller: 'updatePermission'},
]

module.exports = class AdminRoutes extends AbstractRoute {
    constructor() {
        super(routes);
    }
}