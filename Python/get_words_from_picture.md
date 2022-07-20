# python提取图片中的文字

## 1、储备知识
OCR，全称Optical character recognition，中文译名叫做光学文字识别。它把图像中的字符，转换为机器编码的文本的一种方法。OCR技术在印刷行业应用得非常多，也广泛用于识别图片中的文字数据 – 比如护照，支票，银行声明，收据，统计表单，邮件等。

pytesseract，即Python-tesseract，是Google Tesseract ORC引擎的封装。首次于2014年提出，支持的图片格式有’JPEG’, ‘PNG’, ‘PBM’, ‘PGM’, ‘PPM’, ‘TIFF’, ‘BMP’, ‘GIF’，只需要简短的代码就能够提取图片中的字符合文字了，极大方便文字工作。

## 2、Tesseract-OCR
Tesseract-OCR 是一款由HP实验室开发由Google维护的开源OCR（Optical Character Recognition , 光学字符识别）引擎。与Microsoft Office Document Imaging（MODI）相比，我们可以不断的训练的库，使图像转换文本的能力不断增强；如果团队深度需要，还可以以它为模板，开发出符合自身需求的OCR引擎。
GitHub 地址：https://github.com/tesseract-ocr/tesseract
安装包官方下载地址：https://digi.bib.uni-mannheim.de/tesseract/

在github只看见源代码，在官方地址找到tesseract-ocr-w64-setup-v5.2.0.20220712.exe文件下载。



## 2、准备工作

### 2-1、安装pillow或者PIL，主要用来打开本地图片
pip install PIL
pip install pillow

### 2-2、安装pytesseract，主要用来将图片里面文字转化字符串或者pdf
pip install pytesseract

### 2-3、安装Tesseract-OCR应用程序
进入 ​ ​https://pan.baidu.com/s/1qXumxdltxOnb0geaE_1U-Q​​下载安装





