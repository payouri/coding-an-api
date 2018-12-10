const { existsSync } = require('fs'),
    { Router } = require('express'),
    AbstractRoute = require(`${global.appRoot}/Router/Route`),
    { authorize } = require(global.appRoot + '/Middlewares/AuthMiddleware');

class ApiRouter extends Router {
    constructor(path  = '', routes = []) {
        super();
        this.path = path
        this.routes = routes;

        ApiRouter.mount(this);
    }
    get path() {
        return this._path;
    }
    set path(s) {
        this._path = `${s?s:'/'}`;
    }
    static mount(router) {
        for(let route of router.routes ) {
            if(route.component && existsSync(`${global.appRoot}/Router/${route.component}Routes.js`)) {
                let r = require(`${global.appRoot}/Router/${route.component}Routes`);
                const childRoute = new r();
                if(childRoute instanceof AbstractRoute) {
                    router.use( `${router.path}${childRoute.path}`, route.auth === true?authorize:(req, res, next) =>next(), childRoute.router );
                }
                else console.log(`Warning, ${childRoute.constructor.name} not an instance of AbstractRoute`);
            }
        }
    }
}
module.exports = ApiRouter;