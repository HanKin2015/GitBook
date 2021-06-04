# 学习batch

## 1、百度百科
批处理(Batch)，也称为批处理脚本。顾名思义，批处理就是对某对象进行批量的处理，通常被认为是一种简化的脚本语言，它应用于DOS和Windows系统中。批处理文件的扩展名为bat 。目前比较常见的批处理包含两类：DOS批处理和PS批处理。PS批处理是基于微软的强大的PowerShell的，用来批量处理一些任务的脚本；而DOS批处理则是基于DOS命令的，用来自动地批量地执行DOS命令以实现特定操作的脚本。更复杂的情况，需要使用if、for、goto等命令控制程式的运行过程，如同C、Basic等高级语言一样。如果需要实现更复杂的应用，利用外部程式是必要的，这包括系统本身提供的外部命令和第三方提供的工具或者软件。批处理程序虽然是在命令行环境中运行，但不仅仅能使用命令行软件，任何当前系统下可运行的程序都可以放在批处理文件中运行。
有些人认为批处理语言的含义要比上面的描述更广泛，还包括许多软件自带的批处理语言，如 Microsoft Office、Visual Studio、Adobe Photoshop 所内置的批处理语言的功能，用户可通过它们让相应的软件执行自动化操作（例如调整某个资料夹所有 PSD 图档的解析度）。 而这类批处理语言也大多提供把一系列操作录制为批处理文件的功能，这样用户不必写程式就能得到批处理程序。


批处理文件具有.bat或者.cmd的扩展名。


## 2、注释和暂停命令
```
::和rem还是有区别的，当关闭回显时，rem和::后的内容都不会显示。但是当打开回显时，rem后的内容会显示出来，然而::后的内容仍然不会显示。

暂停命令。运行 Pause 命令时，将显示下面的消息：
Press any key to continue. . .（或：请按任意键继续. . .)
```

## 3、没有理解的一句话
在批处理文件的开头，通常有：
@echo off
原因是"@"可以将本行的命令关闭回显，搭配"echo off"就可以不显示"echo off"的回显了。

回显，就是显示正在执行的批处理命令及执行的结果等。

通过百度百科回显这一词终于明白了。

```
D:\Github\Storage\batch>Rem 输出hello world

D:\Github\Storage\batch>echo hello world
hello world

D:\Github\Storage\batch>set /p "input=>"
>well good

D:\Github\Storage\batch>echo 您输入的是well good
您输入的是well good

D:\Github\Storage\batch>pause
请按任意键继续. . .

hello world
>well good
您输入的是well good
请按任意键继续. . .
```



