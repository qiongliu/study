var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.use('/user',require('./routes/index.js'));

app.listen(7788);

console.log('running end');