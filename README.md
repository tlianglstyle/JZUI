#JZUI
###使用bootstrap+vuejs库,配合webpack,gulp构建工具搭建的后端js组件库

###install
``` bash
### git
$ git clone https://github.com/tlianglstyle/JZUI.git

### install 
$ npm install  (or 'cnpm install')
### build
$ gulp dev
### open
open  http://localhost:3000/dist/app/Vue/index.html

```
## modules

The modules are individual files in the "src/js/common/" directory.

<table>
<thead><tr>
  <th>module</th> <th>default</th> <th>description</th>
</tr></thead>
<tbody>
  <tr>
    <th><a href="dist/app/Table/Table.html">Table</a></th>
    <td>✔</td>
    <td>Single table settings</td>
  </tr>
  <tr>
    <th><a href="dist/app/Vue/index.html">Vue Global</a></th>
    <td>✔</td>
    <td>Global Vue Config By document.body</td>
  </tr>
  <tr>
    <th><a href="dist/app/Vue/index.html">Form</a></th>
    <td>✔</td>
    <td>Contains FormData and validate from a form</td>
  </tr>
  <tr>
    <th><a href="dist/app/Vue/index.html">others</a></th>
    <td></td>
    <td>Other components of example</td>
  </tr>
</tbody>
</table>

#site
demo：<http://tlianglstyle.github.io/JZUI/dist/app/Vue/index.html>


```

#文件结构
>src 
>>api  
>>common  
>>>iconfont  
>>>images  
>>>common.css  
>>>common.js  

>>component  
>>config  
>>>base.config.js  
>>>http_code.config.js  
>>>router.config.js 
>>>webpack.base.config.js  
>>>webpack.build.config.js  
>>>webpack.dev.config.js  

>>service  
>>views  
>>gulpfiles.js  
>>index.html  
>>main.js  

>package.json  

[JZUI](http://www.jzjz.com) at jzjz.com
[demo][example](http://tlianglstyle.github.io/JZUI/dist/app/Vue/index.html) 
