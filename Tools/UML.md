# UML统一建模语言

## 1、前言
https://www.zhihu.com/question/385479323

draw.io，Microsoft Visio，ProcessOn，Gliffy，EDrawMax，Mindjet MindManager等，哪个流程图工具好用？

程序员还是该多了解plantuml。

个人强烈推荐draw.io，比ProcessOn好用，而且完全免费、提供客户端支持离线使用，同时还支持在Dropbox、One Drive、Google Drive及本地存储。
Visio绝对是windows系统上不可或缺的一款流程图软件，功能强大，用它制作出来的流程图会透着四个字：专业、逼格，所以它自然成为大部分科研大佬们的首选。但是它不够轻量级，而且需要付费才能使用。
Gliffy不仅可以在线创建流程图，免费用户有30天无限制试用期，试用期过后，部分组件会被锁定（主要是UML和线框图的部分），不能保存私有图表，并且只能保存5张图表。
OmniGraffle（Mac）付费、略贵。只能在mac下使用，功能丰富、可以调整的图形属性很多。
ProcessOn - 免费在线作图，实时协作 免费版存储有限制，类似http://draw.io
EDraw(亿图)，又强大又好用，很容易上手，做出来的东西也漂亮，但收费。

## 2、简介
统一建模语言(Unified Modeling Language，UML)是一种为面向对象系统的产品进行说明、可视化和编制文档的一种标准语言，是非专利的第三代建模和规约语言。UML是面向对象设计的建模工具，独立于任何具体程序设计语言。

(1)为软件系统建立可视化模型。
(2)为软件系统建立构件。
(3)为软件系统建立文档。

UML系统开发中有三个主要的模型：
功能模型：从用户的角度展示系统的功能，包括用例图。
对象模型：采用对象，属性，操作，关联等概念展示系统的结构和基础，包括类别图、对象图。 
动态模型：展现系统的内部行为。包括序列图，活动图，状态图。

## 3、devops （过程、方法与系统的统称）
DevOps（Development和Operations的组合词）是一组过程、方法与系统的统称，用于促进开发（应用程序/软件工程）、技术运营和质量保障（QA）部门之间的沟通、协作与整合。
它是一种重视“软件开发人员（Dev）”和“IT运维技术人员（Ops）”之间沟通合作的文化、运动或惯例。透过自动化“软件交付”和“架构变更”的流程，来使得构建、测试、发布软件能够更加地快捷、频繁和可靠。
它的出现是由于软件行业日益清晰地认识到：为了按时交付软件产品和服务，开发和运维工作必须紧密合作。

## 4、draw.io
在线制图：https://app.diagrams.net/

俗话说：“一图顶百字！”

下载离线版：https://github.com/jgraph/drawio-desktop/releases

## 5、graphviz
graphviz最方便的地方在于能够很快的清晰的画出点与点之间的关系，并且有许多布局算法能够很好的去布局。
安装在任意喜欢的位置。但是需要把安装目录的graphviz/bin加入环境变量PATH里，我这里只写了相对路径。
打开cmd，输入：dot --help。
graphviz中包含了众多的布局器：

dot 默认布局方式，主要用于有向图
neato 基于spring-model(又称force-based)算法
twopi 径向布局
circo 圆环布局
fdp 用于无向图

## 6、plantuml

### 6-1、认识plantuml
严格来说，PlantUML是UML工具，但是我觉得它用来绘制精细的流程图绝对也是可以，而且表现很出色。
选择plantuml与graphviz的理由
visio或者其他成熟的UML制图软件，虽然可以所见即所得，但逃不过要收费。

更因为，graphviz设计了一套完整的脚本语言用于实现描述流程图关系和样式，并且提供python sdk让你在代码里实现各种各样的流程图。

官网+学习：https://plantuml.com/zh/
PlantUML是一个可以快速编写UML图的组件。
看懂UML类图和时序图：http://design-patterns.readthedocs.io/zh_CN/latest/read_uml.html
pdf教程：https://plantuml.com/zh/guide

### 6-2、注释
'这是个单行注释

/'
这是个多行注释
'/

注意：单行注释只能在行开头，即第一列

### 6-3、文件后缀
.pu PlantUML Document
.puml PlantUML Diagram

咋发现文件后缀不重要，只跟语法有关，就算我写成了md后缀还是预览出uml图。

.uml这个后缀的文件不是plantuml并不能使用VSCODE插件打开，需要使用staruml软件打开，通过import导入打开。

### 6-4、安装graphviz和VDCODE插件
1.安装graphviz，graphviz-2.38.msi

2.如果没有安装过jdk，安装jdk，版本不限，可以使用目录中的OpenJDK11U-jdk_x64_windows_hotspot_11.0.3_7.msi
OpenJDK11U-jdk_x64_windows_hotspot_11.0.3_7.msi用于在 Windows 操作系统上安装 OpenJDK 11 的开发工具包（JDK）。OpenJDK 是 Java 平台的开源实现，JDK（Java Development Kit）是用于开发 Java 应用程序的工具包。

使用 Visual Studio Code (VSCode) 的 PlantUML 插件通常需要安装 Java 运行环境（JRE）或 Java 开发工具包（JDK），因为 PlantUML 是基于 Java 的。

不安装也能显示出转换后的图像，但是会有报错：
```
Error found in diagram hello_plantuml-3
WARNING: An illegal reflective access operation has occurred
WARNING: Illegal reflective access by net.sourceforge.plantuml.svg.SvgGraphics (file:/C:/Users/User/.vscode/extensions/jebbs.plantuml-2.13.4/plantuml.jar) to constructor com.sun.org.apache.xalan.internal.xsltc.trax.TransformerFactoryImpl()
WARNING: Please consider reporting this to the maintainers of net.sourceforge.plantuml.svg.SvgGraphics
WARNING: Use --illegal-access=warn to enable warnings of further illegal reflective access operations
WARNING: All illegal access operations will be denied in a future release
```

3.安装IDE的插件，pycharm可以使用IDEA相同的安装包。
    3.1 打开pycharm settings
    3.2 选中plugins
    3.3 点击齿轮，选择install from disk
    3.4 选择zip包确认即可。zip包不能删除，建议先放到特定的目录。

4. VSCODE安装
    4.1 点击左侧Extensions
    4.2 点击插件框右上角...
    4.3 install from vsix
    4.4 选中jebbs.plantuml-2.13.4.vsix

5. 使用方法
    5.1 新建文件,后缀为puml或者pu等
    5.2 按照plantuml语法使用伪代码作图
    5.3 pycharm,IDEA,CLION右侧实时展示预览图,VSCODE需要点击预览
    5.4 右上角点击可以导出图片,支持png,jpeg等格式,如果对缩放以及清晰度要求高也可以使用SVG

### 6-5、vscode使用plantuml
vscode操作plantuml：D:\Github\GitBook\gitbook\Tools\vscode.md

### 6-6、hello plantuml示例
```
@startuml
Alice -> Bob: test
@enduml
```

一个文件可以多个样例，互不影响，鼠标点击到哪个范围预览哪个范围代码。

### 6-7、插件安装了，但是快捷键Alt+D无效
查看插件情况，有一个怀疑点：You are in Restricted Mode。
果然，在Trust之后就可以使用插件了，并且其他插件也能正常使用了。

### 6-8、教程
组件图：https://plantuml.com/zh/component-diagram
组件必须用中括号括起来。
还可以使用关键字component定义一个组件。 并且可以用关键字as给组件定义一个别名。 这个别名可以在稍后定义关系的时候使用。

接口可以使用()来定义(因为这个看起来像个圆)。
还可以使用关键字interface关键字来定义接口。 并且还可以使用关键字as定义一个别名。 这个别名可以在稍后定义关系的时候使用。
更多见：D:\Github\Storage\plantuml

活动图（流程图）
```
@startuml
start
:Hello world;
:This is on defined on
several **lines**;
end
@enduml
```

类图
```
-表示private  
#表示protected 
~表示default,也就是包权限  
_下划线表示static  
斜体表示抽象 
```

顺序图用 -> , –>, <-, <– 来绘制参与者（Participants）之 间的消息（Message）。
( * ) –> Alice ：( * ) 表示起点

## 7、亿图图示
亿图图示，即亿图图示专家(EDraw Max)，是一款基于矢量的绘图工具，包含大量的事例库和模板库。可以很方便的绘制各种专业的业务流程图、组织结构图、商业图表、程序流程图、数据流程图、工程管理图、软件设计图、网络拓扑图等等。它帮助您更方便，更快捷的阐述设计思想，创作灵感。在设计时它采用全拖曳式操作，结合4600多个常用图形模板库和用户自定义实例库，最大程度简化用户的工作量；让你在设计时既可以充分利用固有的素材，又可以借鉴他人的作品。
破解软件：个人百度网盘/EdrawMax 14.1.3.1228.rar

















