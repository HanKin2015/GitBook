# 原始字符串(Raw string literals) 

## 1、简介
literals: 网络	字面量; 常量; 字面值; 直接量; 文字;

翻译一下就是原始的字符串字面值，是不是感觉有点绕，简单说就是字符串中的内容是什么就输出什么，不需要转义。
原始字符串简单来说，“原生的、不加处理的”，字符表示的就是自己（所见即所得），引号、斜杠无需 “\” 转义，比如常用的目录表示，引入原始字符串后，非常方便。

## 2、格式
```
R"(原始字符串)";
```
看到形如：R"" 这样的写法，相信学过Python的童鞋会感到似曾相识。Python支持所谓的“raw string”。Python文档这样介绍raw string：

Both string and bytes literals may optionally be prefixed with a letter 'r' or 'R'; such strings are called raw strings and treat backslashes as literal characters. As a result, in string literals, '\U' and '\u' escapes in raw strings are not treated specially. Given that Python 2.x’s raw unicode literals behave differently than Python 3.x’s the 'ur' syntax is not supported.
从这段文字中我们可以看出，raw string最大的特点就是：它不会对反斜杠'\'进行特殊的转义处理。
那么，它的这一特性有什么好处呢？
不用正则，不知raw string大法好！我们知道，正则表达式里，有很多元字符，当没有raw string时，我们需要在书写正则表达式的时候使用'\\'来表示元字符里的'\'，这样将导致正则表达式变得冗长，而且可读性也会降低。

C++ 11中的raw string，简化了我们在使用regex库时正则表达式的书写。

## 3、示例
```
#include <iostream>

int main()
{
    // 下面两行代码意图说明C++ 11采用一对圆括号以及自定义分割字符串来表示raw string的原因。
    // 1.
    // 如果没有一对圆括号及空的分割字符串做定界处理，R"""将会出现语法错误。Python中，r"""也不会是一个合法的
    // raw string literal。
    std::cout << R"(")" << std::endl; // 输出一个双引号："
    // 2.
    // 自定义分割字符串为：delimiter。分割字符串的长度以及其中包含的字符集，都有明文规定。维基百科：
    // The string delimiter can be any string up to 16 characters in length, including the empty string. 
    // This string cannot contain spaces, control characters, '(', ')', or the '\' character. 
    // 
    // 如果不使用自定义分割字符串，这里：R"()")"编译器无法识别raw string在何处结束。自定义分割字符串的用途
    // 维基百科中也有介绍：
    // The use of this delimiter string allows the user to have ")" characters within raw string literals.
    std::cout << R"delimiter()")delimiter" << std::endl; // 输出：)"

    return 0;
}
```



