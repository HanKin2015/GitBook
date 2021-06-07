# Template

## 1、c++执行shell命令
```
/*
 * @brief 运行shell命令
 * @note 运行结果输出长度不超过outputLen且只输出第一行，超过会截断
 * @param cmd [in] shell命令
 * @param output [out] 运行结果输出
 * @param outputLen [in] 运行结果字符串长度
 * @return 无
 */
void ExecShellCmd(const char *cmd, char *output, int outputLen)
{
    if (cmd == NULL) {
        LOGE("cmd is null");
        return;
    }

    int bufferLen = 0;
    FILE *fp = NULL;
    char buffer[BUFSIZ] = { 0 };

    fp = popen(cmd, "r");
    if (!fp) {
        LOGE("popen error: %m");
        return;
    }

    while (fgets(buffer, sizeof(buffer), fp)) {
        bufferLen = strlen(buffer);
        if (buffer[bufferLen - 1] == '\n') {
            buffer[bufferLen - 1] = '\0';
        }
        if (*buffer != '\0') {
            LOGD("%s", buffer);
        }

        if (output) {
            if (outputLen < 1) {
                LOGE("outputLen is invalid");
                break;
            }
            strncpy(output, buffer, bufferLen > outputLen ? outputLen : bufferLen);
            output[outputLen - 1] = '\0';
            break;
        }
    }

    if (fp) {
        pclose(fp);
    }
}

//隐藏输入法工具栏
void hideInputTool()
{
    //隐藏ibus框架输入法工具栏
    ExecShellCmd("ibus engine xkb:us::eng", NULL, 0);
    //隐藏fcitx框架输入法工具栏
    ExecShellCmd("fcitx-remote -c", NULL, 0);
}
```

## 2、上库模板
```
[问题描述] 
[问题单号] 20210329
[问题原因] 
[修改方案] 
[影响模块] 模块
[本地自测] 
[测试建议] 参考自测
```

## 3、头文件备注

### c/c++文件
```
/* main.cpp
 *
 * 客户端程序
 *
 * author: hankin
 * date  : 2021.03.29
 *
 * Copyright (c) 2021 HanKin. All rights reserved.
 */
 
int main(int argc, char *argv[])
```

### shell脚本
```
#!/bin/bash
#
# 拷贝test文件到服务器后台
#
# 用法: ./copy_test_to_apach.sh
# 使用前注意: 
#   1. 需要安装expect, apt install expect
#   2. 放置在/data/local/hj/目录下
#
# author: hejian
# date  : 2021.05.07
#
# Copyright (c) 2020 hejian. All rights reserved.
#
```

### python脚本
```
# -*- coding: utf-8 -*-
"""
@description:
    copy tool for ftp

@author: hankin
@date  : 2021.05.07
	
Copyright (c) 2021 HanKin. All rights reserved.
"""
```

### batch脚本
```
::
:: 学习batch脚本
:: 学习网站：https://baike.baidu.com/item/%E6%89%B9%E5%A4%84%E7%90%86/1448600?fromtitle=Batch&fromid=1079355&fr=aladdin
:: Rem和::都是注释，推荐::，美观简洁；脚本推荐使用ANCI编码，否则可能出现中文乱码
::
:: 作者：hankin
:: 日期：2021.06.04
::
:: Copyright (c) 2020 hejian. All rights reserved.
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
# date  : 2021.05.07
#
# Copyright (c) 2020 hejian. All rights reserved.
#
```

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









