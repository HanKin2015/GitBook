[TOC]
# python学习中的常见问题

我的意中人是个盖世英雄，我知道有一天他会在一个万众瞩目的情况下出现，身披金甲圣衣，脚踏七色云彩来娶我，我猜中了前头，可是我猜不着这结局。

FAQ 即 Frequently Asked Questions 的缩写，表示常见问题，官方列了 27 个常见问题，完整清单在此：https://mp.weixin.qq.com/s/zabIvt4dfu_rf7SmGZXqXg

# 1、IndentationError: unindent does not match any outer indentation level
占位问题，存在两种可能性：1.代码没有对齐 2.存在非法字符与其他格式的不可见的内容（输入法的问题）

# 2、AttributeError: module 'socketserver' has no attribute 'ForkingMixIn'
解决办法：将
SocketServer.ForkingMixIn 替换为 SocketServer.ThreadingMixIn

# 3、为啥不使用switch语句
该文档给出了几个建议，告诉了我们几个 switch/case 的替代方案：

使用 if-elif-else 条件判断语句
使用字典，将 case 值与调用的函数映射起来
使用内置 getattr() 检索特定的对象调用方法

# 4、靶场测试
靶场测试，即 range test，指的是对武器弹药的技术性能作各种测试验证，与药物的临床试验一样，都是在最终产品交付前的一项关键性测试。








