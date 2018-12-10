const AbstractRoute = require('./Route');

const routes = [
    {method: 'delete', path: '/post_id', controller: 'deletePost', auth: true},
    {method: 'get', path: '/', controller: 'getAllPosts'},
    {method: 'get', path: '/:post_id', controller: 'getPostById', auth: true},
    {method: 'post', path: '/:post_id', controller: 'createPost', auth: true},
    {method: 'put', path: '/:post_id', controller: 'updatePost', auth: true},
]

module.exports = class PostRoute extends AbstractRoute {
    constructor() {
        super(routes);
    }
}