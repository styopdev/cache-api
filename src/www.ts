import app from './app';
import * as debugModule from 'debug';
import * as http from 'http';
import * as mongoose from 'mongoose';

const debug = debugModule('node-express-typescript:server');
const server = http.createServer(app);

const dbConnection = () => {
  const options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect('mongodb://localhost:27017/cache-api', options);
};

const listen = () => {
  return server.listen(port)
    .on('error', onError)
    .on('listening', onListening);  
}

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// create server and listen on provided port (on all network interfaces).

dbConnection()
  .then(() => {
    console.info('Successfully connected to db');
    return listen();
  })
  .then(() => {
    console.info('Successfully runed server');
  })
  .catch((error) => {
    console.error(error);
  });

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: any): number|string|boolean {
  let port = parseInt(val, 10);

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

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

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
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;

  console.log('Listening on ' + bind);
}
