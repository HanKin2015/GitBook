# Beyond Compare

## 1、简介
Beyond Compare
Beyond Compare是一套由Scooter Software推出的文件比较工具。主要用途是对比两个文件夹或者文件，并将差异以颜色标示。比较范围包括目录，文档内容等。

## 2、解决Beyond Compare右键菜单缺失问题
https://blog.csdn.net/sanqima/article/details/100625578

## 3、Beyond Compare软件
作为一个程序猿，一个称心的比较软件还是有必要的。

不免费。

永久使用Beyond compare4 的方法：
打开我的电脑，在这个路径 C:\Users\Administrator\AppData\Roaming\Scooter Software  下找到Beyond Compare 4 文件夹 ，删掉。

但是会自动还原，好像评估时间会重置，暂时先这样解决。


但是还是会过期，报错：你的30天评估期已结束。软件根本打不开。

## 4、Beyond Compare 30天评估期结束解决办法
打开Beyond Compare 4，提示已经超出30天试用期限制

解决方法：

1.修改文件
　　修改C:\Program Files\Beyond Compare 4\BCUnrar.dll ,这个文件重命名或者直接删除，则会新增30天试用期，再次打开提示还有28天试用期。
2.修改注册表
　　①在搜索栏中输入 regedit,打开注册表
　　②删除项目：计算机\HKEY_CURRENT_USER\Software\Scooter Software\Beyond Compare 4\CacheId
 