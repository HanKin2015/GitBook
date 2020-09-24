[TOC]

# python爬虫


## Python爬虫架构
Python 爬虫架构主要由五个部分组成，分别是调度器、URL管理器、网页下载器、网页解析器、应用程序（爬取的有价值数据）。

调度器：相当于一台电脑的CPU，主要负责调度URL管理器、下载器、解析器之间的协调工作。
URL管理器：包括待爬取的URL地址和已爬取的URL地址，防止重复抓取URL和循环抓取URL，实现URL管理器主要用三种方式，通过内存、数据库、缓存数据库来实现。
网页下载器：通过传入一个URL地址来下载网页，将网页转换成一个字符串，网页下载器有urllib2（Python官方基础模块）包括需要登录、代理、和cookie，requests(第三方包)
网页解析器：将一个网页字符串进行解析，可以按照我们的要求来提取出我们有用的信息，也可以根据DOM树的解析方式来解析。网页解析器有正则表达式（直观，将网页转成字符串通过模糊匹配的方式来提取有价值的信息，当文档比较复杂的时候，该方法提取数据的时候就会非常的困难）、html.parser（Python自带的）、beautifulsoup（第三方插件，可以使用Python自带的html.parser进行解析，也可以使用lxml进行解析，相对于其他几种来说要强大一些）、lxml（第三方插件，可以解析 xml 和 HTML），html.parser 和 beautifulsoup 以及 lxml 都是以 DOM 树的方式进行解析的。
应用程序：就是从网页中提取的有用数据组成的一个应用。

## 简介
- urllib和正则+scrapy框架（适合所有，但是笨重）
- requests和BeautifulSoup（不适合复杂的网页页面）
- lxml（速度最快）

推荐lxml



# 如何爬取网页表格数据
https://www.zhihu.com/question/26385408
爬山虎采集
直接用pandas啊，简单方便selenium

import pandas as pd
data =pd.read_html(url)[0]


gooseeker.com

http://www.pa1pa.com

使用requests + BeautifulSoup 使用简单。

八爪鱼数据采集器

使用requests+re的路线

