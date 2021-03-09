# 银河麒麟安装后bash权限问题

现象：银河麒麟系统安装后，没有可执行权限，运行bash或者2进制程序都提示bash权限不够或者类似报错

原因：系统做了限制，客服公众号回复需要进行下述设定

解决：sudo setstatus softmode -p

```
root@sangfor-KVM-Virtual-Machine:/home/sangfor# getstatus
KySec status: Normal

exec control: on
file protect: on
kmod protect: on
three admin : off
root@sangfor-KVM-Virtual-Machine:/home/sangfor# setstatus
usage:  setstatus < Normal |Softmode > [ -p ]
        setstatus -f  < exectl | fpro | kmod >  < on | off >
```