# 成长==再出发

## 常识
公积金一年调整一次：7月1日至当年的6月30日。
养老院通常由地方政府或慈善机构主办,；而敬老院是在农村实行“五保”的基础上发展起来的。

## C/C++


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

## C++98 auto
早在C++98标准中就存在了auto关键字，那时的auto用于声明变量为自动变量，自动变量意为拥有自动的生命期，这是多余的，因为就算不使用auto声明，变量依旧拥有自动的生命期：
```
int a =10 ;  //拥有自动生命期
auto int b = 20 ;//拥有自动生命期
static int c = 30 ;//延长了生命期
```

C++98中的auto多余且极少使用，C++11已经删除了这一用法，取而代之的是全新的auto：变量的自动类型推断。

## C++11 auto
auto可以在声明变量的时候根据变量初始值的类型自动为此变量选择匹配的类型，类似的关键字还有decltype。举个例子：
```
    int a = 10;
    auto au_a = a;//自动类型推断，au_a为int类型
    cout << typeid(au_a).name() << endl;
```


typeid操作符
在c++中，typeid用于返回指针或引用所指对象的实际类型。

注意：typeid是操作符，不是函数！
操作符好像可以理解为运算符

运行时获知变量类型名称，可以使用 typeid(变量).name()，需要注意不是所有编译器都输出"int"、"float"等之类的名称，对于这类的编译器可以这样使用：float f = 1.1f; if( typeid(f) == typeid(0.0f) ) ……
补充：对非引用类型，typeid是在编译时期识别的，只有引用类型才会在运行时识别。



反编译
注册表：配置文件
注册表好比是我们用的户口簿，我们安装的程序都要在注册表中进行注册登记。注册表中可以记录程序或文件存放的位置、授权信息、外观设置……
人们通过修改注册表相应的键值，可以获得他们想要的效果而省去了复杂的操作。
https://blog.csdn.net/chenjian60665/article/details/94440814
https://www.cnblogs.com/alantu2018/p/8503883.html


---

[__attribute__ ((format (printf, 2, 3))); 介绍](https://blog.csdn.net/zzhongcy/article/details/90057284)
https://blog.csdn.net/tongdh/article/details/20530415

```
#ifdef __GNUC__
__attribute__((unused))
#endif

#if (defined(__GNU__) && defined(_MSC_VER))
   // ...
#endif

#if defined __GNUC__
__attribute__((format(printf, 3, 4)))
#endif
```



```
static void
#if defined __GNUC__
__attribute__((format(printf, 2, 3)))
#endif
va_log(struct MyStruct *node, const char *fmt, ...)
{
    char buf[BUFSIZ];
    va_list ap;
    int n;

    n = sprintf(buf, "hello:");
    va_start(ap, fmt);
    vsnprintf(buf + n, sizeof(buf) - n, fmt, ap);
    va_end(ap);
}
```
va_开头可能是varargs缩写
变量ap就不知所措了？？？
自定义日志，静态无返回值函数
__attribute__告诉要像printf那样检查入参，第2个参数是格式化参数，从第3个参数开始应用这个规则检测。
vsnprintf函数:int vsnprintf (char * s, size_t n, const char * format, va_list arg );



version “版本”。指文件或软件的公开发行版本，强调功能性。通常在功能方面有重大改变、改进或增加，包括对一些重大bug的修复。
revision “修订版”。指在文件或软件的公开发行版本的基础上，在功能方面有细微改变、改进或增加，包括对一些小bug的修复，这是在某个version版本的基础上在不同设计阶段的标志。
所以，在每次修改时，revision都会变化，但是version 却不一定会有变化。


overhand：举手过肩、上手的







微信电脑端登录后新消息的时候手机也常有提示音：手机在Windows已登录设置。
[C++中前自增和后自增的区别（转载\整理）](https://www.cnblogs.com/xhj-records/archive/2013/05/28/3103391.html)
总结：在对内建类型的操作时前自增和后自增效率没太大区别；在对自定义类型操作时前自增效率高于后自增。



# WINAPI宏
https://blog.csdn.net/qq_32320399/article/details/53735635
https://blog.csdn.net/slj_win/article/details/33732087

```
#define WINAPI _stdcall;
#define CALLBACK _stdcall;
```
https://blog.csdn.net/lisfaf/article/details/98990043

而_stdcall是新标准c/c++函数的调用方法，它是采用自动清栈的方式，而标准c调用（_cdecl方法，cdecl是C declare的缩写）采用的是手工清栈的方式。

那么就引出了一个新的问题，什么是自动清栈？什么是手动清栈？查阅baidu.com，整理如下：

自动清栈，就是指，由调用者来处理，被调用者不需要处理。
手工清栈，就是指，调用者不会管被调用的函数使用的栈，需要由被调用者自己处理。就是我原来说的__cdecl要手工清栈，所以不用担心压进去几个参数无所谓。所以像printf这种就是参数不限的调用，都是用__cdecl的，如果是自动清栈的话，他必定有长度要求，清理几个字节的堆栈，所以其他调用方式是不能实现参数个数不限的要求的。
调用约定种类：一共有5种函数调用约定(calling convention)，它决定一下内容：
- 函数参数的压栈顺序
- 由调用者还是被调用者把参数弹出栈
- 产生函数修饰名的方法(C者C++在编译和链接的时候会重新给函数起一个名字，而这个名字的起法是根据std_call,cdecl这些来指定的)。








[开发者知识库](https://www.itdaan.com/index.html)












