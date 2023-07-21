# 模板

## 1、makefile通用模板
```
CC      = gcc
CPP     = g++
TARGET  = handle_udev_info
SRCS    = $(shell find . -maxdepth 1 -name "*.cpp")
SRCS    += $(shell find . -maxdepth 1 -name "*.c")
SRCS    += $(shell find ./third_library/cjson -maxdepth 1 -name "*.c")
SRCS    += $(shell find ./third_library/zlib -maxdepth 1 -name "*.c")
OBJS    = $(addsuffix .o,$(SRCS))
CFLAGS  = -g -Os
CPPFLAGS= -g -Os -std=c++11
LDFLAGS = -lm
INCLUDE = -I./third_library/cjson -I./third_library/zlib -I./third_library/cmdline
LIBS	= -L./third_library/zlib -lz -lpthread

all: clean $(TARGET)
	./$(TARGET)

$(TARGET):$(OBJS)
	$(CPP) $(LDFLAGS) -o $@ $^ $(INCLUDE) $(LIBS) 

%.c.o:%.c
	$(CC) -c $(CFLAGS) -o $@ $< $(INCLUDE) $(LIBS) 

%.cpp.o:%.cpp
	$(CPP) -c $(CPPFLAGS) -o $@ $< $(INCLUDE) $(LIBS) 

clean:
	rm -rf $(TARGET) *.o
```

## 2、cmake通用模板
代码见：D:\Github\Storage\c++\状态机\CMakeLists.txt

## 3、头文件和函数注释

### c/c++文件
```
/**
* 文 件 名: read_write.cpp
* 文件描述: 探究读写文件速度效率
* 作    者: HanKin
* 创建日期: 2023.06.30
* 修改日期：2023.06.30
*
* Copyright (c) 2023 HanKin. All rights reserved.
*/

#include <cstdio>
#include <iostream>
#include <cstring>
#include <string.h>
#include <cstdlib>
using namespace std;

int main(int argc, char *argv[])
{
    return 0;
}

printf("********* %s[%d] *********\n", __FUNCTION__, __LINE__);
std::cout << "********* " << __FUNCTION__ << '[' << __LINE__ << "] *********" << std::endl;

/**
* @brief  运行shell命令
* @note   运行结果输出长度不超过outputLen且只输出第一行，超过会截断
* @param  cmd [in] shell命令
* @param  output [out] 运行结果输出
* @param  outputLen [in] 运行结果字符串长度
* @return 无
*/

system("PAUSE");
return EXIT_SUCCESS;

typedef struct _NODE {
	int x;
	int y;
} NODE;
```

### shell脚本
```
#!/bin/bash
#
# 文 件 名: video_tool.sh
# 文件描述: 限制文件大小，备份一个100MB大小的文件，如果当前文件超过100MB则删除备份
# 作    者: HanKin
# 创建日期: 2023.01.07
# 修改日期：2023.01.07
# 
# Copyright (c) 2023 HanKin. All rights reserved.
#


echo '
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#   _   _       ___   __   _   _   __  _   __   _             #
#  | | | |     /   | |  \ | | | | / / | | |  \ | |            #
#  | |_| |    / /| | |   \| | | |/ /  | | |   \| |            #
#  |  _  |   / /_| | | |\   | |   \   | | | |\   |            #
#  | | | |  / /  | | | | \  | | |\ \  | | | | \  |            #
#  |_| |_| /_/   |_| |_|  \_| |_| \_\ |_| |_|  \_|            #
#                                                  __in China #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #'

# # # # # # # # # # # # # # # # # # # # # # # # #
#   _   _    _    _   _ _  _____ _   _          #
#  | | | |  / \  | \ | | |/ /_ _| \ | |         #
#  | |_| | / _ \ |  \| | ' / | ||  \| |         #
#  |  _  |/ ___ \| |\  | . \ | || |\  |         #
#  |_| |_/_/   \_\_| \_|_|\_\___|_| \_|         #
#                                    __in China #
# # # # # # # # # # # # # # # # # # # # # # # # #

# # # # # # # # # # # # # # # # # # # # # # # # #
#   _____     ____   _____   _____   _____      #
#  |  _  \  /  ___/ /  ___| |  ___| /  _  \     #
#  | |_| |  | |___  | |     | |__   | | | |     #
#  |  _  /  \___  \ | | __  |  __|  | | | |     #
#  | | \ \   __ | | | |\_ | | |     | |_| |     #
#  |_|  \_\ /_____/ \_____/ |_|     \_____/     #
#                                               #
# # # # # # # # # # # # # # # # # # # # # # # # #
```

### awk脚本
```
#!/usr/bin/awk -f
#
# 文 件 名: test.awk
# 文件描述: awk脚本练习
# 作    者: HanKin
# 创建日期: 2022.08.26
# 修改日期：2022.08.26
# 
# Copyright (c) 2022 HanKin. All rights reserved.
#
```

### python脚本
```
# -*- coding: utf-8 -*-
"""
文 件 名: remove_eference_dimension.py
文件描述: 移除引用标注
作    者: HanKin
创建日期: 2023.01.04
修改日期：2023.01.04

Copyright (c) 2023 HanKin. All rights reserved.
"""

import time

def main():
    """主函数
    """

if __name__ == '__main__':
    """程序入口
    """
    
    #os.system('chcp 936 & cls')
    print('******** starting ********')
    start_time = time.time()

    main()

    end_time = time.time()
    print('process spend {} s.\n'.format(round(end_time - start_time, 3)))
    
print('-------- {}[{}] --------'.format(sys._getframe().f_code.co_name, sys._getframe().f_lineno))
```

### batch脚本
```
::
:: 文 件 名: mem_cpu_io.bat
:: 文件描述: 吃掉系统内存cpuio
:: 作    者: HanKin
:: 创建日期: 2022.02.09
:: 修改日期：2022.02.09
:: 
:: Copyright (c) 2022 HanKin. All rights reserved.
::
```

### perl脚本
```
#!/usr/bin/perl
#
# 拷贝test文件到服务器后台
#
# 用法: ./copy_test_to_apach.sh
# 使用前注意: 
#   1. 需要安装expect, apt install expect
#   2. 放置在/data/local/hj/目录下
#
# author: hejian
# date  : 2022.05.07
#
# Copyright (c) 2022 hejian. All rights reserved.
#
```

### puml文件
```
/''
' 文 件 名: template.puml
' 文件描述: 模板（Alt+D运行预览）
' 作    者: HanKin
' 创建日期: 2022.09.19
' 修改日期：2022.09.19
' 
' Copyright (c) 2022 HanKin. All rights reserved.
'/

@startuml
rectangle 开始和结束
start
stop
@enduml
```

### golang语言
```
/**
* 文 件 名: study_golang.go
* 文件描述: 学习golang语言
* 作    者: HanKin
* 创建日期: 2022.09.09
* 修改日期：2022.09.09
*
* Copyright (c) 2022 HanKin. All rights reserved.
*/
```

### javaScript

### css

### html

## 4、调试日志
```C++
// 调试日志文件只创建一次
const char *file_path;
file_path  = "D:/hejian.txt";
if (_access(file_path, 0)) {
    FILE *fp;
    fp = fopen(file_path, "a");
    if (fp == NULL) {
        OUTPUT_DEBUG_PRINTF("[keyword] open file failed!");
        break;
    }
    struct _timeb now;                                              
    struct tm today;                                                
    char datetime_str[20];                                          
    _ftime_s(&now);                                                 
    localtime_s(&today, &now.time);                                 
    strftime(datetime_str, 20, "%Y-%m-%d %H:%M:%S", &today);
    fprintf(fp, "%s [%04d/%04d] INFO [%s] WM_TIMER wparam is %d.\n", datetime_str, GetCurrentProcessId(), GetCurrentThreadId(), __FUNCTION__, wparam);
    fclose(fp);
    fp = NULL;
}
```

```python脚本

```

## 5、日常测试脚本（含参数）

### shell
详细全面见D:\Github\GitBook\gitbook\Shell-vim\template.md文件

```
#!/bin/bash
```

## 6、git上库模板
```
[问题描述] 
[问题单号] 20210329
[问题原因] 
[修改方案] 
[影响模块] 模块
[本地自测] 
[测试建议] 参考自测
```





