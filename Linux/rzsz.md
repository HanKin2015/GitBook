# rz上传sz下载

## 1、安装
yum -y install lrzsz

## 2、mobaxterm使用sz下载（以下三步都需要做）
sz  filename
ctrl + 鼠标右键（不一定需要ctrl键）
右键菜单栏中选择：Receive file using Z-modem

## 3、mobaxterm使用rz上传（以下三步都需要做）
rz
ctrl + 鼠标右键（不一定需要ctrl键）
右键菜单栏中选择：Send file using Z-modem

## 4、一直想知道的单词缩写
Receive file using Z-modem(rz)
Send file using Z-modem(sz)

这样理解就能说通：
在服务器中执行命令，sz相当于服务端要发送文件，即下载。rz服务端要接收文件，即上传。

Zmodem协议是针对modem的一种错误校验协议。利用Zmodem协议，可以在modem上发送512字节的数据块。如果某个数据块发生错误，接受端会发送“否认”应答，因此，数据块就会被重传。
它是Xmodem 文件传输协议的一种增强形式，不仅能传输更大的数据，而且错误率更小。包含一种名为检查点重启的特性，如果通信链接在数据传输过程中中断，能从断点处而不是从开始处恢复传输。

## 5、直接使用sz和rz命令会出现卡住的问题
原来是我操作的问题。。。。。。
之前居然没有指明这一点，哎。
上面的上传下载的三步走不是三种方式，而是唯一的一种方式，需要分三步走才能完成。
注意sz选择的Receive而不是Send。

很奇怪mobaxterm出现直接拖曳会出现两个文件MD5值不匹配问题，使用rzsz命令解决。