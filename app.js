const http = require('http');

const content = require('./content');

const server = http.createServer(content);

server.listen(3000);