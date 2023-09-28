# 什么是 OpenAPI，OpenAPI 规范基本信息
https://blog.csdn.net/api_Anzexi/article/details/131528526
作为一名开发者，往往需要编写程序的 API 文档，尤其是 Web 后端开发者，在跟前端对接 HTTP 接口的时候，一个好的 API 文档能够大大提高协作效率，降低沟通成本，本文就来聊聊如何使用 OpenAPI 构建 HTTP 接口文档。

## 1、什么是 OpenAPI
OpenAPI 是规范化描述 API 领域应用最广泛的行业标准，由 OpenAPI Initiative(OAI) 定义并维护，同时也是 Linux 基金会下的一个开源项目。通常我们所说的 OpenAPI 全称应该是 OpenAPI Specification(OpenAPI 规范，简称 OSA)，它使用规定的格式来描述 HTTP RESTful API 的定义，以此来规范 RESTful 服务开发过程。使用 JSON 或 YAML 来描述一个标准的、与编程语言无关的 HTTP API 接口。OpenAPI 规范最初基于 SmartBear Software 在 2015 年捐赠的 Swagger 规范演变而来，目前最新的版本是 v3.1.0。

简单来说，OpenAPI 就是用来定义 HTTP 接口文档的一种规范，大家都按照同一套规范来编写接口文档，能够极大的减少沟通成本。

## 2、OpenAPI 规范基本信息
OpenAPI 规范内容包含非常多的细节，本文无法一一讲解，这里仅介绍常见的基本信息，以 YAML 为例进行说明。YAML 是 JSON 的超集，在 OpenAPI 规范中定义的所有语法，两者之间是可以互相转换的，如果手动编写，建议编写 YAML 格式，更为易读。

OpenAPI 文档编写在一个 .json 或 .yaml 中，推荐将其命名为 openapi.json 或 openapi.yaml，OpenAPI 文档其实就是一个单一的 JSON 对象，其中包含符合 OpenAPI 规范中定义的结构字段。

OpenAPI 规范基本信息如下：
| 字段名       | 类型          | 描述                                                         |
| :----------- | :------------ | :----------------------------------------------------------- |
| openapi      | string        | 必选，必须是 OpenAPI 已发布的合法版本，如 `3.0.1`。          |
| info         | object        | 必选，此字段提供 API 相关的元数据（如描述、作者和联系信息）。 |
| servers      | array[object] | 这是一个 Server 对象的数组，提供到服务器的连接信息。         |
| paths        | object        | 必选，API 提供的可用的路径和操作。                           |
| components   | object        | 一个包含多种结构的元素，可复用组件。                         |
| security     | array         | 声明 API 使用的安全认证机制，目前支持 `HTTP Basic Auth`、`HTTP Bearer Auth`、`ApiKey Auth` 以及 `OAuth2`。 |
| tags         | array         | 提供标签可以为 API 归类，每个标签名都应该是唯一的。          |
| externalDocs | object        | 附加的文档，可以通过扩展属性来扩展文档。                     |

完整的规范：https://spec.openapis.org/oas/latest.html
中文版规范：https://openapi.apifox.cn/
精简的规范：https://learn.openapis.org/

## 3、OpenAPI规范：打造高效快速的接口解决方案
OpenAPI 是描述 HTTP API 的标准方式。

### OpenAPI 版本号规范
OpenAPI 的版本号是使用 major.minor.patch 格式来定义的，比如 3.1.2
major： 规定大版本
minor： 规定小版本
patch： 规定小版本中的修补

### OpenAPI 格式规范
OpenAPI 可以使用 JSON 或 YAML 的格式，且字段区分大小写：

### OpenAPI 文档结构规范
OpenAPI 文档可以是单个文档，也可以多个文档，由你们团队自行决定。在后一种情况， 需要在 Reference Objects 和 Schema Object 中使用 $ref 关键字。

而文档的命名，建议命名为 openapi.json 或 openapi.yaml。

### OpenAPI 数据类型规范
OpenAPI 的数据类型，必须符合 JSON Schema Specification Draft 2020-12 的规范才行
JSON Schema 规范地址：https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#section-4.2.1

### OpenAPI 富文本格式规范
OpenAPI 的 description 字段是支持 CommonMark markdown 格式的，所以在 OpenAPI 中使用富文本，格式必须符合 CommonMark markdown 格式。

### OpenAPI 对象
Info Object
描述 API 的元数据

Contact Object
API 的联系信息

Server Object
API 的服务器对象信息
可以是一个服务器
也可以是多个服务器

Components Object
API 的可复用组件对象

Paths Object
描述 API 的 URL 的对象

Path Item Object
单个路径上可用操作的对象

Operation Object
路径上单个 API 操作的对象

External Documentation Object
拓展外部资源

Parameter Object
参数对象

Request Body Object
单个请求 Body 的对象

Responses Object
API 返回响应的对象

Header Object
请求头的对象


