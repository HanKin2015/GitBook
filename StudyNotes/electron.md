# Electron是什么
Electron 是 GitHub 开发的一个开源框架。它允许使用 Node.js（作为后端）和 Chromium（作为前端）完成桌面 GUI 应用程序的开发。

Electron 可以用于构建具有 html、css、JAVAScript 的跨平台桌面应用程序，它通过将 Chromium 和 node.js 合同一个运行的环境中来实现这一点，应用程序可以打包到 mac、windows 和 linux 系统上。
https://www.electronjs.org/

## 1、Electron使用快速入门
https://baijiahao.baidu.com/s?id=1622258269985547290&wfr=spider&for=pc 
https://cloud.tencent.com/developer/doc/1070 
跨越平台桌面应用开发框架electron使用的心路历程

请问一下，跨平台解决方案中，Qt 和 Electron 孰优孰劣？]( https://www.zhihu.com/question/53230344 )

官方文档：https://www.electronjs.org/zh/docs/latest/

## 2、安装和使用
还是比较想弄好离线安装问题：https://registry.npmmirror.com/binary.html?path=electron/26.0.0/
[安装 Electron 的正确姿势](https://blog.csdn.net/qq_39124701/article/details/128299948)
简单尝试了一下没有成功，也可能是安装的版本过高导致的。

### 2-1、问题一：执行electron -v报错误
cmd命令下执行Electron -v直接报如下错误：
```
D:\nvm\v16.14.2\node_modules\electron\index.js:17
throw new Error(‘Electron failed to install correctly, please delete node_modules/electron and try installing again’);
^
```

解决方案：
根据提示
1、删除node_modules/electron，这个node_modules在你全局安装nodejs的目录下
2、设置系统环境
// windows 请在环境变量里面设置，mac 请在环境变量文件中设置
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
3、重新安装
```
npm install electron
```

### 2-2、问题二：网络不通下载过慢
可以通过修改镜像源来改善，可以按照2-1的教程设置环境变量，或者参考如下资料：
[安装 Electron 的正确姿势](https://blog.csdn.net/qq_39124701/article/details/128299948)

### 2-3、警告部分也需要注意
```
npm WARN saveError ENOENT: no such file or directory, open 'C:\Users\Administrat
or\package.json'
npm WARN notsup Unsupported engine for electron@26.1.0: wanted: {"node":">= 12.2
0.55"} (current: {"node":"12.16.2","npm":"6.14.4"})
npm WARN notsup Not compatible with your version of node/npm: electron@26.1.0
npm WARN enoent ENOENT: no such file or directory, open 'C:\Users\Administrator\
package.json'
npm WARN Administrator No description
npm WARN Administrator No repository field.
npm WARN Administrator No README data
npm WARN Administrator No license field.

详细日志也说明：1953 error This is probably not a problem with npm. There is likely additional logging output above.
```
是我的node版本低了，导致一直没有安装成功，升级node版本。
nvm是node的管理器，全程由nvm命令操作。
```
nvm ls
nvm list available
只列举部分版本，更多见https://nodejs.org/en/download/releases
因为本来打算安装最新版本20.5.0，结果失败了，然后安装LTS版本18.17.0，成功了，但是无法运行：
C:\Users\Administrator>nvm current
No current version. Run 'nvm use x.x.x' to set a version.

C:\Users\Administrator>node -v
Node.js is only supported on Windows 8.1, Windows Server 2012 R2, or higher.
Setting the NODE_SKIP_PLATFORM_CHECK environment variable to 1 skips this
check, but Node.js might not execute correctly. Any issues encountered on
unsupported platforms will not be fixed.

最新版本不再支持win7系统了，因此还得把版本进行降低：
nvm install 12.22.12
```

### 2-4、electron-quick-start npm start启动报错
```
D:\Github\Storage\electron\helloworld>npm run start

> helloworld@1.0.0 start D:\Github\Storage\electron\helloworld
> electron .

npm ERR! code ELIFECYCLE
npm ERR! errno 3221225785
npm ERR! helloworld@1.0.0 start: `electron .`
npm ERR! Exit status 3221225785
npm ERR!
npm ERR! Failed at the helloworld@1.0.0 start script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\Administrator\AppData\Roaming\npm-cache\_logs\2023-08-28T02_59_18_228Z-debug.log
```
https://blog.csdn.net/FFFAN_KIKI/article/details/130193151

这个虽然没有解决https://imba97.cn/archives/672/，但是也看见一个不错误的主题。

在package.json文件中把它改成13.6.9版本。

然后再npm install electron --save-dev即可。

环境安装好了，一切就变得简单。总之一切问题来源研发环境是一个windows7系统，不能使用较新的版本。

### 2-5、第一个应用程序
详细代码见：D:\Github\Storage\electron\helloworld
npm run start

## 3、打包您的应用程序
```
npm install --save-dev @electron-forge/cli
```
结果安装不上，安装了nvm install 14.21.3结果在windows7系统上面运行不起来。还得需要windows10系统。
已解决版本高无法在windows7系统运行的问题。

2023.09.01后面再继续学习吧。


