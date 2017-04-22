/**
 * main app -- EXPRESS SERVER
 */

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var helmet = require('helmet');
var fs = require('fs-extra');
var moment=require('moment');
var MongoClient = require('mongodb').MongoClient;
var busboy = require('connect-busboy'); 
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session: expressSession});
var mongoose = require('mongoose');

require('./node/models/user.js');
require('./node/models/company.js');

var bson = require('bson');
var app = express();
app.use(busboy());

	app.engine('.html',require('ejs').__express);
	app.set('views',__dirname+'/');
	app.set('view engine','html');
    app.use('/node-modules', express.static(__dirname +'/node-modules'));
	app.use('/img/', express.static('./img/'));
    app.use('/', express.static('./'));
    var conn=mongoose.connect('mongodb://liviu:liviu@cst-shard-00-00-5x0ht.mongodb.net:27017,cst-shard-00-01-5x0ht.mongodb.net:27017,cst-shard-00-02-5x0ht.mongodb.net:27017/cst?ssl=true&replicaSet=CST-shard-0&authSource=admin');
    app.use(helmet.noSniff());
    // Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    
require('./node/routes.js')(app);
app.get('*', function(req, res){
    res.render('index.html');
});

var server = http.createServer(app).listen( process.env.PORT || 5000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
