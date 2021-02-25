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












