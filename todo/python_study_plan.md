# python学习计划

# 1、Python不支持的数据类型有：
python有五个标准数据类型：数字、字符串、列表、元组、字典

支持四种不同的数字类型有：int、long、float、complex

注意：
string 不是 char!!!!
可变数据类型：列表list[ ]、字典dict{ }
不可变数据类型：整型int、字符串str' '、元组tuple（）
没有double类型

# 2、Linux文件系统的文件都按其作用分门别类地放在相关的目录中
/bin 二进制可执行命令
/dev 设备特殊文件
/etc 系统管理和配置文件
/etc/rc.d 启动的配置文件和脚本
/home 用户主目录的基点，比如用户user的主目录就是/home/user，可以用~user表示
/lib 标准程序设计库，又叫动态链接共享库，作用类似windows里的.dll文件
/sbin 超级管理命令，这里存放的是系统管理员使用的管理程序
/tmp 公共的临时文件存储点
/root 系统管理员的主目录
/mnt 系统提供这个目录是让用户临时挂载其他的文件系统
/lost+found这个目录平时是空的，系统非正常关机而留下“无家可归”的文件（windows下叫什么.chk）
/proc 虚拟的目录，是系统内存的映射。可直接访问这个目录来获取系统信息。
/var 某些大文件的溢出区，比方说各种服务的日志文件
/usr 最庞大的目录，要用到的应用程序和文件几乎都在这个目录，其中包含：
/usr/x11R6存放x window的目录
/usr/bin众多的应用程序
/usr/sbin超级用户的一些管理程序
/usr/doclinux文档
/usr/includelinux下开发和编译应用程序所需要的头文件
/usr/lib常用的动态链接库和软件包的配置文件
/usr/man帮助文档
/usr/src源代码，linux内核的源代码就放在/usr/src/linux里
/usr/local/bin本地增加的命令

# 3、在命令行下使用 vi 编辑一个文件时, 如何复制当前行
dd 删除光标所在的那一整行
yy 复制光标所在的那一整行
p 将已复制的数据在光标的下一行粘贴
P 将已复制的数据在光标的上一行粘贴

# 4、影响聚类算法效果的主要原因有
特征选取
模式相似性测度
分类准则

注册了七月在线、迅雷密码修改，填写工商银行测评
https://blog.csdn.net/r6auo52bk/article/details/79308190


字符串是指针，它的内容是以0结尾的字符数组。你想比较两个字符串的时候要知道：两个字符串是否在不同的地址。如果在不同的地址，要比较内容是否相同你可以用strcmp函数或者其他方法，如果要判断是否是相同地址，可以用==的。



一致性哈希。
手撕智能指针。
给一个情景题，设想产生很多要求保序的请求从多个机器上发到一个多线程的代理上，再由代理调用分布式的数据库，怎么保证这个过程中的顺序不乱。
然后开始继续怼算法：
求一个数组左边之和最接近右边之和的节点。我想的是用前缀和来搞。
求中位数。
求一个流动数组的中位数，每次加入元素都要返回中位数，两个堆解决。


[大数据算法：对5亿数据进行排序](https://blog.csdn.net/lemon_tree12138/article/details/48783535)

[随机森林和GBDT的区别](https://blog.csdn.net/login_sonata/article/details/73929426)

malloc分配超大内存会一次性分配吗？malloc分配内存受什么限制？
子进程与父进程共享变量空间吗？
有一千万个域名，怎样快速查找某个域名存不存在？用哈希的话怎么优化域名长度不一样的情况？
浏览器输入一个url，会发送那些数据包(包…包…)
gdb调试怎样调试线程？线程死锁怎么调试？
为什么要用虚函数？仅仅是为了实现多态吗？

https://blog.csdn.net/xlinsist/article/details/51468741
https://blog.csdn.net/xlinsist/article/details/51475345


但S还是从0开始


1、更新sublime中trie树
2、更新sublime，添加cpp和py运行输入环境。



# TensorFlow中文社区
Docker 编辑
Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口。
https://blog.csdn.net/qq_37774171/article/details/82902214?utm_source=blogxgwz1
https://blog.csdn.net/weixin_37251044/article/details/79790270
https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/001432712108300322c61f256c74803b43bfd65c6f8d0d0000
https://blog.csdn.net/huangx06/article/details/78835360
https://blog.csdn.net/gangeqian2/article/details/79358543
https://www.jianshu.com/p/f5d8787d64c5





# 20181212

[为什么使用Scrapy框架来写爬虫？](https://mp.weixin.qq.com/s/il44DVlynDiZ5zVyOFC1PQ)
在Python爬虫中：Requests + Selenium可以解决目前90%的爬虫需求，难道Scrapy是解决剩下的10%的吗？显然不是这样的。Scrapy框架是为了让我们的爬虫更强大、更高效。




https://blog.csdn.net/wilson_iceman/article/details/79162942
https://blog.csdn.net/YtdxYHZ/article/details/78817950
https://www.aliyun.com/jiaocheng/439573.html
爬虫技术五花八门，市面上比比皆是，但是真正能做到极致的寥寥无几，特别是能达到商业爬虫级别的几乎没有。

所谓商业级别，用一句话解释就是：随心所欲，想爬谁就爬谁。

现在好多网站都有反爬策略，如IP限制、访问频次限定、User-Agent验证、数据加密、验证码限制、登录限制等等，碰到这些，一般的爬虫就束手无策。























