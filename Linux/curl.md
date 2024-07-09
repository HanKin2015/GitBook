# curl命令
在Linux中curl是一个利用URL规则在命令行下工作的文件传输工具，可以说是一款很强大的http命令行工具。它支持文件的上传和下载，是综合传输工具，但按传统，习惯称url为下载工具。

## 1、简单使用示例
```
# curl http://www.linux.com
执行后，www.linux.com 的html就会显示在屏幕上了

保存网页源代码
# curl http://www.linux.com >> linux.html
# curl -o linux.html http://www.linux.com

下载文件
# curl -O http://www.linux.com/hello.sh
# curl -o dodo1.jpg http:www.linux.com/dodo1.JPG
# curl -O -u 用户名:密码 ftp://www.linux.com/dodo1.JPG
# curl -O ftp://用户名:密码@www.linux.com/dodo1.JPG

在脚本中，这是很常见的测试网站是否正常的用法
# curl -o /dev/null -s -w %{http_code} www.linux.com

# curl http://www.linux.com/hello.sh | bash
```

## 2、curl和wget区别
curl由于可自定义各种请求参数所以在模拟web请求方面更擅长；wget由于支持ftp和Recursive所以在下载文件方面更擅长。类比的话curl是浏览器，而wget是迅雷9。

## 3、docker环境下使用curl命令失败
curl https://www.baidu.com
按道理来说返回网页源代码，但是结果为空。
使用echo $?返回43错误码，使用strace curl https://www.baidu.com可以看见43错误码，但是无法得知发生了什么错误。
https://blog.csdn.net/m0_38110132/article/details/83751703
43    发生内部错误。通常是因为调用函数时传递了错误的参数

## 4、wget下载github文件
linux服务器只有命令行，无界面，只能使用wget命令下载：
github上面有个Download raw file按钮，但是无法直接获取地址，可以通过F12按钮，在Network中，找到Request URL: https://github.com/python/cpython/raw/3.8/Tools/gdb/libpython.py即可。
```
wget https://github.com/python/cpython/raw/3.8/Tools/gdb/libpython.py
```





