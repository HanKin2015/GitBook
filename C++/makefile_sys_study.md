# 系统学习Makefile

学习网站：https://seisman.github.io/how-to-write-makefile/overview.html

## 1、关于程序的编译和链接
一般来说，无论是C还是C++，首先要把源文件编译成中间代码文件，在Windows下也就是 .obj 文件，UNIX下是 .o 文件，即Object File，这个动作叫做编译（compile）。然后再把大量的Object File合成执行文件，这个动作叫作链接（link）。

编译时，编译器需要的是语法的正确，函数与变量的声明的正确。对于后者，通常是你需要告诉编译器头文件的所在位置（头文件中应该只是声明，而定义应该放在C/C++文件中），只要所有的语法正确，编译器就可以编译出中间目标文件。一般来说，每个源文件都应该对应于一个中间目标文件（ .o 文件或 .obj 文件）。

链接时，主要是链接函数和全局变量。所以，我们可以使用这些中间目标文件（ .o 文件或 .obj 文件）来链接我们的应用程序。链接器并不管函数所在的源文件，只管函数的中间目标文件（Object File），在大多数时候，由于源文件太多，编译生成的中间目标文件太多，而在链接时需要明显地指出中间目标文件名，这对于编译很不方便。所以，我们要给中间目标文件打个包，在Windows下这种包叫“库文件”（Library File），也就是 .lib 文件，在UNIX下，是Archive File，也就是 .a 文件。

总结一下，源文件首先会生成中间目标文件，再由中间目标文件生成执行文件。在编译时，编译器只检测程序语法和函数、变量是否被声明。如果函数未被声明，编译器会给出一个警告，但可以生成Object File。而在链接程序时，链接器会在所有的Object File中找寻函数的实现，如果找不到，那到就会报链接错误码（Linker Error），在VC下，这种错误一般是： Link 2001错误 ，意思说是说，链接器未能找到函数的实现。你需要指定函数的Object File。

## 2、智能的编译规则
如果这个工程没有编译过，那么我们的所有c文件都要编译并被链接。
如果这个工程的某几个c文件被修改，那么我们只编译被修改的c文件，并链接目标程序。
如果这个工程的头文件被改变了，那么我们需要编译引用了这几个头文件的c文件，并链接目标程序。

## 3、make工作流程
在默认的方式下，也就是我们只输入 make 命令。那么，

- make会在当前目录下找名字叫“Makefile”或“makefile”的文件。
- 如果找到，它会找文件中的第一个目标文件（target），在上面的例子中，他会找到“edit”这个文件，并把这个文件作为最终的目标文件。
- 如果edit文件不存在，或是edit所依赖的后面的 .o 文件的文件修改时间要比 edit 这个文件新，那么，他就会执行后面所定义的命令来生成 edit 这个文件。
- 如果 edit 所依赖的 .o 文件也不存在，那么make会在当前文件中找目标为 .o 文件的依赖性，如果找到则再根据那一个规则生成 .o 文件。（这有点像一个堆栈的过程）
- 当然，你的C文件和H文件是存在的啦，于是make会生成 .o 文件，然后再用 .o 文件生成make的终极任务，也就是执行文件 edit 了。

## 4、让make自动推导
GNU的make很强大，它可以自动推导文件以及文件依赖关系后面的命令，于是我们就没必要去在每一个 .o 文件后都写上类似的命令，因为，我们的make会自动识别，并自己推导命令。

只要make看到一个 .o 文件，它就会自动的把 .c 文件加在依赖关系中，如果make找到一个 whatever.o ，那么 whatever.c 就会是 whatever.o 的依赖文件。并且 cc -c whatever.c 也会被推导出来，于是，我们的makefile再也不用写得这么复杂。我们的新makefile又出炉了。
```
objects = main.o kbd.o command.o display.o \
    insert.o search.o files.o utils.o

edit : $(objects)
    cc -o edit $(objects)

main.o : defs.h
kbd.o : defs.h command.h
command.o : defs.h command.h
display.o : defs.h buffer.h
insert.o : defs.h buffer.h
search.o : defs.h buffer.h
files.o : defs.h buffer.h command.h
utils.o : defs.h

.PHONY : clean
clean :
    rm edit $(objects)
```
这种方法，也就是make的“隐晦规则”。上面文件内容中， .PHONY 表示 clean 是个伪目标文件。

```
不喜欢这种风格的，一是文件的依赖关系看不清楚，二是如果文件一多，要加入几个新的 .o 文件，那就理不清楚了。
objects = main.o kbd.o command.o display.o \
    insert.o search.o files.o utils.o

edit : $(objects)
    cc -o edit $(objects)

$(objects) : defs.h
kbd.o command.o files.o : command.h
display.o insert.o search.o files.o : buffer.h

.PHONY : clean
clean :
    rm edit $(objects)
	
	
	
clean:
    rm edit $(objects)
更为稳健的做法是：

.PHONY : clean
clean :
    -rm edit $(objects)
前面说过， .PHONY 表示 clean 是一个“伪目标”。而在 rm 命令前面加了一个小减号的意思就是，也许某些文件出现问题，但不要管，继续做后面的事。
```
Makefile中只有行注释，和UNIX的Shell脚本一样，其注释是用 # 字符。

## 5、Makefile的文件名
默认的情况下，make命令会在当前目录下按顺序找寻文件名为“GNUmakefile”、“makefile”、“Makefile”的文件，找到了解释这个文件。在这三个文件名中，最好使用“Makefile”这个文件名，因为，这个文件名第一个字符为大写，这样有一种显目的感觉。最好不要用“GNUmakefile”，这个文件是GNU的make识别的。有另外一些make只对全小写的“makefile”文件名敏感，但是基本上来说，大多数的make都支持“makefile”和“Makefile”这两种默认文件名。

当然，你可以使用别的文件名来书写Makefile，比如：“Make.Linux”，“Make.Solaris”，“Make.AIX”等，如果要指定特定的Makefile，你可以使用make的 -f 和 --file 参数，如： make -f Make.Linux 或 make --file Make.AIX 。

如果你的当前环境中定义了环境变量 MAKEFILES ，那么，make会把这个变量中的值做一个类似于 include 的动作。有时候你的Makefile出现了怪事，那么你可以看看当前环境中有没有定义这个变量。

## 6、书写规则
规则包含两个部分，一个是依赖关系，一个是生成目标的方法。

在Makefile中，规则的顺序是很重要的，因为，Makefile中只应该有一个最终目标，其它的目标都是被这个目标所连带出来的，所以一定要让make知道你的最终目标是什么。一般来说，定义在Makefile中的目标可能会有很多，但是第一条规则中的目标将被确立为最终的目标。如果第一条规则中的目标有很多个，那么，第一个目标会成为最终的目标。make所完成的也就是这个目标。
```
targets : prerequisites ; command
    command
    ...
```
command是命令行，如果其不与“target:prerequisites”在一行，那么，必须以 Tab 键开头，如果和prerequisites在一行，那么可以用分号做为分隔。

## 7、在规则中使用通配符
如果我们想定义一系列比较类似的文件，我们很自然地就想起使用通配符。make支持三个通配符： ```* ， ? 和 ~ 。这是和Unix的B-Shell是相同的。```

波浪号（ ~ ）字符在文件名中也有比较特殊的用途。如果是 ~/test ，这就表示当前用户的 $HOME 目录下的test目录。而 ~hchen/test 则表示用户hchen的宿主目录下的test 目录。（这些都是Unix下的小知识了，make也支持）而在Windows或是 MS-DOS下，用户没有宿主目录，那么波浪号所指的目录则根据环境变量“HOME”而定。

有时间继续学习：https://seisman.github.io/how-to-write-makefile/rules.html


