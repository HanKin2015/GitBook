# Visual Studio

## 1、轻松搞定VS生成sdf和ipch文件太大占用空间问题
https://blog.csdn.net/songyi160/article/details/51612716

目前的暴力行为删除大文件。

## 2、神奇的事情
```
string cmd1 = "rd /s /q " + TEMP_DIR;
const char* cmd2 = "cls";
string cmd3 = "cls";

system(cmd1.data());	// g++正常,vs不正常(错误	C2065	“cmd1”: 未声明的标识符)
system(cmd2.data());	// 正常
system(cmd3.data());	// 正常
```
很奇怪！！！
真相原来是这个：
warning C4819: 该文件包含不能在当前代码页(936)中表示的字符。请将该文件保存为 Unicode 格式以防止数据丢失
在属性-》C/C++-》命令行添加：
/std:c++latest -utf-8 

原来是文件格式文件，文件是UTF-8格式，需要增加编译选项来支持UTF-8格式。


## 3、vs安全编码检查
错误	C4996	'strcpy': This function or variable may be unsafe. Consider using strcpy_s instead. To disable deprecation, use _CRT_SECURE_NO_WARNINGS. See online help for details.

根据开源的cJSON.c的操作，它解决了这个问题，我却没有。
```
/* disable warnings about old C89 functions in MSVC */
#if !defined(_CRT_SECURE_NO_DEPRECATE) && defined(_MSC_VER)
#define _CRT_SECURE_NO_DEPRECATE
#endif
#if !defined(_CRT_SECURE_NO_WARNINGS) && defined(_MSC_VER)
#define _CRT_SECURE_NO_WARNINGS
#endif
#ifdef __GNUC__
#pragma GCC visibility push(default)
#endif
#if defined(_MSC_VER)
#pragma warning (push)
/* disable warning about single line comments in system headers */
#pragma warning (disable : 4001)
#endif
```
最终解决方法：_CRT_SECURE_NO_WARNINGS

## 4、error: template with C linkage
不要在extern "C"的中引用C++ STL库的头文件，如<map>, <vector>等具有template的头文件。
需要检查extern "C"后面为函数；extern "C" { }的定义是否完整。

## 5、错误	C7555 使用指定的初始值设定项至少需要“/std:c++latest”
属性-》C/C++-》命令行增加/std:c++latest即可。

编码问题增加：-utf-8。

## 6、warning C4828 文件包含在偏移 0x13 处开始的字符,该字符在当前源字符集中无效(代码页 65001)
https://blog.csdn.net/u014779536/article/details/107022492/

打开 工具->自定义->命令

文件类添加高级保存选项。

高级保存选项-》修改编码为UTF-8（带签名）即可。

## 7、clock函数报警告算术溢出
警告	C26451	算术溢出: 使用 4 字节值上的运算符 - ，然后将结果转换到 8 字节值。在调用运算符 - 之前将值强制转换为宽类型可避免溢出(io.2)。
```
clock_t start_time = clock();
clock_t spent_time = clock() - start_time;
printf("exec time is %lf s.\n", (double)spent_time / CLOCKS_PER_SEC);	
```
减法时先clock_t类型然后再转换。

## 8、关于sleep函数
标准库中无sleep函数，但在某些编译系统中是有的，在有些系统库中也有，要根据环境而定。
如:

linux中有，unsigned int sleep(unsigned intseconds)，传入挂起时间，成功返回0，不成功则返回余下的秒数（这里sleep（1），暂停1s）。
windows系统中有Sleep函数（注意大写），void Sleep(DWORD dwMilliseconds);提供挂起的毫秒数,并且需包含windows.h。

## 9、'itoa': The POSIX name for this item is deprecated. Instead, use the ISO C and C++ conformant name: _itoa.
https://blog.csdn.net/hou09tian/article/details/80616155

在VS2015中选择“项目->XXX属性”，打开属性页。之后在左侧的树中选择“配置属性->C/C++->预处理器”
最后，在弹出的预处理器定义的对话框中，输入“_CRT_NONSTDC_NO_DEPRECATE”和“_CRT_SECURE_NO_WARNINGS”，分别表示使用非标准函数和不弹出警告，最后点击“确定”按键

## 10、Visual Studio之RelWithDebInfo模式，“被忽视”的编译模式
https://blog.csdn.net/inter_peng/article/details/53933206

在Visual Studio的编译模式选项中，一般有四个模式：Debug, Release, RelWithDebInfo, MinSizeRel。

大家一般对前两个模式比较多。Debug版本是调试版本，对代码不做任何优化，可以debug项目中的任意文件；Release版本是发行版本，顾名思义就是当程序开发完成后，程序的一个发布版，它对代码做了优化，因此速度会非常快，但是遗憾的是，release版本无法跟踪代码。

根据以上描述，debug和release版本各有自己的优势和缺陷。
debug版本为了追求更全面的调试信息而放弃了速度；
release版本为了追求性能优化而抛弃了调试信息。

如果用户既需要调试代码，又无奈于debug版本的速度，那么你便可以开始考虑RelWithDebInfo这个版本了。

顾名思义，从这个模式的名称来看，它是一种含有调试信息的Release版本。那么它相当于是结合了Debug和Release版本的优点的一个版本。

以下是Stackoverflow上面的关于比较Debug和RelWithDebInfo版本区别的描述：
http://stackoverflow.com/questions/1239845/build-mode-relwithdebinfo

The main differences being that in Debug mode, the executable produced isn’t optimized (as this could make debugging harder) and the debug symbols are included.

The difference between Debug and RelWithDebInfo is mentioned here:

RelWithDebInfo is quite similar to Release mode. It produces fully optimized code, but also builds the program database, and inserts dubug line information to give a debugger a good chance at guessing where in the code you are at any time.
RelWithDebInfo模式是非常近似于Release模式的。它生成出几乎完全优化的代码，而且也创建程序的数据库，插入一些调试信息以使调试人员能够有机会去跟踪你任意时刻正处于哪段代码中。

关于Debug和RelWithRebInfo版本的区别如下：
https://cmake.org/pipermail/cmake/2001-October/002479.html

本文将讲解如何利用这种模式，在即保证速度快的情况下，同时还可以添加断点并进行代码调试。你一旦了解了这个模式，我想以后完全可以抛弃掉Debug模式了。至少对于我而言，自从我学会了如何正确地使用RelWithDebInfo模式后，我就再也不想启动Debug模式了。

## 11、无法解析的外部符号
引入头文件的时候会有编辑器编译前检查，但是如果在编译后报错“无法解析的外部符号”常常一脸懵逼。
后来经验告诉我，可能是只找到了头文件，没有找到头文件中函数的实现方法。
在头文件位置引入cpp后编译通过。
https://docs.huihoo.com/doxygen/linux/kernel/3.7/index.html

## 12、sln和vcxproj区别
sln是解决方案的配置，主要是管理这个方案里的多个vcxproj
vcxproj是工程的配置文件，管理工程中细节比如包含的文件，引用库等
一般没有sln，也可以直接打开vcxproj，也可以重新生成sln
sln里有多个工程，当你移除某个工程时sln会有变化，sln并不是太重要

推荐优先使用vcxproj。

我发现我的项目我修改过，但是通过git查看sln没有进行任何修改，但是vcxproj做了修改。

## 13、解决提示“一个或多个多重定义的符号“这种错误
发现重复定义的函数或者变量只在当前文件使用，为何不使用static修饰呢，增加static关键字后编译正常。

## 14、严重性	代码	说明	项目	文件	行	禁止显示状态
错误	LNK2038	检测到“RuntimeLibrary”的不匹配项: 值“MT_StaticRelease”不匹配值“MD_DynamicRelease”(StudySTL.obj 中)	StudySTL	D:\Github\Storage\windows\StudySTL\gtest.lib(gtest-all.obj)	

## 15、如何让__FILE__字符串不是一个绝对路径
属性->C/C++->高级->使用完全路径->否
但还是会有相对路径的烦恼，因此还是老老实实做字符串切割吧。

## 16、VS显示函数名窗口
水木连续剧，就是周三周四播出的电视连续剧，在韩国和日本一周分别用月 火 水 木 金 土 日表示。

似乎vs2010没有固定显示的窗口，只能在左上角的搜索框或者下拉框获取。

## 17、visual studio 设置显示空格及缩进空格数
Tools>Options>Text Editor>All Languages>Tabs>

似乎vs2010不支持智能选择空格和tab键，即无法根据上一行的情况选择。

## 18、visual studio中显示空格和tab
开启这个功能有两种方式:

使用菜单, 打开Edit–> Advanced–> View White Space
使用键盘的快捷键, 按下Ctrl+R, 然后按Ctrl+W.

## 19、切换字体
工具-》选项-》环境-》字体和颜色

推荐Consolas字体

