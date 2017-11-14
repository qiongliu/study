###DOM
1.文档节点是每个文档的根节点。

2.文档节点只有一个子节点，即 html 元素，称之为文档元素，每个文档只能有一个文档元素。

3.DOM1 级定义了一个 Node 接口，该接口将由 DOM 中的所有节点类型实现。这个 Node 接口在 JavaScript 中是作为 Node 类型实现的；除了 IE 之外，在其他所有浏览器中都可以访问到这个类型。

4.每个节点都有一个 nodeType 属性，用于表明节点的类型。Node 类型中定义了 12 个数值常量来表示12个节点类型。

5.由于 IE 没有公开 Node 类型的构造函数，为了确保跨浏览器兼容，最好还是将 nodeType 属性与数字值进行比较。document.nodeType === 9

6.nodeName 和 nodeValue 这两个属性的值完全取决于节点的类型。

7.对于元素节点，nodeName 中保存的始终都是元素的标签名，而 nodeValue 的值则始终为 null。

8.每个节点都有一个 childNodes 属性，其中保存着一个 NodeList 对象。

9.每个节点都有一个 parentNode 属性，该属性指向文档树中的父节点。

10.通过使用列表中每个节点的 previousSibling 和 nextSibling 属性，可以访问同一列表中的其他节点。

11.父节点的 firstChild 和 lastChild属性分别指向其 childNodes 列表中的第一个和最后一个节点。

12.所有节点都有的最后一个属性是 ownerDocument，该属性指向表示整个文档的文档节点。

13.document 对象是 HTMLDocument（继承自 Document 类型）的一个实例，表示整个 HTML 页面。document 对象是 window 对象的一个属性，因此可以将其作为全局对象来访问。

14.document对象的属性：documentElement、firstChild 和 childNodes[0]的值相同，都指向 html 元素。

15.作为 HTMLDocument 的实例，document 对象还有一个 body 属性，直接指向 body 元素。

16.Document 另一个可能的子节点是 DocumentType。可以通过 doctype 属性（在浏览器中是 document.doctype）来访问它的信息。

17.document.title，包含着 title 元素中的文本——显示在浏览器窗口的标题栏或标签页上。

18.URL、domain 和 referrer。只有 domain 是可以设置的。当页面中包含来自其他子域的框架或内嵌框架时，通过将每个页面的
document.domain 设置为相同的值，这些页面就可以互相访问对方包含的 JavaScript 对象了。domain 属性还有一个限制，即如果域名一开始是“松散的”（loose），那么不能将它再设置为“紧绷的”（tight）。换句话说，在将 document.domain 设置为"wrox.com"之后，就不能再将其设置回"p2p.wrox.com"。

19.appendChild()，用于向 childNodes 列表的末尾添加一个节点。如果传入到 appendChild()中的节点已经是文档的一部分了，那结果就是将该节点从原来的位置转移到新位置。

20.insertBefore()方法接受两个参数：要插入的节点和作为参照的节点。

21.replaceChild()方法接受的两个参数是：要插入的节点和要替换的节点。

22.如果只想移除而非替换节点，可以使用 removeChild()方法。

23.cloneNode()，用于创建调用这个方法的节点的一个完全相同的副本。执行深复制，也就是复制节点及其整个子节点树；在参数为 false 的情况下，执行浅复制，即只复制节点本身。

24.cloneNode()方法不会复制添加到 DOM节点中的JavaScript属性，例如事件处理程序等。IE在此存在一个 bug，即它会复制事件处理程序，所以我们建议在复制之前最好先移除事件处理程序。

25.getElementsByTagName()方法会返回一个 HTMLCollection 对象，作为一个“动态”集合，该对象与 NodeList 非常类似。

26.在提供按索引访问项的基础上，HTMLCollection 还支持按名称访问项。

27.getElementsByName()方法会返回带有给定 name 特性的所有元素。

28.document 对象还有一些特殊的集合。这些集合都是 HTMLCollection 对象。document.anchors、document.forms、document.images。

29.如果在文档加载结束后再调用 document.write()，那么输出的内容将会重写整个页面。

### Element类型 
1.要访问元素的标签名，可以使用 nodeName 属性，也可以使用 tagName 属性；得到大写的标签名，建议在比较之前进行相同的大小写转移。

2.所有 HTML 元素都由 HTMLElement 类型 或者 HTMLElement 的子类型来表示。HTMLElement 类型直接继承自 Element 并添加了一些属性。

3.getAttribute()、setAttribute()和 removeAttribute()。

4.Element 类型是使用 attributes 属性的唯一一个 DOM 节点类型。attributes 属性中包含一个 NamedNodeMap，与 NodeList 类似。

5.使用 document.createElement()方法可以创建新元素。这个方法只接受一个参数，即要创建元素的标签名。

6.元素也支持 getElementsByTagName() 方法。在通过元素调用这个方法时，除了搜索起点是当前元素之外，其他方面都跟通过 document 调用这个方法相同

### Text类型
1.可以通过 nodeValue 属性或 data 属性访问 Text 节点中包含的文本。

2.可以使用 document.createTextNode()创建新文本节点，这个方法接受一个参数——要插入节点中的文本。

3.如果在一个包含两个或多个文本节点的父元素上调用 normalize()方法，则会将所有文本节点合并成一个节点，结果节点的 nodeValue 等于将合并前每个文本节点的 nodeValue 值拼接起来的值。

### DocumentFragment 类型
1.在所有节点类型中，只有 DocumentFragment 在文档中没有对应的标记。

2.DOM 规定文档片段（document fragment）是一种“轻量级”的文档，可以包含和控制节点，但不会像完整的文档那样占用额外的资源。

3.虽然不能把文档片段直接添加到文档中，但可以将它作为一个“仓库”来使用，即可以在里面保存将来可能会添加到文档中的节点。要创建文档片段，可以使用 document.createDocumentFragment()方法。

### DOM 操作技术
1.动态加载的外部 JavaScript 文件能够立即运行。

2.动态创建 style 使用了 try-catch 语句来捕获 IE 抛出的错误，然后再使用针对 IE 的特殊方式来设置样式

### 使用NodeList
1.理解 NodeList 及其“近亲”NamedNodeMap 和 HTMLCollection，是从整体上透彻理解 DOM 的关键所在。这三个集合都是“动态的”；

2.DOM 操作往往是 JavaScript 程序中开销最大的部分，应该尽量减少访问 NodeList 的次数。因为每次访问 NodeList，都会运行一次基于文档的查询。所以，可以考虑将从 NodeList 中取得的值缓存起来。