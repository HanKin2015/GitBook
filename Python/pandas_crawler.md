# 对于pandas爬虫的理解

## 1、pandas.read_html函数
https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_html.html

常用：pandas.read_html(io=url, header=None, encoding='utf-8')[0]

网站：http://www.12365auto.com/zlts/
不适用：
http://datachart.500.com/dlt/history/history.shtml

Request URL：http://datachart.500.com/dlt/history/newinc/history.php?start=22063&end=22092

通过F12键-》Network-》点击网页-》会出现请求页-》然后在Request URL能看见真是的网页即可。

## 2、pandas.read_json函数
https://www.lottery.gov.cn/kj/kjlb.html?plw

Request URL：https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=350133&provinceId=0&pageSize=30&isVerify=1&pageNo=2






