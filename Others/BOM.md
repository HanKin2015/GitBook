
＃　字符编码

BOM——Byte Order Mark，就是字节序标记

在UCS 编码中有一个叫做"ZERO WIDTH NO-BREAK SPACE"的字符，它的编码是FEFF。而FFFE在UCS中是不存在的字符，所以不应该出现在实际传输中。UCS规范建议我们在传输字节流前，先传输字符"ZERO WIDTH NO-BREAK SPACE"。这样如果接收者收到FEFF，就表明这个字节流是Big-Endian的；如果收到FFFE，就表明这个字节流是Little-Endian的。因此字符"ZERO WIDTH NO-BREAK SPACE"又被称作BOM。

UTF-8不需要BOM来表明[字节顺序](https://www.baidu.com/s?wd=字节顺序&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)，但可以用BOM来表明编码方式。字符"ZERO WIDTH NO-BREAK SPACE"的UTF-8编码是EF BB BF。所以如果接收者收到以EF BB BF开头的字节流，就知道这是UTF-8编码了。

UTF-8编码的文件中，BOM占三个字节。如果用记事本把一个文本文件另存为UTF-8编码方式的话，用UE打开这个文件，切换到十六进制编辑状态就可以看到开头的FFFE了。这是个标识UTF-8编码文件的好办法，软件通过BOM来识别这个文件是否是UTF-8编码，很多软件还要求读入的文件必须带BOM。可是，还是有很多软件不能识别BOM。

在Firefox早期的版本里，扩展是不能有BOM的，不过Firefox 1.5以后的版本已经开始支持BOM了。现在又发现，PHP也不支持BOM。PHP在设计时就没有考虑BOM的问题，也就是说他不会忽略UTF-8编码的文件开头BOM的那三个字符。

由于必须在在[Bo-Blog](https://www.baidu.com/s?wd=Bo-Blog&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)的wiki看到，同样使用PHP的[Bo-Blog](https://www.baidu.com/s?wd=Bo-Blog&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)也一样受到BOM的困扰。其中有提到另一个麻烦：“受COOKIE送出机制的限制，在这些文件开头已经有BOM的文件中，COOKIE无法送出（因为在COOKIE送出前PHP已经送出了文件头），所以登入和登出功能失效。一切依赖COOKIE、SESSION实现的功能全部无效。”这个应该就是Wordpress后台出现空白页面的原因了，因为任何一个被执行的文件包含了BOM，这三个字符都将被送出，导致依赖cookies和session的功能失效。

解决的办法嘛，如果只包含英文字符(或者说ASCII编码内的字符)，就把文件存成ASCII码方式吧。用UE等编辑器的话，点文件->转换->UTF-8转ASCII，或者在另存为里选择ASCII编码。如果是DOS格式的行尾符，可以用记事本打开，点另存为，选ASCII编码。如果包含中文字符的话，可以用UE的另存为功能，选择“UTF-8 无 BOM”即可。



BOM——Byte Order Mark，就是字节序标记

概念：
在UCS 编码中有一个叫做”ZERO WIDTH NO-BREAK SPACE“的字符，它的编码是FEFF。而FFFE在UCS中是不存在的字符，所以不应该出现在实际传输中。
UCS规范建议我们在传输字节流前，先传输 字符”ZERO WIDTH NO-BREAK SPACE“。
如果接收者收到FEFF，就表明这个字节流是大字节序的；如果收到FFFE，就表明这个字节流是小字节序的。因此字符”ZERO WIDTH NO-BREAK SPACE“又被称作BOM。
作用
UTF-8不需要BOM来表明字节顺序，但可以用BOM来表明编码方式。字符”ZERO WIDTH NO-BREAK SPACE“的UTF-8编码是EF BB BF。所以如果接收者收到以EF BB BF开头的字节流，就知道这是UTF-8编码了。

对php的影响
PHP在设计时就没有考虑BOM的问题，也就是说他不会忽略UTF-8编码的文件开头BOM的那三个字符。
受COOKIE送出机制的限制，在这些文件开头已经有BOM的文件中，COOKIE无法送出（因为在COOKIE送出前PHP已经送出了文件头），也就是说，凡是不能够在执行之前进行输出的代码都将无效
解决方法
通常把文件保存为不带BOM的UTF-8文件。
————————————————
版权声明：本文为CSDN博主「change_any_time」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/change_any_time/article/details/79572370