# plantuml

## 1、UML
统一建模语言(Unified Modeling Language，UML)是一种为面向对象系统的产品进行说明、可视化和编制文档的一种标准语言，是非专利的第三代建模和规约语言。UML是面向对象设计的建模工具，独立于任何具体程序设计语言。

(1)为软件系统建立可视化模型。
(2)为软件系统建立构件。
(3)为软件系统建立文档。

UML系统开发中有三个主要的模型：
功能模型：从用户的角度展示系统的功能，包括用例图。
对象模型：采用对象，属性，操作，关联等概念展示系统的结构和基础，包括类别图、对象图。 
动态模型：展现系统的内部行为。包括序列图，活动图，状态图。

## 2、plantuml
官网+学习：https://plantuml.com/zh/
PlantUML是一个可以快速编写UML图的组件。
看懂UML类图和时序图：http://design-patterns.readthedocs.io/zh_CN/latest/read_uml.html

### 2-1、注释
'这是个单行注释

/'
这是个多行注释
'/

注意：单行注释只能在行开头，即第一列

### 2-2、文件后缀
.pu PlantUML Document
.puml PlantUML Diagram

咋发现文件后缀不重要，只跟语法有关，就算我写成了md后缀还是预览出uml图。

.uml这个后缀的文件不是plantuml并不能使用VSCODE插件打开，需要使用staruml软件打开，通过import导入打开。

## 3、安装graphviz和VDCODE插件
1.安装graphviz
2.如果没有安装过jdk，安装jdk，版本不限，可以使用目录中的openjdk-11
3.安装IDE的插件，pycharm可以使用IDEA相同的安装包。
	3.1 打开pycharm settings
	3.2 选中plugins
	3.3 点击齿轮，选择install from disk
	3.4 选择zip包确认即可。zip包不能删除，建议先放到特定的目录。
4. VSCODE安装
	4.1 点击左侧Extensions彩打
	4.2 点击插件框右上角...
	4.3 install from vsix
	4.4 选中jebb.plantuml-2.13.4.vsix

5. 使用方法
	5.1 新建文件,后缀为puml或者pu等
	5.2 按照plantuml语法使用伪代码作图
	5.3 pycharm,IDEA,CLION右侧实时展示预览图,VSCODE需要点击预览
	5.4 右上角点击可以导出图片,支持png,jpeg等格式,如果对缩放以及清晰度要求高也可以使用SVG

## 4、vscode使用plantuml
安装插件jebbs.plantuml-2.13.8.six
快捷键：Alt+D运行预览

### 4-1、hello plantuml示例
```
@startuml
Alice -> Bob: test
@enduml
```

一个文件可以多个样例，互不影响，鼠标点击到哪个范围预览哪个范围代码。

### 4-2、插件安装了，但是快捷键Alt+D无效
查看插件情况，有一个怀疑点：You are in Restricted Mode。
果然，在Trust之后就可以使用插件了，并且其他插件也能正常使用了。

## 5、组件图
参考：https://plantuml.com/zh/component-diagram

### 5-1、组件
组件必须用中括号括起来。
还可以使用关键字component定义一个组件。 并且可以用关键字as给组件定义一个别名。 这个别名可以在稍后定义关系的时候使用。

### 5-2、接口
接口可以使用()来定义(因为这个看起来像个圆)。
还可以使用关键字interface关键字来定义接口。 并且还可以使用关键字as定义一个别名。 这个别名可以在稍后定义关系的时候使用。

更多见：D:\Github\Storage\plantuml




## 6、活动图（流程图）
```
@startuml
start
:Hello world;
:This is on defined on
several **lines**;
end
@enduml
```


## 7、类图
-表示private  
#表示protected 
~表示default,也就是包权限  
_下划线表示static  
斜体表示抽象 

## 8、顺序图
顺序图用 -> , –>, <-, <– 来绘制参与者（Participants）之 间的消息（Message）。
( * ) –> Alice ：( * ) 表示起点












