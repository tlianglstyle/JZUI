		<h4>Methods</h4>
		<p>使用<code>JZ.Vue</code>初始化Vue全局对象。</p>
		<p><code>HTML:</code></p>
		<pre class="lang-html">&lt;div&gt;{{ name }}&lt;/div&gt;</pre>
		<p><code>Javascript:</code></p> 
		<pre>
vm = new JZ.Vue({ 
	data: {name:'tanliang'} 
});</pre> 
		<p><code>Result:</code></p>
		<pre class="lang-html">&lt;div&gt;tanliang&lt;/div&gt;</pre>
		<div class="alert alert-info alert-dismissible" role="alert">
		  <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
		  1.<b>JZ.Vue</b>继承自<b>Vue.js</b>，你可以在这里使用绝大部分的<b>Vue</b>属性。<br><br>
		  2.<b>JZ.Vue</b>默认使用<b>document.body</b>作为<b>Vue</b>渲染的容器，你应该将所有需要使用<b>Vue</b>的内容放在<b>JZ.Vue</b>中。
		</div>
		<p>我们在JZ.Vue添加了tables参数允许你添加数据表格。</p>
		<div class="alert alert-info alert-dismissible" role="alert">
		  <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
		虽然JZ.Table也可以加载一个数据表格，但使用JZ.Vue能够实现更多的功能，如添加其他的一些Vue数据绑定。		  
		</div>
		<p>使用<code>JZ.Vue</code>创建数据表格。</p>
		<pre>
vm = new JZ.Vue({ 
	tables:{
		myTable:{
			data:'DataList',
			url:'http://getdata'
		}
	},
	data: {name:'tanliang'} 
});</pre>  
		<div class="alert alert-info alert-dismissible clearfix" role="alert">
		  <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
		  <b>JZ.Vue</b>中的Table配置与<b>JZ.Table</b>配置项完全相同。
		  <br><br>
		  <b>Links：</b><a href="../Vue/index.html" target="_blank" class="alert-link">如何在JZ.Vue中使用表格？</a>
		  <a href="#section-Table" class="alert-link">去查看JZ.Table配置项</a>
		</div>
		<br><h4>Options</h4> 
		<div class="table-responsive">
			 <table width="100%" class="table table-striped table-bordered table-hover" id="vue-table1-table1">
			  <thead>
			      <tr>
					   <th>名称</th>
					   <th>默认值</th>
					   <th>描述</th>
					   <th>必需</th>
			      </tr>
			  </thead>
			  <tbody>
					<tr>
						<th>el</th>
						<td>body</td>
						<td>Vue容器选择器</td>
						<td></td>
					</tr>
					<tr>
						<th>tables</th>
						<td></td>
						<td>表格集合</td>
						<td></td>
					</tr>
					<tr>
						<th>data</th>
						<td></td>
						<td>数据容器,请参照Vue.js官方文档</td>
						<td></td>
					</tr>
			  </table>
		</div> 
		<br><h4>Events</h4>
		<div class="table-responsive">
			 <table width="100%" class="table table-striped table-bordered table-hover" id="vue-table1-table1">
			  <thead>
			      <tr>
					   <th>事件类型</th>
					   <th>描述</th>
			      </tr>
			  </thead>
			  <tbody>
					<tr>
						<th>filter</th>
						<td>添加Vue.filter</td>
					</tr>
					<tr>
						<th>methods</th>
						<td>事件(请参照Vue.js官方文档)</td>
					</tr>
					<tr>
						<th>computed</th>
						<td>计算属性(请参照Vue.js官方文档)</td>
					</tr>
			  </table>
		</div> 