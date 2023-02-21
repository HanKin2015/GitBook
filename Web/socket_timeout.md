# socket中connect设置超时机制

https://www.cnblogs.com/qxxnxxfight/p/4138465.html

https://www.jianshu.com/p/9a1d447eed43?from=singlemessage

推荐使用下列方式，亲测有效。
```
// TCP_SYNCNT头文件
#include <netinet/tcp.h>
int syncnt = 4;
setsockopt(sock, IPPROTO_TCP, TCP_SYNCNT, &syncnt, sizeof(syncnt));
```

