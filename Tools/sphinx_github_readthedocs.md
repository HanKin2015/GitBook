# 使用sphinx、github、readthedocs搭建书环境

参考：https://www.jianshu.com/p/78e9e1b8553a

## 0、简介
GitHub Wiki，适合做知识整理，但排版一般，不方便本地查看。（第一次晓得这个功能的用途）
GitBook，丑，慢。（？？？）

用 Sphinx 生成文档，GitHub 托管文档，再导入到 ReadtheDocs。

Sphinx是一个工具，它能够轻易地创建智慧和优雅的文档，出自Georg Brandl之手，在BSD许可证下授权。它能够把一组 reStructuredText 格式的文件转换成各种输出格式，而且自动地生成交叉引用，生成目录等。也就是说，如果有一个目录，里面包含一堆reST格式的文档（可能子目录里面也同样存在reST格式的文档），Sphinx能够生成一个漂亮的组织结构以及便于浏览和导航的HTML 文件（这些文件在其他的文件夹中）。当然对于同样的来源文件（reST格式），它也能够生成一个能够被编译（生成）PDF版本的LaTeX格式的文件。

## 1、安装环境
pip install sphinx

Anaconda可能自带sphinx

## 2、创建工程
https://dandelioncloud.cn/article/details/1529422782685528066/

sphinx-quickstart

然后进行相应的配置：
输入y（默认n，如果n的话就无source文件夹）
项目名称
作者
版本号
语言（zh_CN）

最后生成：
build 目录 运行make命令后，生成的文件都在这个目录里面
source 目录 放置文档的源文件
make.bat 批处理命令
makefile

使用tree命令可以看见树形结构。

最后使用命令：make.bat html

## 3、切换主题（配置文件）
修改文件conf.py

html_theme = 'sphinx_rtd_theme'

也可以看见刚刚设置的相关配置，可以直接修改。
奇了怪了，一开始使用make html，第二次就不行了，需要安装主题包pip install sphinx_rtd_theme，但是安装失败了。

注意：需要安装这个主题，建议使用conda install sphinx_rtd_theme


## 4、配置markdown的编写


## 5、错误：WARNING: toctree contains reference to nonexisting document warnings
删除后面的:caption: Contents:，未找到保留的方法。
```
.. toctree::
   :maxdepth: 2
   :caption: Contents:
```

## 6、部署到readthedocs官网上
最终项目网站：https://ml-booknote.readthedocs.io

显示特点：左侧栏显示文章的一级标题，分级显示

## 7、后期维护使用
访问网站：https://ml-booknote.readthedocs.io
readthedocs网站（使用github账号登录）：https://readthedocs.org/
github仓库：https://github.com/HanKin2015/ML_BookNote.git

- 在ML_BookNote\source\usage目录下添加新文章，支持md和rst文件
- 还需要在ML_BookNote\source\index.rst里面添加新的文件。。。
- 使用anaconda窗口执行make html即可
- 上库：先将项目上传到git上，然后使用readthedocs的Build version即可

## 8、rst文件可使用sphinx进行解析查看

### 8-1、简介
reStructuredText （ RST 、 ReST 或 reST ）是一种用于文本数据的文件格式，主要用于 Python 编程语言社区的技术文档。

它是Python Doc-SIG（Documentation Special Interest Group）的 Docutils 项目的一部分，旨在为 Python 创建一组类似于 Java 的 Javadoc 或 Perl 的 Plain Old Documentation（pod）的工具。Docutils 可以从 Python 程序中提取注释和信息，并将它们格式化为各种形式的程序文档。

从这个意义上说，reStructuredText 是一种轻量级标记语言，其设计目的是（a）文档处理软件（如Docutils）可以处理它，（b）读和写 Python 源代码的程序员很容易读它。

reST 解析器的引用实现是 Python 编程语言中的 Docutils 文本处理框架的一个组件，但是还可以使用其他解析器。

没有正式的 mime 类型注册为 reStructuredText，但非官方的是text/x-rst
可以将 RST 文件理解为 Python 使用的 Markup 文件就可以了。

### 8-2、语法
rst语法：D:\Github\GitBook\gitbook\Tools\rst_syntax.md

### 8-3、工具支持
https://zhuanlan.zhihu.com/p/97214287?utm_id=0

reStructuredText 格式的文件可以使用多种工具打开，以下是其中几个常用的工具：

文本编辑器：reStructuredText 格式的文件本质上是文本文件，可以使用任何文本编辑器打开，例如 Windows 下的记事本、Notepad++、Sublime Text、Visual Studio Code 等。

Sphinx：Sphinx 是一个基于 Python 的文档生成工具，支持 reStructuredText 格式，可以将 reStructuredText 格式的文档转换成多种格式，例如 HTML、PDF、EPUB 等。

Docutils：Docutils 是一个 Python 库，提供了解析和转换 reStructuredText 格式的功能，可以将 reStructuredText 格式的文档转换成 HTML、LaTeX、XML 等格式。

GitHub：GitHub 是一个代码托管平台，支持显示 reStructuredText 格式的文档，可以直接在网页上查看和编辑 reStructuredText 格式的文档。

总之，reStructuredText 格式的文件可以使用多种工具打开和编辑，具体选择哪个工具取决于你的需求和习惯。

但是使用vscode发现esbonio库运行失败，不清楚是什么原因：
一个Python包，它提供了许多Sphinx扩展和用于增强的[语言服务器]（https://microsoft.github.io/language-server-protocol/） 编辑人员对*.rst文件的编辑体会。

以下是一些常见的编辑器和IDE以及它们所需的插件或扩展程序：
- Visual Studio Code：安装“reStructuredText”扩展程序。
- PyCharm：在“设置”中启用reStructuredText支持。
- Sublime Text：安装“reStructuredText”插件。
- Atom：安装“language-restructuredtext”和“markdown-preview-plus”插件。
安装这些插件或扩展程序后，您应该能够在编辑器或IDE中打开和编辑reStructuredText文件，并在预览窗口中查看渲染后的效果。

## 9、markup和markdown的区别
Markup和Markdown都是一种文本标记语言，用于在文本中添加格式和结构。它们的主要区别在于语法和用途。

Markup语言是一种通用的文本标记语言，如HTML、XML等。它们使用标签和属性来描述文本的结构和样式。Markup语言通常用于创建网页、电子邮件、文档等。

Markdown语言是一种轻量级的文本标记语言，它使用简单的符号来表示文本的结构和样式。Markdown语言通常用于编写文档、博客、README文件等。Markdown语言的语法简单易学，可以快速地将文本转换为HTML等格式。

因此，Markup语言更加复杂和灵活，适用于创建复杂的文档和网页；而Markdown语言则更加简单和易用，适用于快速编写简单的文本内容。
