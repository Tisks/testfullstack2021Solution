#!/usr/bin/env node
/**
 * Module dependencies.
 */
import debug from 'debug';
import http from 'http';
import app from '../app';
/**
 * Normalizar el puerto en un string o numero.
 */
const normalizePort = val => {
  //Base 10
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // Pipe con nombre
    return val;
  }
  if (port >= 0) {
    // Numero de puerto 
    return port;
  }
  return false;
};
/**
 * Inicializacion default de puerto y guardarlo en Express
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
/**
 * Crear el servidor HTTP.
 */
const server = http.createServer(app);
/**
 * Event listener para el evento de error del servidor HTTP
 */
const onError = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  // mensajes de error
  switch (error.code) {
  case 'EACCES':
    alert(`${bind} se requiere de mayor autorizacion`);
    process.exit(1);
    break;
  case 'EADDRINUSE':
    alert(`${bind} el puerto ya esta en uso`);
    process.exit(1);
    break;
  default:
    throw error;
  }
};
/**
 * Event listener para el servidor HTTP
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
};
/**
 * Escuchar el puerto y declarar las funciones a realizar si ocurre un error y mostrar en pantalla que puerto se esta escuchando
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);