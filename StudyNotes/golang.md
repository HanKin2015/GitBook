# go语言学习

对于高性能分布式系统领域而言，Go 语言无疑比大多数其它语言有着更高的开发效率。它提供了海量并行的支持，这对于游戏服务端的开发而言是再好不过了。

- 出生名门
	- 诞生于google公司
	- Ken Thompson：Unix操作系统和B语言（C语言的前身）的创造者、UTF-8编码的发明者
	- Rob Pike：Unix项目的参与者、UTF-8编码的联合创始人和Limbo编程语言（Go语言的前身）的创造者
	- Robert Griesemer：著名Javascript引擎V8的创造者
- 语法、数据类型、控制流等继承自C
- 包特性、面向对象特性源于Pascal
- 基于管道通信的协程并发模型借鉴于CSP

Go 语言被设计成一门应用于搭载 Web 服务器，存储集群或类似用途的巨型中央服务器的系统编程语言。

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
推荐：https://golang.google.cn/

只能另寻渠道，在百度网盘已经备份两个版本：
go1.13.5.windows-amd64.msi
go1.14.1.windows-amd64.msi
默认情况下 .msi 文件会安装在 c:\Go 目录下。你可以将 c:\Go\bin 目录添加到 Path 环境变量中。添加后你需要重启命令窗口才能生效。（实测不需要，自动添加）

linux安装：apt install golang-go
查看版本：go version


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

## 4、样例
```
package main

import "fmt"

func main() {
   /* 这是我的第一个简单的程序 */
   fmt.Println("Hello, World!")
}
```
1. 第一行代码 package main 定义了包名。你必须在源文件中非注释的第一行指明这个文件属于哪个包，如：package main。package main表示一个可独立执行的程序，每个 Go 应用程序都包含一个名为 main 的包。

2. 下一行 import "fmt" 告诉 Go 编译器这个程序需要使用 fmt 包（的函数，或其他元素），fmt 包实现了格式化 IO（输入/输出）的函数。

3. 下一行 func main() 是程序开始执行的函数。main 函数是每一个可执行程序所必须包含的，一般来说都是在启动后第一个执行的函数（如果有 init() 函数则会先执行该函数）。

4. 下一行 /*...*/ 是注释，在程序执行时将被忽略。单行注释是最常见的注释形式，你可以在任何地方使用以 // 开头的单行注释。多行注释也叫块注释，均已以 /* 开头，并以 */ 结尾，且不可以嵌套使用，多行注释一般用于包的文档描述或注释成块的代码片段。

5. 下一行 fmt.Println(...) 可以将字符串输出到控制台，并在最后自动增加换行字符 \n。
使用 fmt.Print("hello, world\n") 可以得到相同的结果。
Print 和 Println 这两个函数也支持使用变量，如：fmt.Println(arr)。如果没有特别指定，它们会以默认的打印格式将变量 arr 输出到控制台。

6. 当标识符（包括常量、变量、类型、函数名、结构字段等等）以一个大写字母开头，如：Group1，那么使用这种形式的标识符的对象就可以被外部包的代码所使用（客户端程序需要先导入这个包），这被称为导出（像面向对象语言中的 public）；标识符如果以小写字母开头，则对包外是不可见的，但是他们在整个包的内部是可见并且可用的（像面向对象语言中的 protected ）。

### 注意
需要注意的是 { 不能单独放在一行，所以以下代码在运行时会产生错误：
```
package main

import "fmt"

func main()  
{  // 错误，{ 不能在单独的行上
    fmt.Println("Hello, World!")
}
```

## 5、关于包，根据本地测试得出以下几点

 文件名与包名没有直接关系，不一定要将文件名与包名定成同一个。
 文件夹名与包名没有直接关系，并非需要一致。
 同一个文件夹下的文件只能有一个包名，否则编译报错。
文件结构:
```
Test
--helloworld.go

myMath
--myMath1.go
--myMath2.go
```

测试代码:
```
// helloworld.go
package main

import (
"fmt"
"./myMath"
)

func main(){
    fmt.Println("Hello World!")
    fmt.Println(mathClass.Add(1,1))
    fmt.Println(mathClass.Sub(1,1))
}
// myMath1.go
package mathClass
func Add(x,y int) int {
    return x + y
}
// myMath2.go
package mathClass
func Sub(x,y int) int {
    return x - y
}
```

## 6、go语言基础语法
在 Go 程序中，一行代表一个语句结束。每个语句不需要像 C 家族中的其它语言一样以分号 ; 结尾，因为这些工作都将由 Go 编译器自动完成。
如果你打算将多个语句写在同一行，它们则必须使用 ; 人为区分，但在实际开发中我们并不鼓励这种做法。

以 // 开头的单行注释。多行注释也叫块注释，均已以 /* 开头，并以 */ 结尾。

Go 程序的一般结构: basic_structure.go
```
// 当前程序的包名
package main

// 导入其他包
import . "fmt"

// 常量定义
const PI = 3.14

// 全局变量的声明和赋值
var name = "gopher"

// 一般类型声明
type newType int

// 结构的声明
type gopher struct{}

// 接口的声明
type golang interface{}

// 由main函数作为程序入口点启动
func main() {
    Println("Hello World!")
}
```

Go语言中，使用大小写来决定该常量、变量、类型、接口、结构或函数是否可以被外部包所调用。

## 7、数据类型
complex64
32 位实数和虚数
complex128
64 位实数和虚数

## 8、2. GOPATH，GO111MODULE环境变量
官方简介如下：
The GOPATH environment variable is a fundamental part of writing Go code without Go modules. It specifies the location of your workspace, and it defaults to $HOME/go. A GOPATH directory contains src, bin, and pkg directories. Your code is typically located in the $GOPATH/src directory.
If you are not familiar with Go and GOPATH, please first read about writing Go code with GOPATH.
If you are just starting out with Go, we recommend using Go modules instead of GOPATH.

大意是说：GOPATH在早期的go代码管理中，GOPATH变量用来指定工作空间，默认为 $home/go，go代码需要放在 $GOPATH/src中。
但是在后续版本引入了Go Modules解决依赖管理问题，即GO111MODULE，当其值为on时，go会忽略 GOPATH 和 vendor 文件夹，只根据 go.mod 下载依赖。
虽然但是，在使用模块的时候，GOPATH 是无意义的，不过它还是会把下载的依赖储存在 $GOPATH/src/mod 中，也会把 go install 的结果放在 $GOPATH/bin 中。
公司已使用go modules管理项目，可以多熟悉下go mod命令




























