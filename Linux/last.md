# last命令

## 1、查看最近一次开机时间
> who -b
或者
> last -1 reboot
1
2
3

## 2、查看关机记录
> last -x | grep shutdown #以关机时间段显示
1
查看失败登录记录, 来源以IP显示
> sudo lastb -i
1
查看系统从上次开机到现在已经运行多久了
> uptime
或者
> w