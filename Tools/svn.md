# svn知识汇总

## 1、定义
教程：https://www.runoob.com/svn/svn-tutorial.html

Apache Subversion 通常被缩写成 SVN，是一个开放源代码的版本控制系统，Subversion 在 2000 年由 CollabNet Inc 开发，现在发展成为 Apache 软件基金会的一个项目，同样是一个丰富的开发者和用户社区的一部分。

SVN相对于的RCS、CVS，采用了分支管理系统，它的设计目标就是取代CVS。互联网上免费的版本控制服务多基于Subversion。

## 2、配置规范的SVN备注模板
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

## 3、Linux下使用svn
svn和svnadmin命令
svnadmin create dir_name
svn log
svn status

## 4、查看当前登录的账户
目录路径：C:\Users\User\AppData\Roaming\Subversion\auth\svn.simple

## 5、Windows系统中上库
先在svn上面创建项目仓库，然后再在Windows系统上面右键SVN Checkout即可创建项目仓库，添加文件，然后右键SVN Commit即可。

## 6、Git、TortoiseGit、SVN、TortoiseSVN 的关系和区别

### 6-1、Git（分布式版本控制系统）
Git是一款免费、开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目

Git是一个开源的分布式版本控制系统，用以有效、高速的处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

分布式相比于集中式的最大区别在于开发者可以提交到本地，每个开发者通过克隆（git clone），在本地机器上拷贝一个完整的Git仓库。

### 6-2、SVN（集中式版本控制系统）
SVN是Subversion的简称，是一个开放源代码的版本控制系统,支持大多数常见的操作系统。

作为一个开源的版本控制系统,Subversion管理着随时间改变的数据。
这些数据放置在一个中央资料档案库(repository)中。这个档案库很像一个普通的文件服务器,不过它会记住每一次文件的变动。这样你就可以把档案恢复到旧的版本,或是浏览文件的变动历史。

Subversion是一个通用的系统,可用来管理任何类型的文件,其中包括了程序源码。

集中式代码管理的核心是服务器，所有开发者在开始新一天的工作之前必须从服务器获取代码，然后开发，最后解决冲突，提交。所有的版本信息都放在服务器上。如果脱离了服务器，开发者基本上可以说是无法工作的。

### 6-3、TortoiseGit
Git 作为一个复杂的版本控制系统，命令很多，即使经常使用，有些命令也记不住。一个图形化的软件 —— TortoiseGit 来操作 git。
官网：https://tortoisegit.org/



