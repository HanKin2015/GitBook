# 未来规划

枚举一些代办的事情

# qq消息汇总
[如何一个周末搞定一篇论文](https://mp.weixin.qq.com/s/IS8IgwYqIlAocbNL9r1M8A)
[这篇最近图深度学习的汇总](https://mp.weixin.qq.com/s/4K-RCRIrfAxinGgDJbIxcw)
https://jalammar.github.io/illustrated-word2vec/
清华刘知远：如何写一篇合格的学术论文http://url.cn/5CdTqVe
台湾小哥一篇论文把BERT拉下神坛！NLP神话缺了数据集还不如随机https://mp.weixin.qq.com/s/JO27D-Zet0IJcBZ4uj8BYA

# To-do List
- vmware虚拟机在/mnt/hgfs文件夹中找不到共享文件夹
- 江故、战力统计
- sublime卸载livepreview安装markdownpreview
- ubuntu安装输入法ibus
- 选择合适的热门自走棋-多多
- 设置sublime自动换行：配置文件并没有用，最后快捷键搞定https://www.cnblogs.com/keepLeung/p/6839177.html

# 多多自走棋国际邀请赛
多多自走棋国际邀请赛，Autochess Invitational。由巨鸟多多工作室、龙源网络、Imba传媒联合举办。比赛将于2019年10月在上海举办，总奖金高达一百万美元！

# 刀塔自走棋
《刀塔自走棋》是一款由游戏玩家自制地图的dota2衍生玩法。

# strdup 
strdup（）函数是c语言中常用的一种字符串拷贝库函数，一般和free（）函数成对出现。

终于明白这个函数的作用，如下：
```
const char *s1 = "handsome";
char *s2 = s1;    // 报错invalid conversion from 'const char*' to 'char*'

// 这时候使用strdup
char *s2 = strdup(s1);   // 完美
```

// union的作用就是只有一块空间

发现返回0值是报错，返回其他值是正常。如if (!ret)。


# vmware 找不到共享文件夹
https://blog.csdn.net/weixin_42418557/article/details/80636882

执行一下这个命令vmhgfs-fuse /mnt/hgfs/  再看 mnt 目录

# 安装中文
https://blog.csdn.net/sparkstrike/article/details/81487271


calloc、malloc、realloc

呵呵，其实区别就是
是否对申请的区域进行初始化而已
但是我想你也知道我们写程序的时候多用malloc而很少用calloc，和解？
因为calloc虽然对内存进行了初始化（全部初始化为0），但是同样也要降低效率的
calloc相当于
p = malloc();
memset(p, 0,size);
多了对内存的写零操作，而写零这个操作我们有时候需要，而大部分时间不需要
所以就有两个函数并存的关系了


用手机操作，如何实现苍牙大招的光速cc？https://www.bilibili.com/video/av53679761/



C语言中的布尔值
C不具备显示的布尔类型，所以使用整数来代替，规则是：零是假，任何非零值皆为真。

反过来说，如果逻辑表达式为真其值一定为真，若逻辑表达式为假其值一定为零。


公司编码checklist：http://200.200.1.35/coding/checklist/html/checklist_C_C++.html
http://200.200.1.35/coding/checklist/checklist_CAPI.html


# 哪吒之魔童降世
# 打，打个大西瓜


# JSON-API设计
[sublime text 3.2.1 3207注册（自行破解）方法](https://www.jianshu.com/p/1dc6ca5b9175)
https://www.cnblogs.com/nwgdk/p/10987247.html
[sublime之markdown语法高亮和修改主题](https://www.jianshu.com/p/2a4267e1bae8)
http://note.youdao.com/iyoudao/?p=2411


https://blog.csdn.net/zhangdongren/article/details/82663977
https://www.cnblogs.com/xiaoliangge/p/9124089.html
https://www.jianshu.com/p/7cbd50058ea3
[你真的会写单元测试吗？](https://www.jianshu.com/p/e5ac60af4198)



### 三. API设计(4h)

#### [方法]

  第一步. 先分析场景，梳理设计需求（设计要注意的要点）;
  第二步. 给出基本方案，方案列出有哪些API，并写出API的原型，和功能描述；
  第三步. 有了基本方案后，切换为用户视角，利用基本方案中描述的API完成demo；
  第四步. 根据demo反复思考，有哪些细节需要考虑，有没有让用户写代码更简单的实现方法；
  第五步. 修改API方案，将构思成熟的API输出到表格

#### [产出]

1. 思路分析思维导图

  * 场景分析
  * 功能分解
  * 注意事项

2. demo代码

  切换为API使用者的视角，利用API去实现readme.md中要求的功能，即生成一个复杂json值的内存数据结构表示

3. API设计表格

  API原型，API功能，API参数和返回值说明，设计思路（为什么这么设计，以及后续实现思路）