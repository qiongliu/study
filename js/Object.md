###Object类型

1.对象是某个特定引用类型的实例。

2.在使用对象字面量语法时，属性名可以是标识符，也可以使用字符串。

3.在使用方括号访问对象属性时，应该将要访问的属性以字符串的形式放在方括号中。通常，除非必须使用变量来访问属性，否则我们建议使用点表示法。

###Array类型

1.在使用 Array 构造函数时也可以省略 new 操作符。

2.给构造函数传递一个值也可以创建数组。如果传递的是数值，则会按照该数值创建包含给定项数的数组；而如果传递的是其他类型的参数，则会创建包含那个值的只有一项的数组。

3.如果设置某个值的索引超过了数组现有项数，数组就会自动增加到该索引值加 1 的长度

4.数组的 length 属性不是只读的。因此，通过设置这个属性，可以从数组的末尾移除项或向数组中添加新项

5.Array.isArray()，IE9+

6.push()、pop()、unshift()、shift()

7.sort()，比较函数接收两个参数，如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等则返回 0，如果第一个参数应该位于第二个之后则返回一个正数。

### RegExp 类型
1.一个正则表达式就是一个模式与 3 个标志的组合体。

> g：表示全局（global）模式；

> i：表示不区分大小写（case-insensitive）模式；

> m：表示多行（multiline）模式

2.模式中使用的所有元字符都必须转义。元字符包括：
> ( [ { \ ^ $ | ) ? * + . ] } 

3.在 ECMAScript 3 中，正则表达式字面量始终会共享同一个 RegExp 实例，而使用构造函数创建的每一个新 RegExp 实例都是一个新实例。ECMAScript 5 明确规定，使用正则表达式字面量必须像直接调用 RegExp 构造函数一样，每次都创建新的 RegExp 实例。

4.正则括号的用法

> （1）、var regex = /(ab)+/g;

> var string = "ababa abbb ababab"; 

> console.log( string.match(regex) ); // ["abab", "ab", "ababab"]

> （2）、var regex = /^i love (JavaScript | Regular Expression)$/;

> console.log( regex.test("i love JavaScript") ); // true

> console.log( regex.test("i love Regular Expression") ); // true

> （3）、var regex = /(\d{4})-(\d{2})-(\d{2})/;

> var string = "2017-06-12";

> console.log( string.match(regex) );  => ["2017-06-12", "2017", "06", "12", index: 0, input: "2017-06-12"]

> console.log( regex.exec(string) );  => ["2017-06-12", "2017", "06", "12", index: 0, input: "2017-06-12"]

> var result = string.replace(regex, "$2/$3/$1"); console.log(result); // "06/12/2017"

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

### 基本包装类型
1.JS提供了 3 个特殊的引用类型：Boolean、Number 和 String。

2.Object 构造函数也会像工厂方法一样，根据传入值的类型返回相应基本包装类型的实例。

3.建议是永远不要使用 Boolean 对象。

4.Number 类型还提供了一些用于将数值格式化为字符串的方法。

> （1）、toFixed()方法会按照指定的小数位返回数值的字符串表示，如果数值本身包含的小数位比指定的还多，那么接近指定的最大小数位的值
就会舍入。IE8 及之前版本不能正确舍入范围在{(0.94,0.5],[0.5,0.94)}之间的值。对于这个范围内的值，IE 会返回 0，而不是1 或 1

> （2）、toExponential()方法返回以指数表示法（也称 e 表示法）表示的数值的字符串形式。 (10).toExponential(1) === "1.0e+1"

> （3）、toPrecision()方法可能会返回固定大小（fixed）格式，也可能返回指数（exponential）格式；具体规则是看哪种格式最合适。

5.*** String ***
> var s1 = "some text"; var s2 = s1.substring(2); 

> 代码访问 s1 时，访问过程处于一种读取模式，也就是要从内存中读取这个字符串的值。而在读取模式中访问字符串时，后台都会自动完成下列处理:

> (1) 创建 String 类型的一个实例； var s1 = new String("some text");

> (2) 在实例上调用指定的方法；var s2 = s1.substring(2);

> (3) 销毁这个实例。s1 = null; 

> 上面这三个步骤也分别适用于 Boolean和 Number 类型对应的布尔值和数字值。使用 new 操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁。

6.String 类型的每个实例都有一个 length 属性，表示字符串中包含多个字符。

7.两个用于访问字符串中特定字符的方法是：charAt()和 charCodeAt()。（ECMAScript 中没有字符类型）

8.可以使用方括号加数字索引来访问字符串中的特定字符。

9.concat()，用于将一或多个字符串拼接起来，返回拼接得到的新字符串。实践中使用更多的还是加号操作符（+）。

10.slice()、substr()和 substring()，这三个方法都会返回被操作字符串的一个子字符串。当参数为负值时，slice()方法会将传入的负值与字符串的长度相加，substr()方法将负的第一个参数加上字符串的长度，而将负的第二个参数转换为 0。最后，substring()方法会把所有负值参数都转换为 0。

11.indexOf()和 lastIndexOf()。这两个方法都是从一个字符串中搜索给定的子字符串，然后返子字符串的位置（如果没有找到该子字符串，则返回-1）。这两个方法的区别在于：indexOf()方法从字符串的开头向后搜索子字符串，而 lastIndexOf()方法是从字符串的末尾向前搜索子字符串。

12.trim()方法会创建一个字符串的副本，删除前置及后缀的所有空格，然后返回结果。IE9+支持。

13.大小写转换。toLowerCase()、toLocaleLowerCase()、toUpperCase()和 toLocaleUpperCase()。

14.match()方法只接受一个参数，要么是一个正则表达式，要么是一个 RegExp 对象。本质上与调用 RegExp 的 exec()方法相同。

15.search()方法返回字符串中第一个匹配项的索引；如果没有找到匹配项，则返回-1。

16.replace()方法，如果第一个参数是字符串，那么只会替换第一个子字符串。要想替换所有子字符串，唯一的办法就是提供一个正则表达式，而且要指定全局（g）标志。

17.split()，这个方法可以基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放在一个数组中。

### Global对象

1.没有全局变量或全局函数；所有在全局作用域中定义的属性和函数，都是 Global 对象的属性。

2.encodeURI()和 encodeURIComponent()方法可以对 URI（Uniform ResourceIdentifiers，通用资源标识符）进行编码。

3.我们使用 encodeURIComponent() 方法的时候要比使用encodeURI()更多，因为在实践中更常见的是对查询字符串参数而不是对基础 URI进行编码。

4.decodeURI()和decodeURIComponent() 解码。

5.eval()方法就像是一个完整的 ECMAScript 解析器，它只接受一个参数，即要执行的 ECMAScript（或 JavaScript）字符串。

6.通过 eval()执行的代码被认为是包含该次调用的执行环境的一部分，因此被执行的代码具有与该执行环境相同的作用域链。

7.在 eval()中创建的任何变量或函数都不会被提升，因为在解析代码的时候，它们被包含在一个字符串中；它们只在 eval()执行的时候创建。

8.JavaScript中的window对象除了扮演ECMAScript规定的Global对象的角色外，还承担了很多别的任务。

9.Math.max.apply(Math,[22,4,1,64,3]) === 64

10.从某个整数范围内随机选择一个值。

> 值 = Math.floor(Math.random() * 可能值的总数 + 第一个可能的值) 

> var num = Math.floor(Math.random() * 10 + 2);   2到10之间的任意值