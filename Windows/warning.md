# #pragma warning (disable:4200)什么意思？（清除VS工程的警告方法）

https://blog.csdn.net/misayaaaaa/article/details/79137607

如果项目中的烦人警告太多，可用此方法清除。

关于#pragma warning
　　1.#pragma warning只对当前文件有效（对于.h，对包含它的cpp也是有效的），
　　而不是是对整个工程的所有文件有效。当该文件编译结束，设置也就失去作用。

　　2.#pragma warning(push) 存储当前报警设置。
　　#pragma warning(push, n) 存储当前报警设置，并设置报警级别为n。n为从1到4的自然数。

　　3.#pragma warning(pop)
　　恢复之前压入堆栈的报警设置。在一对push和pop之间作的任何报警相关设置都将失效。

　　4.#pragma warning(disable: n)  将某个警报置为失效

　　5.#pragma warning(default: n)  将报警置为默认

　　6.某些警告如C4309是从上到下生效的。即文件内#pragma warning从上到下遍历，依次生效。
　　
　　例如：
void func()
　　{
　　    #pragma warning(disable: 4189)
　　    char s;
　　    s = 128;
　　    #pragma warning(default: 4189)
　　    char c;
　　    c = 128;
　　}


　　则s = 128不会产生C4309报警，而c = 128会产生C4309报警












