const AbstractRoute = require('./Route');

const routes = [
    {method: 'get', path: '/', controller: (req, res) => {
            res.status(200).json({
                message: 'Welcome to my personal API'
            });
        },
    },
    {method: 'get', path: '*', controller: (req, res) => {
            res.status(404).json({
                message: 'Not Found'
            });
        }
    }
]
module.exports = class IndexRoute extends AbstractRoute {
    constructor() {
        super(routes);
    }
}