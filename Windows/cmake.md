# cmake学习


## 1、百度百科cmake 
CMake是一个跨平台的安装（编译）工具，可以用简单的语句来描述所有平台的安装(编译过程)。他能够输出各种各样的makefile或者project文件，能测试编译器所支持的C++特性,类似UNIX下的automake。只是 CMake 的组态档取名为 CMakeLists.txt。Cmake 并不直接建构出最终的软件，而是产生标准的建构档（如 Unix 的 Makefile 或 Windows Visual C++ 的 projects/workspaces），然后再依一般的建构方式使用。这使得熟悉某个集成开发环境（IDE）的开发者可以用标准的方式建构他的软件，这种可以使用各平台的原生建构系统的能力是 CMake 和 SCons 等其他类似系统的区别之处。

“CMake”这个名字是“cross platform make”的缩写。虽然名字中含有“make”，但是CMake和Unix上常见的“make”系统是分开的，而且更为高阶。

## 2、安装环境
- 安装cmake，CMake官网 https://cmake.org/
- 安装GCC、G++，mingW不错的选择

安装好mingw32-make.exe以后，如果希望可以像Linux下那样键入 make 执行Makefile文件，就把mingw32-make.exe修改为make.exe，否则会提示找不到make命令。

## 3、构建VS项目
拿goolgetest项目为例，可以通过cmake命令生成vcproj文件，最好建议使用ui界面生成。
第一栏：源代码文件夹地址
第三栏：建议新建文件夹build，然后把这个文件夹地址填入，最后会把文件生成到这个文件夹下
点击Configure，选择对应的VS版本
点击Generate完成

## 4、构建Makefile文件
https://my.oschina.net/u/2501904/blog/1162753
编写CMakeLists.txt 文件，编写和Linux下都一样，只是在设置编译器的时候，要指定头文件和库的路径，都要指向mingw。

```
D:\Users\User\Desktop\xml>make Makefile

D:\Users\User\Desktop\xml>make
Microsoft Windows [版本 10.0.16299.15]
(c) 2017 Microsoft Corporation。保留所有权利。

D:\Users\User\Desktop\xml>mingw32-make.exe
[ 33%] Building CXX object CMakeFiles/main.dir/main.cpp.obj
[ 66%] Building CXX object CMakeFiles/main.dir/tinyxml2.cpp.obj
[100%] Linking CXX executable main.exe
[100%] Built target main
```




