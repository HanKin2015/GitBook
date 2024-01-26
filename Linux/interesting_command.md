# 让您爱上Ubuntu的14条有趣命令

带你装逼带你飞，带你冲进垃圾堆。

## 1、安装软件
apt-get install sl cmatrix hollywood oneko libaa-bin linuxlogo screenfetch banner toilet figlet fortune fortune-zh lolcat cowsay

## 2、命令
开火车（嘟嘟嘟~）：sl
通过man查看sl携带的参数：man sl
黑客帝国（流星雨）：cmatrix
高大上仪表盘（假装自己很nb）：hollywood
跟随鼠标的小猫：oneko
燃烧的字符串：aafire
眼睛：xeyes
俄罗斯方块：bastet
贪吃蛇游戏：greed
天气预报：curl wttr.in/"Nanjing"?lang=zh

可以看到当前的Linux版本、Ubuntu发行版本、电脑的配置：linuxlogo
查看linux发行版本列表：linuxlogo -f -L list
我们可以看到列表的下面有一行话。它的意思是我们可以通过"linux_logo-l num"来得到列表中第num个发行版本的信息以及图标。
```
Do "linux_logo -L num" where num is from above to get the appropriate logo.
```
立即输入以下命令来循环打印列表中所有可以打印出来的Linux发行版本的信息以及图标。
for i in {1..30};do linux_logo -f -L $i;sleep 0.5;done

显示系统、主题信息：screenfetch
可以用字符'#'拼出大字，输入以下命令即可用字符'#'拼出一个"Linux"：banner linux 
oilet和banner有点类似，都可以用字符拼出大字，但是toilet用到的字符不止有’#'一种，而且toilet可以写出彩色字体：toilet linux
生成彩色字体"Linux"：toilet -f mono12 -F gay Linux
生成双色字体"Ubuntu"：toilet -f mono12 -F metal Ubuntu
生成英文艺术字：figlet Ich liebe dich.   (这个是重点)
随机输出英文名言：fortune
安装fortune-zh后可以输出英文名言、也可以输出中文名言，还可以输出古诗词
输出彩色的fortune：fortune | lolcat
会说话的小牛：cowsay "Hello, world."
会说话的小牛：cowthink "Hello, world."
查询一下有哪些图形参数可以供我们使用：cowsay -l
可以在 -f 后面接上图形参数来选择我们需要的图形：cowsay -f kiss "I love you!"
氪过金的人，把lolcat和cowsay结合起来使用可以变成彩色：cowsay -f dragon "我可是氪过金的恐龙。" | lolcat
把fortune、cowsay、lolcat三者合在一条命令中使用。贼炫酷！：fortune | cowsay -f stegosaurus | lolcat
```
[root@ubuntu0006:/var/lib/dpkg] #fortune | cowsay -f stegosaurus | lolcat
 ______________________________________
/ You will be the last person to buy a \
\ Chrysler.                            /
 --------------------------------------
\                             .       .
 \                           / `.   .' "
  \                  .---.  <    > <    >  .---.
   \                 |    \  \ - ~ ~ - /  /    |
         _____          ..-~             ~-..-~
        |     |   \~~~\.'                    `./~~~/
       ---------   \__/                        \__/
      .'  O    \     /               /       \  "
     (_____,    `._.'               |         }  \/~~~/
      `----.          /       }     |        /    \__/
            `-.      |       /      |       /      `. ,~~|
                ~-.__|      /_ - ~ ^|      /- _      `..-'
                     |     /        |     /     ~-.     `-. _  _  _
                     |_____|        |_____|         ~ - . _ _ _ _ _>
[root@ubuntu0006:/var/lib/dpkg] #fortune-zh | cowsay -f stegosaurus | lolcat
 ___________________________________________________
/ 《长干行・其二》[m 作者：崔颢[m               \
\ 家临九江水，来去九江侧。 同是长干人，生小不相识。 /
 ---------------------------------------------------
\                             .       .
 \                           / `.   .' "
  \                  .---.  <    > <    >  .---.
   \                 |    \  \ - ~ ~ - /  /    |
         _____          ..-~             ~-..-~
        |     |   \~~~\.'                    `./~~~/
       ---------   \__/                        \__/
      .'  O    \     /               /       \  "
     (_____,    `._.'               |         }  \/~~~/
      `----.          /       }     |        /    \__/
            `-.      |       /      |       /      `. ,~~|
                ~-.__|      /_ - ~ ^|      /- _      `..-'
                     |     /        |     /     ~-.     `-. _  _  _
                     |_____|        |_____|         ~ - . _ _ _ _ _>
```

用来无限输出某一条语句，按下Ctrl+C即可终止输出：yes "I love you three thousand!" | lolcat

https://tanyaodan.blog.csdn.net/article/details/89932124

## 3、其他
xcalc
xsm
x-terminal-emulator
xman
xlogo
xterm
 