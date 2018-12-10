const AuthMiddleware = {
    authorize: (req, res, next) => {
        if(req.headers.authorization || req.query.key)
            return next();
        return res.status(401).json({message: 'Unauthenticated'})
    },
    login: (req, res, next) => {
        if(req && req.body && req.body.email) {

        }
        return res.redirect(res.location()) 
    },
    generateBearer() {
        
    }
}

module.exports = (function() {
    return AuthMiddleware
})()