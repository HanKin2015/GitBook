# 编译警告

## 1、warning: function declaration isn't a prototype [-Wstrict-prototypes]

即使函数括号内没有任何参数，也要加一个void类型，来避免这种warning。

prototype：原型、雏形

## 2、warning: no previous prototype for 'XXXX' [-Wmissing-prototypes]

如果告警函数只在文件内部使用，在函数前面添加static即可消除告警


## 3、warning: statement with no effect [-Wunused-value]

