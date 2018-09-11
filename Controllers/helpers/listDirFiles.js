const fs = require('fs');

const getParams = (req, param) => {

    return req.params[param];

};

const Helper = {
    listDir: (req, res) => {
        const path = getParams(req, 'path').split('-').join('/');
        fs.readdir(`${global.appRoot}/static/${path}`, (err, files) => {
            if (err) {
                console.log( err );
                return res.status(404).json({
                    'message': 'Not Found'
                });
            }
            if (files) {
                let filenames = [];
                for (let i = 0, n = files.length; i < n; i++) {
                    console.log(files[i]);
                    filenames[i] = files[i];
                }
                return res.status(500).json(filenames);
            }
        });
    }
};

module.exports = (function () {
    return Helper;
})();