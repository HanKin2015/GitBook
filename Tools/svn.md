[TOC]

# svn知识汇总

endure：忍耐、持续

北碚区：bei--四声


# 1、定义
教程：https://www.runoob.com/svn/svn-tutorial.html

Apache Subversion 通常被缩写成 SVN，是一个开放源代码的版本控制系统，Subversion 在 2000 年由 CollabNet Inc 开发，现在发展成为 Apache 软件基金会的一个项目，同样是一个丰富的开发者和用户社区的一部分。

SVN相对于的RCS、CVS，采用了分支管理系统，它的设计目标就是取代CVS。互联网上免费的版本控制服务多基于Subversion。



# 配置规范的SVN备注模板
```
【问题单号】(Issue-No.): TD** 【FIX】内存泄漏
【修改原因】(Change-reasons): malloc使用后未释放导致内存泄漏
【修改内容】(Change-content): 释放内存
【影响模块】(Impacted-modules): main.cpp
【自测要点】(Test-points): 执行程序，用 ipcs -m 查看 看看共享内存个数，不变OK。
【测试建议】(Test-suggest): 
1.ipcs -m 查看 看看共享内存个数
2.执行程序
3.再用 ipcs -m 查看 看看共享内存个数
4.期望是共享内存个数不变。

【问题描述】
【修改内容】 
【测试建议】
```
template.svnprops导入到你的代码项目根路径（.svn目录）
TortoiseSVN--》Properties--》import






