# volatile和sig_atomic_t

1).volatile

  影响编译器编译的结果,指出，volatile 变量是随时可能发生变化的，每次使用时都需要去内存里重新读取它的值,与volatile变量有关的运算，不要进行编译优化，以免出错，（VC++ 在产生release版可执行码时会进行编译优化，加volatile关键字的变量有关的运算，将不进行编译优化。）。 例如：

  volatile int i=10;

  int j = i;

  ...

  int k = i;

  volatile 告诉编译器i是随时可能发生变化的，每次使用它的时候必须从i的地址中读取，因而编译器生成的可执行码会重新从i的地址读取数据放在k中。 而优化做法是，由于编译器发现两次从i读数据的代码之间的代码没有对i进行过操作，它会自动把上次读的数据放在k中。而不是重新从i里面读。这样一来，如果i是一个寄存器变量或者表示一个端口数据就容易出错，所以说volatile可以保证对特殊地址的稳定访问，不会出错。

  建议使用volatile变量的场所：

  (1) 并行设备的硬件寄存器

  (2) 一个中断服务子程序中会访问到的非自动变量（全局变量）

  (3) 多线程应用中被几个任务共享的变量

2).volatile和__volatile__:
 a. volatile是C语言定义的关键字，gcc为了需要又定义了__volatile__，它和
  volatile表达的是同一意思。
 b. volatile的本意是"易变的"，由于访问寄存器的速度快于访存，所以编译器一般
  都会作优化以减少访存。如果变量加上volatile修饰，则编译器就不会对此变量
  的读写操作进行优化，即不通过寄存器缓冲而直接访存。
 c. __asm__ __volatile__一起指示编译器不要改动优化后面的汇编语句。

3).sig_atomic_t:

  当把变量声明为该类型是，则会保证该变量在使用或赋值时， 无论是在32位还是64位的机器上都能保证操作是原子的， 它会根据机器的类型自动适应。

  今天看源代码时，看到sig_atomic_t这个类型，平时用得较少，平时一般是用int类型来代替。

  这个类型是定义在signal.h文件中。下面来说说这个类型。

  在处理信号(signal)的时候，有时对于一些变量的访问希望不会被中断，无论是硬件中 断还是软件中断，这就要求访问或改变这些变量需要在计算机的一条指令内完成。通常情况下，int类型的变量通常是原子访问的，也可以认为 sig_atomic_t就是int类型的数据，因为对这些变量要求一条指令完成，所以sig_atomic_t不可能是结构体，只会是数字类型。

  在linux里这样定义：

  typedef int __sig_atomic_t;

  另外gnu c的文档也说比int短的类型通常也是具有原子性的，例如short类型。同时，指针（地址）类型也一定是原子性的。 该类型在所有gnu c库支持的系统和支持posix的系统中都有定义。

注：关于int型是不是原子的操作，看下面的gnu文档

##### http://www.gnu.org/s/hello/manual/libc/Atomic-Types.html

##### 24.4.7.2 Atomic Types

To avoid uncertainty about interrupting access to a variable, you can use a particular data type for which access is always atomic: `sig_atomic_t`. Reading and writing this data type is guaranteed to happen in a single instruction, so there's no way for a handler to run “in the middle” of an access.

The type `sig_atomic_t` is always an integer data type, but which one it is, and how many bits it contains, may vary from machine to machine.

— Data Type: **sig_atomic_t**

> This is an integer data type. Objects of this type are always accessed atomically.

In practice, you can assume that `int` is atomic. You can also assume that pointer types are atomic; that is very convenient. Both of these assumptions are true on all of the machines that the GNU C library supports and on all POSIX systems we know of.