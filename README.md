###vue加载代码高亮
在使用highlight.js时，可以将此方法hljs.highlightElement(block)注册为全局指令。
也可以在需要的组件中直接导入，调用    hljs.highlightAll()实现显示代码片段。
在使用highlight.js-line-number.js时，内部需要的是window.hljs对象，所以在使用时，需要使用
window.hljs = require('highlight.js')。
显示行号时，使用 require('highlight.js-line-number')导入包。