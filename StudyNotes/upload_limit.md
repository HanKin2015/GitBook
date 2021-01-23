# 绕过网络拦截

有时候遇到网盘被限制上传，报上传失败错误。

无意之间发现微信自带的浏览器未被拦截。

思考：是不是改变浏览器就可以绕过网络拦截。

## 尝试使用python的tkinter，结果是使用本地的浏览器打开网页。
```
import webbrowser
webbrowser.open("https://www.baidu.com")
```

## 尝试使用selenium打开网页，结果是使用流行的谷歌，火狐，IE浏览器，固然是不行的。
'''
from selenium import webdriver 

chromedriver_path = r"C:/Program Files (x86)/Google/Chrome/Application/chromedriver.exe"

driver = webdriver.Chrome(chromedriver_path)    #打开浏览器
#driver = webdriver.Firefox()

driver.maximize_window() #最大化窗口

url = "https://www.baidu.com"
driver.get(url) #打开网页
time.sleep(2)   #时刻需要睡眠等待一下
'''

## 尝试使用qt，结果使用QAxWidget发现是使用了IE架构
```
void MainWindow::BtnClickSlot()
{
    QAxWidget *flash = new QAxWidget();      //QAxWidget使用的是ActiveX插件
    flash->resize(600, 400);                    //设置该控件的初始大小
    flash->setControl(QString::fromUtf8("{8856F961-340A-11D0-A96B-00C04FD705A2}"));//注册组件ID
    flash->setProperty("DisplayAlerts", false);//不显示警告信息
    flash->setProperty("DisplayScrollBars", true);//不显示滚动条
    QString webstr = url_edit->text();//设置要打开的网页
    flash->dynamicCall("Navigate(const QString&)", webstr);//显示网页
    flash->setContextMenuPolicy(Qt::NoContextMenu);
    flash->show();
}
```

## 尝试使用qt的webview，无奈需要低版本
既然已是淘汰产品，





















