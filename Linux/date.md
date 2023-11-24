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
[root@ubuntu0006:~/cmake] #date --date='@1693211760'
2023年 08月 28日 星期一 16:36:00 CST

$ date +%s
1700537669

# 增加时间后有空格必须要使用双引号
$ date -d "`date +'%Y%m%d %H:%M:%S'`" +%s
1700537669

$ date -d "$(date +'%Y%m%d %H:%M:%S')" +%s
1700537669

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
[root@ubuntu0006:/media/Hankin/vdb/TransferStation] #echo -e "$(date +%T).$((10#$(date +%N)/1000000))"
15:35:19.619
[root@ubuntu0006:/media/Hankin/vdb/TransferStation] #echo -e "$(date +%T).$(($(date +%N)/1000000))"
15:35:43.744
[root@ubuntu0006:/media/Hankin/vdb/TransferStation] #echo -e "$(date +%T).$(($(date +%N)/1000000))"
-bash: 090192046: 数值太大不可为算数进制的基 (错误符号是 "090192046")
[root@ubuntu0006:/media/Hankin/vdb/TransferStation] #echo -e "$(date +%T).$(($(date +%N)/1000000))"
15:35:50.983
[root@ubuntu0006:/media/Hankin/vdb/TransferStation] #echo -e "$(date +%T).$(($(date +%N)/1000000))"
15:35:52.291
[root@ubuntu0006:/media/Hankin/vdb/TransferStation] #echo -e "$(date +%T).$(($(date +%N)/1000000))"
15:35:53.186
[root@ubuntu0006:/media/Hankin/vdb/TransferStation] #echo -e "$(date +%T).$(($(date +%N)/1000000))"
-bash: 030685820: 数值太大不可为算数进制的基 (错误符号是 "030685820")
```
如果不加以10进制显示```10#```就会在达到999毫秒后失败。

## 6、转换成秒单位
```
给定的格式FORMAT 控制着输出，解释序列如下：

  %%    一个文字的 %
  %a    当前locale 的星期名缩写(例如： 日，代表星期日)
  %A    当前locale 的星期名全称 (如：星期日)
  %b    当前locale 的月名缩写 (如：一，代表一月)
  %B    当前locale 的月名全称 (如：一月)
  %c    当前locale 的日期和时间 (如：2005年3月3日 星期四 23:05:25)
  %C    世纪；比如 %Y，通常为省略当前年份的后两位数字(例如：20)
  %d    按月计的日期(例如：01)
  %D    按月计的日期；等于%m/%d/%y
  %e    按月计的日期，添加空格，等于%_d
  %F    完整日期格式，等价于 %Y-%m-%d
  %g    ISO-8601 格式年份的最后两位 (参见%G)
  %G    ISO-8601 格式年份 (参见%V)，一般只和 %V 结合使用
  %h    等于%b
  %H    小时(00-23)
  %I    小时(00-12)
  %j    按年计的日期(001-366)
  %k   hour, space padded ( 0..23); same as %_H
  %l   hour, space padded ( 1..12); same as %_I
  %m   month (01..12)
  %M   minute (00..59)
  %n    换行
  %N    纳秒(000000000-999999999)
  %p    当前locale 下的"上午"或者"下午"，未知时输出为空
  %P    与%p 类似，但是输出小写字母
  %r    当前locale 下的 12 小时时钟时间 (如：11:11:04 下午)
  %R    24 小时时间的时和分，等价于 %H:%M
  %s    自UTC 时间 1970-01-01 00:00:00 以来所经过的秒数
  %S    秒(00-60)
  %t    输出制表符 Tab
  %T    时间，等于%H:%M:%S
  %u    星期，1 代表星期一
  %U    一年中的第几周，以周日为每星期第一天(00-53)
  %V    ISO-8601 格式规范下的一年中第几周，以周一为每星期第一天(01-53)
  %w    一星期中的第几日(0-6)，0 代表周一
  %W    一年中的第几周，以周一为每星期第一天(00-53)
  %x    当前locale 下的日期描述 (如：12/31/99)
  %X    当前locale 下的时间描述 (如：23:13:48)
  %y    年份最后两位数位 (00-99)
  %Y    年份
  %z +hhmm              数字时区(例如，-0400)
  %:z +hh:mm            数字时区(例如，-04:00)
  %::z +hh:mm:ss        数字时区(例如，-04:00:00)
  %:::z                 数字时区带有必要的精度 (例如，-04，+05:30)
  %Z                    按字母表排序的时区缩写 (例如，EDT)
```
date +%s
date -d "2023-08-15 12:00:00" +%s
date: 显示当前日期和时间。
date +%Y-%m-%d: 显示当前日期，格式为年-月-日。
date +%H:%M:%S: 显示当前时间，格式为小时:分钟:秒。
date -s "2023-08-15 12:00:00": 设置系统时间为 2023 年 8 月 15 日 12 点。
date -u: 显示当前的 UTC 时间。

记住一点，需要使用+号进行操作即可。再一次犯这种错误，不清楚怎么使用%符号，主要是help中没有任何提示需要使用+号。

Mybase8.ini文件中，FirstUseOn.UserLic.App=1693211760有一个首次使用的时间点，使用date命令进行转换：
```
[root@ubuntu0006:~/cmake] #date --date='@1693211760'
2023年 08月 28日 星期一 16:36:00 CST
```