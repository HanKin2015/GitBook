# Android.mk

## 1、概览
Android.mk 文件位于项目 jni/ 目录的子目录中，用于向编译系统描述源文件和共享库。它实际上是编译系统解析一次或多次的微小 GNU makefile 片段。Android.mk 文件用于定义 Application.mk、编译系统和环境变量所未定义的项目范围设置。它还可替换特定模块的项目范围设置。

Android.mk 的语法支持将源文件分组为模块。模块是静态库、共享库或独立的可执行文件。您可在每个 Android.mk 文件中定义一个或多个模块，也可在多个模块中使用同一个源文件。编译系统只将共享库放入您的应用软件包。此外，静态库可生成共享库。

除了封装库之外，编译系统还可为您处理各种其他事项。例如，您无需在 Android.mk 文件中列出头文件或生成的文件之间的显式依赖关系。NDK 编译系统会自动计算这些关系。因此，您应该能够享受到未来 NDK 版本中新工具链/平台支持带来的益处，而无需处理 Android.mk 文件。

此文件的语法与随整个 Android 开源项目分发的 Android.mk 文件中使用的语法非常接近。虽然使用这些语法的编译系统实现并不相同，但通过有意将语法设计得相似，可使应用开发者更轻松地将源代码重复用于外部库。

基础知识
在详细了解语法之前，最好先了解 Android.mk 文件所含内容的基本信息。为此，本部分使用 Hello-JNI 示例中的 Android.mk 文件解释文件中每一行的作用。

Android.mk 文件必须先定义 LOCAL_PATH 变量：

LOCAL_PATH := $(call my-dir)

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
```

# android浅认识

## 1、Android实用技巧之adb命令：getprop，setprop，watchprops命令的使用
getprop命令的作用就是从系统的各种配置文件中读取一些设备的信息。这些文件在我们的安卓设备中是可以找到的：

```
/init.rc
/default.prop
/system/build.prop
/data/property/
```

因此getprop显示的属性值是可以清除的，通过删除文件或者删除文件里面的内容，但是都是需要安卓设备重启生效。

## 2、Kconfig文件
当执行#make menuconfig时会出现内核的配置界面，所有配置工具都是通过读取"arch/$(ARCH)Kconfig"文件来生成配置界面，这个文件就是所有配置的总入口，它会包含其他目录的Kconfig

Kconfig的作用：Kconfig用来配置内核，它就是各种配置界面的源文件，内核的配置工具读取各个Kconfig文件，生成配置界面供开发人员配置内核，最后生成配置文件.config

## 3、错误日志
untracked pid XXX exited

无法像linux那样查询进程：
ps aux 
ps -ef
而是：
ps

## 混乱的环境
/vendor/bin/sh
/system/bin/sh
/bin/bash

发现使用bash命令时，sh脚本第一行是注释行，不起作用。但是增加执行x权限之后，第一行就会起作用。








