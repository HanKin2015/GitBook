# Linux 开机启动的三种方法

## 一、修改开机启动文件
/etc/rc.local（或者/etc/rc.d/rc.local）

1、编辑rc.local文件（命令后面得加&号，表示后台运行）
2、最后修改rc.local文件的执行权限：chmod +x /etc/rc.local

## 二、自己写一个shell脚本
将写好的脚本（.sh文件）放到目录 /etc/profile.d/ 下，系统启动后就会自动执行该目录下的所有shell脚本。
注：如果是普通的java -jar命令的脚本会有问题，因为脚本执行完才会进桌面（麒麟系统），但是jar包一直得处于运行状态，导致一直进不了桌面。

## 三、通过chkconfig命令设置
1、编写脚本
启动xxxx.sh程序前面务必添加如下三行代码，否侧会提示chkconfig不支持。
```
#!/bin/sh                          告诉系统使用的shell,所以的shell脚本都是这样
#chkconfig: 35 20 80               分别代表运行级别，启动优先权，关闭优先权，此行代码必须
#description: tomcat-server          自己随便发挥！！！，此行代码必须

# 添加需要执行的脚本
# nohup java -jar xxxx.jar
# nginx -c xxxx.conf
```

2、将脚本文件复制到 /etc/init.d/或者/etc/rc.d/init.d/目录下（前者是后者的软连接）
```
cp /root/xxxx.sh /etc/init.d
```

3、设置脚本的可执行权限
```
chmod +x /etc/init.d/xxxx.sh
```

4、添加脚本到开机自动启动项目中，添加到chkconfig，开机自启动：
```
cd /etc/init.d
chkconfig --add lvs.sh
chkconfig xxxx.sh on
```

5、其他相关命令
```
# 1.关闭开机启动 
chkconfig xxxx.sh off

# 2.从chkconfig管理中删除
chkconfig --del xxxx.sh

# 3.查看chkconfig管理
chkconfig --list
```




