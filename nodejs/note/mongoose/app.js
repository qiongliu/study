const express = require('express');
const app = express();
const Student = require('./models/Student');

app.get('/',(req,res) => {
	let random = parseInt(Math.random() * (14 -2 + 1) + 2);
	res.send(random+'');
});

app.listen(7787);