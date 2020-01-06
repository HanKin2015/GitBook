为了线程安全，这里不用指针。牺牲一点性能。

延迟。

阻塞。

- milliseconds  msleep毫秒

- usleep微秒

  - ```
    功能与sleep类似，只是传入的参数单位是微妙。
    若想最佳利用cpu，在更小的时间情况下，选择用usleep。
    sleep传入的参数是整型，所以不能传了小数。
    usleep不能工作在windows上，只能在linux下（深深的体会到API对平台系统的严格要求，转念想想跨平台的语言是多么强大，多么爽啊，比如java）。
    ```

    

- sleep秒

-  udelay() mdelay() ndelay() 

在Ｌinux Ｄriver开发中，经常要用到延迟函数：msleep，mdelay／udelay．

虽然msleep和mdelay都有延迟的作用，但他们是有区别的．

1.)对于模块本身

mdelay是忙等待函数，在延迟过程中无法运行其他任务．这个延迟的时间是准确的．是需要等待多少时间就会真正等待多少时间．

msleep是休眠函数，它不涉及忙等待．你如果是msleep(１０)，那实际上延迟的时间，大部分时候是要多于１０ms的，是个不定的时间值．



2.)对于系统：

mdelay() 会占用cpu资源，导致其他功能此时也无法使用cpu资源。

msleep() 则不会占住cpu资源，其他模块此时也可以使用cpu资源。

delay函数是忙则等待，占用CPU时间；而sleep函数使调用的进程进行休眠。



3.)udelay() mdelay() ndelay() 区别：

udelay(); mdelay(); ndelay();实现的原理本质上都是忙等待，ndelay和mdelay都是通过udelay衍生出来的。

我们使用这些函数的实现往往会碰到编译器的警告implicit declaration of function 'udelay'，这往往是由于头文件的使用不当造成的。

在include/asm-***/delay.h中定义了udelay（），而在include/linux/delay.h中定义了mdelay和ndelay.

udelay一般适用于一个比较小的delay，如果你填的数大于2000，系统会认为你这个是一个错误的delay函数，因此如果需要2ms以上的delay需要使用mdelay函数。



4.)msleep，ssleep区别：

休眠单位不同



5.)秒的单位

ms是毫秒=0.001秒

us是微秒=0.000001秒

ns是纳秒=0.000000001秒
————————————————
版权声明：本文为CSDN博主「CBK888666」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/cbk861110/article/details/40747139

# 1、查找本机的网卡名

除了lo环回网卡之外的单网卡. 多网卡情况暂不处理，除了环回网卡lo就是网卡名。

```
int get_ip_mac_address(uint32_t &ip_addr, uint8_t *phy_addr, int phy_addr_len)
{
    ASSERT(NULL != phy_addr);

    int ret, sockfd, err;
    struct ifreq ifr;
    struct ifaddrs *ifaddr, *ifa;
    std::string netName;

    ret = getifaddrs(&ifaddr);
    if(ret < 0) {
        LOG_ERROR("Get ifaddrs is failed(%d)", ret);
        return -1;
    }

    //获取除了lo环回网卡之外的单网卡. 多网卡情况暂不处理
    for(ifa = ifaddr; ifa != NULL; ifa = ifa->ifa_next) {
        if(strncmp(ifa->ifa_name, LO_NET_NAME, strlen(LO_NET_NAME))) {
            netName = ifa->ifa_name;
        }
    }
    LOG_INFO("Eth name is :[ %s ]", netName.c_str());

    memset(&ifr, 0, sizeof(ifr));
    strncpy(ifr.ifr_name, netName.c_str(), sizeof(ifr.ifr_name) - 1);

    if ((sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
        LOG_ERROR("Open socket error, %d, %s", errno, strerror(errno));
        return -1;
    }
 
    err = ioctl(sockfd, SIOCGIFADDR, &ifr); // ip地址
    if (0 == err) {
        ip_addr = ((struct sockaddr_in*)&(ifr.ifr_addr))->sin_addr.s_addr;
    }
    else {
        LOG_ERROR("Get ip address fail, %d, %s", errno, strerror(errno));
        goto FAIL;
    }

    memset(&ifr.ifr_addr, 0, sizeof(ifr.ifr_addr));
    err = ioctl(sockfd, SIOCGIFHWADDR, &ifr); // mac地址
    if (0 == err) {
        if (phy_addr_len < PHY_ADDR_LEN || sizeof(ifr.ifr_hwaddr.sa_data) < PHY_ADDR_LEN) {
            LOG_ERROR("Mac address format error.");
            goto FAIL;
        }
        memcpy(phy_addr, ifr.ifr_hwaddr.sa_data, PHY_ADDR_LEN);
    }
    else {
        LOG_ERROR("Get mac address fail, %d, %s", errno, strerror(errno));
        goto FAIL;
    }

    freeifaddrs(ifaddr);
    close(sockfd);
    return 0;

FAIL:
    freeifaddrs(ifaddr);
    close(sockfd);
    return -1;
}
```

