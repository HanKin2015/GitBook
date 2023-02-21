# b站学习golang

学习视频网址：https://www.bilibili.com/video/BV16E411H7og?spm_id_from=333.999.0.0
作者博客：https://www.liwenzhou.com/

## 1、vscode搭建环境

### 1-1、安装go
golang镜像网站：https://golang.google.cn/

尴尬，结果还是无法正常下载，只能求助百度网盘或其他方式。

dos窗口查看：go version
1. 新建工作目录D:\Go
2. 新建环境变量GOPATH:D:\Go(可能存在用户变量默认值%USERPROFILE%/go,需要删除)
3. 工作目录下新建src、pkg、bin目录
4. Path环境变量新增D:\Go\bin
5. dos窗口查看：go env(其中GOPATH即工作目录,GOROOT即安装目录)

### 1-2、安装vscode
安装插件1：chinese中文语言包
安装插件2：go扩展包

安装go扩展设置代理服务器：go env -w GOPROXY=https://goproxy.cn,direct
vscode需要重启生效。
vscode界面：ctrl+shift+p
输入go:install/update tools
安装全部，目前我是10个组件，都是exe二进制文件，会在百度网盘备份一份。

## 2、目录结构

### 2-1、个人开发
--bin
--pkg
--src
 |
 --项目1
    |
    --模块A
    |
    --模块B
 |
 --项目2

### 2-2、流行开发
--bin（存放编译后的二进制文件）
--pkg（存放编译后的库文件）
--src（存放源代码文件）
 |
 网站域名
    |
    --作者/机构
        |
        --项目1
            |
            --模块A
            |
            --模块B
        |
        --项目2
        
### 2-3、企业开发者
将作者更改为公司内部组织架构名

## 3、写hello world
```
package main

import "fmt"



func main() {
	fmt.Println("hello world!")
}
```

编译：右键项目名-》在集成终端打开-》go build-》xxx.exe

直接在项目下执行go build即可。
或者在cmd窗口执行go build github.com\HanKin2015\studygo\day01\helloworld(src目录后面的路径即可，生成在当前目录之下)

-o参数指定二进制文件名

go run main.go像脚本一样执行go

go install会将生成的二进制文件拷贝到GOPATH/bin目录下

### 3-1、解决 Visual Studio Code terminal终端打开时为弹出式窗口问题
打开系统CMD，右键点击属性，取消使用旧版控制台的勾选，重启CMD，问题解决。

### 3-2、VSCode不要折叠/展开空白文件夹的方法
左下角 齿轮 → 设置，输入 compactFolders ，勾选表示折叠空白文件夹，取消勾选表示不折叠。

## 4、跨平台编译（交叉编译）

## 5、变量声明
https://www.bilibili.com/video/BV16E411H7og?p=8&spm_id_from=pageDriver













        
        
        
        