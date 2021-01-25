# 窗口属性
```
Qt::Widget               //是一个窗口或部件，有父窗口就是部件，没有就是窗口
Qt::Window               //是一个窗口，有窗口边框和标题
Qt::Dialog               //是一个对话框窗口
Qt::Sheet                //是一个窗口或部件Macintosh表单
Qt::Drawer               //是一个窗口或部件Macintosh抽屉，去掉窗口左上角的图标
Qt::Popup                //是一个弹出式顶层窗口
Qt::Tool                 //是一个工具窗口
Qt::ToolTip              //是一个提示窗口，没有标题栏和窗口边框
Qt::SplashScreen         //是一个欢迎窗口，是QSplashScreen构造函数的默认值
Qt::Desktop              //是一个桌面窗口或部件
Qt::SubWindow            //是一个子窗口

Qt::CustomizeWindowHint          //关闭默认窗口标题提示
Qt::WindowTitleHint              //为窗口修饰一个标题栏
Qt::WindowSystemMenuHint         //为窗口修饰一个窗口菜单系统
Qt::WindowMinimizeButtonHint     //为窗口添加最小化按钮
Qt::WindowMaximizeButtonHint     //为窗口添加最大化按钮
Qt::WindowMinMaxButtonsHint      //为窗口添加最大化和最小化按钮
Qt::WindowCloseButtonHint			//窗口只有一个关闭按钮
Qt::WindowContextHelpButtonHint
Qt::MacWindowToolBarButtonHint
Qt::WindowFullscreenButtonHint
Qt::BypassGraphicsProxyWidget
Qt::WindowShadeButtonHint
Qt::WindowStaysOnTopHint	//总在最上面的窗口,置前
Qt::WindowStaysOnBottomHint
Qt::WindowOkButtonHint
Qt::WindowCancelButtonHint
Qt::WindowTransparentForInput
```

没有固定窗口位置不变的属性，但是可以通过去掉边框来实现。







