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
拷贝文件或者文件夹导出docker：docker cp 86d66188df09:/root/compile/qemu/qemu-5.0.0/x86_64-softmmu/qemu-system-x86_64 .
拷贝文件或者文件夹进入docker：docker cp uvc_qemu.c 86d66188df09:/home/
进入docker环境：docker attach 86d66188df09
进入容器时，指定 -l 选项来启动一个登录 shell：docker exec -it <container_id> /bin/bash -l
查看 Docker 版本：docker --version
查看 Docker 运行状态：systemctl status docker

### 镜像管理
查看本地镜像：docker images
拉取镜像：docker pull <image_name>
删除镜像：docker rmi <image_id>
构建镜像：docker build -t <image_name>:<tag> <path>

### 容器管理
运行容器：docker run <options> <image_name>
查看正在运行的容器：docker ps
查看所有容器（包括停止的）：docker ps -a
停止容器：docker stop <container_id>
启动已停止的容器：docker start <container_id>
删除容器：docker rm <container_id>
进入正在运行的容器：docker exec -it <container_id> /bin/bash

### 网络管理
查看 Docker 网络：docker network ls
创建网络：docker network create <network_name>
删除网络：docker network rm <network_name>

### 数据管理
查看 Docker 卷：docker volume ls
创建卷：docker volume create <volume_name>
删除卷：docker volume rm <volume_name>

### Docker Compose
如果您使用 Docker Compose 来管理多容器应用，以下是一些常用命令：
启动服务：docker-compose up
后台启动服务：docker-compose up -d
停止服务：docker-compose down
查看服务状态：docker-compose ps

### 其他常用命令
查看 Docker 日志：docker logs <container_id>
查看 Docker 资源使用情况：docker stats

https://mp.weixin.qq.com/s/801GmqZk-dP2q_ESpxf94A

## 3、docker中容器和镜像的关系是什么
https://mp.weixin.qq.com/s/hVqn-KrUjAnH11qclet-DA

- 镜像你可以把它看成Java中的类，而容器可以看做是类的实例化对象。
- 一个类可以有多个对象，同理，一个镜像可以有多个容器。
- 镜像是一个只读的模板，用于创建 Docker 容器。它包含了运行某个应用程序所需的所有文件、库、依赖项和环境配置。
- 镜像是静态的，不能被修改。每次修改镜像后，都会生成一个新的镜像版本。
- 容器是镜像的一个实例，是一个运行中的环境。它是镜像的可执行部分，包含了镜像的所有内容，并且可以在其上运行应用程序。
- 容器是动态的，可以被启动、停止、删除和修改。每个容器都有自己的文件系统、网络和进程空间。

## 4、dockerfile文件
```
docker build -f <Dockerfile路径> -t <镜像名称>:<标签> <上下文路径>
```
在 Dockerfile 中，使用 RUN 指令时，默认的 shell 是 /bin/sh，而 source 命令是 Bash 的内置命令，不能在 /bin/sh 中使用。因此，当你在 Dockerfile 中使用 RUN source /etc/profile 时，会出现 /bin/sh: 1: source: not found 的错误。

## 5、镜像操作
```
docker run -it --name <容器名称（可选）> <镜像名称>:<标签>
操作后就会生成一个容器，多次使用会生成多个容器，exit退出后容器自动关闭

查看所有容器
docker ps -a


```

## 6、查看镜像详细信息
问题报错：
```
# sudo mount -o remount,rw "/root/.openvscode-server/extensions"
mount: permission denied
```

docker inspect <容器ID或容器名称>
在输出中，查找 Mounts 部分。它会列出所有挂载的卷及其属性，包括是否为只读（ro）或读写（rw）

## 7、离线创建镜像

### 7-1、使用 docker save 导出单个或多个镜像
```
docker pull nginx:1.23  # 拉取需要的镜像
docker pull mysql:8.0

docker save -o offline_images.tar nginx:1.23 mysql:8.0
# -o：指定输出文件

docker load -i offline_images.tar
# -i：指定输入文件
```

### 7-2、使用 docker export + docker import 导出容器快照（更轻量）
适用于导出已运行容器的文件系统，生成不含历史层的镜像。
```
docker run -d --name mynginx nginx:1.23
# 在容器内进行配置修改（如添加网站文件）
docker exec -it mynginx bash

docker export mynginx > nginx_container.tar

docker import nginx_container.tar my-nginx:custom
```




