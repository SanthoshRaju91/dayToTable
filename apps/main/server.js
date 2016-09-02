/**
* server.js
* Static server code to start the intergrated web server.
* if(env === 'production') server starts at port 8080 without gulp task runner.
* if(env === 'development') server starts at port 3000 which will be used by the gulp task runner for development
*/

/* require necessary module*/
var StaticServer = require('static-server');
var env = process.ENV || 'dev';

var serverOptions = {};

//configuring the server options based on the environment.
serverOptions.rootPath = './';
serverOptions.port = 9000;

var server = new StaticServer(serverOptions);

// starting the static server
server.start(function(err) {
  if(err) {
    console.error("Error in starting the server on port: " + serverOptions.port);
  } else {
    console.info("Server listening on port: " + serverOptions.port);
  }
});
