# C++关键字之fallthrough

## 1、如果没有break就会无条件执行后面的case语句

在C++的switch语句中，如果当前case分支中不加break, 便会执行下一个case分支的代码。

如下所示，由于n的值为1，代码首先执行case 1分支，然后又因为case 1分支中没有加break，所以接着执行case 2分支、case 3分支，一直到default分支

## 2、fallthrough
在C++17中引入了fallthrough属性。该属性主要用于switch语句中。

在本应当在case分支中加入break的时候却忘了加了。于是编译器会针对这种情况输出Warning信息，提醒程序员他可能忘了加break了。

但是有些时候我们为了实现一些特定的逻辑，所以有意不加break, 但是又不想听到编译器的抱怨，该怎么样让编译器"闭嘴"呢？此时C++17中引入的fallthrough便派上用场了

## 3、在g++版本5.4.0中未发现警告
g++ study_fallthrough.cpp -W
g++ study_fallthrough.cpp -Wimplicit-fallthrough

-Wimplicit-fallthrough编译器标志自GCC 7以来一直存在，用于警告切换失败的情况，如果程序员无意中忘记向案例添加“break”语句，则可能导致潜在的nug/意外行为。 Linux内核希望很快就能默认启用此警告。

-Wimplicit-fallthrough警告试图明智地处理它，并且只在适当的时候警告程序员/用户，并确认需要切换案例的情况。较新的Linux内核开发人员Gustavo A. R. Silva已经通过这个隐式的fallthrough编译器标志处理了两千多个警告。在当前内核中发出警告的2311种情况中，只有32种情况需要检查，以确定是否存在任何代码错误或假阳性。

在这个过程中，由于这个编译器警告已经解决了许多bug，其中一些错误已经在主线内核中持续了五年多。一旦解决了剩下的情况，该计划将在未来的内核构建中默认启用“-Wimplicit-fallthrough”，以防止类似的错误在未来蔓延到内核中。

后来在g++7.5.0版本上面使用上面命令均能报出对应的警告。

注意必须要加中括号：[[fallthrough]];
