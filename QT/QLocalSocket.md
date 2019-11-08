 你可以直接在 main() 函数加载译本文件。
如果要在 MainWindow 中加载，那么需要把加载之前已经构建完的界面元素（用 tr() 处理过需要翻译的那些）重新处理一遍。即：要确定你加载译本文件的时机和需要翻译的文本被调用的时机之间的先后顺序。 



# 

加载翻译文件时，如果是已经加载的窗体，需要重新settext函数，或者可以把设置内容写在一个函数里。

或者重新开启程序一遍。

 https://blog.csdn.net/prompty/article/details/51442130 

 https://www.cnblogs.com/wxh-53919/p/9300458.html 



#  工具-》外部-》QT语言家-》更新翻译，却无法生成.ts文件 

 cmd中手动lupdate -verbose (.pro文件所在路径).pro 

发现ts文件是生成了，但是没有导入到qt cretor界面上。