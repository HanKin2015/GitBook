# tar.gz.sig文件
网上一些下载资源会同时提供下载资源名称加".sig"为文件名的分离（数字）签名文件，用来校验下载资源的完整性。

## 实战
文件下载地址1：http://alpha.gnu.org/gnu/grub/
文件下载地址2：https://ftp.pcre.org/pub/pcre/

以pcre为例。

```
[root@ubuntu0006:/media/hankin/vdb/swig] #ll
总用量 10172
drwxr-xr-x  3 root      root         4096 7月  26 21:52 ./
drwxrwxrwx 25 root      root         4096 7月  26 21:41 ../
-rw-r--r--  1 root      root      2299767 7月  26 21:51 pcre2-10.37.tar.gz
-rw-r--r--  1 root      root          310 7月  26 21:52 pcre2-10.37.tar.gz.sig
drwxr-xr-x  9 sambauser sambauser    4096 7月  26 21:42 swig-4.0.2/
-rw-r--r--  1 root      root      8097014 7月  26 21:41 swig-4.0.2.tar.gz
[root@ubuntu0006:/media/hankin/vdb/swig] #gpg --verify pcre2-10.37.tar.gz.sig pcre2-10.37.tar.gz
gpg: 于 2021年05月26日 星期三 22时31分46秒 CST 创建的签名，使用 RSA，钥匙号 FB0F43D8
gpg: 无法检查签名：找不到公钥
[root@ubuntu0006:/media/hankin/vdb/swig] #gpg --recv-keys FB0F43D8      这说明找不到对应的公钥，同时会提示当前验证的钥匙号为 FB0F43D8，根据这个钥匙号导入公钥
gpg: 未给出公钥服务器(使用 --keyserver 选项)
gpg: 从公钥服务器接收失败：URI 已损坏
[root@ubuntu0006:/media/hankin/vdb/swig] #gpg --verify --verbose pcre2-10.37.tar.gz.sig pcre2-10.37.tar.gz
gpg: 于 2021年05月26日 星期三 22时31分46秒 CST 创建的签名，使用 RSA，钥匙号 FB0F43D8
gpg: 无法检查签名：找不到公钥
[root@ubuntu0006:/media/hankin/vdb/swig] #gpg --keyserver
gpg: Missing argument for option "--keyserver"
[root@ubuntu0006:/media/hankin/vdb/swig] #gpg --keyserver FB0F43D8
gpg: 请开始键入您的报文……
```

问题出在无法连接hkp 服务器 keys.gnupg.net。

示例成功参考：https://www.cnblogs.com/daemon369/p/3204020.html

