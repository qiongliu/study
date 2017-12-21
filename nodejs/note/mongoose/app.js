const express = require('express');
const Student = require('./models/Student');
const app = express();

app.get('/',(req,res) => {
	let s1 = new Student({
		name: 'linyi',
		age: '22'
	});
	s1.save();
	res.send('hehe');
});

app.listen(7787);