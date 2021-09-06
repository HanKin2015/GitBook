# linux驱动编程

资料：https://blog.csdn.net/feixiaoxing/article/details/79913476

https://blog.csdn.net/feixiaoxing/article/details/8533822

## 1、linux加载insmod和卸载rmmod驱动
### 加载驱动模块
方法一： 
进入SHT21.ko驱动模块文件所在的目录，然后直接 
insmod SHT21.ko 
即可

方法二： 
将SHT21.ko文件拷贝到/lib/module/#uname -r#/目录下，这里，#uname -r#意思是，在终端中输入 
uname -r后显示的内核版本及名称，例如mini2440中#uname -r#就是2.6.32.2-FriendlyARM。

然后 
depmod（会在/lib/modules/#uname -r#/目录下生成modules.dep和modules.dep.bb文件，表明模块的依赖关系） 
最后 
modprobe SHT21（注意这里无需输入.ko后缀） 
即可

两种方法的区别：

modprobe和insmod类似，都是用来动态加载驱动模块的，区别在于modprobe可以解决load module时的依赖关系，它是通过/lib/modules/#uname -r/modules.dep(.bb)文件来查找依赖关系的；而insmod不能解决依赖问题。

也就是说，如果你确定你要加载的驱动模块不依赖其他驱动模块的话，既可以insmod也可以modprobe，当然insmod可以在任何目录下执行，更方便一些。而如果你要加载的驱动模块还依赖其他ko驱动模块的话，就只能将模块拷贝到上述的特定目录，depmod后再modprobe。

### 卸载驱动模块
rmmod lsmod显示的模块名称，而不是对应的ko文件名
lsmod


