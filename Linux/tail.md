# tail命令

## 1、简介
tail 命令可以将文件指定位置到文件结束的内容写到标准输出。

## 2、提取文件后五行内容转存到另一个文件
tail -n 5 1.txt > 2.txt

## 3、提取文件前五行内容转存到另一个文件
head -n 5 1.txt > 2.txt

## 4、从第5行开始提取到另一个文件
tail -n +5 1.txt > 2.txt
