# tcmalloc

## 1、记一次 TCMalloc Debug 经历
https://zhuanlan.zhihu.com/p/37696341
在版本2.9.1没有复现该任何例子，仅仅能看看。

最后决定使用对应版本试试看：
```
[ubuntu@hj_arm_debain10:~/hj/gperftools-2.6.1/.libs] $ cp libtcmalloc_debug.so.4.4.5 /usr/lib/libtcmalloc_debug.so.4
cp: cannot create regular file '/usr/lib/libtcmalloc_debug.so.4': Permission denied
[ubuntu@hj_arm_debain10:~/hj/gperftools-2.6.1/.libs] $ sudo cp libtcmalloc_debug.so.4.4.5 /usr/lib/libtcmalloc_debug.so.4
[ubuntu@hj_arm_debain10:~/hj/gperftools-2.6.1/.libs] $ sudo cp libtcmalloc.so.4.4.5 /usr/lib/libtcmalloc.so.4
[ubuntu@hj_arm_debain10:~/hj/gperftools-2.6.1/.libs] $ cd ../..
[ubuntu@hj_arm_debain10:~/hj] $ ./a.out
src/tcmalloc.cc:284] Attempt to free invalid pointer 0x5555e0508040
Aborted (core dumped)
```
最后的demo能复现，其余两个无法实现。


https://zhuanlan.zhihu.com/p/51432385

## 2、起因
修改代码测试的过程中偶现core在tcmalloc free，core出现的地方五花八门，有core在智能指针生命周期结束的时候，有的直接core在右值临时变量析构的时候。
排查过程
查看gperftools的issue，发现有很多人core在相同的地方，谷歌官方回复说这种错误的根因是因为程序的内存管理出了问题，比如访问已经被free的地址，double free等等。
顺着这个思路，一开始先入为主的认为是多线程竞态问题，改了好多代码，也用valgrind等方式查看内存错误。但是问题一直得不到解决。
最后把之前的改动bisect，找了好久，终于找到是某个字符串被double free了。