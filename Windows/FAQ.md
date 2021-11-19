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







