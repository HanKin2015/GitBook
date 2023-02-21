# attrib指令

## 1、简介
attrib指令用于修改文件的属性，文件的常见属性有：只读·存档·隐藏和系统。

## 2、attrib指令的格式和常用参数
```
ATTRIB [+R | -R] [+A | -A ] [+S | -S] [+H | -H] [[drive:] [path] filename] [/S [/D]]
+ 设置属性。
- 清除属性。
R 只读文件属性。
A 存档文件属性。
S 系统文件属性。
H 隐藏文件属性。
I 无内容索引文件属性。
[drive:][path][filename]
指定要处理的文件属性。
/S 处理当前文件夹及其子文件夹中的匹配文件。
/D 处理文件夹。
/L 处理符号链接和符号链接目标的属性。
```

## 3、示例
```
attrib autorun.inf -a -s -r -h /*去掉autorun.inf的四种属性*/
del autorun.inf /*删除autorun.inf*/
attrib *.* -a -s -r -h
attrib /d /s +a -s -h -r 这条命令可以恢复U盘所有文件夹
```

## 4、实战

### 4-1、设置和清楚属性
给《关闭PC客户端DEBUG日志.reg》文件右键属性添加隐藏和只读属性，使用attrib命令查看就会有HR属性。
```
D:\FTP服务器\hj>attrib 关闭PC客户端DEBUG日志.reg
A   HR               D:\FTP服务器\hj\关闭PC客户端DEBUG日志.reg

D:\FTP服务器\hj>attrib 开启PC客户端DEBUG日志.reg
A                    D:\FTP服务器\hj\开启PC客户端DEBUG日志.reg

D:\FTP服务器\hj>attrib -A -H -R  关闭PC客户端DEBUG日志.reg

D:\FTP服务器\hj>attrib  关闭PC客户端DEBUG日志.reg
                     D:\FTP服务器\hj\关闭PC客户端DEBUG日志.reg
```
默认会有A存档文件属性。

### 4-2、系统文件属性
如何添加系统属性，这个属性有啥特别，在C:\Windows\System32\drivers文件夹中都没有找到这个属性，自己给文件《开启PC客户端DEBUG日志.reg》添加试试。

发现右键文件属性，在详细信息中也能看见文件属性值。

```
D:\FTP服务器\hj>attrib +A 关闭PC客户端DEBUG日志.reg
未重置隐藏文件 - D:\FTP服务器\hj\关闭PC客户端DEBUG日志.reg

D:\FTP服务器\hj>attrib +S 开启PC客户端DEBUG日志.reg

D:\FTP服务器\hj>attrib 开启PC客户端DEBUG日志.reg
A  S                 D:\FTP服务器\hj\开启PC客户端DEBUG日志.reg

D:\FTP服务器\hj>attrib -A 开启PC客户端DEBUG日志.reg
未重置系统文件 - D:\FTP服务器\hj\开启PC客户端DEBUG日志.reg

D:\FTP服务器\hj>attrib +H 开启PC客户端DEBUG日志.reg
未重置系统文件 - D:\FTP服务器\hj\开启PC客户端DEBUG日志.reg

D:\FTP服务器\hj>attrib +R 开启PC客户端DEBUG日志.reg
未重置系统文件 - D:\FTP服务器\hj\开启PC客户端DEBUG日志.reg
```
并没有发现系统文件属性太大的特别，只是无法进行隐藏，而且无法对该文件进行其他属性的设置和清除。
