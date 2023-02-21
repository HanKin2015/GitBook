
# 工具之typora

# 1、typora自动添加序号

- 文件-》偏好设置-》外观-》打开主题文件夹

- 新建base.user.css（名字唯一）文件

```CSS
/** initialize css counter */
#write {
	counter-reset: h1
}
h1 {
	counter-reset: h2
}
h2 {
	counter-reset: h3
}
h3 {
	counter-reset: h4
}
h4 {
	counter-reset: h5
}
h5 {
	counter-reset: h6
}
/** put counter result into headings */
#write h1:before {
    counter-increment: h1;
    content: counter(h1) ". "
}
#write h2:before {
    counter-increment: h2;
    content: counter(h1) "." counter(h2) ". "
}
#write h3:before,
h3.md-focus.md-heading:before /** override the default style for focused headings */ {
    counter-increment: h3;
    content: counter(h1) "." counter(h2) "." counter(h3) ". "
}
#write h4:before,
h4.md-focus.md-heading:before {
    counter-increment: h4;
    content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) ". "
}
#write h5:before,
h5.md-focus.md-heading:before {
    counter-increment: h5;
    content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) ". "}
#write h6:before,
h6.md-focus.md-heading:before {
    counter-increment: h6;
    content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) "." counter(h6) ".
"}
/** override the default style for focused headings */
#write>h3.md-focus:before,
#write>h4.md-focus:before,
#write>h5.md-focus:before,
#write>h6.md-focus:before,
h3.md-focus:before,
h4.md-focus:before,
h5.md-focus:before,
h6.md-focus:before {
    color: inherit;
    border: inherit;
    border-radius: inherit;
    position: inherit;
    left:initial;
    float: none;
    top:initial;
    font-size: inherit;
    padding-left: inherit;
    padding-right: inherit;
    vertical-align: inherit;
    font-weight: inherit;
    line-height: inherit;
}
```



文件中的句号.就是数字间隔符号，可以修改成自己喜欢的样式。



```CSS
/* 正文标题区: #write */
/* [TOC]目录树区: .md-toc-content */
/* 侧边栏的目录大纲区: .sidebar-content */

/** 
 * 说明：
 *     Typora的标题共有6级，从h1到h6。
 *     我个人觉得h1级的标题太大，所以我的标题都是从h2级开始。
 *     个人习惯每篇文章都有一个总标题，有一个目录，所以h2级的标题前两个都不会计数。
 *     一般情况下，我虽然不使用h1级的标题，但是为了以防万一，h1级的标题前两个也都不会计数。
 *     若想启用h1级标题，就取消包含“content: counter(h1) "."”项的注释，然后将包含“content: counter(h2) "."”的项注释掉即可。
 */ 
/** initialize css counter */
#write, .sidebar-content,.md-toc-content{
	/* 设置全局计数器的基准 */
	/* 因为我喜欢从h2级标题用起，所以这里设置为h2 */
    counter-reset: h2
}

#write h1, .outline-h1, .md-toc-item.md-toc-h1 {
    counter-reset: h2
}

#write h2, .outline-h2, .md-toc-item.md-toc-h2 {
    counter-reset: h3
}

#write h3, .outline-h3, .md-toc-item.md-toc-h3 {
    counter-reset: h4
}

#write h4, .outline-h4, .md-toc-item.md-toc-h4 {
    counter-reset: h5
}

#write h5, .outline-h5, .md-toc-item.md-toc-h5 {
    counter-reset: h6
}

/** put counter result into headings */
#write h1:before,
.outline-h1>.outline-item>.outline-label:before,
.md-toc-item.md-toc-h1>.md-toc-inner:before {
    counter-increment: h1;
    content: counter(h1) ". "
}

/* 使用h1标题时，去掉前两个h1标题的序号，包括正文标题、目录树和大纲 */
/* nth-of-type中的数字表示获取第几个h1元素，请根据情况自行修改。 */
#write h1:nth-of-type(1):before,
.outline-h1:nth-of-type(1)>.outline-item>.outline-label:before,
.md-toc-item.md-toc-h1:nth-of-type(1)>.md-toc-inner:before,
#write h1:nth-of-type(2):before,
.outline-h1:nth-of-type(2)>.outline-item>.outline-label:before,
.md-toc-item.md-toc-h1:nth-of-type(2)>.md-toc-inner:before{
	counter-reset: h1;
	content: ""
}

#write h2:before,
.outline-h2>.outline-item>.outline-label:before,
.md-toc-item.md-toc-h2>.md-toc-inner:before {
    counter-increment: h2;
    content: counter(h2) ". "
}

/* 使用h2标题时，去掉前两个h2标题的序号，包括正文标题、目录树和大纲 */
/* nth-of-type中的数字表示获取第几个h2元素，请根据情况自行修改。 */
#write h2:nth-of-type(1):before,
.outline-h2:nth-of-type(1)>.outline-item>.outline-label:before,
.md-toc-item.md-toc-h2:nth-of-type(1)>.md-toc-inner:before,
#write h2:nth-of-type(2):before,
.outline-h2:nth-of-type(2)>.outline-item>.outline-label:before,
.md-toc-item.md-toc-h2:nth-of-type(2)>.md-toc-inner:before{
	counter-reset: h2;
	content: ""
}

#write h3:before,
h3.md-focus.md-heading:before, /** override the default style for focused headings */
.outline-h3>.outline-item>.outline-label:before,
.md-toc-item.md-toc-h3>.md-toc-inner:before {
	text-decoration: none;
    counter-increment: h3;
    /* content: counter(h1) "." counter(h2) "." counter(h3) ". " */
    content: counter(h2) "." counter(h3) ". "
}

#write h4:before,
h4.md-focus.md-heading:before,
.outline-h4>.outline-item>.outline-label:before,
.md-toc-item.md-toc-h4>.md-toc-inner:before {
	text-decoration: none;
    counter-increment: h4;
    /* content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) ". " */
    content: counter(h2) "." counter(h3) "." counter(h4) ". "
}

#write h5:before,
h5.md-focus.md-heading:before,
.outline-h5>.outline-item>.outline-label:before,
.md-toc-item.md-toc-h5>.md-toc-inner:before {
	text-decoration: none;
    counter-increment: h5;
    /* content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) ". " */
    content: counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) ". "
}

#write h6:before,
h6.md-focus.md-heading:before,
.outline-h6>.outline-item>.outline-label:before,
.md-toc-item.md-toc-h6>.md-toc-inner:before {
	text-decoration: none;
    counter-increment: h6;
    /* content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) "." counter(h6) ". " */
    content: counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) "." counter(h6) ". "
}

/** override the default style for focused headings */
#write>h3.md-focus:before,
#write>h4.md-focus:before,
#write>h5.md-focus:before,
#write>h6.md-focus:before,
h3.md-focus:before,
h4.md-focus:before,
h5.md-focus:before,
h6.md-focus:before {
    color: inherit;
    border: inherit;
    border-radius: inherit;
    position: inherit;
    left:initial;
    float: none;
    top:initial;
    font-size: inherit;
    padding-left: inherit;
    padding-right: inherit;
    vertical-align: inherit;
    font-weight: inherit;
    line-height: inherit;
}
```



下面这个版本没有修改过来，还需要修改完善。



还有一个问题，虽然这样添加了自动编号，但是实际上原始文件是没有添加编号的。。。。。。

***因此，还是自己养成一个添加编号的好习惯吧。***



参考：

https://blog.csdn.net/qq_33159059/article/details/87910522

https://blog.csdn.net/qq_21768483/article/details/84562095

# 2、修改标题的级数

快捷键ctrl+数字，如`ctrl+2`。 

# 3、**Pandoc**

**Pandoc**是由[John MacFarlane](https://baike.baidu.com/item/John MacFarlane)开发的[标记语言](https://baike.baidu.com/item/标记语言/5964436)转换工具，可实现不同标记语言间的格式转换，堪称该领域中的“[瑞士军刀](https://baike.baidu.com/item/瑞士军刀/152816)”。



Pandoc使用[Haskell](https://baike.baidu.com/item/Haskell)语言编写，以[命令行](https://baike.baidu.com/item/命令行)形式实现与用户的交互，可支持多种操作系统；Pandoc采用[GNU GPL](https://baike.baidu.com/item/GNU GPL)授权协议发布，属于[自由软件](https://baike.baidu.com/item/自由软件)。



# 4、typora入门

Markdown的语法因不同的解析器或编辑器而异，Typora使用的是[GitHub Flavored Markdown](https://help.github.com/articles/basic-writing-and-formatting-syntax/)。

## 4-1、常用快捷键

- 加粗： `Ctrl/Cmd + B`
- 标题： `Ctrl/Cmd + H`
- 插入链接： `Ctrl/Cmd + K`
- 插入代码： `Ctrl/Cmd + Shift + C`
- 行内代码： `Ctrl/Cmd + Shift + K`
- 插入图片： `Ctrl/Cmd + Shift + I`
- 无序列表： `Ctrl/Cmd + Shift + L`
- 撤销： `Ctrl/Cmd + Z`
- 一级标题：快捷键为Crtl + 1，以此类推