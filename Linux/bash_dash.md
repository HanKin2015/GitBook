# bash和dash

![](https://img-blog.csdn.net/20180717114409303?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zOTIxMjc3Ng==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

## 1、Bash与Dash的概念及区别
Shell的多样性下的bash与dash

我们可能会问：既然shell是解释命令的工具，那么这个工具可不可以多样化呢？不同的解释工具可不可以遵从不同的规则呢？
这是必然的咯，何况是像Linux这种开源的好东西，怎么会缺乏多样性呢？！
所以，我们不难就理解Linux中的shell有多种类型了吧，这其中最常用的几种是Bourne shell（sh）、C shell（csh）和Korn shell（ksh）。其中三种shell各有优缺点：

Bourne shell是UNIX最初使用的shell，并且在每种UNIX上都可以使用。Bourne shell在shell编程方面相当优秀，但在处理与用户的交互方面做得不如其他几种shell。

Bourne Again shell，它是Linux操作系统缺省的shell，是Bourne shell的扩展，简称Bash，与Bourne shell完全向后兼容，并且在Bourne shell的基础上增加、增强了很多特性。Bash放在/bin/bash中，它有许多特色，可以提供如命令补全、命令编辑和命令历史表等功能，它还包含了很多C shell和Korn shell中的优点，有灵活和强大的编程接口，同时又有很友好的用户界面。
所以在GNU/Linux 操作系统中的 /bin/sh 是 bash（Bourne-Again Shell）的符号链接（但是这只是比较原始的做法，现在开始有了新的做法了），也就是若脚本第一行为“#!/bin/bash”，我们使用命令：”sh script_name.sh“时是调用的bash去解释脚本；

下面我们接着来看看所谓的新的改变
Dash，GNU/Linux操作系统中的/bin/sh本是bash (Bourne-Again Shell) 的符号链接，但鉴于bash过于复杂，有人把bash从NetBSD移植到Linux并更名为dash (Debian Almquist Shell)，并建议将/bin/sh指向它，以获得更快的脚本执行速度。Dash Shell 比Bash Shell小的多，符合POSIX标准。也就是若脚本第一行为“#!/bin/sh”，我们使用命令：”sh script_name.sh“时是调用的dash去解释脚本；

Ubuntu继承了Debian，所以从Ubuntu 6.10开始默认是Dash Shell。

## 2、实战
为什么把参数-e都输出了呢？这不是我们想要的啊！

原来是我的Ubuntu 默认的sh命令调用dash去解释一个改用bash去解释的shell script，因为dash 对echo命令的解释标准中不支持 -e 参数，故出错！

```
[root@ubuntu0006:/media/hankin/vdb/study/log/shell] #dash bash_dash.sh
-e he   jian
hello   world
[root@ubuntu0006:/media/hankin/vdb/study/log/shell] #bash bash_dash.sh
he      jian
hello\tworld
[root@ubuntu0006:/media/hankin/vdb/study/log/shell] #cat bash_dash.sh
#/bin/sh

echo -e "he\tjian"
echo "hello\tworld"
```



