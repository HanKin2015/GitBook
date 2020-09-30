# JavaScript 教程
学习地址：https://www.runoob.com/js/js-tutorial.html

# 1、认识
JavaScript 是 Web 的编程语言。

JavaScript web 开发人员必须学习的 3 门语言中的一门：
- HTML 定义了网页的内容
- CSS 描述了网页的布局
- JavaScript 网页的行为




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











