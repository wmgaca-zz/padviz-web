var port = process.env.PORT || 8080;
var fs = require('fs');
var http = require('http');
var io = require('socket.io');
var log = io.listen(http.createServer()).log; // access the existing logger setup in socket.io

var server = http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-type': 'text/html'});
    response.write('Hello, World')
}).listen(port, function() {
    log.info('Listening at: http://localhost:8080');
});

io.listen(server).on('connection', function (socket) {
    socket.emit('news', { my: 'haha'});

	socket.on('message', function (message) {
        log.info('Message Received: ', message);
        socket.broadcast.emit('message', message);
    });

	socket.on('fetch', function(message) {
		log.info('Fetch request received: ', message);
		socket.emit('data', message);
	});
});

