# 日期date命令

## 1、基本操作
```
$ date -d "+1 day" +%Y-%m-%d
2012-04-23

$ date -d "-1 day" +%Y-%m-%d
2012-04-21

$ date -d "2012-04-10 -1 day " +%Y-%m-%d
2012-04-09

$ date -d "2012-04-10 +1 day " +%Y-%m-%d
2012-04-11

$ date -d "-1 week " +%Y-%m-%d
2012-04-15

$ date -d "+1 week " +%Y-%m-%d
2012-04-29

$ date -d "+1 month " +%Y-%m-%d
2012-05-22

$ date -d "-1 month " +%Y-%m-%d
2012-03-22

$ date -d "-1 year " +%Y-%m-%d
2011-04-22

$ date -d "+1 year " +%Y-%m-%d
2013-04-22
```

## 2、日期大小比较方法
转化为时间戳然后比较
```
$ date -d `date +%Y%m%d` +%s
1335024000

$ date -d "2012-04-21" +%s
1334937600

$ date -d "2012-04-22" +%s
1335024000
```

https://www.cnblogs.com/kimbo/p/7102203.html

```
#!/bin/bash
#
# 功能：管理USB外设运营记录文件大小
# 时间: 2021/3/10
#

folder_path="/var/log/usb_record_info/"
cd $folder_path

# 自UTC时间，当前所经过的秒数
curren_date_second=$(date -d `date +%Y%m%d` +%s)

# 压缩文件夹
folders_name=`ls -l $folder_path | awk '/^d/ {print $NF}'`
for folder_name in $folders_name
do
    # 将文件夹日期转换为秒数
    date_second=$(date -d $folder_name +%s)
    if [ $date_second -lt $curren_date_second ]
    then
        tar -zcf ${folder_name}.tar.gz $folder_name --remove-files
    fi
done

# 判断文件夹大小是否超过200M
current_size=`du -s $folder_path | awk '{print $1}'`
max_size=$((200*1024))
while [ $current_size -gt $max_size ]
do
    oldest_file_name=`ls -lrt | awk 'NR==2' | awk '{print $NF}'`
    rm -rf $oldest_file_name
    current_size=`du -s $folder_path | awk '{print $1}'`
done
```

## 3、设置linux时间
```
date -s 20140712
date -s 18:30:50
date 071218302014(月日时分年)
date -s "20140712 18:30:50"
```

## 4、显示昨天今天明天的日数
```
day_tomorrow=$(expr $(date --date="+1 day" +"%d") + 0);
day_yestoday=$(expr $(date --date="-1 day" +"%d") + 0);
day_today=$(expr $(date +"%d") + 0);
current_date=$(date +%F);

14
12
13
2021-03-13
```

## 5、显示毫秒级
```
[root@ubuntu0006:/media/sangfor/vdb/TransferStation] #echo -e "$(date +%T).$((10#$(date +%N)/1000000))"
15:35:19.619
[root@ubuntu0006:/media/sangfor/vdb/TransferStation] #echo -e "$(date +%T).$(($(date +%N)/1000000))"
15:35:43.744
[root@ubuntu0006:/media/sangfor/vdb/TransferStation] #echo -e "$(date +%T).$(($(date +%N)/1000000))"
-bash: 090192046: 数值太大不可为算数进制的基 (错误符号是 "090192046")
[root@ubuntu0006:/media/sangfor/vdb/TransferStation] #echo -e "$(date +%T).$(($(date +%N)/1000000))"
15:35:50.983
[root@ubuntu0006:/media/sangfor/vdb/TransferStation] #echo -e "$(date +%T).$(($(date +%N)/1000000))"
15:35:52.291
[root@ubuntu0006:/media/sangfor/vdb/TransferStation] #echo -e "$(date +%T).$(($(date +%N)/1000000))"
15:35:53.186
[root@ubuntu0006:/media/sangfor/vdb/TransferStation] #echo -e "$(date +%T).$(($(date +%N)/1000000))"
-bash: 030685820: 数值太大不可为算数进制的基 (错误符号是 "030685820")
```
如果不加以10进制显示```10#```就会在达到999毫秒后失败。