# X11编程


```
/* study_x11.cpp
 *
 * 学习X11编程
 *
 * author: hankin
 * date  : 2021.06.02
 *
 * Copyright (c) 2021 HanKin. All rights reserved.
 */

#include<X11/Xlib.h>

int main(int argc, char *argv[])
{
	// 程序(客户端)和服务器建立连接
	Display *dsp = XOpenDisplay(nullptr);
    if (!dsp) {
		printf("XOpenDisplay failed!\n");
        return -1;
    }
	
	if (XShmQueryExtension (x_display) &&
        XShmQueryVersion (x_display, &major, &minor, &pixmaps)) {
        x_shm_avail = true;
    }
	
	
	// 请求创建窗口
	int screenNumber = DefaultScreen(dsp);
    unsigned long white = WhitePixel(dsp,screenNumber);
    unsigned long black = BlackPixel(dsp,screenNumber);

    Window win = XCreateSimpleWindow(dsp,
            DefaultRootWindow(dsp),
            50, 50,   // origin
            200, 200, // size
            0, black, // border
            white );  // backgd
	
	// 想象成从内存拷贝到显存
	XMapWindow( dsp, win );
	
	// 通讯是双向的，告诉server我们对哪些事件感兴趣
	long eventMask = StructureNotifyMask;
    XSelectInput(dsp, win, eventMask);
	
	// 等待server的 map 完成的通知
	XEvent evt;
    do {
        XNextEvent(dsp, &evt);   // calls XFlush()
    } while (evt.type != MapNotify);
	
	// 由于server记不住我们的每次绘图操作的设置，我们将设置保存在“Graphics Context”中
	GC gc = XCreateGC(dsp, win, 0, nullptr);
    XSetForeground(dsp, gc, black);
	
	// 画线
    XDrawLine(dsp, win, gc, 10, 10,190,190);
	
	// 告诉server，我们对鼠标按键感兴趣
	eventMask = ButtonPressMask | ButtonReleaseMask;
    XSelectInput(dsp, win, eventMask); // override prev
	
	// 等待鼠标释放的事件
	do {
        XNextEvent(dsp, &evt);   // calls XFlush()
    } while (evt.type != ButtonRelease);
	
	// 收到鼠标按键后：销毁窗口，断开连接，退出程序
	XDestroyWindow(dsp, win);
    XCloseDisplay(dsp);

    return 0;
}
```



## XFlush()
前面有一点没说，当我们执行了 XCreateSimpleWindow、XMapWindow 等操作时，数据还缓存在客户端。我们要确保数据送到server，需要调用 XFlush()。这一点我们可以类似写文件操作或网络写socket操作。

可是例子中为什么没有调用XFlush()呢？这是由于XNextEvent()内部会调用XFlush()，所以我们省略了。

如果我们程序后面不是等待鼠标按键来退出，而是睡眠10秒钟再退出，那么就需要显式调用XFlush()了
```
#include<X11/Xlib.h>
#include<unistd.h>
...
    XDrawLine(dsp, win, gc, 10, 10,190,190);

    // Send the "DrawLine" request to the server
    XFlush(dsp);
    // Wait for 10 seconds
    sleep(10);

    XDestroyWindow(dsp, win);
    XCloseDisplay(dsp);

    return 0;
}
```


## 编译
编译就很简单了：
```
g++ hello.cpp -o hello -lX11
或正式一点

g++ hello.cpp -o hello `pkg-config --cflags --libs x11`
```





