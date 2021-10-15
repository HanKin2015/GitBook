# AutoHotkey
我是从C、JS、Java、Python这么一路学过来的，头一次觉得它的语法很别扭，特别是"="和":="的区别那里，我用着特别不习惯。而且，它的语法不是很规范，我觉得要么像C、Java那样用括号包裹代码块，要么像Python那样用缩进规范代码块。在AHK，这些都没有限制。可能你会认为这是好事，很自由。但我告诉你，这也会导致代码风格千差万别，读起代码来不知所云，你甚至会读不懂你之前写的代码。

        AHK的功能很强大，它可以读取电脑上显示的任何东西，还能读取输入设备（鼠标键盘）的任何操作，也有窗口界面可以绘制。这对于经常用电脑的人来说无疑提供了很多方便，写个脚本什么的简直不要太高效。

        但除此之外，我看不到它能和主流语言相比的优势。不能面对对象，调试起来麻烦，不能做网页端，局限在windows，可移植性太差等等。

        我之所以把AHK拿来和主流语言比较，是因为它其实还有点专业的意思在里面：是通过编码实现的脚本。它的竞争对手像易语言、脚本精灵，操作比它更简单，功能也很类似。如果能实现同样的效果，为啥不选更简单的呢？

        当然了，AHK的功能我觉得还是稍稍强一点的，而且它体积小啊。所以说这还是要多比较。我当初没用按键精灵，是因为我玩的那个游戏，它检测到按键精灵会封号，而AHK没事。喏，这也可以作为一种优势对吧。

        其实，如果可以的话，去学学Python是最好的。Python是正规军，处处充满了专业的气息。AHK能实现的功能，Python装上pyautogui这个插件也一样可以实现。而且，Python的功能还远不止于此，其实Python最多的用在数据爬取和数据分析上，做软件也很在行，可以说很强大了。


参考：https://zhuanlan.zhihu.com/p/103357456


自动化脚本语言，简单说，它可以帮助完成大量重复性的工作。

```
/*温馨提示*/
;Windows系统默认的Win快捷键:
;Win + E：打开资源管理器;
;Win + D：显示桌面;
;Win + F：打开查找对话框;
;Win + R：打开运行对话框;
;Win + L：锁定电脑;
;Win + PauseBreak：打开系统属性对话框;
;Win + Q: 本地文件 / 网页等搜索;
;Win + U: 打开控制面板－轻松使用设置中心;
;Shift+Ctrl+Esc: 任务管理器;
```

## 1、学习
中文官网：https://www.autoahk.com/help/autohotkey/zh-cn/docs/AutoHotkey.htm

发现它可以拥有自己的界面，可视化方面很不错！

AHK是一个强大的工具，我也无须多说什么。但是我想强调的一点是，autohotkey除了设置基础的热键以外，能对于基本上所有的windows api进行操作（当然是利用AHK包装好的宏）这样的话，我们就可以无需利用VB或是VC这种专用的windows平台开发工具就可以写一些很有用的程序。具体来说，我在我的摘录器中就直接操作了windows的clipboard（剪贴板变量）。只是利用其他编程环境所不能做到的，as far as i know。

什么是热键? 热键是一个发热的按键, 开个玩笑. 热键是用来触发某些动作的按键或组合按键.

桌面右键新建脚本会默认加一段：
```
#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

#NoEnv						推荐用于性能和与未来自动热键版本的兼容性。
; #Warn						启用警告以帮助检测常见错误。
SendMode Input				由于其优越的速度和可靠性，建议用于新脚本。
SetWorkingDir %A_ScriptDir%	确保始发目录一致。
```
有点坑，没有对齐

```
;			单行注释
/**/       	需要注意的是：仅当它们出现在行首时才有效果。
#	Win(Windows 徽标键)
!	Alt
^	Control
+	Shift
&	用于连接两个按键(含鼠标按键) 合并成一个自定义热键.
```

## 2、中级教程-目录
https://www.autoahk.com/archives/4285



