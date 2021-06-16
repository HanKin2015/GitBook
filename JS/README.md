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