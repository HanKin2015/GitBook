# c语言编译器

建议使用codeblocks。

# 1、c-free5
## 1-1、安装
官网：http://www.programarts.com/cfree_ch/
下载有点慢，但是不大还好。
需要配合mingw使用编译。
安装教程（含注册码）：https://blog.csdn.net/a1585570507/article/details/79477732
```
用户名：tianfang
电子邮件：quart@163.com
注册码：2NnUqd3shO2agta0xNjcusfK1LXO
```
缺点：差编译器、支持的编译标准少


## 1-2、配置
字体大小：工具-》编辑器选项


## 1-3、argc argv
ARGc和ARGv中的ARG指的是"参数"（外语：ARGuments, argument counter 和 argument vector ）

```
#include <stdio.h>//#包含<stdio.h>
 
int main(int argc,char* argv[])    //整数类型主函数(整数类型统计参数个数,字符类型指针数组指向字符串参数)
{
    printf("%d\n",argc);           //格式化输出
    while(argc)                    //当(统计参数个数)
        printf("%s\n",argv[--argc]);   //格式化输出
    return 0;                      //返回0;正常退出
}
```

## 1-4、字体选择
个人比较喜欢Consolas字体

c-free配置c++11，呵呵，配置了半天没有配置成功。提示语法错误，-std=c++11。

# 2、dev-cpp
让Dev C++支持C++11](https://blog.csdn.net/u011500062/article/details/44628441)

缺点：支持的编译标准少

# 3、codeblocks
https://www.fosshub.com/Code-Blocks.html?dwl=codeblocks-20.03-setup.exe

C语言初学者，在电脑性能足够的情况下，VS2017，codeblocks，devcpp如何选择？
这三个都不是编译器。所以没法在这三个之内选择出编译器。
性能如果不是问题，那首选VS2017。codeblocks的debug能力有所不足。devcpp早已停止正式维护。


安装codeblocks时建议安装带有编译环境的版本。

## 3-1、使用新出的JetBrains Mono字体时不时出现报错弹框
参考：https://my.oschina.net/wwfifi/blog/4282989
修改：%USERPROFILE%\AppData\Roaming\CodeBlocks\default.conf

搜索FONT
修改其中第二项数字为整数，如原先的13.8被我修改为13.

```
	<FIND_LATIN2 bool="0" />
	<USE_SYSTEM bool="1" />
</default_encoding>
<ZOOM int="7" />
<FONT>
	<str>
		<![CDATA[1;13;-23;0;0;0;400;0;0;0;0;3;2;1;49;JetBrains Mono]]>
	</str>
</FONT>
<AUTO_INDENT bool="1" />
<SMART_INDENT bool="1" />
<BRACE_COMPLETION bool="1" />
```

## 3-2、引入自定义封装的头文件
结果报错：

正确方式：建立项目，在项目中使用，可以明显看到编译过程，会先编译头文件为链接文件xxx.o。
https://blog.csdn.net/nzjdsds/article/details/85617006


## 3-3、error: stray '\343' in program
这个常见，一般从网上直接拷贝代码来运行，会有一些编码错误，对出现错误的行重新编写即可。

## 3-4、error: invalid conversion from 'const char*' to 'char*' [-fpermissive]|
如：string s = "abc";
    char* c = s.c_str();

这时会报错：invalid conversion from `const char*' to `char*'
解决方法： char* c = const_cast<char *>(s.c_str());

# 4、gcc编译器
c++支持foreach语句在c++11，所以必须要有高版本的编译器。

官方地址（太卡）：https://jmeubank.github.io/tdm-gcc/

两大坑点：
安装TDM-GCC，下载了exe安装包后一开始老是在下载，并且网络超级差。然后找了半天安装包都是同一款。
再然后发现在下载的时候取消后，会有下一步，并且建议把勾选的去掉，可以直接安装的。

另外一个当属：

第三个坑点：当你安装好后软件，发现编译运行不弹出运行窗口或者编译按钮是灰色的。这时候你就要想到是不是换了编译器或编辑器引起的。删除编译的结果.exe和.a和.o文件即可。

# 5、编译运行c或c++
自己需要搭建环境，比较麻烦，并且不支持程序输入，中文乱码，代码追踪不完善等问题。
结论：不建议使用sublime或者notepad++等工具编写工程项目。
单个文件查看和修改可以推荐。




