# 网络排查

## 1、流量查询
iftop界面说明 ：
第一行：带宽显示

中间部分：外部连接列表，即记录了哪些ip正在和本机的网络连接

中间部分右边：实时参数分别是该访问ip连接到本机2秒，10秒和40秒的平均流量

=>代表发送数据，<= 代表接收数据

底部三行：表示发送，接收和全部的流量

底部三行第二列：为你运行iftop到目前流量

底部三行第三列：为高峰值

底部三行第四列：为平均值

## 2、路由追踪

## 3、

有个盲区，比如使用iftop时，单位为bytes时。
则1000 000bytes大概是多少？
答案为1MB，即平时常见的8Mb。
大B为byte，小b为bit。而不是看单词中的大小写。
