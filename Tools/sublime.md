# 工具之sublime

## 0、特点

### 缺点
Sublime Text 2是一个非常不错的源代码及文本编辑器，但是不支持GB2312和GBK编码在很多情况下会非常麻烦。不过Sublime Package Control所以供的插件可以让Sublime Text 2几乎完美地支持CJK编码的文本。

[sublime text 3.2.1 3207注册（自行破解）方法](https://www.cnblogs.com/nwgdk/p/10987247.html)
[sublime之markdown语法高亮和修改主题](https://www.jianshu.com/p/2a4267e1bae8)

### 优点
小巧、快

## 1、sublime显示制表符(tab和空格符)
不同文件可能按tab键显示的一条线或者4个空格，会有不一样的显示，需要注意一下。

>"draw_white_space": "all"

## 2、修改tab键为缩进为四个空格
// The number of spaces a tab is considered equal to
"tab_size": 4,
// Set to true to insert spaces when tab is pressed
"translate_tabs_to_spaces": true,
//设置保存时自动转换
"expand_tabs_on_save": true

## 3、20201021重新开始使用sublime text3
Sublime Text 是一个文本编辑器（收费软件，可以无限期试用，但是会有激活提示弹窗），同时也是一个先进的代码编辑器。Sublime Text是由程序员Jon Skinner于2008年1月份所开发出来，它最初被设计为一个具有丰富扩展功能的Vim。
提及notepad++大家应该并不陌生，可是软件作者竟是反动人员，此举已经成为人神共愤的事件。转至Sublime Text个人觉得界面简洁，上手程度简单，故推荐给大家。

破解超简单：百度sublime text3211 破解码即可。

## 4、Sublime采用的flatland主题
下载地址https://github.com/thinkpixellab/flatland
下载之后 放在package目录下面

然后在user配置如下：
```
{
	"color_scheme": "Packages/Theme - Flatland/Flatland Dark.tmTheme",
	"font_size": 11,
	"theme": "Flatland Dark.sublime-theme",
	 "update_check": false
}
```


















