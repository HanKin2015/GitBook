# 单元测试

## 1、gtest
http://www.uml.org.cn/Test/201905061.asp
gtest是google开源的C++测试库，用于执行Unit Test或者是Mock Test都十分方便。虽然很多时候，开发写的代码最终功能会有测试来测试，但是，基本单元测试是每个开发者必须的，至少保证你写的东西符合你的预期。很多测试框架，而gtest至少不用说测试编写之后，还需要去列出调用所有的测试方法，只需要RUN_ALL_TESTS宏即可。

gtest是Google的一个开源框架，它主要用于写单元测试，检查自己的程序是否符合预期行为。可在多个平台上使用（包括Linux, Mac OS X, Windows, Cygwin和Symbian）。它提供了丰富的断言、致命和非致命失败判断，能进行值参数化测试、类型参数化测试、“死亡测试”。

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

网上铺天盖地都是忽略未知选项-std=c++11，测试发现也有这个问题，然后就想到会不会是c++标准不对导致。
然后找到输出_cplusplus值看看，发现是199711，vs2015居然使用的是97标准，尝试修改为11标准失败，发现网上方法并不适用。

从 Visual Studio 2017 版本 15.7 开始便已提供 /Zc:__cplusplus 选项，该选项在默认情况下处于禁用状态。
https://docs.microsoft.com/zh-cn/cpp/build/reference/zc-cplusplus?view=msvc-160&viewFallbackFrom=vs-2019

发现在vs2015怎么都是199711。可以使用/std:c++latest和/std:c++14，但是一样。或许
不支持。。。

网上没有找到cl.exe升级的方法，只找到一个提示：
在VS2015版本(Visual Studio 2015 Update 2)，增加一个编译选项/utf-8，该编译选项的作用就是将源码字符集和执行文件字符集指定为UTF-8。增加该编译选项后，再重新编译运行，程序正确输出中文，问题解决。
官方：https://docs.microsoft.com/en-us/cpp/build/reference/utf-8-set-source-and-executable-character-sets-to-utf-8?redirectedfrom=MSDN&view=msvc-160

然后在msdn里面找到VS 2015 Update3下载安装。
Update版本比正式版居然能多出4个G，多出正式版还多，搞不懂。
安装后使用cl -help发现有/utf-8选项，并且版本从19.00.23026升级到了19.00.24210，成功编译出lib文件。
最新版VS2019的cl.exe版本为19.29.30038.1。

安装VS2019直接cmake+VS2019编译运行正常，发现VS2019自身就自带gtest。

### 1-3、本地测试

#### linux
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
/**
 * 如果在此处不写main函数，那么在链接库的时候还需要链接-lgtest_main, 否则只需链接-lgtest即可。
 *
 * 否则报错：
 * /usr/lib/gcc/x86_64-linux-gnu/5/../../../x86_64-linux-gnu/crt1.o：在函数‘_start’中：
 * (.text+0x20)：对‘main’未定义的引用
 * collect2: error: ld returned 1 exit status
 */
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

#### Windows
详细代码见：D:\Github\Storage\windows\StudySTL\study_gtest.h
```
#pragma once

#include "gtest/gtest.h"

#pragma comment(lib, "library/gtestlib/gtest.lib")

int add(int x, int y)
{
	return x + y;
}

TEST(add, add)
{
	EXPECT_EQ(5, add(2, 3));
	EXPECT_NE(3, add(3, 4));
	//EXPECT_EQ(2, add(1, 2, 0));
}

/*
* 1.属性->C/C++->附加目录 增加gtest的include文件夹，这样才不能破坏库的其他文件调用
* 2.属性->C/C++->代码生成->运行库->多线程 DLL (/MD) 修改为 多线程 (/MT)
*/
int test_study_gtest(int argc, char** argv)
{
	testing::InitGoogleTest(&argc, argv);
	RUN_ALL_TESTS();
	return 0;
}
```

### 1-4、断言
参考：https://blog.csdn.net/yyz_1987/article/details/124101531
Gtest中，断言的宏可以理解为分为两类，一类是ASSERT系列，一类是EXPECT系列。
ASSERT_系列的断言（Fatal assertion）：
当检查点失败时，退出当前函数（注意：并非退出当前案例）。
EXPECT_系列的断言(Nonfatal assertion)：
当检查点失败时，继续执行下一个检查点（每一个断言表示一个测试点）。
通常情况应该首选使用EXPECT_，因为ASSERT_*在报告完错误后不会进行清理工作，有可能导致内存泄露问题。

1、ASSERT_系列：如果当前点检测失败则退出当前函数(fatal assertion)
2、EXPECT_系列：如果当前点检测失败则继续往下执行(nonfatal assertion)

断言中提供以下几种检查方法：

只需要替换ASSERT为EXCEPT即可。

布尔类型检查
1、ASSERT_TRUE(参数)，期待结果是true
2、ASSERT_FALSE(参数)，期待结果是false

数值型数据检查
3、ASSERT_EQ(参数1，参数2)，传入的是需要比较的两个数 equal
4、ASSERT_NE(参数1，参数2)，not equal，不等于才返回true
5、ASSERT_LT(参数1，参数2)，less than，小于才返回true
6、ASSERT_GT(参数1，参数2)，greater than，大于才返回true
7、ASSERT_LE(参数1，参数2)，less equal，小于等于才返回true
8、ASSERT_GE(参数1，参数2)，greater equal，大于等于才返回true

字符串检查
9、 ASSERT_STREQ(expected_str, actual_str)，两个C风格的字符串相等才正确返回
10、ASSERT_STRNE(str1, str2)，两个C风格的字符串不相等时才正确返回
11、ASSERT_STRCASEEQ(expected_str, actual_str)，忽略大小写
12、ASSERT_STRCASENE(str1, str2)，忽略大小写

异常检查
13、ASSERT_THROW(statement, exception_type)，指定异常类型
14、ASSERT_ANY_THROW(statement)
15、ASSERT_NO_THROW(statement)

浮点检查
16、ASSERT_FLOAT_EQ(excpted, actual)，差不多相等
17、ASSERT_DOUBLE_EQ(excpted, actual)

相近值检查
18、ASSERT_NEAR(val1, val2, abs_error)，两个值相差不超过

### 1-5、宏测试之TEST宏
TEST宏的作用是创建一个简单测试，它定义了一个测试函数，在这个函数里可以使用任何C++代码并使用提供的断言来进行检查。
TEST宏的第一个参数是test_suite_name（测试套件名），第二个参数是test_name（测试特例名）。
测试套件（Test Case）是为某个特殊目标而编制的一组测试输入、执行条件以及预期结果，以便测试某个程序路径或核实是否满足某个特定需求。
测试特例是测试套件下的一个（组）测试。
对于测试套件名和测试特例名，不能有下划线（_）。因为GTest源码中需要使用下划线把它们连接成一个独立的类名。不能有相同的“测试套件名和特例名”的组合——否则类名重合。
测试套件名和测试特例名的分开，使得我们编写的测试代码有着更加清晰的结构。

### 1-6、TEST_F宏
使用TEST_F前需要创建一个固件类，继承esting::Test类。

在类内部使用public或者protected描述其成员，为了保证实际执行的测试子类可以使用其成员变量。在构造函数或者继承于::testing::Test类中的SetUp方法中可以实现我们需要构造的数据。在析构函数或者继承于::testing::Test类中的TearDown方法中可以实现一些资源释放的代码。

第一个参数为测试套件名（必须与创建的固件类名一致），第二个为测试名，可任意取。

TEST_F宏和TEST宏的实现接近，只是TEST_F宏的封装更加开放一些，对TEST宏的功能多了一些扩展。

TEST_F与TEST的区别，TEST_F提供了一个初始化函数（SetUp）和一个清理函数(TearDown)。在TEST_F中使用的变量可以在初始化函数SetUp中初始化，在TearDown中销毁。所有的TEST_F是互相独立的，都是在初始化以后的状态开始运行。一个TEST_F不会影响另一个TEST_F所使用的数据，多个测试场景需要相同数据配置的情况用 TEST_F。

### 1-7、TEST_P宏
在设计测试案例时，经常需要考虑给被测函数传入不同的值的情况。我们之前的做法通常是写一个通用方法然后编写在测试案例调用它。即使使用了通用方法，这样的工作也是有很多重复性的。

用TEST这个宏，需要编写如下的测试案例，每输入一个值就需要写一个测试点，这还只是在一个测试中，如果把每个测试点单独创建一个测试，工作量就更大。使用TEST_P这个宏，对输入进行参数化，就简单很多。

见：D:\Github\Storage\c++\unittest\gtest_example.cpp
```
INSTANTIATE_TEST_SUITE_P(PARAM,MyClassTest,testing::Values(3,5,7,9));
```

### 1-8、预处理事件机制
gtest 提供了多种预处理事件机制，方便我们在测试之前或之后做一些操作。
1. 全局的，所有测试执行前后。
2. TestSuite级别的，在某测试套件中第一个测试前，最后一个测试执行后。
3. TestCase级别的，每个测试前后。

1.全局事件
要实现全局事件，必须写一个类继承testing::Environment类，实现里面的SetUp和TearDown方法。
1. SetUp()方法在所有案例执行前执行。
2. TearDown()方法在所有案例执行后执行。

还需要在main函数中通过调用testing::AddGlobalTestEnvironment这个函数将事件挂进来，也就是说，我们可以写很多个这样的类，然后将他们的事件都挂上去，AddGlobalTestEnvironment这个函数要放在RUN_ALL_TEST之前。 

2.TestSuites事件
需要写一个类，继承testing::Test，然后实现两个静态方法
1. SetUpTestCase() 方法在第一个TestCase之前执行。
2. TearDownTestCase() 方法在最后一个TestCase之后执行。

3.TestCase事件
TestCase事件是挂在每个案例执行前后的，实现方式和Test'Suites的几乎一样，不过需要实现的是SetUp方法和TearDown方法：
1. SetUp()方法在每个TestCase之前执行。
2. TearDown()方法在每个TestCase之后执行。

## 2、驱动代码、桩代码、Mock代码
驱动代码（Driver）指调用被测函数的代码，在单元测试过程中，驱动模块通常包括调用被测函数前的数据准备、调用被测函数以及验证相关结果三个步骤。驱动代码的结构，通常由单元测试的框架决定。

桩代码（Stub）是用来代替真实代码的临时代码。 比如，某个函数A的内部实现中调用了一个尚未实现的函数B，为了对函数A的逻辑进行测试，那么就需要模拟一个函数B，这个模拟的函数B的实现就是所谓的桩代码。桩代码的应用首先起到了隔离和补齐的作用，使被测代码能够独立编译、链接，并独立运行。同时，桩代码还具有控制被测函数执行路径的作用。

Mock代码和桩代码非常类似，都是用来代替真实代码的临时代码，起到隔离和补齐的作用。但是很多人，甚至是具有多年单元测试经验的开发工程师，也很难说清这二者的区别。

在作者看来，Mock代码和桩代码的本质区别是：测试期待结果的验证（Assert and Expectiation）。

对于Mock代码来说，我们的关注点是Mock方法有没有被调用，以什么样的参数被调用，被调用的次数，以及多个Mock函数的先后调用顺序。所以，在使用Mock代码的测试中，对于结果的验证（也就是assert），通常出现在Mock函数中。

对于桩代码来说，我们的关注点是利用Stub来控制被测函数的执行路径，不会去关注Stub是否被调用以及怎么样被调用。所以，你在使用Stub的测试中，对于结果的验证（也就是assert），通常出现在驱动代码中。

在Python中，我们常用的单元测试框架是unittest、pytest，相比之下pytest更具有学习价值，原因是pytest代码更简洁。而且pytest框架结合selenium做UI自动化也比较方便。
可能单元测试大家做的不是很多，因为单元测试基本都是开发的同事在做，但是这并不妨碍大家学习pytest框架。

## 3、mock test
Mock test（模拟测试）是一种软件测试方法，它通过模拟系统的某些部分来测试软件的其他部分。在模拟测试中，测试人员使用模拟对象来代替实际的系统组件，以便测试软件的其他部分是否正确地与这些组件进行交互。

模拟测试通常用于以下情况：

当某些组件尚未准备好时，可以使用模拟对象来代替这些组件，以便测试其他部分的功能。
当某些组件很难或很昂贵时，可以使用模拟对象来代替这些组件，以便测试其他部分的功能。
当某些组件的行为不稳定或不可预测时，可以使用模拟对象来代替这些组件，以便测试其他部分的功能。
模拟测试通常使用模拟框架来创建和管理模拟对象。常见的模拟框架包括 Mockito、EasyMock、PowerMock 等。这些框架提供了一组 API，使得测试人员可以轻松地创建和配置模拟对象，并在测试中使用它们。

总之，模拟测试是一种非常有用的测试方法，它可以帮助测试人员更好地测试软件的各个部分，尤其是在某些组件不可用或不稳定的情况下。

代码见：D:\Github\Storage\c++\unittest\mocktest

## 4、Unit test（单元测试）和 mock test（模拟测试）的区别
Unit test（单元测试）和 mock test（模拟测试）都是软件测试中常用的测试方法，它们之间的区别如下：

测试的对象不同
Unit test 是针对软件中的单个模块或函数进行测试的，通常是在开发过程中进行的。而 mock test 是针对软件中的多个模块或函数进行测试的，通常是在集成测试或系统测试阶段进行的。

测试的目的不同
Unit test 的目的是测试单个模块或函数的功能是否正确，以便在开发过程中及时发现和修复问题。而 mock test 的目的是测试多个模块或函数之间的交互是否正确，以便在集成测试或系统测试阶段发现和修复问题。

测试的方式不同
Unit test 通常使用真实的对象进行测试，而 mock test 则使用模拟对象来代替真实的对象进行测试。这是因为在 mock test 中，测试人员需要模拟多个模块或函数之间的交互，而这些模块或函数可能还没有实现或者不稳定，因此需要使用模拟对象来代替真实的对象进行测试。

测试的范围不同
Unit test 的测试范围通常比较小，只测试单个模块或函数的功能。而 mock test 的测试范围比较大，需要测试多个模块或函数之间的交互，因此需要更多的测试用例和更复杂的测试环境。

总之，Unit test 和 mock test 都是软件测试中常用的测试方法，它们各有优缺点，可以根据具体的测试需求选择合适的测试方法。

个人理解：
mock test好比一个人每天需要起床，吃饭，上班，下班，吃饭，睡觉，整个一系列操作，连贯起来。
而unit test就只会单独测试上班、下班等独立模块。

## 5、CMocka和gtest区别
CMocka和gtest都是流行的C语言和C++语言的单元测试框架，它们有以下区别：

语言支持：CMocka是一个专门为C语言编写的单元测试框架，而gtest是一个专门为C++语言编写的单元测试框架。

测试风格：CMocka支持基于测试用例的测试风格，而gtest支持基于测试夹具的测试风格。在基于测试用例的测试风格中，每个测试用例都是独立的，而在基于测试夹具的测试风格中，多个测试用例可以共享同一个测试夹具。

断言风格：CMocka使用assert宏来进行断言，而gtest使用EXPECT_*和ASSERT_*宏来进行断言。gtest的断言宏提供了更多的灵活性和可读性，可以更好地定位测试失败的原因。

依赖管理：CMocka支持使用mock对象来模拟系统中的依赖关系，而gtest支持使用Google Mock来进行mock测试。Google Mock提供了更多的依赖管理功能，可以更好地控制测试环境并模拟各种情况。

跨平台支持：CMocka支持跨平台测试，可以在多个操作系统和编译器上运行，而gtest只支持在Windows、Linux和Mac OS X等少数平台上运行。

总的来说，CMocka和gtest都是优秀的单元测试框架，它们都有自己的优点和适用场景。选择哪个框架取决于项目的具体需求和开发语言。




