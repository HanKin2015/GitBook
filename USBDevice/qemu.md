# qemu

## 1、官网
官网：http://wiki.qemu.org/Main_Page
官网：https://www.qemu.org/contribute/
代码仓库：https://gitlab.com/qemu-project/qemu

15.7 MB Files 805.9 GB Storage
不能被这些数字迷惑，实际下载大小约为211.87 MiB（20210526）
 git clone https://gitlab.com/qemu-project/qemu.git
 
v5.0.0       Apr 29, 2020
v5.0.0-rc0   Mar 25, 2020
v2.5.1       Mar 30, 2016

基本上都是x.0.0~x.2.0版本命名方式

一次有趣的代码贡献：https://gitlab.com/qemu-project/qemu/-/issues/491

## 2、简介
VMWare Workstation 就是这样一个可以完美满足我要求的桌面用户最满意的虚拟机。我经常使用它来折腾各个 Linux 发行版，而且运行流畅。当然，在 Linux 这个开源的世界我们是不该去使用破解版这样的东西的。不过不用担心，在 Linux 江湖中，还有 VirtualBox、QEMU 这样的虚拟机软件可用。

QEMU 本身是一个非常强大的虚拟机，甚至在 Xen、KVM 这些虚拟机产品中都少不了 QEMU 的身影。在 QEMU 的官方文档中也提到，QEMU 可以利用 Xen、KVM 等技术来加速。为什么需要加速呢，那是因为如果单纯使用 QEMU 的时候，它自己模拟出了一个完整的个人电脑，它里面的 CPU 啊什么的都是模拟出来的，它甚至可以模拟不同架构的 CPU，比如说在使用 Intel X86 的 CPU 的电脑中模拟出一个 ARM 的电脑或 MIPS 的电脑，这样模拟出的 CPU 的运行速度肯定赶不上物理 CPU。使用加速以后呢，可以把客户操作系统的 CPU 指令直接转发到物理 CPU，自然运行效率大增。

QEMU 同时也是一个非常简单的虚拟机，给它一个硬盘镜像就可以启动一个虚拟机，如果想定制这个虚拟机的配置，比如用什么样的 CPU 啊、什么样的显卡啊、什么样的网络配置啊，指定相应的命令行参数就可以了。它支持许多格式的磁盘镜像，包括 VirtualBox 创建的磁盘镜像文件。它同时也提供一个创建和管理磁盘镜像的工具 qemu-img。QEMU 及其工具所使用的命令行参数，直接查看其文档即可。

Intel Core i7-4770K 的 CPU，虚拟出的 XP 也分配了 2G 的内存和两个 CPU，但是流畅度仍较差。说明单纯使用 QEMU 还是不能满足我们桌面用户的需要。配合Xen 或者 KVM 呢？性能是否会有质的飞跃？

QEMU 是一个强大的虚拟机软件，它可以完全以软件的形式模拟出一台完整的电脑所需的所有硬件，甚至是模拟出不同架构的硬件，在这些虚拟的硬件之上，可以安装完整的操作系统。
强烈推荐这篇文章：https://www.cnblogs.com/sunylat/p/6217536.html

为了提高虚拟机软件的性能，开发者们各显神通。其中，最常用的办法就是在主操作系统中通过内核模块开一个洞，通过这个洞将虚拟机中的操作直接映射到物理硬件上，从而提高虚拟机中运行的操作系统的性能。

在社区中，大家常把 KVM 和 Xen 相提并论，但是它们其实完全不一样。从上图可以看出，使用内核模块加速这种模式，主操作系统仍然占主导地位，内核模块只是在主操作系统中开一个洞，用来连接虚拟机和物理硬件，给虚拟机加速，但是虚拟机中的客户操作系统仍然受到很大的限制。这种模式比较适合桌面用户使用，主操作系统仍然是他们的主战场，不管是办公还是打游戏，都通过主操作系统完成，客户操作系统只是按需使用。至于 Xen，则完全使用不同的理念，比较适合企业级用户使用，桌面用户就不要轻易去碰了。

guest----host

DKMS简介
我们都知道，如果要使用没有集成到内核之中的Linux驱动程序需要手动编译。当然，这并不是一件什么难事，即使是对于没有编程经验的Linux使用者，只要稍微有点hacker的意识，努力看看代码包里的Readme或者INSTALL文件，按部就班的执行几条命令还是很容易办到的。但这里还有一个问题，Linux模块和内核是有依赖关系的，如果遇到因为发行版更新造成的内核版本的变动，之前编译的模块是无法继续使用的，我们只能手动再编译一遍。这样重复的操作有些繁琐且是反生产力的，而对于没有内核编程经验的使用者来说可能会造成一些困扰，使用者搞不清楚为什么更新系统之后，原来用的好好的驱动程序突然就不能用了。这里，就是Dell创建的DKMS项目的意义所在。DKMS全称是Dynamic Kernel Module Support，它可以帮我们维护内核外的这些驱动程序，在内核版本变动之后可以自动重新生成新的模块。

KVM 和 QEMU 是相辅相成的，QEMU 可以使用 KVM 内核模块加速，而 KVM 需要使用 QEMU 运行虚拟机。从上图可以看到，如果要使用 Ubuntu 的包管理软件安装 KVM，其实安装的就是 qemu-kvm。而 qemu-kvm 并不是一个什么很复杂的软件包，它只包含很少量几个文件，如下图：
用 man 命令查看一下它的文档，发现 qemu-kvm 包不仅包含的文件很少，而且它的可执行文件 kvm 也只是对 qemu-system-x86_64 命令的一个简单包装

可以这么说，如果没有 VirtualBox 的话，QEMU+KVM 的组合应该是桌面用户的首选。下一篇我将尝试 VirtualBox，VirtualBox 号称是最强大的开源虚拟机系统。

第三方虚拟机管理工具 virt-manager

而且 VirtualBox 并不仅仅适用于桌面用户，对于企业级的应用，它也是可以的。

dpkg -L 命令
Xen 具有非常高的难度，别说玩转，就算仅仅只是理解它，都不是那么容易。

在 Xen 中，则根本没有 Host System 的概念，传说它所有的虚拟机都直接运行于硬件之上，虚拟机运行的效率非常的高，虚拟机之间的隔离性非常的好。

当然，传说只是传说。我刚开始也是很纳闷，怎么可能让所有的虚拟机都直接运行于硬件之上。后来我终于知道，这只是一个噱头。虚拟机和硬件之间，还是有一个管理层的，那就是 Xen Hypervisor。当然 Xen Hypervisor 的功能毕竟是有限的，怎么样它也比不上一个操作系统，因此，在 Xen Hypervisor 上运行的虚拟机中，有一个虚拟机是具有特权的，它称之为 Domain 0，而其它的虚拟机都称之为 Domain U。

既然 Domain 0 也是一个虚拟机，也是被管理的对象，所以可以给它分配很少的资源，然后将其余的资源公平地分配到其它的 Domain。但是很奇怪的是，所有的虚拟机管理软件其实都是运行在这个 Domain 0 中的。同时，如果要连接到其它 Guest System 的控制台，而又不是使用远程桌面（VNC）的话，这些控制台也是显示在 Domian 0 中的。所以说，这是一个奇异的架构，是一个让人很不容易理解的架构。

　　这种架构桌面用户不喜欢，因为 Host System 变成了 Domain 0，本来应该掌控所有资源的主操作系统变成了一个受管理的虚拟机，本来用来打游戏、编程、聊天的主战场受到限制了，可能不能完全发挥硬件的性能了，还有可能运行不稳定了，自然会心里不爽。（Domain 0确实不能安装专用显卡驱动，确实会运行不稳定，这个后面会讲。）但是企业级用户喜欢，因为所有的 Domain 都是虚拟机，所以可以更加公平地分配资源，而且由于 Domain U 不再是运行于 Domian 0 里面的软件，而是和 Domain 0 平级的系统，这样即使 Domain 0 崩溃了，也不会影响到正在运行的 Domain U。（真的不会有丝毫影响吗？我表示怀疑。）

1.Xen 虚拟机不应该是桌面用户的首选，因为它架构比较奇异不容易理解，可能因内核升级而出现不稳定，不能充分发挥桌面硬件的性能，比如显卡；桌面用户还是应该首选 VirtualBox。

　　2.企业及客户可以考虑 Xen，因为它可以提供较好的性能和隔离性，企业级用户不需要桌面用户那么多的功能，所以可以把 Domain 0 做到很薄，可以完全不要图形界面，也不用经常升级内核，甚至可以选择一个经过修改优化的内核，这样就可以在一套硬件上运行尽可能多的虚拟机。

## 3、在qemu中模拟设备
https://zhuanlan.zhihu.com/p/57526565

MemoryRegion 存储区域

硬件模拟无外乎两个东西，一个是中断，一个是IO访问。

中断很简单，知道中断号，用qemu_set_irq()或者qemu_irq_pluse()往里种就可以了。

MemoryRegion：这表示一组面向Guest的，具有相同属性的内存区。后面简称MR。系统有全局的总MR，你直接用get_system_memory()就可以拿到了。所以你实际上任何时候都可以访问全局任何内存。

MemoryRegionCache：这表示一片为了满足Guest需要的一片临时的“真内存”。换句话说，MemoryRegion是描述一片内存区，MemoryRegionCache是真的要用的内存，Hypervisor根据需要动态申请，后面简称MRC。如果你不是要深入定制，一般你不管这个东西没有任何问题。

AddressSpace：这表示一个地址空间，一个地址空间可以包含多个不同属性的MR。后面简称AS。AS是和MR直接对应的，所以你可以直接用address_space_memory拿到对应get_system_memory()的AS。

FlatView：这表示看到的地址空间。这就比较绕了。这么说：AS是立体的，里面的MR是相互独立的，他们可以交叠，转义，动态开关等。但当你去访问的时候，某个时刻，某个物理地址总是对应着某个MR中的地址，FlatView用来表示层叠的结果。后面这个简称FV。FV大部分时候写设备模拟的时候都不用管，它是用于深入处理Host这边访问内存的时候用的，比如通过address_space_to_flatview(as)把as换成fv，然后用flatview_read/write()进行本地内存访问。

memory_region_init_io(&iomr, owner, ops, priv, name, size);

## 4、理解qemu中的xhci实现
qemu/hw/usb/hcd-xhci.c
->static void usb_xhci_realize(struct PCIDevice *dev, Error **errp)

api文档：https://qemu.readthedocs.io/en/latest/devel/memory.html

```
void memory_region_init_io(MemoryRegion *mr, Object *owner, const MemoryRegionOps *ops, void *opaque, const char *name, uint64_t size)

Initialize an I/O memory region.

Description

Accesses into the region will cause the callbacks in ops to be called. if size is nonzero, subregions will be clipped to size.

void memory_region_init_io(MemoryRegion *mr,
                           Object *owner,
                           const MemoryRegionOps *ops,
                           void *opaque,
                           const char *name,
                           uint64_t size)
{
    memory_region_init(mr, owner, name, size);
    mr->ops = ops ? ops : &unassigned_mem_ops;
    mr->opaque = opaque;
    mr->terminates = true;
}

>>>>>>>>>>>>>>>>>>>>>>>>>>>>

void memory_region_add_subregion(MemoryRegion *mr, hwaddr offset, MemoryRegion *subregion)

Add a subregion to a container.

>>>>>>>>>>>>>>>>>>>>>>>>>>>>

void memory_region_init(MemoryRegion *mr, Object *owner, const char *name, uint64_t size)

Initialize a memory region
```

qemu中：
```
#define MAXSLOTS 64
#define LEN_DOORBELL    ((MAXSLOTS + 1) * 0x20)

static const MemoryRegionOps xhci_doorbell_ops = {
    .read = xhci_doorbell_read,
    .write = xhci_doorbell_write,
    .valid.min_access_size = 4,
    .valid.max_access_size = 4,
    .endianness = DEVICE_LITTLE_ENDIAN,
};

memory_region_init_io(&xhci->mem_doorbell, OBJECT(xhci), &xhci_doorbell_ops, xhci,
                          "doorbell", LEN_DOORBELL);

可以看出LEN_DOORBELL不为0

#define OFF_DOORBELL    0x2000
memory_region_add_subregion(&xhci->mem, OFF_DOORBELL, &xhci->mem_doorbell);
```

后面就太多了，发现这样也并没有什么意义。
```
memory_region_dispatch_write

memory_region_write_accessor

mr->ops->write(mr->opaque, addr, tmp, size);

[root@chroot <vtcompile> ~/buildenv/Trunk/source/app/qemu/qemu-2.5.1 ]#grep -R memory_region_dispatch_write
exec.c:                    result |= memory_region_dispatch_write(mr, addr1, val, 8,
exec.c:                    result |= memory_region_dispatch_write(mr, addr1, val, 4,
exec.c:                    result |= memory_region_dispatch_write(mr, addr1, val, 2,
exec.c:                    result |= memory_region_dispatch_write(mr, addr1, val, 1,
exec.c:        r = memory_region_dispatch_write(mr, addr1, val, 4, attrs);
exec.c:        r = memory_region_dispatch_write(mr, addr1, val, 4, attrs);
exec.c:        r = memory_region_dispatch_write(mr, addr1, val, 2, attrs);
memory.c:MemTxResult memory_region_dispatch_write(MemoryRegion *mr,
hw/s390x/s390-pci-inst.c:        memory_region_dispatch_write(mr, offset, data, len,
hw/s390x/s390-pci-inst.c:        memory_region_dispatch_write(mr, env->regs[r3] + i * 8,
hw/vfio/pci-quirks.c.bak:                memory_region_dispatch_write(&vdev->pdev.msix_table_mmio,
hw/vfio/pci-quirks.c:                memory_region_dispatch_write(&vdev->pdev.msix_table_mmio,
Binary file x86_64-softmmu/qemu-system-x86_64 matches
Binary file x86_64-softmmu/memory.o matches
Binary file x86_64-softmmu/hw/vfio/pci-quirks.o matches
Binary file x86_64-softmmu/exec.o matches
Binary file x86_64-softmmu/cputlb.o matches
Binary file root@10.70.22.175 matches
include/exec/memory.h: * memory_region_dispatch_write: perform a write directly to the specified
include/exec/memory.h:MemTxResult memory_region_dispatch_write(MemoryRegion *mr,
softmmu_template.h:    memory_region_dispatch_write(mr, physaddr, val, 1 << SHIFT,
```

## 5、追踪CR_STOP_ENDPOINT命令
gdb调试打印全部堆栈：
```
pidof kvm
gdb qemu-system-x86_64 -p 1234
b memory_region_dispatch_write(不推荐太多)
b xhci_process_commands
handle SIGPIPE nostop(必须要有这个，不然c后就断了)
c

(gdb) bt
#0  xhci_process_commands (xhci=0x5600a5a6e000) at hw/usb/hcd-xhci.c:2690
#1  0x000056009ea71881 in memory_region_write_accessor (mr=<optimized out>, addr=<optimized out>, value=<optimized out>, size=<optimized out>, shift=<optimized out>,
    mask=<optimized out>, attrs=...) at /home/vtcompile/buildenv/Trunk/source/app/qemu/qemu-2.5.1/memory.c:451
#2  0x000056009ea719cb in access_with_adjusted_size (addr=addr@entry=0, value=value@entry=0x7f656bbea958, size=size@entry=4, access_size_min=<optimized out>,
    access_size_max=<optimized out>, access=access@entry=0x56009ea71850 <memory_region_write_accessor>, mr=mr@entry=0x5600a5a6ed50, attrs=attrs@entry=...)
    at /home/vtcompile/buildenv/Trunk/source/app/qemu/qemu-2.5.1/memory.c:507
#3  0x000056009ea73400 in memory_region_dispatch_write (mr=mr@entry=0x5600a5a6ed50, addr=0, data=0, size=size@entry=4, attrs=attrs@entry=...)
    at /home/vtcompile/buildenv/Trunk/source/app/qemu/qemu-2.5.1/memory.c:1159
#4  0x000056009ea2cb5e in address_space_rw (as=0x56009f421c80, addr=4227948544, attrs=..., buf=buf@entry=0x7f6580d6e028 "", len=4, is_write=true)
    at /home/vtcompile/buildenv/Trunk/source/app/qemu/qemu-2.5.1/exec.c:2551
#5  0x000056009ea704b8 in kvm_cpu_exec (cpu=cpu@entry=0x5600a3a48000) at /home/vtcompile/buildenv/Trunk/source/app/qemu/qemu-2.5.1/kvm-all.c:3123
#6  0x000056009ea57344 in qemu_kvm_cpu_thread_fn (arg=0x5600a3a48000) at /home/vtcompile/buildenv/Trunk/source/app/qemu/qemu-2.5.1/cpus.c:1066
#7  0x00007f657a2d6b50 in start_thread () from /lib/x86_64-linux-gnu/libpthread.so.0
#8  0x00007f657a020a7d in clone () from /lib/x86_64-linux-gnu/libc.so.6
#9  0x0000000000000000 in ?? ()
```

## 6、根据google查找原因
google：xhci: FIXME: endpoint stopped w/ xfers running, data might be lost

https://bugzilla.redhat.com/bugzilla/show_bug.cgi?id=980833

passthrough：透传;通过;直通;穿过;经过
stick：枝条;枯枝;柴火棍儿;球棍;条状物;棍状物

他使用了一个金士顿2.0的U盘（0951:1642 Kingston Technology DT101 G2）挂载到xhci主控，然后将U盘分区格式化成ext4文件系统。
```
fdisk -l
设备       启动  起点     末尾     扇区  大小 Id 类型
/dev/sda1  *     2048 61439999 61437952 29.3G  7 HPFS/NTFS/exFAT


设备       启动  起点     末尾     扇区  大小 Id 类型
/dev/sda1  *     2048 61439999 61437952 29.3G  7 HPFS/NTFS/exFAT
root@ubuntu180001:~# mkfs.ext4 /dev/sda1
mke2fs 1.44.1 (24-Mar-2018)
/dev/sda1 有一个 ntfs 文件系统
Proceed anyway? (y,N) y
/dev/sda1 已经挂载； 取消建立 文件系统 ！
root@ubuntu180001:~# umount !$
umount /dev/sda1
root@ubuntu180001:~# mkfs.ext4 /dev/sda1
mke2fs 1.44.1 (24-Mar-2018)
/dev/sda1 有一个 ntfs 文件系统
Proceed anyway? (y,N) y
创建含有 7679744 个块（每块 4k）和 1921360 个inode的文件系统
文件系统UUID：a1a426ab-d82b-4dca-88e8-f3590bd056ce
超级块的备份存储于下列块：
        32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
        4096000

正在分配组表： 完成
正在写入inode表： 完成
创建日志（32768 个块） 完成
写入超级块和文件系统账户统计信息： 已完成
```

然鹅并没有复现问题。

## os-posix:273 kvm: -device nec-usb-xhci,id=xhci,bus=pci.0,addr=0x1b.0x0: 'nec-usb-xhci' is not a valid device model name
发现是qemu文件被重定向了，即qemu文件中没有放开xhci主控端口数量。

## ovirt几种网卡（e1000, rtl8139, virtio）的简要说明
ovirt创建网卡时候有3种选择，分别是e1000, rtl8139, virtio。

“rtl8139”这个网卡模式是qemu-kvm默认的模拟网卡类型，RTL8139是Realtek半导体公司的一个10/100M网卡系列，是曾经非常流行（当然现在看来有点古老）且兼容性好的网卡，几乎所有的现代操作系统都对RTL8139网卡驱动的提供支持。
“e1000”系列提供Intel e1000系列的网卡模拟，纯的QEMU（非qemu-kvm）默认就是提供Intel e1000系列的虚拟网卡。
“virtio” 类型是qemu-kvm对半虚拟化IO（virtio）驱动的支持。
virtio网卡数据交换性能大幅度领先平台上的e1000网卡和rtl8139网卡，一般情况下都建议使用virtio网卡。e1000网卡虽然性能比较差，但是兼容性比较好，有时候需要定位问题就要将网卡切换成e1000。

这三个网卡的最大区别(此处指最需要关注的地方)是速度：
rtl8139 10/100Mb/s
e1000 1Gb/s
virtio 10Gb/s

注意virtio是唯一可以达到10Gb/s的，根据文献一，其iperf测试速率可达到9.4。文献1还提到如果virtio配置不合理速度只能达到3.6。不用担心这个情况，经查验ovirt自己生成的虚拟机配置都是合理的。（ use ‘-device virtio-net-pci’ option）

当然这并不意味着rtl8139和e1000是没有意义的，毕竟virtio需要在guest上面安装驱动。rtl8139和e1000在兼容的广泛度上占有优势。例如，如果ovirt的cpu不是x86，而是arm或者其它某些系列cpu，上述网卡未必全部支持。这点需要注意。

virtio-net-pci

## 7、在ubuntu下使用虚拟机
https://zhuanlan.zhihu.com/p/32125940
https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/virtualization_deployment_and_administration_guide/sect-graphic_user_interface_tools_for_guest_virtual_machine_management-remote_viewer

## 8、Freedesktop.org 
致力于Linux和其他类Unix上的X窗口系统的桌面环境之间的互操作性和基础技术共享的项目
freedesktop.org（fd.o）是一个致力于Linux和其他类Unix上的X窗口系统的桌面环境之间的互操作性和基础技术共享的项目。
外文名Freedesktop.org成立时间2000年3月
由红帽的HavocPennington于2000年3月创立。
该组织关注用户。X有很多开发框架，将来很可能也这样。而该组织力求这其中的不同不会为最终用户所察觉。
最流行的开源X桌面——GNOME、KDE和Xfce都与该项目紧密合作。在2006年该项目发布了Portland1.0(xdg-utils)，一个常用的桌面环境接口的集合。
freedesktop.org最初的名称叫XDesktopGroup（X桌面工作组），其缩写"XDG"在他们的工作中仍然经常被用到。

github：https://github.com/freedesktop/spice-usbredir

## 9、提高bulk设备传输速度
网络问题无法进行优化
bulk流只对in包有效，烧录是往设备里面写数据，因此是out包。
修改端口的maxsize会有枚举问题，并且实际上跟这个无关，因为设备又不是根据这个进行发包的。
可以修改设备描述符中maxsize值，可以提供映射速度。

## 10、pipeline变量
翻译成管道或者流水线。

AI回答：在QEMU中，USBEndpoint结构体中的pipeline变量通常用于控制USB数据包的传输流程。当pipeline变量为false时，表示数据包的传输是单向的，即只能进行数据的接收或发送。而当pipeline变量为true时，表示数据包的传输是双向的，即可以进行数据的接收和发送。这个变量的取值影响着USB数据包在端点中的传输方式，根据其取值不同，USB设备模拟会采取相应的传输逻辑来处理数据包的接收和发送。

不是很准确，通过代码来看pipeline默认为true时，bulk数据包会进行分包，把一个大包分成若干个小包，然后会进行分包和组包过程。
在combined-packet.c文件中usb_combined_input_packet_complete函数。

实践发现，设置pipeline为false后，整体数据包传输速度变慢，数据包大小也变小了。

## 11、键盘按键适配

### 11-1、qemu不同版本现状
KeyboardTest工具下载：https://www.passmark.com/products/keytest/index.php
通过qemu的qemu_input_map_qnum_to_qcode的qnum序列来查找
资料：https://aeb.win.tue.nl/linux/kbd/scancodes-6.html#msinternet

发现qemu2.5的Q_KEY_CODE_MAX = 125，而适配的韩语切换按键是242，因此在低版本的qemu无法进行适配。但确实也能在ui/sdl2-keymap.h搜索到Q_KEY_CODE_MAIL变量，但是却无法找到该变量的定义。但是有个问题就是242这个按键消息确实传递到了虚拟机内部，只不过显示为0xFF，说明应该是支持的，说明有遗漏。
但是在qemu5.0.0版本中，242按键消息是没有发给虚拟机的，需要进行适配，需要修改qemu-5.0.0/ui/keycodemapdb/data/keymaps.csv、qemu-5.0.0/qapi/ui.json文件。
ui.json：是按键宏定义的配置文件，qemu编译时，根据里面配置生成qapi-util-ui.c文件，该文件定义了所有按键的宏定义，比如：上面截图的Q_KEY_CODE_XXX。
keymaps.csv：各种按键的转换表，qemu编译时，根据这边的内容生成input-keymap-qnum-to-qcode.c、input-keymap-qcode-to-atset2.c等源码，生成qcode、atset等按键表。

### 11-2、input-keymap-qnum-to-qcode.c文件内容生成
keymaps.csv文件中对于242并没有填写atset1和atset2信息，导致并没有生成到input-keymap-qnum-to-qcode.c文件中去。
该文件通过qemu-5.0.0/ui/keycodemapdb/keymap-gen脚本生成，命令如下：
```
python3 keymap-gen --lang=glib2 --varname=qemu_inpu_map_atset1_to_qcode code-map data/keymaps.csv atset1 qcode
可以修改最后两个参数变量
```
添加atset1和atset2信息后就能把该按键信息生成了，但问题在于242按键的atset1和atset2信息是多少？

### 11-3、atset1和atset2表
atset2 keycodes：https://www.libvirt.org/manpages/
https://blog.weghos.com/qemu/qemu/build/ui/input-keymap-atset1-to-qcode.c.html
发现atset1和atset2信息表最大值只到了0xe07d值。

发现github和gitlab仓库显示内容略有不同（github打不开keycodemapdb，但是gitlab可以）
https://gitlab.com/qemu-project/qemu/-/tree/stable-8.0/ui?ref_type=heads
https://github.com/qemu/qemu/tree/stable-8.0/ui

开源qemu最终版：
https://gitlab.com/qemu-project/keycodemapdb

github单独仓库：
https://github.com/qemu/keycodemapdb/blob/master/data/keymaps.csv

最终适配方案：
```
KEY_VIDEO_NEXT,241,,,0xe071,0x19,,,VK_HANJA,0x19,,,,,,I249,hanja,,
KEY_VIDEO_PREV,242,,,0xe072,0x39,,,VK_HANGEUL,0x15,,,,,,I250,hangeul,,
```

### 11-4、适配依据
至少atset1和atset2缺一不可，这也是最难获取到的值，其中VK_HANJA,0x19和VK_HANGEUL,0x15可以通过rawinputtool.exe程序获取，使用spy++不行，使用KeyboardTest.exe软件获取到了0x19，另外一个值是0xE5，有点差距。

对于atset1值，我们可以通过qemu2.5.1发现其qcode分别是113（0x71）和114（0x72），另外我们在https://www.libvirt.org/manpages/virkeycode-qnum.html找到其值。


