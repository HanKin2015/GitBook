# 高阶命令

## 1、shift命令
位置参数可以用shift命令左移。比如shift 3表示原来的$4现在变成$1，原来的$5现在变成$2等等，原来的$1、$2、$3丢弃，$0不移动。不带参数的shift命令相当于shift 1。

```
until [ $# -eq 0 ]
do
echo "第一个参数为: $1 参数个数为: $#"
shift
done

$./x_shift.sh 1 2 3 4
结果显示如下：
第一个参数为: 1 参数个数为: 4
第一个参数为: 2 参数个数为: 3
第一个参数为: 3 参数个数为: 2
第一个参数为: 4 参数个数为: 1
```

## 2、获取文件的绝对路径
realpath test.sh
ls `pwd`/test.sh

## 3、basename命令
basename /home/test/test.sh .sh
为basename指定一个路径，basename命令会删掉所有的前缀，末尾可以指定删除对应的后缀
上面结果输出test
suffix后缀 prefix前缀

## 4、易混淆的-n和-z
这两个的判断结果一定是相反的。
```
-n
   string is not null.

-z
  string is null, that is, has zero length
```

## 5、shell中的for循环
https://blog.csdn.net/qq_18312025/article/details/78278989

```
#!/bin/bash
read -p "请输入用户名的前缀：" a 
read -p "请输入用户的数目：" num
if (( $num<=10 ))
then
        n=0
        for i in `seq $num`
        do
               if useradd $a$i &>/dev/null
                then
                        echo "用户$a$i创建成功！"
                        (( n++ ))
                        echo "123456"|passwd $a$i --stdin &>/dev/null
                fi
        done
        echo "一共创建的用户数：$n个"
else
        echo "最多只能创建10个用户啦！"
fi
```

```
for i in {1..193}
do
    ( ping -c1 -i0.2 -w1 172.16.30.$i &>/dev/null
    if ((  $?==0  ))
    then
            echo "172.16.30.$i up"    >>2.txt
    else
            echo "172.16.30.$i down"    >>3.txt
    fi )&    --》这样就把这一段放到后台去执行了，大大加快了速度。
done
sleep 2
live_pc_num=`cat 2.txt|wc -l`
down_pc_num=`cat 3.txt|wc -l`
echo "there are $down_pc_num is down"
echo "there are $live_pc_num is up"
echo "list:"
cat 2.txt
rm -rf 2.txt 3.txt
```

## 6、使用find命令查询并拷贝文件到指定路径
```
root@family:/src/lib/FFmpeg-release-3.4/FFmpeg-release-3.4# find ./ -name *.so.*
./libavutil/libavutil.so.55
./libswresample/libswresample.so.2
./libavcodec/libavcodec.so.57
./libavformat/libavformat.so.57
./libswscale/libswscale.so.4
./libavfilter/libavfilter.so.6
./libavdevice/libavdevice.so.57
root@family:/src/lib/FFmpeg-release-3.4/FFmpeg-release-3.4# find ./ -name *.so.* -exec cp {} ../lib/
find: missing argument to `-exec'
root@family:/src/lib/FFmpeg-release-3.4/FFmpeg-release-3.4# find ./ -name *.so.* | xargs -i cp {} ../lib/
root@family:/src/lib/FFmpeg-release-3.4/FFmpeg-release-3.4# cd ..
root@family:/src/lib/FFmpeg-release-3.4# cd lib
root@family:/src/lib/FFmpeg-release-3.4/lib# ll
total 86712
drwxr-xr-x 2 root root     4096 May 28 02:41 ./
drwxr-xr-x 5 root root     4096 May 28 01:04 ../
-rwxr-xr-x 1 root root 57170248 May 28 02:41 libavcodec.so.57*
-rwxr-xr-x 1 root root   577680 May 28 02:41 libavdevice.so.57*
-rwxr-xr-x 1 root root  8914120 May 28 02:41 libavfilter.so.6*
-rwxr-xr-x 1 root root 17915136 May 28 02:41 libavformat.so.57*
-rwxr-xr-x 1 root root  1437840 May 28 02:41 libavutil.so.55*
-rwxr-xr-x 1 root root   302968 May 28 02:41 libswresample.so.2*
-rwxr-xr-x 1 root root  2453384 May 28 02:41 libswscale.so.4*
```

## 7、批量重命名去掉末尾的数字
```
rename "s/.so.*/.so/" *
```

## 8、dirname命令
输出文件夹路径，即删除文件名后缀的结果。
如  :dirname /home/test/test.h
结果:/home/test/

## 9、检测二进制文件编译选项
grep -m 1 "\-fsigned-char" xxx.so

Binary file xxx.so matchs

## 10、删除环境变量
export -n CPPFLAGS
unset CPPFLAGS

## 11、Linux lpr命令
lpr(line printer，按行打印)实用程序用来将一个或多个文件放入打印队列等待打印。
lpr 可以用来将料资送给本地或是远端的主机来处理。
使用一条打印命令可打印多个文件，下面的命令行在名为laser1的打印机上打印3个文件：
$ lpr -P laser1 05.txt 108.txt 12.txt 

## 12、awk命令找出某个字段（关键字）在文件中某一行的第几列
用awk命令找出"duration" 这个关键字在文件第一行的第几列:
```
head -1 common_fraud_samples_bad_merged_cp.txt | awk -F ',' '{for (i=1;i<=NF;i++) {if ($i=="duration") {print i}}}'
```

## 13、如何从Shell脚本中的字符串中删除或获取尾数
需求：我需要分别获得usbmon和0、1、2、12等等。
```
[root@ubuntu0006:/] #ll /dev/usbmon*
crw------- 1 root root 245,  0 10月 11 16:54 /dev/usbmon0
crw------- 1 root root 245,  1 10月 11 16:54 /dev/usbmon1
crw------- 1 root root 245, 10 10月 11 16:54 /dev/usbmon10
crw------- 1 root root 245, 11 10月 11 16:54 /dev/usbmon11
crw------- 1 root root 245, 12 10月 11 16:54 /dev/usbmon12
crw------- 1 root root 245,  2 10月 11 16:54 /dev/usbmon2
crw------- 1 root root 245,  3 10月 11 16:54 /dev/usbmon3
crw------- 1 root root 245,  4 10月 11 16:54 /dev/usbmon4
crw------- 1 root root 245,  5 10月 11 16:54 /dev/usbmon5
crw------- 1 root root 245,  6 10月 11 16:54 /dev/usbmon6
crw------- 1 root root 245,  7 10月 11 16:54 /dev/usbmon7
crw------- 1 root root 245,  8 10月 11 16:54 /dev/usbmon8
crw------- 1 root root 245,  9 10月 11 16:54 /dev/usbmon9
```

可以通过如下使用sed来实现，删除尾号后获得字符串，我们可以使用sed将尾号替换为空字符串。
```
[root@ubuntu0006:/] #str="usbmon12"
[root@ubuntu0006:/] #strhead=$(echo $str | sed 's/[0-9]*$//')
[root@ubuntu0006:/] #echo $strhead
usbmon
[root@ubuntu0006:/] #strtail=${str:${#strhead}}
[root@ubuntu0006:/] #echo $strtail
12
```
要通过使用strhead来获取strtail ，是从strhead之后的位置从原始字符串中获取子字符串。








