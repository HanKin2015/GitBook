# Linux服务

## 1、查看服务状态
正确：service networking status
错误：service networking.service status    (不要被tab键带偏了)
正确：systemctl status networking
正确：systemctl status networking.service

注意下status在两个命令之间位置的不同。

## 2、linux服务相关知识
ExecStartPre：服务启动前执行
ExecStart：   服务启动执行

发现，始终解决不了，报unable open display ""错误。
位置和命令确认没有错误，因为在其中添加了rm命令测试正常。

参考：https://blog.csdn.net/weixin_35742493/article/details/121403271

### 2-1、什么是.service文件？
Linux中.service文件是某项服务对应的配置文件，可用于systemd管理和控制的服务的设置。
.service 文件通常包含3个模块，即[Unit]控制单元，表示启动顺序和依赖关系；[Service]服务，表示服务的定义；[Install]安装，表示如何安装配置文件。

### 2-2、文件存放位置
.service 文件配置的服务常用systemd管理。然而，systemd有系统和用户区分；系统（/lib/systemd/system/）、用户（/usr/lib/systemd/user/）。一般系统管理员手工创建的单元文件建议存放在/etc/systemd/system/目录下面。

### 2-3、创建.service 文件
以httpd.service 为例
```
[Unit]     				
Description=httpd	    #当前配置文件的描述信息
After=network.target    #表示当前服务是在那个服务后面启动，一般定义为网络服务启动后启动

[Service]				
Type=forking			#定义启动类型
ExecStart=/usr/local/apache/bin/apachectl start 	#定义启动进程时执行的命令。
ExecReload=/usr/local/apache/bin/apachectl restart  #重启服务时执行的命令
ExecStop=/usr/local/apache/bin/apachectl stop		#定义关闭进程时执行的命令。
PrivateTmp=true										#是否分配独立空间

[Install]
WantedBy=multi-user.target    #表示多用户命令行状态
```

### 2-4、[Unit]字段介绍 ——主要给出服务描述、启动顺序和依赖关系
Description：当前服务的简单描述。
Documentation：服务文档
After和Before：表示启动顺序，不涉及依赖关系。Before=xxx.service表示本服务在xxx.service 启动之前启动，After=yyy.service表示本服务在yyy.service 之后启动。
Wants：表示该服务和某服务存在某种弱依赖关系，即某服务停止运行或退出不影响该服务继续运行。
Requires：表示”强依赖”关系，即某服务停止运行或退出，改服务也必须停止运行。
Wants字段与Requires字段只涉及依赖关系，与启动顺序无关，默认情况下是同时启动的。

### 2-5、[Service]字段介绍——服务的启动行为以及如何启动、重启、停止等信息
Type=simple（默认值）：systemd认为该服务将立即启动。服务进程不会fork。如果该服务要启动其他服务，不要使用此类型启动，除非该服务是socket激活型。
Type=forking：systemd认为当该服务进程fork，且父进程退出后服务启动成功。对于常规的守护进程（daemon），除非你确定此启动方式无法满足需求，使用此类型启动即可。使用此启动类型应同时指定 PIDFile=，以便systemd能够跟踪服务的主进程。
Type=oneshot：这一选项适用于只执行一项任务、随后立即退出的服务。可能需要同时设置 RemainAfterExit=yes 使得 systemd 在服务进程退出之后仍然认为服务处于激活状态。Type=oneshot允许指定多个希望顺序执行的用户自定义命令。
Type=notify：与 Type=simple 相同，但约定服务会在就绪后向 systemd 发送一个信号。这一通知的实现由 libsystemd-daemon.so 提供。
Type=dbus：若以此方式启动，当指定的 BusName 出现在DBus系统总线上时，systemd认为服务就绪。
Type=idle: systemd会等待所有任务(Jobs)处理完成后，才开始执行idle类型的单元。除此之外，其他行为和Type=simple 类似。
PIDFile：pid文件路径

ExecStart：指定启动单元的命令或者脚本，ExecStartPre和ExecStartPost节指定在ExecStart之前或者之后用户自定义执行的脚本。
ExecReload：指定单元停止时执行的命令或者脚本。
ExecStop：指定单元停止时执行的命令或者脚本。
PrivateTmp：True表示给服务分配独立的临时空间
Restart：这个选项如果被允许，服务重启的时候进程会退出，会通过systemctl命令执行清除并重启的操作。
RemainAfterExit：如果设置这个选择为真，服务会被认为是在激活状态，即使所以的进程已经退出，默认的值为假，这个选项只有在Type=oneshot时需要被配置。
User字段可以设置服务的用户名
WorkingDirectory字段指定服务的安装目录

### 2-6、[Install]字段介绍——何安装这个配置文件，即怎样做到开机自启
Alias：为单元提供一个空间分离的附加名字。
RequiredBy：单元被允许运行需要的一系列依赖单元，RequiredBy列表从Require获得依赖信息。
Also：指出和单元一起安装或者被协助的单元。
DefaultInstance：实例单元的限制，这个选项指定如果单元被允许运行默认的实例。
WantedBy字段：表示该服务所在的 Target。
Target的含义是服务组，表示一组服务。
WantedBy=multi-user.target指的是服务所在的Target是multi-user.target

Systemd 有默认的启动 Target就是multi-user.target，在这个组里的所有服务，都将开机启动。
```
#查看 multi-user.target 包含的所有服务
systemctl list-dependencies multi-user.target
```

### 2-7、其它配置文件
如果工程文件需要debian编包，需要在debian文件夹中的install文件中写入.service文件的安装路径，一般放在/usr/lib/systemd/system路径下。同时，如果需要开机自启动，在postinst文件中写入systemctl enable service_name.service。

## 3、实战
### 3-1、编写服务
```
[Unit]
Description=study_service
After=network-online.target
Wants=network-online.target

[Service]
ExecStart=/media/hankin/vdb/TransferStation/a.out
ExecReload=/media/hankin/vdb/TransferStation/a.out
KillMode=process
Restart=always
RestartSec=5
#WatchdogSec=10
#LimitCORE=0

[Install]
WantedBy=multi-user.target
```
将此服务study_service.service文件拷贝到/lib/systemd/system/目录下。
可能需要重启服务守护进程：systemctl daemon-reload

发现/etc/systemd/system/multi-user.target.wants/目录下一般会有一个服务的软链接，暂时不清楚其作用，不添加软链接也能运行。

### 3-2、编写程序
```
/**
* 文 件 名: study_service.cpp
* 文件描述: 学习Linux系统的服务及其使用
* 作    者: HanKin
* 创建日期: 2022.07.04
* 修改日期：2022.07.04
*
* Copyright (c) 2022 HanKin. All rights reserved.
*/

#include <iostream>
#include <string>
#include <cstdio>
#include <cstring>
#include <cstdlib>
#include <ctime>
#include <unistd.h>
#define MAX_BUF_LEN 64

int main()
{
    do {
        sleep(5);
        FILE *fp = fopen("/home/study_service", "a");
        
        // 记录当前时间(外设插拔) 获取日期(文件夹)
        char cur_time[MAX_BUF_LEN] = {0}, cur_date[MAX_BUF_LEN] = {0};
        time_t tm = time(NULL);
        strftime(cur_time, sizeof(cur_time), "%Y/%m/%d %H:%M:%S", localtime(&tm));
        strftime(cur_date, sizeof(cur_date), "%Y%m%d/", localtime(&tm));
        
        fprintf(fp, "%s\n", cur_time);
        fclose(fp);
        fp = NULL;
    } while (false);
    return 0;
}
```

### 3-3、执行结果
```
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #service study_service status
● study_service.service - study_service
   Loaded: loaded (/lib/systemd/system/study_service.service; disabled; vendor preset: enabled)
   Active: active (running) since 一 2022-07-04 19:41:04 CST; 4s ago
 Main PID: 5966 (a.out)
   CGroup: /system.slice/study_service.service
           └─5966 /media/hankin/vdb/TransferStation/a.out

7月 04 19:41:04 ubuntu0006 systemd[1]: Started study_service.
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #service study_service status
● study_service.service - study_service
   Loaded: loaded (/lib/systemd/system/study_service.service; disabled; vendor preset: enabled)
   Active: activating (auto-restart) since 一 2022-07-04 19:40:59 CST; 4s ago
  Process: 5044 ExecStart=/media/hankin/vdb/TransferStation/a.out (code=exited, status=0/SUCCESS)
 Main PID: 5044 (code=exited, status=0/SUCCESS)
[root@ubuntu0006:/home] #tailf study_service
2022/07/04 19:50:33
2022/07/04 19:50:43
2022/07/04 19:50:53
2022/07/04 19:51:04
```
程序运行后，会出现运行5秒中后程序结束，服务5秒后重启程序，从而出现10秒打印一次。

将程序修改成无限执行后，服务认为程序没有挂掉就只做监听的作用，不再进行拉起程序操作。

不明白项目中为啥会无限执行拉起程序操作。。。。
服务修改成后台运行，即添加&符号，结果一样。

## 4、进一步探索（验证参数是否传入进去）
发现原来是daemon函数的问题，它是由fork函数创建子进程，父进程正常退出了。
代码见：D:\Github\Storage\linux\service\study_service.cpp

就会出现不断的拉起新的程序进行执行。
```
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #ps -ef | grep a.out
root     19444     1  0 21:57 ?        00:00:00 /media/hankin/vdb/TransferStation/a.out -D
root     19915     1  0 21:57 ?        00:00:00 /media/hankin/vdb/TransferStation/a.out -D
root     20359     1  0 21:57 ?        00:00:00 /media/hankin/vdb/TransferStation/a.out -D
root     20776     1  0 21:57 ?        00:00:00 /media/hankin/vdb/TransferStation/a.out -D
root     21204     1  0 21:57 ?        00:00:00 /media/hankin/vdb/TransferStation/a.out -D
root     21424  3190  0 22:11 pts/3    00:00:00 grep --color=auto a.out
root     21614     1  0 21:57 ?        00:00:00 /media/hankin/vdb/TransferStation/a.out -D
root     22012     1  0 21:58 ?        00:00:00 /media/hankin/vdb/TransferStation/a.out -D
root     22487     1  0 21:58 ?        00:00:00 /media/hankin/vdb/TransferStation/a.out -D
root     22896     1  0 21:58 ?        00:00:00 /media/hankin/vdb/TransferStation/a.out -D
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #killall -9 a.out
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #ps -ef | grep a.out
root     22197  3190  0 22:11 pts/3    00:00:00 grep --color=auto a.out
```

因此，是否可以这样认为，当我把程序改成了一个服务进行守护，是不是不再需要进行调用daemon函数，让其变成一个守护进程。

### 4-1、聊一聊&和daemon的区别
&跟当前的终端有关，没有进行创建子进程操作。
daemon是通过创建子进程来操作的。

## 5、linux系统启动之后执行某个命令
需求：Linux系统启动之后执行xset r rate 666 22命令
linux中使用服务来完成这一需求。

例如:cat /lib/systemd/system/networking.service
```
[Unit]
Description=Raise network interfaces
Documentation=man:interfaces(5)
DefaultDependencies=no
Wants=network.target
After=local-fs.target network-pre.target apparmor.service systemd-sysctl.service systemd-modules-load.service
Before=network.target shutdown.target network-online.target
Conflicts=shutdown.target

[Install]
WantedBy=multi-user.target
WantedBy=network-online.target

[Service]
Type=oneshot
EnvironmentFile=-/etc/default/networking
ExecStartPre=-/bin/sh -c '[ "$CONFIGURE_INTERFACES" != "no" ] && [ -n "$(ifquery --read-environment --list --exclude=lo)" ] && udevadm settle'
ExecStart=/sbin/ifup -a --read-environment
ExecStop=/sbin/ifdown -a --read-environment --exclude=lo
RemainAfterExit=true
TimeoutStartSec=5min
```

## 6、验证自定义的服务启动顺序和弱依赖是否有受影响
```
After=network-online.target
Wants=network-online.target

[root@ubuntu0006:/media/sangfor/vdb/TransferStation] #systemctl status network-online.target
● network-online.target - Network is Online
   Loaded: loaded (/lib/systemd/system/network-online.target; static; vendor preset: enabled)
   Active: inactive (dead) since 三 2022-07-06 14:29:16 CST; 15s ago
     Docs: man:systemd.special(7)
           http://www.freedesktop.org/wiki/Software/systemd/NetworkTarget

7月 06 14:27:55 ubuntu0006 systemd[1]: Reached target Network is Online.
7月 06 14:29:16 ubuntu0006 systemd[1]: Stopped target Network is Online.
[root@ubuntu0006:/media/sangfor/vdb/TransferStation] #systemctl start study_service
[root@ubuntu0006:/media/sangfor/vdb/TransferStation] #systemctl status network-online.target
● network-online.target - Network is Online
   Loaded: loaded (/lib/systemd/system/network-online.target; static; vendor preset: enabled)
   Active: active since 三 2022-07-06 14:29:39 CST; 2s ago
     Docs: man:systemd.special(7)
           http://www.freedesktop.org/wiki/Software/systemd/NetworkTarget

7月 06 14:29:39 ubuntu0006 systemd[1]: Reached target Network is Online.
```
通过实战发现，Wants弱依赖指的是会把依赖的服务启动起来，但是依赖的服务停止不影响当前服务。
去掉Wants后，当前服务不受After的启动顺序，当前服务能启动起来。

因此，这两个选项不是必须的。


