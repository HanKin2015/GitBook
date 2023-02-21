# TCHAR

因为C++支持两种字符串，即常规的ANSI编码（使用""包裹）和Unicode编码（使用L""包裹），这样对应的就有了两套字符串处理函数，比如：strlen和wcslen，分别用于处理两种字符串。

TCHAR是通过define定义的字符串宏。

微软将这两套字符集及其操作进行了统一，通过条件编译（通过_UNICODE和UNICODE宏）控制实际使用的字符集，这样就有了_T("")这样的字符串，对应的就有了_tcslen这样的函数
为了存储这样的通用字符，就有了TCHAR：
当没有定义_UNICODE宏时，TCHAR = char，_tcslen =strlen
当定义了_UNICODE宏时，TCHAR = wchar_t ， _tcslen = wcslen
当我们定义了UNICODE宏，就相当于告诉了编译器：我准备采用UNICODE版本。这个时候，TCHAR就会摇身一变，变成了wchar_t。而未定义UNICODE宏时，TCHAR摇身一变，变成了unsignedchar。这样就可以很好的切换宽窄字符集。
tchar可用于双字节字符串，使程序可以用于中日韩等国 语言文字处理、显示。使编程方法简化。

## GB和GiB的区别
Gibibyte（giga binary byte的缩写）是信息或计算机硬盘存储的一个单位，简称GiB。由来“GiB”、“KiB”、“MiB”等是于1999年由国际电工协会（IEC）拟定了"KiB"、“MiB”、“GiB"的二进制单位，专用来标示“1024进位”的数据大小。而后，这一标注规范又于2008年并入国际标准化组织（ISO）文件。具体的来说,1GiB=1024MiB，1MiB=1024KiB。他们与GB、MB、KB是不一样的，GB等则是1000进位的数据单位。

根据Wikipedia的注译，GB（gigabyte）是十进制的容量单位，1GB等于1,000,000,000 Bytes。而二进制的容量单位则是用GiB（Gibibyte）就是Giga Binary Byte，相等于1,073,741,824 Bytes。

所以一个160GB的硬盘其实只有149.0116119 GiB，厂商并没有欺骗顾客，更由于无法精确控制盘面的容量，大多数时候都会提供多余的空间以确保品质。







