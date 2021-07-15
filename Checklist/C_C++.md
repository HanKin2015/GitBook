# C语言和C++工程中checklist规范

模块完成后必看，

那些年踩过的坑儿，无缝可钻。

1. 不建议使用动态分配内存，使用静态就很好，容易菜内存
2. 使用库函数的时候要了解每个参数和返回值，强烈推荐使用man函数查询
3. 有些变量如果系统或者相关头文件有定义就不要重复定义，建议引入头文件使用
4. 拷贝之类函数使用更安全的函数，如sprintf修改为snprintf
5. 函数只在当前文件使用需要static修饰
6. 静态函数使用assert判断入参
7. 比如C语言没有mkdirs这种函数时，建议使用system函数
8. 指针参数一定要写上数组的长度
9. 错误需要打印具体的错误码strerror(errno)




嵌套释放，要注意先分配后释放的原则
嵌套释放，要注意防止多次释放问题






## 1、代码走读实例
```
/*
 * 创建多级目录
 * @param [in]path  路径
 * @return true创建成功, false创建失败
 */
static bool mkdirs(char *path)
{
    char str[256];
    strncpy(str, path, 256);

    printf("path: %s\n", path);

    int length = strlen(str);
    printf("length = %d\n", length);
    int i;
    for (i = 0; i < length; i++) {
        if (str[i] == '/') {
            str[i] = '\0';
            printf("str: %s, len: %d i: %d\n", str, strlen(str), i);
            if (strlen(str) && access(str, F_OK)) {
                if (mkdir(str, S_IRWXU)) {
                    printf("mkdir folder failed");
                    return false;
                }
            }
            str[i] = '/';
        }
    }
    //可能末尾未加斜线/
    if (length > 0 && access(str, F_OK)) {
        if (mkdir(str, S_IRWXU)) {
            printf("mkdir folder failed");
            return false;
        }
    }
    return true;
}
```
问题1：函数参数是指针，没有长度参数
问题2：入参指针未判空，注意需要assert
问题3：魔数256，char数组初始化不应该常用memset吗
问题4：i初始化最好在for外面
问题5：可以通过!=后continue减少一层嵌套，虽然效率上面没有任何变化
问题6：if语句中每次调用strlen降低效率，有时候还是需要考虑到效率
问题7：access函数返回值是什么？0或者-1，这里为真让人误解是大于0
问题8：mkdir函数返回值同理
问题9：后面一段代码编写重复，为啥不在最开始就判断自动添加斜杠

结论：一个小小的函数抒写就出现了9个问题，这是个什么概念？？？

```

```




## 2、C语言 数组初始化的三种常用方法（{0}, memset, for循环赋值）
https://www.cnblogs.com/fnlingnzb-learner/p/8057257.html
对三种方法的选取：
1、for 最浪费时间，不建议（其实memset内部也是用循环实现的，只不过memset经过了严格优化，所以性能更高）；
2、{0} 可能有移植性问题，虽然绝大多数编译器看到{0} 都是将数组全部初始化为0， 但是不保证所有编译器都是这样实现的；
3、综合1、2， 推荐使用memset方法。

## 3、数字转字符串
itoa并不是一个标准的C函数，它是Windows特有的，如果要写跨平台的程序，请用sprintf。
是Windows平台下扩展的，标准库中有sprintf，功能比这个更强，用法跟printf类似。

src指源文件，是source的缩写
dest指目标，是destination的缩写
一般用于计算机

## 4、内存问题排查工具- sanitizer

## 5、不能在函数中返回一个局部变量的地址：warning :address of local variable returned
```
#include<stdio.h>
#include<string.h>
char *intToString(void){
	char string[] = "hello world!";
	return string;
}
int main(void){
	puts(intToString());
	return 0;
}
```

"hello world!"字符串字面量是存储在静态存储区的，函数结束也不会被释放，但是，使用字符数组的时候，会在栈区新建一个备份，所以在函数结束时就被自动被销毁了（返回的是一个地址，但是在这个函数结束的时候，这个地址指向的那块内存空间放置的内容被释放了，所以通过那个返回的地址已经找不到那块地址对应的内容了），所以肯定是不对的（静态申请内存的变量不能跨函数使用）。

推荐使用static设置为静态变量，最好是作为参数返回。


# cpp 宏函数不用加分号
肯定啊，看如下：
```
#define type_init(x, y) \
static int sum(int a, int b) \
{	\
	return a + b;	\
}	\

type_init(int x, int y) 实际上这个还是一个函数定义
```

Sonar（SonarQube）是一个开源平台，用于管理源代码的质量。Sonar 不只是一个质量数据报告工具，更是代码质量管理平台。支持的语言包括：Java、PHP、C#、C、Cobol、PL/SQL、Flex 等。















