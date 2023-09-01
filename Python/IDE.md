# 集成开发环境
集成开发环境（IDE，Integrated Development Environment ）是用于提供程序开发环境的应用程序，一般包括代码编辑器、编译器、调试器和图形用户界面等工具。集成了代码编写功能、分析功能、编译功能、调试功能等一体化的开发软件服务套。所有具备这一特性的软件或者软件套（组）都可以叫集成开发环境。如微软的Visual Studio系列，Borland的C++ Builder、Delphi系列等。该程序可以独立运行，也可以和其它程序并用。IDE多被用于开发HTML应用软件。例如，许多人在设计网站时使用IDE（如HomeSite、DreamWeaver等），因为很多项任务会自动生成。

## 1、spyder

### 1-1、缩进风格：空格和tab键

Anaconda spyder 设置tab键为2个空格
tool -> Preference-> Editor->Adevanced setting->4 spaces

### 1-2、格式化代码
- 安装：conda install autopep8
- 除此之外，还需要安装下载插件文件，通过GitHub上的库即可下载解压：https://github.com/Nodd/spyder_autopep8
- 文件夹spyder_autopep8放在指定的spyder文件目录C:\Users\Administrator\Anaconda3\Scripts
- 重启编辑器，在source菜单中可以看见run autopep8选项（Ctrl+F8快捷键）

使用这个插件：autopep8 for Spyder（https://github.com/Nodd/spyder_autopep8）
虽然Python是一种代码功能取决于空白量的语言，但美化工具永远无法以统一的方式真正格式化代码。
但Autoep8不能解决被违反的代码格式化约定(如Pylint所示)。

### 1-3、显示空格和tab键
Tools-->>preferences-->>editor-->>display-->>show blank spaces

## 2、PyCharm
官网：https://www.jetbrains.com/pycharm/




