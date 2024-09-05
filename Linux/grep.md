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
- grep -E   (-E, --extended-regexp     PATTERN 是一个可扩展的正则表达式(缩写为 ERE))
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
```

## 7、q参数
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

## 8、ps grep 不包括grep本身
ps aux | grep defunct| grep -v "grep"

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
* #匹配零个或多个先前字符 如：'*grep'匹配所有一个或多个空格后紧跟grep的行。
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
42:     * own class information and all interfaces operate independently.
62:    /** Printer class */
103:static void print_devs(libusb_device **devs)
106:    int i = 0;
110:        int r = libusb_get_device_descriptor(dev, &desc);
112:            fprintf(stderr, "failed to get device descriptor");
116:        printf("%04x:%04x (bus %d, port %d, device %d, speed %d, class 0x%x)\n",
126:int main(int argc, char *argv[])
129:    int r;
138:        return (int) cnt;
141:    print_devs(devs);
[root@ubuntu0006:~/cmake] #grep -Rno "int" a.cpp
41:int
42:int
62:int
103:int
106:int
110:int
112:int
116:int
126:int
126:int
129:int
138:int
141:int
[root@ubuntu0006:~/cmake] #grep -Rno "int" a.cpp | wc -l
13
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

