[TOC]
# shell脚本与vim编辑器

## 1、ctrl+s冻结

使用Xshell的时候在vim下按ctrl + s 之后就把终端锁定了。

解决方法是ctrl + q（如果登录微信，ctrl + q 被占用为截屏，那就按ctrl + z）。
查看相关组合键可以输入：stty -a



## 2、最强vim配置文件

## 3、vim操作常用

设置关键字高亮：set hlsearch
一般来说，关闭在第二个单词加上no即可
如：set nohlsearch

set cul
e ++enc=cp936



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

## 进阶：使用find命令查询并拷贝文件到指定路径
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

## 进阶：批量重命名去掉末尾的数字
```
rename "s/.so.*/.so/" *
```










