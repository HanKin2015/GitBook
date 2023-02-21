# 静态库lib和动态库dll
在Windows下不要想着使用gcc或者g++命令生成lib或者dll文件，好像这是不可能的事情。

乖乖的使用VS工具吧。

## lib
LIB有两种，一种是静态库，比如C-Runtime库，这种LIB中有函数的实现代码，一般用在静态连编上，它是将LIB中的代码加入目标模块(EXE或者DLL)文件中，所以链接好了之后，LIB文件就没有用了。一种LIB是和DLL配合使用的，里面没有代码，代码在DLL中，这种LIB是用在静态调用DLL上的，所以起的作用也是链接作用，链接完成了，LIB也没用了。至于动态调用DLL的话，根本用不上LIB文件。 目标模块（EXE或者DLL）文件生成之后，就用不着LIB文件了。

VS2019创建项目时有googletest、微软cppunittest、静态库、动态链接库等等，有这么好的工具为啥不利用呢。

C:\Users\Administrator\source\repos



