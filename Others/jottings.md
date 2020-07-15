# 杂记随笔便条
[TOC]

## 1、脚本
```
@echo off

echo 这是测试内容的第1行
echo 这是测试内容的第2行
echo 这是测试内容的第3行
echo end

:1
title 现在时间是：%time%
goto 1

pause
```

## 2、MBit和Mbit
B表示Byte，是字节的缩写；b是bit，是比特的缩写。而1B=8b。所以MB就是MByte，Mb就是Mbit。
MB，计算机中的一种储存单位，全称MByte。 读作zhidao"兆"。
其实MByte含义是"兆字节"，Mbit的含义是"兆比特"。
MByte是指内字节数量，Mbit是指比特位数。
MByte中的"Byte"虽然与Mbit中的"bit"翻译一样，都是比特，也都是数据量度单位，但二者是完全不同的。Byte是"字节数"，bit是"位数"，在计算机中每八位为一字节，也就是1Byte=8bit，是1:8的对应关系。因此在书写单位时一定要注意B字母的大小写和含义。容

## 3、聊天工具
mattermost
rtx

## 4、由“warning: no newline at end of file”引申而来
https://blog.csdn.net/alexmayer/article/details/7498120

<回车>：C/C++语言里为 \r； ASCII码为0D；符号表示为CR，Carriage Return
 <换行>：C/C++语言里为 \n； ASCII码为0A；符号表示为LF，Line Feed
 
告警“warning: no newline at end of file ”，其实是想提示开发者，注意啦，有可能你这个文件被其他文件#include，会有错误：包含文件的第一行有可能直接拼接在被包含文件的最后一行行尾，如果恰好被包含文件的行尾是“//”会怎么样？！
不过新的C++11标准，忽略了这个问题，强制编译器在文件尾加入newline字符。

## 4、gcc编译软件
MinGW已经不推荐使用。只有32位版，更新速度也不怎么样。MinGW-w64更新最快，基本上gcc更近后几周内就会跟进。32位和64位都提供。TDM-GCC，更新速度也不怎么样，同时提供32位和64位。涉及64位时，TDM-GCC和MinGW-w64还有一个重要的区别，64位的TDM-GCC既能编译64位binary，也能编译32位binary（用-m32参数）。而MinGW-w64无此能力，你需要装32位和64位的两套MinGW w64 tool chain来编译两种binary。





