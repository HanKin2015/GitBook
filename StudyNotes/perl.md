# perl语言学习

## 1、简介
Perl 是 Practical Extraction and Report Language 的缩写，可翻译为 "实用报表提取语言"。
Perl 最初的设计者为拉里·沃尔（Larry Wall），于1987年12月18日发表。
Perl 最重要的特性是Perl内部集成了正则表达式的功能，以及巨大的第三方代码库CPAN。
由于其灵活性，Perl被称为脚本语言中的瑞士军刀。
建议的解决方法是在程序里使用use strict;以及use warnings;，并统一代码风格，使用库，而不是自己使用"硬编码"。Perl同样可以将代码书写得像Python或Ruby等语言一样优雅。
很多时候，perl.exe进程会占用很多的内存空间，虽然只是一时，但是感觉不好。

## 2、安装
ActiveState Perl和 Strawberry Perl最大的区别是 Strawberry Perl 里面有多包含一些 CPAN 里的模块

```
$ tar -xzf perl-5.x.y.tar.gz
$ cd perl-5.x.y
$ ./Configure -de
$ make
$ make test
$ make install
接下来我们如果 perl -v 命令查看是否安装成功。

安装成功后，Perl 的安装路径为 /usr/local/bin ，库安装在 /usr/local/lib/perlXX, XX 为版本号。
```

## 3、hello world
```
[root@ubuntu0006:/media/hankin/vdb/perl] #vim helloworld.pl
[root@ubuntu0006:/media/hankin/vdb/perl] #perl helloworld.pl
Hello, World!
[root@ubuntu0006:/media/hankin/vdb/perl] #cat helloworld.pl
#!/usr/bin/perl -w

print "Hello, World!\n";

[root@ubuntu0006:/media/hankin/vdb/perl] #whereis perl
perl: /usr/bin/perl /usr/bin/perl5.22-x86_64-linux-gnu /etc/perl /usr/share/perl /usr/share/man/man1/perl.1.gz
[root@ubuntu0006:/media/hankin/vdb/perl] #chmod +x helloworld.pl
[root@ubuntu0006:/media/hankin/vdb/perl] #./helloworld.pl
Hello, World!
Hello, world!

perl -v    查看版本
perl -c 脚本.pl  可以检查脚本语法合法性
在 perl 的路径上也可以加上 -w，可以显示程序中出现的一些警告，尽管可能不影响程序的执行结果，方便我们修改我们的程序（#!/usr/bin/perl -w）。

-w	允许很多有用的警告
-W	允许所有警告
-X	禁用使用警告
-e program	执行 perl 代码
```

## 4、速成基本语法
perl 也支持多行注释，最常用的方法是使用 POD(Plain Old Documentations) 来进行多行注释。方法如下:
```
实例
#!/usr/bin/perl
 
# 这是一个单行注释
print "Hello, world\n";
 
=pod 注释
这是一个多行注释
这是一个多行注释
这是一个多行注释
这是一个多行注释
=cut
```
注意：

=pod、 =cut只能在行首。
以=开头，以=cut结尾。
=后面要紧接一个字符，=cut后面可以不用。


pl、pm、PL后缀
所有类型的空白如：空格，tab ，空行等如果在引号外解释器会忽略它，如果在引号内会原样输出。
Perl双引号和单引号的区别: 双引号可以正常解析一些转义字符与变量，而单引号无法解析会原样输出。

Here文档又称作heredoc、hereis、here-字串或here-脚本，是一种在命令行shell（如sh、csh、ksh、bash、PowerShell和zsh）和程序语言（像Perl、PHP、Python和Ruby）里定义一个字串的方法。
```
#!/usr/bin/perl
 
$a = 10;
$var = <<"EOF";
这是一个 Here 文档实例，使用双引号。
可以在这输如字符串和变量。
例如：a = $a
EOF
print "$var\n";
 
$var = <<'EOF';
这是一个 Here 文档实例，使用单引号。
例如：a = $a
EOF
print "$var\n";
```
EOF在这里通俗讲就是一个标记，他用来标记一段文字（一般都是多行的，省得编码麻烦，用"<<"加上一个标记就可以把一大段代码存入到一个变量中去了）
$a=<< “EOF” 的意思就是说：下一行开始，直到遇见“EOF”为止，所有的字符都按照指定的格式存入变量a中。
你可以用EEE，MAMA等等其他的名字都可以，就是一个标记而已。他的作用就是简化输入。

标识符区分大小写，$runoob 与 $Runoob 表示两个不同变量。

## 5、数据类型
Perl 有三个基本的数据类型：标量、数组、哈希。
```
$myfirst=123;　    	# 数字123　
$mysecond="123";   	# 字符串123
@arr=(1,2,3)		# 数组
@names = ("google", "runoob", "taobao");
print "\$ages[0] = $ages[0]\n";	# 数组访问
%h=('a'=>1,'b'=>2); # 哈希
%data = ('google', 45, 'runoob', 30, 'taobao', 40);
print "\$data{'google'} = $data{'google'}\n";	# 哈希访问
```

Perl 实际上把整数存在你的计算机中的浮点寄存器中，所以实际上被当作浮点数看待。

```
浮点数的误差，下面栗子很有意思
#!/usr/bin/perl 
 
$value = 9.01e+21 + 0.01 - 9.01e+21;
print ("第一个值为：", $value, "\n");	#0
$value = 9.01e+21 - 9.01e+21 + 0.01;
print ("第二个值为:", $value, "\n");	#0.01
```

## 6、变量
Perl 为每个变量类型设置了独立的命令空间，所以不同类型的变量可以使用相同的名称，你不用担心会发生冲突。例如 $foo 和 @foo 是两个不同的变量。
可以在程序中使用 use strict 语句让所有变量需要强制声明类型。

所谓上下文：指的是表达式所在的位置。
上下文是由等号左边的变量类型决定的，等号左边是标量，则是标量上下文，等号左边是列表，则是列表上下文。
Perl 解释器会根据上下文来决定变量的类型。
```
这么有意思。。。
#!/usr/bin/perl
 
@names = ('google', 'runoob', 'taobao');
 
@copy = @names;   # 复制数组
$size = @names;   # 数组赋值给标量，返回数组元素个数
 
print "名字为 : @copy\n";
print "名字数为 : $size\n";
```

## 7、标量
```
$str = "hello" . "world";       # 字符串连接  helloworld
$num = 5 + 10;                  # 两数相加
$mul = 4 * 5;                   # 两数相乘
$mix = $str . $num;             # 连接字符串和数字 helloworld15
```
标量是一个简单的数据单元。

标量可以是一个整数，浮点数，字符，字符串，段落或者一个完整的网页。

v 字符串:一个以 v 开头,后面跟着一个或多个用句点分隔的整数,会被当作一个字串文本。

## 8、数组
```
@array = qw/这是 一个 数组/;
@var_10 = (1..10);
@var_20 = (10..20);
@var_abc = ('a'..'z');
 
print "@var_10\n";   # 输出 1 到 10
@array = (1,2,3);
$array[50] = 4;
 
$size = @array;
$max_index = $#array;
 
print "数组大小:  $size\n";
print "最大索引: $max_index\n";


# 创建一个简单是数组
@sites = ("google","runoob","taobao");
$new_size = @sites ;
print "1. \@sites  = @sites\n"."原数组长度 ：$new_size\n";
# 在数组结尾添加一个元素
$new_size = push(@sites, "baidu");
print "2. \@sites  = @sites\n"."新数组长度 ：$new_size\n";
 
# 在数组开头添加一个元素
$new_size = unshift(@sites, "weibo");
print "3. \@sites  = @sites\n"."新数组长度 ：$new_size\n";
 
# 删除数组末尾的元素
$new_byte = pop(@sites);
print "4. \@sites  = @sites\n"."弹出元素为 ：$new_byte\n";
 
# 移除数组开头的元素
$new_byte = shift(@sites);
print "5. \@sites  = @sites\n"."弹出元素为 ：$new_byte\n";

@nums = (1..20);
print "替换前 - @nums\n";
 
splice(@nums, 5, 5, 21..25); 
print "替换后 - @nums\n";

$var_names = "google,taobao,runoob,weibo";
 
# 字符串转为数组
@names  = split(',', $var_names);

# 数组转为字符串
$string1 = join( '-', @string );

# 对数组进行排序
@sites = sort(@sites);
print "排序后: @sites\n";

特殊变量 $[ 表示数组的第一索引值，一般都为 0 ，如果我们将 $[ 设置为 1，则数组的第一个索引值即为 1，第二个为 2，以此类推。
# 定义数组
@sites = qw(google taobao runoob facebook);
print "网站: @sites\n";
 
# 设置数组的第一个索引为 1
$[ = 1;
 
print "\@sites[1]: $sites[1]\n";
print "\@sites[2]: $sites[2]\n";

一般情况我们不建议使用特殊变量 $[，在新版 Perl 中，该变量已废弃。

@odd = (1,3,5);
@even = (2, 4, 6);
# 合并数组
@numbers = (@odd, @even);


# 定义数组
@sites = qw(google taobao runoob facebook);
foreach(@sites){
    print $_."\n";
}
```
perl数组完。https://www.runoob.com/perl/perl-arrays.html

## 9、20210901





