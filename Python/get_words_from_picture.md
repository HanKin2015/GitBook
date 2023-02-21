# python提取图片中的文字

## 1、储备知识
OCR，全称Optical character recognition，中文译名叫做光学文字识别。它把图像中的字符，转换为机器编码的文本的一种方法。OCR技术在印刷行业应用得非常多，也广泛用于识别图片中的文字数据 – 比如护照，支票，银行声明，收据，统计表单，邮件等。

pytesseract，即Python-tesseract，是Google Tesseract ORC引擎的封装。首次于2014年提出，支持的图片格式有’JPEG’, ‘PNG’, ‘PBM’, ‘PGM’, ‘PPM’, ‘TIFF’, ‘BMP’, ‘GIF’，只需要简短的代码就能够提取图片中的字符合文字了，极大方便文字工作。

## 2、Tesseract-OCR
Tesseract-OCR 是一款由HP实验室开发由Google维护的开源OCR（Optical Character Recognition , 光学字符识别）引擎。与Microsoft Office Document Imaging（MODI）相比，我们可以不断的训练的库，使图像转换文本的能力不断增强；如果团队深度需要，还可以以它为模板，开发出符合自身需求的OCR引擎。
GitHub 地址：https://github.com/tesseract-ocr/tesseract
安装包官方下载地址：https://digi.bib.uni-mannheim.de/tesseract/

在github只看见源代码，在官方地址找到tesseract-ocr-w64-setup-v5.2.0.20220712.exe文件下载。

双击安装成功，测试。

环境变量还是有必要，如果不设置环境变量就需要在代码中指定tesseract.exe文件路径。
```
(base) D:\Github\Storage\python\study>"C:\Program Files\Tesseract-OCR\tesseract.exe" --version
tesseract v5.2.0.20220712
 leptonica-1.78.0
  libgif 5.1.4 : libjpeg 8d (libjpeg-turbo 1.5.3) : libpng 1.6.34 : libtiff 4.0.9 : zlib 1.2.11 : libwebp 0.6.1 : libopenjp2 2.3.0
 Found SSE4.1
 Found libarchive 3.5.0 zlib/1.2.11 liblzma/5.2.3 bz2lib/1.0.6 liblz4/1.7.5 libzstd/1.4.5
 Found libcurl/7.77.0-DEV Schannel zlib/1.2.11 zstd/1.4.5 libidn2/2.0.4 nghttp2/1.31.0

(base) D:\Github\Storage\python\study>"C:\Program Files\Tesseract-OCR\tesseract.exe" "D:\Github\Storage\python\图片处理\test.png" "D:\Github\Storage\python\图片处理\result"
Estimating resolution as 172
Empty page!!
Estimating resolution as 172
Empty page!!
```
安装教程添加了环境变量也不行，无法进行识别，会不会是版本太新有bug。先使用python代码测试一下。
代码也不能识别。
图片分辨率太低导致，周边加空白，然后重新操作就行了。果然是的，发现使用test1.png就是识别不了，test2.png就能识别。

识别中文需要下载中文包（可以先看一下你的tessdata文件里有没有chi_sim.traineddata文件，这是一个中文包）如果有的话就跳过这一步；如果没有，点下面的链接下载https://github.com/tesseract-ocr/tessdata/find/master/chi_sim.traineddata 下载之后，把它放到tessdata文件里面，就可以识别中文了，在终端输入指令时要加一个命令: -l chi_sim。
​https://pan.baidu.com/s/1GfspC5uef73B2Oa8YudBgQ​​


[python学习之——文字识别库pytesseract初体验](https://www.sohu.com/a/224709698_820120)
试了一下，使用pytesseract识别中文真的不行，试试百度OCR。

## 3、百度云OCR
收费，每天免费500次，拿来完成我们这个图片命名的小脚本足矣！官方文档：文字识别 - Python SDK文档

### 3-1、配置流程
1.开通文字识别服务：https://cloud.baidu.com/product/ocr.html（注册登录实名认证）
2.创建一个应用，然后记下AppID、API Key 和 Secret Key 程序里要用
3.一定要领取免费资源（10分钟生效），不然会报错：{'error_code': 18, 'error_msg': 'Open api qps request limit reached'}
4.pip install baidu-aip
5.demo调用效果确实不错
https://console.bce.baidu.com/ai/?_=1658836473184&fromai=1#/ai/ocr/overview/index

## 4、准备工作

### 4-1、安装pillow或者PIL，主要用来打开本地图片
pip install PIL
pip install pillow

### 4-2、安装pytesseract，主要用来将图片里面文字转化字符串或者pdf
pip install pytesseract

### 4-3、安装Tesseract-OCR应用程序
进入 ​ ​https://pan.baidu.com/s/1qXumxdltxOnb0geaE_1U-Q​​下载安装





