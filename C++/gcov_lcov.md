# 代码覆盖率

作用：找出无用多余的代码。

## 0、覆盖率
覆盖率是度量测试完整性的一个手段，是测试有效性的一个度量。通过已执行代码表示，用于可靠性、稳定性以及性能的评测。
测试覆盖是对测试完全程度的评测。测试覆盖是由测试需求和测试用例的覆盖或已执行代码的覆盖表示的。建立在对测试结果的评估和对测试过程中确定的变更请求（缺陷）的分析的基础上。

测试覆盖是对测试完全程度的评测。测试覆盖是由测试需求和测试用例的覆盖或已执行代码的覆盖表示的。
质量是对测试对象（系统或测试的应用程序）的可靠性、稳定性以及性能的评测。质量建立在对测试结果的评估和对测试过程中确定的变更请求（缺陷）的分析的基础上。

## 1、gcov和lcov安装
gcov：是随gcc一起发布的，gcov是gcc的自带功能，属于GNU，并不需要独立安装；
lcov：其他博客说是随ltp发布的，结果下载下ltp之后编译了10多分钟，最后也没见lcov，最后到sourceforge下载了lcov单独的代码。还可以通过apt install lcov命令进行安装。
```
[root@ubuntu0006:~/cmake/build] #lcov
lcov: Need one of options -z, -c, -a, -e, -r, -l, --diff or --summary
Use lcov --help to get usage information
[root@ubuntu0006:~/cmake/build] #lcov --help
Usage: lcov [OPTIONS]

Use lcov to collect coverage data from either the currently running Linux
kernel or from a user space application. Specify the --directory option to
get coverage data for a user space program.
```

window版本：
在windows下安装可以使用gcov的gcc 之前试过mingw和Cygwin64 Terminal，在后续可视化的过程中效果不是很理想，经过多方测试发现Strawberry Perl的GCC可以很好的满足后续可视化的需求。至于为什么mingw的后续可视化为什么不行 好像和llvm的仿真有关系……
在安装完成Perl以后就就可以在windows下使用gcov了。

## 2、GCOVR安装
Linux下与windows下gcovr的安装大同小异 都是通过Python的pip安装 根据不同的Python版本pip会选择与此Python版本相适应的gcovr进行安装。
如果你用的操作系统还没有Python请自行安装。
```
apt install gcovr
pip install gcovr
```

## 3、实战
测试代码见：D:\Github\Storage\c++\覆盖率\coverage.cpp

统计C/C++代码覆盖率的工具很多，比如OpenCppCoverage可以与VS工具配合，获取并展示代码覆盖率简单直观。
使用gcov生成单个文件覆盖率，并去除内核头文件信息。
```
gcov -bnrs /buildroot  xxx
-r, --relative-only             Only show data for relative sources
-s, --source-prefix DIR         Source prefix to elide
```
rs一起使用，指定只取以xxx路径开头的文件信息

lcov genhtml生成html报告
```
/usr/bin/lcov --capture --directory . --ignore-errors gcov,source,graph --output-file all.info
/usr/bin/lcov --remove all.info '/usr/include/*' '/usr/lib/*' -o result.info
genhtml result.info -p "/buildroot/" --output-directory coverage_report
-p, --prefix PREFIX               Remove PREFIX from all directory names
-p 去掉指定的路径前缀
```

请注意，我们在编译该程序时没有进行优化，因为优化可能会合并代码行，否则会更改程序中的执行流程。此外，我们使用-fprofile-arcs -ftest-coverage -fPIC编译器选项进行编译，这些选项添加了逻辑以生成可以由gcov命令处理的输出文件。
```
[root@ubuntu0006:~/cmake/build/hj] #g++ -fprofile-arcs -ftest-coverage -fPIC -O0 coverage.cpp -o program
[root@ubuntu0006:~/cmake/build/hj] #ll
总用量 40
drwxr-xr-x 2 root root  4096 6月  12 14:34 ./
drwxr-xr-x 7 root root  4096 6月  12 14:33 ../
-rw-r--r-- 1 root root   436 6月  12 14:34 coverage.cpp
-rw-r--r-- 1 root root   404 6月  12 14:34 coverage.gcno
-rwxr-xr-x 1 root root 23840 6月  12 14:34 program*
[root@ubuntu0006:~/cmake/build/hj] #./program
BBB
BBB
BBB
BBB
[root@ubuntu0006:~/cmake/build/hj] #ll
总用量 44
drwxr-xr-x 2 root root  4096 6月  12 14:34 ./
drwxr-xr-x 7 root root  4096 6月  12 14:33 ../
-rw-r--r-- 1 root root   436 6月  12 14:34 coverage.cpp
-rw-r--r-- 1 root root   192 6月  12 14:34 coverage.gcda
-rw-r--r-- 1 root root   404 6月  12 14:34 coverage.gcno
-rwxr-xr-x 1 root root 23840 6月  12 14:34 program*
[root@ubuntu0006:~/cmake/build/hj] #gcovr -r .
------------------------------------------------------------------------------
                           GCC Code Coverage Report
Directory: .
------------------------------------------------------------------------------
File                                       Lines    Exec  Cover   Missing
------------------------------------------------------------------------------
coverage.cpp                                  12       8    66%   17-18,25-26
------------------------------------------------------------------------------
TOTAL                                         12       8    66%
------------------------------------------------------------------------------
```
生成文件example1.gcno和example1.gcda。这些文件由gcov处理，以生成代码覆盖率统计信息。gcovr命令调用gcov并以各种格式汇总这些代码覆盖率统计信息。

## 4、详细的代码分析报告
进一步我们想要得到更为详细的代码分析报告，使用如下命令生成关于整个项目的测试结果。（因为测试用例只有一个CPP文件所以结果只有一个文件，后续会用复杂的项目进一步举例说明）
```
[root@ubuntu0006:~/cmake/build/hj] #gcovr -r . --html --html-details -o example-html-details.html
[root@ubuntu0006:~/cmake/build/hj] #ll
总用量 68
drwxr-xr-x 2 root root  4096 6月  12 19:58 ./
drwxr-xr-x 7 root root  4096 6月  12 14:33 ../
-rw-r--r-- 1 root root  7588 6月  12 19:58 example-html-details.html
-rw-r--r-- 1 root root 14045 6月  12 19:58 example-html-details.k.cpp.html
-rw-r--r-- 1 root root   626 6月  12 19:55 k.cpp
-rw-r--r-- 1 root root   248 6月  12 19:55 k.gcda
-rw-r--r-- 1 root root   908 6月  12 19:55 k.gcno
-rwxr-xr-x 1 root root 23840 6月  12 19:55 program*
```
报告见：D:\Github\Storage\c++\覆盖率

## 5、gcov的使用
参考：http://www.taodudu.cc/news/show-5085988.html?action=onClick

gcov伴随gcc 发布。gcc编译加入-fprofile-arcs -ftest-coverage 参数生成二进制程序，执行测试用例生成代码覆盖率信息。
- Gcov is GCC Coverage
- 是一个测试代码覆盖率的工具
- 是一个命令行方式的控制台程序
- 伴随GCC发布，配合GCC共同实现对C/C++文件的语句覆盖和分支覆盖测试；
- 与程序概要分析工具(profiling tool，例如gprof)一起工作，可以估计程序中哪一段代码最耗时
总的来说：gcov是一个保险测试工具。当构建一个程序时，gcov会监视一个程序的执行，并且会标识出执行了哪一行源码，哪一行没有执行。更进一步，gcov可以标识出某一行源执行的次数，这对于执行配置很有用（程序在哪里花费了大多数的时间）。因为gcov可以分辨出哪一行没有执行，这对于保险测试工具是很有用的。
```
[root@ubuntu0006:~/cmake/build/hj] #gcov k.cpp
File 'k.cpp'
Lines executed:66.67% of 12
Creating 'k.cpp.gcov'

[root@ubuntu0006:~/cmake/build/hj] #ll
总用量 72
drwxr-xr-x 2 root root  4096 6月  12 20:04 ./
drwxr-xr-x 7 root root  4096 6月  12 14:33 ../
-rw-r--r-- 1 root root  7588 6月  12 19:58 example-html-details.html
-rw-r--r-- 1 root root 14045 6月  12 19:58 example-html-details.k.cpp.html
-rw-r--r-- 1 root root   626 6月  12 19:55 k.cpp
-rw-r--r-- 1 root root  1354 6月  12 20:04 k.cpp.gcov
-rw-r--r-- 1 root root   248 6月  12 19:55 k.gcda
-rw-r--r-- 1 root root   908 6月  12 19:55 k.gcno
-rwxr-xr-x 1 root root 23840 6月  12 19:55 program*
```
生成gcov文件，该文件记录了每行代码被执行的次数，可以直接使用vi命令查看。

```
g++ -fprofile-arcs -ftest-coverage -o program k.cpp
```
-fprofile-arcs -ftest-coverage告诉编译器生成gcov需要的额外信息，并在目标文件中插入gcov需要的extra profiling information。因此，该命令在生成可执行文件test的同时生成k.gcno文件(gcov note文件)。
执行该程序，生成k.gcda文件(gcov data文件)。

## 6、gcov的选项
gcov的选项不多，也好理解，此处选3个典型的选项。

(1) -a, --all-blocks
在.gcov文件中输出每个基本块(basic block)的执行次数。如果没有-a选项，则输出'main'函数这个block的执行次数。

(2) -b, --branch-probabilities
在.gcov文件中输出每个分支的执行频率，并有分支统计信息。

(3) -c, --branch-counts
在.gcov文件中输出每个分支的执行次数。
-c是默认选项，其结果与"gcov test.c"执行结果相同。

## 7、lcov的使用
参考：http://www.taodudu.cc/news/show-864043.html?action=onClick

上述生成的k.cpp.gcov文件可视化成都较低，需要借助lcov，genhtml工具直接生成html报告。
在线查看例子：https://ltp.sourceforge.net/coverage/lcov/output/example/methods/gauss.c.gcov.frameset.html

### 7-1、安装lcov
```
sudo apt-get install lcov
```

### 7-2、运行lcov，生成相应信息
```
执行：lcov -d . -o test.info -b . -c
```

### 7-3、生成web可视化信息
```
执行：genhtml -o result test.info
```

### 7-4、实战结果
```
[root@ubuntu0006:~/cmake/build/hj] #lcov -d . -o k.info -b . -c
Capturing coverage data from .
Found gcov version: 5.4.0
Scanning . for .gcda files ...
Found 1 data files in .
Processing k.gcda
Finished .info-file creation
[root@ubuntu0006:~/cmake/build/hj] #vi k.info
[root@ubuntu0006:~/cmake/build/hj] #genhtml -o result k.info
Reading data file k.info
Found 1 entries.
Found common filename prefix "/root/cmake/build"
Writing .css and .png files.
Generating output.
Processing file hj/k.cpp
Writing directory view page.
Overall coverage rate:
  lines......: 66.7% (8 of 12 lines)
  functions..: 100.0% (1 of 1 function)
[root@ubuntu0006:~/cmake/build/hj] #ll
总用量 76
drwxr-xr-x 3 root root  4096 6月  13 09:45 ./
drwxr-xr-x 7 root root  4096 6月  12 14:33 ../
-rw-r--r-- 1 root root  7588 6月  12 19:58 example-html-details.html
-rw-r--r-- 1 root root 14045 6月  12 19:58 example-html-details.k.cpp.html
-rw-r--r-- 1 root root   626 6月  12 19:55 k.cpp
-rw-r--r-- 1 root root   248 6月  12 19:55 k.gcda
-rw-r--r-- 1 root root   908 6月  12 19:55 k.gcno
-rw-r--r-- 1 root root   190 6月  13 09:44 k.info
-rwxr-xr-x 1 root root 23840 6月  12 19:55 program*
drwxr-xr-x 3 root root  4096 6月  13 09:45 result/
[root@ubuntu0006:~/cmake/build/hj] #cd result/
[root@ubuntu0006:~/cmake/build/hj/result] #ll
总用量 60
drwxr-xr-x 3 root root 4096 6月  13 09:45 ./
drwxr-xr-x 3 root root 4096 6月  13 09:45 ../
-rw-r--r-- 1 root root  141 6月  13 09:45 amber.png
-rw-r--r-- 1 root root  141 6月  13 09:45 emerald.png
-rw-r--r-- 1 root root 9893 6月  13 09:45 gcov.css
-rw-r--r-- 1 root root  167 6月  13 09:45 glass.png
drwxr-xr-x 2 root root 4096 6月  13 09:45 hj/
-rw-r--r-- 1 root root 3697 6月  13 09:45 index.html
-rw-r--r-- 1 root root 3690 6月  13 09:45 index-sort-f.html
-rw-r--r-- 1 root root 3690 6月  13 09:45 index-sort-l.html
-rw-r--r-- 1 root root  141 6月  13 09:45 ruby.png
-rw-r--r-- 1 root root  141 6月  13 09:45 snow.png
-rw-r--r-- 1 root root  117 6月  13 09:45 updown.png
```

## 8、总结
就会发现gcovr命令则是gcov和lcov库的结合体，操作简单直接生成html可视化文件。
而需要gcov文件则还是需要gcov命令。


