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

## 5、字符串全匹配
模糊匹配
$ grep "abc"   # 结果为abcd, abcde, abc等
全匹配
$ grep -Rw "abc" # 结果为abc 

## 6、grep时显示"匹配到二进制文件"
原因
grep如果碰到\000 NUL字符，就会认为文件是二进制文件，而 grep 匹配 默认忽略二进制数据。
我发现是匹配的那一行出现了中文，并且中文格式还有些问题，删除中文后grep正常。。。。。。。。。。。。。


所以要使用grep -a属性：不忽略二进制的数据。
grep的-a或--text参数功能：将 binary 文件以 text 文件的方式搜寻数据

解决
grep -a file_name
grep --text file_name

grep时提示：Binary file (standard input) matches grep只递归匹配文本文件，不匹配二进制文件中的内容
grep get_default_error_string /* -rFn --binary-files=without-match
增加--binary-files=without-match参数即可。

## 7、使用grep搜索多个字符串
三种方法：
- 转义字符\
- grep -E
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
```

## 7、q参数






