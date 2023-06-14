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

- 不区分大小写

## 5、option和set区别
都是用来定义变量的命令，但是option命令用于定义一个布尔类型的变量，一个开关选项，用户可以通过命令行或者图形界面来设置这个选项的值；
set命令用于定义一个普通类型的变量。

## 6、find_package命令
find_package 是 CMake 中的一个命令，用于查找和加载外部依赖库。它的语法如下：

find_package(<package> [version] [EXACT] [QUIET] [MODULE] [REQUIRED] [[COMPONENTS] [components...]])
其中，<package> 表示要查找的依赖库的名称，version 表示要查找的依赖库的版本号，EXACT 表示要求精确匹配版本号，QUIET 表示不输出查找信息，MODULE 表示只查找 CMake 模块文件，REQUIRED 表示如果找不到依赖库则停止 CMake 构建过程，[COMPONENTS] 表示要查找的依赖库的组件。

find_package 命令会在系统中查找指定名称的依赖库，并设置相关变量，以便在后续的 CMake 构建过程中使用。通常情况下，find_package 命令会在系统路径中查找依赖库，如果找不到，则可以通过设置 CMAKE_PREFIX_PATH 变量来指定依赖库的安装路径。
```
find_package(Threads REQUIRED)
```

## 7、CMAKE_BUILD_TYPE变量
```
if(CMAKE_BUILD_TYPE STREQUAL "Debug")
```

这句代码是一个 CMake 中的条件语句，用于判断当前 CMake 构建的类型是否为 Debug。

在 CMake 中，可以通过设置 CMAKE_BUILD_TYPE 变量来指定构建类型，常见的构建类型包括 Debug、Release、RelWithDebInfo 和 MinSizeRel。Debug 类型的构建通常用于开发和调试阶段，包含调试信息和不进行优化的代码，而 Release 类型的构建则用于发布阶段，包含优化后的代码和不包含调试信息的代码。

因此，当 CMAKE_BUILD_TYPE 变量的值为 Debug 时，条件语句 if(CMAKE_BUILD_TYPE STREQUAL "Debug") 的判断结果为真，其后面的代码块将会被执行。这样可以在 Debug 构建时进行一些特殊的处理，例如开启调试信息、关闭优化等。

## 8、代码覆盖率
```
if(CMAKE_BUILD_TYPE STREQUAL "Debug")
    include(${PROJECT_SOURCE_DIR}/cmake/CodeCoverage.cmake)
    append_coverage_compiler_flags()
    setup_target_for_coverage_gcovr_xml(
        NAME gcovr_xml
        EXECUTABLE ctest -V -j ${PROCESSOR_COUNT}
        DEPENDENCIES ${PROJECT_NAME}_shared
        BASE_DIRECTORY "${PROJECT_SOURCE_DIR}"
        EXCLUDE "tests/*"
    )
    setup_target_for_coverage_gcovr_html(
        NAME gcovr_html
        EXECUTABLE ctest -V -j ${PROCESSOR_COUNT}
        DEPENDENCIES ${PROJECT_NAME}_shared
        BASE_DIRECTORY "${PROJECT_SOURCE_DIR}"
        EXCLUDE "tests/*"
    )
else()
    message(WARNING "Code coverage results with an optimised (non-Debug) build may be misleading")
endif()

# unit tests
enable_testing()
add_subdirectory(tests)
```

## 9、configure_file命令
configure_file 是 CMake 中的一个命令，用于将一个文件作为模板，根据用户定义的变量值生成一个新的文件。它的语法如下：
```
configure_file(input_file output_file [COPYONLY] [ESCAPE_QUOTES] [@ONLY])
```
其中，input_file 是模板文件的路径，output_file 是生成的文件的路径。COPYONLY 参数表示只复制文件，不进行变量替换；ESCAPE_QUOTES 参数表示对变量值中的引号进行转义；@ONLY 参数表示只替换 @VAR@ 形式的变量，不替换 ${VAR} 形式的变量。

在模板文件中，可以使用 @VAR@ 或 ${VAR} 的形式来表示变量。例如，假设有一个模板文件 config.h.in，内容如下：
```
#define VERSION "@PROJECT_VERSION@"
```
在 CMakeLists.txt 文件中，可以定义变量 PROJECT_VERSION，然后使用 configure_file 命令生成一个新的文件 config.h，代码如下：
```
set(PROJECT_VERSION "1.0.0")
configure_file(config.h.in config.h)
```

执行上述代码后，会生成一个新的文件 config.h，内容如下：
```
#define VERSION "1.0.0"
```
这样就可以在代码中使用 #include "config.h" 来引用版本号了。

## 10、Makefile文件已生成，然后更改CMakeLists.txt文件会影响编译
比如项目需要C++11标准，在CMakeLists.txt文件增加了CXX_STANDARD 11，如果直接cmake，然后make编译没有问题。但是如果先cmake，然后修改CMakeLists.txt文件删除标准，再make则会报错误。

原因是：
使用CMake生成Makefile文件后，如果您修改了CMakeLists.txt文件，再次运行make命令时，会重新执行CMake生成新的Makefile文件，因为CMakeLists.txt文件是用来生成Makefile文件的脚本文件。如果您修改了CMakeLists.txt文件，CMake会重新解析该文件并生成新的Makefile文件，这可能会导致重新编译一些文件，因为CMake可能会重新计算依赖关系。因此，建议在修改CMakeLists.txt文件后，先运行cmake命令重新生成Makefile文件，然后再运行make命令进行编译。

```
[root@ubuntu0006:~/cmake/build] #ll
总用量 76
drwxr-xr-x 5 root root  4096 6月   6 19:08 ./
drwxr-xr-x 4 root root  4096 6月   6 19:08 ../
-rw-r--r-- 1 root root 13568 6月   6 19:07 CMakeCache.txt
drwxr-xr-x 6 root root  4096 6月   6 20:19 CMakeFiles/
-rw-r--r-- 1 root root  1493 6月   6 19:07 cmake_install.cmake
-rw-r--r-- 1 root root   256 6月   6 19:07 CTestTestfile.cmake
drwxr-xr-x 2 root root  4096 6月   6 19:08 include/
-rwxr-xr-x 1 root root 20560 6月   6 19:07 libmain.so*
-rw-r--r-- 1 root root  5833 6月   6 19:08 Makefile
drwxr-xr-x 3 root root  4096 6月   6 19:08 tests/
[root@ubuntu0006:~/cmake/build] #vi ../CMakeLists.txt
[root@ubuntu0006:~/cmake/build] #make
-- [variable]
-- CMAKE_BUILD_TYPE=
-- PROJECT_SOURCE_DIR=/root/cmake
-- PROJECT_NAME=CMakeStudy
-- PROCESSOR_COUNT=
-- CMAKE_CURRENT_SOURCE_DIR=/root/cmake/tests
-- CMAKE_BINARY_DIR=/root/cmake/build
-- PROJECT_BINARY_DIR=/root/cmake/build
-- CMAKE_INSTALL_PREFIX=/usr/local
-- [options]
-- ENABLE_LIBUVC_BACKEND=ON
-- BUILD_TESTING=ON
-- BUILD_COVERAGE_REPORT=OFF
-- Configuring done
-- Generating done
-- Build files have been written to: /root/cmake/build
[ 33%] Building CXX object CMakeFiles/CMakeStudy_shared.dir/mymath.cpp.o
[ 66%] Building CXX object CMakeFiles/CMakeStudy_shared.dir/main.cpp.o
[100%] Linking CXX shared library libmain.so
[100%] Built target CMakeStudy_shared
[root@ubuntu0006:~/cmake/build] #ll
总用量 76
drwxr-xr-x 5 root root  4096 6月   6 20:19 ./
drwxr-xr-x 4 root root  4096 6月   6 20:19 ../
-rw-r--r-- 1 root root 13568 6月   6 19:07 CMakeCache.txt
drwxr-xr-x 5 root root  4096 6月   6 20:19 CMakeFiles/
-rw-r--r-- 1 root root  1493 6月   6 19:07 cmake_install.cmake
-rw-r--r-- 1 root root   256 6月   6 19:07 CTestTestfile.cmake
drwxr-xr-x 2 root root  4096 6月   6 20:19 include/
-rwxr-xr-x 1 root root 20560 6月   6 20:19 libmain.so*
-rw-r--r-- 1 root root  5833 6月   6 20:19 Makefile
drwxr-xr-x 3 root root  4096 6月   6 20:19 tests/
```

## 11、单测和覆盖率
D:\Github\GitBook\gitbook\C++\gcov_lcov.md

## 12、cmake set_target_properties的使用
set_target_properties 是 CMake 中用于设置目标属性的命令。它可以用于设置编译选项、链接选项、输出路径等等。
更多详情见：D:\Github\Storage\c++\cmake\practice4\CMakeLists.txt

## 13、target_include_directories的使用
target_include_directories 是 CMake 中用于指定目标（target）的头文件搜索路径的命令。
```
target_include_directories(target
    [SYSTEM] [BEFORE]
    <INTERFACE|PUBLIC|PRIVATE> [items1...]
    [<INTERFACE|PUBLIC|PRIVATE> [items2...] ...])
```
其中，target 是目标名称，可以是库或可执行文件的名称；SYSTEM 表示这些头文件是系统头文件，会被编译器以不同的方式处理；BEFORE 表示这些路径会被添加到已有的路径之前；INTERFACE 表示这些路径只会被添加到目标的接口属性中，不会被添加到目标自身的编译选项中；PUBLIC 表示这些路径会被添加到目标自身的编译选项中，同时也会被添加到目标的依赖项的编译选项中；PRIVATE 表示这些路径只会被添加到目标自身的编译选项中，不会被添加到目标的依赖项的编译选项中。

## 14、target_link_libraries的使用
target_link_libraries 是 CMake 中用于将库链接到目标文件的命令。
```
target_link_libraries(my_executable /usr/local/lib/libfoo.a -pthread)
```
这将链接 /usr/local/lib/libfoo.a 库，并将 -pthread 标志传递给链接器。




