const config = {

    'hostname' : 'localhost',
    'PORT' : process.env.PORT || 3002,

    'mongoUrl' : 'mongodb+srv://localtester:blamamlerer309@cluster0-odz8c.mongodb.net/testApi',
    'mongoOptions' : {
        'useNewUrlParser': true,
        'keepAlive': 300000,
        'connectTimeoutMS': 30000,
    },

    'auth': {
        'secret': '2J1MQUBMfE'
    },
    'ssl': {
        'key': `${global.appRoot}/config/encryption/localhost.rsa.pkey`,
        'cert': `${global.appRoot}/config/encryption/localhost.rsa.csr`
    }

};

module.exports = config;