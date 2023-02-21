# tmpfiles
tmpfiles.d 配置文件定义了一套临时文件管理机制： 创建 文件、目录、管道、设备节点， 调整 访问模式、所有者、属性、限额、内容， 删除 过期文件。 主要用于管理易变的临时文件与目录，例如 /run, /tmp, /var/tmp, /sys, /proc, 以及 /var 下面的某些目录。

systemd-tmpfiles 根据这些配置， 在系统启动过程中创建易变的临时文件与目录，并在系统运行过程中进行周期性的清理。



http://www.jinbuguo.com/systemd/tmpfiles.d.html

如：
```xxx.conf
d /var/run/folder 0755 root root -
```

创建一个folder文件夹

