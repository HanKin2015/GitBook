[TOC]
# python学习中的常见问题

我的意中人是个盖世英雄，我知道有一天他会在一个万众瞩目的情况下出现，身披金甲圣衣，脚踏七色云彩来娶我，我猜中了前头，可是我猜不着这结局。

FAQ 即 Frequently Asked Questions 的缩写，表示常见问题，官方列了 27 个常见问题，完整清单在此：https://mp.weixin.qq.com/s/zabIvt4dfu_rf7SmGZXqXg

# 1、IndentationError: unindent does not match any outer indentation level
占位问题，存在两种可能性：1.代码没有对齐 2.存在非法字符与其他格式的不可见的内容（输入法的问题）

# 2、AttributeError: module 'socketserver' has no attribute 'ForkingMixIn'
解决办法：将
SocketServer.ForkingMixIn 替换为 SocketServer.ThreadingMixIn

# 3、为啥不使用switch语句
该文档给出了几个建议，告诉了我们几个 switch/case 的替代方案：

使用 if-elif-else 条件判断语句
使用字典，将 case 值与调用的函数映射起来
使用内置 getattr() 检索特定的对象调用方法

# 4、靶场测试
靶场测试，即 range test，指的是对武器弹药的技术性能作各种测试验证，与药物的临床试验一样，都是在最终产品交付前的一项关键性测试。

# 5、dataframe插入空行
```
    analysis_result = pd.DataFrame(columns=['对应栋号', '出售状态', '总共数量', '100平方', '124平方', '142平方'])
    for sheet_name in sheet_names:
        sold_list, unsold_list, rate_list = analysis_house_sold(data)
        
        sold_list.insert(0, '全部')
        sold_list.insert(0, sheet_name)
        unsold_list.insert(0, '未售')
        unsold_list.insert(0, sheet_name)
        rate_list.insert(0, '去化率')
        rate_list.insert(0, sheet_name)
        nan_list = [np.NaN, np.NaN, np.NaN, np.NaN, np.NaN, np.NaN]
        
        df = pd.DataFrame([sold_list, unsold_list, rate_list, nan_list], columns=analysis_result.columns)
        analysis_result = analysis_result.append(df, ignore_index=True)
        print(analysis_result)
```

# 6、将小数转换为半分数字符串
```
sold_cnt = data.shape[0]
unsold_cnt = unsold_data.shape[0]
rate = (sold_cnt - unsold_cnt) / sold_cnt
rate = format(rate, '.2%')	# 保留两位小数
print(rate)
```

# 7、python调用python文件使用
```main.py
from slave import var
from slave import func

print('var = ', var)
print('10 + 20 = ', func(10, 20))
```

```
var = 12345
def func(a, b):
    return a + b
```

运行结果：
```
var = 12345
10 + 20 = 30
```

# 8、python的import并不能将其py文件中的库文件import进来

# 9、class类的继承和重写函数
```
#父类
class Animal(object):
    def run(self):
        print("animal running-----")
 
#子类
class Cat(Animal):
	# 重写
    def run(self):
        print("cat running-----")
```

# 10、










