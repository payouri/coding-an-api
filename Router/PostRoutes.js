const express = require('express');

module.exports = (function() {

    'use strict';

    const PostControllers = require( global.appRoot + '/Controllers/PostControllers' );

    const router = express.Router();

    router
        .get('/', PostControllers.getAllPosts)
        .get('/:post_id', PostControllers.getPostById)
        .post('/', PostControllers.createPost)
        .put('/:post_id', PostControllers.updatePost)
        .delete('/:post_id', PostControllers.deletePost);

    return router;    

})();