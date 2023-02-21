
# 基础知识

# 1、护网行动

“护网行动”是国家网络安全主管部门为落实全国网络安全和信息化工作会议精神而发起的长期专项行动，旨在检验各单位信息基础设施和重点网站网络安全的综合防御能力和水平，实战验证相关单位“监测发现、安全防护和应急处置”的能力，发现并整改网络系统存在的深层次安全问题，进一步以防攻击、防破坏、防泄密、防重大故障为重点，构建多层次多渠道合作、各单位各行业和全民共同参与、众人受益的“钢铁城墙”。

为此，各个企业或单位都在积极准备应对方案，检测网络中存在的安全隐患，并向各大安全厂商寻求支持。在日前中美贸易战的大背景下，网络安全尤为重要，可谓是，“没有网络安全，就没有国家安全”。

# 2、中文发音

在中文里,最普通的变调规则即是在一组两个第三声的合音节中,须将合音节中领先的第一个音节提升到第二声.

 三声＋三声→二声＋三声
例如:蒙古 好傻
不＋四声 不读二声
例如:不是 不要 不用 

# 3、时间服务器

修改Windows系统的自动校对时间的服务器地址：右下角时间-》更改时间和日期时间-》Internet时间-》更改设置-》服务器

# 4、 [SCP和Rsync远程拷贝的几个技巧](https://www.cnblogs.com/kevingrace/p/8529792.html)

## Linux远程拷贝避免软连接

## 介绍

scp是最常用的Linux远程拷贝命令， 无论是拷贝单个文件还是文件夹。

但是针对存在软连接的文件夹的远程拷贝要尤为注意， 使用不当可能会导致整个硬盘被塞满。

## 问题描述

前段时间由于服务器的Linux系统出了问题， 导致所有的文件均不能进行写操作， 为此需进行文件转移， 进行系统重装。

在文件转移的过程中，直接对home目录下的用户数据用scp命令远程拷贝的另外一台服务器， 结果将另一台服务器的硬盘接近打爆。

查看问题发现远程拷贝的用户数据， 有一个文件夹中存在一个递归的软连接， scp的拷贝是递归拷贝， 导致一直拷贝，最终将硬盘塞满。

## 如何避免

- 将待远程拷贝的文件夹压缩之后再拷贝， 可以避免软连接的拷贝

  ```
  利用tar等压缩命令将文件夹压缩
  但是如果文件夹无法操作， 则需要用下面的命令替换。12
  ```

- 使用**rsync**命令可以**避免软连接**问题

  ```
  # 列出几个参数如下， 具体请man rsync查看
  
  -u, --update：
  skip files that are newer on the receiver 增量同步，跳过比本地较新的文件
  -a, --archive：
  archive mode; equals -rlptgoD (no -H,-A,-X) 归档模式，
  相当于-rlptgoD, 不包括(no -H,-A,-X);最常用的参数
  -z, --compress：
  compress file data during the transfer 输过程中压缩文件数据12345678910
  ```

# 5、Ubuntu 中apt update和upgrade 的区别

 apt update：只检查，不更新 

 apt upgrade：更新已安装的软件包 

# 6、java环境

- java -version  查看版本
- apt install -y openjdk-7-jdk    安装1.7.0版本
- apt remove openjdk*      移除即卸载
- 





# 7、[E:无法修正错误,因为您要求某些软件包保持现状,就是它们破坏了软件包间的依赖关系](https://www.cnblogs.com/mliudong/p/4217945.html)

源的问题



# 8、10-disable-suspend.rules

### 禁用挂起和休眠

下面规则禁止所有用户通过 Polkit 进行挂起和休眠。

```
/etc/polkit-1/rules.d/10-disable-suspend.rules
polkit.addRule(function(action, subject) {
    if (action.id == "org.freedesktop.login1.suspend" ||
        action.id == "org.freedesktop.login1.suspend-multiple-sessions" ||
        action.id == "org.freedesktop.login1.hibernate" ||
        action.id == "org.freedesktop.login1.hibernate-multiple-sessions")
    {
        return polkit.Result.NO;
    }
});
```



 

# 10、中英文系统切换

```
vim /etc/sysconfig/i18n
#LANG="zh_CN.UTF-8"
LANG="en_US.UTF-8"

重启

/etc/default/locale   Xubuntu
/etc/locale.conf      中标麒麟  （有个控制面板进行切换）
```



# 11、网络配置
 **/etc/sysconfig/network-scripts/ifcfg-eth0** 

 sudo /etc/init.d/networking  

[Linux中DNS配置及用命令方式修改网络]( https://blog.csdn.net/weixin_43314056/article/details/83347296 )

本地DNS解析
修改配置文件`vim /etc/hosts` 

指定DNS作域名解析
修改配置文件 `vim /etc/resolv.conf` 

 nmcli device ###显示设备 

 nmcli device show	###显示全部设备信息 

# 12、304状态码
如果客户端发送了一个带条件的GET 请求且该请求已被允许，而文档的内容（自上次访问以来或者根据请求的条件）并没有改变，则服务器应当返回这个304状态码。简单的表达就是：服务端已经执行了GET，但文件未变化。

# 13、热键（快捷键）
可以把任何命令或命令的组合指定给键盘上的某个键，可以是Alt+［A-Z］，

Ctrl-［A-Z］， Alt+Shift+［A-Z］， F1-F12， Ctrl-F［1-12］， Alt-F［1-12］， Alt+Shift+F［1-12］，还有更不可思议的是甚至还可以为功能键加上“参数”，这样你按下那个键的时候，它会等待你输入相应的参数，并根据不同的参数运行不同的命令。

当然，有一些热键会被终端所捕获，如常见的Ctrl-D/C/Q/Z等，不过没关系，可用的热键还多着呢！

**定义热键的配置文件为：/etc/inputrc 或 ~/.inputrc，定义热键的格式如下：**

“《热键对应的ASCII字符》”：“《执行的命令》”

其中热键对应的ASCII字符可以通过 “先按Ctrl-V， 然后按热键” 的方式来输入， 如Ctrl-G对应的字符为^G， Alt-P对应的字符为^［p， Ctrl-Alt-H对应的字符为^［^H.

可以用/C来代替Ctrl，/M来代替Alt， /M-/C来代替Alt-Ctrl， 如/C-M = Ctrl-M， /M-/C-H = Alt-Ctrl-M. 另外还可以用/e代表^［。

# 13、环境变量
export DISPLAY=:0
. /etc/profile
source /etc/profile





