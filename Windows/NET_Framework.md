# NET Framework

## 1、安装3.5版本
一般来说在线安装很简单，自动安装就可以了，难就难在离线安装。

下载exe版本的文件离线安装都是胡扯。
https://zhuanlan.zhihu.com/p/33467631

### 1-1、方法1：使用cab

### 1-2、方法2：使用iso

### 1-3、方法3：使用exe文件
安装231MB的dotnetfx35文件时报错《你的电脑上的应用需要使用.NET Framework 3.5》，这不扯淡嘛，我需要安装这个，你又给我报错这个，无语。

### 1-4、方法4：是否可以直接安装4.0版本后就没有这个问题了呢？
不行，已经安装了4.8版本，无法安装4.0。因此猜测应该安装了后还是缺失3.5。

### 1-5、方法5：重大发现，安装成功
https://blog.csdn.net/xiangshangdemayi/article/details/122237251
https://learn.microsoft.com/zh-cn/windows-hardware/manufacture/desktop/deploy-net-framework-35-by-using-deployment-image-servicing-and-management--dism?view=windows-11
使用部署映像服务和管理工具安装成功，亲测有效。
使用bat脚本，其实就一行执行命令罢了，安装过程中可能会出现0x800f081f错误：找不到源文件，其实是netfx35文件和系统版本不匹配，需要是相同版本的系统镜像iso文件中去获取，右键iso文件——》装载-》sources/sxs中取。
右键管理员执行bat脚本即可（版本不一致并不是dos窗口上面，上面本来就不一致版本和映像版本）。
```
DISM /Online /Enable-Feature /FeatureName:NetFx3 /All /LimitAccess /Source:c:\sxs
pause
```

试了一个1909版本，安装挺快的，也有进度条。但是在22h2版本就没有这么顺利，没有进度条，一直卡住光标一闪一闪的，但是经过了10分钟左右后还是安装成功了。试了一个21h2版本是同样的道理，也是安装了近10分钟后成功了。

## 2、安装4.0版本
不需要任何操作，直接双击安装dotNetFx40_Full_x86_x64.exe文件即可，如果安装不了，可先安装wic_x86_chs.exe文件。


