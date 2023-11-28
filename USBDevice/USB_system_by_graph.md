# 图解USB系统
建议使用下划线命名方式。
驼峰命名方式也不错。

plug插头插座
flip快速翻转
USB：Serial串行
URB
HC
HCD
USBD
HCI：Host Controller Interface
---

UHCI:Universal
OHCI:Open
EHCI:Enhanced提高增强
XHCI:Extensible可延伸的；可扩充的；可展开的;

USB协议版本：1.0 1.1 2.0 3.0 3.1
对应速率：低 全 高 超 超速+

EP（端点） 编号最高位表示方向 1为OUT 81为IN

descriptor描述符
description描述
---

描述符
设备描述符：14项
配置描述符：8项，包含接口数量
接口描述符：9项
端点描述符：6项
字符串描述符：3项

设备类







