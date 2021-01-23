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
