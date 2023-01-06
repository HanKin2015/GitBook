# taichi库

## 1、简介
感觉它就是“JIT+CUDA”的超强编译器，既具有“CUDA-C++”的超快速度，而且像numba.jit一样可以通过装饰器的方式使用，比较方便。

需要注意的是，Taichi跟原生PyTorch一样也不能基于Dataloader在dataset.__getitem__()中调用GPU来进行数据预处理。

Taichi具有以下库的同等作用：类似OpenCV：基本的图像处理操作；

CPU优化性能：比不上PyTorch。
Taichi只会优化最外层的for循环，这也许就是为什么Taichi给出的demo中常常会使用单层for循环的原因。

## 2、CUDA
CUDA（Compute Unified Device Architecture），是显卡厂商NVIDIA推出的运算平台。 CUDA™是一种由NVIDIA推出的通用并行计算架构，该架构使GPU能够解决复杂的计算问题。 它包含了CUDA指令集架构（ISA）以及GPU内部的并行计算引擎。 开发人员可以使用C语言来为CUDA™架构编写程序，所编写出的程序可以在支持CUDA™的处理器上以超高性能运行。CUDA3.0已经开始支持C++和FORTRAN。

CUDA 是 NVIDIA 发明的一种并行计算平台和编程模型。它通过利用图形处理器 (GPU) 的处理能力，可大幅提升计算性能。
目前为止基于 CUDA 的 GPU 销量已达数以百万计，软件开发商、科学家以及研究人员正在各个领域中运用 CUDA，其中包括图像与视频处理、计算生物学和化学、流体力学模拟、CT 图像再现、地震分析以及光线追踪等等。

https://zhuanlan.zhihu.com/p/396997244
https://blog.csdn.net/cyz0202/article/details/125026651

## 3、PyTorch
PyTorch是一个开源的Python机器学习库，基于Torch，用于自然语言处理等应用程序。
2017年1月，由Facebook人工智能研究院（FAIR）基于Torch推出了PyTorch。它是一个基于Python的可续计算包，提供两个高级功能：1、具有强大的GPU加速的张量计算（如NumPy）。2、包含自动求导系统的深度神经网络。
2022年9月，扎克伯格亲自宣布，PyTorch 基金会已新鲜成立，并归入 Linux 基金会旗下。

PyTorch的前身是Torch，其底层和Torch框架一样，但是使用Python重新写了很多内容，不仅更加灵活，支持动态图，而且提供了Python接口。它是由Torch7团队开发，是一个以Python优先的深度学习框架，不仅能够实现强大的GPU加速，同时还支持动态神经网络。
PyTorch既可以看作加入了GPU支持的numpy，同时也可以看成一个拥有自动求导功能的强大的深度神经网络。除了Facebook外，它已经被Twitter、CMU和Salesforce等机构采用。

## 4、import this
简洁和可读性是 Python 这门编程语言与生俱来遵循的哲学。事实上如果你在命令行模式下打开 Python，输入 import this
的话，会显示一段小诗：《python之禅》
```
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
```
“简单优于复杂，可读至关重要。”
毫无疑问，Python 在这两点上做得很成功：它堪称是目前最容易上手的编程语言，同样的功能用 Python 来实现，其代码量仅是用 C++ 实现所需代码量的五分之一到十分之一。然而 Python 也有自己的问题：通常情况下，它的性能会比同样功能的 C++ 代码慢 10-100 倍。看起来在简洁和效率之间，鱼与熊掌不可兼得，所有编程语言概莫能外。

## 5、Taichi: 应运而生
Taichi 编程语言的目的是让用户能够在 Python 中方便地编写高性能的并行计算程序。Taichi 编程语言是无缝嵌入在 Python 中的，它能最大程度地“压榨”机器的计算能力，充分利用多核 CPU 带来的计算优势。当然更重要的是，它能让你很方便地使用 GPU 进行一般的并行计算。

下图来自一段 Taichi 程序，这个程序使用 GPU 计算模拟了一块布料在重力作用下落在一个球上的效果，并将结果实时渲染出来，要知道写一个实时的基于 GPU 的物理仿真动画从来都不是件简单的事情，但是生成这个动画的 Taichi 程序却简单得让你惊掉下巴。本文接下来的内容将呈现制作动画的整个流程，相信大家可以从中感受 Taichi 的强大性能和使用 Taichi 开发的便利。

安装：pip install --upgrade taichi
如果你的机器有一个支持 CUDA 的 Nvidia 的 GPU 的话，那就太赞了，Taichi 程序会跑得飞起。你可以像下面这样指定 Taichi 运行在 CUDA 上面：ti.init(arch=ti.cuda)
如果你没有支持 CUDA 的 GPU 的话也没关系，Taichi 同样支持通过其它常见的图形 API 来调用 GPU 计算，你只要根据自己的情况把上面的 ti.cuda
改成 ti.metal
, ti.vulkan
或者ti.opengl，ti.init(arch=ti.cpu)


