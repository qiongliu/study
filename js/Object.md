### Function类型
1.函数是对象，每个函数都是 Function 类型的实例，函数名是一个指向函数对象的指针；

> function sum (num1, num2) {return num1 + num2;} 

> var sum = function(num1, num2) {return num1 + num2;}; 

> var sum = new Function("num1", "num2", "return num1 + num2"); 

2.解析器在向执行环境中加载数据时，解析器会率先读取函数声明，并使其在执行任何代码之前可用（可以访问）；至于函数表达式，则必须等到解析器执行到它所在的代码行，才会真正被解释执行。

3.在函数内部，有两个特殊的对象：arguments 和 this。其中，arguments是一个类数组对象，包含着传入函数中的所有参数。这个对象还有一个名叫 callee 的属性，该属性是一个指针，指向拥有这个 arguments 对象的函数。

4.this引用的是函数据以执行的环境对象。

5.caller属性中保存着调用当前函数的函数的引用，如果是在全局作用域中调用当前函数，它的值为 null。

6.每个函数都包含两个属性：length 和 prototype。其中，length 属性表示函数希望接收的命名参数的个数。prototype 属性是不可枚举的，因此使用 for-in 无法发现。

7.每个函数都包含两个非继承而来的方法：apply()和 call()。它们强大的地方是能够扩充函数赖以运行的作用域，好处就是对象不需要与方法有任何耦合关系。