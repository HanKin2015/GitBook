[TOC]

# 工具之notepad++

# 1、markdown主题包

网址：https://github.com/Edditoria/markdown-plus-plus

没有获得满意的主题，还是使用typora写md满意。
真相了，原来是我配置错了。有些markdown主题需要配套其notepad++主题。真香~

目前：tomorrow_night_blue  微软雅黑  18
可能左边行号字体小，也可以调整。

typora软件使用占用cpu偏高，通过修改主题还是能接受。

在线更新：
```
:: Check whether you have Node.js installed
node -v

:: Go to UDL folder of Notepad++. Usually...
cd %AppData%\Notepad++\userDefineLangs

:: Example: Download Zenburn UDL file
npx markdown-plus-plus zenburn

:: Read help for details
npx markdown-plus-plus --help
```

离线更新：
将目录C:\Users\Administrator\AppData\Roaming\Notepad++\userDefineLangs下的xml文件拷贝到对应的目录下。该文件也可以在网站上面下载。

推荐使用：Obsidian主题

# 2、个性设置标签栏

设置==》首选项==》常用==》标签栏：多行显示，不缩小

设置==》首选项==》语言==》替换为空格

# 3、notepad++三步配置markdown环境


# 4、显示空格和tab键字符
python对缩进要求高，需要统一全部使用4个空格或者tab键。

视图-》显示符号

整体替换：
		tab键
        空格
		
使用ctrl+f整体替换，复制4个空格或者tab键

设置tab键为四个空格：点击设置 -> 首选项... -> 语言 -> 制表符设置。

# 5、20201021放弃使用
由于Windows7系统无缘无故出现桌面右键刷新会导致死机或者卡顿5秒左右，使用360杀毒软件杀毒后，无缘无故把notepad++删除了。后来我去官网下载软件，发现作者居然是个反动人员，果断不安装了，转sublime text。

参考过vs code 55M软件太大，sublime text3 10M，notepad2和nodepad3 4M，但是没有多标签页功能。

# 6、代码主字体（英文）
## 推荐标准
- 等宽字体：代码才会对齐的整齐，看起来更整洁
- 支持扩展字符集
- 相似字符必须拥有高辨识度！譬如 [‘i’, ‘1’, ‘l’] 与 [‘0′, ‘o’, ‘O’]，还有左右双引号、单引号、尖括号、大括号、中括号、小括号等必须容易辨认区分出来

anti-aliasing

- Consolas【6】
- Source Code Pro【6】
- Monaco（只支持Mac）【10】
- Profont（代替Mnoaco）【7】
- Monofur【4】
- Proggy【8】
- Droid Sans Mono【9】
- Deja Vu Sans Mono【8】
- Inconsolata【9】
- Microsoft Yahei Consolas Hybrid
- Microsoft Yahei UI（不错，但是不是等宽字体）

## 中文字体
Microsfot JhengHei UI


# 7、notepad++主题和字体
主题：不刺激眼睛，代码关键字各种颜色变化
Zerburn+Consolas感觉不错
- Obsidian

## 主题下载
- 使用git克隆到本地
- 直接下载git压缩包

直接拷贝xml文件到C:\Users\User\AppData\Roaming\Notepad++\themes
或者在notepad++中设置-导入-导入主题（失败）。

支持多种编辑器主题：
[Dracula主题](https://draculatheme.com/notepad-plus-plus/)

一是图标，在“设置---首选项---常用”里设置为小图标，二是把标签栏改到了左侧，具体设置方法是，在“标签栏”的选项里勾选“垂直显示”，并去掉“变暗”选项即可（可以顺便勾选一下“双击关闭标签哦，用起来挺方便的”）。

# 8、替换换行符
查找模式更换为 正则表达式
换行符为 \r










