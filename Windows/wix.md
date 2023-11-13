# Wix安装和简单使用

## 1、Wix 介绍
Windows Installer xml,即Wix文件，提供了一种描述Windows 安装数据库（MSI,MSM）的机制，以及提供了把xml描述文件转换成可用数据库的工具。
其主要功能就是生成MSI文件。

MSI文件是Windows Installer的数据包，它实际上是一个数据库，包含安装一种产品所需要的信息和在很多安装情形下安装（和卸载）程序所需的指令和数据。MSI文件将程序的组成文件与功能关联起来。此外，它还包含有关安装过程本身的信息。如目标文件夹路径、系统依赖项、安装选项和控制安装过程的属性。采用MSI安装的优势在于你可以随时彻底删除它们，更改安装选项，即使安装中途出现意想不到的错误，一样可以安全地恢复到以前的状态，正是凭着此强大功能，越来越多的软件开始使用MSI作为发行的方式了。

## 2、如何制作MSI文件

制作MSI文件的几种方法：
### 2-1、可视化工具：
（1）Discover工具生成
基本原理就是，在我们安装一个软件以前，先给电脑的磁盘拍个“快照”。然后将要安装的软件安装到电脑中，并对注册表等内容做修改，等到确认这个软件能正确运行后，再给电脑的磁盘拍个“快照”。Discover软件会自动找出两次“快照”的不同，并且生成一个MSI文件

（2）advanced installer
可以选择创建各种格式的安装包，包括msi格式的安装包，通过可视化的界面完成安装包的基本配置，比如释放文件、注册表、选择安装UI风格等，可以参考https://blog.csdn.net/qq_41750806/article/details/122166802的步骤制作msi安装包

使用这些工具一般都需要手动打包，无法满足自动打包的需求，自动打包可以使用Wix toolset实现

### 2-2、wix toolset
WiX 全称为 Windows Installer XML，编辑XML格式的文件（该文件后缀为.wxs），然后通过WIX toolset对其编译和链接，最终生成.msi文件。wix toolset是微软提供的免费的打包工具集，可以在官网下载并安装，使用wix toolset工具生成msi文件需要一下几步：
（1）编辑后缀名为.wxs的配置文件，该配置文件是XML格式，此xml配置文件和脚本不同，不能在xml文件里面写类似于脚本的逻辑，而是通过WIX独有配置规则来实现，WIX提供了非常丰富的属性用于用户实现自定义的安装过程，但这需要一些学习成本，学会这些属性的用法以及如何将这些属性连接起来就可以理解了。
下面一端示例untitled.wxs：
```
<?xml version="1.0" encoding="UTF-8"?>
    <Media Id="1" Cabinet="WixProject1.cab" EmbedCab="yes" />

    <Directory Id="TARGETDIR" Name="SourceDir">
        <Directory Id="ProgramFilesFolder">
            <Directory Id="INSTALLLOCATION" Name="WixProject1">
                <!-- TODO: Remove the comments around this Component element and the ComponentRef below in order to add resources to this installer. -->
                <!-- <Component Id="ProductComponent" Guid="fc46b1a2-35e9-4a17-896b-80b2daaae567"> -->
                    <!-- TODO: Insert files, registry keys, and other resources here. -->
                <!-- </Component> -->
            </Directory>
        </Directory>
    </Directory>

    <Feature Id="ProductFeature" Title="WixProject1" Level="1">
        <!-- TODO: Remove the comments around this ComponentRef element and the Component above in order to add resources to this installer. -->
        <!-- <ComponentRef Id="ProductComponent" /> -->
    </Feature>
</Product>
```
（3）编译
       vs可以安装插件Wix Toolset Visual Studio，创建WIX工程，编辑xml配置文件和编译连接直接生产msi文件
编译也可以通过Toolset中命令，需要先下载安装Toolset，地址：https://github.com/wixtoolset/wix3/releases
然后通过命令：candle.exe untitled.wxs，成功后会生成untitled.wixobj

（3）连接
命令：light.exe untitled.wixobj 生成 untitled.msi

总结：以上3步可以生成一个简单的msi功能，xml文件配置的所有功能以及使用方法，可以通过查看WIX官方文档（https://www.firegiant.com/wix/tutorial/ 、https://wixtoolset.org/documentation/manual/v3/ ）的说明以及一些博客学习，推荐一个博客地址：https://www.cnblogs.com/stoneniqiu/p/3355086.html 另外介绍一款开源的软件WIXEdit，由于WIX配置文件xml的编写过于繁琐，使用WIXEdit可以通过界面化的操作方式自动生成一份xml文件，也可以对其进行编译连接生成msi包，这可以减少很多重复性的工作，比如添加文件和注册表工作。WIXEdit的安装包下载地址：https://wixedit.github.io，安装后需要使用管理员身份运行，WIXEdit的使用方法非常简单，可以自行搜索资料。

## 3、安装日志
wix制作出来的msi安装包，需要查看安装日志可以提供启动参数实现。
XXX.msi -l install_log.txt

日志文件会生成到当前目录下

