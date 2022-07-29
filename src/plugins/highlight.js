window.hljs = require('highlight.js')
require('../plugins/highlightjs-line-numbers')
//封装成一个指令,highlight是指令的名称
export const highlight = el => {
  let blocks = el.querySelectorAll('code')
  blocks.forEach(block => {
    hljs.highlightElement(block)
  })
}
