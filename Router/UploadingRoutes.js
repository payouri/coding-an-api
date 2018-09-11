const express = require('express');

module.exports = (function () {

    'use strict';

    const uploadHelper = require(global.appRoot + '/Controllers/helpers/uploadFile');
    const readDirHelper = require(global.appRoot + '/Controllers/helpers/listDirFiles');

    const router = express.Router();

    router
        .post('/:type', uploadHelper.uploadFile, uploadHelper.logUploadType)
        .post('/:type/:number', uploadHelper.uploadFiles, uploadHelper.logUploadType)
        .get('/list/:path', readDirHelper.listDir);

    return router;

})();