[TOC]

# 1、介绍os-release文件

详情看：[os-release 中文手册]( http://www.jinbuguo.com/systemd/os-release.html )

应用程序应该只读取 `/etc/os-release` 文件， 仅在 `/etc/os-release` 不存在的情况下， 才可以读取 `/usr/lib/os-release` 文件。 绝对禁止应用程序同时读取两个文件。 操作系统发行商应该将操作系统识别数据存放在 `/usr/lib/os-release` 文件中， 同时将 `/etc/os-release` 作为一个软连接， 以相对路径的方式指向 `/usr/lib/os-release` 文件， 以提供应用程序读取 `/etc` 的兼容性。 软连接使用相对路径是为了避免在 chroot 或 initrd 环境中失效。

`os-release` 的内容应当仅由发行版的供应商设置， 系统管理员一般不应该修改此文件。

因为此文件仅用于操作系统识别， 所以必须禁止包含任何需要本地化的内容(也就是禁止包含非ASCII字符)。

`/etc/os-release` 与 `/usr/lib/os-release` 可以是软连接， 但是必须全部位于根文件系统上， 以确保在系统刚启动时即可读取其内容。



- 相对路径的软链接可以避免chroot时失效
- /etc/os-release是一个软链接，实际文件在/usr/lib/os-release
-  ID：小写字母表示的操作系统名称， 该字段适合被程序或脚本解析，也可用于生成文件名。 
- ID_LIKE： 一系列空格分隔的字符串， 其中的每一项都符合 `ID=` 字段的规范， 也就是仅包含 0–9, a–z, ".", "_", "-" 字符。 此字段用于表明当前的操作系统 是从哪些"父发行版"派生而来， 切勿列出从此发行版派生的"子发行版"， 排列顺序由近到远， 关系最近的发行版名称排在最前， 紧密度依次递减。 应用程序如果不能识别 `ID=` 字段的内容， 那么可以参考此字段。 这是可选字段。  比如对于 "`ID=centos`"来说， "`ID_LIKE="rhel fedora"`" 就是一个合理的设置。 而对于 "`ID=ubuntu`" 来说， "`ID_LIKE=debian`" 也很合理。 







https://mangolassi.it/topic/18210/restarting-networking-service-fails-ubuntu-16-04/9



# 2、查看Linux系统的发行版本

居然有Linux系统查看不到详细的版本。。。。。目前找到以下五种查看方式。

1. /etc/issue 和 /etc/redhat-release都是系统安装时默认的发行版本信息，通常安装好系统后文件内容不会发生变化。lsb_release -a   ===  cat /etc/redhat_release。

2. lsb_release -a ：FSG（Free Standards Group）组织开发的LSB (Linux Standard Base)标准的一个命令，用来查看linux兼容性的发行版信息。

3. /proc/version 和 uname -a 显示的内容相同，显示[linux内核](https://www.baidu.com/s?wd=linux内核&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)版本号。

关于lsb_release -a和/etc/issue显示的发行版本号不同，原因只有一个：系统内核手动升级了。 

4. 





















