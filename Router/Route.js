const { existsSync } = require('fs'),
    { Router } = require('express'),
    { authorize } = require(global.appRoot + '/Middlewares/AuthMiddleware');
module.exports = class AbstractRoute {
    constructor(routes) {
        if(this.constructor == AbstractRoute) {
            throw TypeError(`Abstract class "${this.constructor.name}" cannot be instanciated directly`)
        }
        const name = this.constructor.name.substring(0, this.constructor.name.indexOf('Route'))
        this.controllers = name + 'Controllers';
        this.path = name == 'Index'?'':name.toLowerCase();
        this.routes = routes;
        this.router = new Router;

        this.routing();
    }
    get controllers() {
        return this._controllers;
    }
    get path() {
        return this._path;
    }
    get routes() {
        return this._routes;
    }
    set controllers(name) {
        if(existsSync(`${global.appRoot}/Controllers/${name}.js`)) 
            this._controllers = require(`${global.appRoot}/Controllers/${name}.js`);
    }
    set path(s) {
        this._path = `/${s}`;
    }
    set routes(arr = []) {
        if(Array.isArray(arr)) {
            for(let route in arr) {
                if(!arr[route].method || !arr[route].path || !arr[route].controller) {
                    arr.splice(route, 1);
                }
            }
            return this._routes = arr;
        }
        return this._routes = [];
    }
    routing() {
        for(let route of this._routes) {
            if(typeof this.router[route.method] == 'function') {
                if(typeof route.controller == 'string' && typeof this._controllers[route.controller] == 'function') {
                    this.router[route.method](route.path, route.auth === true?authorize:(req, res, next)=>next(), this._controllers[route.controller]);
                }
                else if(typeof route.controller == 'function') {
                    this.router[route.method](route.path, route.auth === true?authorize:(req, res, next)=>next(), route.controller);
                }
            }
        }
    }
}