# u-boot

## 1、参数个数限制
```
gxlx3_az201_v1#setenv hejian $hejian 1=1 2=2 3=3
gxlx3_az201_v1#setenv hejian $hejian 1=1 2=2 3=3
setenv - set environment variables

Usage:
setenv [-f] name value ...
    - [forcibly] set environment variable 'name' to 'value ...'
setenv [-f] name
    - [forcibly] delete environment variable 'name'
gxlx3_az201_v1#printenv hejian
hejian=33 33 33 33 1 2 3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3
gxlx3_az201_v1#setenv hejian "$hejian 1=1 2=2 3=3"
gxlx3_az201_v1#printenv hejian
hejian=33 33 33 33 1 2 3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3
gxlx3_az201_v1#setenv hejian $hejian 1=1 2=2 3=3
setenv - set environment variables

Usage:
setenv [-f] name value ...
    - [forcibly] set environment variable 'name' to 'value ...'
setenv [-f] name
    - [forcibly] delete environment variable 'name'
gxlx3_az201_v1#setenv hejian "$hejian 1=1 2=2 3=3"
gxlx3_az201_v1#printenv hejian
hejian=33 33 33 33 1 2 3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3
gxlx3_az201_v1#setenv hejian "$hejian 1=1 2=2 3=3"
gxlx3_az201_v1#setenv hejian "$hejian 1=1 2=2 3=3"
gxlx3_az201_v1#setenv hejian "$hejian 1=1 2=2 3=3"
gxlx3_az201_v1#printenv hejian
hejian=33 33 33 33 1 2 3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3 1=1 2=2 3=3
gxlx3_az201_v1#
```

CONFIG_SYS_BARSIZE（Boot Argument Size）定义了 U-Boot 在 bootm 启动内核时，为 kernel command line 分配的内存缓冲区大小。

```
env default -a   # 恢复默认环境变量
saveenv          # 按新的 CONFIG_ENV_SIZE 重新写入存储介质
```

