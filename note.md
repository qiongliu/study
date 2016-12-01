# note
## jquery
### 1.jquery查看元素绑定的事件
> `eg: $._data($(".linyi-dialog-btn-close").get(0))`

## js
### 1.禁止页面内容被选中
> `document.onselectstart=new Function('event.returnValue=false;');`

### 2.获取事件目标
> `var  ev  =  window.event  ||  arguments.callee.caller.arguments[ 0 ]`

