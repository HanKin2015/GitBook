# android浅认识

## 1、Android.mk

### 1-1、简介
Android.mk 文件位于项目 jni/ 目录的子目录中，用于向编译系统描述源文件和共享库。它实际上是编译系统解析一次或多次的微小 GNU makefile 片段。Android.mk 文件用于定义 Application.mk、编译系统和环境变量所未定义的项目范围设置。它还可替换特定模块的项目范围设置。

Android.mk 的语法支持将源文件分组为模块。模块是静态库、共享库或独立的可执行文件。您可在每个 Android.mk 文件中定义一个或多个模块，也可在多个模块中使用同一个源文件。编译系统只将共享库放入您的应用软件包。此外，静态库可生成共享库。

除了封装库之外，编译系统还可为您处理各种其他事项。例如，您无需在 Android.mk 文件中列出头文件或生成的文件之间的显式依赖关系。NDK 编译系统会自动计算这些关系。因此，您应该能够享受到未来 NDK 版本中新工具链/平台支持带来的益处，而无需处理 Android.mk 文件。

此文件的语法与随整个 Android 开源项目分发的 Android.mk 文件中使用的语法非常接近。虽然使用这些语法的编译系统实现并不相同，但通过有意将语法设计得相似，可使应用开发者更轻松地将源代码重复用于外部库。

### 1-2、基础知识
在详细了解语法之前，最好先了解 Android.mk 文件所含内容的基本信息。为此，本部分使用 Hello-JNI 示例中的 Android.mk 文件解释文件中每一行的作用。

Android.mk 文件必须先定义 LOCAL_PATH 变量：

LOCAL_PATH := $(call my-dir)

### 1-3、示例
```
LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

LOCAL_MODULE := myfile
LOCAL_SRC_FILES := myfile.c

LOCAL_C_INCLUDES := $(LOCAL_PATH)\
                    $(LOCAL_PATH)/include

include $(BUILD_EXECUTABLE)
```
缺失头文件，使用LOCAL_C_INCLUDES参数进行导入。

### 1-4、编译出的执行文件报错can't execute: Permission denied
```
root@hankin:/sdcard # ./v4l2_tool
/system/bin/sh: ./v4l2_tool: can't execute: Permission denied
126|root@hankin:/sdcard # ./v4l2_tool_4.2
/system/bin/sh: ./v4l2_tool_4.2: can't execute: Permission denied

root@hankin:/ # cd /system/bin
root@hankin:/system/bin # ./v4l2_tool
soinfo_link_image(linker.cpp:1635): could not load library "libc++.so" needed by "./v4l2_tool"; caused by load_library(linker.cpp:745): library "libc++.so" not foundCANNOT LINK EXECUTABLE
255|root@hankin:/system/bin # ./v4l2_tool_4.2
2023-04-14 14:53:53 [INFO] [5106:5107] uvc_cli_main_loop {uvc_cli_main_loop:796}
2023-04-14 14:53:53 [WARN] [5106:5106] current count 1. {main:1464}
2023-04-14 14:53:53 [INFO] [5106:5106] copy data to msg, len 52. {uvc_cli_send_event:951}
2023-04-14 14:53:53 [INFO] [5106:5107] cli->is_running: 1, cli->has_err: 0 {uvc_cli_main_loop:829}
2023-04-14 14:53:53 [INFO] [5106:5107] num: 1 {uvc_cli_main_loop:832}
```
最后发现是文件夹的权限问题，/mnt/sdcard/文件夹是drwxrwxr-x system   sdcard_rw，而/system/bin/文件夹是drwxr-xr-x root     shell。

另外安卓版本不同，编译出来的文件并不通用。

## 2、由于是临时需要在安卓系统运行c++代码，需要交叉编译
https://blog.csdn.net/pashanhu6402/article/details/96584229

后续再进行补偿学习。

```
LOCAL_PATH:= $(call my-dir)
include $(CLEAR_VARS)

include $(call all-makefiles-under,$(LOCAL_PATH))

# 模块编译
include $(CLEAR_VARS)
LOCAL_C_INCLUDES := \
                                $(LOCAL_PATH) \
                                bionic \
                                bionic/libstdc++ \
                                external/stlport/stlport \

LOCAL_SRC_FILES :=  \
                                v4l2_camera.cpp
                                #check_usable_video.cpp
                                #study_ioctl.cpp

LOCAL_CFLAGS += -D__ANDROID__
LOCAL_SHARED_LIBRARIES := libstlport libutils liblog
LOCAL_MODULE    := libnetdetectlog
LOCAL_MODULE_TAGS := optional

include $(BUILD_EXECUTABLE)
```

## 3、查看Android版本命令
```
getprop "ro.build.version.release"
adb shell "getprop | grep version"
```

## 4、Android实用技巧之adb命令：getprop，setprop，watchprops命令的使用
getprop命令的作用就是从系统的各种配置文件中读取一些设备的信息。这些文件在我们的安卓设备中是可以找到的：

```
/init.rc
/default.prop
/system/build.prop
/data/property/
```

因此getprop显示的属性值是可以清除的，通过删除文件或者删除文件里面的内容，但是都是需要安卓设备重启生效。

## 5、Kconfig文件
当执行#make menuconfig时会出现内核的配置界面，所有配置工具都是通过读取"arch/$(ARCH)Kconfig"文件来生成配置界面，这个文件就是所有配置的总入口，它会包含其他目录的Kconfig

Kconfig的作用：Kconfig用来配置内核，它就是各种配置界面的源文件，内核的配置工具读取各个Kconfig文件，生成配置界面供开发人员配置内核，最后生成配置文件.config

更多详情见：D:\Github\GitBook\gitbook\Linux\kernel.md

## 6、错误日志
untracked pid XXX exited

无法像linux那样查询进程：
ps aux 
ps -ef
而是：
ps

## 7、混乱的环境
/vendor/bin/sh
/system/bin/sh
/bin/bash

发现使用bash命令时，sh脚本第一行是注释行，不起作用。但是增加执行x权限之后，第一行就会起作用。

## 8、adb工具

### 8-1、简介
adb工具即Android Debug Bridge（安卓调试桥） tools，是Android开发工具中的一个命令行工具，可以用于与连接的Android设备进行通信和调试。

### 8-2、安装包
免安装使用
D:\将要上传到百度网盘\USB工具\platform-tools_r34.0.1-windows.zip
Windows版本：https://dl.google.com/android/repository/platform-tools-latest-windows.zip
Mac版本：https://dl.google.com/android/repository/platform-tools-latest-windows.zip
Linux版本：https://dl.google.com/android/repository/platform-tools-latest-linux.zip

### 8-3、使用手册
发现：前面是路径，永远在后面的是目标路径。
把解压出来的文件直接复制到‘C:\Windows’文件夹下，这样，每次你进入cmd就可以直接使用adb命令了很方便的。
```
adb devices	                #查看已连接的设备（调试adb接口必备第一条命令）
adb push path1 path2	    #推送文件
adb pull path1 path2	    #拉取文件
adb shell screencap path	#截屏
-v 显示日志格式  -v time 以时间为显示格式

查询连接设备：adb devices
启动adb服务：adb start-server
关闭adb服务：adb kill-server
连接设备：adb connect 设备名称：端口号
进入Android系统：adb shell
操作指定Android设备：adb -s 设备名称:端口号 命令
上传文件：adb push 本地文件 Android系统目录
指定设备：adb -s 设备名称:端口号 push 本地文件 Android系统目录
下载文件：adb pull Android系统文件 本地目录
安装应用：adb install 安装文件
覆盖安装：adb install -r 安装文件
卸载应用：adb uninstall 包名

查询应用的包名：
方法1：adb shell ls /data/data，列出系统当前已经安装的应用程序包名
方法2：adb shell pm list packages -3，列出系统当前已经安装的第三方应用程序包名
方法3：aapt dump badging 应用安装文件
方法4：
（1）运行待查询的应用程序
（2）进入Android设备
（3）执行命令：dumpsys window windows | grep -i current

启动应用：adb shell am start -n 包名/主类名
获取应用的启动时间：adb shell am start -W -n 包名/主类名
停止应用：adb shell am force-stop 包名
获取CPU使用情况：adb shell dumpsys cpuinfo | grep 包名
获取内存使用情况：adb shell dumpsys meminfo | grep 包名
输入(在光标处输入)：adb shell input text 文本内容，只能输入英文
发送系统按键：adb shell input keyevent keycode
单击指定位置：adb shell input tap 横坐标 纵坐标

获取坐标方法：
运行应用，打开指定的界面
运行命令：adb shell uiautomator dump，运行完成后会生成一个xml文件
将xml文件下载到本地，使用浏览器打开，找到指定位置的坐标，bounds="[975,667][1300,950]"

logcat：
语法：logcat 参数 过滤器 ......

系统日志的缓冲区：
（1）main，保存大多数应用的日志
（2）system，保存系统信息
（3）event，
（4）radio

优先级（由低到高）：
（1）V，详细
（2）D，调试
（3）I，信息
（4）W，警告
（5）E，错误
（6）F，严重错误
（7）S，静默

adb logcat *:E，显示大于等于错误级别的日志
adb logcat MyApp:E，显示标签为MyApp的，大于等于错误级别的日志
adb logcat ActivityManager:W MyApp:E

重点重点重点，连接的设备具有端口号，命令如下：
2023-02-20 14:41:02 adb -s 172.22.16.113:9011 push grab_usb_data.sh /sdcard/
2023-02-20 14:41:02 adb -s 172.22.16.113:9011 push limit_file_size.sh /sdcard/
2023-02-20 14:55:23 adb -s 172.22.16.113:9011 shell
```

### 8-4、adb命令卡住
由于我把所有的9xxx端口限制，导致adb命令执行失败，只能通过killall adb杀死所有卡住的进程后就能正常使用adb命令了。

### 8-5、设备管理器有ADB interface设备但是使用adb devices命令无法检测到设备
一般来说，以下是常见的原因：
1、设备驱动没有安装或者没有正常工作。
2、USB数据线连接不良。
3、设备没有开启USB调试功能。
4、设备上的ADB进程没有正常运行。

最终我将ADB interface设备进行卸载设备，然后扫描硬件改动重新加载设备后就正常了。

## 9、hdb连接设备是什么意思
https://baijiahao.baidu.com/s?id=1736118598411372211&wfr=spider&for=pc

hdb连接设备是指通过hdb接口使用PC版的华为手机助手管理当前设备。HDB是Huawei Data Bridge的英文缩写，中文意思为“华为数据桥”，是华为自定义的、用于移动终端的一种数据接口。

## 10、logcat命令
logcat命令是Android开发中常用的命令之一，用于查看设备的系统日志。以下是一些常用的logcat命令：
```
logcat: 显示所有日志消息。
logcat -d: 显示最新的日志消息。
logcat -c: 清除日志缓存。
logcat -s <TAG>: 显示指定标签的日志消息。
logcat -f <FILE>: 将日志消息保存到指定文件中。
logcat -v <FORMAT>: 指定日志消息的输出格式，常用的格式有brief、process、tag、thread、raw和time等。
```

其中，“\<format\>”是您想要使用的输出格式。以下是一些常用的输出格式：
```
brief：简短格式，只显示日志消息的优先级和标记。
process：显示进程ID和进程名称。
tag：显示标记和消息。
thread：显示线程ID和线程名称。
time：显示时间戳和消息。
```

问题现象：我在安卓系统上面使用logcat命令，发现能执行logcat -v hj命令，很奇怪，明明format是有指定的格式，不能乱写，但是执行不报任何错误。然后就在chatgpt上面搜啊搜啊，然后百度啊，都没有结果。搜索了大约2个小时，我才选择了放弃，最终认为可能是重新编译了logcat命令。

export LOGCAT_FORMAT=hj="threadtime"，怀疑可能是别名，但是这样执行后不行：
```
root@android:/system # set | grep hj
LOGCAT_FORMAT='hj=threadtime'
root@android:/system # env| grep hj
LOGCAT_FORMAT=hj=threadtime
root@android:/system # logcat -v hj
Invalid parameter to -v
Usage: logcat [options] [filterspecs]
```

logcat是Android系统中的一个命令行工具，用于查看系统日志。其源代码可以在Android开源项目的代码库中找到。

具体来说，logcat的源代码位于Android源代码树的/system/core/logcat目录下。您可以通过以下步骤获取Android源代码并查看logcat的源代码：

- 访问Android开源项目的官方网站：https://source.android.com/
- 按照网站上的指引，下载并安装repo工具。
- 使用repo工具下载Android源代码树：repo init -u https://android.googlesource.com/platform/manifest -b [branch_name]，其中[branch_name]是您想要下载的Android版本的代码分支名称。
- 进入源代码树的/system/core/logcat目录，即可找到logcat的源代码。

首先发现brief 是 Android 系统中 logcat 工具的一种输出格式，它会输出每条日志的优先级、标记、进程 ID 和消息内容。brief 格式的原型定义在 Android 源代码中的 system/core/include/log/logd.h 文件中，因此搜索logd.h文件，找到了system/core目录，然后找到了logcat.cpp文件，看代码追踪，找到一个liblog目录，里面有个logprint.c文件，也是开源的：
```
然后在android_log_formatFromString函数中找到：
/**
 * Returns FORMAT_OFF on invalid string
 */
AndroidLogPrintFormat android_log_formatFromString(const char * formatString)
{
    static AndroidLogPrintFormat format;

    if (strcmp(formatString, "brief") == 0) format = FORMAT_BRIEF;
    else if (strcmp(formatString, "process") == 0) format = FORMAT_PROCESS;
    else if (strcmp(formatString, "tag") == 0) format = FORMAT_TAG;
    else if (strcmp(formatString, "thread") == 0) format = FORMAT_THREAD;
    else if (strcmp(formatString, "raw") == 0) format = FORMAT_RAW;
    else if (strcmp(formatString, "time") == 0) format = FORMAT_TIME;
    else if (strcmp(formatString, "threadtime") == 0) format = FORMAT_THREADTIME;
    else if (strcmp(formatString, "long") == 0) format = FORMAT_LONG;
    else if (strcmp(formatString, "hj") == 0) format = FORMAT_HJ;
    else format = FORMAT_OFF;

    return format;
}

    case FORMAT_HJ:
        prefixLen = snprintf(prefixBuf, sizeof(prefixBuf),
            "%s.%03ld [%5d/%5d] [%5s] %-8s: ", timeBuf, entry->tv_nsec / 1000000,
            entry->pid, entry->tid, filterPriToStr(entry->priority), entry->tag);
        strcpy(suffixBuf, "\n");
        suffixLen = 1;
        break;
```
官方文档：https://developer.android.google.cn/studio/command-line/logcat.html?hl=zh_cn
终结束，有时候无法立即搜索到自己的答案，说明是有可能是自定义的，不是官方的。

## 11、log命令
log -t "tag" "there are 5 usb devices"

中间的部分代表AID, settings应用的AID为system, 无法更新persist.usb.*的系统属性
setprop persist.usb.dwc_driver 2
setprop persist.sys.dwc_driver 2
