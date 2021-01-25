# hexo搭建博客

使用npm命令安装hexo真的慢，等了半天没有一点进度，这时候就应该会想到一定有人做过国内源，不得不安装国内源进行安装。使用cnpm安装hexo是真快。

npm install -g cnpm --registry=https://registry.npm.taobao.org
使用命令行安装cnpm命令，以后就可以使用cnpm代替npm安装插件了。


## 问题
以前一开始我是hexo init初始化仓库，然后一点点的添加和维护起了现在的博客。然鹅换了电脑进入git仓库发现，github.io仓库里面尽是一些编译完成的html文件。。。。。原来以前的本地仓库是需要另外一个仓库备份的。。。。

[淘宝 NPM 镜像](https://npm.taobao.org/)


# 上传到github
如果你一切都配置好了，发布上传很容易，一句hexo d就搞定，当然关键还是你要把所有东西配置好。

首先，ssh key肯定要配置好。

其次，配置_config.yml中有关deploy的部分：

正确写法：

deploy:
  type: git
  repository: git@github.com:hankin2015/hankin2015.github.io.git
  branch: master