# ssh欢迎界面之motd

编辑这个文件 /etc/motd即message of today（布告栏信息）每次用户登录时，/etc/motd文件的内容会显示在用户的终端。


/etc/issue 文件设置，在tty1-tty6没有登录的情况下显示登录前提示信息。

实战发现：可能有其他文件在作怪。
如：/etc/update-motd.d/目录下配置。




```
/**
 *                    .::::.
 *                  .::::::::.
 *                 :::::::::::  FUCK YOU
 *             ..:::::::::::'
 *           '::::::::::::'
 *             .::::::::::
 *        '::::::::::::::..
 *             ..::::::::::::.
 *           ``::::::::::::::::
 *            ::::``:::::::::'        .:::.
 *           ::::'   ':::::'       .::::::::.
 *         .::::'      ::::     .:::::::'::::.
 *        .:::'       :::::  .:::::::::' ':::::.
 *       .::'        :::::.:::::::::'      ':::::.
 *      .::'         ::::::::::::::'         ``::::.
 *  ...:::           ::::::::::::'              ``::.
 * ```` ':.          ':::::::::'                  ::::..
 *                    '.:::::'                    ':'````..
 */
 ```
 
 ```
 /**
 **************************************************************
 *                                                            *
 *   .=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-.       *
 *    |                     ______                     |      *
 *    |                  .-"      "-.                  |      *
 *    |                 /            \                 |      *
 *    |     _          |              |          _     |      *
 *    |    ( \         |,  .-.  .-.  ,|         / )    |      *
 *    |     > "=._     | )(__/  \__)( |     _.=" <     |      *
 *    |    (_/"=._"=._ |/     /\     \| _.="_.="\_)    |      *
 *    |           "=._"(_     ^^     _)"_.="           |      *
 *    |               "=\__|IIIIII|__/="               |      *
 *    |              _.="| \IIIIII/ |"=._              |      *
 *    |    _     _.="_.="\          /"=._"=._     _    |      *
 *    |   ( \_.="_.="     `--------`     "=._"=._/ )   |      *
 *    |    > _.="                            "=._ <    |      *
 *    |   (_/                                    \_)   |      *
 *    |                                                |      *
 *    '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='      *
 *                                                            *
 *           LASCIATE OGNI SPERANZA, VOI CH'ENTRATE           *
 **************************************************************
 */
 
 意大利语言：别抱任何希望，你进去吧。
 ```

```
/**
 *                    _ooOoo_
 *                   o8888888o
 *                   88" . "88
 *                   (| -_- |)
 *                    O\ = /O
 *                ____/`---'\____
 *              .   ' \\| |// `.
 *               / \\||| : |||// \
 *             / _||||| -:- |||||- \
 *               | | \\\ - /// | |
 *             | \_| ''\---/'' | |
 *              \ .-\__ `-` ___/-. /
 *           ___`. .' /--.--\ `. . __
 *        ."" '< `.___\_<|>_/___.' >'"".
 *       | | : `- \`.;`\ _ /`;.`/ - ` : | |
 *         \ \ `-. \_ __\ /__ _/ .-` / /
 * ======`-.____`-.___\_____/___.-`____.-'======
 *                    `=---='
 *
 * .............................................
 *       高山仰止,景行行止.虽不能至,心向往之。
 */
```

给大家一个链接，里面有一些字符图案可以使用
https://blog.csdn.net/liangpingguo/article/details/104017519

以上是偏字符图案的，那么，我想写一些优雅的欢迎词呢？比如说good good study,day day up!
满足你。把以下链接输入框内的hello world改为你想显示的欢迎词即可，多达300+显示样式，点击test all就可以看到全部
http://patorjk.com/software/taag/#p=testall&f=Mer&t=Hello%20World


## 银河麒麟烦人的提示
[Note] System unauthorized, Please contact the system supplier


ssh进入的时候明显能看见当前版本是试用版的缘故：
```
Welcome to Kylin 4.0.2 (GNU/Linux 4.4.58-20170818.kylin.5.desktop-generic aarch64)


银河麒麟操作系统（试用版）免责声明

尊敬的客户：
  您好！随机安装的“银河麒麟操作系统（试用版）”是针对该版本对应的行业客户的免费试用版本，仅用于飞腾CPU整机的试用、测试和评估，不能用于其他任何商业用途。此试用版本以软件出库时间计时，试用时间为一年。试用期不提供相关正版软件的售后服务，如果客户在试用版本上自行存放重要文件及私自进行商业用途，由此产生的任何安全问题及结果一概由用户自己承担，天津麒麟信息技术有限公司不承担任何法律风险。
  在试用过程中，如希望激活或者得到专业的技术服务支持，请您购买“银河麒麟操作系统”正式版本或授权，联系方式如下：400-089-1870。

天津麒麟信息技术有限公司
www.kylinos.cn

* Kylin system authentication information:
To obtain service serial number error!
您有新邮件。
Last login: Mon Mar 22 21:08:46 2021 from 172.22.36.34

[Note] System unauthorized, Please contact the system supplier.
```


通过grep查找，在bash命令中找到。仔细想想，一个回车就能出现的文字提示无非在两个地方：
- bash命令
- bash_completion文件中

结果在bash中找到，简单的添加字符修改，问题出现了：
ssh连接不进来了，连接后显示motd文字后就断开连接了。赶紧改回去好了，因此，不要随意改动bash二进制文件。

这个问题改不了，我猜测授权后会替换bash，我们可以自己替换bash是不是就可以了？
















