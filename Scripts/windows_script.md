# windows批处理 (cmd/bat) 编程详解
开始之前先简单说明下cmd文件和bat文件的区别：在本质上两者没有区别，都是简单的文本编码方式，都可以用记事本创建、编辑和查看。两者所用的命令行代码也是共用的，只是cmd文件中允许使用的命令要比bat文件多。cmd文件只有在windows2000以上的系统中才能运行，而bat文件则没有这个限制。从它们的文件描述中也可以看出以上的区别：cmd文件的描述是“windows nt命令脚本”， bat文件的描述是“ms dos批处理文件”bat脚本“。

# 使用bat脚本自动打开ftp指定文件夹
```
@echo off

start explorer "ftp://administrator:123@10.10.10.1:/root/tfboy/"
```

@echo off
start explorer "ftp://username:password@host"
username：ftp服务器的 用户名
password：ftp 服务器 用户名对应的密码
host： ftp服务器的ip地址，域名等

