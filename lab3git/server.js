// server.js
const http = require('http');


const hostname = 'localhost';
const port = 8000;


// Create the server and define what it does
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello SWU!\n');
});

// Start listening for requests
server.listen(port, hostname, () => {
  console.log(`Simple server http://${hostname}:${port}/`);
});
