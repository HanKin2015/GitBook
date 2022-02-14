# linux cups 打印机命令说明

## 1、英文简介
cups	英[kʌps]
美[kʌps]
n.	杯子; 一杯(的量); 杯(美国用作烹饪的计量单位); 量杯(金属或塑料量器);
v.	使(手)窝成杯状; 使(双手)成圆状托起;
[词典]	cup的第三人称单数和复数;
[例句]This cup has a crack in it.
这杯子有一道裂痕。

cup	英[kʌp]
美[kʌp]
n.	杯子; 一杯(的量); 杯(美国用作烹饪的计量单位); 量杯(金属或塑料量器); 杯状物; 奖杯; 优胜杯赛; （胸罩的）罩杯; 混合饮料; 球洞; （体育运动时保护男子生殖器的）护杯;
vt.	使(手)窝成杯状; 使(双手)成圆状托起;

## 2、CUPS （通用Unix打印系统）
CUPS(Common UNIX Printing System，通用Unix打印系统)是Fedora Core3中支持的打印系统，它主要是使用IPP(Internet Printing Protocol)来管理打印工作及队列，但同时也支持"LPD"(Line Printer Daemon)和"SMB"(Server Message Block)以及AppSocket等通信协议。

Unix/Linux下打印总是有许多限制。但若安装了CUPS（Common UNIX Printing System），你将会得到一个完整的打印解决方案。
在UNIX/Linux 下打印的方法很久以来都是用lpd（命令行方式的打印守护程序），它不支持IPP（Internet打印协议），而且也不支持同时使用多个打印设备。
CUPS给Unix/Linux用户提供了一种可靠有效的方法来管理打印。它支持IPP，并提供了LPD，SMB（服务消息块，如配置为微软WINDOWS的打印机）、JetDirect等接口。CUPS还可以浏览网络打印机。
作为网络服务器建议关闭CUPS，关闭CUPS的命令如下：
service cups stop
chkconfig cups off
