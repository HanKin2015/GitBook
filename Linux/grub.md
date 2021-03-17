# GRUB

GNU GRUB（GRand Unified Bootloader简称“GRUB”）是一个来自[GNU](https://baike.baidu.com/item/GNU)项目的多[操作系统](https://baike.baidu.com/item/操作系统/192)启动程序。GRUB是多启动规范的实现，它允许用户可以在[计算机](https://baike.baidu.com/item/计算机/140338)内同时拥有多个[操作系统](https://baike.baidu.com/item/操作系统/192)，并在计算机启动时选择希望运行的操作系统。GRUB可用于选择[操作系统](https://baike.baidu.com/item/操作系统/192)分区上的不同[内核](https://baike.baidu.com/item/内核/108410)，也可用于向这些[内核](https://baike.baidu.com/item/内核/108410)传递启动参数。





- 有了这个会在启动电脑时会弹出选择操作系统选择提示框（多系统必备）
它是一个多重[操作系统](https://baike.baidu.com/item/操作系统)启动管理器。用来引导不同系统，如windows，linux。
GRand Unified Bootloader：宏伟的 统一的 引导加载程序









在[X86架构](https://baike.baidu.com/item/X86架构)的机器中，Linux、[BSD](https://baike.baidu.com/item/BSD) 或其它Unix类的[操作系统](https://baike.baidu.com/item/操作系统)中GRUB、[LILO](https://baike.baidu.com/item/LILO) 是大家最为常用，应该说是主流。

Windows也有类似的工具NTLOADER；比如我们在机器中安装了Windows 98后，我们再安装一个Windows XP ，在机器启动的会有一个菜单让我们选择进入是进入Windows 98 还是进入Windows XP。NTLOADER就是一个多系统启动引导管理器，NTLOADER 同样也能引导Linux，只是极为麻烦罢了。

在[PowerPC](https://baike.baidu.com/item/PowerPC) 架构的机器中，如果安装了Linux的Powerpc 版本，大多是用yaboot 多重引导管理器，比如Apple机用的是IBM [PowerPC处理器](https://baike.baidu.com/item/PowerPC处理器)，所以在如果想在Apple机上，安装Macos 和Linux Powerpc 版本，大多是用yaboot来引导多个[操作系统](https://baike.baidu.com/item/操作系统)。

因为X86架构的机器仍是[主流](https://baike.baidu.com/item/主流)， 所以目前GRUB和LILO 仍然是我们最常用的多重[操作系统](https://baike.baidu.com/item/操作系统)引导管理器。