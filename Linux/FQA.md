# 一些疑难杂症问题

## 1、Ubuntu或者Xubuntu下图形界面卡死解决办法
```查找xorg进程pid
ps -ef | grep tty7

ps -t tty7  <===>  ps -e | grep tty7
```

```fuckXorg.sh
#!/bin/bash

pid=`ps -o pid -t tty7`
pid=`echo $pid | cut -c4-`
echo 'pid is' $pid
kill $pid

exit 5
```

## 2、dmidecode命令
dmidecode命令 可以让你在Linux系统下获取有关硬件方面的信息。dmidecode的作用是将DMI数据库中的信息解码，以可读的文本方式显示。由于DMI信息可以人为修改，因此里面的信息不一定是系统准确的信息。dmidecode遵循SMBIOS/DMI标准，其输出的信息包括BIOS、系统、主板、处理器、内存、缓存等等。

DMI（Desktop Management Interface,DMI）就是帮助收集电脑系统信息的管理系统，DMI信息的收集必须在严格遵照SMBIOS规范的前提下进行。SMBIOS（System Management BIOS）是主板或系统制造者以标准格式显示产品管理信息所需遵循的统一规范。SMBIOS和DMI是由行业指导机构Desktop Management Task Force(DMTF)起草的开放性的技术标准，其中DMI设计适用于任何的平台和操作系统。

DMI充当了管理工具和系统层之间接口的角色。它建立了标准的可管理系统更加方便了电脑厂商和用户对系统的了解。DMI的主要组成部分是Management Information Format(MIF)数据库。这个数据库包括了所有有关电脑系统和配件的信息。通过DMI，用户可以获取序列号、电脑厂商、串口信息以及其它系统配件信息。

### 语法
dmidecode [选项]
### 选项
-d：(default:/dev/mem)从设备文件读取信息，输出内容与不加参数标准输出相同。
-h：显示帮助信息。
-s：只显示指定DMI字符串的信息。(string)
-t：只显示指定条目的信息。(type)
-u：显示未解码的原始条目内容。
--dump-bin file：将DMI数据转储到一个二进制文件中。
--from-dump FILE：从一个二进制文件读取DMI数据。
-V：显示版本信息。

### 实例
查看服务器型号：dmidecode | grep 'Product Name'
查看主板的序列号：dmidecode |grep 'Serial Number'
查看系统序列号：dmidecode -s system-serial-number
查看内存信息：dmidecode -t memory
查看OEM信息：dmidecode -t 11

## 3、O.E.M的主板是什么牌子
OEM是英文Original Equipment Manufacturer的缩写，按照字面意思，应翻译成原始设备制造商，指一家厂家根据另一家厂商的要求，为其生产产品和产品配件，亦称为定牌生产或授权贴牌生产。即可代表外委加工，也可代表转包合同加工。国内习惯称为协作生产、三来加工，俗称加工贸易。
OEM可简称为"代工生产"或贴牌生产，这种经营模式在国际上已运作多年并行之有效。企业为了加大其拥有资源在创新能力方面的配置，尽可能地减少在固定资产方面的投入，企业不直接进行生产，通过让别的企业代为生产的方式来完成产品的生产任务。这样，只需支付材料成本费和加工费，而不必承担设备折旧和自建工厂的负担，可随时根据市场变化灵活的按需下单。由此可促进成品业务形成新的经营优势，培养和壮大企业内在的扩张力，提高经营能力和管理水平，从而为更高层次的资本运营创造条件和积累经验。 AGP8X 不是八乘
OEM不是主板的牌子 有可能你用的是品牌机 也有可能你的主板是杂牌主板。

## 4、程序代码中，怎么区分status和state？
总结一下大家的观点：两者差不太多，state用起来可能更方便一些更通用一点；要区分的话，state表示一个确定的状态集中的某个状态（比如水的三态），status表示一种笼统的情形（比如你的生活状态、工作状态），不存在确定的状态集。

state所指的状态，一般都是有限的、可列举的你体重属于偏瘦、正常还是偏胖，那就是statereadyState -- 就那么四五种值onreadystatechange -- 那么四五种值之间发生变化往往就是一个实体固有的稳定的状态如（隐藏、显示），（是、否），（可用、不可用）可数的，表达不会轻易变化的状态如ReadyState, Fail这类比较常用，各种状态都可以用它，但是它更着重于一种心理状态或者物理状态说物态变化用state再恰当不过如果说一个物质的四种状态，可以说“solid state”，但如果你说“solid status”，第一，这两个词的组合不像是描述物态，更像是在说“确定的状况（solid产生歧义‘确定的/确凿的’）”；第二，这个说法即使不被误解，也需要事先约定一组物态变化顺序，比如把这个物质从固态开始加热然后电离，可能先后经历固态、液态、气态、等离子态这四个阶段。类似先定义枚举，然后引用的方式status则是不可确定的状态你体重多少公斤，属于statusstatusText -- 描述性的文字，可以任意window.status -- 描述性的文字，可以任意偏向于运行时状态不可数的，随过程不断变化的状态如OrderedStatus, ShippingStatus,ReceiptedStatus用在人的身上一般是其身份和地位，作“状态，情形”讲时，多指政治和商业两者差不多看各类文档里面 status 和 state 是混用的，主要是喜好和习惯问题书面上可能有区分，程序里还好我以前习惯用status后来发现我见过的大部分都习惯用state。而且好像state又好写，又好读，所以我也开始用state了

State 表达的是形态，而 Status 表达的是从一种形态转换成另一种形态的过程中，那些有显著特征的离散中间值。还是说那个旅馆房间的例子，一个房间可以是婚房、普通房、豪华总统房，这些都是用 State 来表达。把一个普通房改造成豪华总统房，这个过程就有设计、材料准备、工人就位、施工、验收等步骤，这个时候就用 Status 来表达。那么，区分点在哪？区分点就在于一个房间当用State 描述时，它是个彼此独立的枚举值，可以没有前后顺序的在婚房、普通房、豪华总统房之间来回转换。而当使用 Status 时，是存在前后状态依赖关系的一个变化量，不能没有做设计就施工，也不能没施工就验收。所以，State 和 Status 的核心区别，就是它们的枚举值之间是否有依赖关系，没有依赖关系的用 State，有依赖关系的用 Status。

## 5、执行systemctl命令失败
```
[root@ubuntu0006:/media/hankin/vdb] #vim /etc/ssh/sshd_config
[root@ubuntu0006:/media/hankin/vdb] #/etc/init.d/ssh restart
[....] Restarting ssh (via systemctl): ssh.serviceJob for ssh.service failed because the control process exited with error code. See "systemctl status ssh.service" and "journalctl -xe" for details.
 failed!
 ```
 "systemctl status ssh.service" and "journalctl -xe"通过这些命令一般来说可以看出一些错误，如配置哪里出错。
 
 ## 6、Linux无法获得锁的解决办法
 - 强制解锁，删除锁文件
 - 使用ps aux找到占锁的进程，关键字apt或者apt-get
 
 ## 7、The system is running in low-graphics mode时解决方法

1. df -h
2. cd /etc/X11
3. sudo cp xorg.conf.failsafe xorg.conf
4. sudo reboot

## 8、获取系统位数
命令1：getconf LONG_BIT
结果：64

命令2：uname -a
结果：Linux Test004MUJUP 2.6.32-431.23.3.el6.x86_64 #1 SMP Wed Jul 16 06:12:23 EDT 2014 x86_64 x86_64 x86_64 GNU/Linux

命令3：uname -r
结果：2.6.32-431.23.3.el6.x86_64

命令4：cat /proc/version
结果：Linux version 2.6.32-431.23.3.el6.x86_64 (mockbuild@x86-027.build.eng.bos.redhat.com) (gcc version 4.4.7 20120313 (Red Hat 4.4.7-4) (GCC) ) #1 SMP Wed Jul 16 06:12:23 EDT 2014



## 9、chroot: failed to run command `/bin/bash': No such file or directory

缺少依赖，lib和lib64、sbin虽然是软链接，但是chroot后路径会变化

 https://www.bbsmax.com/A/pRdBB4vDdn/ 



## 10、linux 上删除所有的无效文件链接

### linux删除文件夹软链接

 (2018-09-02 00:00:29)

错误：rm dirname/ 

正确：rm dirname --> 只删除链接文件夹，元文件夹不变



## 11、[shell之列表的定义与循环](https://www.cnblogs.com/zyy98877/p/10234527.html)
https://cloud.tencent.com/developer/ask/92780 
 
## 12、Linux 文件不能删除，没有权限问题

shirandata 2020-07-01 23:21:20  1207  收藏
分类专栏： Linux
版权
第一步：查看文件属性
lsattr xxx  查看文件属性(xxx为文件名)
1
看到的情况

-----a-------或者-----i-------
1
第二步：去除属性
chattr -a xxx 或者 chattr -i xxx
1
第三步：删除文件
rm -rf xxx

## 13、Cannot set LC_CTYPE to default locale: No such file or directory解决方法
执行程序时报错：UnicodeEncodeError: 'ascii' codec can't encode charrcters in position
怀疑可能是编码问题，扫描前执行一下这个试试：export LC_ALL=en_US.UTF-8
然后报错bash: waring: setlocale: LC_ALL: cannot change locale (en_US.UTF-8)
执行locale命令报错：Cannot set LC_CTYPE to default locale: No such file or directory

locale -a查看系统内安装的locale
发现没有en_US.UTF-8，进行手动安装locale-gen en_US.UTF-8
搞定。

## 14、输出echo的帮助信息
help echo
/bin/echo --help
`which echo` --help

## 15、获取开机时间
who -b 查看最后一次系统启动的时间。
who -r 查看当前系统运行时间
last reboot可以看到Linux系统历史启动的时间
top命令显示up后表示系统到目前运行了多久时间。反过来推算系统重启时间。
w命令显示up后表示系统到目前运行了多久时间。反过来推算系统重启时间。
cat /proc/uptime
date -d "$(awk -F. '{print $1}' /proc/uptime) second ago" +"%Y-%m-%d %H:%M:%S"








