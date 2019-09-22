# C++/C

## isspace
用于检查参数c是否为空格字符。
头文件：ctype.h

# std::string::npos
std::string::npos是一个常数，它等于size_type类型可以表示的最大值，用来表示一个不存在的位置,类型一般是std::container_type::size_type。
```
#include <iostream>

int main(int argc, char *argv[]) {
    size_t a = -1;
    std::cout << "a : " << a << std::endl;
    std::cout << "npos : " << std::string::npos << std::endl;
    std::cout << "size_type max : " << std::numeric_limits<std::string::size_type>::max() << std::endl;
    std::cout << "size_t max : " << std::numeric_limits<size_t>::max() << std::endl;
    std::cout << "uint64_t max : " << std::numeric_limits<uint64_t>::max() << std::endl;
    return 0;
}


结果都是：18446744073709551615
```
# replace
c里面的string也有replace函数。

# 字符串太长怎么办
```
#include <iostream>
#include <string>
using namespace std;
 
int main()
{
    //错误示例下一行前不能有空格
    char chstr[] = "abcabc\
                   abcabc";
    //错误示例'\'要紧挨着换行处的字符
    char chstr1[] = "abcabc \
abcabc";
    //方法1
    char chstr2[] = "abcabc\
abcabc";
    //方法2
    char chstr3[] = "abcabc"
        "abcabc";
	return 0;
}
```
