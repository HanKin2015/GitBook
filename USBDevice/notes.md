# 随记


当前进展：
1. 远程笔记本电脑自带一个摄像头，则总共有三个摄像头，我们目前只支持两个摄像头。所以将笔记本摄像头加入黑名单，但是测试还是无法使用。
2. 现象：高拍仪的主副摄像头能在虚拟机的设备管理器看见（即映射进去），但是当使用高拍仪软件或者amcap后则主摄像头就会断开映射（设备管理器里只有副摄像头的映射），因此软件无法找到主摄像头设备。
3. 通过观察客户端日志没有发现任何错误，查看了vmp的日志（qemu和camera日志）也未发现错误
4. 数据包抓包有错误，但是没有正常的数据包进行对比分析

下一步计划：
1. 使用盒子进行尝试，配置camera名单走usb映射





深信服的SRAP 协议是根据什么协议开发的？ RDP 还是 SPICE ?
云桌面需要通过网络交付给前端设备，其中最重要的组成部分就是桌面交付协议。为实现云桌面的高效交付，深信服专门为虚拟桌面及远程应用程序设计并研制了SRAP协议。深信服自研的SRAP高效交付协议，采用高效流压缩、智能数据缓存、动态图像优化等多项优化技术，相对RDP协议提升6倍传输效率，最大程度保障用户桌面体验。







