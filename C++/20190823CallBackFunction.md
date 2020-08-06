# 回调函数

回调函数就是一个通过函数指针调用的函数。如果你把函数的指针（地址）作为参数传递给另一个函数，当这个指针被用来调用其所指向的函数时，我们就说这是回调函数。回调函数不是由该函数的实现方直接调用，而是在特定的事件或条件发生时由另外的一方调用的，用于对该事件或条件进行响应。
回调是任何一个被以方法为其第一个参数的其它方法的调用的方法。很多时候，回调是一个当某些事件发生时被调用的方法。



[C语言回调函数详解](https://www.cnblogs.com/jiangzhaowei/p/9129105.html)

有很大一部分都是使用类似这么一个场景来说明：A君去B君店里买东西，恰好缺货，A君留下号码给B君，有货时通知A君。感觉这个让人更容易想到的是异步操作，而不是回调。另外还有两句英文让我印象深刻：1) If you call me, I will call you back; 2) Don't call me, I will call you. 看起来好像很有道理，但是仔细一想，普通函数不也可以做到这两点吗？所以，我觉得这样的说法都不是很妥当，因为我觉得这些说法都没有把回调函数的特点表达出来，也就是都看不到和普通函数到底有什么差别。不过，百度百科的解析我觉得还算不错（虽然经常吐槽百度搜索...）：回调函数就是一个通过函数指针调用的函数。如果你把函数的指针（地址）作为参数传递给另一个函数，当这个指针被用来调用其所指向的函数时，我们就说这是回调函数。

下面先说说我的看法。我们可以先在字面上先做个分解，对于“回调函数”，中文其实可以理解为这么两种意思：1) 被回调的函数；2) 回头执行调用动作的函数。那这个回头调用又是什么鬼？

先来看看来自维基百科的对回调（Callback）的解析：In computer programming, a callback is any executable code that is passed as an argument to other code, which is expected to call back (execute) the argument at a given time. This execution may be immediate as in a synchronous callback, or it might happen at a later time as in an asynchronous callback. 也就是说，把一段可执行的代码像参数传递那样传给其他代码，而这段代码会在某个时刻被调用执行，这就叫做回调。如果代码立即被执行就称为同步回调，如果在之后晚点的某个时间再执行，则称之为异步回调。关于同步和异步，这里不作讨论，请查阅相关资料。

再来看看来自Stack Overflow某位大神简洁明了的表述：A "callback" is any function that is called by another function which takes the first function as a parameter。 也就是说，函数 F1 调用函数 F2 的时候，函数 F1 通过参数给 函数 F2 传递了另外一个函数 F3 的指针，在函数 F2 执行的过程中，函数F2 调用了函数 F3，这个动作就叫做回调（Callback），而先被当做指针传入、后面又被回调的函数 F3 就是回调函数。到此应该明白回调函数的定义了吧？

## 回到函数的好处和作用
解耦

```
#include<stdio.h>

int Callback_1() // Callback Function 1

{

printf("Hello, this is Callback_1 ");

return 0;

}

int Callback_2() // Callback Function 2

{

printf("Hello, this is Callback_2 ");

return 0;

}

int Callback_3() // Callback Function 3

{

printf("Hello, this is Callback_3 ");

return 0;

}

int Handle(int (*Callback)())

{

printf("Entering Handle Function. ");

Callback();

printf("Leaving Handle Function. ");

}

int main()

{

printf("Entering Main Function. ");

Handle(Callback_1);

Handle(Callback_2);

Handle(Callback_3);

printf("Leaving Main Function. ");

return 0;

}

运行结果：

Entering Main Function.

Entering Handle Function.

Hello, this is Callback_1

Leaving Handle Function.

Entering Handle Function.

Hello, this is Callback_2

Leaving Handle Function.

Entering Handle Function.

Hello, this is Callback_3

Leaving Handle Function.

Leaving Main Function.
```


```
#include<stdio.h>

int Callback_1(int x) // Callback Function 1

{

printf("Hello, this is Callback_1: x = %d ", x);

return 0;

}

int Callback_2(int x) // Callback Function 2

{

printf("Hello, this is Callback_2: x = %d ", x);

return 0;

}

int Callback_3(int x) // Callback Function 3

{

printf("Hello, this is Callback_3: x = %d ", x);

return 0;

}

int Handle(int y, int (*Callback)(int))

{

printf("Entering Handle Function. ");

Callback(y);

printf("Leaving Handle Function. ");

}

int main()

{

int a = 2;

int b = 4;

int c = 6;

printf("Entering Main Function. ");

Handle(a, Callback_1);

Handle(b, Callback_2);

Handle(c, Callback_3);

printf("Leaving Main Function. ");

return 0;

}

运行结果：

Entering Main Function.

Entering Handle Function.

Hello, this is Callback_1: x = 2

Leaving Handle Function.

Entering Handle Function.

Hello, this is Callback_2: x = 4

Leaving Handle Function.

Entering Handle Function.

Hello, this is Callback_3: x = 6

Leaving Handle Function.

Leaving Main Function.
````

# 带两个参数（猜测）
int Handle(int x, int y, int (*Callback)(int, int))




