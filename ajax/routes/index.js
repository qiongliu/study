var express = require('express');
var router = express.Router();
var person = [{id:1,name:'林一',age:24},{id:2,name:'林二',age:27},{id:3,name:'林三',age:29}];

router.all('/text1',function(req,res){
	res.sendFile('/list.html',{root:__dirname + '/../public'});
})

router.all('/text2',function(req,res){
	var arr = [];
	var id = req.query.id;
	for(var i = 0;i<person.length;i++){
		if(person[i].id == id){
			arr.push(person[i]);
		}
	}
	console.log(arr);
	res.send(arr);
})

router.get('/text3',function(req,res){
	var arr = [];
	var id = req.query.id;
	for(var i = 0;i<person.length;i++){
		if(person[i].id == id){
			arr.push(person[i]);
		}
	}
	res.send(toHtml(arr));
})

router.all('/text4',function(req,res){
	res.send(person);
})

function toHtml(parame){
	var arr = [];
	for(var i = 0;i<person.length;i++){
		arr.push("<li>" + person[i].name + "</li>");
	}
	return "<ul>" + arr.join("") + "</ul>";
}
module.exports = router;