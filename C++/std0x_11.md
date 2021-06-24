# c++ 0x和c++ 11的关系

起初：g++编译报错（nullptr' was not declared in this scope）

原因是没有加编译选项：
```
-std=c++0x

or

-std=c++11
 
or

-std=c11
```
结果都编译通过了。

## 来由
上一个版本的C++国际标准是2003年发布的，所以叫C++ 03。然后C++国际标准委员会在研究C++ 03的下一个版本的时候，一开始计划是07年发布，所以最初这个标准叫C++ 07。但是到06年的时候，官方觉得07年肯定完不成C++ 07，而且官方觉得08年可能也完不成。最后干脆叫C++ 0x。x的意思是不知道到底能在07还是08还是09年完成。结果2010年的时候也没完成，最后在2011年终于完成了C++标准。所以最终定名为C++11。






旧的-std=c++0x 只针对那些不支持 -std=c++11的旧编译器版本，他们选择这个名称来表示随后的( 当它还不清楚是否最终会变成 C++10 或者 C++12 时)的特性的初步和不稳定特性。 在C++11标准正式发布之前，他们更改了适应标准变更工作草稿的一些细节。

如果编译器支持 -std=c++11，则没有理由使用 -std=c++0x 。 有关兼容性：甚至可以能存在差异和不兼容性，但这些不仅限于 -std=c++0x的使用，而是编译器的特定版本。 当编译器同时支持两者时，它们应该是相同的。




