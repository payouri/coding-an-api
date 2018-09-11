const multer = require('multer'),
    path = require('path'),
    fs = require('fs'),
    uploadDir = path.join(global.appRoot + '/static/uploads');

const checkFileExt = (ext, file) => {

        if (ext instanceof Array) {

            const extLenght = ext.length;

            let matchOne = false;
            if (extLenght > 0) {
                for (let i = 0, n = extLenght; i < n; i++) {
                    if (path.extname(file.originalname) === `.${ext[i]}`) {
                        matchOne = true;
                        break;
                    }
                }
            }
            return matchOne;

        } else if (ext instanceof String) {

            return path.extname(file.originalname) === `.${ext}`;

        }

    },
    checkFileMIME = (mimeType, file) => {

        if (mimeType instanceof Array) {

            const mimeTypeLenght = mimeType.length;

            let matchOne = false;
            if (mimeTypeLenght > 0) {
                for (let i = 0, n = mimeTypeLenght; i < n; i++) {
                    if (file.mimetype === mimeType[i]) {
                        matchOne = true;
                        break;
                    }
                }
            }
            return matchOne;

        } else if (mimeType instanceof String) {

            return file.mimetype === mimeType;

        }

    },

    dirExist = 
    function(dir, callback) {

        fs.stat(`${uploadDir}/${dir}/`, (err, stat) => {
            if(err) {
                fs.mkdir(`${uploadDir}/${dir}/`, () => {
                    return callback;
                });
            }
            return callback;
        });

    },

    createStorage = multer.diskStorage({
        'destination': (req, file, callback) => {

            const fileMIME = String(file.mimetype).substring(0, String(file.mimetype).indexOf('/'));
            dirExist(fileMIME, callback(null, `${uploadDir}/${fileMIME}`));

        },
        'filename': (req, file, callback) => {

            const newFileName = file.originalname.split(' ').join('_');
            callback(null, newFileName);

        }
    }),

    rejectAll = (req, file, callback) => {

        callback(null, false);

    },

    uploadFilter = (req, file, callback) => {

        const fileMIME = String(file.mimetype).substring(0, String(file.mimetype).indexOf('/'));
        const expectedType = req.params.type;

        if (fileMIME !== expectedType) {
            callback(null, false);
        } else {
            callback(null, true);
        }

    },

    imageFilter = (req, file, callback) => {

        const fileMIME = String(file.mimetype).substring(0, String(file.mimetype).indexOf('/'));

        if (fileMIME !== 'image') {
            callback(null, false);
        } else {
            callback(null, true);
        }

    };



const Helper = {


    uploadFile: (req, res, next) => {
        

        const upload = new multer({
            'storage': createStorage,
            'fileFilter' : uploadFilter
        });
        

        const currentUpload = upload.single('upload');

        currentUpload(req, res, err => {
            if (err)
                return res.status(500).json(err);

            return next();
        });
    },

    uploadFiles: (req, res, next) => {

        const expectedNumber = Number(req.params.number);

        const upload = new multer({
            'storage': createStorage,
            'fileFilter': uploadFilter
        });

        
        const currentUpload = upload.array('upload', expectedNumber);

        currentUpload(req, res, err => {
            if(err)
                return res.status(500).json(err);

            return next();
        });
    },

    testDir: (req, res) => {

        fs.stat(`${uploadDir}/audio/`, (err, stat) => {
            if(err)
                return res.status(500).json(err);

            return res.status(200).json(stat.isDirectory());
            
        });

    },

    logUploadType: (req, res) => {

        if (req.file) {
            checkFileExt(['jpg', 'jpeg'], req.file);
            checkFileMIME(['image/jpg', 'image/jpeg'], req.file);
            return res.status(200).json(req.file);
        } else if (req.files && req.files.length > 0) {
            req.files.forEach( file => {
                checkFileExt(['jpg', 'jpeg'], file);
            });
            return res.status(200).json(req.files);
        }else {
            return res.status(500).json({
                'message': 'An Error Happened'
            });
        }


    }

};

module.exports = (function () {
    return Helper;
})();