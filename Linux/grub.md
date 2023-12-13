# GRUB

## 1、简介
GNU GRUB（GRand Unified Bootloader简称“GRUB”）是一个来自[GNU](https://baike.baidu.com/item/GNU)项目的多[操作系统](https://baike.baidu.com/item/操作系统/192)启动程序。GRUB是多启动规范的实现，它允许用户可以在[计算机](https://baike.baidu.com/item/计算机/140338)内同时拥有多个[操作系统](https://baike.baidu.com/item/操作系统/192)，并在计算机启动时选择希望运行的操作系统。GRUB可用于选择[操作系统](https://baike.baidu.com/item/操作系统/192)分区上的不同[内核](https://baike.baidu.com/item/内核/108410)，也可用于向这些[内核](https://baike.baidu.com/item/内核/108410)传递启动参数。

有了这个会在启动电脑时会弹出选择操作系统选择提示框（多系统必备）
它是一个多重[操作系统](https://baike.baidu.com/item/操作系统)启动管理器。用来引导不同系统，如windows，linux。
GRand Unified Bootloader：宏伟的 统一的 引导加载程序。

在[X86架构](https://baike.baidu.com/item/X86架构)的机器中，Linux、[BSD](https://baike.baidu.com/item/BSD) 或其它Unix类的[操作系统](https://baike.baidu.com/item/操作系统)中GRUB、[LILO](https://baike.baidu.com/item/LILO) 是大家最为常用，应该说是主流。

Windows也有类似的工具NTLOADER；比如我们在机器中安装了Windows 98后，我们再安装一个Windows XP ，在机器启动的会有一个菜单让我们选择进入是进入Windows 98 还是进入Windows XP。NTLOADER就是一个多系统启动引导管理器，NTLOADER 同样也能引导Linux，只是极为麻烦罢了。

在[PowerPC](https://baike.baidu.com/item/PowerPC) 架构的机器中，如果安装了Linux的Powerpc 版本，大多是用yaboot 多重引导管理器，比如Apple机用的是IBM [PowerPC处理器](https://baike.baidu.com/item/PowerPC处理器)，所以在如果想在Apple机上，安装Macos 和Linux Powerpc 版本，大多是用yaboot来引导多个[操作系统](https://baike.baidu.com/item/操作系统)。

因为X86架构的机器仍是[主流](https://baike.baidu.com/item/主流)， 所以目前GRUB和LILO 仍然是我们最常用的多重[操作系统](https://baike.baidu.com/item/操作系统)引导管理器。

## 2、更改 GRUB 菜单字体大小
转载：https://mp.weixin.qq.com/s/GtjY3m3cbuIWCuozu70YqQ
不能简单地将 TTF、OTF、WOFF 等格式的字体直接用于 GRUB。相反，它使用扩展名为 PF2 的特定格式字体。它专门设计用于标准操作系统服务和驱动程序不可用的引导前环境。
幸运的是，用户可以借助 grub-mkfont 命令将几乎任何字体转换为 GRUB 兼容的格式。因此，我们的第一步是创建一个。
DejaVu Sans 是一个很好的选择，提供全面的字符支持。因此，请访问其官方网站，下载这个“dejavu-fonts-ttf-2.37.zip”，并解压缩该文件。您将在生成的“ttf”文件夹中找到许多字体变体，但我们感兴趣的文件是“DejaVuSansMono.ttf”。
```
sudo grub-mkfont -s 24 -o /boot/grub/dejavu-sans-mono.pf2 /home/linuxmi/www.linuxmi.com/ttf/DejaVuSansMono.ttf
```

GRUB 的默认值通常位于“/etc/default/grub”文件中。
在文件末尾添加以下行，指定 PF2 字体文件的绝对路径：
```
GRUB_FONT=/boot/grub/dejavu-sans-mono.pf2
```
进一步提升视觉吸引力，可以调整 GRUB 的分辨率，为菜单显示留出足够的空间。我们将选择 1600x1050 像素，通过“GRUB_GFXMODE”参数进行设置。
```
GRUB_GFXMODE=1600x1050
```
需要更新 GRUB 以使更改生效。通常使用以下命令完成此操作：
```
linuxmi@linuxmi:~/www.linuxmi.com$ sudo grub-mkconfig -o /boot/grub/grub.cfg
```
最后，重新启动系统以查看更改生效。

