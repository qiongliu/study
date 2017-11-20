const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.set('upload','./upload');

app.use('/public',express.static(path.join(__dirname,'public')));
app.use('/upload',express.static(path.join(__dirname,'upload')));

app.use('/favicon.ico',()=>{return;});

app.use('/',require('./routers/index'));

app.listen(7787);