# USB设备插入被自动禁用



在“开始”/“运行”中输入“Regedit”，按回车即可打开注册表编辑器，找到“HKEY_LOCAL_MACHINE\SYSTEM\ CurrentControlSet\Services\UsbStor”主键，双击名为“Start”的DWORD值，将“数值数据”改为4，注意右边的“基数”默认为“十六进制”，该设置切勿更改，单击“确定”即可修改完成。
现在试试看，插上闪盘，闪盘的工作指示灯不亮，而系统也没有任何反应，这证明我们的修改成功了。为了防止非法用户用同样的方法解锁，最好把Regedit.exe程序改名或者直接删除。
小提示：“Start”值是一个控制USB存储设备驱动程序工作状态的开关，可设为以下三种值，设为2时表示自动，设为3时表示手动(这是默认设置)，设为4则为停用




安全软件影响


电源管理自动节省电源


