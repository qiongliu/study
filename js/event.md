### 事件
1.高级浏览器，事件冒泡至window。顺序如下：目标元素->body->html->document->window

2.“DOM2级事件”规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。

3.即使“DOM2 级事件”规范明确要求捕获阶段不会涉及事件目标，但 IE9、Safari、Chrome、Firefox 和 Opera 9.5 及更高版本都会在捕获阶段触发事件对象上的事件。结果，就是有两个机会在目标对象上面操作事件。

4.HTML事件处理程序：
> `<input type="button" value="Click Me" onclick="try{alert(event.type);}catch(ex){}"> `

将相应的属性设置为 null,即可删除事件

5.DOM0 级事件处理程序：

添加的事件处理程序会在事件流的冒泡阶段被处理。

> btn.onclick = function(){alert(this.id);}; 

>btn.onclick = null; //删除事件处理程序

6.“DOM2级事件”定义了两个方法，用于处理指定和删除事件处理程序的操作：addEventListener()和 removeEventListener()。所有 DOM 节点中都包含这两个方法

7.接受 3 个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。最后这个布尔值参数如果是 true，表示在捕获阶段调用事件处理程序；如果是 false，表示在冒泡阶段调用事件处理程序。

8.使用 DOM2 级方法添加事件处理程序的主要好处是可以添加多个事件处理程序

9.通过 addEventListener()添加的匿名函数将无法移除

10.IE事件处理程序：

> attachEvent()和 detachEvent()

> 由于 IE8 及更早版本只支持事件冒泡，所以通过attachEvent()添加的事件处理程序都会被添加到冒泡阶段

> 注意，attachEvent()的第一个参数是"onclick"，而非 DOM 的 addEventListener()方法中的"click"。

> 使用 attachEvent()方法的情况下，事件处理程序会在全局作用域中运行，因此 this 等于 window

> btn.attachEvent("onclick", function(){alert(this === window); //true});

> 添加的多个事件，不是以添加它们的顺序执行，而是以相反的顺序被触发

11.内存和性能：

> 事件委托利用了事件冒泡,使用事件委托，只需在DOM 树中尽量最高的层次上添加一个事件处理程序

> 移除事件处理程序,在使用 innerHTML 替换页面中某一部分的时候。如果带有事件处理程序的元素被 innerHTML 删除了，那么原来添加到元素中的事件处理程序极有可能无法被当作垃圾回收

> 如果你知道某个元素即将被移除，那么最好手工移除事件处理程序

> 在事件处理程序中删除按钮也能阻止事件冒泡。目标元素在文档中是事件冒泡的前提。