[TOC]

# 使用sphinx、github、readthedocs搭建书环境

GitHub Wiki，适合做知识整理，但排版一般，不方便本地查看。（第一次晓得这个功能的用途）
GitBook，丑，慢。（？？？）

用 Sphinx 生成文档，GitHub 托管文档，再导入到 ReadtheDocs。

## 安装环境
pip install sphinx

Anaconda可能自带sphinx

## 创建工程
sphinx-quickstart

然后进行相应的配置：
输入y
项目名称
作者
版本号
语言

最后生成：
build 目录 运行make命令后，生成的文件都在这个目录里面
source 目录 放置文档的源文件
make.bat 批处理命令
makefile

最后使用命令：make html

## 切换主题（配置文件）
修改文件conf.py

html_theme = 'sphinx_rtd_theme'

也可以看见刚刚设置的相关配置，可以直接修改（后悔）。


zh_CN

奇了怪了，一开始使用make html，第二次就不行了，需要安装主题包pip install sphinx_rtd_theme，但是安装失败了。

