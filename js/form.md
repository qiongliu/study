## 表单脚本
1.在 HTML 中，表单是由 form 元素来表示的，而在 JavaScript 中，表单对应的则是 HTMLFormElement
类型。HTMLFormElement 继承了 HTMLElement。

2.取得 form 元素的引用：var myform = document.forms['myform']。

3.独有的一些属性和方法：myform.action/elements/length/name/method/reset()/submit()。

4.使用 input 或 button 都可以定义提交按钮，只要将其 type 特性的值设置为"submit"即可。

5.只要表单中存在上面列出的任何一种按钮，那么在相应表单控件拥有焦点的情况下，按回车键就可以提交该表单。（textarea 是一个例外，在文本区中回车会换行。）如果表单里没有提交按钮，按回车键不会提交表单。

6.以上面方式提交表单时，浏览器会在将请求发送给服务器之前触发 submit 事件。这样，我们就有机会验证表单数据，并据以决定是否允许表单提交。阻止这个事件的默认行为就可以取消表单提交。

7.调用 submit() 方法也可以提交表单，这种方式无需表单包含提交按钮，任何时候都可以正常提交表单，但是不会触发 submit 事件。

8.提交表单时可能出现的最大问题，就是重复提交表单。可以在第一次提交表单后就禁用提交按钮，或者利用 onsubmit 事件处理程序取消后续的表单提交操作。