[TOC]
# 学习docker

## 1、简介
Docker 两个主要部件：

Docker: 开源的容器虚拟化平台
Docker Hub: 用于分享、管理 Docker 容器的 Docker SaaS 平台 -- Docker Hub
Docker 使用客户端-服务器 (C/S) 架构模式。Docker 客户端会与 Docker 守护进程进行通信。Docker 守护进程会处理复杂繁重的任务，例如建立、运行、发布你的 Docker 容器。Docker 客户端和守护进程可以运行在同一个系统上，当然你也可以使用 Docker 客户端去连接一个远程的 Docker 守护进程。Docker 客户端和守护进程之间通过 socket 或者 RESTful API 进行通信。

Docker 是一个[开源](https://baike.baidu.com/item/开源/246339)的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的镜像中，然后发布到任何流行的 [Linux](https://baike.baidu.com/item/Linux)或Windows 机器上，也可以实现[虚拟化](https://baike.baidu.com/item/虚拟化/547949)。容器是完全使用[沙箱](https://baike.baidu.com/item/沙箱/393318)机制，相互之间不会有任何接口。

## 2、常用命令
查看docker环境：docker ps -a
进入docker环境1(CONTAINER ID)：docker exec -it 86d66188df09 bash
进入docker环境2(NAMES)：docker exec -it compile-x86_64 bash
拷贝文件进入docker：docker cp 86d66188df09:/root/compile/qemu/qemu-5.0.0/x86_64-softmmu/qemu-system-x86_64 .
拷贝文件导出docker：docker cp uvc_qemu.c 86d66188df09:/home/





