const config = require('./config/main');
const https = require('https');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();


global.appRoot = path.resolve(__dirname);


mongoose.connect(config.mongoUrl, config.mongoOptions);

const db = mongoose.connection;

app.use(helmet());
app.use(cors());
app.use(cookieParser());

app.use(bodyParser.json({
}));

app.use('/assets', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
},  express.static( global.appRoot + '/static' ));

const routes = [
    {auth: false, component: 'Admin'},
    {component: 'Auth'},
    {component: 'Country'},
    {component: 'Post'},
    {auth: true, component: 'User'},
    //needs to be registered last
    {component: 'Index'},
],
Router = require(global.appRoot + '/Router/Router');
ApiRouter = new Router('', routes);

app.use('', ApiRouter)

db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', () => {

    console.log('Connexion à la base OK');
    app.listen(config.PORT, config.hostname, () => {
        console.log(`Server running on ${config.hostname}:${config.PORT} \r\n`);
    });

});