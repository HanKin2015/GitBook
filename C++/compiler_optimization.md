# 编译器优化

参考资料：
https://blog.csdn.net/pyt1234567890/article/details/122907715
https://www.zhihu.com/question/443340911/answer/1720297063
https://zhuanlan.zhihu.com/p/381490718

## 1、简介
编译优化，会使编译器尝试以牺牲编译时间和调试程序的能力为代价，来提高性能或代码大小;
合理的优化级别,能够在代码体积、执行性能、RAM占有率上获得均衡！
https://gcc.gnu.org/onlinedocs/gcc/Optimize-Options.html

## 2、编译器优化选项
具体介绍见：https://www.zhihu.com/question/443340911/answer/1720297063

- O0（默认选项）：不开启优化，方便功能调试
- Og：方便调试的优化选项（比O1更保守）
- O1：保守的优化选项，打开了四十多个优化选项
- O2：常用的发布优化选项，在O1的基础上额外打开了四十多个优化选项，包括自动内联等规则
- Os：产生较小代码体积的优化选项（比O2更保守）
- O3：较为激进的优化选项（对错误编码容忍度最低），在O2的基础上额外打开了十多个优化选项
- Ofast：打开可导致不符合IEEE浮点数等标准的性能优化选项。

## 3、怀疑stripped字段与编译器优化选项有关
```
[root@ubuntu0006:/media/hankin/vdb/boost] #g++ hello_boost.cpp
[root@ubuntu0006:/media/hankin/vdb/boost] #file a.out
a.out: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 2.6.32, BuildID[sha1]=d8269ba20e19f1a9739a3c2518e22ba6161e2051, not stripped
[root@ubuntu0006:/media/hankin/vdb/boost] #g++ hello_boost.cpp -g
[root@ubuntu0006:/media/hankin/vdb/boost] #file a.out
a.out: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 2.6.32, BuildID[sha1]=ca512680f25cc529401f876d923a72628426a1e2, not stripped
```
能看见not stripped字段。gcc -O0123都没有改变这个值。

上面例子可以看出是否能调试跟not stripped无关？？？但是实际项目中如果是stripped就不包含符号表信息。

## 4、Debug模式和Release模式区别
编译器有这么多优化级别，Debug版本和Release版本其实就是优化级别的区别，Debug称为调试版本，编译的结果通常包含有调试信息，没有做任何优化，方便开发人员进行调试，Release称为发布版本，不会携带调试信息，同时编译器对代码进行了很多优化，使代码更小，速度更快，发布给用户使用，给用户使用以更好的体验。但Release模式编译比Debug模式花的时间也会更多。Debug模式下在内存分配上有所区别，在我们申请内存时，Debug模式会多申请一部分空间，分布在内存块的前后，用于存放调试信息。对于未初始化的变量，Debug模式下会默认对其进行初始化，而Release模式则不会，所以就有个常见的问题，局部变量未初始化时，Debug模式和Release模式表现有所不同。

作者：程序喵大人
链接：https://www.zhihu.com/question/443340911/answer/1720297063
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。











