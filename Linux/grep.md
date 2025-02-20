# grep命令

## 1、简介
grep是Linux中最常用的”文本处理工具”之一，grep与sed、awk合称为Linux中的三剑客。
grep的全称为： Global search Regular Expression and Print out the line
全称中的”Global search”为全局搜索之意。
全称中的”Regular Expression”表示正则表达式。
所以，从grep的全称中可以了解到，grep是一个可以利用”正则表达式”进行”全局搜索”的工具

## 2、常用用法
grep -rin 字符串 目标区域	（在目标区域内的文件内容中查找）
grep --color 可以为查找的内容加颜色
通常修改alias。

## 3、帮助
```
[root@ubuntu0006:/media/hankin/vdb/app] #grep --help
用法: grep [选项]... PATTERN [FILE]...
在每个 FILE 或是标准输入中查找 PATTERN。
默认的 PATTERN 是一个基本正则表达式(缩写为 BRE)。
例如: grep -i 'hello world' menu.h main.c

正则表达式选择与解释:
  -E, --extended-regexp     PATTERN 是一个可扩展的正则表达式(缩写为 ERE)
  -F, --fixed-strings       PATTERN 是一组由断行符分隔的字符串。
  -G, --basic-regexp        PATTERN 是一个基本正则表达式(缩写为 BRE)
  -P, --perl-regexp         PATTERN 是一个 Perl 正则表达式
  -e, --regexp=PATTERN      用 PATTERN 来进行匹配操作
  -f, --file=FILE           从 FILE 中取得 PATTERN
  -i, --ignore-case         忽略大小写
  -w, --word-regexp         强制 PATTERN 仅完全匹配字词
  -x, --line-regexp         强制 PATTERN 仅完全匹配一行
  -z, --null-data           一个 0 字节的数据行，但不是空行

杂项:
  -s, --no-messages         不显示错误信息
  -v, --invert-match        选中不匹配的行
  -V, --version             显示版本信息并退出
      --help                显示此帮助并退出

输出控制:
  -m, --max-count=NUM       NUM 次匹配后停止
  -b, --byte-offset         输出的同时打印字节偏移
  -n, --line-number         输出的同时打印行号
      --line-buffered       每行输出清空
  -H, --with-filename       为每一匹配项打印文件名
  -h, --no-filename         输出时不显示文件名前缀
      --label=LABEL         将LABEL 作为标准输入文件名前缀
  -o, --only-matching       只显示匹配PATTERN 部分的行
  -q, --quiet, --silent     不显示所有常规输出
      --binary-files=TYPE   设定二进制文件的TYPE 类型；
                            TYPE 可以是`binary', `text', 或`without-match'
  -a, --text                等同于 --binary-files=text
  -I                        等同于 --binary-files=without-match
  -d, --directories=ACTION  读取目录的方式；
                            ACTION 可以是`read', `recurse',或`skip'
  -D, --devices=ACTION      读取设备、先入先出队列、套接字的方式；
                            ACTION 可以是`read'或`skip'
  -r, --recursive           等同于--directories=recurse
  -R, --dereference-recursive       同上，但遍历所有符号链接
      --include=FILE_PATTERN  只查找匹配FILE_PATTERN 的文件
      --exclude=FILE_PATTERN  跳过匹配FILE_PATTERN 的文件和目录
      --exclude-from=FILE   跳过所有除FILE 以外的文件
      --exclude-dir=PATTERN  跳过所有匹配PATTERN 的目录。
  -L, --files-without-match  只打印不匹配FILEs 的文件名
  -l, --files-with-matches  只打印匹配FILES 的文件名
  -c, --count               只打印每个FILE 中的匹配行数目
  -T, --initial-tab         行首tabs 分隔（如有必要）
  -Z, --null                在FILE 文件最后打印空字符

文件控制:
  -B, --before-context=NUM  打印文本及其前面NUM 行
  -A, --after-context=NUM   打印文本及其后面NUM 行
  -C, --context=NUM         打印NUM 行输出文本
  -NUM                      等同于 --context=NUM
      --color[=WHEN],
      --colour[=WHEN]       使用标记高亮匹配字串；
                            WHEN 可以是`always', `never'或`auto'
  -U, --binary              不要清除行尾的CR 字符(MSDOS/Windows)
  -u, --unix-byte-offsets   忽略CR 字符，报告字节偏移
                             (MSDOS/Windows)

'egrep' 即'grep -E'。'fgrep' 即'grep -F'。
直接调用'egrep' 或是'fgrep' 均已被废弃。
若FILE 为 -，将读取标准输入。不带FILE，读取当前目录，除非命令行中指定了-r 选项。
如果少于两个FILE 参数，就要默认使用-h 参数。
如果有任意行被匹配，那退出状态为 0，否则为 1；
如果有错误产生，且未指定 -q 参数，那退出状态为 2。
```

## 4、搜索显示前后多行
at xxx.log | grep -A 10 ERROR 后10行
cat xxx.log | grep -B 10 ERROR 前10行
cat xxx.log | grep -C 30 ERROR 前后各30行  经常用  迅速定位ERROR上下文 

grep -C 5 foo file 显示file文件里匹配foo字串那行以及上下5行
grep -B 5 foo file 显示foo及前5行
grep -A 5 foo file 显示foo及后5行

## 5、字符串全匹配
模糊匹配
$ grep "abc"   # 结果为abcd, abcde, abc等
全匹配
$ grep -Rw "abc" # 结果为abc 

## 6、grep时显示"匹配到二进制文件"

### 6-1、原因
grep如果碰到\000 NUL字符，就会认为文件是二进制文件，而 grep 匹配 默认忽略二进制数据。
我发现是匹配的那一行出现了中文，并且中文格式还有些问题，删除中文后grep正常。。。。。。。。。。。。。

所以要使用grep -a属性：不忽略二进制的数据。
grep的-a或--text参数功能：将 binary 文件以 text 文件的方式搜寻数据

### 6-2、解决
grep -a file_name
grep --text file_name

grep时提示：Binary file (standard input) matches grep只递归匹配文本文件，不匹配二进制文件中的内容
grep get_default_error_string /* -rFn --binary-files=without-match
增加--binary-files=without-match参数即可。

### 6-3、进一步思考
```
rk1314_64bit:/proc # grep -R "null pointer" / 2>/dev/null
Binary file /vendor/lib/modules/wifi/8822be.ko matches
Binary file /vendor/lib/modules/wifi/8821cu.ko matches
Binary file /vendor/lib/modules/wifi/bcmdhd.ko matches

rk1314_64bit:/proc # grep -aR "null pointer" / 2>/dev/null
/vendor/lib/modules/wifi/8822be.ko:null pointer!!
/vendor/lib/modules/wifi/8821cu.ko:[ERR]null pointer
/vendor/lib/modules/wifi/bcmdhd.ko:%s : bus is null pointer , exit
```
所以说不添加a参数还是最好的，最好是过滤掉二进制内容显示。

## 7、使用grep搜索多个字符串
三种方法：
- 转义字符\
- grep -E   (-E, --extended-regexp  PATTERN 是一个可扩展的正则表达式(缩写为 ERE))
- egrep

```
[root@ubuntu0006:/media/hankin/vdb/log/shell] #grep 'ltest' log.sh
[root@ubuntu0006:/media/hankin/vdb/log/shell] #grep 'ltext' log.sh
ltext()
                ltext -n '.';
        ltext "${CBOLD}[T]${CLOG_PRE_WAPPER}${C0}$*";
export -f ltext
[root@ubuntu0006:/media/hankin/vdb/log/shell] #grep 'ltest|ltext' log.sh
[root@ubuntu0006:/media/hankin/vdb/log/shell] #grep 'ltest\|ltext' log.sh
ltext()
                ltext -n '.';
        ltext "${CBOLD}[T]${CLOG_PRE_WAPPER}${C0}$*";
export -f ltext
[root@ubuntu0006:/media/hankin/vdb/log/shell] #grep -E 'ltest|ltext' log.sh
ltext()
                ltext -n '.';
        ltext "${CBOLD}[T]${CLOG_PRE_WAPPER}${C0}$*";
export -f ltext
[root@ubuntu0006:/media/hankin/vdb/log/shell] #egrep 'ltest|ltext' log.sh
ltext()
                ltext -n '.';
        ltext "${CBOLD}[T]${CLOG_PRE_WAPPER}${C0}$*";
export -f ltext

root@hankin:/var/lock# cat /sys/kernel/debug/usb/usbmon/3u | grep "Ci\|Co"
root@hankin:/var/lock# cat /sys/kernel/debug/usb/usbmon/3u | grep -E "Ci|Co"
root@hankin:/var/lock# cat /sys/kernel/debug/usb/usbmon/3u | egrep "Ci|Co"
```
亲测上面三种方式在xubuntu系统里面有效，但是在安卓8.1.0系统里面只有grep -E生效，其他方式行不通。但是发现egrep命令前面加入busybox命令也行得通，而grep "Ci\|Co"始终行不通。

注意：.一定需要使用\转义字符，而|没有-E参数则需要使用\转义字符，有-E则不需要。
```
root@292d069d5401  ~/code/src(person-TD2024123000056)
# git status . -uno | grep ".cpp$|.h$"

root@292d069d5401  ~/code/src(person-TD2024123000056)
# git status . -uno | grep ".cpp$\|.h$"
        修改：     client/X11/client_msg.cpp
        修改：     client/X11/client_msg.h
        修改：     usbredir-0.7/install-sh

root@292d069d5401  ~/code/src(person-TD2024123000056)
# git status . -uno | grep -E ".cpp$|.h$"
        修改：     client/X11/client_msg.cpp
        修改：     client/X11/client_msg.h
        修改：     usbredir-0.7/install-sh

root@292d069d5401  ~/code/src(person-TD2024123000056)
# git status . -uno | grep -E ".cpp$|\.h$"
        修改：     client/X11/client_msg.cpp
        修改：     client/X11/client_msg.h

```

## 8、q参数
注意：直接在终端执行不会有任何返回值，不要以为没有找到相关内容。
```
root@hankin:/usr/local/bin# grep -q root /proc/version
root@hankin:/usr/local/bin# echo $?
0
root@hankin:/usr/local/bin# grep -q rootj /proc/version
root@hankin:/usr/local/bin# echo $?
1
```

grep -q用于if逻辑判断。
 
突然发现grep -q 用于if逻辑判断很好用。
 
-q 参数，本意是 Quiet; do not write anything to standard output.  Exit immediately with zero status if any match is found, even if an error was detected.   中文意思为，安静模式，不打印任何标准输出。如果有匹配的内容则立即返回状态值0。

test.sh:
```
#!/bin/bash

if grep -q hello data.txt ; then
    echo "data.txt has word 'hello'"
else
    echo "data.txt has not word 'hello'"
fi

if grep -q world data.txt; then
    echo "data.txt has word 'world'"
else
    echo "data.txt has not word 'world'"
fi

success=0
if echo ${success} ; then
    echo yes
else
    echo no
fi
```

data.txt:
```
nihao
nihaooo
hello
```

运行结果：
```
data.txt has word 'hello'
data.txt has not word 'world'
0
yes
```

## 9、grep的-r和-R参数区别
```
[root@ubuntu0006:/media/hankin/vdb/study/grep_rR] #ll
总用量 16
drwxr-xr-x  2 root root 4096 12月 24 10:08 ./
drwxr-xr-x 44 root root 4096 5月  11 15:32 ../
-rw-r--r--  1 root root    5 12月 24 10:06 a
lrwxrwxrwx  1 root root    1 12月 24 10:07 b -> a
-rw-r--r--  1 root root   57 12月 24 10:08 README.md
[root@ubuntu0006:/media/hankin/vdb/study/grep_rR] #grep ping    (会卡住)
^C
[root@ubuntu0006:/media/hankin/vdb/study/grep_rR] #grep -r ping
a:ping
README.md:grep -R ping
README.md:grep -r ping
[root@ubuntu0006:/media/hankin/vdb/study/grep_rR] #grep -R ping
a:ping
README.md:grep -R ping
README.md:grep -r ping
b:ping
[root@ubuntu0006:/media/hankin/vdb/study/grep_rR] #grep -r ping b
ping
```
-r，--recursive
遍历每个目录下的所有文件，递归，不包含符号链接，只有当他们是在命令行上。这相当于 -d递归选项。

-R，--dereference递归
遍历所有文件的每个目录下，递归。 包含所有符号链接，不像-r。

## 10、grep的规则表达式
```
\ 反义字符：如"\"\""表示匹配""
[ - ] 匹配一个范围，[0-9a-zA-Z]匹配所有数字和字母
* 所有字符，长度可为0
+ 前面的字符出现了一次或者多次
^ #匹配行的开始 如：'^grep'匹配所有以grep开头的行。
$ #匹配行的结束 如：'grep$'匹配所有以grep结尾的行。
. #匹配一个非换行符的字符 如：'gr.p'匹配gr后接一个任意字符，然后是p。
 * #匹配零个或多个先前字符 如：' *grep'匹配所有一个或多个空格后紧跟grep的行。
.* #一起用代表任意字符。
[] #匹配一个指定范围内的字符，如'[Gg]rep'匹配Grep和grep。
[^] #匹配一个不在指定范围内的字符，如：'[^A-FH-Z]rep'匹配不包含A-R和T-Z的一个字母开头，紧跟rep的行。
\(..\) #标记匹配字符，如'\(love\)'，love被标记为1。
\< #到匹配正则表达式的行开始，如:'\<grep'匹配包含以grep开头的单词的行。
\> #到匹配正则表达式的行结束，如'grep\>'匹配包含以grep结尾的单词的行。
x\{m\} #重复字符x，m次，如：'0\{5\}'匹配包含5个o的行。
x\{m,\} #重复字符x,至少m次，如：'o\{5,\}'匹配至少有5个o的行。
x\{m,n\} #重复字符x，至少m次，不多于n次，如：'o\{5,10\}'匹配5--10个o的行。
\w #匹配文字和数字字符，也就是[A-Za-z0-9]，如：'G\w*p'匹配以G后跟零个或多个文字或数字字符，然后是p。
\W #\w的反置形式，匹配一个或多个非单词字符，如点号句号等。
\b #单词锁定符，如: '\bgrep\b'只匹配grep。

[root@ubuntu0006:/home] #cat test.txt
a g r e
u c j alike
i x k like
a f g liker
a f h g liker
s g e g
[root@ubuntu0006:/home] #grep "^a" test.txt             (查找以a开头的行)
a g r e
a f g liker
a f h g liker
[root@ubuntu0006:/home] #grep "^a.*r$" test.txt         (同时查找以a开头同时以r结尾的行)
a f g liker
a f h g liker
[root@ubuntu0006:/home] #grep "^a.*h.*r$" test.txt      (同时查找以a开头，包含字符h，并以r结尾的行)
a f h g liker
[root@ubuntu0006:/home] #grep "^a\|e$" test.txt         (提取以a开头，或者以e结尾的行)
a g r e
u c j alike
i x k like
a f g liker
a f h g liker
```

### 10-1、*符号的实战
错误演示，也是问题来源：
```
[root@ubuntu0006:/media] ((550cf74...)) #git tag | grep 829
collection-patches-20240829
collection-patches-20240829
[root@ubuntu0006:/media] ((550cf74...)) #git tag | grep "*829"
[root@ubuntu0006:/media] ((550cf74...)) #git tag | grep *829
[root@ubuntu0006:/media] ((550cf74...)) #git tag | grep '*829'
[root@ubuntu0006:/media] ((550cf74...)) #git tag | grep '829'
collection-patches-20240829
collection-patches-20240829
[root@ubuntu0006:/media] ((550cf74...)) #git tag | grep 'patches'
collection-patches-20240710
collection-patches-20240829
collection-patches-20240829
collection-patches-20240928(20240929)
collection-patches-20240821
collection-patches-20240821
collection-patches-20240821
[root@ubuntu0006:/media] ((550cf74...)) #git tag | grep '829$'
collection-patches-20240829
collection-patches-20240829
[root@ubuntu0006:/media] ((550cf74...)) #git tag | grep 'patches$'
[root@ubuntu0006:/media] ((550cf74...)) #
```

正确的方式：
```
[root@ubuntu0006:~] #grep " *short" te.c
        unsigned short vid = desc.idVendor;
        unsigned short pid = desc.idProduct;
            unsigned short vid = desc.idVendor;
            unsigned short pid = desc.idProduct;
[root@ubuntu0006:~] #cat te.c | grep ' *short'
        unsigned short vid = desc.idVendor;
        unsigned short pid = desc.idProduct;
            unsigned short vid = desc.idVendor;
            unsigned short pid = desc.idProduct;
[root@ubuntu0006:~] #cat te.c | grep driver
* 文 件 名: replace_kernel_driver.c
            op_attach_kernel_driver(fd, 0);
            op_attach_kernel_driver(fd, 1);
            op_detach_kernel_driver(fd, 0);
            op_detach_kernel_driver(fd, 1);
            detach_kernel_driver_and_claim(fd, 0);
            detach_kernel_driver_and_claim(fd, 1);
[root@ubuntu0006:~] #cat te.c | grep *driver
[root@ubuntu0006:~] #cat te.c | grep  *driver
[root@ubuntu0006:~] #cat te.c | grep *short
[root@ubuntu0006:~] #cat te.c | grep  *short
[root@ubuntu0006:~] #cat te.c | grep   *short
[root@ubuntu0006:~] #cat te.c | grep  .*driver
* 文 件 名: replace_kernel_driver.c
            op_attach_kernel_driver(fd, 0);
            op_attach_kernel_driver(fd, 1);
            op_detach_kernel_driver(fd, 0);
            op_detach_kernel_driver(fd, 1);
            detach_kernel_driver_and_claim(fd, 0);
            detach_kernel_driver_and_claim(fd, 1);
[root@ubuntu0006:~] #cat te.c | grep  driver*
* 文 件 名: replace_kernel_driver.c
            op_attach_kernel_driver(fd, 0);
            op_attach_kernel_driver(fd, 1);
            op_detach_kernel_driver(fd, 0);
            op_detach_kernel_driver(fd, 1);
            detach_kernel_driver_and_claim(fd, 0);
            detach_kernel_driver_and_claim(fd, 1);
[root@ubuntu0006:~] #cat te.c | grep  driver.
* 文 件 名: replace_kernel_driver.c
            op_attach_kernel_driver(fd, 0);
            op_attach_kernel_driver(fd, 1);
            op_detach_kernel_driver(fd, 0);
            op_detach_kernel_driver(fd, 1);
            detach_kernel_driver_and_claim(fd, 0);
            detach_kernel_driver_and_claim(fd, 1);
[root@ubuntu0006:~] #cat te.c | grep  driver***
* 文 件 名: replace_kernel_driver.c
            op_attach_kernel_driver(fd, 0);
            op_attach_kernel_driver(fd, 1);
            op_detach_kernel_driver(fd, 0);
            op_detach_kernel_driver(fd, 1);
            detach_kernel_driver_and_claim(fd, 0);
            detach_kernel_driver_and_claim(fd, 1);
```

总结：使用grep命令一般是不需要使用到通配符`*`，使用了你就错了！！！
另外注意git branch和git tag显示出来的结果不一样额。
使用grep命令时`*`符号不能单独匹配使用，需要结合其他符号进行组合，另外grep命令不需要像find命令那样需要`*`去通配，如：
```
[root@ubuntu0006:~] #find . -maxdepth 1 -name *c
find: 路径必须在表达式之前: k.c
用法: find [-H] [-L] [-P] [-Olevel] [-D help|tree|search|stat|rates|opt|exec|time] [path...] [expression]
[root@ubuntu0006:~] #find . -maxdepth 1 -name "*c"
./.xsm7l5yUc
./.dmrc
./Public
./te.c
./.bashrc
./exec_shell_cmd_return_result.c
./Music
./k.c
./.vnc
./malloc_deallocated_with_delete.c
[root@ubuntu0006:~] #find . -maxdepth 1 -name "c"
[root@ubuntu0006:~] #
```

## 11、grep统计文件个数
1) 查看某文件夹下文件的个数:
```
# ls -l |grep "^-"|wc -l    or    # find ./dir -type f | wc -l
```
2) 查看某文件夹下文件的个数，包括子文件夹里的: 
```
# ls -lR | grep "^-" | wc -l
```
3) 查看某文件夹下文件夹的个数，包括子文件夹里的:
```
# ls -lR | grep "^d" | wc -l
```

## 12、grep出现大量的各种错误
```
rk1314_64bit:/proc # grep -R "null pointer" /
/system/bin/grep: /sys/bus/cpu/uevent: Permission denied
/system/bin/grep: /sys/bus/cpu/drivers_probe: Permission denied
/system/bin/grep: /sys/bus/i2c/devices/i2c-0/i2c-dev/i2c-0/power/autosuspend_delay_ms: I/O error
/system/bin/grep: warning: /sys/bus/i2c/devices/i2c-0/i2c-dev/i2c-0/device: recursive directory loop

解决方法：
rk1314_64bit:/proc # grep -R "null pointer" / 2>/dev/null
```

## 13、统计出现次数
o参数的重要性，注意126行出现了两个int也统计出来了。
```
[root@ubuntu0006:~/cmake] #grep -Rn "int" a.cpp
41:     * this bDeviceClass value indicates that each interface specifies its
126:int main(int argc, char *argv[])
129:    int r;
[root@ubuntu0006:~/cmake] #grep -Rno "int" a.cpp
41:int
126:int
126:int
129:int
[root@ubuntu0006:~/cmake] #grep -Rno "int" a.cpp | wc -l
4
```

## 14、转义字符
```
root@android:/ # cat /sys/kernel/debug/usb/usbmon/3u                                              <
d9219c80 756921660 C Ii:3:004:1 0:2 8 = 0000fc00 0000fcff
d9219c80 756921741 S Ii:3:004:1 -115:2 8 <
d9219c80 756923679 C Ii:3:004:1 0:2 8 = 0003fc00 0300fcff
d9219c80 756923855 S Ii:3:004:1 -115:2 8 <
d9219c80 756925658 C Ii:3:004:1 0:2 8 = 0002fa00 0200faff
d9219c80 756925750 S Ii:3:004:1 -115:2 8 <
d9219c80 756927659 C Ii:3:004:1 0:2 8 = 0004f900 0400f9ff
d9219c80 756927752 S Ii:3:004:1 -115:2 8 <
d9219c80 756929656 C Ii:3:004:1 0:2 8 = 0002f800 0200f8ff

root@android:/ # cat /sys/kernel/debug/usb/usbmon/3u | grep "\-115:2"
d9219c80 801365751 S Ii:3:004:1 -115:2 8 <
d9219c80 801367771 S Ii:3:004:1 -115:2 8 <
d9219c80 801369738 S Ii:3:004:1 -115:2 8 <
d9219c80 801371733 S Ii:3:004:1 -115:2 8 <
d9219c80 801383761 S Ii:3:004:1 -115:2 8 <
d9219c80 801427738 S Ii:3:004:1 -115:2 8 <
d9219c80 801431749 S Ii:3:004:1 -115:2 8 <
d9219c80 801435742 S Ii:3:004:1 -115:2 8 <

root@android:/ # cat /sys/kernel/debug/usb/usbmon/3u | grep "2 8"
d9219c80 814335664 C Ii:3:004:1 0:2 8 = 00010000 01000000
d9219c80 814335769 S Ii:3:004:1 -115:2 8 <
d9219c80 814337665 C Ii:3:004:1 0:2 8 = 0001ff00 0100ffff
d9219c80 814337751 S Ii:3:004:1 -115:2 8 <
d9219c80 814339658 C Ii:3:004:1 0:2 8 = 00010000 01000000
d9219c80 814339718 S Ii:3:004:1 -115:2 8 <
d9219c80 814341660 C Ii:3:004:1 0:2 8 = 00010000 01000000
d9219c80 814341726 S Ii:3:004:1 -115:2 8 <
d9219c80 814343658 C Ii:3:004:1 0:2 8 = 0001ff00 0100ffff
d9219c80 814343737 S Ii:3:004:1 -115:2 8 <
```

## 15、将grep过滤的内容输出到文件中

### 15-1、需求
统计某个进程一段时间的CPU使用率数据，并将结果输出到文件保存。
```
top -b -d 1 -p 1234 | grep 1234
```

### 15-2、解决方案
咋一看，似乎是一个很简单的问题，就是 taif -f | grep 过滤出来的内容重定向到文件中就行了，但是为什么文件一直为空呢？

其实这要从shell的输出机制说起，因为标准输出到终端时默认行缓冲或无缓冲，重定向到硬盘之后，就变成了全缓冲。

因此 tail -f 往终端打印，和往文件中写是不一样的，往文件中写，需要先写到pipe的缓冲区中， 然后再写到文件中。tail -f 之后表示一个流还没有完成， 缓冲区不会自动写，因此导致内容无法写入文件。

解决方法呢？很简单，既然缓冲区不自动写，那我们就强制写。方法不止一种，此处我们单讲 fflush：
fflush是一个在C语言标准输入输出库中的函数，功能是冲洗流中的信息，该函数通常用于处理磁盘文件。fflush()会强迫将缓冲区内的数据写回参数stream 指定的文件中。

以上是百度百科中对fflush释义，在shell中，我们可以使用awk来调用fflush,话不多说，先上shell：
```
tail -f xxx.log | awk '/china|beijing/ {print $0; fflush() }' >> out.txt
```
此命令即实现实时过滤 xxx.log 文件中的关键词 china 或 beijing ,并将对应的行输出到out.txt文件中。

```
[root@ubuntu0006:~] #top -b -d 1 -p 1956 | grep 1956 >> out.txt
^C
[root@ubuntu0006:~] #cat out.txt
[root@ubuntu0006:~] #
[root@ubuntu0006:~] #top -b -d 1 -p 1956 | awk '/1956/ {print $0}' >> out.txt
^C
[root@ubuntu0006:~] #cat out.txt
[root@ubuntu0006:~] #
[root@ubuntu0006:~] #top -b -d 1 -p 1956 | awk '/1956/ {print $0; fflush() }' >> out.txt
^C
[root@ubuntu0006:~] #cat out.txt
 1956 root      20   0  924764  21596  14088 S   0.0  0.3 122:42.61 ToolsAPI
 1956 root      20   0  924764  21472  14088 S   1.0  0.3 122:42.62 ToolsAPI
 1956 root      20   0  924764  21472  14088 S   1.0  0.3 122:42.63 ToolsAPI
 1956 root      20   0  924764  21472  14088 S   0.0  0.3 122:42.63 ToolsAPI
 1956 root      20   0  924764  21472  14088 S   0.0  0.3 122:42.63 ToolsAPI
 1956 root      20   0  924764  21472  14088 S   0.0  0.3 122:42.63 ToolsAPI
```

## 16、cat命令查看日志使用grep命令搜索关键字不全
```
[root@ubuntu0006:/var/log] #cat syslog  | grep 21514
Nov  9 11:36:06 ubuntu0006 kernel: [    2.215148] uhci_hcd 0000:00:19.2: UHCI Host Controller
匹配到二进制文件 (标准输入)

[root@ubuntu0006:/var/log] #cat syslog  | grep -a 21514
Nov  9 11:36:06 ubuntu0006 kernel: [    2.215148] uhci_hcd 0000:00:19.2: UHCI Host Controller
Mar 19 04:17:01 ubuntu0006 CRON[21514]: (root) CMD (   cd / && run-parts --report /etc/cron.hourly)

[root@ubuntu0006:/var/log] #cat syslog  | grep --text 21514
Nov  9 11:36:06 ubuntu0006 kernel: [    2.215148] uhci_hcd 0000:00:19.2: UHCI Host Controller
Mar 19 04:17:01 ubuntu0006 CRON[21514]: (root) CMD (   cd / && run-parts --report /etc/cron.hourly)

[root@ubuntu0006:/var/log] #cat syslog  | grep --binary-files=text 21514
Nov  9 11:36:06 ubuntu0006 kernel: [    2.215148] uhci_hcd 0000:00:19.2: UHCI Host Controller
Mar 19 04:17:01 ubuntu0006 CRON[21514]: (root) CMD (   cd / && run-parts --report /etc/cron.hourly)

[root@ubuntu0006:/var/log] #strings syslog | grep 21514
Nov  9 11:36:06 ubuntu0006 kernel: [    2.215148] uhci_hcd 0000:00:19.2: UHCI Host Controller
Mar 19 04:17:01 ubuntu0006 CRON[21514]: (root) CMD (   cd / && run-parts --report /etc/cron.hourly)
```

### 16-1、问题原因
当 grep 显示“匹配到二进制文件（标准输入）”时，这意味着 grep 检测到输入数据包含二进制内容，而不是纯文本。默认情况下，grep 在遇到二进制数据时会停止处理并显示此消息。

### 16-2、解决方案
- 使用 -a 或 --text 选项来强制 grep 将文件视为文本文件，即使它包含二进制数据。这可以让 grep 继续处理文件中的文本部分。
- 不需要处理二进制内容，可以使用 --binary-files=text 选项，这与 -a 类似。
- 如果文件确实包含二进制数据，但你只关心其中的文本部分，可以使用 strings 命令提取文本，然后再用 grep 搜索

### 16-3、检查文件是否含有二进制内容
放弃，没有找到答案：
```
hj文件含有中文，jh不含有中文：
[root@ubuntu0006:~] #hexdump -C hj
00000000  31 32 33 0a 31 32 0a 39  38 e4 bd 95 e5 81 a5 31  |123.12.98......1|
00000010  32 0a 6a 6b 0a 31 32 0a  e6 8b 89 e6 8b 89 0a 31  |2.jk.12........1|
00000020  32 0a 31 32 0a                                    |2.12.|
00000025
[root@ubuntu0006:~] #hexdump -C jh
00000000  31 32 33 0a 31 32 0a 39  38 31 32 0a 6a 6b 0a 31  |123.12.9812.jk.1|
00000010  32 0a 0a 31 32 0a 31 32  0a                       |2..12.12.|
00000019
[root@ubuntu0006:~] #xxd hj
00000000: 3132 330a 3132 0a39 38e4 bd95 e581 a531  123.12.98......1
00000010: 320a 6a6b 0a31 320a e68b 89e6 8b89 0a31  2.jk.12........1
00000020: 320a 3132 0a                             2.12.
[root@ubuntu0006:~] #xxd jh
00000000: 3132 330a 3132 0a39 3831 320a 6a6b 0a31  123.12.9812.jk.1
00000010: 320a 0a31 320a 3132 0a                   2..12.12.
[root@ubuntu0006:~] #od -c hj
0000000   1   2   3  \n   1   2  \n   9   8 344 275 225 345 201 245   1
0000020   2  \n   j   k  \n   1   2  \n 346 213 211 346 213 211  \n   1
0000040   2  \n   1   2  \n
0000045
[root@ubuntu0006:~] #od -c jh
0000000   1   2   3  \n   1   2  \n   9   8   1   2  \n   j   k  \n   1
0000020   2  \n  \n   1   2  \n   1   2  \n
0000031

自己创建的文件并没有复现问题：
[root@ubuntu0006:~] #grep '12' hj
123
12
98何健12
12
12
12
[root@ubuntu0006:~] #grep -P '[^\x20-\x7E\t\r\n]' hj
98何健12
拉拉
[root@ubuntu0006:~] #cat hj | grep 12
123
12
98何健12
12
12
12
```

