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
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', () => {
    console.log('Connexion à la base OK');
});

// const Auth = require(global.appRoot + '/Auth/AuthController');
// const PaysRoutes = require(global.appRoot + '/Router/RoutesPays');
// const PostsRoutes = require(global.appRoot + '/Router/RoutesPost');

app.use(helmet());
app.use(cors());
app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

/**
 * 
 * Api Routes
 * 
 */
const authRoutes = require( global.appRoot + '/Router/AuthRoutes' );
const userRoutes = require( global.appRoot + '/Router/UserRoutes' );
const countryRoutes = require( global.appRoot + '/Router/CountryRoutes' );
const postRoutes = require( global.appRoot + '/Router/PostRoutes' );
const uploadHelper = require( global.appRoot + '/Router/UploadingRoutes' );


app.use('/assets', express.static( global.appRoot + '/static' ));
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/pays', countryRoutes);
app.use('/blog', postRoutes);
app.use('/uploads', uploadHelper);

// https.createServer({
    
// })
app.listen(config.PORT, config.hostname, () => {
    console.log(`Server running on ${config.hostname}:${config.PORT} \r\n`);
});