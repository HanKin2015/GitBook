# JavaScript 教程
学习地址：https://www.runoob.com/js/js-tutorial.html

# 1、认识
JavaScript 是 Web 的编程语言。

JavaScript web 开发人员必须学习的 3 门语言中的一门：
- HTML 定义了网页的内容
- CSS 描述了网页的布局
- JavaScript 网页的行为

JavaScript 是互联网上最流行的脚本语言，这门语言可用于 HTML 和 web，更可广泛用于服务器、PC、笔记本电脑、平板电脑和智能手机等设备。

脚本语言\轻量级的编程语言\可插入 HTML 页面的编程代码\可由所有的现代浏览器执行\很容易学习。



您只能在 HTML 输出中使用 document.write。如果您在文档加载后使用该方法，会覆盖整个文档。
alert() 函数在 JavaScript 中并不常用，但它对于代码测试非常方便。
onclick 事件只是您即将在本教程中学到的众多事件之一。
您会经常看到 document.getElementById("some id")。这个方法是 HTML DOM 中定义的。
DOM (Document Object Model)（文档对象模型）是用于访问 HTML 元素的正式 W3C 标准。
如果要在生产环境中使用，需要严格判断，如果输入的空格，或者连续空格 isNaN 是判别不出来的。可以添加正则来判断。

Java（由 Sun 发明）是更复杂的编程语言。
ECMA-262 是 JavaScript 标准的官方名称。
JavaScript 由 Brendan Eich 发明。它于 1995 年出现在 Netscape 中（该浏览器已停止更新），并于 1997 年被 ECMA（一个标准协会）采纳。

ECMAScript 6 也称为 ECMAScript 2015。
ECMAScript 7 也称为 ECMAScript 2016。

# 2、用法



# JS入门学习

李清照老是认为是一位男诗人。。。与辛弃疾合称济南二安，有千古第一才女之称。

## 双引号和单引号区别

timequery是不是应该翻译成实时查询，而不是时间查询。Real-time query

## 判断变量是否未定义

```
if (Object.prototype.toString.call(varStr) === "[object Undefined]") {
	varStr = g.nwglobvalObj.getval("key");
}
```

## 排序

arr = ['1230x1024', '800x600', '1920x1080',  '1024x768']
arr.sort().reverse()

arr.sort(function(a, b) {
	var x = a.split('x').map(Number);
	var y = b.split('x').map(Number);
	if (x[0] == y[0]) {
		return x[1] < y[1];
	}
	return x[0] < y[0];
);

## 月份的取值范围
Date.setFullYear(year,month,day)方法可用于设置月份及月份中的一天。

特别注意：月份和天数的起始值不一致，月份起始是0，天数起始是1。

参数	描述
year	必需。表示年份的四位整数。用本地时间表示。
month	可选。表示月份的数值。
用本地时间表示。介于 0 ~ 11 之间：
-1 为去年的最后一个月
12 为明年的第一个月
13 为明年的第二个月

day	可选。表示月中某一天的数值。
用本地时间表示。介于 1 ~ 31 之间：
0 为上个月最后一天
-1 为上个月最后一天之前的天数
如果当月有31天：
32 为下个月的第一天
如果当月有30天：
32 为下一个月的第二天





