/**
* server.js
* Static server code to start the intergrated web server.
* if(env === 'production') server starts at port 8080 without gulp task runner.
* if(env === 'development') server starts at port 3000 which will be used by the gulp task runner for development
*/

/* require necessary module*/
//var StaticServer = require('static-server');
var express = require('express');
var path = require('path');
var app = express();

//var env = process.ENV || 'production';

app.use(express.static(__dirname + '/main/dist'));
app.use(express.static(__dirname + '/admin/dist'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/main/dist/index.html'));
});

app.get('/admin', function(req, res) {
  res.sendFile(path.join(__dirname + '/admin/dist/index.html'));
});

app.listen(3001, function(err) {
  if(err) {
    console.log('Error in starting the server on port ' + 3001);
  } else {
    console.log('Server running on port ' + 3001);
  }
})
// var serverOptions = {};

//configuring the server options based on the environment, only serves production /dist folder
// if(env === 'production') {
//   serverOptions.rootPath = './main/dist';
//   serverOptions.port = 8080;
// }

//var server = new StaticServer(serverOptions);

// starting the static server
// server.start(function(err) {
//   if(err) {
//     console.error("Error in starting the server on port: " + serverOptions.port);
//   } else {
//     console.info("Server listening on port: " + serverOptions.port);
//   }
// });
