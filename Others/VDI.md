# 国内VDI市场

转载：https://blog.csdn.net/weixin_33749131/article/details/92509621

## 传输协议
 I'm old, but I'm not obsolete.

我老了，但并未过时。


软件行业要想在市场上占得先机需要的是优秀的软件质量和市场久经考验的使用口碑；除此之外，对虚拟化这种云计算软件来说，流畅的用户体验和稳定可靠的后台运行系统更是用户考虑的最重要因素，而要实现这些特点，究其核心对桌面虚拟化软件来说就是对传输协议的考验。

桌面传输协议是一组用来在桌面服务器和用终端之间进行通信的协议。主要完成服务器到用终端的图形、图像、音频的传输以及用户终端到服务器输入信息的传输，包括鼠标、键盘、外设等输信息。


桌面传输协议负责把虚拟桌面显示的内容从服务端通过网络传递到远程用户终端。数据的传输过程需要用到TCP／IP网络中的传输层协议，可以使用TCP协议或UDP协议进行传输。目前的桌面传输协议大多使用TCP协议，也有协议使用UDP协议来传输视频流数据。使用TCP协议可以保证数据的完整性，不会有数据丢失，但是TCP协议会产生一些ACK确认报文，会增加网络传输开销。UDP协议适合用来传输对丢失不敏感的数据。

传输协议对桌面虚拟化平台而言就相当于是手机中的芯片，是软件的核心所在。

一般来说目前国内外市场上的桌面虚拟化产品所采用的传输协议有这样几种，包括ICA协议、PCoIP协议、RDP协议，以及开源协议SPICE。








