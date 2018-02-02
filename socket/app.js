const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/',(req,res) => {
	res.sendFile(__dirname + '/index.html')
});

io.on('connection',(socket) => {
	// console.log('io-connect');
	socket.on('disconnect',() => {
		// console.log('disconnect');
	});
	socket.on('chat message',(msg) => {
		console.log('message' + msg);
		io.emit('chat message', msg);
	})
});

http.listen(3000,() => {
	console.log('connect success');
});
