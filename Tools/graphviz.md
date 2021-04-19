# graphviz画图

数据网络的布局，使用graphviz能比较清楚的画出数据之间的关系。
可以在gallery中查看他能完成的图形：http://www.graphviz.org/gallery/。graphviz最方便的地方在于能够很快的清晰的画出点与点之间的关系，并且有许多布局算法能够很好的去布局。

官网下载：http://www.graphviz.org/download/。

安装在任意喜欢的位置。但是需要把安装目录的graphviz/bin加入环境变量PATH里，我这里只写了相对路径。
打开cmd，输入：dot --help。

graphviz中包含了众多的布局器：
```
dot 默认布局方式，主要用于有向图
neato 基于spring-model(又称force-based)算法
twopi 径向布局
circo 圆环布局
fdp 用于无向图
```

因此，不推荐。主要用于画大数据中的点图。
脚本格式：gv或者dot

```
/* courtesy Ian Darwin and Geoff Collyer, Softquad Inc. */
digraph unix {
	size="6,6";
	node [color=lightblue2, style=filled];
	"5th Edition" -> "6th Edition";
	"5th Edition" -> "PWB 1.0";
	"6th Edition" -> "LSX";
	"6th Edition" -> "1 BSD";
	"6th Edition" -> "Mini Unix";
	"6th Edition" -> "Wollongong";
	"6th Edition" -> "Interdata";
	"Interdata" -> "Unix/TS 3.0";
	"Interdata" -> "PWB 2.0";
	"Interdata" -> "7th Edition";
	"7th Edition" -> "8th Edition";
	"7th Edition" -> "32V";
	"7th Edition" -> "V7M";
	"7th Edition" -> "Ultrix-11";
	"7th Edition" -> "Xenix";
	"7th Edition" -> "UniPlus+";
	"V7M" -> "Ultrix-11";
	"8th Edition" -> "9th Edition";
	"1 BSD" -> "2 BSD";
	"2 BSD" -> "2.8 BSD";
	"2.8 BSD" -> "Ultrix-11";
	"2.8 BSD" -> "2.9 BSD";
	"32V" -> "3 BSD";
	"3 BSD" -> "4 BSD";
	"4 BSD" -> "4.1 BSD";
	"4.1 BSD" -> "4.2 BSD";
	"4.1 BSD" -> "2.8 BSD";
	"4.1 BSD" -> "8th Edition";
	"4.2 BSD" -> "4.3 BSD";
	"4.2 BSD" -> "Ultrix-32";
	"PWB 1.0" -> "PWB 1.2";
	"PWB 1.0" -> "USG 1.0";
	"PWB 1.2" -> "PWB 2.0";
	"USG 1.0" -> "CB Unix 1";
	"USG 1.0" -> "USG 2.0";
	"CB Unix 1" -> "CB Unix 2";
	"CB Unix 2" -> "CB Unix 3";
	"CB Unix 3" -> "Unix/TS++";
	"CB Unix 3" -> "PDP-11 Sys V";
	"USG 2.0" -> "USG 3.0";
	"USG 3.0" -> "Unix/TS 3.0";
	"PWB 2.0" -> "Unix/TS 3.0";
	"Unix/TS 1.0" -> "Unix/TS 3.0";
	"Unix/TS 3.0" -> "TS 4.0";
	"Unix/TS++" -> "TS 4.0";
	"CB Unix 3" -> "TS 4.0";
	"TS 4.0" -> "System V.0";
	"System V.0" -> "System V.2";
	"System V.2" -> "System V.3";
}
```



















