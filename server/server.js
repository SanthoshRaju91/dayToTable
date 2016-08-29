/**
* Main server file, connecting to backend database and available service calls.
*/
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var jwt =  require('express-jwt');
//requiring app configuration from config file & logger util
var config = require('./config/');
var logger = require('./utils/logUtil').logger;
//initiating the application server
var app = express();


//connecting to mongoDB
var connection = mongoose.createConnection(config.mongodb.url);
autoIncrement.initialize(connection);

mongoose.connect(config.mongodb.url, function(err){
    if(err) logger.error("Error in connecting to mongo DB" + err);
    else logger.info("Connected to MongoDB");
});

//app middleware configuration
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(__dirname + '/views/main'));
app.use(express.static(__dirname + '/views/admin'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(morgan('combined'));


//rendering the default html page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/main/', 'index.html'));
});

app.post('/login', require('./controllers/user-controller').authenticateUser);

app.post('/register', require('./controllers/user-controller').registerUser);

//app.use('/api', jwt({secret: config.session}), require('./routes/routes.js'));

app.use('/api', require('./routes/routes.js'));

app.listen(config.config.port, function(err) {
  if(err) {
      logger.error("Error in starting the port at " + config.config.port);
    } else {
      logger.info("Server listening on port: " + config.config.port);
    }
});
