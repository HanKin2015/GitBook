# 单元测试
## 驱动代码、桩代码、Mock代码
驱动代码（Driver）指调用被测函数的代码，在单元测试过程中，驱动模块通常包括调用被测函数前的数据准备、调用被测函数以及验证相关结果三个步骤。驱动代码的结构，通常由单元测试的框架决定。

桩代码（Stub）是用来代替真实代码的临时代码。 比如，某个函数A的内部实现中调用了一个尚未实现的函数B，为了对函数A的逻辑进行测试，那么就需要模拟一个函数B，这个模拟的函数B的实现就是所谓的桩代码。桩代码的应用首先起到了隔离和补齐的作用，使被测代码能够独立编译、链接，并独立运行。同时，桩代码还具有控制被测函数执行路径的作用。

Mock代码和桩代码非常类似，都是用来代替真实代码的临时代码，起到隔离和补齐的作用。但是很多人，甚至是具有多年单元测试经验的开发工程师，也很难说清这二者的区别。

在作者看来，Mock代码和桩代码的本质区别是：测试期待结果的验证（Assert and Expectiation）。

对于Mock代码来说，我们的关注点是Mock方法有没有被调用，以什么样的参数被调用，被调用的次数，以及多个Mock函数的先后调用顺序。所以，在使用Mock代码的测试中，对于结果的验证（也就是assert），通常出现在Mock函数中。

对于桩代码来说，我们的关注点是利用Stub来控制被测函数的执行路径，不会去关注Stub是否被调用以及怎么样被调用。所以，你在使用Stub的测试中，对于结果的验证（也就是assert），通常出现在驱动代码中。

在Python中，我们常用的单元测试框架是unittest、pytest，相比之下pytest更具有学习价值，原因是pytest代码更简洁。而且pytest框架结合selenium做UI自动化也比较方便。
可能单元测试大家做的不是很多，因为单元测试基本都是开发的同事在做，但是这并不妨碍大家学习pytest框架。


## 1、gtest
http://www.uml.org.cn/Test/201905061.asp
gtest是google开源的C++测试库，用于执行Unit Test或者是Mock Test都十分方便。虽然很多时候，开发写的代码最终功能会有测试来测试，但是，基本单元测试是每个开发者必须的，至少保证你写的东西符合你的预期。很多测试框架，而gtest至少不用说测试编写之后，还需要去列出调用所有的测试方法，只需要RUN_ALL_TESTS宏即可。

gmock是gtest的一部分，也可以说是gtest中比较advanced的topic。

### 1-1、简介
gtest是一个跨平台的(Liunx、Mac OS X、Windows 、Cygwin 、Windows CE and Symbian ) C++单元测试框架，由google公司发布。gtest是为在不同平台上为编写C++测试而生成的。它提供了丰富的断言、致命和非致命判断、参数化、”死亡测试”等等。

### 1-2、下载和安装
官网：https://github.com/google/googletest/releases/tag/release-1.11.0
git clone https://github.com/google/googletest.git

#### linux
```
unzip googletest-release-1.11.0.zip
apt install cmake
cmake --version

cd googletest-release-1.11.0

# 下面这段操作有毒，根本行不通，害我花了大量时间去解决lpthreads找不到问题
mkdir gtest-build
cd gtest-build
cmake ../googletest/
报错：Looking for pthread_create - not found
apt install doxygen

# 实际上这个not found是正常的
cd googletest-release-1.11.0
cmake .
make

报错：this file requires compiler and library support for the iso c++ 2011 standard
在googletest/CMakeLists.txt最前面加上SET( CMAKE_CXX_FLAGS "-std=c++11 -O3")即可
报错：error: ‘std::get’ has not been declared
在googlemock/CMakeLists.txt最前面加上SET( CMAKE_CXX_FLAGS "-std=c++11 -O3")即可

make install

# cmake重新编译
删除文件夹下的文件 rm CMakeCache.txt 重新编译即可
cmake 需要编译的文件夹地址
```

狭义简单理解交叉编译就是人为的指定目标平台的工具链进行编译产出可执行文件或库文件。 使用默认的工具链通常情况即为宿主机编译。可以这样理解，在aarch架构上面编译x86架构。

Doxygen
Doxygen是一种开源跨平台的，以类似JavaDoc风格描述的文档系统，完全支持C、C++、Java、Objective-C和IDL语言，部分支持PHP、C#。注释的语法与Qt-Doc、KDoc和JavaDoc兼容。Doxygen可以从一套归档源文件开始，生成HTML格式的在线类浏览器，或离线的LATEX、RTF参考手册。

#### windows
真是日了狗，不知道为啥使用vs2015怎么也编译不出gtest的lib库。但是在同事的环境使用vs2015就正常，使用他生成的vcxproj库也不行，说明不是cmake导致。
然后尝试使用vs2010，编译有提示gtest至少需要vs2015版本才能编译，但是vs2010有同样的问题。

报错警告：
```
cl：D9002 忽略未知选项 "-utf-8"
然后blabla错误，Aplying不能在std里面xxxx
```
最开始找错了方向，后来发现应该是警告导致，忽略了utf-8。因此可能是编码问题导致编译出错。

后来使用everthing软件找到cl.exe，执行cl -help发现并没有/utf-8选项，但是vs2019的cl则可以，发现cl.exe的版本不同。

网上没有找到cl.exe升级的方法，只找到一个提示：
在VS2015版本(Visual Studio 2015 Update 2)，增加一个编译选项/utf-8，该编译选项的作用就是将源码字符集和执行文件字符集指定为UTF-8。增加该编译选项后，再重新编译运行，程序正确输出中文，问题解决。
官方：https://docs.microsoft.com/en-us/cpp/build/reference/utf-8-set-source-and-executable-character-sets-to-utf-8?redirectedfrom=MSDN&view=msvc-160





### 1-3、本地测试
注意：所有附加的编译参数都是需要的。
gtest_main和gmock_main可以让测试者无需在为每次测试用例写入main函数。

```
[root@ubuntu0006:/media/hankin/vdb/unittest] #vim study_gtest.cpp
[root@ubuntu0006:/media/hankin/vdb/unittest] #g++ study_gtest.cpp -std=c++11 -lgtest_main -lgtest -lpthread
[root@ubuntu0006:/media/hankin/vdb/unittest] #./a.out
Running main() from /media/hankin/vdb/unittest/googletest-release-1.11.0/googletest/src/gtest_main.cc
[==========] Running 1 test from 1 test suite.
[----------] Global test environment set-up.
[----------] 1 test from sum
[ RUN      ] sum.testSum
study_gtest.cpp:11: Failure
Expected equality of these values:
  2
  sum(1, 2)
    Which is: 3
[  FAILED  ] sum.testSum (0 ms)
[----------] 1 test from sum (0 ms total)

[----------] Global test environment tear-down
[==========] 1 test from 1 test suite ran. (1 ms total)
[  PASSED  ] 0 tests.
[  FAILED  ] 1 test, listed below:
[  FAILED  ] sum.testSum

 1 FAILED TEST
[root@ubuntu0006:/media/hankin/vdb/unittest] #vim study_gtest.cpp
[root@ubuntu0006:/media/hankin/vdb/unittest] #cat study_gtest.cpp
#include <iostream>
#include <gtest/gtest.h>

int sum(int a, int b) {
        return a + b;
}

TEST(sum, testSum) {
        EXPECT_EQ(5, sum(2, 3));        // 求和2+3=5
        EXPECT_NE(3, sum(3, 4));        // 求和3+4!=3
        EXPECT_EQ(2, sum(1, 2));        // 求和1+2=2
}
// 如果在此处不写main函数，那么在链接库的时候还需要链接-lgtest_main, 否则只需链接-lgtest即可。
#if 0
int main(int argc, char **argv)
{
        testing::InitGoogleTest(&argc, argv);
        return RUN_ALL_TESTS();
}
#endif
```

项目测试：
```
[root@ubuntu0006:/media/hankin/vdb/unittest/project] #g++ gtest_modle.cpp modle.cpp -std=c++11 -lgtest_main -lgtest -lpthread
[root@ubuntu0006:/media/hankin/vdb/unittest/project] #./a.out
Running main() from /media/hankin/vdb/unittest/googletest-release-1.11.0/googletest/src/gtest_main.cc
[==========] Running 1 test from 1 test suite.
[----------] Global test environment set-up.
[----------] 1 test from add
[ RUN      ] add.add1
gtest_modle.cpp:7: Failure
Expected equality of these values:
  2
  add(1, 2, 0)
    Which is: 3
[  FAILED  ] add.add1 (0 ms)
[----------] 1 test from add (0 ms total)

[----------] Global test environment tear-down
[==========] 1 test from 1 test suite ran. (0 ms total)
[  PASSED  ] 0 tests.
[  FAILED  ] 1 test, listed below:
[  FAILED  ] add.add1

 1 FAILED TEST
[root@ubuntu0006:/media/hankin/vdb/unittest/project] #vim gtest_modle.cpp
[root@ubuntu0006:/media/hankin/vdb/unittest/project] #g++ gtest_modle.cpp modle.cpp -std=c++11 -lgtest_main -lgtest -lpthread
./[root@ubuntu0006:/media/hankin/vdb/unittest/project] #./a.out
Running main() from /media/hankin/vdb/unittest/googletest-release-1.11.0/googletest/src/gtest_main.cc
[==========] Running 1 test from 1 test suite.
[----------] Global test environment set-up.
[----------] 1 test from add
[ RUN      ] add.add1
[       OK ] add.add1 (0 ms)
[----------] 1 test from add (0 ms total)

[----------] Global test environment tear-down
[==========] 1 test from 1 test suite ran. (0 ms total)
[  PASSED  ] 1 test.
```
详细见github/stroage/c++/unittest/。

### 1-2、断言
1、ASSERT_系列：如果当前点检测失败则退出当前函数
2、EXPECT_系列：如果当前点检测失败则继续往下执行

ASSERT_系列：

bool值检查

1、 ASSERT_TRUE(参数)，期待结果是true

2、ASSERT_FALSE(参数)，期待结果是false

数值型数据检查

3、ASSERT_EQ(参数1，参数2)，传入的是需要比较的两个数 equal

4、ASSERT_NE(参数1，参数2)，not equal，不等于才返回true

5、ASSERT_LT(参数1，参数2)，less than，小于才返回true

6、ASSERT_GT(参数1，参数2)，greater than，大于才返回true

7、ASSERT_LE(参数1，参数2)，less equal，小于等于才返回true

8、ASSERT_GE(参数1，参数2)，greater equal，大于等于才返回true

字符串检查

9、ASSERT_STREQ(expected_str, actual_str)，两个C风格的字符串相等才正确返回

10、ASSERT_STRNE(str1, str2)，两个C风格的字符串不相等时才正确返回

11、ASSERT_STRCASEEQ(expected_str, actual_str)

12、ASSERT_STRCASENE(str1, str2)

13、EXPECT_系列，也是具有类似的宏结构的

### 1-3、TEST宏
TEST宏的作用是创建一个简单测试，它定义了一个测试函数，在这个函数里可以使用任何C++代码并使用提供的断言来进行检查。

### 1-4、















