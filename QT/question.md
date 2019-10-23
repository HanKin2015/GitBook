# 1、运行时提示无法启动进程错误

在左侧项目选项中=》构建项目是红色的=》选择项目的目录=》运行

# 2、QObject::connect: No such slot . 当信号与槽不能链接

 成员函数没有放到public slots里面，信号槽函数必须要放在这里。

# 3、error: 无法打开文件“d:\Qt\2010.05\qt\lib\qtmaind.lib”

vc的编译器， 而你安装的是mingw版本的qt。

工具-选项-构建和运行-构建套件，你应该是选择的是桌面（默认）。点击它，看看编译器那个框选择的是什么？默认选择的是M..V..C++(86)。编译方式从VS2010改成Mingw，就不会报错了

# 4、make时出现/usr/bin/ld: skipping incompatible

 一个是arm架构的，一个是x86架构的，当然不兼容了 