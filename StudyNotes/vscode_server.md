# Code Server -- VSCODE 服务器版

VScode 是目前非常流行的编辑器之一，是一种基于 Electron 开发的桌面版应用。作为一种桌面软件限制了在服务器端的应用。而目前比较流行额服务器端的编辑器主要是 vim 和 emacs 。想利用 VScode 远程调试程序，需要在控制端安装 VScode 和相应插件，这样在本地安装 VScode 是一种前提。

目前 Coder Technologies Inc, an Austin TX company 公司开源了一个基于服务器端的 VScode -- code-server，只要服务器端配置好code-server，就可以在任何浏览器上使用VScode 。


## 1、安装
下载：https://github.com/cdr/code-server/releases
tar xvf code-server-3.12.0-linux-amd64.tar.gz
cd code-server-3.12.0-linux-amd64/
./code-server
配置文件~/.config/code-server/config.yaml


## 2、小技巧
code server虽然成功通过命令运行了，但是如果终端关闭后，程序可能就停止了，我们希望它在后台继续运行。这时，就要用到screen。

https://www.jianshu.com/p/48deeca6d008

## 3、上面是独立安装使用
文件大小约为90M，如果安装插件则30M左右。

方法：https://zhuanlan.zhihu.com/p/294933020

安装已安装的vscode对应的浏览器版本。



