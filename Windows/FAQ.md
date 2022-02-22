# Windows编程那些事儿

## 1、CHAR转WCHAR
强转不报错，但是有问题，需要专门的函数：
```
// 计算数组元素个数
#define _logcountof(array)			(sizeof(array)/sizeof(array[0])) 
// 安全的以字符为单位的缓冲区大小
#define _logsafecchof(array)		(_logcountof(array) - 1)

CHAR Str[] = "abcdeg";
WCHAR Path[1024] = { 0 };
(void)MultiByteToWideChar(CP_ACP, NULL, (LPCSTR)(str),	(int)strlen(str), Path, _logsafecchof(Path));
OutputDebugStringW(Path);
printf("%S\n", Path);

注意宽字节需要使用大写S输出，使用小写s输出不全。
```

## 2、Windows错误码大全
https://www.cnblogs.com/icebutterfly/p/7834453.html
```
0000 操作已成功完成。
0001 错误的函数。
0002 系统找不到指定的文件。
0003 系统找不到指定的路径。
0004 系统无法打开文件。
0005 拒绝访问。
0006 句柄无效。
0007 存储区控制块已损坏。
0008 可用的存储区不足，无法执行该命令。
0009 存储区控制块地址无效。
0010 环境错误。
....
```

## 3、error: LNK2019: 无法解析的外部符号 __imp_PostMessageW，函数 “private: void __cdecl Widget
对于此类问题，一般来说是找不到具体报错的地方，原因是缺少库。

在对应的.cpp中添加这个文件：
```
#pragma comment  (lib, "User32.lib")
#include <SetupAPI.h>
#pragma comment  (lib, "setupapi")
```

## 4、解决vs运行程序一闪而过
方法一：程序末尾增加输入语句，这样程序运行结束前会要求用户输入，控制台就会保持存在
方法二：在程序末尾添加语句：system("pause");  加上这句后，控制台显示运行结果后会显示“请按任意键继续”
方法三：修改项目配置，右键点击项目，在右键菜单中选择属性，然后在弹出的对话框左侧列表中中选择“配置属性”-->“链接器”-->“系统”，然后在右侧的列表中，在第一项”子系统“的值中选择”控制台（/SUBSUSTEM:CONSOLE）“

## 5、缺少vcruntime140d.dll的解决办法
安装Visual C++ Redistributable for Visual Studio 2015(需要Windows7withSP1)。

发现安装之后也无法解决。

发现缺少的dll文件分布在不同的版本之中，可以通过查看属性-》详细信息。

## 6、文件夹删除不了
被程序占用

在性能管理器中，CPU栏，句柄中搜索文件夹名未搜索到

然后重命名文件夹成功

说明占用的不是文件夹，而是文件夹中的文件，然而我已经重启电脑。

故事起因是我重新安装beyond compare4，原先是3，鼠标右键点击比较报错。

参考这个方法未解决：https://blog.csdn.net/sanqima/article/details/100625578

各种卸载重装都不行，现在想想还是跟无法删除3的文件夹有关，重启电脑后解决。

## 7、win10拍照快捷键
shift+win+s

## 8、cd命令
```
C:\迅雷下载\tcpdump_windows>help cd
显示当前目录名或改变当前目录。

CHDIR [/D] [drive:][path]
CHDIR [..]
CD [/D] [drive:][path]
CD [..]
```

## 9、DOS窗口中文显示乱码
起因是wireshark中的dumpcap.exe -D命令执行显示中文乱码

通过修改注册表·计算机\HKEY_CURRENT_USER\Console\%SystemRoot%_system32_cmd.exe\CodePage·值为936（十进制）

## 10、为什么win10 cmd.exe 打开界面一片黑？
https://www.zhihu.com/question/371904392

原来是背景图颜色和文字颜色重叠了。。。。。

解决办法：1、打开问题cmd窗口；2、按Alt+X；3、选“属性”；4、切换到“终端”选项卡；5、取消选择“使用单独的前景”和“使用单独的背景”；6、点击“确定”。现在已经可以正常显示了，然后在“颜色”选项卡里设置好颜色，最后在“终端”选项卡里重新选择“使用单独的前景”和“使用单独的背景”，点击“确定”也不再黑屏了。

## 11、windows的更改屏幕保护程序里面的设置
计算机\HKEY_CURRENT_USER\Control Panel\Desktop

ScreenSaveTimeOut、ScreenSaverIsSecure、ScreenSaveActive

## 12、虚拟内存
计算机-》右键属性-》高级系统设置-》高级-》性能设置-》高级-》虚拟内存

## 13、#pragma alloc_text 与 ALLOC_PRAGMA
https://blog.csdn.net/youyou519/article/details/90904498

## 14、Dell电脑开机显示Alert!The AC power adapter wattage and type cannot be determined.
The AC power adapter wattage以及下面的英文意思是
电源适配器不能被正确识别，电池可能无法充电，电池电量低。系统无法启动。是电源适配器问题导致的。
解决方法：
一，检查电源适配置器有没插好，重新拔插一下。更换电源插座
二、问题依旧，更换电池适配器

## 15、如何在Windows10任务管理器中显示命令行
win10：任务管理器-》进程选项卡-》名称标题栏-》右键鼠标-》命令行
win7 ：任务管理器-》进程选项卡-》查看-》选择列-》命令行








