# 计算机桩

来自百度百科，简单好理解。

桩（Stub / Method Stub）是指用来替换一部分功能的程序段。桩程序可以用来模拟已有程序的行为（比如一个远端机器的过程）或是对将要开发的代码的一种临时替代。因此，打桩技术在程序移植、分布式计算、通用软件开发和测试中用处很大。

以下是桩程序的一个例子（伪码）：
BEGIN
Temperature = ThermometerRead(Outside)
IF Temperature > 40 THEN
PRINT "It's HOT!"
END IF
END
BEGIN ThermometerRead(Source insideOrOutside)
RETURN 28
END ThermometerRead
上例中的伪码调用了 ThermometerRead函数，其返回一个温度。由于ThermometerRead需要去读取硬件设备，而这个函数还没能开发完成，不能正常工作。ThermometerRead只是简单的返回了一个合理的值，这样主程序就能正常调用这个函数，并继续接下来的开发了。可以注意到，虽然它接受了一个Source类型的参数，表明需要返回的温度是内部还是外部的，实际上并没有对这个参数进行任何使用。
桩程序是一段并不执行任何实际功能的程序，只对接受的参数进行声明并返回一个合法值。这个返回值通常只是一个对于调用者来讲可接受的值即可。桩通常用在对一个已有接口的临时替换上，实际的接口程序在未来再对桩程序进行替换。
在远程方法调用（RMI）中将客户辅助对象称之为Stub（桩）；将服务辅助对象称之为skeleton（骨架）。
RMI的过程是：客户对象一旦被调用，客户对象调用stub，stub调用网络远端的skeleton，而skeleton最终调用真正的服务对象。由此，在调用客户对象的时候，感觉上就是直接调用了真正的服务对象。





