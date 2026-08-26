# BSP开发工程师

## 1、介绍


## 2、串口
更多见：D:\Github\GitBook\USBDevice\common.md

## 3、setenv
```
setenv <name> <value>
```
当 <value> 包含空格时，U-Boot 会把空格后的内容识别为下一个独立参数或命令，而不是 value 的一部分。

如：
```
setenv bootargs ${bootargs} hejianhejian=hejianhejianhejian androidboot.force_normal_boot=1
```
h=h 被当作下一个命令执行 → 报 Unknown command 'h=h'。

应改为：
```
setenv bootargs "${bootargs} he=he h=h androidboot.force_normal_boot=1"
```

CONFIG_SYS_BARSIZE（Boot Argument Size）定义了 U-Boot 在 bootm 启动内核时，为 kernel command line 分配的内存缓冲区大小。

```
env default -a   # 恢复默认环境变量
saveenv          # 按新的 CONFIG_ENV_SIZE 重新写入存储介质
```

## 4、读写寄存器值
```
md.l 0xff8000b4 1   # AO_SEC_SD_CFG15 地址，具体地址因芯片型号而异

store read misc 0x1000000 0x0 0x440
md.b 0x1000000 0x440
```