[TOC]

# 每天一点一滴进步
just do it
奥利给

## 20191128
- stringstream
- 字符串转整型
  - atoi
  - strtoul
  - strtoul(value, 0, 16);    颜色实际上就是十六进制
  
  
## 20200305
- sprintf格式化字符串
- switch中case如果不加break语句，则后面的case都一定会执行，不再依据case条件。case仅仅是提供起点，对switch关键字起作用。

# 1、sys/time.h 和 time.h
https://blog.csdn.net/kkknd007/article/details/80762666

time.h 是 ISO C99 标准日期时间头文件。
sys/time.h 是 Linux系统 的日期时间头文件。
sys/time.h 通常会包含 #include <time.h> 。
编写的代码如果与平台无关的，则需要在代码里 #include <time.h>，但这样使用 time_t 等数据结构的话需要手动
#define __need_time_t
#define __need_timespec
通常如果代码可以是平台相关的，则只需要 #include <sys/time.h> 。

CentOS 7中，time.h 主要包含了time_t、clock_t、struct tm等一些时间相关的类型定义。

sys/time.h 中虽然包含了 #include <time.h>，但是通过 #define __need_time_t 控制了只使用 time.h 中的 time_t 结构定义。

也就是说，如果单独包含了 sys/time.h，是可以使用 time_t 的，但是不能使用 struct tm 和将 tm 作为参数的时间操作函数，比如strftime()等。

到底是包含 time.h 还是 sys/time.h，还是应该依据代码中使用的数据结构和函数来决定。

# 4、error: unterminated #ifndef
检查发现是因为文件开头使用了#ifndef而后面缺少了#endif
注意：每个if语句都需要一个endif。

# 5、function declaration isn't a prototype解决办法
在网上查到解决办法是：即使函数括号内没有任何参数，也要加一个void类型，来避免这种warning。
如：int func(); ==> int func(void);

# 6、注意new int(100)和new int[100]
相当于int a=100或int *b=new int(100);
如int *arr=new int[100];

释放空间数组空间用delete[ ] arr;千万不能这样用delete arr,这样只释放第一个数组的空间而已。

# 7、C++查看数据类型
```
#include <iostream>
#include <string.h>

#include <typeinfo>
using namespace std;

int main()
{
    int *len = new int(100);
    int *arr = NULL;
    arr = new int[100];
    cout << "len type = " << typeid(len).name() << endl;
    cout << "arr type = " << typeid(arr).name() << endl;

    arr[55] = 100;
    arr[4] = 55;
    cout << arr[55] << endl;
    memset(arr, 0, *len);
    cout << arr[55] << endl;
    cout << arr[4] << endl;
    memset(arr, 0, sizeof(arr)*100);
    cout << arr[55] << endl;
    cout << len[0] << endl;
    cout << len[1] << endl;

    cout << sizeof(unsigned char) << endl;
    cout << sizeof(unsigned char *) << endl;
    return 0;
}
```

# 8、Rotate dual monitor screen 90 degrees on Ubuntu 15.10
```
xrandr --output VGA-1-0 --rotate right
xrandr: output VGA-1-0 cannot use rotation "right" reflection "none"
```
说好的升级xserver呢，升级了还是没有解决，至少20版本没有
https://askubuntu.com/questions/793572/rotate-dual-monitor-screen-90-degrees-on-ubuntu-15-10

apt install xorg-xserver

# 9、gcc: dereferencing pointer to incomplete type错误
你的指针，有一个类型，这个类型是不完全的。也就是说，你只给出了这个类型的声明，没有给出其定义。你这里的类型多半是结构，联合之类的东西。

这个错误其实是因为某结构体或联合的字段名所指的变量定义的头文件没有引入到当前Ｃ代码中而造成的错误，只要找到出错对应的变量的结构体或联合的定义的头文件，并把这些头文件包含进来即可解决此问题；

# 10、无法启动此程序，因为计算机中丢失 api-ms-win-crt-runtime-l1-1-0.dll 的解决办法

安装Visual C++ Redistributable for Visual Studio 2015 组件

Redistributable：可再发行

# 11、关于Linux下C编译错误（警告）cast from 'void*' to 'int' loses precision
char *ptr;  //此后省略部分代码    
if( (int)ptr==-1 )  //出错地方  
那句话的意思是从 void* 到 int 的转换丢失精度，相信看到解释有些人就明白了，
此问题只会出现在X64位的Linux上，因为在64位的机器上指针占用8个字节，int 占用四个字节，所以才会出现这样的问题，

解决方法：

（long）ptr == -1 就好了

## 12、c++用cin输入16进制数
```
int a; 
cin.unsetf(ios::dec);
cin.setf(ios::hex);
cin >> a ;
cout << a << endl ;

or

int a;
cin.setf(ios_base::hex,ios_base::basefield);
cin >> a ;
cout << a << endl ;
```
实战见：D:\Github\Storage\c++\standard_library\file\文件操作\读写文件\research_read_write_speed.cpp

## 13、C++布尔类型（bool）
```
std::cout << std::boolalpha << file_or_dir_is_exists_by_ifstream(path) << std::endl;
```
实战见：D:\Github\Storage\c++\standard_library\file\文件操作\判断文件是否存在\judge_file_or_dir_isexists.cpp

## 14、静态变量
静态变量是在堆分配的，而普通变量是在栈上分配的，栈上分配的变量是动态的，可以实现重用，而堆上分配的变量是不能实现重用。还有普通变量可以实现多次初始化，而静态变量只能初始化一次。

[什么是C语言中的静态变量？](https://baijiahao.baidu.com/s?id=1652340168215119087&wfr=spider&for=pc)
静态的意思就是在程序运行的过程中，其内存地址始终不变，可以对其进行连续操作，而动态变量每次使用都会重新进行初始化，无法进行连续操作。
```
void AutoAdd1()
{
	auto int i = 1;
	i++;
	printf("%d\n", i);
}

void AutoAdd2()
{
	static int i = 1;
	i++;
	printf("%d\n", i);
}

int main()
{
	AutoAdd1();	//2
	AutoAdd1();	//2
	
	printf("\n");
	
	AutoAdd2();	//2
	AutoAdd2();	//3
	return 0;
}
```

## 15、auto关键字
### 15-1、C++98 auto
早在C++98标准中就存在了auto关键字，那时的auto用于声明变量为自动变量，自动变量意为拥有自动的生命期，这是多余的，因为就算不使用auto声明，变量依旧拥有自动的生命期：
```
int a =10 ;  //拥有自动生命期
auto int b = 20 ;//拥有自动生命期
static int c = 30 ;//延长了生命期
```

C++98中的auto多余且极少使用，C++11已经删除了这一用法，取而代之的是全新的auto：变量的自动类型推断。

### 15-2、C++11 auto
auto可以在声明变量的时候根据变量初始值的类型自动为此变量选择匹配的类型，类似的关键字还有decltype。举个例子：
```
    int a = 10;
    auto au_a = a;//自动类型推断，au_a为int类型
    cout << typeid(au_a).name() << endl;
```













  