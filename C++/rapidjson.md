# rapidjson

## 1、简介和安装
rapidjson是一个性能非常好的C++ JSON解析器和序列化库，它被包装成了Python3的扩展包，就是说在Python3中可以使用rapidjson进行数据的序列化和反序列化操作并且可以对参数进行校验，非常方便好用。
rapidjson安装命令：pip install python-rapidjson。




## 2、rapidjson基本使用
rapidjson和json模块在基本使用方法上一致的，只不过rapidjson在某些参数方面和json模块不兼容，这些参数并不常用，这里不做过多介绍，详情可参照rapidjson官方文档。基本使用介绍两个序列化的方法dump/dumps，反序列化的load/loads使用json模块的即可。

dumps & dump这两个方法都是将Python实例对象序列化为JSON格式的字符串，用法和参数大致相同，dump方法比dumps方法多了一个必要的file_like参数。





https://github.com/Tencent/rapidjson
https://github.com/Tencent/rapidjson/releases/tag/v1.1.0







