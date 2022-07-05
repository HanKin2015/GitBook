# Linux服务

## 1、查看服务状态
正确：service networking status
错误：service networking.service status    (不要被tab键带偏了)
正确：systemctl status networking
正确：systemctl status networking.service

注意下status在两个命令之间位置的不同。

## 2、linux服务相关知识
ExecStartPre：服务启动前执行
ExecStart：服务启动执行

发现，始终解决不了，报unable open display ""错误。
位置和命令确认没有错误，因为在其中添加了rm命令测试正常。


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
#include <getopt.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <errno.h>
#define MAX_BUF_LEN 64
//定义程序名字为usbipd
#undef  PROGNAME
#define PROGNAME "usbipd"
#define PACKAGE_STRING "usbip-utils 1.1.1"
//版本字符串
static const char usbip_version_string[] = PACKAGE_STRING;

static int action(int daemonize)
{
    if (daemonize) {
        if (daemon(0, 0) < 0) {
            printf("daemonizing failed: %s", strerror(errno));
            return -1;
        }
        umask(0);
    }

    do {
        sleep(5);
        FILE *fp = fopen("/home/study_service", "a");
        
        // 记录当前时间(外设插拔) 获取日期(文件夹)
        char cur_time[MAX_BUF_LEN] = {0}, cur_date[MAX_BUF_LEN] = {0};
        time_t tm = time(NULL);
        strftime(cur_time, sizeof(cur_time), "%Y/%m/%d %H:%M:%S", localtime(&tm));
        strftime(cur_date, sizeof(cur_date), "%Y%m%d/", localtime(&tm));
        
        fprintf(fp, "%s: %d\n", cur_time, daemonize);
        fclose(fp);
        fp = NULL;
    } while (true);
    return 0;
}

//帮助字符串
static const char usbipd_help_string[] =
    "usage: usbipd [options]			\n"
    "	-D, --daemon				\n"
    "		Run as a daemon process.	\n"
    "						\n"
    "	-d, --debug				\n"
    "		Print debugging information.	\n"
    "						\n"
    "	-h, --help 				\n"
    "		Print this help.		\n"
    "						\n"
    "	-v, --version				\n"
    "		Show version.			\n";

/**
* 帮助函数
* @para void
* @return 0 void
*/
static void usbipd_help(void)
{
    printf("%s\n", usbipd_help_string);
	return;
}

int main(int argc, char *argv[])
{
    static const struct option longopts[] =
    {
        { "daemon",  no_argument, NULL, 'D' },
        { "debug",   no_argument, NULL, 'd' },
        { "help",    no_argument, NULL, 'h' },
        { "version", no_argument, NULL, 'v' },
        { NULL,	     0,           NULL,  0  }
    };

    enum
    {
        cmd_standalone_mode = 1,
        cmd_help,
        cmd_version
    } cmd;

    int daemonize = 0;
    int opt = 0;
    int rc = -1;

    if (geteuid() != 0) {
        printf("not running as root?\n");
	}

    cmd = cmd_standalone_mode;
    for (;;) {
        opt = getopt_long(argc, argv, "Ddhv", longopts, NULL);

        if (opt == -1)
            break;

        switch (opt) {
        case 'D':
            daemonize = 1;
            break;
        case 'd':
            break;
        case 'h':
            cmd = cmd_help;
            break;
        case 'v':
            cmd = cmd_version;
            break;
        case '?':
            usbipd_help();
        default:
            goto err_out;
        }
	}
		
	switch (cmd)
	{
	case cmd_standalone_mode:
		rc = action(daemonize);
		break;
	case cmd_version:
		printf(PROGNAME " (%s)\n", usbip_version_string);
		rc = 0;
		break;
	case cmd_help:
		usbipd_help();
		rc = 0;
		break;
	default:
		usbipd_help();
		goto err_out;
	}

err_out:
    return (rc > -1 ? EXIT_SUCCESS : EXIT_FAILURE);
}
```

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





