# cmake学习

## 1、百度百科cmake 
CMake是一个跨平台的安装（编译）工具，可以用简单的语句来描述所有平台的安装(编译过程)。它能够输出各种各样的makefile或者project文件，能测试编译器所支持的C++特性,类似UNIX下的automake。只是 CMake 的组态档取名为 CMakeLists.txt。Cmake 并不直接建构出最终的软件，而是产生标准的建构档（如 Unix 的 Makefile 或 Windows Visual C++ 的 projects/workspaces），然后再依一般的建构方式使用。这使得熟悉某个集成开发环境（IDE）的开发者可以用标准的方式建构他的软件，这种可以使用各平台的原生建构系统的能力是 CMake 和 SCons 等其他类似系统的区别之处。

“CMake”这个名字是“cross platform make”的缩写。虽然名字中含有“make”，但是CMake和Unix上常见的“make”系统是分开的，而且更为高阶。

## 2、windows环境使用

### 2-1、安装
- 安装cmake，CMake官网 https://cmake.org/
- 安装GCC、G++，mingW是不错的选择

安装好mingw32-make.exe以后，如果希望可以像Linux下那样键入 make 执行Makefile文件，就把mingw32-make.exe修改为make.exe，否则会提示找不到make命令。

### 2-2、构建VS项目
拿goolgetest项目为例，可以通过cmake命令生成vcproj文件，最好建议使用ui界面生成。
第一栏：源代码文件夹地址
第三栏：建议新建文件夹build，然后把这个文件夹地址填入，最后会把文件生成到这个文件夹下
点击Configure，选择对应的VS版本
点击Generate完成

### 2-3、构建Makefile文件
https://my.oschina.net/u/2501904/blog/1162753
编写CMakeLists.txt 文件，编写和Linux下都一样，只是在设置编译器的时候，要指定头文件和库的路径，都要指向mingw。
```
D:\Users\User\Desktop\xml>make Makefile         # 错误

D:\Users\User\Desktop\xml>make                  # 错误
Microsoft Windows [版本 10.0.16299.15]
(c) 2017 Microsoft Corporation。保留所有权利。

D:\Users\User\Desktop\xml>mingw32-make.exe
[ 33%] Building CXX object CMakeFiles/main.dir/main.cpp.obj
[ 66%] Building CXX object CMakeFiles/main.dir/tinyxml2.cpp.obj
[100%] Linking CXX executable main.exe
[100%] Built target main
```

## 3、linux环境使用
安装命令：apt install cmake

### 3-1、CMake指定C++版本
由于C++升级，导致很多代码需要用 C++ 11 的规范进行编译。

#### 3-1-1、修改Makefile
手动修改在Makefile中，指定编译C++版本为增加编译开关-std=c++11。如下例：
```
CFLAGS+=-std-c++11
```

#### 3-1-2、使用CMake指定: 修改CMakeLists.txt(推荐)
在CmakeLists.txt中增加对C++版本的定义。方法如下：
```
# Enable C++11
set(CMAKE_CXX_STANDARD 11)
```

#### 3-1-3、使用CMake指定: 生成Makefile的时候指定
使用cmake的命令行时候指定。方法如下：
```
cmake -DCMAKE_CXX_STANDARD=11 ..
```

### 3-2、编写CMakeLists.txt文件之关键字介绍
PROJECT (xxx) 指定工程名称
例：PROJECT(hello)

SET 设置指定变量
例：SET(LRC_LIST main.cpp) LRC_LIST变量中包含main.cpp

MESSAGE 向终端中输出用户自定义信息
例：MESSAGE(STATUS “message output” ${HELLO_BINARY_DIR})

ADD_EXECUTABLE 生成可执行文件
例：ADD_EXECUTABLE(hello $ {LRC_LIST})
这里的${LRC_LIST}也可以直接写各源文件的名称(只写cpp)
有的时候也会使用一些.o文件，添加和.cpp一样，直接在ADD_EXECUTABLE中添加即可

INSTALL 安装文件
例：INSTALL(FILES doc1 doc2 DESTINATION /usr/share/doc/cmake/) 安装到/usr/share/doc/cmake
例：INSTALL(PROGRAMS hello.sh DESTINATION bin) 安装到/usr/bin

ADD_SUBDIRECTORY 指定中间文件生成并存放的位置
例：ADD_SUBDIRECTORY(src bin) 指定可执行文件生成和放在./src/bin中，常用于外层CMakeLists.txt

INCLUDE_DIRECTORIES 向⼯程添加多个特定的库⽂件搜索路径
例：INCLUDE_DIRECTORIES(./include) 把inlcude文件夹增加到库文件的搜索目录中

LINK_DIRECTORIES 向⼯程添加多个特定的库⽂件搜索路径
例：LINK_DIRECTORIES(./data/lib) lib文件夹中有动态库/静态库文件

TARGET_LINK_LIBRARIES 可执行文件链接动态库静态库
例：TARGET_LINK_LIBRARIES(hello libhello.so)

### 3-3、静态库动态库构建
很多情况下，不希望把程序变成可执行文件，而希望把程序变成静态库或者动态库供他人使用。下面介绍cmake构建动态库/静态库的过程(差别不大，只是CMakeLists中有改变)：
1.先写好.h和.cpp
2.项目中有一个CMakeLists.txt， src中有一个CMakeLists.txt

项目中的CMakeLists.txt写生成路径，src中的CMakeLists.txt写编译规则，重点有三行：
SET(LIBHELLO_SRC hello.cpp)
ADD_LIBRARY(hello SHARED ${LIBHELLO_SRC}) #构建动态库,hello.so
ADD_LIBRARY(hello_static STATIC ${LIBHELLO_SRC}) #构建静态库hello_static.a

### 3-4、INSTALL文件安装
有的时候希望把文件安装到特定的路径，就使用INSTALL关键字
将hello.h安装到/usr/include/hello
INSTALL(FILES hello.h DESTINATION /usr/include/hello)

静态库动态库安装，LIBRARY是动态 ARCHIVE是静态
INSTALL(TARGETS hello hello_static LIBRARY DESTINATION /usr/lib ARCHIVE DESTINATION /usr/lib)

## 4、实战
代码见：D:\Github\Storage\c++\cmake













