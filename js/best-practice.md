# Best Practice
## 正确、合理的缩进和代码注释
## 命名规范
1、变量名为名词,且类型透明，可用赋初值实现
> var person = null;（对象）

> var flag = true;（布尔）

> var count = 0;（数值）

> var name = '';	（字符串）

2、函数名以动词开始 
> getName()

> isEnumerable()

3、变量和函数名都应使用合乎逻辑的名字，不用担心长度，长度问题可以通过后续的压缩、打包处理

## 松散耦合
1、避免在js中创建大量html。可将某段元素包含在页面中并隐藏，用js控制是否显示；

2、ajax请求数据，可以让后台直接输出标记；（？？）

3、避免通过js更改样式。可以更改类名而非样式来实现，这样的话，所有的问题都直接追溯到css；

4、解耦应用逻辑/事件处理程序。首先，可以更容易更改触发特定过程的事件。如
果最开始由鼠标点击事件触发过程，但现在按键也要进行同样处理。其次，可以在不附加到事件的情况下测试代码，使其更易创建单元测试或者是自动化应用流程。

以下是要牢记的应用和业务逻辑之间松散耦合的几条原则：

> 1、勿将 event 对象传给其他方法；只传来自 event 对象中所需的数据；

> 2、任何可以在应用层面的动作都应该可以在不执行任何事件处理程序的情况下进行；

> 3、任何事件处理程序都应该处理事件，然后将处理转交给应用逻辑。

## 编程实践

1、 尊重对象所有权
> 最佳的方法便是永远不要修改不是由自己创建的对象。比如自己创建的自定义类型或对象字面量，而 Array、document 这些显然不是你的，它们在你的代码执行前就存在了。

> 可以通过以下方式为对象创建新的功能：
1、创建包含所需功能的新对象，并用它与相关对象进行交互；
2、创建自定义类型，继承需要进行修改的类型。然后可以为自定义类型添加额外功能。

2、 避免全局变量。最多创建一个全局变量，让其他对象和函数存在其中。

`var name = "linyi";
function sayName(){
 alert(name);
} 
`

> 这段代码包含了两个全局量：变量 name 和函数 sayName()。

> 其实可以创建一个包含两者的对象。这样做消除了一些存在于前一段代码中的一些问题。首先，变量 name 覆盖了 window.name 属性，可
能会与其他功能产生冲突；其次，它有助消除功能作用域之间的混淆。调用 MyApplication.sayName()
在逻辑上暗示了代码的任何问题都可以通过检查定义 MyApplication 的代码来确定。

`var MyApplication = {
 name: "linyi",
 sayName: function(){
 alert(this.name);
 }
}; `

3、避免与 null 进行比较

> 遇到与 null 比较的情况，尝试使用以下技术替换：

> （1）、如果值应为一个引用类型，使用 instanceof 操作符检查其构造函数；

> （2）、如果值应为一个基本类型，使用 typeof 检查其类型；

> （3）、如果是希望对象包含某个特定的方法名，则使用 typeof 操作符确保指定名字的方法存在于对象上。
`typeof o.name != 'undefined'`

> 代码中的 null 比较越少，就越容易确定代码的目的，并消除不必要的错误。 

4、使用常量 
> 将数据和使用它的逻辑进行分离。要注意的值的类型如下所示。

> 重复值——任何在多处用到的值都应抽取为一个常量。这就限制了当一个值变了而另一个没变的时候会造成的错误。这也包含了 CSS 类名。

> 用户界面字符串 —— 任何用于显示给用户的字符串，都应被抽取出来以方便国际化。

> URLs ——在 Web 应用中，资源位置很容易变更，所以推荐用一个公共地方存放所有的 URL。

> 任意可能会更改的值 —— 每当你在用到字面量值的时候，你都要问一下自己这个值在未来是不
是会变化。如果答案是“是”，那么这个值就应该被提取出来作为一个常量。

对于企业级的 JavaScript 开发而言，使用常量是非常重要的技巧，因为它能让代码更容易维护，并
且在数据更改的同时保护代码。

## 性能
1、避免全局查找。将在一个函数中会用到多次的全局对象存储为局部变量总是没错的。

2、避免不必要的属性查找。一般来讲，尽可能多地使用局部变量将属性查找替换为值查找。进一步讲，如果即可以用数字化的数组位置进行访问，也可以使用命名属性（诸如 NodeList对象），那么使用数字位置。

3、优化循环

4、避免双重解释。当 JavaScript 代码想解析 JavaScript 的时候就会存在双重解释惩罚。

`eval("alert('Hello world!')"); `
`var sayHi = new Function("alert('Hello world!')"); `
`setTimeout("alert('Hello world!')", 500); `
> 在以上这些例子中，都要解析包含了 JavaScript 代码的字符串。这个操作是不能在初始的解析过程
中完成的，因为代码是包含在字符串中的，也就是说在 JavaScript 代码运行的同时必须新启动一个解
析器来解析新的代码。实例化一个新的解析器有不容忽视的开销，所以这种代码要比直接解析慢得多。

5、原生方法更快

6、switch语句比if-else更快

7、完成多个操作的单个语句要比完成单个操作的多个语句快。所以，就要找出可以组合在一起的语句，以减少脚本整体的执行时间。

> (1)、`var count = 5,
 color = "blue",
 values = [1,2,3],
 now = new Date(); `

> (2)、 `var name = values[i++]; `
> (3)、 使用数组和对象字面量 

8、优化DOM

(1)、最小化现场更新。是使用文档片段来构建 DOM 结构。

(2)、使用 innerHTML。当把 innerHTML 设置为某个值时，后台会创建一个 HTML 解析器，然后使用内部的 DOM 调用来创建 DOM 结构，而非基于 JavaScript 的 DOM 调用。由于内部方法是编译好的而非解释执行的，所以执行快得多。

(3)、使用事件代理

(4)、任何时候要访问 HTMLCollection，不管它是一个属性还是一个方法，都是在文档上进行一个查询，这个查询开销很昂贵。最小化访问 HTMLCollection 的次数可以极大地改进脚本的性能。

发生以下情况时会返回 HTMLCollection 对象：

> 进行了对 getElementsByTagName() 的调用；

> 获取了元素的 childNodes 属性；

> 获取了元素的 attributes 属性；

> 访问了特殊的集合，如 document.forms、document.images 等。

> 要了解当使用 HTMLCollection 对象时，合理使用会极大提升代码执行速度。