const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
const formidable = require('formidable');
const db = require('./models/db');

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'html');
app.engine('html',ejs.renderFile);

app.use('/public',express.static(path.join(__dirname,'public')));

app.use('/favicon.ico',() => {return;});

app.get('/',(req,res) => {
	db.find('message',{}).then((result) => {
		res.render('index',{
			data: result
		})
	},(err) => {

	})
});
app.post('/',(req,res) => {
	let data = {};
	let form = new formidable.IncomingForm();
	form.parse(req,(err, fields) => {
		if (err) {
			data.code = 1;
		} else {
			data = {
				code: 0,
				name: fields.name,
				content: fields.content,
				time: new Date()
			};
			db.insert('message',data).then((result) => {
				res.json(data);
			},(err) => {
				console.log(err);
			})
		}
	});
});

app.listen(7787);