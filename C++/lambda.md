# C++之Lambda表达式
https://www.cnblogs.com/jimodetiantang/p/9016826.html

C++ 11 中的 Lambda 表达式用于定义并创建匿名的函数对象，以简化编程工作。
Lambda 的语法形式如下：

```
[函数对象参数] (操作符重载函数参数) mutable 或 exception 声明 -> 返回值类型 {函数体}
```

```
[] (int x, int y) { return x + y; } // 隐式返回类型
[] (int& x) { ++x;  } // 没有 return 语句 -> Lambda 函数的返回类型是 'void'
[] () { ++global_x;  } // 没有参数，仅访问某个全局变量
[] { ++global_x; } // 与上一个相同，省略了 (操作符重载函数参数)
```

可以像下面这样显示指定返回类型：

```
[] (int x, int y) -> int { int z = x + y; return z; }
```

在这个例子中创建了一个临时变量 z 来存储中间值。和普通函数一样，这个中间值不会保存到下次调用。什么也不返回的
Lambda 函数可以省略返回类型，而不需要使用 -> void 形式。

```
#include <algorithm>
#include <cmath>

void abssort (float *x, unsigned n) {
    std::sort (x, x + n,
        //Lambda 表达式
        [](float a, float b) {
            return (std::abs(a) <std::abs(b));
        }
    );
}
```

