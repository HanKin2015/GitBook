# Unix高级环境编程

# 1、初识Linux

Linus Torvalds仿造Unix系统。

## 内核
- 系统内存
- 软件程序
- 硬件设备
- 文件系统

虚拟存储：swap space交换空间。反复交换虚拟内存中的内容，页面page。

## sleep命令
在Shell脚本中，sleep 命令用于暂停脚本的执行一段时间。在大多数的Unix-like系统中，sleep 命令接受的参数可以是一个整数或带有时间单位的字符串。
对于时间单位，通常可以使用以下格式：
sleep 1 睡眠1秒
sleep 1s 睡眠1秒
sleep 1m 睡眠1分
sleep 1h 睡眠1小时

因此，sleep 1s 和 sleep 1 都是合法的写法，它们的含义是暂停脚本的执行1秒钟。
这种写法的灵活性使得我们可以根据需要选择更直观的时间单位，例如 sleep 5s 表示暂停5秒，sleep 2m 表示暂停2分钟，等等。
