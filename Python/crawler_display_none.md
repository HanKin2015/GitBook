# 爬取仅带有onclick属性的td标签内数据及获取onclick内容

目标：http://www.cszjxx.net/floorinfo/202004160830
属性：hs_zk
隐藏的div：hs_table2_KF2004200091

直接爬取肯定失败，因为查看源码的时候发现根本打不开那部分内容，不过在点击展开列表后可以看见内容。
原因：使用了js渲染动态加载。
仔细一点会发现有个属性是display:none，当点击展开列表后会消失。

## 尝试方法一：爬取动态网页之python+selenium+webdriver
使用selenium，安装conda install selenium
下载chrome驱动文件：http://npm.taobao.org/mirrors/chromedriver
```
# -*- coding: utf-8 -*-
"""
Created on Sat Sep 19 13:18:20 2020

@author: Administrator
"""

import time
from selenium import webdriver
import pandas as pd

chrome_path = r"C:/Program Files (x86)/Google/Chrome/Application/chromedriver.exe"
driver = webdriver.Chrome(chrome_path)
url = 'http://www.cszjxx.net/floorinfo/202004160830'

page = driver.get(url)
time.sleep(2)


div = driver.find_element_by_id('hs_table2_KF2004200091')
time.sleep(2)
print(div)
print(div.get_attribute('innerHTML'))
print(driver.execute_script("return arguments[0].innerHTML", div))
print(div.get_attribute('textContent'))

#elem.click()
#time.sleep(2)
#df = pd.read_html(driver.page_source)
#pd.DataFrame(df).to_csv('./t.csv', index=False)
```

## 方法二：使用POST请求，可行
F12调出调试工具，Network-》All，然后点击展开户室列表可看见一个链接，然后点击看Headers

```
# -*- coding: utf-8 -*-
"""
Created on Sat Sep 19 20:01:57 2020

@author: Administrator
"""

import requests
def test():
    s=requests.session()
    headers={
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding':'gzip, deflate',
        'Accept-Language':'zh-CN,zh;q=0.9',
        'Connection':'keep-alive',
        'Content-Length':'21',
        'Cookie': 'XSRF-TOKEN=eyJpdiI6Iks0SnBGeXJUSEc0ODJnc2t2d1UwN2c9PSIsInZhbHVlIjoiZE8weTJFVklraWppWWU3TFZrXC9hVGx3a0FMcXFTckFOaTJcL3RiMldcL2F2T1VOb0xSRm1WR2JXRDZJb01CUytJSUd3eW5STW50Tko2TExIV25Ca3VqeGc9PSIsIm1hYyI6IjBkZTVmOTFmNWU0MDhiYzBlMzE5MWIyNjk1Njc3NTViOGMzZDc3MGM4NTI4N2I5YmViZWYyNDA3NmNjNzM3MjgifQ%3D%3D; laravel_session=eyJpdiI6IjlCZUJoc0JWZnBxbndIWTY0dStJZmc9PSIsInZhbHVlIjoiTklQbSt5Slg2MG5mU3JFa3RKK1hPdmUwTnBCclRjdmllSnFzOUpOQTJZbURSK3NmM1NzSjF6TDB4VkZzSGRFU1RWWnpKRzhpOTh5azdTdENMVjR4Z1E9PSIsIm1hYyI6IjMxZTM1MThmYjI0MjNjNTFiMDE0YmI3MmE5ZWVjMDAxNWE0MjBiOGU2MWU1OTZmNzAyYzE2OTdlOWJiOGQzYjIifQ%3D%3D',
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        'Host':'www.cszjxx.net',
        'Origin':'http://www.cszjxx.net',
        'Referer':'http://www.cszjxx.net/floorinfo/202004160830',
        'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36',
        'X-Requested-With':'XMLHttpRequest'
    }
    s.headers.update(headers)
    data={
        'ywzh':'KF2005220376',
        'n':'6',
    }
    url='http://www.cszjxx.net/getxx'
    req=s.post(url=url,data=data).text
    print(req.encode('gbk').decode('unicode_escape'))
 
test()
```

## 方法三：使用js执行命令将display改为block（失败）

```
# -*- coding: utf-8 -*-
"""
Created on Sat Sep 19 13:18:20 2020

@author: Administrator
"""

import time
from selenium import webdriver
import pandas as pd

chrome_path = r"C:/Program Files (x86)/Google/Chrome/Application/chromedriver.exe"
driver = webdriver.Chrome(chrome_path)
url = 'http://www.cszjxx.net/floorinfo/202004160830'

page = driver.get(url)
time.sleep(2)


div = driver.find_element_by_class_name('hs_table1')
time.sleep(2)
print(div.get_attribute('style'))
driver.execute_script("arguments[0].style.display = 'block';", div)
print(div.get_attribute('style'))
#elem.click()
time.sleep(2)
print(driver.page_source)
time.sleep(2)
df = pd.read_html(driver.page_source)
pd.DataFrame(df).to_csv('./t.csv', index=False)
```


## 方法四：还是回到原点分析源代码网页
```
<script language="JavaScript">
		function hsjajx(a,b){
            var str = $('#hs_table2_'+a).html().split('</table>');
            $('#hs_table2_'+a).html("获取户室信息中，请稍候");
            $.ajax({
            	type: "post",
            	url: "http://www.cszjxx.net/getxx",
            	data: {ywzh:a,n:b},
            	dataType: "json",
            	success: function(data){
                    if(b == 1){
                        $('#hs_table2_'+a).html('<table><tr><th style="white-space:nowrap">户室号</th><th style="white-space:nowrap">楼层</th><th style="white-space:nowrap">房屋用途</th><th style="white-space:nowrap">房屋类型</th><th style="white-space:nowrap">装修状态</th><th style="white-space:nowrap">建筑面积</th><th style="white-space:nowrap">套内面积</th><th style="white-space:nowrap">分摊面积</th><th style="white-space:nowrap">销售状态</th></tr>'+data+'</table>');
                    }else{
                        $('#hs_table2_'+a).html(str[0]+data+'</table>');
                    }
                    $("#loadertr_"+a+"_"+b).remove();
            	}
            });
		}
		$(function () {
			$(".hs_table1").hide();
			$(".hs_zk").click(function(){
				var n = $(".hs_zk").index(this);
				var c = $(".hs_zk:eq("+n+")").html();
				if(c=="展开户室列表"){
					$(".hs_table1:eq("+n+")").removeAttr('style');
					$(".hs_zk:eq("+n+")").addClass("hs_zk_sq").html("收起户室列表");
				}else {
					$(".hs_table1:eq("+n+")").css('display', 'none');
					$(".hs_zk:eq("+n+")").removeClass("hs_zk_sq").html("展开户室列表");
				}
			})
		})
	</script>
```
