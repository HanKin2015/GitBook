[TOC]

# 脚本学习总结

## python

- 文件分类
- 生成md文件目录
- gitbook生成summary.md文件
- python操作ftp

## shell

## js

## 
下一步计划：





当前进展：
1、确认ukey文件系统格式，
看不出是什么格式，文件资源管理器没有设备，磁盘管理器里面是未分配。

2、确认流量网速带宽，确认策略中是否有限制，确认ukey映射交互中流量是多少，
走网络代理的，网络带宽是100M，延迟26ms左右。登录过程中vdc的上下行带宽3kb/s左右。确认策略中没有usb限制。

3、acc名单配置前后对比是否有所改善，
acc名单无关。最开始测试未配置acc名单发现登录过程中是46秒，配置acc名单后是1分13秒，再远程查询一段时间后不配置任何名单发现，登录需要2分多钟。
启用usb映射流量压缩无效，登录时间是1分27秒。

4、确认先前的交互优化方式中映射问题，是不是有特殊的包导致，是否可以放行
前天使用交互优化包测试，vmp上面还有映射错误日志。今天测试了三遍vmp无任何日志，映射正常。arm盒子也无任何错误日志，映射成功。虚拟机里面显示大容量设备存储，但是没有了磁盘驱动器。正常情况下大容量设备存储下面还有一个磁盘驱动器。通过抓数据包看到，有数据包被canceled掉。

登录慢的原因就是交互过程中数据包数量众多，每个包大约有22ms的延迟，累计起来就会很长。1分13秒的登录数据包的延迟有40ms左右。登录整体过程中时间长短不是个固定的大概范围。



下一步计划：
1、局域网内环境进行测试，因为内部测试交互优化包映射正常。确认是不是客户环境网络延迟导致canceled掉数据包。
2、同一个账号，盒子在内网和外网对比测试一下，确认一下是不是虚拟机内部网络问题。
3、分析走交互优化过程中映射异常的原因，调通交互优化过程，尽量协调ukey寄回分析。



07-31 16:36:25.260  1199  8072 I TGS     : hotplug_idle_cb event:2. {spice_usb_device_manager_hotplug_idle_cb:1405}
07-31 16:36:25.260  1199  8072 I TGS     : spice_usb_device_manager_remove_dev ->>>>>!! {spice_usb_device_manager_hotplug_idle_cb:1415}
07-31 16:36:25.260  1199  8072 I TGS     : device remove. bus 3 addr 8 ->>>>>!! {spice_usb_device_manager_hotplug_idle_cb:1421}
07-31 16:36:25.260  1199  8072 I USB     : device_removed_cb removed usb device:Unknown USB Device [101d:0003] at 3-8 {device_removed_cb:467}
07-31 16:36:25.260    97   129 W Vold    : subsystem found in netlink event
07-31 16:36:25.260    97   129 D Vold    : usb, 2
07-31 16:36:25.260    97   129 W Vold    : sangforMoniterUSB event
07-31 16:36:25.260    97   129 D Vold    : SangformoniterUSB enter
07-31 16:36:25.260    97   129 D Vold    : SangformoniterUSB: current usb device: 101D/0003 
07-31 16:36:25.260    97   129 D Vold    : SangformoniterUSB:analytical_busid error: /devices/platform/usb20_host/usb3/3-1/3-1.1/3-1.1:1.0
07-31 16:36:25.260    97   129 W Vold    : subsystem found in netlink event
07-31 16:36:25.260    97   129 D Vold    : usb, 2
07-31 16:36:25.260    97   129 W Vold    : sangforMoniterUSB event
07-31 16:36:25.260    97   129 D Vold    : SangformoniterUSB enter
07-31 16:36:25.260    97   129 D Vold    : SangformoniterUSB: current usb device: 101D/0003 
07-31 16:36:25.260    97   129 I Vold    : SangformoniterUSB remove
07-31 16:36:25.260    97   129 D Vold    : SangformoniterUSB: busid=3-1.1#usbid=101d:0003#;
07-31 16:36:25.260    97   129 I Vold    : SangformoniterUSB: return
07-31 16:36:25.260   679   736 D MountService: SangforUsbRemoved intent Intent { act=android.intent.action.SANGFOR_USB_REMOVE (has extras) }
07-31 16:36:25.260   679   736 W ContextImpl: Calling a method in the system process without a qualified user: android.app.ContextImpl.sendBroadcast:1050 com.android.server.MountService.onEvent:900 com.android.server.NativeDaemonConnector.handleMessage:102 android.os.Handler.dispatchMessage:95 android.os.Looper.loop:137 
07-31 16:36:25.460  1199  8057 I TgsUSBDeviceManager: onRemoveUSBDevice, busId is:3 deviceId:8 {x:-1}
07-31 16:36:25.460  1199  8057 I TgsUSBDeviceManager: 拔除一个USB设备, busId:3, deviceId:8 {x:-1}
07-31 16:36:25.460  1199  8057 I TGS     : spice_usb_device_manager_remove_dev ->>>>>!! {spice_usb_device_manager_remove_dev:1262}
07-31 16:36:25.460  1199  8057 I TGS     : device remove. bus 3 addr 8 ->>>>>!! {spice_usb_device_manager_remove_dev:1271}
07-31 16:36:25.460  1199  8057 I TGS     : spice_usb_device_manager_remove_dev found usb device to remove ->>>>>!! {spice_usb_device_manager_remove_dev:1306}
07-31 16:36:25.460  1199  8057 I TGS     : disconnecting device 0x5ce682e0!!!!!!!!!!!!!!!!!!!!!!!!!!!!! {spice_usb_device_manager_disconnect_device:2245}
07-31 16:36:25.460  1199  8057 I TGS     : [usbredir] usb channel:0x5cd0cd78, unset rate limit, enable_usb_flow_limit:0 {unset_local_rate_limit:1112}
07-31 16:36:25.460  1199  8057 I TGS     : disconnecting device from usb channel:0x5cd0cd78 tid:8057 state:1 {spice_usbredir_channel_disconnect_device:732}
07-31 16:36:25.460  1199  8057 E TGS     : usbredirhost: error resetting device: LIBUSB_ERROR_NO_DEVICE {usbredir_log:865}
07-31 16:36:25.460  1199  8057 E TGS     : (line:857)success -===>> {usbredir_log:865}
07-31 16:36:25.460  1199  8057 I c       : send usbDevice info, commandCode:8 record info:devName:usb flash disk, busid:3, deviceId:8, devState:2, mRedir0, isFilterByWhiteList:false, isFilterByClassFilter:false, isStorage:true, isPrinter:false, isCDRom:false, isAudio:false, usbip:101d:0003, pid:0003, vid:101d, devUniqueId:196616, devDefaultDeskId:-1, currentDeskId:-1 {a:-1}
07-31 16:36:28.700    97   129 W Vold    : subsystem found in netlink event
07-31 16:36:28.700    97   129 D Vold    : usb, 1
07-31 16:36:28.700    97   129 D Vold    : == current usb device: 101D/0003 ===
07-31 16:36:28.700    97   129 W Vold    : sangforMoniterUSB event
07-31 16:36:28.700    97   129 D Vold    : SangformoniterUSB enter
07-31 16:36:28.700    97   129 D Vold    : SangformoniterUSB: current usb device: 101D/0003 
07-31 16:36:28.700    97   129 I Vold    : SangformoniterUSB add 
07-31 16:36:28.700    97   129 D Vold    : SangformoniterUSB: busid=3-1.1#usbid=101d:0003#;
07-31 16:36:28.700    97   129 I Vold    : SangformoniterUSB: return
07-31 16:36:28.700    97   129 W Vold    : subsystem found in netlink event
07-31 16:36:28.700    97   129 D Vold    : usb, 1
07-31 16:36:28.700    97   129 W Vold    : sangforMoniterUSB event
07-31 16:36:28.700    97   129 D Vold    : SangformoniterUSB enter
07-31 16:36:28.700    97   129 D Vold    : SangformoniterUSB: current usb device: 101D/0003 
07-31 16:36:28.700  1199  8072 I TGS     : hotplug_idle_cb event:1. {spice_usb_device_manager_hotplug_idle_cb:1405}
07-31 16:36:28.700  1199  8072 I TGS     : hotplug  device added 101d:0003 bcdDevice:0100 arrive {spice_usb_device_manager_add_dev:1216}
07-31 16:36:28.700    97   129 D Vold    : SangformoniterUSB:analytical_busid error: /devices/platform/usb20_host/usb3/3-1/3-1.1/3-1.1:1.0
07-31 16:36:28.700   679   736 D MountService: SangforUsbAdded intent Intent { act=android.intent.action.SANGFOR_USB_INSERT (has extras) }
07-31 16:36:28.700   679   736 W ContextImpl: Calling a method in the system process without a qualified user: android.app.ContextImpl.sendBroadcast:1050 com.android.server.MountService.onEvent:894 com.android.server.NativeDaemonConnector.handleMessage:102 android.os.Handler.dispatchMessage:95 android.os.Looper.loop:137 
07-31 16:36:28.710  1199  8072 I USB     : device_added_cb get usb device:Aisino USB Flash Disk [101d:0003] 3 9 {device_added_cb:448}
07-31 16:36:28.710   679  1161 W ContextImpl: Calling a method in the system process without a qualified user: android.app.ContextImpl.sendBroadcast:1050 com.android.server.usb.UsbSettingsManager.deviceAttached:619 com.android.server.usb.UsbHostManager.usbDeviceAdded:156 com.android.server.usb.UsbHostManager.monitorUsbHostBus:-2 com.android.server.usb.UsbHostManager.access$000:38 
07-31 16:36:28.910  1199  8057 I TgsUSBDeviceManager: 插入一个新的USB设备, busId:3, deviceId:9 {w:-1}
07-31 16:36:28.910  1199  8057 I USB     : usb device list:bus=03#address=04#redir=0#usbid=093a:2510#name=USB Optical Mouse {native_get_all_usb_devices1:1194}
07-31 16:36:28.910  1199  8057 I USB     : usb device list:bus=02#address=02#redir=0#usbid=1c4f:0026#name=USB Keyboard {native_get_all_usb_devices1:1194}
07-31 16:36:28.910  1199  8057 I USB     : usb device list:bus=03#address=09#redir=0#usbid=101d:0003#name=USB Flash Disk {native_get_all_usb_devices1:1194}
07-31 16:36:28.910  1199  8057 I TgsLocalUSBDeviceServer: get all usb devices, usbListBuff  {aw:-1}
07-31 16:36:28.910  1199  8057 I TgsLocalUSBDeviceServer: getAllUSBDevicesbus=03#address=04#redir=0#usbid=093a:2510#name=USB Optical Mouse {aw:-1}
07-31 16:36:28.910  1199  8057 I TgsLocalUSBDeviceServer: parseUSBDeviceItem, usbDevice is bus=03#address=04#redir=0#usbid=093a:2510#name=USB Optical Mouse {d:-1}
07-31 16:36:28.920  1199  8057 I USB     : class 3, subclass 1, protocol 2. {is_filter_usb_device_by_info:875}
07-31 16:36:28.920  1199  8057 I USB     : class 3, subclass 1, protocol 2. {is_filter_usb_device_by_info:875}
07-31 16:36:28.920  1199  8057 I USB     : this device is filter by ?bd<@. {is_filter_usb_device_by_info:901}
07-31 16:36:28.920  1199  8057 I TgsLocalUSBDeviceServer: parseUSBDeviceItem new record:devName:usb optical mouse, busid:3, deviceId:4, devState:2, mRedir0, isFilterByWhiteList:false, isFilterByClassFilter:true, isStorage:false, isPrinter:false, isCDRom:false, isAudio:false, usbip:093a:2510, pid:2510, vid:093a, devUniqueId:196612, devDefaultDeskId:-1, currentDeskId:-1 {d:-1}
07-31 16:36:28.920  1199  8057 I TgsLocalUSBDeviceServer: getAllUSBDevicesbus=02#address=02#redir=0#usbid=1c4f:0026#name=USB Keyboard {aw:-1}
07-31 16:36:28.920  1199  8057 I TgsLocalUSBDeviceServer: parseUSBDeviceItem, usbDevice is bus=02#address=02#redir=0#usbid=1c4f:0026#name=USB Keyboard {d:-1}
07-31 16:36:28.920  1199  8057 I USB     : class 3, subclass 1, protocol 1. {is_filter_usb_device_by_info:875}
07-31 16:36:28.920  1199  8057 I USB     : this device is filter by ?]d<@. {is_filter_usb_device_by_info:901}
07-31 16:36:28.920  1199  8057 I USB     : is_not_usb_cd_rom. {is_usb_cd_rom:715}
07-31 16:36:28.920  1199  8057 I TgsLocalUSBDeviceServer: parseUSBDeviceItem new record:devName:usb keyboard, busid:2, deviceId:2, devState:2, mRedir0, isFilterByWhiteList:false, isFilterByClassFilter:true, isStorage:false, isPrinter:false, isCDRom:false, isAudio:false, usbip:1c4f:0026, pid:0026, vid:1c4f, devUniqueId:131074, devDefaultDeskId:-1, currentDeskId:-1 {d:-1}
07-31 16:36:28.920  1199  8057 I TgsLocalUSBDeviceServer: getAllUSBDevicesbus=03#address=09#redir=0#usbid=101d:0003#name=USB Flash Disk {aw:-1}
07-31 16:36:28.920  1199  8057 I TgsLocalUSBDeviceServer: parseUSBDeviceItem, usbDevice is bus=03#address=09#redir=0#usbid=101d:0003#name=USB Flash Disk {d:-1}
07-31 16:36:28.920  1199  8057 I USB     : class 8, subclass 6, protocol 80. {is_filter_usb_device_by_info:875}
07-31 16:36:28.920  1199  8057 I USB     : class 8, subclass 6, protocol 80. {is_filter_usb_device_by_info:875}
07-31 16:36:28.920  1199  8057 I USB     : class 8, subclass 6, protocol 80. {is_filter_usb_device_by_info:875}
07-31 16:36:28.920  1199  8057 I TgsLocalUSBDeviceServer: parseUSBDeviceItem new record:devName:usb flash disk, busid:3, deviceId:9, devState:2, mRedir0, isFilterByWhiteList:false, isFilterByClassFilter:false, isStorage:true, isPrinter:false, isCDRom:false, isAudio:false, usbip:101d:0003, pid:0003, vid:101d, devUniqueId:196617, devDefaultDeskId:-1, currentDeskId:-1 {d:-1}
07-31 16:36:28.920  1199  8057 I TgsUSBDeviceManager: record is isFilterByClassFilter! {c:-1}
07-31 16:36:28.920  1199  8057 I TgsUSBDeviceManager: record is isFilterByClassFilter! {c:-1}
07-31 16:36:28.920  1199  8057 I TgsUSBDeviceManager: onInsertUSBDevice, TgsUsbDeviceRecord :devName:usb flash disk, busid:3, deviceId:9, devState:2, mRedir0, isFilterByWhiteList:false, isFilterByClassFilter:false, isStorage:true, isPrinter:false, isCDRom:false, isAudio:false, usbip:101d:0003, pid:0003, vid:101d, devUniqueId:196617, devDefaultDeskId:-1, currentDeskId:-1 {w:-1}
07-31 16:36:28.920  1199  8057 I c       : send usbDevice info, commandCode:1 record info:devName:usb flash disk, busid:3, deviceId:9, devState:1, mRedir0, isFilterByWhiteList:false, isFilterByClassFilter:false, isStorage:true, isPrinter:false, isCDRom:false, isAudio:false, usbip:101d:0003, pid:0003, vid:101d, devUniqueId:196617, devDefaultDeskId:-1, currentDeskId:13 {a:-1}
07-31 16:36:28.920  1199  8057 I TGS     : CAMERA is_uvc_camera_device, src device busid:3, devid:9. {is_uvc_camera_device:98}
07-31 16:36:28.920  1199  8057 E TGS     : CAMERA open /dev/video0 failed No such file or directory {is_uvc_camera_device:113}
07-31 16:36:28.920  1199  8057 E TGS     : CAMERA open /dev/video1 failed No such file or directory {is_uvc_camera_device:113}
07-31 16:36:28.920  1199  8057 E TGS     : CAMERA open /dev/video2 failed No such file or directory {is_uvc_camera_device:113}
07-31 16:36:28.920  1199  8057 E TGS     : CAMERA open /dev/video3 failed No such file or directory {is_uvc_camera_device:113}
07-31 16:36:28.920  1199  8057 I TGS     : [get_usb_path_table] num:6 {get_usb_path_table:2680}
07-31 16:36:28.920  1199  8057 I TGS     : Usb device get channel, device path:3-1.1 {spice_usb_device_get_channel:2721}
07-31 16:36:28.920  1199  8057 I TGS     : Found usb channel for direct usb device, vid:101d pid:0003, usb_idx:12, max idx:14 {spice_usb_device_get_channel:2768}
07-31 16:36:28.920  1199  8057 I TGS     : usbredir channel idx:12,len:15 {_spice_usb_device_manager_connect_device_async:2002}
07-31 16:36:28.920  1199  8057 I TGS     : spice channel(9:2) connect, but state(2) not SPICE_CHANNEL_STATE_UNCONNECTED, and don't have error. {spice_channel_connect:4794}
07-31 16:36:28.920  1199  8057 I TGS     : [usbredir] doesn't support usb flow limit {set_rate_limit:1035}
07-31 16:36:28.920  1199  8057 I TGS     : USBDEBUG:connecting usb channel 0x5cd0cd78 {spice_usbredir_channel_connect_device_async:657}
07-31 16:36:28.920  1199  8057 I TGS     : spice_usbredir_channel_open_device host:0x5d390f00. {spice_usbredir_channel_open_device_ex:512}
07-31 16:36:28.920  1199  8057 W TGS     : usbredirhost: [----usbredirhost_set_reset_blacklist----] copy to list i:0 vid:04e8 pid:6860 
07-31 16:36:28.920  1199  8057 W TGS     :  {usbredir_log:867}
07-31 16:36:28.920  1199  8057 W TGS     : usbredirhost: [----usbredirhost_set_reset_blacklist----] copy to list i:1 vid:0b57 pid:813c 
07-31 16:36:28.920  1199  8057 W TGS     :  {usbredir_log:867}
07-31 16:36:28.920  1199  8057 W TGS     : usbredirhost: [----usbredirhost_set_mpquirk_list----] copy to list i:0 vid:1a56 pid:ee01 
07-31 16:36:28.920  1199  8057 W TGS     :  {usbredir_log:867}
07-31 16:36:28.920  1199  8057 W TGS     : usbredirhost: [----usbredirhost_set_audio_list----] copy to list i:0 vid:0d8c pid:0105 
07-31 16:36:28.920  1199  8057 W TGS     :  {usbredir_log:867}
07-31 16:36:28.920  1199  8057 W TGS     : usbredirhost: [----usbredirhost_set_audio_list----] copy to list i:1 vid:0c45 pid:1d7d 
07-31 16:36:28.920  1199  8057 W TGS     :  {usbredir_log:867}
07-31 16:36:29.130  1199  8057 W TGS     : usbredirhost: device id 101d:0003 is in usbacc blacklist, no usbacc {usbredir_log:867}
07-31 16:36:29.130  1199  8057 W TGS     : usbredirhost: no need usbacc {usbredir_log:867}
07-31 16:36:29.130  1199  8057 D         :  [scanacc_canon_detec:117]
07-31 16:36:29.130  1199  8057 D         :  [scanacc_normal_detec:29]
07-31 16:36:29.130  1199  8057 W GLib+GLib: GError set over the top of a previous GError or uninitialized memory.
07-31 16:36:29.130  1199  8057 W GLib+GLib: This indicates a bug in someone's code. You must ensure an error is NULL before it's set.
07-31 16:36:29.130  1199  8057 W GLib+GLib: The overwriting error message was: (line:533)sangfor_scanner_opt_init_default_config failed!
07-31 16:36:29.130  1199  8057 W GLib+GLib: GError set over the top of a previous GError or uninitialized memory.
07-31 16:36:29.130  1199  8057 W GLib+GLib: This indicates a bug in someone's code. You must ensure an error is NULL before it's set.
07-31 16:36:29.130  1199  8057 W GLib+GLib: The overwriting error message was: (line:768)sangfor_scanner_opt_init_config failed!!
07-31 16:36:29.130  1199  8057 W GLib+GLib: GError set over the top of a previous GError or uninitialized memory.
07-31 16:36:29.130  1199  8057 W GLib+GLib: This indicates a bug in someone's code. You must ensure an error is NULL before it's set.
07-31 16:36:29.130  1199  8057 W GLib+GLib: The overwriting error message was: (line:911)sangfor_scanner_opt_deinit success -===>>
07-31 16:36:29.130  1199  8057 W TGS     : usbredirhost: ===== Enter set interrupt_normal_mode caps:0xe00000fe  (101d:0003) has_cap:0 disabel:0  tmp:(0000:0000)=====
07-31 16:36:29.130  1199  8057 W TGS     :  {usbredir_log:867}
07-31 16:36:29.130  1199  8057 W TGS     : usbredirhost: ===== interrupt_normal_mode was disabled, no need disable again 1=====
07-31 16:36:29.130  1199  8057 W TGS     :  {usbredir_log:867}
07-31 16:36:29.130  1199  8057 W TGS     : usbredirhost: ===== Exit set interrupt_normal_mode caps:0xe00000fe=====
07-31 16:36:29.130  1199  8057 W TGS     :  {usbredir_log:867}
07-31 16:36:29.130  1199  8072 I USB     : success to redirect usb device:Aisino USB Flash Disk [101d:0003] at 3-9 {connect_cb:513}
07-31 16:36:29.130  1199  8057 I TgsUSBDeviceManager: onUsbDeviceRedirActionResult, busId is:3 deviceId:9 result:4 {p:-1}
07-31 16:36:29.130  1199  8057 I c       : send usbDevice info, commandCode:3 record info:devName:usb flash disk, busid:3, deviceId:9, devState:0, mRedir1, isFilterByWhiteList:false, isFilterByClassFilter:false, isStorage:true, isPrinter:false, isCDRom:false, isAudio:false, usbip:101d:0003, pid:0003, vid:101d, devUniqueId:196617, devDefaultDeskId:-1, currentDeskId:13 {a:-1}
07-31 16:36:29.130  1199  8057 I TgsUSBDeviceManager: USB设备 devName:usb flash disk, busid:3, deviceId:9, devState:0, mRedir1, isFilterByWhiteList:false, isFilterByClassFilter:false, isStorage:true, isPrinter:false, isCDRom:false, isAudio:false, usbip:101d:0003, pid:0003, vid:101d, devUniqueId:196617, devDefaultDeskId:-1, currentDeskId:13 映射成功。 {p:-1}
07-31 16:36:38.230  1199  8071 I TGS     : session sync clock, interval of (c->s) is -3873408225495, max interval of (c->s) is -3873408212467, timenow:4097850658, vmp_clock:3877506063125, roundtrip:26057 {spice_session_set_clock_interval:2623}
07-31 16:36:48.950  8593  8593 I network-dog: Ethernet eth0 all recv:525 send:761 recv_err:0,snmp recv:525 send:755 retrans:3 err:0. 
07-31 16:36:58.670  1199  1587 I TGS     : ping_package_put_package  packageid:199,dstancetime:263177	average_time:105203  total_time:315610 recv_package_num:201 {ping_package_put_package:96}



2020-07-31 16:34:21.524290 debug [sfvt_qemu_3341582428070] 31588 os-posix:273 kvm: usb-redir warning: usbredir_device_disconnect, usbacc guest free 
2020-07-31 16:34:25.185843 info [sfvt_qemu_3341582428070] 31588 sf_redirect:2253 interface 0 bulk out is 0x1
2020-07-31 16:34:25.185852 info [sfvt_qemu_3341582428070] 31588 sf_redirect:2247 interface 0 bulk in is 0x81
2020-07-31 16:34:25.793313 debug [sfvt_qemu_3341582428070] 31588 os-posix:273 kvm: ctrl data in: 09 02 20 00 01 01 00 80 
2020-07-31 16:34:25.793323 debug [sfvt_qemu_3341582428070] 31588 os-posix:273 kvm: ctrl data in: 32 09 04 00 00 02 08 06 
2020-07-31 16:34:25.793328 debug [sfvt_qemu_3341582428070] 31588 os-posix:273 kvm: ctrl data in: 50 00 07 05 81 02 00 02 
2020-07-31 16:34:25.793334 debug [sfvt_qemu_3341582428070] 31588 os-posix:273 kvm: ctrl data in: 00 07 05 01 02 00 02 00 
2020-07-31 16:34:25.935390 debug [sfvt_qemu_3341582428070] 31588 os-posix:273 kvm: ctrl data in: 09 02 20 00 01 01 00 80 
2020-07-31 16:34:25.935404 debug [sfvt_qemu_3341582428070] 31588 os-posix:273 kvm: ctrl data in: 32 09 04 00 00 02 08 06 
2020-07-31 16:34:25.935410 debug [sfvt_qemu_3341582428070] 31588 os-posix:273 kvm: ctrl data in: 50 00 07 05 81 02 00 02 
2020-07-31 16:34:25.935415 debug [sfvt_qemu_3341582428070] 31588 os-posix:273 kvm: ctrl data in: 00 07 05 01 02 00 02 00 
2020-07-31 16:35:35.004396 debug [sfvt_qemu_3341582428070] 31588 monitor:650 qmp_human_monitor_command() cmd=[balloon_auto 2087],has_cpu_index=0,cpu_index=0
2020-07-31 16:35:35.004410 debug [sfvt_qemu_3341582428070] 31588 hmp:1178 ### qmp_balloon_auto, value:2188378112 ###
2020-07-31 16:35:35.004840 debug [sfvt_qemu_3341582428070] 31588 virtio-balloon:590 [balloon] virtio_balloon_to_target() guest_ram_pages=1572864 actual=0 num_pages=1038592 balloon_auto_restore=1 ram_mr_num=0
2020-07-31 16:35:35.012178 debug [sfvt_qemu_3341582428070] 31588 virtio-balloon:432 [balloon] Begin call mincore()
2020-07-31 16:35:35.019568 debug [sfvt_qemu_3341582428070] 31588 virtio-balloon:444 [balloon] End call mincore(), ret=0 errno=0 pfn=530051 offset_pfn=530051 offset_within_region=2171088896 vm_ram_size=6442450944 page_bytemap=0x55716afde000 mr_index=0 mr=0x55715ca63800 mr_size=6442450944 mr_addr=0x7fac27c00000 mr_name=[pc.ram]
2020-07-31 16:35:35.797834 debug [sfvt_qemu_3341582428070] 31588 virtio-balloon:528 [balloon] Begin balloon_reclaim, oldactual=1032192 actual=1038592 num_pages=1038592 ram_mr_num=1 balloon_err=0
2020-07-31 16:35:35.885152 debug [sfvt_qemu_3341582428070] 31588 virtio-balloon:528 [balloon] Begin balloon_reclaim, oldactual=1038592 actual=1038592 num_pages=1038592 ram_mr_num=1 balloon_err=0
2020-07-31 16:35:36.002706 debug [sfvt_qemu_3341582428070] 31588 virtio-balloon:528 [balloon] Begin balloon_reclaim, oldactual=1038592 actual=1038592 num_pages=1038592 ram_mr_num=1 balloon_err=0
2020-07-31 16:35:36.760873 debug [sfvt_qemu_3341582428070] 31588 virtio-balloon:139 [balloon] balloon_batch_reclaim_guest_memory(), guest_ram_mr[0] mr=0x55715ca63800 addr=0x7fac27c00000 size=6442450944 fd=-1 reclaim_page_num=592585
2020-07-31 16:35:36.760920 debug [sfvt_qemu_3341582428070] 31588 virtio-balloon:349 [balloon] End balloon_reclaim, actual=1038592 num_pages=1038592 ram_mr_num=0 balloon_err=0 reclaim_page_num=592585 reclaim_operation_num=167680
2020-07-31 16:35:37.262040 debug [sfvt_qemu_3341582428070] 31588 virtio-balloon:534 [balloon] virtio_balloon release, oldactual=16384 actual=0 num_pages=0 ram_mr_num=0






当前进展：





























