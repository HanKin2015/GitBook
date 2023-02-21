# 参数处理

## 1、入参赋值

```
[root@ubuntu0006:/media/hankin/vdb/study/udev] #cat test_binary.sh
#!/bin/bash

# 入参赋值
if [ $# -eq 1 ]
then
    vmid=$1
fi
echo ${vmid}

# 文件赋值
if [ -f "vmid" ]; then
    vmid=`cat vmid`
fi
echo ${vmid}

# 参数不合格
if test -z "${vmid}"
then
    echo "usage ./test_binary.sh vmid or add a file which named vmid"
    exit 1
fi
[root@ubuntu0006:/media/hankin/vdb/study/udev] #./test_binary.sh


usage ./test_binary.sh vmid or add a file which named vmid
[root@ubuntu0006:/media/hankin/vdb/study/udev] #./test_binary.sh 4
4
4
[root@ubuntu0006:/media/hankin/vdb/study/udev] #echo "12345" > vmid
[root@ubuntu0006:/media/hankin/vdb/study/udev] #./test_binary.sh

12345
[root@ubuntu0006:/media/hankin/vdb/study/udev] #./test_binary.sh 321
321
12345
```

## 2、参数判断
```
[root@ubuntu0006:/media/hankin/vdb/study/udev] #cat test_binary.sh
#!/bin/bash

# 入参有且只有一个
if [ $# -ne 1 ]
then
    echo "usage ./test_binary.sh t/r"
    exit 1
fi

opt=$1

# 恢复环境
if [ ${opt} == "r" ]
then
    echo "Restore environment..."
    exit 0
fi

# 替换文件测试
if [ ${opt} == "t" ]
then
    echo "Change environment..."
    exit 0
fi
[root@ubuntu0006:/media/hankin/vdb/study/udev] #./test_binary.sh
usage ./test_binary.sh t/r
[root@ubuntu0006:/media/hankin/vdb/study/udev] #./test_binary.sh r
Restore environment...
[root@ubuntu0006:/media/hankin/vdb/study/udev] #./test_binary.sh rt
[root@ubuntu0006:/media/hankin/vdb/study/udev] #./test_binary.sh t
Change environment...
```