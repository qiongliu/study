import '../css/index.css';
import '../scss/index.scss';

let message = "hello webpack";
console.warn('this is a warn');
$(function(){
	document.getElementById('title').innerHTML = message;
})