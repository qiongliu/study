//如果省略路径，省略后缀，即表示为一个文件夹路径，则会从node_modules目录下查找此文件夹，
//以此文件夹下package.json文件的 main 属性指定的文件为主文件。
let Person = require('demo2');
//如果省略路径，则必须在node_modules的根目录下
let demo3 = require('demo3.js');

let p1 = new Person('linyi',30);
p1.getInfo();

console.log(demo3.name);