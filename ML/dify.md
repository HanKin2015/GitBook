# 学习dify

## 1、简介
参考：https://zhuanlan.zhihu.com/p/1928929221419439843
以前做 AI 应用，是程序员的专属领域：要写服务、调接口、部署上线。
现在有了 Dify，产品、运营甚至实习生，只写 Prompt 配配置，就能搭出能用的 AI 原型。 真正把“想法变应用”，变成一件人人可做的事。

Dify 是大模型落地时代的“低代码操作系统”，能让产品、运营、开发真正围绕业务逻辑做出 AI 应用，而不是卡在 prompt demo 阶段。

Ollama 是一个用于在本地运行大型语言模型（LLM）的开源工具，旨在让开发者和用户能够在自己的设备（如笔记本电脑、台式机）上高效部署和交互 LLM，而无需依赖云端服务。
Ollama 是本地运行 LLM 的理想选择，尤其适合隐私敏感场景、离线开发或资源受限环境。它通过简化模型管理和推理流程，让 LLM 应用开发更加便捷，同时保留了本地部署的安全性优势。对于需要快速迭代或控制数据隐私的开发者，Ollama 提供了一个高效且易用的解决方案。

## 2、部署dify
参考：https://zhuanlan.zhihu.com/p/28744712219

### 2-1、windows
（a）下载docker客户端：https://www.docker.com/
（b）自动安装WSL2
（c）下载dify源码：https://github.com/langgenius/dify/releases/tag/1.7.0
（d）配置镜像源：
```
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "registry-mirrors": [
    "https://docker.1ms.run",
    "https://hub.rat.dev",
    "https://docker.1panel.live",
    "https://hub.rat.dev",
    "https://proxy.1panel.live",
    "https://ghcr.nju.edu.cn",
    "https://docker.registry.cyou",
    "https://dockercf.jsdelivr.fyi",
    "https://docker.rainbond.cc",
    "https://registry.cn-shenzhen.aliyuncs.com",
    "https://dockertest.jsdelivr.fyi",
    "https://mirror.aliyuncs.com",
    "https://mirror.baidubce.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://docker.mirrors.sjtug.sjtu.edu.cn",
    "https://mirror.iscas.ac.cn",
    "https://docker.nju.edu.cn",
    "https://docker.m.daocloud.io",
    "https://dockerproxy.com",
    "https://docker.jsdelivr.fyi",
    "https://docker-cf.registry.cyou"
  ]
}
```
（e）拉取镜像
```
tar xvf dify-1.7.0.tar.gz
cd dify-1.7.0/docker  # 关键目录
cp .env.example .env  # 复制环境变量模板
docker compose up -d  # 后台启动docker，会自动拉取镜像
```
（f）浏览器中输入：http://localhost
随便设置管理员账户即可。
（g）安装ollama：https://ollama.com/download/windows
参考：https://zhuanlan.zhihu.com/p/28197422815
```
ollama list 
ollama -v
ollama run deepseek-r1:8b

C:\Users\hj159>ollama run deepseek-r1:8b
pulling manifest
pulling e6a7edc1a4d7: 100% ▕██████████████████████████████████████████████████████████▏ 5.2 GB
pulling c5ad996bda6e: 100% ▕██████████████████████████████████████████████████████████▏  556 B
pulling 6e4c38e1172f: 100% ▕██████████████████████████████████████████████████████████▏ 1.1 KB
pulling ed8474dc73db: 100% ▕██████████████████████████████████████████████████████████▏  179 B
pulling f64cd5418e4b: 100% ▕██████████████████████████████████████████████████████████▏  487 B
verifying sha256 digest
writing manifest
success
Error: model requires more system memory (6.6 GiB) than is available (5.6 GiB)

C:\Users\hj159>ollama run deepseek-r1:8b
>>> who are you
Thinking...
Okay, the user just asked “who are you” in a very simple way.
```
（h）安装AI客户端：https://chatboxai.app/en

缺点就是回答问题真的好慢啊！！！