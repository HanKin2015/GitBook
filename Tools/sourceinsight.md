# 工具之sourceinsight

版本4.0

## 1、标题栏显示完成路径
Options -> Preferences -> Display -> Trim long path names with ellipses.(把复选框的勾选去掉。) 
但是这样并没有达到我的要求，最好是只显示文件名就好了。
Display中有个show search bar不错

## 2、显示空格和tab
View --> Visible Tabs and spaces。把“ Visible Tabs and spaces”勾选上就行了。 

## 3、设置字体
Options-》File Type Options
还原界面布局：View-》Reset Layout

## 4、插件
[Source Insight 3.X 插件支持utf8，完美解决中文乱码，另附优美的配置文件一份](https://blog.csdn.net/wowocpp/article/details/83658976)

非常适用的Sourceinsight插件，提高效率事半功倍](https://blog.csdn.net/weixin_37985816/article/details/79128436)

## 5、中文注释为乱码
【解决办法】：
单个文件乱码解决办法：
      菜单栏中【File】 > 【Reload As Encoding...】 > 【Chinese Simplified (GB18030)】 > 选择后，点击load，问题解决！！！

所有文件乱码解决办法：
    我的理解，在做下面操作的时候，先设置，然后关闭所有打开的文件，然后再打开文件即可
    菜单栏中 【Options】 > 【Preferences】 >File标签中，最下面的“Default encod­ing” ：改成System Default(Windows ANSI) 或者Chinese Simplified(GB2312) CP:936（简体中文的都可以选），点击确定，问题解决！！！

## 6、使用Source Insight时出现"Symbol not found"的问题 —代码跳转
然后在右边的panel面板（有一个Project Files的地方），再箭头指向的地方右键，接下来点击Open Project，然后选择你需要打开的项目确定，然后它会问你是否要同步，当然选择是咯，那么接来下就是Synchronizing了 ，那么结束后你再点击刚才的View，你会发现能跳转了。

## 7、新建项目
- Project-》new
- 如果有项目就关闭当前项目
- 输入新建项目名称（建议与打开的文件夹同名）
- OK-》OK
- Add and Remove Project Files添加全部文件，并且勾选reserve递归添加
- 在文件窗口下面右键Synchronize Files同步文件
完成

## 8、一些个人设置
SI独特的字体显示风格关闭：View -> Mono Font View
代码字体大小修改：没有在Options里面，快捷键Alt+Y，3.5版本的Alt+T。

## 9、常用快捷键
F5：跳行数(ctrl+G)
F2：文件选项卡切换
F8：高亮关键字
F7：快速查找关键字
F6：分屏操作
后退 : Alt+,
后退到索引 : Alt+M
向前 : Alt+.
选择一行 : Shift+F6
F3
本文件查找结果的上一个。 
F4
本文件查找结果的下一个。 





