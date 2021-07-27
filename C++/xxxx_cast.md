# 学习xxxx_cast
http://c.biancheng.net/view/2343.html

## 1、引入原因
隐式类型转换是安全的，显式类型转换是有风险的，C语言之所以增加强制类型转换的语法，就是为了强调风险，让程序员意识到自己在做什么。

但是，这种强调风险的方式还是比较粗放，粒度比较大，它并没有表明存在什么风险，风险程度如何。再者，C风格的强制类型转换统一使用( )，而( )在代码中随处可见，所以也不利于使用文本检索工具（例如 Windows 下的 Ctrl+F、Linux 下的 grep 命令、Mac 下的 Command+F）定位关键代码。

为了使潜在风险更加细化，使问题追溯更加方便，使书写格式更加规范，C++ 对类型转换进行了分类，并新增了四个关键字来予以支持，它们分别是：

关键字|说明
:-----|:----
static_cast	|用于良性转换，一般不会导致意外发生，风险很低。
const_cast	|用于 const 与非 const、volatile 与非 volatile 之间的转换。
reinterpret_cast	|高度危险的转换，这种转换仅仅是对二进制位的重新解释，不会借助已有的转换规则对数据进行调整，但是可以实现最灵活的 C++ 类型转换。
dynamic_cast	|借助 RTTI，用于类型安全的向下转型（Downcasting）。

## 2、用法格式
```
xxx_cast<newType>(data)
```

## 3、简单实用对比
newType 是要转换成的新类型，data 是被转换的数据。例如，老式的C风格的 double 转 int 的写法为：
```
double scores = 95.5;
int n = (int)scores;
```

C++ 新风格的写法为：
```
double scores = 95.5;
int n = static_cast<int>(scores);
```

## 4、static_cast 关键字
[编译器](https://baike.baidu.com/item/编译器)隐式执行任何[类型转换](https://baike.baidu.com/item/类型转换)都可由static_cast显示完成;reinterpret_cast通常为操作数的位模式提供较低层的重新解释。

### 划重点
- 支持隐式转换的表达式，如void 指针和具体类型指针之间的转换、int 转 double、有转换构造函数或者类型转换函数的类与其它类型之间的转换
- static_cast 不能用于无关类型之间的转换，因为这些转换都是有风险的

static_cast 也不能用来去掉表达式的 const 修饰和 volatile 修饰。换句话说，不能将 const/volatile 类型转换为非 const/volatile 类型。
static_cast 是“静态转换”的意思，也就是在编译期间转换，转换失败的话会抛出一个编译错误。
原有的自动类型转换，例如 short 转 int、int 转 double、const 转非 const、向上转型等；
void 指针和具体类型指针之间的转换，例如void *转int *、char *转void *等；
有转换构造函数或者类型转换函数的类与其它类型之间的转换，例如 double 转 Complex（调用转换构造函数）、Complex 转 double（调用类型转换函数）。

1、C++中的static_cast执行非[多态](https://baike.baidu.com/item/多态)的转换，用于代替C中通常的转换操作。因此，被做为显式类型转换使用。比如：

```
int i;
float f = 166.71;
i = static_cast<int>(f);
```
此时结果，i的值为166。

2、C++中的reinterpret_cast主要是将数据从一种类型的转换为另一种类型。所谓“通常为操作数的位模式提供较低层的重新解释”也就是说将数据以[二进制](https://baike.baidu.com/item/二进制)存在形式的重新解释。比如：

```
`int i;
char *p = "This is an example.";
i = reinterpret_cast<int>(p);
```
此时结果，i与p的值是完全相同的。[reinterpret_cast](https://baike.baidu.com/item/reinterpret_cast)的作用是说将指针p的值以[二进制](https://baike.baidu.com/item/二进制)（位模式）的方式被解释为整型，并赋给i，//i 为整型；一个明显的现象是在转换前后没有数位损失。

## 5、const_cast 关键字
const_cast 比较好理解，它用来去掉表达式的 const 修饰或 volatile 修饰。换句话说，const_cast 就是用来将 const/volatile 类型转换为非 const/volatile 类型。

## 6、reinterpret_cast 关键字
reinterpret 是“重新解释”的意思，顾名思义，reinterpret_cast 这种转换仅仅是对二进制位的重新解释，不会借助已有的转换规则对数据进行调整，非常简单粗暴，所以风险很高。

reinterpret_cast 可以认为是 static_cast 的一种补充，一些 static_cast 不能完成的转换，就可以用 reinterpret_cast 来完成，例如两个具体类型指针之间的转换、int 和指针之间的转换（有些编译器只允许 int 转指针，不允许反过来）。














