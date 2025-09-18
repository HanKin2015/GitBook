# 学习docker
Docker 官网：https://www.docker.com
Github Docker 源码：https://github.com/docker

## 1、简介
Docker 两个主要部件：

Docker: 开源的容器虚拟化平台
Docker Hub: 用于分享、管理 Docker 容器的 Docker SaaS 平台 -- Docker Hub
Docker 使用客户端-服务器 (C/S) 架构模式。Docker 客户端会与 Docker 守护进程进行通信。Docker 守护进程会处理复杂繁重的任务，例如建立、运行、发布你的 Docker 容器。Docker 客户端和守护进程可以运行在同一个系统上，当然你也可以使用 Docker 客户端去连接一个远程的 Docker 守护进程。Docker 客户端和守护进程之间通过 socket 或者 RESTful API 进行通信。

Docker 是一个[开源](https://baike.baidu.com/item/开源/246339)的应用容器引擎，基于 Go 语言 并遵从 Apache2.0 协议开源。让开发者可以打包他们的应用以及依赖包到一个可移植的镜像中，然后发布到任何流行的 [Linux](https://baike.baidu.com/item/Linux)或Windows 机器上，也可以实现[虚拟化](https://baike.baidu.com/item/虚拟化/547949)。容器是完全使用[沙箱](https://baike.baidu.com/item/沙箱/393318)机制，相互之间不会有任何接口（类似 iPhone 的 app）,更重要的是容器性能开销极低。

Docker 从 17.03 版本之后分为 CE（Community Edition: 社区版） 和 EE（Enterprise Edition: 企业版），我们用社区版就可以了。

### 什么是容器化技术
容器共享主机内核，轻量、隔离且高效，不像虚拟机需要完整的操作系统，Docker 容器的基本架构：
- 上层 是多个容器（App A~F），每个容器独立运行一个应用。
- 中间层 是 Docker，负责管理这些容器。
- 底层 是主机操作系统（Host OS）和基础设施，为容器提供硬件和系统支持。

### Docker 的应用场景
- 微服务架构：每个服务独立容器化，便于管理和扩展。
- CI/CD流水线：与 Jenkins/GitLab CI 集成，实现自动化构建和测试。
- 开发环境标准化：新成员一键启动全套依赖服务（如数据库、消息队列）。
- 云原生基础：Kubernetes 等编排工具基于 Docker 管理容器集群。

### 核心优势
- 跨平台一致性：解决"在我机器上能跑"的问题，确保开发、测试、生产环境一致。
- 资源高效：容器直接共享主机内核，无需虚拟化整个操作系统，节省内存和 CPU。
- 快速部署：秒级启动容器，支持自动化扩缩容。
- 隔离性：每个容器拥有独立的文件系统、网络和进程空间。

### 核心概念
- 容器（Container）：轻量化的运行实例，包含应用代码、运行时环境和依赖库。基于镜像创建，与其他容器隔离，共享主机操作系统内核（比虚拟机更高效）。
- 镜像（Image）：只读模板，定义了容器的运行环境（如操作系统、软件配置等）。通过分层存储（Layer）优化空间和构建速度。
- Dockerfile：文本文件，描述如何自动构建镜像（例如指定基础镜像、安装软件、复制文件等）。
- 仓库（Registry）：存储和分发镜像的平台，如 Docker Hub（官方公共仓库）或私有仓库（如 Harbor）。

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
```
查看本地镜像：docker images
拉取镜像：docker pull <image_name>
删除镜像：docker rmi <image_id>
构建镜像：docker build -t <image_name>:<tag> <path>
构建镜像（基于当前目录的Dockerfile）：docker build -t my-app .
```

### 容器管理
运行容器（-d 后台运行，-p 映射端口）：docker run -d -p 80:80 nginx
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

## 8、学习进阶
参考：https://www.runoob.com/docker/docker-tutorial.html

Registry vs Repository：
Registry：仓库注册服务器，如 Docker Hub
Repository：具体的镜像仓库，如 nginx、mysql

Docker 守护进程（通常是 dockerd）是 Docker 架构的核心，负责管理容器生命周期、构建镜像、分发镜像等任务。
守护进程通常以后台进程的方式运行，等待来自 Docker 客户端的 API 请求。

## 9、k8s和docker区别(4大核心区别详解)
参考：https://mp.weixin.qq.com/s?__biz=Mzg2NTg1NTQ2NQ==&mid=2247505664&idx=1&sn=71dd81d1baec1022229e7b30fb43ede2&chksm=ce512586f926ac90387ab7994b859a0817638bb3af3043d07dc790732e9d89cb9bf62f9e9754&cur_album_id=3659003065127960582&scene=190#rd

K8S和Docker是目前云原生的核心技术，也是云计算的最重要的技术。
云原生（Cloud-Native）和云计算（Cloud Computing）是现代 IT 架构中的两个核心概念，前者聚焦 “如何在云上高效构建和运行应用”，后者聚焦 “如何通过网络提供计算资源服务”，二者相辅相成但定位不同。

K8S，就是基于容器的集群管理平台，它的全称，是kubernetes，是由Google创造容器编排系统。
Kubernetes 这个单词来自于希腊语，含义是舵手或领航员，K8S是它的缩写，用“8”字替代了“ubernete”这8个字符。









