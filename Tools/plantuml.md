# plantuml

官网+学习：https://plantuml.com/zh/


## 注释
'这是个单行注释
/'这是个多行注释
'/

注意：单行注释只能在行开头

## 文件后缀
.pu PlantUML Document
.puml PlantUML Diagram

## 1、安装
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

## 顺序图
顺序图用 -> , –>, <-, <– 来绘制参与者（Participants）之 间的消息（Message）。
( * ) –> Alice ：( * ) 表示起点


## 2、vscode使用plantuml
安装插件jebbs.plantuml-2.13.8.six
Alt+D运行预览

基本语法：
```
@startuml
Alice -> Bob: test
@enduml
```

## 3、活动图（流程图）
```
@startuml
start
:Hello world;
:This is on defined on
several **lines**;
end
@enduml
```


## 类图
-表示private  
#表示protected 
~表示default,也就是包权限  
_下划线表示static  
斜体表示抽象 














