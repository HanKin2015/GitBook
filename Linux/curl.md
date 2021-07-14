# curl命令
在Linux中curl是一个利用URL规则在命令行下工作的文件传输工具，可以说是一款很强大的http命令行工具。它支持文件的上传和下载，是综合传输工具，但按传统，习惯称url为下载工具。


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

## curl和wget区别
curl由于可自定义各种请求参数所以在模拟web请求方面更擅长；wget由于支持ftp和Recursive所以在下载文件方面更擅长。类比的话curl是浏览器，而wget是迅雷9。










