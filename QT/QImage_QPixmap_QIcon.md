# 处理图像和图标

## 1、QImage
用途：QImage 是一个用于处理图像数据的类，适合于图像的读取、编辑和保存。
特性：
- 像素级操作：可以直接访问和修改图像的每个像素。
- 支持多种格式：支持多种图像格式（如 PNG、JPEG、BMP 等）。
- 不依赖于窗口系统：QImage 是与平台无关的，可以在任何环境中使用。
- 适合图像处理：适合进行图像处理和算法操作，如滤镜、变换等。

## 2、QPixmap
用途：QPixmap 是一个用于在屏幕上显示图像的类，主要用于图形界面中的图像显示。
特性：
- 优化显示：QPixmap 针对显示设备进行了优化，适合用于绘制和显示。
- 与窗口系统相关：QPixmap 依赖于底层的窗口系统，通常在绘制时使用。
- 不支持像素级操作：不支持直接访问和修改每个像素（虽然可以通过 QImage 转换）。
- 适合绘图：适合用于绘制到窗口或小部件上。

## 3、QIcon
用途：QIcon 是一个用于表示图标的类，通常用于按钮、菜单项和其他界面元素的图标。
特性：
- 多种尺寸：可以包含多种尺寸的图标，适应不同的显示需求。
- 自动选择：根据上下文自动选择合适的图标尺寸。
- 支持状态：可以为图标设置不同的状态（如正常、悬停、禁用等）。
- 适合 UI 元素：主要用于用户界面元素的图标显示。

## 4、常见图像格式的文件头信息
通常，图像文件的格式会有特定的文件头（magic number），用于标识文件类型。
PNG：文件头为 89 50 4E 47 0D 0A 1A 0A（十六进制）。
JPEG：文件头为 FF D8 FF（十六进制）。
JPG：文件头为 FF D8 FF（十六进制）。
GIF：文件头为 47 49 46 38（十六进制）。
BMP：文件头为 42 4D（十六进制）。

以十六进制方式查看工具：
EmEditor（以二进制方式打开（十六进制视图））
Beyond Compare（会话-》比较文件使用-》16进制比较）
Notepad++（插件-》插件管理-》搜索HEX-Editor-》选中点击安装）

## 5、解决部分图片加载失败问题
使用QImage、QPixmap都加载为Null，虽然使用QIcon不为Null，但是显示为空。
测试使用mingw加载正常，使用的msvc2017会出现这种情况，使用qt4.8也会有这种情况。
测试demo见：D:\Github\Storage\qt\msvc\QtApplication1

参考方案：
https://www.cnblogs.com/ybqjymy/p/16576549.html
https://blog.csdn.net/weixin_39834568/article/details/111500808

```
QPixmap iconPixmap;
QFile iconFile(QString::fromStdString(apps[i]->mAppIconFile));
if (iconFile.open(QIODevice::ReadOnly)) {
    iconPixmap.loadFromData(iconFile.readAll());
    iconFile.close();
}
```
