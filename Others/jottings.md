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


管住嘴，迈开腿

念过往而不恋过往, 望未来而不惘未来。



别人奶茶你水饱，别人吃肉你吃草。
别人打嗝你肚叫，别人瘫着你在跑。


变胖，无非两件事：管不住嘴，迈不开腿。







在职场生活中，无论是小白还是“老油条”，犯错在所难免。马云曾说，“研究失败比读MBA管用。”犯错后怎么做，怎么弥补，怎么避免重复犯错……这才是值得我们探讨的地方。

1、黑匣子思维

我们都知道，在所有交通工具中，飞机的事故率最低。因为它一旦失事，无法弥补，所以航空业的容错率很低。为了降低犯错概率，航空业使用了黑匣子，用它来记录飞行数据等内容。

那么对一个人来说“黑匣子思维”和普通思维有什么不同呢？

马修·萨伊德说道，一般人认为错误是不好的，出于本能会为错误找各种借口。但黑匣子思维，会把错误看成进步的契机。黑匣子思想者们不害怕失败，反而他们会把这次失败作为样本深入研究，并成为获取成功的一步。

我们平时怎么使用这一思维呢？

第一，还原场景，相当于“复盘”。回忆下当时发生错误的场景，并搜集与此相关的资料。比如会议记录、相关工作人员等。

第二，加入中立者排查原因。犯错后的人十分容易受到自尊心影响，引入中立的一方来排查具体原因，分析错误发生的情况，是理智的做法。

第三，及时察觉小错误。萨伊德认为，小错误是早期的警告，对避免未来灾难性的失败有着至关重要的作用。



2、避免“郭芙式逻辑”

《笑熬职场》一书中提到一种现象——郭芙式逻辑。

看《神雕侠侣》的时候很多人不喜欢任性的郭芙，她砍断了杨过的胳膊，用毒针伤了小龙女，她伤了别人，但她的逻辑是“我已经够委屈了，我已经道歉了，你还想要我怎样？”

职场上，我们也经常碰到这种人。项目没完成，是其他环节的同事拖了进度；没中标是因为对手太强；掉了客户，是客户太难伺候……

这样的“甩锅侠”遇到问题，怪天怪地就是不怪自己。实际上，我们应该学会正视自己的错误，接纳自己的不完美。

有次，我们公司同事没能中标，因为他在写标书文件时犯了一个低级错误。除了复盘，他及时在公司内部做了分享，让大家都能引以为戒。能做到这一点，我还是很佩服他的。

对于管理者来说，在公司设立更透明公开的机制，遇到重大错误及时和内部成员共享，是可贵的举措。

3、未雨绸缪是上策

比事后如何补救更突显能力的是预判危机，并做好错误预演。

和奚梦瑶驰骋同一个秀场的何穗，曾经在采访中说过自己练习走秀的方法。

“因为你穿着高跟鞋走路，需要抓地力保证全身的平衡”，她会准备毛巾等辅助工具，尝试用双脚的脚趾去夹。

“一般人不会去练那些东西，又无聊又累”，但对她来说，这是能在危机发生时候，凭借肌肉的记忆能力做出专业应对的必修课。

桥水基金创始人Dalio曾说，“每个人都会犯错，也都有缺点，区分人的最重要标准之一就是看他们如何对待错误或缺点。”

不犯错误，是一个伪命题。而越聪明的人，越不怕在工作中犯错。














