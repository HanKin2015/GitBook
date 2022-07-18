# apiDoc-超简单的文档生成器

https://zhuanlan.zhihu.com/p/83487114

大家所熟知的API文档有swagger等, 今天给大家推荐一个写注释就能生成文档的工具, 真的很简单! http://apidocjs.com/。

生成一个 REST 风格的 Web API 文档。

支持的编程语言：
C#, Go, Dart, Java, JavaScript, PHP(all DocStyle capable languages)
CoffeeScript
Erlang
Ruby

## 1、快速开始
>npm install apidoc -g

新建一个代码目录src，并在同根目录创建配置文件apidoc.json、文档说明、文档结尾。
```
{
  "name": "apidoc-demo",
  "version": "1.2.3",
  "description": "You write something here to describe your project",
  "title": "The title of this doc",
  "header": {
    "title": "文档说明",
    "filename": "header.md"
  },
  "footer": {
    "title": "文档结尾",
    "filename": "footer.md"
  }
}
```

执行命令. -i是指注释文件存放的地方, -o是指文档输出的位置
apidoc -i src/ -o apidoc/

详细例子见：D:\Github\Storage\others\apidoc



