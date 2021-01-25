# go语言学习

对于高性能分布式系统领域而言，Go 语言无疑比大多数其它语言有着更高的开发效率。它提供了海量并行的支持，这对于游戏服务端的开发而言是再好不过了。

## 1、认识go
计算机软件经历了数十年的发展，形成了多种学术流派，有面向过程编程、面向对象编程、函数式编程、面向消息编程等，这些思想究竟孰优孰劣，众说纷纭。

除了OOP外，近年出现了一些小众的编程哲学，Go语言对这些思想亦有所吸收。例如，Go语言接受了函数式编程的一些想法，支持匿名函数与闭包。再如，Go语言接受了以Erlang语言为代表的面向消息编程思想，支持goroutine和通道，并推荐使用消息而不是共享内存来进行并发编程。总体来说，Go语言是一个非常现代化的语言，精小但非常强大。

Go 语言最主要的特性：
- 自动垃圾回收
- 更丰富的内置类型
- 函数多返回值
- 错误处理
- 匿名函数和闭包
- 类型和接口
- 并发编程
- 反射
- 语言交互性

## 2、环境搭建
安装包：
https://golang.org/dl/（打不开）
https://golang.google.cn/dl/（打不开下载服务器）
https://studygolang.com/dl（打不开下载服务器）

只能另寻渠道，在百度网盘已经备份两个版本：
go1.13.5.windows-amd64.msi
go1.14.1.windows-amd64.msi
默认情况下 .msi 文件会安装在 c:\Go 目录下。你可以将 c:\Go\bin 目录添加到 Path 环境变量中。添加后你需要重启命令窗口才能生效。（实测不需要，自动添加）

## 3、hello world
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

直接运行:go run helloworld.go
编译运行:(推荐)
go build helloworld.go
helloworld.exe

使用go run helloworld.go运行：成功了一次，一直报错
fork/exec C:\Users\ADMINI~1\AppData\Local\Temp\go-build179016194\b001\exe\helloworld.exe: Access is denied.
可能是安全软件EDR拦截了。

## 4、












