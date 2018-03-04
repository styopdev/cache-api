"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var debugModule = require("debug");
var http = require("http");
var mongoose = require("mongoose");
var config = require("config");
var debug = debugModule('node-express-typescript:server');
var server = http.createServer(app_1.default);
var dbConnection = function () {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    var host = config.get('db.host');
    var username = config.get('db.username');
    var password = config.get('db.password');
    var name = config.get('db.name');
    return mongoose.connect("mongodb://" + (username && password ? (username + ':' + password + '@') : '') + host + "/" + name, options);
};
var listen = function () {
    return server.listen(port)
        .on('error', onError)
        .on('listening', onListening);
};
// Get port from environment and store in Express.
var port = normalizePort(process.env.PORT || config.get('port'));
app_1.default.set('port', port);
// create server and listen on provided port (on all network interfaces).
dbConnection()
    .then(function () {
    console.info('Successfully connected to db');
    return listen();
})
    .then(function () {
    console.info('Successfully runed server');
})
    .catch(function (error) {
    console.error(error);
});
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
//# sourceMappingURL=www.js.map