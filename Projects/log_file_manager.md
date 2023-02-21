# 日志文件大小限制管理



## 









## 附录：资料
### shell查看目录大小
du -ach *    #这个能看到当前目录下的所有文件占用磁盘大小和总大小
du -sh       #查看当前目录总大小
du -sh *     #查看所有子目录大小
 
lsof | grep delete    #如果怀疑删掉的数据还在占用磁盘空间试试这个
kill -9 pid           #结束掉进程就能释放磁盘空间了
 
#for i in `lsof | grep delete | awk '{print $2}'`; do kill -9 $i ;done


日志大小轮询使用lograte命令。
```
#!/bin/bash
#
# 功能：管理日志文件大小
# 时间: 2021/3/10
#

folder_path="/var/log/"
if [ ! -d ${folder_path} ]; then
    exit 1
fi
cd ${folder_path}

# 自UTC时间，当前所经过的秒数
curren_date_second=$(date -d `date +%Y%m%d` +%s)

# 压缩文件夹
folders_name=`ls -l ${folder_path} | awk '/^d/ {print $NF}'`
for folder_name in ${folders_name}
do
    # 将文件夹日期转换为秒数
    date_second=$(date -d ${folder_name} +%s)
    if [ ! -z "${date_second}" ] && [ ${date_second} -lt ${curren_date_second} ]
    then
        tar -zcf ${folder_name}.tar.gz ${folder_name} --remove-files
    fi
done

# 判断文件夹大小是否超过200M
current_size=`du -s ${folder_path} | awk '{print $1}'`
max_size=$((200*1024))
while [ ${current_size} -gt ${max_size} ]
do
    oldest_file_name=`ls -rt | awk 'NR==1'`

    if [ ! -z ${oldest_file_name} ]; then
        rm -rf ${folder_path}${oldest_file_name}
    fi
    current_size=`du -s ${folder_path} | awk '{print $1}'`
done

exit 0
```








