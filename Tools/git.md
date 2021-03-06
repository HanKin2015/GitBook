[TOC]

# git入门知识汇总

# 0、前言
## 配置一个完整的环境简单步骤
```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
ssh-keygen -t rsa -C "邮件地址"
拷贝生成的公钥到git的ssh钥匙中：/root/.ssh/id_rsa.pub
```

## 0-1、安装git

使用镜像网站不错。
[下载Windows下的Git命令行客户端](https://repo.huaweicloud.com/git-for-windows/)
[下载Windows下的Git小海龟客户端](https://repo.huaweicloud.com/tortoisegit/)

1、 先安装Git.exe
2、 再安装TortoiseGit.msi
3、 根据自己喜欢安装中文翻译补丁包LanguagePack



git update-git-for-windows   更新git客户端

## 0-2、解决TortoiseGit文件夹和文件状态图标不显示问题

- 先重启试试
- 修改注册表
- 设置里面设置显示icon overlays

# 1、使用git下载单个指定的文件夹

更多搜索“稀疏检出”。

git log -p filename   注意-p参数必须在log后面

```
稀疏检出恢复：

SC_FILE=.git/info/sparse-checkout
echo "Undoing sparse checkout"

# Get the full tree back

echo "*" > $SC_FILE
git config core.sparsecheckout true
git read-tree --reset -u HEAD

# Wipe out all traces of sparse checkout support

rm -rf $SC_FILE
git config core.sparsecheckout false
```





参考：https://www.cnblogs.com/zhoudaxiaa/p/8670481.html

方法一：http://zhoudaxiaa.gitee.io/downgit/#/home

方法二：

在Git1.7.0以前，这无法实现，但是幸运的是在Git1.7.0以后加入了Sparse Checkout模式，这使得Check Out指定文件或者文件夹成为可能。

**举个例子：**

> 现在有一个**test**仓库https://github.com/mygithub/test
> 你要gitclone里面的**tt**子目录：
> 在本地的硬盘位置打开**Git Bash**

```
git init test && cd test     //新建仓库并进入文件夹
git config core.sparsecheckout true //设置允许克隆子目录

echo 'tt*' >> .git/info/sparse-checkout //设置要克隆的仓库的子目录路径   //空格别漏

git remote add origin git@github.com:mygithub/test.git  //这里换成你要克隆的项目和库

git pull origin master    //下载
```

 https://blog.csdn.net/qq_35860352/article/details/80313078 不行

## 下载指定分支

git clone -b branch git@github.com:github/test.git 



**重点看这里**：

# 2、git add命令参数说明

git add -u：将文件的修改、文件的删除，添加到暂存区。
git add .：将文件的修改，文件的新建，添加到暂存区。
git add -A：将文件的修改，文件的删除，文件的新建，添加到暂存区。

-u就是update的意思，只会标记本地有改动（包括删除和修改）的已经追踪的文件

\1.  git add -A   保存所有的修改

\2.  git add .     保存新的添加和修改，但是不包括删除

\3.  git add -u   保存修改和删除，但是不包括新建文件。



# 3、git push 的 -u 参数具体适合含义？

一般只有同时存在多个远程仓库时才会用到--set-upstream。每个git branch可以有个对应的upstream。假设你有两个upstream，分别叫server1和server2，本地master branch的upstream是server1上的master，那么当你不带参数直接输入git pull或者git push时，默认是对server1进行pull/push。如果你成功运行"git push -u server2 master"，那么除了本地branch会被push到server2之外，还会把server2设置成upstream。



```
-u, --set-upstream
For every branch that is up to date or successfully pushed, add upstream (tracking) reference, used by argument-less git-pull(1) and other commands.
```

upstream不是针对远程仓库的，而是针对branch的，这一点应了那位童鞋所说的第二句话。但是upstream和有几个远程库没有必然联系。比如远程库A上有3个分支branch1、branch2、branch3。远程库B上有3个分支branchx、branchy、branchz。本地仓库有2个分支local1和local2。那么当初始状态时，local1和local2和任何一个分支都没有关联，也就是没有upstream。当通过git branch --set-upstream-to A/branch1 local1命令执行后，会给local1和branch1两个分支建立关联，也就是说local1的upstream指向的是branch1。这样的好处就是在local1分支上执行git push（git pull同理）操作时不用附加其它参数，Git就会自动将local1分支上的内容push到branch1上去。同样，local2分支也可以和远程库A和远程库B上的任何一个分支建立关联，只要给local2分支设置了upstream，就可以在local2分支上用git push（git pull同理）方便地与目标分支推拉数据。

综上所述，upstream与有几个远程库没有关系，它是分支与分支之间的流通道。

再来说说git push -u和git branch --set-upstream-to指令之间的区别。

举个例子：我要把本地分支mybranch1与远程仓库origin里的分支mybranch1建立关联。

（如果使用下列途径1的话，首先，你要切换到mybranch1分支上（git checkout mybranch1））

两个途径：1. git push -u origin mybranch1  2. git branch --set-upstream-to=origin/mybranch1 mybranch1

这两种方式都可以达到目的。但是1方法更通用，因为你的远程库有可能并没有mybranch1分支，这种情况下你用2方法就不可行，连目标分支都不存在，怎么进行关联呢？所以可以总结一下：git push -u origin mybranch1 相当于 git push origin mybranch1 + git branch --set-upstream-to=origin/mybranch1 mybranch1



# 4、分支管理

```
git branch 查看本地分支
git branch -r 查看远程分支
git branch -a 查看所有分支
git checkout [Bname] 切换分支
git push origin [Bname] 将空分支上传可以看作删除远程分支
git push origin --delete [Bname] 删除远程分支
git ls-remote origin [Bname] 查看远程仓库是否有这个分支，有就有返回值，没有就什么都没有
git remote [-v] 查看远程仓库地址
git branch -m oldBranchName newBranchName 重命名
```

## 4-1、删除分支

```
git branch -d [本地分支名]
git branch -D [本地分支名]
git branch -r -D [远程分支名]
```

## 4-2、合并分支

1. git pull (git checkout -b newBname Bname)



一、开发分支（dev）上的代码达到上线的标准后，要合并到 master 分支

```
git checkout dev
git pull
git checkout master
git merge dev
git push -u origin master
```

二、当master代码改动了，需要更新开发分支（dev）上的代码

```
git checkout master 
git pull 
git checkout dev
git merge master 
git push -u origin dev
```

## 4-3、远程分支覆盖本地分支

有时候同一个分支，远程的和本地的都被修改的面目全非了，如果想要把本地的替换成远程的，用下面的命令

git fetch --all
git reset --hard origin/master (这里master要修改为对应的分支名)
git pull

# 5、git冲突

当上传的时候产生冲突时：

## 5-1、在线git解决

方便快捷操作简单。

## 5-2、检出，在本地审查和合并

- git pull origin 分支（生产冲突文件）
- 在冲突文件里修改：删除和保留（git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容（数量为7））
- git add 冲突文件
- git commit
- git push


Step 1. 获取并检出此合并请求的分支

git fetch origin
git checkout -b [bName] origin/冲突分支

Step 2. 本地审查变更（忽略）

Step 3. 合并分支并修复出现的任何冲突

git checkout master
git merge --no-ff [bName]（本地就有冲突文件了，注意看产生冲突的文件）

Step 4. 推送合并的结果到 GitLab

git checkout -b [newBName]

git push origin [newBName]

# 6、git commit

### 修改commit内容
当我们想要对上一次的提交进行修改时，我们可以使用git commit –amend命令。git commit –amend既可以对上次提交的内容进行修改，也可以修改提交说明。

如果有新的文件修改，需要合并到最近一次提交的commit里面，也可以使用上面命令直接修改即可。


> git commit --amend -no-edit

git status
git log
git show

### 6-1、删除commit

> git reset HEAD^    删除最新commit记录

### 6-2、误删除commit

- git reflog
- git reset commitId

# 7、多个commit合并(git rebase)  

实战中终于理解这条命令的作用。当我们在合并请求时又双叒叕发现一个小错误，又不得不commit一次，真想删除分支全部重新提交。但是commit是可以合并的。
[git 几个commit点合并成一个commit点](https://blog.csdn.net/u013276277/article/details/82470177)

- 1、git status当前所有修改是否都commit。如果没有后面rebase无法继续。
- 2、git log查看commitId
- 3、git rebase -i commitId（commitId是合并后的commitId的前一个）**即不影响的log**
- 4、**将删除的commit记录前面的pick改为squash，保存退出**
- 5、修改commit内容
- 6、git log查看合并结果 
- 7、git push origin [Bname] -f 可能提交会产生冲突，建议强制

  (use "git rebase --edit-todo" to view and edit)
You are currently editing a commit while rebasing branch 'hejian' on 'ddd330e'.
  (use "git commit --amend" to amend the current commit)
  (use "git rebase --continue" once you are satisfied with your changes)

# 8、如何切换分支并且改变其修改的不同的内容

就是本地像远程分支管理一样，不同分支不同的内容。但是实践看到都是一样的，后来发现姿势不对。

### 实验

```
mkdir Github   本地Github文件夹
cd Github
git init
vi helloworld.txt
	wuli github
git branch father    
git add .
git commit -m"add txt"
git checkout -b son   注意:这种创建分支的方式是将当前的分支复制到了新分支，因此尽量在修改代码前创建分支

vi helloworld.txt
	wuli github
	yes,you are right
git add .
git commit -m"update"
git log
	add txt
	update
git checkout father
git log
	add txt			这时候发现commit日志会出现不同。并且helloworld文件的内容也会随切换不同分支而改变
```

注意：当两个分支前面的commit日志一模一样的时候，是可以随意切换checkout的，但是不同的时候是需要先commit才能切换，stash也能解决这个问题。

总结：远程和本地一样，这就为啥有个叫本地仓库的概念了，本地修改了内容尽量commit到本地，只有commit了才会切换分支看到效果。

# 9、stash的作用

[stash —— 一个极度实用的Git操作](https://www.jianshu.com/p/fcf69e2d3e6b)
git stash   藏好代码
git stash list  

- git stash pop  [stash@{0}] （删除stash记录）
- git stash apply （不删除stash记录）

好习惯：master作为备份更新，第一步是创建新分支。当有新问题的时候，stash后去master分支创建新分支。

上面的commit一定是最新的。



超级好用：

git stash

git stash pop

git stash list

git stash -h



# 10、Git 全局设置（必须）

```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
```

- git config --list     查看配置信息
- git config -l
- git config --local -l
- git config --global -l

# 11、回退命令（放弃所有本地修改）

```
git reflog
git reset --hard 7edb984	放弃修改
git reset --soft 7edb984 	回到commit之前
git checkout -- filename	撤销文件的修改
HEAD
HEAD~3
commit_id

强推到远程
git push origin HEAD --force

```

可引用git checkout或者用git clean -df至修改前的状态。就可以放弃所有修改。

1、git checkout功能是本地所有修改的。没有的提交的，都返回到原来的状态

2、git stash功能是把所有没有提交的修改暂存到stash里面。可用git stash [pop](https://www.baidu.com/s?wd=pop&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)回复。

3、git reset --hard HASH功能是返回到某个节点，不保留修改。

4、git reset --soft HASH功能是返回到某个节点。保留修改。

5、git clean -df功能是保留修改，返回到某个节点。

**拓展资料**：

1、Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

[![img](https://img3.mukewang.com/5c773adf000145dc06000425.jpg)](https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7acb0a46f21fbe094c3be72c66600c338744ada4.jpg)

2、Torvalds 开始着手开发 Git 是为了作为一种过渡方案来替代 BitKeeper，后者之前一直是 Linux 内核开发人员在全球使用的主要源代码工具。开放源码社区中的有些人觉得BitKeeper 的许可证并不适合开放源码社区的工作，因此 Torvalds 决定着手研究许可证更为灵活的版本控制系统。尽管最初 Git 的开发是为了辅助 Linux 内核开发的过程，但是我们已经发现在很多其他自由软件项目中也使用了 Git。例如 很多 Freedesktop 的项目迁移到了 Git 上。



# # 12、Updates were rejected because the tip of your current branch is behind

1.使用强制push的方法：

$ git push -u origin master -f 

这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

2.push前先将远程repository修改pull下来

$ git pull origin master

$ git push -u origin master   （后续就是解决冲突）



# 13、git clean 的用法（如何使用Git删除新增的文件？）

git clean命令用来从你的工作目录中删除所有没有track过的文件
git clean经常和git reset --hard一起使用. 记住reset只影响被track过的文件, 所以需要clean来删除没有track过的文件. 结合使用这两个命令能让你的工作目录完全回到一个指定的的状态

```
git clean -n
```

是一次clean的演习, 告诉你哪些文件会被删除. 记住它不会真正地删除文件, 只是一个提醒。

```
git clean -f
```

删除当前目录下所有没有track过的文件. 它不会删除 .gitignore 文件里指定的文件夹和文件, 不管这些文件有没有被track过

```
git clean -f <path>
```

删除指定路径下的没有被track过的文件

```
git clean -df
```

删除当前目录下没有被track过的文件和文件夹

```
git clean -xf
```

删除当前目录下所有没有track过的文件. 不管它是否是 .gitignore 文件里面指定的文件夹和文件

`git reset --hard` 和 `git clean -f` 是一对好基友. 结合使用它们能让你的工作目录完全回退到最近一次commit的时候

`git clean` 对于刚编译过的项目也非常有用. 如, 它能轻易删除掉编译后生成的 .o 和 .exe 等文件. 这个在打包要发布一个release的时候非常有用

下面的例子要删除所有工作目录下面的修改, 包括新添加的文件. 假设你已经提交了一些快照了, 而且做了一些新的开发

```
git reset --hard

git clean -df
```

运行后, 工作目录和缓存区回到最近一次commit时候一摸一样的状态，git status会告诉你这是一个干净的工作目录, 又是一个新的开始了！

## 其他

--force
--hard
--soft
-d  等价于  --delete
-u  表示：
加了参数-u后，以后即可直接用git push 代替git push origin master
在git add -u中表示添加此次修改的全部原先存在的文件（即新建的不会添加 --update）。

```
1) 远程仓库相关命令
检出仓库：$ git clone git://github.com/jquery/jquery.git
查看远程仓库：$ git remote -v
添加远程仓库：$ git remote add [name] [url]
删除远程仓库：$ git remote rm [name]
修改远程仓库：$ git remote set-url --push[name][newUrl]
拉取远程仓库：$ git pull [remoteName] [localBranchName]
推送远程仓库：$ git push [remoteName] [localBranchName]
 
2）分支(branch)操作相关命令
查看本地分支：$ git branch
查看远程分支：$ git branch -r
创建本地分支：$ git branch [name] ----注意新分支创建后不会自动切换为当前分支
切换分支：$ git checkout [name]
创建新分支并立即切换到新分支：$ git checkout -b [name]
删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：$ git merge [name] ----将名称为[name]的分支与当前分支合并
创建远程分支(本地分支push到远程)：$ git push origin [name]
删除远程分支：$ git push origin :heads/[name]
```



## mintty.exe.stackdump文件

关于Git bash在win10重装系统情况下闪退并生成mintty.exe.stackdump文件的问题

总结：我也是在git commit时闪退产生了这个文件。试了几次同样的commit内容一直闪退，原因可能是中文时输入英文字母按回车键后闪退，然后在输入英文时shift切换没有闪退情况。我的问题不大，不能解决闪退网上有很多解决方法。





# 哭笑不得：git branch -a看不见一个分支

如果是下载项目就不要使用`git init test && cd test`初始化。

使用`git clone git@git.com master`下载项目后，会在当前目录下新建文件夹master并将项目下载这个目录下。

由于先前init初始化后，导致没有进入项目的文件夹中，使用git branch -a看不见任何分支。













更新服务端的分支到本地仓库
git fetch --all
列出所有的分支
git branch --all
切换到一个已有的分支
git checkout <您的分支名>
基于当前分支新建一个分支
git checkout -b <您的新分支名>
推送当前分支到服务端
git push origin <您的分支名>
删除本地的一个分支（当前所在分支和要删除的分支不能相同）
git branch -D <您的分支名>
删除服务端的一个分支
git push origin :<您的分支名>





应该右上角会有ssh和https转换，然而并没有。但是两者使用是一样的。
git clone -b gitbhttps://github.com/HanKin2015/GitBook.git

2. 远程分支重命名 (已经推送远程-假设本地分支和远程对应分支名称相同)
   a. 重命名远程分支对应的本地分支

git branch -m oldName newName
b. 删除远程分支

git push --delete origin oldName
c. 上传新命名的本地分支

git push origin newName
d.把修改后的本地分支与远程分支关联

git branch --set-upstream-to origin/newName



http://issuecdn.baidupcs.com/issue/netdisk/yunguanjia/BaiduNetdisk_6.8.1.3.exe


## Git 恢复本地误删的文件
起因：git clone下来的项目不久后就自动出现修改的红色感叹号标志，实际什么都没有做。后来猜测应该是杀毒软件之类的给我自动删除了，后来还真是。使用恢复方法恢复后，一会儿又给我删除了，要么关闭杀毒软件或者添加信任。

使用git pull --force强制拉取

正确的打开方式：
```
git reset HEAD 文件或文件夹
git checkout 文件或文件夹
```


## 14、进阶
### .gitignore
一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。来看一个实际的例子：
$ cat .gitignore
*.[oa]
*~
第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本。第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。

### 打patch
生成patch：
git format-patch commitID -1 生成当前commitID 的patch
git format-patch commitID -3 从当前commitID开始往下生成总共三个commit的patch文件
应用patch：
git apply --check xxx.patch 检查当前patch是否可以成功打入
git apply xxx.patch
git apply *.patch 同时打入所有patch

### 自定义别名（更高级的git log）
```
alias lg="git log --graph --pretty=format:’'Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit "
```

### git子模块使用
一个大型工程总会被分拆为一些子工程,git-submodule 就是完成这样一种子工程拆分与整合的工具.

添加一个子工程
git submodule add git@xxxx:subproj.git subproj
git commit -m “submodule added”

克隆一个带submodule的git仓库
git clone git@domain.com:massproj.git
git submodule init
git submodule update
或者
git clone --rescursive git@domain.com:massproj.git


查看修改的文件
git log --stat

查看commitID的具体修改
git log -p

查看文件最后的修改人
git blame -L 起始行号,结束行号



# git学习笔记

# 1、下载安装git
>sudo apt install git

明白为啥使用sudo而不是直接root账户，防止错误操作，sudo进一步确认了一下。

Windows下载安装很随意。有个注意点：尽量选择下载和上传git仓库的时候不要进行Linux和Windows的换行符的转换，否则在不同环境下运行代码的时候很尴尬。

# 2、配置
## 配置家门，即上传者的身份
设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。以前并没有觉得多大作用，慢慢地发现一个git仓库是可以多人上传的，而这个配置就是显示上传者的身份，一般会填写个人的GitHub相关的信息，比如GitHub用户名和注册邮箱。乱写也是🆗的。

```
$ git config -l  ===  git config --list
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

还有一个local参数，即为单独仓库配置单独的上传者身份。
global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
```

## 修改global配置
简单粗暴：直接使用命令git config --global user.name "Your Name"。。。。
修改配置.gitconfig文件。

## 配置SSH-Key
提交代码需要的github权限，下载私有仓库代码时也会需要这个配置，主要在于上传代码，不配置就会每次输入账户和密码。

如果你想要使用 SSH url 克隆的话，你必须是这个项目的拥有者。否则你是无法添加 SSH key 的。
使用https url很好用？？？

### https 和 SSH 的区别：
1、前者可以随意克隆github上的项目，而不管是谁的；而后者则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key ，否则无法克隆。

2、https url 在push的时候是需要验证用户名和密码的；而 SSH 在push的时候，是不需要输入用户名的，如果配置SSH key的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。

```
ssh -T git@github.com    查看是否配置好
ssh-keygen -t rsa -C "邮件地址"
```

代码参数含义：

-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。

以上代码省略了 -f 参数，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。
接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码），

当然，你也可以不输入密码，直接按回车。那么push的时候就不需要输入密码（推荐），直接提交到github上了。




[TOC]

# git入门知识汇总

# 0、前言
## 配置一个完整的环境简单步骤
```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
ssh-keygen -t rsa -C "邮件地址"
拷贝生成的公钥到git的ssh钥匙中：/root/.ssh/id_rsa.pub
```

## 0-1、安装git

使用镜像网站不错。
[下载Windows下的Git命令行客户端](https://repo.huaweicloud.com/git-for-windows/)
[下载Windows下的Git小海龟客户端](https://repo.huaweicloud.com/tortoisegit/)

1、 先安装Git.exe
2、 再安装TortoiseGit.msi
3、 根据自己喜欢安装中文翻译补丁包LanguagePack



git update-git-for-windows   更新git客户端

## 0-2、解决TortoiseGit文件夹和文件状态图标不显示问题

- 先重启试试
- 修改注册表
- 设置里面设置显示icon overlays

# 1、使用git下载单个指定的文件夹

更多搜索“稀疏检出”。



```
稀疏检出恢复：

SC_FILE=.git/info/sparse-checkout
echo "Undoing sparse checkout"

# Get the full tree back

echo "*" > $SC_FILE
git config core.sparsecheckout true
git read-tree --reset -u HEAD

# Wipe out all traces of sparse checkout support

rm -rf $SC_FILE
git config core.sparsecheckout false
```





参考：https://www.cnblogs.com/zhoudaxiaa/p/8670481.html

方法一：http://zhoudaxiaa.gitee.io/downgit/#/home

方法二：

在Git1.7.0以前，这无法实现，但是幸运的是在Git1.7.0以后加入了Sparse Checkout模式，这使得Check Out指定文件或者文件夹成为可能。

**举个例子：**

> 现在有一个**test**仓库https://github.com/mygithub/test
> 你要gitclone里面的**tt**子目录：
> 在本地的硬盘位置打开**Git Bash**

```
git init test && cd test     //新建仓库并进入文件夹
git config core.sparsecheckout true //设置允许克隆子目录

echo 'tt*' >> .git/info/sparse-checkout //设置要克隆的仓库的子目录路径   //空格别漏

git remote add origin git@github.com:mygithub/test.git  //这里换成你要克隆的项目和库

git pull origin master    //下载
```

 https://blog.csdn.net/qq_35860352/article/details/80313078 不行

## 下载指定分支

git clone -b branch git@github.com:github/test.git 



**重点看这里**：

# 2、git add命令参数说明

git add -u：将文件的修改、文件的删除，添加到暂存区。
git add .：将文件的修改，文件的新建，添加到暂存区。
git add -A：将文件的修改，文件的删除，文件的新建，添加到暂存区。

-u就是update的意思，只会标记本地有改动（包括删除和修改）的已经追踪的文件

\1.  git add -A   保存所有的修改

\2.  git add .     保存新的添加和修改，但是不包括删除

\3.  git add -u   保存修改和删除，但是不包括新建文件。



# 3、git push 的 -u 参数具体适合含义？

一般只有同时存在多个远程仓库时才会用到--set-upstream。每个git branch可以有个对应的upstream。假设你有两个upstream，分别叫server1和server2，本地master branch的upstream是server1上的master，那么当你不带参数直接输入git pull或者git push时，默认是对server1进行pull/push。如果你成功运行"git push -u server2 master"，那么除了本地branch会被push到server2之外，还会把server2设置成upstream。



```
-u, --set-upstream
For every branch that is up to date or successfully pushed, add upstream (tracking) reference, used by argument-less git-pull(1) and other commands.
```

upstream不是针对远程仓库的，而是针对branch的，这一点应了那位童鞋所说的第二句话。但是upstream和有几个远程库没有必然联系。比如远程库A上有3个分支branch1、branch2、branch3。远程库B上有3个分支branchx、branchy、branchz。本地仓库有2个分支local1和local2。那么当初始状态时，local1和local2和任何一个分支都没有关联，也就是没有upstream。当通过git branch --set-upstream-to A/branch1 local1命令执行后，会给local1和branch1两个分支建立关联，也就是说local1的upstream指向的是branch1。这样的好处就是在local1分支上执行git push（git pull同理）操作时不用附加其它参数，Git就会自动将local1分支上的内容push到branch1上去。同样，local2分支也可以和远程库A和远程库B上的任何一个分支建立关联，只要给local2分支设置了upstream，就可以在local2分支上用git push（git pull同理）方便地与目标分支推拉数据。

综上所述，upstream与有几个远程库没有关系，它是分支与分支之间的流通道。

再来说说git push -u和git branch --set-upstream-to指令之间的区别。

举个例子：我要把本地分支mybranch1与远程仓库origin里的分支mybranch1建立关联。

（如果使用下列途径1的话，首先，你要切换到mybranch1分支上（git checkout mybranch1））

两个途径：1. git push -u origin mybranch1  2. git branch --set-upstream-to=origin/mybranch1 mybranch1

这两种方式都可以达到目的。但是1方法更通用，因为你的远程库有可能并没有mybranch1分支，这种情况下你用2方法就不可行，连目标分支都不存在，怎么进行关联呢？所以可以总结一下：git push -u origin mybranch1 相当于 git push origin mybranch1 + git branch --set-upstream-to=origin/mybranch1 mybranch1



# 4、分支管理

```
git branch 查看本地分支
git branch -r 查看远程分支
git branch -a 查看所有分支
git checkout [Bname] 切换分支
git push origin [Bname] 将空分支上传可以看作删除远程分支
git push origin --delete [Bname] 删除远程分支
git ls-remote origin [Bname] 查看远程仓库是否有这个分支，有就有返回值，没有就什么都没有
git remote [-v] 查看远程仓库地址
git branch -m oldBranchName newBranchName 重命名
```

## 4-1、删除分支

```
git branch -d [本地分支名]
git branch -D [本地分支名]
git branch -r -D [远程分支名]
```

## 4-2、合并分支

1. git pull (git checkout -b newBname Bname)



一、开发分支（dev）上的代码达到上线的标准后，要合并到 master 分支

```
git checkout dev
git pull
git checkout master
git merge dev
git push -u origin master
```

二、当master代码改动了，需要更新开发分支（dev）上的代码

```
git checkout master 
git pull 
git checkout dev
git merge master 
git push -u origin dev
```

## 4-3、远程分支覆盖本地分支

有时候同一个分支，远程的和本地的都被修改的面目全非了，如果想要把本地的替换成远程的，用下面的命令

git fetch --all
git reset --hard origin/master (这里master要修改为对应的分支名)
git pull

# 5、git冲突

当上传的时候产生冲突时：

## 5-1、在线git解决

方便快捷操作简单。

## 5-2、检出，在本地审查和合并

- git pull origin 分支（生产冲突文件）
- 在冲突文件里修改：删除和保留（git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容（数量为7））
- git add 冲突文件
- git commit
- git push


Step 1. 获取并检出此合并请求的分支

git fetch origin
git checkout -b [bName] origin/冲突分支

Step 2. 本地审查变更（忽略）

Step 3. 合并分支并修复出现的任何冲突

git checkout master
git merge --no-ff [bName]（本地就有冲突文件了，注意看产生冲突的文件）

Step 4. 推送合并的结果到 GitLab

git checkout -b [newBName]

git push origin [newBName]

# 6、git commit

### 修改commit内容
当我们想要对上一次的提交进行修改时，我们可以使用git commit –-amend命令。git commit –amend既可以对上次提交的内容进行修改，也可以修改提交说明。

如果有新的文件修改，需要合并到最近一次提交的commit里面，也可以使用上面命令直接修改即可。


> git commit --amend -no-edit

git status
git log
git show

### 6-1、删除commit

> git reset HEAD^    删除最新commit记录

### 6-2、误删除commit

- git reflog
- git reset commitId

# 7、多个commit合并(git rebase)  

实战中终于理解这条命令的作用。当我们在合并请求时又双叒叕发现一个小错误，又不得不commit一次，真想删除分支全部重新提交。但是commit是可以合并的。
[git 几个commit点合并成一个commit点](https://blog.csdn.net/u013276277/article/details/82470177)

- 1、git status当前所有修改是否都commit。如果没有后面rebase无法继续。
- 2、git log查看commitId
- 3、git rebase -i commitId（commitId是合并后的commitId的前一个）**即不影响的log**
- 4、**将删除的commit记录前面的pick改为squash，保存退出**
- 5、修改commit内容
- 6、git log查看合并结果 
- 7、git push origin [Bname] -f 可能提交会产生冲突，建议强制

  (use "git rebase --edit-todo" to view and edit)
You are currently editing a commit while rebasing branch 'hejian' on 'ddd330e'.
  (use "git commit --amend" to amend the current commit)
  (use "git rebase --continue" once you are satisfied with your changes)

# 8、如何切换分支并且改变其修改的不同的内容

就是本地像远程分支管理一样，不同分支不同的内容。但是实践看到都是一样的，后来发现姿势不对。

### 实验

```
mkdir Github   本地Github文件夹
cd Github
git init
vi helloworld.txt
	wuli github
git branch father    
git add .
git commit -m"add txt"
git checkout -b son   注意:这种创建分支的方式是将当前的分支复制到了新分支，因此尽量在修改代码前创建分支

vi helloworld.txt
	wuli github
	yes,you are right
git add .
git commit -m"update"
git log
	add txt
	update
git checkout father
git log
	add txt			这时候发现commit日志会出现不同。并且helloworld文件的内容也会随切换不同分支而改变
```

注意：当两个分支前面的commit日志一模一样的时候，是可以随意切换checkout的，但是不同的时候是需要先commit才能切换，stash也能解决这个问题。

总结：远程和本地一样，这就为啥有个叫本地仓库的概念了，本地修改了内容尽量commit到本地，只有commit了才会切换分支看到效果。

# 9、stash的作用

[stash —— 一个极度实用的Git操作](https://www.jianshu.com/p/fcf69e2d3e6b)
git stash   藏好代码
git stash list  

- git stash pop  [stash@{0}] （删除stash记录）
- git stash apply （不删除stash记录）

好习惯：master作为备份更新，第一步是创建新分支。当有新问题的时候，stash后去master分支创建新分支。

上面的commit一定是最新的。



超级好用：

git stash

git stash pop

git stash list

git stash -h



# 10、Git 全局设置（必须）

```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
```

- git config --list     查看配置信息
- git config -l
- git config --local -l
- git config --global -l

# 11、回退命令（放弃所有本地修改）

```
git reflog
git reset --hard 7edb984	放弃修改
git reset --soft 7edb984 	回到commit之前
git checkout -- filename	撤销文件的修改
HEAD
HEAD~3
commit_id

强推到远程
git push origin HEAD --force

```

可引用git checkout或者用git clean -df至修改前的状态。就可以放弃所有修改。

1、git checkout功能是本地所有修改的。没有的提交的，都返回到原来的状态

2、git stash功能是把所有没有提交的修改暂存到stash里面。可用git stash [pop](https://www.baidu.com/s?wd=pop&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)回复。

3、git reset --hard HASH功能是返回到某个节点，不保留修改。

4、git reset --soft HASH功能是返回到某个节点。保留修改。

5、git clean -df功能是保留修改，返回到某个节点。

**拓展资料**：

1、Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

[![img](https://img3.mukewang.com/5c773adf000145dc06000425.jpg)](https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7acb0a46f21fbe094c3be72c66600c338744ada4.jpg)

2、Torvalds 开始着手开发 Git 是为了作为一种过渡方案来替代 BitKeeper，后者之前一直是 Linux 内核开发人员在全球使用的主要源代码工具。开放源码社区中的有些人觉得BitKeeper 的许可证并不适合开放源码社区的工作，因此 Torvalds 决定着手研究许可证更为灵活的版本控制系统。尽管最初 Git 的开发是为了辅助 Linux 内核开发的过程，但是我们已经发现在很多其他自由软件项目中也使用了 Git。例如 很多 Freedesktop 的项目迁移到了 Git 上。



# # 12、Updates were rejected because the tip of your current branch is behind

1.使用强制push的方法：

$ git push -u origin master -f 

这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

2.push前先将远程repository修改pull下来

$ git pull origin master

$ git push -u origin master   （后续就是解决冲突）



# 13、git clean 的用法（如何使用Git删除新增的文件？）

git clean命令用来从你的工作目录中删除所有没有track过的文件
git clean经常和git reset --hard一起使用. 记住reset只影响被track过的文件, 所以需要clean来删除没有track过的文件. 结合使用这两个命令能让你的工作目录完全回到一个指定的的状态

```
git clean -n
```

是一次clean的演习, 告诉你哪些文件会被删除. 记住它不会真正地删除文件, 只是一个提醒。

```
git clean -f
```

删除当前目录下所有没有track过的文件. 它不会删除 .gitignore 文件里指定的文件夹和文件, 不管这些文件有没有被track过

```
git clean -f <path>
```

删除指定路径下的没有被track过的文件

```
git clean -df
```

删除当前目录下没有被track过的文件和文件夹

```
git clean -xf
```

删除当前目录下所有没有track过的文件. 不管它是否是 .gitignore 文件里面指定的文件夹和文件

`git reset --hard` 和 `git clean -f` 是一对好基友. 结合使用它们能让你的工作目录完全回退到最近一次commit的时候

`git clean` 对于刚编译过的项目也非常有用. 如, 它能轻易删除掉编译后生成的 .o 和 .exe 等文件. 这个在打包要发布一个release的时候非常有用

下面的例子要删除所有工作目录下面的修改, 包括新添加的文件. 假设你已经提交了一些快照了, 而且做了一些新的开发

```
git reset --hard

git clean -df
```

运行后, 工作目录和缓存区回到最近一次commit时候一摸一样的状态，git status会告诉你这是一个干净的工作目录, 又是一个新的开始了！

## 其他

--force
--hard
--soft
-d  等价于  --delete
-u  表示：
加了参数-u后，以后即可直接用git push 代替git push origin master
在git add -u中表示添加此次修改的全部原先存在的文件（即新建的不会添加 --update）。

```
1) 远程仓库相关命令
检出仓库：$ git clone git://github.com/jquery/jquery.git
查看远程仓库：$ git remote -v
添加远程仓库：$ git remote add [name] [url]
删除远程仓库：$ git remote rm [name]
修改远程仓库：$ git remote set-url --push[name][newUrl]
拉取远程仓库：$ git pull [remoteName] [localBranchName]
推送远程仓库：$ git push [remoteName] [localBranchName]
 
2）分支(branch)操作相关命令
查看本地分支：$ git branch
查看远程分支：$ git branch -r
创建本地分支：$ git branch [name] ----注意新分支创建后不会自动切换为当前分支
切换分支：$ git checkout [name]
创建新分支并立即切换到新分支：$ git checkout -b [name]
删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：$ git merge [name] ----将名称为[name]的分支与当前分支合并
创建远程分支(本地分支push到远程)：$ git push origin [name]
删除远程分支：$ git push origin :heads/[name]
```



## mintty.exe.stackdump文件

关于Git bash在win10重装系统情况下闪退并生成mintty.exe.stackdump文件的问题

总结：我也是在git commit时闪退产生了这个文件。试了几次同样的commit内容一直闪退，原因可能是中文时输入英文字母按回车键后闪退，然后在输入英文时shift切换没有闪退情况。我的问题不大，不能解决闪退网上有很多解决方法。





# 哭笑不得：git branch -a看不见一个分支

如果是下载项目就不要使用`git init test && cd test`初始化。

使用`git clone git@git.com master`下载项目后，会在当前目录下新建文件夹master并将项目下载这个目录下。

由于先前init初始化后，导致没有进入项目的文件夹中，使用git branch -a看不见任何分支。













更新服务端的分支到本地仓库
git fetch --all
列出所有的分支
git branch --all
切换到一个已有的分支
git checkout <您的分支名>
基于当前分支新建一个分支
git checkout -b <您的新分支名>
推送当前分支到服务端
git push origin <您的分支名>
删除本地的一个分支（当前所在分支和要删除的分支不能相同）
git branch -D <您的分支名>
删除服务端的一个分支
git push origin :<您的分支名>





应该右上角会有ssh和https转换，然而并没有。但是两者使用是一样的。
git clone -b gitbhttps://github.com/HanKin2015/GitBook.git

2. 远程分支重命名 (已经推送远程-假设本地分支和远程对应分支名称相同)
   a. 重命名远程分支对应的本地分支

git branch -m oldName newName
b. 删除远程分支

git push --delete origin oldName
c. 上传新命名的本地分支

git push origin newName
d.把修改后的本地分支与远程分支关联

git branch --set-upstream-to origin/newName



http://issuecdn.baidupcs.com/issue/netdisk/yunguanjia/BaiduNetdisk_6.8.1.3.exe


## Git 恢复本地误删的文件
起因：git clone下来的项目不久后就自动出现修改的红色感叹号标志，实际什么都没有做。后来猜测应该是杀毒软件之类的给我自动删除了，后来还真是。使用恢复方法恢复后，一会儿又给我删除了，要么关闭杀毒软件或者添加信任。

使用git pull --force强制拉取

正确的打开方式：
```
git reset HEAD 文件或文件夹
git checkout 文件或文件夹
```


## 14、进阶
### .gitignore
一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。来看一个实际的例子：
$ cat .gitignore
*.[oa]
*~
第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本。第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。

### 打patch
生成patch：
git format-patch commitID -1 生成当前commitID 的patch
git format-patch commitID -3 从当前commitID开始往下生成总共三个commit的patch文件
应用patch：
git apply --check xxx.patch 检查当前patch是否可以成功打入
git apply xxx.patch
git apply *.patch 同时打入所有patch

### 自定义别名（更高级的git log）
```
alias lg="git log --graph --pretty=format:’'Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit "
```

### git子模块使用
一个大型工程总会被分拆为一些子工程,git-submodule 就是完成这样一种子工程拆分与整合的工具.

添加一个子工程
git submodule add git@xxxx:subproj.git subproj
git commit -m “submodule added”

克隆一个带submodule的git仓库
git clone git@domain.com:massproj.git
git submodule init
git submodule update
或者
git clone --rescursive git@domain.com:massproj.git


查看修改的文件
git log --stat

查看commitID的具体修改
git log -p

查看文件最后的修改人
git blame -L 起始行号,结束行号



# git学习笔记

# 1、下载安装git
>sudo apt install git

明白为啥使用sudo而不是直接root账户，防止错误操作，sudo进一步确认了一下。

Windows下载安装很随意。有个注意点：尽量选择下载和上传git仓库的时候不要进行Linux和Windows的换行符的转换，否则在不同环境下运行代码的时候很尴尬。

# 2、配置
## 配置家门，即上传者的身份
设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。以前并没有觉得多大作用，慢慢地发现一个git仓库是可以多人上传的，而这个配置就是显示上传者的身份，一般会填写个人的GitHub相关的信息，比如GitHub用户名和注册邮箱。乱写也是🆗的。

```
$ git config -l  ===  git config --list
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

还有一个local参数，即为单独仓库配置单独的上传者身份。
global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
```

## 修改global配置
简单粗暴：直接使用命令git config --global user.name "Your Name"。。。。
修改配置.gitconfig文件。

## 配置SSH-Key
提交代码需要的github权限，下载私有仓库代码时也会需要这个配置，主要在于上传代码，不配置就会每次输入账户和密码。

如果你想要使用 SSH url 克隆的话，你必须是这个项目的拥有者。否则你是无法添加 SSH key 的。
使用https url很好用？？？

### https 和 SSH 的区别：
1、前者可以随意克隆github上的项目，而不管是谁的；而后者则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key ，否则无法克隆。

2、https url 在push的时候是需要验证用户名和密码的；而 SSH 在push的时候，是不需要输入用户名的，如果配置SSH key的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。

```
ssh -T git@github.com    查看是否配置好
ssh-keygen -t rsa -C "邮件地址"
```

代码参数含义：

-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。

以上代码省略了 -f 参数，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。
接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码），

当然，你也可以不输入密码，直接按回车。那么push的时候就不需要输入密码（推荐），直接提交到github上了。




[TOC]

# git入门知识汇总

# 0、前言
## 配置一个完整的环境简单步骤
```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
ssh-keygen -t rsa -C "邮件地址"
拷贝生成的公钥到git的ssh钥匙中：/root/.ssh/id_rsa.pub
```

## 0-1、安装git

使用镜像网站不错。
[下载Windows下的Git命令行客户端](https://repo.huaweicloud.com/git-for-windows/)
[下载Windows下的Git小海龟客户端](https://repo.huaweicloud.com/tortoisegit/)

1、 先安装Git.exe
2、 再安装TortoiseGit.msi
3、 根据自己喜欢安装中文翻译补丁包LanguagePack



git update-git-for-windows   更新git客户端

## 0-2、解决TortoiseGit文件夹和文件状态图标不显示问题

- 先重启试试
- 修改注册表
- 设置里面设置显示icon overlays

# 1、使用git下载单个指定的文件夹

更多搜索“稀疏检出”。



```
稀疏检出恢复：

SC_FILE=.git/info/sparse-checkout
echo "Undoing sparse checkout"

# Get the full tree back

echo "*" > $SC_FILE
git config core.sparsecheckout true
git read-tree --reset -u HEAD

# Wipe out all traces of sparse checkout support

rm -rf $SC_FILE
git config core.sparsecheckout false
```





参考：https://www.cnblogs.com/zhoudaxiaa/p/8670481.html

方法一：http://zhoudaxiaa.gitee.io/downgit/#/home

方法二：

在Git1.7.0以前，这无法实现，但是幸运的是在Git1.7.0以后加入了Sparse Checkout模式，这使得Check Out指定文件或者文件夹成为可能。

**举个例子：**

> 现在有一个**test**仓库https://github.com/mygithub/test
> 你要gitclone里面的**tt**子目录：
> 在本地的硬盘位置打开**Git Bash**

```
git init test && cd test     //新建仓库并进入文件夹
git config core.sparsecheckout true //设置允许克隆子目录

echo 'tt*' >> .git/info/sparse-checkout //设置要克隆的仓库的子目录路径   //空格别漏

git remote add origin git@github.com:mygithub/test.git  //这里换成你要克隆的项目和库

git pull origin master    //下载
```

 https://blog.csdn.net/qq_35860352/article/details/80313078 不行

## 下载指定分支

git clone -b branch git@github.com:github/test.git 



**重点看这里**：

# 2、git add命令参数说明

git add -u：将文件的修改、文件的删除，添加到暂存区。
git add .：将文件的修改，文件的新建，添加到暂存区。
git add -A：将文件的修改，文件的删除，文件的新建，添加到暂存区。

-u就是update的意思，只会标记本地有改动（包括删除和修改）的已经追踪的文件

\1.  git add -A   保存所有的修改

\2.  git add .     保存新的添加和修改，但是不包括删除

\3.  git add -u   保存修改和删除，但是不包括新建文件。



# 3、git push 的 -u 参数具体适合含义？

一般只有同时存在多个远程仓库时才会用到--set-upstream。每个git branch可以有个对应的upstream。假设你有两个upstream，分别叫server1和server2，本地master branch的upstream是server1上的master，那么当你不带参数直接输入git pull或者git push时，默认是对server1进行pull/push。如果你成功运行"git push -u server2 master"，那么除了本地branch会被push到server2之外，还会把server2设置成upstream。



```
-u, --set-upstream
For every branch that is up to date or successfully pushed, add upstream (tracking) reference, used by argument-less git-pull(1) and other commands.
```

upstream不是针对远程仓库的，而是针对branch的，这一点应了那位童鞋所说的第二句话。但是upstream和有几个远程库没有必然联系。比如远程库A上有3个分支branch1、branch2、branch3。远程库B上有3个分支branchx、branchy、branchz。本地仓库有2个分支local1和local2。那么当初始状态时，local1和local2和任何一个分支都没有关联，也就是没有upstream。当通过git branch --set-upstream-to A/branch1 local1命令执行后，会给local1和branch1两个分支建立关联，也就是说local1的upstream指向的是branch1。这样的好处就是在local1分支上执行git push（git pull同理）操作时不用附加其它参数，Git就会自动将local1分支上的内容push到branch1上去。同样，local2分支也可以和远程库A和远程库B上的任何一个分支建立关联，只要给local2分支设置了upstream，就可以在local2分支上用git push（git pull同理）方便地与目标分支推拉数据。

综上所述，upstream与有几个远程库没有关系，它是分支与分支之间的流通道。

再来说说git push -u和git branch --set-upstream-to指令之间的区别。

举个例子：我要把本地分支mybranch1与远程仓库origin里的分支mybranch1建立关联。

（如果使用下列途径1的话，首先，你要切换到mybranch1分支上（git checkout mybranch1））

两个途径：1. git push -u origin mybranch1  2. git branch --set-upstream-to=origin/mybranch1 mybranch1

这两种方式都可以达到目的。但是1方法更通用，因为你的远程库有可能并没有mybranch1分支，这种情况下你用2方法就不可行，连目标分支都不存在，怎么进行关联呢？所以可以总结一下：git push -u origin mybranch1 相当于 git push origin mybranch1 + git branch --set-upstream-to=origin/mybranch1 mybranch1



# 4、分支管理

```
git branch 查看本地分支
git branch -r 查看远程分支
git branch -a 查看所有分支
git checkout [Bname] 切换分支
git push origin [Bname] 将空分支上传可以看作删除远程分支
git push origin --delete [Bname] 删除远程分支
git ls-remote origin [Bname] 查看远程仓库是否有这个分支，有就有返回值，没有就什么都没有
git remote [-v] 查看远程仓库地址
git branch -m oldBranchName newBranchName 重命名
```

## 4-1、删除分支

```
git branch -d [本地分支名]
git branch -D [本地分支名]
git branch -r -D [远程分支名]
```

## 4-2、合并分支

1. git pull (git checkout -b newBname Bname)



一、开发分支（dev）上的代码达到上线的标准后，要合并到 master 分支

```
git checkout dev
git pull
git checkout master
git merge dev
git push -u origin master
```

二、当master代码改动了，需要更新开发分支（dev）上的代码

```
git checkout master 
git pull 
git checkout dev
git merge master 
git push -u origin dev
```

## 4-3、远程分支覆盖本地分支

有时候同一个分支，远程的和本地的都被修改的面目全非了，如果想要把本地的替换成远程的，用下面的命令

git fetch --all
git reset --hard origin/master (这里master要修改为对应的分支名)
git pull

# 5、git冲突

当上传的时候产生冲突时：

## 5-1、在线git解决

方便快捷操作简单。

## 5-2、检出，在本地审查和合并

- git pull origin 分支（生产冲突文件）
- 在冲突文件里修改：删除和保留（git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容（数量为7））
- git add 冲突文件
- git commit
- git push


Step 1. 获取并检出此合并请求的分支

git fetch origin
git checkout -b [bName] origin/冲突分支

Step 2. 本地审查变更（忽略）

Step 3. 合并分支并修复出现的任何冲突

git checkout master
git merge --no-ff [bName]（本地就有冲突文件了，注意看产生冲突的文件）

Step 4. 推送合并的结果到 GitLab

git checkout -b [newBName]

git push origin [newBName]

# 6、git commit

### 修改commit内容
当我们想要对上一次的提交进行修改时，我们可以使用git commit –amend命令。git commit –amend既可以对上次提交的内容进行修改，也可以修改提交说明。

如果有新的文件修改，需要合并到最近一次提交的commit里面，也可以使用上面命令直接修改即可。


> git commit --amend -no-edit

git status
git log
git show

### 6-1、删除commit

> git reset HEAD^    删除最新commit记录

### 6-2、误删除commit

- git reflog
- git reset commitId

# 7、多个commit合并(git rebase)  

实战中终于理解这条命令的作用。当我们在合并请求时又双叒叕发现一个小错误，又不得不commit一次，真想删除分支全部重新提交。但是commit是可以合并的。
[git 几个commit点合并成一个commit点](https://blog.csdn.net/u013276277/article/details/82470177)

- 1、git status当前所有修改是否都commit。如果没有后面rebase无法继续。
- 2、git log查看commitId
- 3、git rebase -i commitId（commitId是合并后的commitId的前一个）**即不影响的log**
- 4、**将删除的commit记录前面的pick改为squash，保存退出**
- 5、修改commit内容
- 6、git log查看合并结果 
- 7、git push origin [Bname] -f 可能提交会产生冲突，建议强制

  (use "git rebase --edit-todo" to view and edit)
You are currently editing a commit while rebasing branch 'hejian' on 'ddd330e'.
  (use "git commit --amend" to amend the current commit)
  (use "git rebase --continue" once you are satisfied with your changes)

# 8、如何切换分支并且改变其修改的不同的内容

就是本地像远程分支管理一样，不同分支不同的内容。但是实践看到都是一样的，后来发现姿势不对。

### 实验

```
mkdir Github   本地Github文件夹
cd Github
git init
vi helloworld.txt
	wuli github
git branch father    
git add .
git commit -m"add txt"
git checkout -b son   注意:这种创建分支的方式是将当前的分支复制到了新分支，因此尽量在修改代码前创建分支

vi helloworld.txt
	wuli github
	yes,you are right
git add .
git commit -m"update"
git log
	add txt
	update
git checkout father
git log
	add txt			这时候发现commit日志会出现不同。并且helloworld文件的内容也会随切换不同分支而改变
```

注意：当两个分支前面的commit日志一模一样的时候，是可以随意切换checkout的，但是不同的时候是需要先commit才能切换，stash也能解决这个问题。

总结：远程和本地一样，这就为啥有个叫本地仓库的概念了，本地修改了内容尽量commit到本地，只有commit了才会切换分支看到效果。

# 9、stash的作用

[stash —— 一个极度实用的Git操作](https://www.jianshu.com/p/fcf69e2d3e6b)
git stash   藏好代码
git stash list  

- git stash pop  [stash@{0}] （删除stash记录）
- git stash apply （不删除stash记录）

好习惯：master作为备份更新，第一步是创建新分支。当有新问题的时候，stash后去master分支创建新分支。

上面的commit一定是最新的。



超级好用：

git stash

git stash pop

git stash list

git stash -h



# 10、Git 全局设置（必须）

```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
```

- git config --list     查看配置信息
- git config -l
- git config --local -l
- git config --global -l

# 11、回退命令（放弃所有本地修改）

```
git reflog
git reset --hard 7edb984	放弃修改
git reset --soft 7edb984 	回到commit之前
git checkout -- filename	撤销文件的修改
HEAD
HEAD~3
commit_id

强推到远程
git push origin HEAD --force

```

可引用git checkout或者用git clean -df至修改前的状态。就可以放弃所有修改。

1、git checkout功能是本地所有修改的。没有的提交的，都返回到原来的状态

2、git stash功能是把所有没有提交的修改暂存到stash里面。可用git stash [pop](https://www.baidu.com/s?wd=pop&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)回复。

3、git reset --hard HASH功能是返回到某个节点，不保留修改。

4、git reset --soft HASH功能是返回到某个节点。保留修改。

5、git clean -df功能是保留修改，返回到某个节点。

**拓展资料**：

1、Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

[![img](https://img3.mukewang.com/5c773adf000145dc06000425.jpg)](https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7acb0a46f21fbe094c3be72c66600c338744ada4.jpg)

2、Torvalds 开始着手开发 Git 是为了作为一种过渡方案来替代 BitKeeper，后者之前一直是 Linux 内核开发人员在全球使用的主要源代码工具。开放源码社区中的有些人觉得BitKeeper 的许可证并不适合开放源码社区的工作，因此 Torvalds 决定着手研究许可证更为灵活的版本控制系统。尽管最初 Git 的开发是为了辅助 Linux 内核开发的过程，但是我们已经发现在很多其他自由软件项目中也使用了 Git。例如 很多 Freedesktop 的项目迁移到了 Git 上。



# # 12、Updates were rejected because the tip of your current branch is behind

1.使用强制push的方法：

$ git push -u origin master -f 

这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

2.push前先将远程repository修改pull下来

$ git pull origin master

$ git push -u origin master   （后续就是解决冲突）



# 13、git clean 的用法（如何使用Git删除新增的文件？）

git clean命令用来从你的工作目录中删除所有没有track过的文件
git clean经常和git reset --hard一起使用. 记住reset只影响被track过的文件, 所以需要clean来删除没有track过的文件. 结合使用这两个命令能让你的工作目录完全回到一个指定的的状态

```
git clean -n
```

是一次clean的演习, 告诉你哪些文件会被删除. 记住它不会真正地删除文件, 只是一个提醒。

```
git clean -f
```

删除当前目录下所有没有track过的文件. 它不会删除 .gitignore 文件里指定的文件夹和文件, 不管这些文件有没有被track过

```
git clean -f <path>
```

删除指定路径下的没有被track过的文件

```
git clean -df
```

删除当前目录下没有被track过的文件和文件夹

```
git clean -xf
```

删除当前目录下所有没有track过的文件. 不管它是否是 .gitignore 文件里面指定的文件夹和文件

`git reset --hard` 和 `git clean -f` 是一对好基友. 结合使用它们能让你的工作目录完全回退到最近一次commit的时候

`git clean` 对于刚编译过的项目也非常有用. 如, 它能轻易删除掉编译后生成的 .o 和 .exe 等文件. 这个在打包要发布一个release的时候非常有用

下面的例子要删除所有工作目录下面的修改, 包括新添加的文件. 假设你已经提交了一些快照了, 而且做了一些新的开发

```
git reset --hard

git clean -df
```

运行后, 工作目录和缓存区回到最近一次commit时候一摸一样的状态，git status会告诉你这是一个干净的工作目录, 又是一个新的开始了！

## 其他

--force
--hard
--soft
-d  等价于  --delete
-u  表示：
加了参数-u后，以后即可直接用git push 代替git push origin master
在git add -u中表示添加此次修改的全部原先存在的文件（即新建的不会添加 --update）。

```
1) 远程仓库相关命令
检出仓库：$ git clone git://github.com/jquery/jquery.git
查看远程仓库：$ git remote -v
添加远程仓库：$ git remote add [name] [url]
删除远程仓库：$ git remote rm [name]
修改远程仓库：$ git remote set-url --push[name][newUrl]
拉取远程仓库：$ git pull [remoteName] [localBranchName]
推送远程仓库：$ git push [remoteName] [localBranchName]
 
2）分支(branch)操作相关命令
查看本地分支：$ git branch
查看远程分支：$ git branch -r
创建本地分支：$ git branch [name] ----注意新分支创建后不会自动切换为当前分支
切换分支：$ git checkout [name]
创建新分支并立即切换到新分支：$ git checkout -b [name]
删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：$ git merge [name] ----将名称为[name]的分支与当前分支合并
创建远程分支(本地分支push到远程)：$ git push origin [name]
删除远程分支：$ git push origin :heads/[name]
```



## mintty.exe.stackdump文件

关于Git bash在win10重装系统情况下闪退并生成mintty.exe.stackdump文件的问题

总结：我也是在git commit时闪退产生了这个文件。试了几次同样的commit内容一直闪退，原因可能是中文时输入英文字母按回车键后闪退，然后在输入英文时shift切换没有闪退情况。我的问题不大，不能解决闪退网上有很多解决方法。





# 哭笑不得：git branch -a看不见一个分支

如果是下载项目就不要使用`git init test && cd test`初始化。

使用`git clone git@git.com master`下载项目后，会在当前目录下新建文件夹master并将项目下载这个目录下。

由于先前init初始化后，导致没有进入项目的文件夹中，使用git branch -a看不见任何分支。













更新服务端的分支到本地仓库
git fetch --all
列出所有的分支
git branch --all
切换到一个已有的分支
git checkout <您的分支名>
基于当前分支新建一个分支
git checkout -b <您的新分支名>
推送当前分支到服务端
git push origin <您的分支名>
删除本地的一个分支（当前所在分支和要删除的分支不能相同）
git branch -D <您的分支名>
删除服务端的一个分支
git push origin :<您的分支名>





应该右上角会有ssh和https转换，然而并没有。但是两者使用是一样的。
git clone -b gitbhttps://github.com/HanKin2015/GitBook.git

2. 远程分支重命名 (已经推送远程-假设本地分支和远程对应分支名称相同)
   a. 重命名远程分支对应的本地分支

git branch -m oldName newName
b. 删除远程分支

git push --delete origin oldName
c. 上传新命名的本地分支

git push origin newName
d.把修改后的本地分支与远程分支关联

git branch --set-upstream-to origin/newName



http://issuecdn.baidupcs.com/issue/netdisk/yunguanjia/BaiduNetdisk_6.8.1.3.exe


## Git 恢复本地误删的文件
起因：git clone下来的项目不久后就自动出现修改的红色感叹号标志，实际什么都没有做。后来猜测应该是杀毒软件之类的给我自动删除了，后来还真是。使用恢复方法恢复后，一会儿又给我删除了，要么关闭杀毒软件或者添加信任。

使用git pull --force强制拉取

正确的打开方式：
```
git reset HEAD 文件或文件夹
git checkout 文件或文件夹
```


## 14、进阶
### .gitignore
一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。来看一个实际的例子：
$ cat .gitignore
*.[oa]
*~
第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本。第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。

### 打patch
生成patch：
git format-patch commitID -1 生成当前commitID 的patch
git format-patch commitID -3 从当前commitID开始往下生成总共三个commit的patch文件
应用patch：
git apply --check xxx.patch 检查当前patch是否可以成功打入
git apply xxx.patch
git apply *.patch 同时打入所有patch

### 自定义别名（更高级的git log）
```
alias lg="git log --graph --pretty=format:’'Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit "
```

### git子模块使用
一个大型工程总会被分拆为一些子工程,git-submodule 就是完成这样一种子工程拆分与整合的工具.

添加一个子工程
git submodule add git@xxxx:subproj.git subproj
git commit -m “submodule added”

克隆一个带submodule的git仓库
git clone git@domain.com:massproj.git
git submodule init
git submodule update
或者
git clone --rescursive git@domain.com:massproj.git


查看修改的文件
git log --stat

查看commitID的具体修改
git log -p

查看文件最后的修改人
git blame -L 起始行号,结束行号



# git学习笔记

# 1、下载安装git
>sudo apt install git

明白为啥使用sudo而不是直接root账户，防止错误操作，sudo进一步确认了一下。

Windows下载安装很随意。有个注意点：尽量选择下载和上传git仓库的时候不要进行Linux和Windows的换行符的转换，否则在不同环境下运行代码的时候很尴尬。

# 2、配置
## 配置家门，即上传者的身份
设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。以前并没有觉得多大作用，慢慢地发现一个git仓库是可以多人上传的，而这个配置就是显示上传者的身份，一般会填写个人的GitHub相关的信息，比如GitHub用户名和注册邮箱。乱写也是🆗的。

```
$ git config -l  ===  git config --list
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

还有一个local参数，即为单独仓库配置单独的上传者身份。
global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
```

## 修改global配置
简单粗暴：直接使用命令git config --global user.name "Your Name"。。。。
修改配置.gitconfig文件。

## 配置SSH-Key
提交代码需要的github权限，下载私有仓库代码时也会需要这个配置，主要在于上传代码，不配置就会每次输入账户和密码。

如果你想要使用 SSH url 克隆的话，你必须是这个项目的拥有者。否则你是无法添加 SSH key 的。
使用https url很好用？？？

### https 和 SSH 的区别：
1、前者可以随意克隆github上的项目，而不管是谁的；而后者则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key ，否则无法克隆。

2、https url 在push的时候是需要验证用户名和密码的；而 SSH 在push的时候，是不需要输入用户名的，如果配置SSH key的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。

```
ssh -T git@github.com    查看是否配置好
ssh-keygen -t rsa -C "邮件地址"
```

代码参数含义：

-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。

以上代码省略了 -f 参数，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。
接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码），

当然，你也可以不输入密码，直接按回车。那么push的时候就不需要输入密码（推荐），直接提交到github上了。




[TOC]

# git入门知识汇总

# 0、前言
## 配置一个完整的环境简单步骤
```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
ssh-keygen -t rsa -C "邮件地址"
拷贝生成的公钥到git的ssh钥匙中：/root/.ssh/id_rsa.pub
```

## 0-1、安装git

使用镜像网站不错。
[下载Windows下的Git命令行客户端](https://repo.huaweicloud.com/git-for-windows/)
[下载Windows下的Git小海龟客户端](https://repo.huaweicloud.com/tortoisegit/)

1、 先安装Git.exe
2、 再安装TortoiseGit.msi
3、 根据自己喜欢安装中文翻译补丁包LanguagePack



git update-git-for-windows   更新git客户端

## 0-2、解决TortoiseGit文件夹和文件状态图标不显示问题

- 先重启试试
- 修改注册表
- 设置里面设置显示icon overlays

# 1、使用git下载单个指定的文件夹

更多搜索“稀疏检出”。



```
稀疏检出恢复：

SC_FILE=.git/info/sparse-checkout
echo "Undoing sparse checkout"

# Get the full tree back

echo "*" > $SC_FILE
git config core.sparsecheckout true
git read-tree --reset -u HEAD

# Wipe out all traces of sparse checkout support

rm -rf $SC_FILE
git config core.sparsecheckout false
```





参考：https://www.cnblogs.com/zhoudaxiaa/p/8670481.html

方法一：http://zhoudaxiaa.gitee.io/downgit/#/home

方法二：

在Git1.7.0以前，这无法实现，但是幸运的是在Git1.7.0以后加入了Sparse Checkout模式，这使得Check Out指定文件或者文件夹成为可能。

**举个例子：**

> 现在有一个**test**仓库https://github.com/mygithub/test
> 你要gitclone里面的**tt**子目录：
> 在本地的硬盘位置打开**Git Bash**

```
git init test && cd test     //新建仓库并进入文件夹
git config core.sparsecheckout true //设置允许克隆子目录

echo 'tt*' >> .git/info/sparse-checkout //设置要克隆的仓库的子目录路径   //空格别漏

git remote add origin git@github.com:mygithub/test.git  //这里换成你要克隆的项目和库

git pull origin master    //下载
```

 https://blog.csdn.net/qq_35860352/article/details/80313078 不行

## 下载指定分支

git clone -b branch git@github.com:github/test.git 



**重点看这里**：

# 2、git add命令参数说明

git add -u：将文件的修改、文件的删除，添加到暂存区。
git add .：将文件的修改，文件的新建，添加到暂存区。
git add -A：将文件的修改，文件的删除，文件的新建，添加到暂存区。

-u就是update的意思，只会标记本地有改动（包括删除和修改）的已经追踪的文件

\1.  git add -A   保存所有的修改

\2.  git add .     保存新的添加和修改，但是不包括删除

\3.  git add -u   保存修改和删除，但是不包括新建文件。



# 3、git push 的 -u 参数具体适合含义？

一般只有同时存在多个远程仓库时才会用到--set-upstream。每个git branch可以有个对应的upstream。假设你有两个upstream，分别叫server1和server2，本地master branch的upstream是server1上的master，那么当你不带参数直接输入git pull或者git push时，默认是对server1进行pull/push。如果你成功运行"git push -u server2 master"，那么除了本地branch会被push到server2之外，还会把server2设置成upstream。



```
-u, --set-upstream
For every branch that is up to date or successfully pushed, add upstream (tracking) reference, used by argument-less git-pull(1) and other commands.
```

upstream不是针对远程仓库的，而是针对branch的，这一点应了那位童鞋所说的第二句话。但是upstream和有几个远程库没有必然联系。比如远程库A上有3个分支branch1、branch2、branch3。远程库B上有3个分支branchx、branchy、branchz。本地仓库有2个分支local1和local2。那么当初始状态时，local1和local2和任何一个分支都没有关联，也就是没有upstream。当通过git branch --set-upstream-to A/branch1 local1命令执行后，会给local1和branch1两个分支建立关联，也就是说local1的upstream指向的是branch1。这样的好处就是在local1分支上执行git push（git pull同理）操作时不用附加其它参数，Git就会自动将local1分支上的内容push到branch1上去。同样，local2分支也可以和远程库A和远程库B上的任何一个分支建立关联，只要给local2分支设置了upstream，就可以在local2分支上用git push（git pull同理）方便地与目标分支推拉数据。

综上所述，upstream与有几个远程库没有关系，它是分支与分支之间的流通道。

再来说说git push -u和git branch --set-upstream-to指令之间的区别。

举个例子：我要把本地分支mybranch1与远程仓库origin里的分支mybranch1建立关联。

（如果使用下列途径1的话，首先，你要切换到mybranch1分支上（git checkout mybranch1））

两个途径：1. git push -u origin mybranch1  2. git branch --set-upstream-to=origin/mybranch1 mybranch1

这两种方式都可以达到目的。但是1方法更通用，因为你的远程库有可能并没有mybranch1分支，这种情况下你用2方法就不可行，连目标分支都不存在，怎么进行关联呢？所以可以总结一下：git push -u origin mybranch1 相当于 git push origin mybranch1 + git branch --set-upstream-to=origin/mybranch1 mybranch1



# 4、分支管理

```
git branch 查看本地分支
git branch -r 查看远程分支
git branch -a 查看所有分支
git checkout [Bname] 切换分支
git push origin [Bname] 将空分支上传可以看作删除远程分支
git push origin --delete [Bname] 删除远程分支
git ls-remote origin [Bname] 查看远程仓库是否有这个分支，有就有返回值，没有就什么都没有
git remote [-v] 查看远程仓库地址
git branch -m oldBranchName newBranchName 重命名
```

## 4-1、删除分支

```
git branch -d [本地分支名]
git branch -D [本地分支名]
git branch -r -D [远程分支名]
```

## 4-2、合并分支

1. git pull (git checkout -b newBname Bname)



一、开发分支（dev）上的代码达到上线的标准后，要合并到 master 分支

```
git checkout dev
git pull
git checkout master
git merge dev
git push -u origin master
```

二、当master代码改动了，需要更新开发分支（dev）上的代码

```
git checkout master 
git pull 
git checkout dev
git merge master 
git push -u origin dev
```

## 4-3、远程分支覆盖本地分支

有时候同一个分支，远程的和本地的都被修改的面目全非了，如果想要把本地的替换成远程的，用下面的命令

git fetch --all
git reset --hard origin/master (这里master要修改为对应的分支名)
git pull

# 5、git冲突

当上传的时候产生冲突时：

## 5-1、在线git解决

方便快捷操作简单。

## 5-2、检出，在本地审查和合并

- git pull origin 分支（生产冲突文件）
- 在冲突文件里修改：删除和保留（git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容（数量为7））
- git add 冲突文件
- git commit
- git push


Step 1. 获取并检出此合并请求的分支

git fetch origin
git checkout -b [bName] origin/冲突分支

Step 2. 本地审查变更（忽略）

Step 3. 合并分支并修复出现的任何冲突

git checkout master
git merge --no-ff [bName]（本地就有冲突文件了，注意看产生冲突的文件）

Step 4. 推送合并的结果到 GitLab

git checkout -b [newBName]

git push origin [newBName]

# 6、git commit

### 修改commit内容
当我们想要对上一次的提交进行修改时，我们可以使用git commit –amend命令。git commit –amend既可以对上次提交的内容进行修改，也可以修改提交说明。

如果有新的文件修改，需要合并到最近一次提交的commit里面，也可以使用上面命令直接修改即可。


> git commit --amend -no-edit

git status
git log
git show

### 6-1、删除commit

> git reset HEAD^    删除最新commit记录

### 6-2、误删除commit

- git reflog
- git reset commitId

# 7、多个commit合并(git rebase)  

实战中终于理解这条命令的作用。当我们在合并请求时又双叒叕发现一个小错误，又不得不commit一次，真想删除分支全部重新提交。但是commit是可以合并的。
[git 几个commit点合并成一个commit点](https://blog.csdn.net/u013276277/article/details/82470177)

- 1、git status当前所有修改是否都commit。如果没有后面rebase无法继续。
- 2、git log查看commitId
- 3、git rebase -i commitId（commitId是合并后的commitId的前一个）**即不影响的log**
- 4、**将删除的commit记录前面的pick改为squash，保存退出**
- 5、修改commit内容
- 6、git log查看合并结果 
- 7、git push origin [Bname] -f 可能提交会产生冲突，建议强制

  (use "git rebase --edit-todo" to view and edit)
You are currently editing a commit while rebasing branch 'hejian' on 'ddd330e'.
  (use "git commit --amend" to amend the current commit)
  (use "git rebase --continue" once you are satisfied with your changes)

# 8、如何切换分支并且改变其修改的不同的内容

就是本地像远程分支管理一样，不同分支不同的内容。但是实践看到都是一样的，后来发现姿势不对。

### 实验

```
mkdir Github   本地Github文件夹
cd Github
git init
vi helloworld.txt
	wuli github
git branch father    
git add .
git commit -m"add txt"
git checkout -b son   注意:这种创建分支的方式是将当前的分支复制到了新分支，因此尽量在修改代码前创建分支

vi helloworld.txt
	wuli github
	yes,you are right
git add .
git commit -m"update"
git log
	add txt
	update
git checkout father
git log
	add txt			这时候发现commit日志会出现不同。并且helloworld文件的内容也会随切换不同分支而改变
```

注意：当两个分支前面的commit日志一模一样的时候，是可以随意切换checkout的，但是不同的时候是需要先commit才能切换，stash也能解决这个问题。

总结：远程和本地一样，这就为啥有个叫本地仓库的概念了，本地修改了内容尽量commit到本地，只有commit了才会切换分支看到效果。

# 9、stash的作用

[stash —— 一个极度实用的Git操作](https://www.jianshu.com/p/fcf69e2d3e6b)
git stash   藏好代码
git stash list  

- git stash pop  [stash@{0}] （删除stash记录）
- git stash apply （不删除stash记录）

好习惯：master作为备份更新，第一步是创建新分支。当有新问题的时候，stash后去master分支创建新分支。

上面的commit一定是最新的。



超级好用：

git stash

git stash pop

git stash list

git stash -h



# 10、Git 全局设置（必须）

```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
```

- git config --list     查看配置信息
- git config -l
- git config --local -l
- git config --global -l

# 11、回退命令（放弃所有本地修改）

```
git reflog
git reset --hard 7edb984	放弃修改
git reset --soft 7edb984 	回到commit之前
git checkout -- filename	撤销文件的修改
HEAD
HEAD~3
commit_id

强推到远程
git push origin HEAD --force

```

可引用git checkout或者用git clean -df至修改前的状态。就可以放弃所有修改。

1、git checkout功能是本地所有修改的。没有的提交的，都返回到原来的状态

2、git stash功能是把所有没有提交的修改暂存到stash里面。可用git stash [pop](https://www.baidu.com/s?wd=pop&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)回复。

3、git reset --hard HASH功能是返回到某个节点，不保留修改。

4、git reset --soft HASH功能是返回到某个节点。保留修改。

5、git clean -df功能是保留修改，返回到某个节点。

**拓展资料**：

1、Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

[![img](https://img3.mukewang.com/5c773adf000145dc06000425.jpg)](https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7acb0a46f21fbe094c3be72c66600c338744ada4.jpg)

2、Torvalds 开始着手开发 Git 是为了作为一种过渡方案来替代 BitKeeper，后者之前一直是 Linux 内核开发人员在全球使用的主要源代码工具。开放源码社区中的有些人觉得BitKeeper 的许可证并不适合开放源码社区的工作，因此 Torvalds 决定着手研究许可证更为灵活的版本控制系统。尽管最初 Git 的开发是为了辅助 Linux 内核开发的过程，但是我们已经发现在很多其他自由软件项目中也使用了 Git。例如 很多 Freedesktop 的项目迁移到了 Git 上。



# # 12、Updates were rejected because the tip of your current branch is behind

1.使用强制push的方法：

$ git push -u origin master -f 

这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

2.push前先将远程repository修改pull下来

$ git pull origin master

$ git push -u origin master   （后续就是解决冲突）



# 13、git clean 的用法（如何使用Git删除新增的文件？）

git clean命令用来从你的工作目录中删除所有没有track过的文件
git clean经常和git reset --hard一起使用. 记住reset只影响被track过的文件, 所以需要clean来删除没有track过的文件. 结合使用这两个命令能让你的工作目录完全回到一个指定的的状态

```
git clean -n
```

是一次clean的演习, 告诉你哪些文件会被删除. 记住它不会真正地删除文件, 只是一个提醒。

```
git clean -f
```

删除当前目录下所有没有track过的文件. 它不会删除 .gitignore 文件里指定的文件夹和文件, 不管这些文件有没有被track过

```
git clean -f <path>
```

删除指定路径下的没有被track过的文件

```
git clean -df
```

删除当前目录下没有被track过的文件和文件夹

```
git clean -xf
```

删除当前目录下所有没有track过的文件. 不管它是否是 .gitignore 文件里面指定的文件夹和文件

`git reset --hard` 和 `git clean -f` 是一对好基友. 结合使用它们能让你的工作目录完全回退到最近一次commit的时候

`git clean` 对于刚编译过的项目也非常有用. 如, 它能轻易删除掉编译后生成的 .o 和 .exe 等文件. 这个在打包要发布一个release的时候非常有用

下面的例子要删除所有工作目录下面的修改, 包括新添加的文件. 假设你已经提交了一些快照了, 而且做了一些新的开发

```
git reset --hard

git clean -df
```

运行后, 工作目录和缓存区回到最近一次commit时候一摸一样的状态，git status会告诉你这是一个干净的工作目录, 又是一个新的开始了！

## 其他

--force
--hard
--soft
-d  等价于  --delete
-u  表示：
加了参数-u后，以后即可直接用git push 代替git push origin master
在git add -u中表示添加此次修改的全部原先存在的文件（即新建的不会添加 --update）。

```
1) 远程仓库相关命令
检出仓库：$ git clone git://github.com/jquery/jquery.git
查看远程仓库：$ git remote -v
添加远程仓库：$ git remote add [name] [url]
删除远程仓库：$ git remote rm [name]
修改远程仓库：$ git remote set-url --push[name][newUrl]
拉取远程仓库：$ git pull [remoteName] [localBranchName]
推送远程仓库：$ git push [remoteName] [localBranchName]
 
2）分支(branch)操作相关命令
查看本地分支：$ git branch
查看远程分支：$ git branch -r
创建本地分支：$ git branch [name] ----注意新分支创建后不会自动切换为当前分支
切换分支：$ git checkout [name]
创建新分支并立即切换到新分支：$ git checkout -b [name]
删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：$ git merge [name] ----将名称为[name]的分支与当前分支合并
创建远程分支(本地分支push到远程)：$ git push origin [name]
删除远程分支：$ git push origin :heads/[name]
```



## mintty.exe.stackdump文件

关于Git bash在win10重装系统情况下闪退并生成mintty.exe.stackdump文件的问题

总结：我也是在git commit时闪退产生了这个文件。试了几次同样的commit内容一直闪退，原因可能是中文时输入英文字母按回车键后闪退，然后在输入英文时shift切换没有闪退情况。我的问题不大，不能解决闪退网上有很多解决方法。





# 哭笑不得：git branch -a看不见一个分支

如果是下载项目就不要使用`git init test && cd test`初始化。

使用`git clone git@git.com master`下载项目后，会在当前目录下新建文件夹master并将项目下载这个目录下。

由于先前init初始化后，导致没有进入项目的文件夹中，使用git branch -a看不见任何分支。













更新服务端的分支到本地仓库
git fetch --all
列出所有的分支
git branch --all
切换到一个已有的分支
git checkout <您的分支名>
基于当前分支新建一个分支
git checkout -b <您的新分支名>
推送当前分支到服务端
git push origin <您的分支名>
删除本地的一个分支（当前所在分支和要删除的分支不能相同）
git branch -D <您的分支名>
删除服务端的一个分支
git push origin :<您的分支名>





应该右上角会有ssh和https转换，然而并没有。但是两者使用是一样的。
git clone -b gitbhttps://github.com/HanKin2015/GitBook.git

2. 远程分支重命名 (已经推送远程-假设本地分支和远程对应分支名称相同)
   a. 重命名远程分支对应的本地分支

git branch -m oldName newName
b. 删除远程分支

git push --delete origin oldName
c. 上传新命名的本地分支

git push origin newName
d.把修改后的本地分支与远程分支关联

git branch --set-upstream-to origin/newName



http://issuecdn.baidupcs.com/issue/netdisk/yunguanjia/BaiduNetdisk_6.8.1.3.exe


## Git 恢复本地误删的文件
起因：git clone下来的项目不久后就自动出现修改的红色感叹号标志，实际什么都没有做。后来猜测应该是杀毒软件之类的给我自动删除了，后来还真是。使用恢复方法恢复后，一会儿又给我删除了，要么关闭杀毒软件或者添加信任。

使用git pull --force强制拉取

正确的打开方式：
```
git reset HEAD 文件或文件夹
git checkout 文件或文件夹
```


## 14、进阶
### .gitignore
一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。来看一个实际的例子：
$ cat .gitignore
*.[oa]
*~
第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本。第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。

### 打patch
生成patch：
git format-patch commitID -1 生成当前commitID 的patch
git format-patch commitID -3 从当前commitID开始往下生成总共三个commit的patch文件
应用patch：
git apply --check xxx.patch 检查当前patch是否可以成功打入
git apply xxx.patch
git apply *.patch 同时打入所有patch

### 自定义别名（更高级的git log）
```
alias lg="git log --graph --pretty=format:’'Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit "
```

### git子模块使用
一个大型工程总会被分拆为一些子工程,git-submodule 就是完成这样一种子工程拆分与整合的工具.

添加一个子工程
git submodule add git@xxxx:subproj.git subproj
git commit -m “submodule added”

克隆一个带submodule的git仓库
git clone git@domain.com:massproj.git
git submodule init
git submodule update
或者
git clone --rescursive git@domain.com:massproj.git


查看修改的文件
git log --stat

查看commitID的具体修改
git log -p

查看文件最后的修改人
git blame -L 起始行号,结束行号



# git学习笔记

# 1、下载安装git
>sudo apt install git

明白为啥使用sudo而不是直接root账户，防止错误操作，sudo进一步确认了一下。

Windows下载安装很随意。有个注意点：尽量选择下载和上传git仓库的时候不要进行Linux和Windows的换行符的转换，否则在不同环境下运行代码的时候很尴尬。

# 2、配置
## 配置家门，即上传者的身份
设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。以前并没有觉得多大作用，慢慢地发现一个git仓库是可以多人上传的，而这个配置就是显示上传者的身份，一般会填写个人的GitHub相关的信息，比如GitHub用户名和注册邮箱。乱写也是🆗的。

```
$ git config -l  ===  git config --list
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

还有一个local参数，即为单独仓库配置单独的上传者身份。
global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
```

## 修改global配置
简单粗暴：直接使用命令git config --global user.name "Your Name"。。。。
修改配置.gitconfig文件。

## 配置SSH-Key
提交代码需要的github权限，下载私有仓库代码时也会需要这个配置，主要在于上传代码，不配置就会每次输入账户和密码。

如果你想要使用 SSH url 克隆的话，你必须是这个项目的拥有者。否则你是无法添加 SSH key 的。
使用https url很好用？？？

### https 和 SSH 的区别：
1、前者可以随意克隆github上的项目，而不管是谁的；而后者则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key ，否则无法克隆。

2、https url 在push的时候是需要验证用户名和密码的；而 SSH 在push的时候，是不需要输入用户名的，如果配置SSH key的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。

```
ssh -T git@github.com    查看是否配置好
ssh-keygen -t rsa -C "邮件地址"
```

代码参数含义：

-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。

以上代码省略了 -f 参数，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。
接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码），

当然，你也可以不输入密码，直接按回车。那么push的时候就不需要输入密码（推荐），直接提交到github上了。




[TOC]

# git入门知识汇总

# 0、前言
## 配置一个完整的环境简单步骤
```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
ssh-keygen -t rsa -C "邮件地址"
拷贝生成的公钥到git的ssh钥匙中：/root/.ssh/id_rsa.pub
```

## 0-1、安装git

使用镜像网站不错。
[下载Windows下的Git命令行客户端](https://repo.huaweicloud.com/git-for-windows/)
[下载Windows下的Git小海龟客户端](https://repo.huaweicloud.com/tortoisegit/)

1、 先安装Git.exe
2、 再安装TortoiseGit.msi
3、 根据自己喜欢安装中文翻译补丁包LanguagePack



git update-git-for-windows   更新git客户端

## 0-2、解决TortoiseGit文件夹和文件状态图标不显示问题

- 先重启试试
- 修改注册表
- 设置里面设置显示icon overlays

# 1、使用git下载单个指定的文件夹

更多搜索“稀疏检出”。



```
稀疏检出恢复：

SC_FILE=.git/info/sparse-checkout
echo "Undoing sparse checkout"

# Get the full tree back

echo "*" > $SC_FILE
git config core.sparsecheckout true
git read-tree --reset -u HEAD

# Wipe out all traces of sparse checkout support

rm -rf $SC_FILE
git config core.sparsecheckout false
```





参考：https://www.cnblogs.com/zhoudaxiaa/p/8670481.html

方法一：http://zhoudaxiaa.gitee.io/downgit/#/home

方法二：

在Git1.7.0以前，这无法实现，但是幸运的是在Git1.7.0以后加入了Sparse Checkout模式，这使得Check Out指定文件或者文件夹成为可能。

**举个例子：**

> 现在有一个**test**仓库https://github.com/mygithub/test
> 你要gitclone里面的**tt**子目录：
> 在本地的硬盘位置打开**Git Bash**

```
git init test && cd test     //新建仓库并进入文件夹
git config core.sparsecheckout true //设置允许克隆子目录

echo 'tt*' >> .git/info/sparse-checkout //设置要克隆的仓库的子目录路径   //空格别漏

git remote add origin git@github.com:mygithub/test.git  //这里换成你要克隆的项目和库

git pull origin master    //下载
```

 https://blog.csdn.net/qq_35860352/article/details/80313078 不行

## 下载指定分支

git clone -b branch git@github.com:github/test.git 



**重点看这里**：

# 2、git add命令参数说明

git add -u：将文件的修改、文件的删除，添加到暂存区。
git add .：将文件的修改，文件的新建，添加到暂存区。
git add -A：将文件的修改，文件的删除，文件的新建，添加到暂存区。

-u就是update的意思，只会标记本地有改动（包括删除和修改）的已经追踪的文件

\1.  git add -A   保存所有的修改

\2.  git add .     保存新的添加和修改，但是不包括删除

\3.  git add -u   保存修改和删除，但是不包括新建文件。



# 3、git push 的 -u 参数具体适合含义？

一般只有同时存在多个远程仓库时才会用到--set-upstream。每个git branch可以有个对应的upstream。假设你有两个upstream，分别叫server1和server2，本地master branch的upstream是server1上的master，那么当你不带参数直接输入git pull或者git push时，默认是对server1进行pull/push。如果你成功运行"git push -u server2 master"，那么除了本地branch会被push到server2之外，还会把server2设置成upstream。



```
-u, --set-upstream
For every branch that is up to date or successfully pushed, add upstream (tracking) reference, used by argument-less git-pull(1) and other commands.
```

upstream不是针对远程仓库的，而是针对branch的，这一点应了那位童鞋所说的第二句话。但是upstream和有几个远程库没有必然联系。比如远程库A上有3个分支branch1、branch2、branch3。远程库B上有3个分支branchx、branchy、branchz。本地仓库有2个分支local1和local2。那么当初始状态时，local1和local2和任何一个分支都没有关联，也就是没有upstream。当通过git branch --set-upstream-to A/branch1 local1命令执行后，会给local1和branch1两个分支建立关联，也就是说local1的upstream指向的是branch1。这样的好处就是在local1分支上执行git push（git pull同理）操作时不用附加其它参数，Git就会自动将local1分支上的内容push到branch1上去。同样，local2分支也可以和远程库A和远程库B上的任何一个分支建立关联，只要给local2分支设置了upstream，就可以在local2分支上用git push（git pull同理）方便地与目标分支推拉数据。

综上所述，upstream与有几个远程库没有关系，它是分支与分支之间的流通道。

再来说说git push -u和git branch --set-upstream-to指令之间的区别。

举个例子：我要把本地分支mybranch1与远程仓库origin里的分支mybranch1建立关联。

（如果使用下列途径1的话，首先，你要切换到mybranch1分支上（git checkout mybranch1））

两个途径：1. git push -u origin mybranch1  2. git branch --set-upstream-to=origin/mybranch1 mybranch1

这两种方式都可以达到目的。但是1方法更通用，因为你的远程库有可能并没有mybranch1分支，这种情况下你用2方法就不可行，连目标分支都不存在，怎么进行关联呢？所以可以总结一下：git push -u origin mybranch1 相当于 git push origin mybranch1 + git branch --set-upstream-to=origin/mybranch1 mybranch1



# 4、分支管理

```
git branch 查看本地分支
git branch -r 查看远程分支
git branch -a 查看所有分支
git checkout [Bname] 切换分支
git push origin [Bname] 将空分支上传可以看作删除远程分支
git push origin --delete [Bname] 删除远程分支
git ls-remote origin [Bname] 查看远程仓库是否有这个分支，有就有返回值，没有就什么都没有
git remote [-v] 查看远程仓库地址
git branch -m oldBranchName newBranchName 重命名
```

## 4-1、删除分支

```
git branch -d [本地分支名]
git branch -D [本地分支名]
git branch -r -D [远程分支名]
```

## 4-2、合并分支

1. git pull (git checkout -b newBname Bname)



一、开发分支（dev）上的代码达到上线的标准后，要合并到 master 分支

```
git checkout dev
git pull
git checkout master
git merge dev
git push -u origin master
```

二、当master代码改动了，需要更新开发分支（dev）上的代码

```
git checkout master 
git pull 
git checkout dev
git merge master 
git push -u origin dev
```

## 4-3、远程分支覆盖本地分支

有时候同一个分支，远程的和本地的都被修改的面目全非了，如果想要把本地的替换成远程的，用下面的命令

git fetch --all
git reset --hard origin/master (这里master要修改为对应的分支名)
git pull

# 5、git冲突

当上传的时候产生冲突时：

## 5-1、在线git解决

方便快捷操作简单。

## 5-2、检出，在本地审查和合并

- git pull origin 分支（生产冲突文件）
- 在冲突文件里修改：删除和保留（git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容（数量为7））
- git add 冲突文件
- git commit
- git push


Step 1. 获取并检出此合并请求的分支

git fetch origin
git checkout -b [bName] origin/冲突分支

Step 2. 本地审查变更（忽略）

Step 3. 合并分支并修复出现的任何冲突

git checkout master
git merge --no-ff [bName]（本地就有冲突文件了，注意看产生冲突的文件）

Step 4. 推送合并的结果到 GitLab

git checkout -b [newBName]

git push origin [newBName]

# 6、git commit

### 修改commit内容
当我们想要对上一次的提交进行修改时，我们可以使用git commit –amend命令。git commit –amend既可以对上次提交的内容进行修改，也可以修改提交说明。

如果有新的文件修改，需要合并到最近一次提交的commit里面，也可以使用上面命令直接修改即可。


> git commit --amend -no-edit

git status
git log
git show

### 6-1、删除commit

> git reset HEAD^    删除最新commit记录

### 6-2、误删除commit

- git reflog
- git reset commitId

# 7、多个commit合并(git rebase)  

实战中终于理解这条命令的作用。当我们在合并请求时又双叒叕发现一个小错误，又不得不commit一次，真想删除分支全部重新提交。但是commit是可以合并的。
[git 几个commit点合并成一个commit点](https://blog.csdn.net/u013276277/article/details/82470177)

- 1、git status当前所有修改是否都commit。如果没有后面rebase无法继续。
- 2、git log查看commitId
- 3、git rebase -i commitId（commitId是合并后的commitId的前一个）**即不影响的log**
- 4、**将删除的commit记录前面的pick改为squash，保存退出**
- 5、修改commit内容
- 6、git log查看合并结果 
- 7、git push origin [Bname] -f 可能提交会产生冲突，建议强制

  (use "git rebase --edit-todo" to view and edit)
You are currently editing a commit while rebasing branch 'hejian' on 'ddd330e'.
  (use "git commit --amend" to amend the current commit)
  (use "git rebase --continue" once you are satisfied with your changes)

# 8、如何切换分支并且改变其修改的不同的内容

就是本地像远程分支管理一样，不同分支不同的内容。但是实践看到都是一样的，后来发现姿势不对。

### 实验

```
mkdir Github   本地Github文件夹
cd Github
git init
vi helloworld.txt
	wuli github
git branch father    
git add .
git commit -m"add txt"
git checkout -b son   注意:这种创建分支的方式是将当前的分支复制到了新分支，因此尽量在修改代码前创建分支

vi helloworld.txt
	wuli github
	yes,you are right
git add .
git commit -m"update"
git log
	add txt
	update
git checkout father
git log
	add txt			这时候发现commit日志会出现不同。并且helloworld文件的内容也会随切换不同分支而改变
```

注意：当两个分支前面的commit日志一模一样的时候，是可以随意切换checkout的，但是不同的时候是需要先commit才能切换，stash也能解决这个问题。

总结：远程和本地一样，这就为啥有个叫本地仓库的概念了，本地修改了内容尽量commit到本地，只有commit了才会切换分支看到效果。

# 9、stash的作用

[stash —— 一个极度实用的Git操作](https://www.jianshu.com/p/fcf69e2d3e6b)
git stash   藏好代码
git stash list  

- git stash pop  [stash@{0}] （删除stash记录）
- git stash apply （不删除stash记录）

好习惯：master作为备份更新，第一步是创建新分支。当有新问题的时候，stash后去master分支创建新分支。

上面的commit一定是最新的。



超级好用：

git stash

git stash pop

git stash list

git stash -h



# 10、Git 全局设置（必须）

```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
```

- git config --list     查看配置信息
- git config -l
- git config --local -l
- git config --global -l

# 11、回退命令（放弃所有本地修改）

```
git reflog
git reset --hard 7edb984	放弃修改
git reset --soft 7edb984 	回到commit之前
git checkout -- filename	撤销文件的修改
HEAD
HEAD~3
commit_id

强推到远程
git push origin HEAD --force

```

可引用git checkout或者用git clean -df至修改前的状态。就可以放弃所有修改。

1、git checkout功能是本地所有修改的。没有的提交的，都返回到原来的状态

2、git stash功能是把所有没有提交的修改暂存到stash里面。可用git stash [pop](https://www.baidu.com/s?wd=pop&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)回复。

3、git reset --hard HASH功能是返回到某个节点，不保留修改。

4、git reset --soft HASH功能是返回到某个节点。保留修改。

5、git clean -df功能是保留修改，返回到某个节点。

**拓展资料**：

1、Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

[![img](https://img3.mukewang.com/5c773adf000145dc06000425.jpg)](https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7acb0a46f21fbe094c3be72c66600c338744ada4.jpg)

2、Torvalds 开始着手开发 Git 是为了作为一种过渡方案来替代 BitKeeper，后者之前一直是 Linux 内核开发人员在全球使用的主要源代码工具。开放源码社区中的有些人觉得BitKeeper 的许可证并不适合开放源码社区的工作，因此 Torvalds 决定着手研究许可证更为灵活的版本控制系统。尽管最初 Git 的开发是为了辅助 Linux 内核开发的过程，但是我们已经发现在很多其他自由软件项目中也使用了 Git。例如 很多 Freedesktop 的项目迁移到了 Git 上。



# # 12、Updates were rejected because the tip of your current branch is behind

1.使用强制push的方法：

$ git push -u origin master -f 

这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

2.push前先将远程repository修改pull下来

$ git pull origin master

$ git push -u origin master   （后续就是解决冲突）



# 13、git clean 的用法（如何使用Git删除新增的文件？）

git clean命令用来从你的工作目录中删除所有没有track过的文件
git clean经常和git reset --hard一起使用. 记住reset只影响被track过的文件, 所以需要clean来删除没有track过的文件. 结合使用这两个命令能让你的工作目录完全回到一个指定的的状态

```
git clean -n
```

是一次clean的演习, 告诉你哪些文件会被删除. 记住它不会真正地删除文件, 只是一个提醒。

```
git clean -f
```

删除当前目录下所有没有track过的文件. 它不会删除 .gitignore 文件里指定的文件夹和文件, 不管这些文件有没有被track过

```
git clean -f <path>
```

删除指定路径下的没有被track过的文件

```
git clean -df
```

删除当前目录下没有被track过的文件和文件夹

```
git clean -xf
```

删除当前目录下所有没有track过的文件. 不管它是否是 .gitignore 文件里面指定的文件夹和文件

`git reset --hard` 和 `git clean -f` 是一对好基友. 结合使用它们能让你的工作目录完全回退到最近一次commit的时候

`git clean` 对于刚编译过的项目也非常有用. 如, 它能轻易删除掉编译后生成的 .o 和 .exe 等文件. 这个在打包要发布一个release的时候非常有用

下面的例子要删除所有工作目录下面的修改, 包括新添加的文件. 假设你已经提交了一些快照了, 而且做了一些新的开发

```
git reset --hard

git clean -df
```

运行后, 工作目录和缓存区回到最近一次commit时候一摸一样的状态，git status会告诉你这是一个干净的工作目录, 又是一个新的开始了！

## 其他

--force
--hard
--soft
-d  等价于  --delete
-u  表示：
加了参数-u后，以后即可直接用git push 代替git push origin master
在git add -u中表示添加此次修改的全部原先存在的文件（即新建的不会添加 --update）。

```
1) 远程仓库相关命令
检出仓库：$ git clone git://github.com/jquery/jquery.git
查看远程仓库：$ git remote -v
添加远程仓库：$ git remote add [name] [url]
删除远程仓库：$ git remote rm [name]
修改远程仓库：$ git remote set-url --push[name][newUrl]
拉取远程仓库：$ git pull [remoteName] [localBranchName]
推送远程仓库：$ git push [remoteName] [localBranchName]
 
2）分支(branch)操作相关命令
查看本地分支：$ git branch
查看远程分支：$ git branch -r
创建本地分支：$ git branch [name] ----注意新分支创建后不会自动切换为当前分支
切换分支：$ git checkout [name]
创建新分支并立即切换到新分支：$ git checkout -b [name]
删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：$ git merge [name] ----将名称为[name]的分支与当前分支合并
创建远程分支(本地分支push到远程)：$ git push origin [name]
删除远程分支：$ git push origin :heads/[name]
```



## mintty.exe.stackdump文件

关于Git bash在win10重装系统情况下闪退并生成mintty.exe.stackdump文件的问题

总结：我也是在git commit时闪退产生了这个文件。试了几次同样的commit内容一直闪退，原因可能是中文时输入英文字母按回车键后闪退，然后在输入英文时shift切换没有闪退情况。我的问题不大，不能解决闪退网上有很多解决方法。





# 哭笑不得：git branch -a看不见一个分支

如果是下载项目就不要使用`git init test && cd test`初始化。

使用`git clone git@git.com master`下载项目后，会在当前目录下新建文件夹master并将项目下载这个目录下。

由于先前init初始化后，导致没有进入项目的文件夹中，使用git branch -a看不见任何分支。













更新服务端的分支到本地仓库
git fetch --all
列出所有的分支
git branch --all
切换到一个已有的分支
git checkout <您的分支名>
基于当前分支新建一个分支
git checkout -b <您的新分支名>
推送当前分支到服务端
git push origin <您的分支名>
删除本地的一个分支（当前所在分支和要删除的分支不能相同）
git branch -D <您的分支名>
删除服务端的一个分支
git push origin :<您的分支名>





应该右上角会有ssh和https转换，然而并没有。但是两者使用是一样的。
git clone -b gitbhttps://github.com/HanKin2015/GitBook.git

2. 远程分支重命名 (已经推送远程-假设本地分支和远程对应分支名称相同)
   a. 重命名远程分支对应的本地分支

git branch -m oldName newName
b. 删除远程分支

git push --delete origin oldName
c. 上传新命名的本地分支

git push origin newName
d.把修改后的本地分支与远程分支关联

git branch --set-upstream-to origin/newName



http://issuecdn.baidupcs.com/issue/netdisk/yunguanjia/BaiduNetdisk_6.8.1.3.exe


## Git 恢复本地误删的文件
起因：git clone下来的项目不久后就自动出现修改的红色感叹号标志，实际什么都没有做。后来猜测应该是杀毒软件之类的给我自动删除了，后来还真是。使用恢复方法恢复后，一会儿又给我删除了，要么关闭杀毒软件或者添加信任。

使用git pull --force强制拉取

正确的打开方式：
```
git reset HEAD 文件或文件夹
git checkout 文件或文件夹
```


## 14、进阶
### .gitignore
一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。来看一个实际的例子：
$ cat .gitignore
*.[oa]
*~
第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本。第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。

### 打patch
生成patch：
git format-patch commitID -1 生成当前commitID 的patch
git format-patch commitID -3 从当前commitID开始往下生成总共三个commit的patch文件
应用patch：
git apply --check xxx.patch 检查当前patch是否可以成功打入
git apply xxx.patch
git apply *.patch 同时打入所有patch

### 自定义别名（更高级的git log）
```
alias lg="git log --graph --pretty=format:’'Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit "
```

### git子模块使用
一个大型工程总会被分拆为一些子工程,git-submodule 就是完成这样一种子工程拆分与整合的工具.

添加一个子工程
git submodule add git@xxxx:subproj.git subproj
git commit -m “submodule added”

克隆一个带submodule的git仓库
git clone git@domain.com:massproj.git
git submodule init
git submodule update
或者
git clone --rescursive git@domain.com:massproj.git


查看修改的文件
git log --stat

查看commitID的具体修改
git log -p

查看文件最后的修改人
git blame -L 起始行号,结束行号



# git学习笔记

# 1、下载安装git
>sudo apt install git

明白为啥使用sudo而不是直接root账户，防止错误操作，sudo进一步确认了一下。

Windows下载安装很随意。有个注意点：尽量选择下载和上传git仓库的时候不要进行Linux和Windows的换行符的转换，否则在不同环境下运行代码的时候很尴尬。

# 2、配置
## 配置家门，即上传者的身份
设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。以前并没有觉得多大作用，慢慢地发现一个git仓库是可以多人上传的，而这个配置就是显示上传者的身份，一般会填写个人的GitHub相关的信息，比如GitHub用户名和注册邮箱。乱写也是🆗的。

```
$ git config -l  ===  git config --list
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

还有一个local参数，即为单独仓库配置单独的上传者身份。
global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
```

## 修改global配置
简单粗暴：直接使用命令git config --global user.name "Your Name"。。。。
修改配置.gitconfig文件。

## 配置SSH-Key
提交代码需要的github权限，下载私有仓库代码时也会需要这个配置，主要在于上传代码，不配置就会每次输入账户和密码。

如果你想要使用 SSH url 克隆的话，你必须是这个项目的拥有者。否则你是无法添加 SSH key 的。
使用https url很好用？？？

### https 和 SSH 的区别：
1、前者可以随意克隆github上的项目，而不管是谁的；而后者则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key ，否则无法克隆。

2、https url 在push的时候是需要验证用户名和密码的；而 SSH 在push的时候，是不需要输入用户名的，如果配置SSH key的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。

```
ssh -T git@github.com    查看是否配置好
ssh-keygen -t rsa -C "邮件地址"
```

代码参数含义：

-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。

以上代码省略了 -f 参数，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。
接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码），

当然，你也可以不输入密码，直接按回车。那么push的时候就不需要输入密码（推荐），直接提交到github上了。




[TOC]

# git入门知识汇总

# 0、前言
## 配置一个完整的环境简单步骤
```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
ssh-keygen -t rsa -C "邮件地址"
拷贝生成的公钥到git的ssh钥匙中：/root/.ssh/id_rsa.pub
```

## 0-1、安装git

使用镜像网站不错。
[下载Windows下的Git命令行客户端](https://repo.huaweicloud.com/git-for-windows/)
[下载Windows下的Git小海龟客户端](https://repo.huaweicloud.com/tortoisegit/)

1、 先安装Git.exe
2、 再安装TortoiseGit.msi
3、 根据自己喜欢安装中文翻译补丁包LanguagePack



git update-git-for-windows   更新git客户端

## 0-2、解决TortoiseGit文件夹和文件状态图标不显示问题

- 先重启试试
- 修改注册表
- 设置里面设置显示icon overlays

# 1、使用git下载单个指定的文件夹

更多搜索“稀疏检出”。



```
稀疏检出恢复：

SC_FILE=.git/info/sparse-checkout
echo "Undoing sparse checkout"

# Get the full tree back

echo "*" > $SC_FILE
git config core.sparsecheckout true
git read-tree --reset -u HEAD

# Wipe out all traces of sparse checkout support

rm -rf $SC_FILE
git config core.sparsecheckout false
```





参考：https://www.cnblogs.com/zhoudaxiaa/p/8670481.html

方法一：http://zhoudaxiaa.gitee.io/downgit/#/home

方法二：

在Git1.7.0以前，这无法实现，但是幸运的是在Git1.7.0以后加入了Sparse Checkout模式，这使得Check Out指定文件或者文件夹成为可能。

**举个例子：**

> 现在有一个**test**仓库https://github.com/mygithub/test
> 你要gitclone里面的**tt**子目录：
> 在本地的硬盘位置打开**Git Bash**

```
git init test && cd test     //新建仓库并进入文件夹
git config core.sparsecheckout true //设置允许克隆子目录

echo 'tt*' >> .git/info/sparse-checkout //设置要克隆的仓库的子目录路径   //空格别漏

git remote add origin git@github.com:mygithub/test.git  //这里换成你要克隆的项目和库

git pull origin master    //下载
```

 https://blog.csdn.net/qq_35860352/article/details/80313078 不行

## 下载指定分支

git clone -b branch git@github.com:github/test.git 



**重点看这里**：

# 2、git add命令参数说明

git add -u：将文件的修改、文件的删除，添加到暂存区。
git add .：将文件的修改，文件的新建，添加到暂存区。
git add -A：将文件的修改，文件的删除，文件的新建，添加到暂存区。

-u就是update的意思，只会标记本地有改动（包括删除和修改）的已经追踪的文件

\1.  git add -A   保存所有的修改

\2.  git add .     保存新的添加和修改，但是不包括删除

\3.  git add -u   保存修改和删除，但是不包括新建文件。



# 3、git push 的 -u 参数具体适合含义？

一般只有同时存在多个远程仓库时才会用到--set-upstream。每个git branch可以有个对应的upstream。假设你有两个upstream，分别叫server1和server2，本地master branch的upstream是server1上的master，那么当你不带参数直接输入git pull或者git push时，默认是对server1进行pull/push。如果你成功运行"git push -u server2 master"，那么除了本地branch会被push到server2之外，还会把server2设置成upstream。



```
-u, --set-upstream
For every branch that is up to date or successfully pushed, add upstream (tracking) reference, used by argument-less git-pull(1) and other commands.
```

upstream不是针对远程仓库的，而是针对branch的，这一点应了那位童鞋所说的第二句话。但是upstream和有几个远程库没有必然联系。比如远程库A上有3个分支branch1、branch2、branch3。远程库B上有3个分支branchx、branchy、branchz。本地仓库有2个分支local1和local2。那么当初始状态时，local1和local2和任何一个分支都没有关联，也就是没有upstream。当通过git branch --set-upstream-to A/branch1 local1命令执行后，会给local1和branch1两个分支建立关联，也就是说local1的upstream指向的是branch1。这样的好处就是在local1分支上执行git push（git pull同理）操作时不用附加其它参数，Git就会自动将local1分支上的内容push到branch1上去。同样，local2分支也可以和远程库A和远程库B上的任何一个分支建立关联，只要给local2分支设置了upstream，就可以在local2分支上用git push（git pull同理）方便地与目标分支推拉数据。

综上所述，upstream与有几个远程库没有关系，它是分支与分支之间的流通道。

再来说说git push -u和git branch --set-upstream-to指令之间的区别。

举个例子：我要把本地分支mybranch1与远程仓库origin里的分支mybranch1建立关联。

（如果使用下列途径1的话，首先，你要切换到mybranch1分支上（git checkout mybranch1））

两个途径：1. git push -u origin mybranch1  2. git branch --set-upstream-to=origin/mybranch1 mybranch1

这两种方式都可以达到目的。但是1方法更通用，因为你的远程库有可能并没有mybranch1分支，这种情况下你用2方法就不可行，连目标分支都不存在，怎么进行关联呢？所以可以总结一下：git push -u origin mybranch1 相当于 git push origin mybranch1 + git branch --set-upstream-to=origin/mybranch1 mybranch1



# 4、分支管理

```
git branch 查看本地分支
git branch -r 查看远程分支
git branch -a 查看所有分支
git checkout [Bname] 切换分支
git push origin [Bname] 将空分支上传可以看作删除远程分支
git push origin --delete [Bname] 删除远程分支
git ls-remote origin [Bname] 查看远程仓库是否有这个分支，有就有返回值，没有就什么都没有
git remote [-v] 查看远程仓库地址
git branch -m oldBranchName newBranchName 重命名
```

## 4-1、删除分支

```
git branch -d [本地分支名]
git branch -D [本地分支名]
git branch -r -D [远程分支名]
```

## 4-2、合并分支

1. git pull (git checkout -b newBname Bname)



一、开发分支（dev）上的代码达到上线的标准后，要合并到 master 分支

```
git checkout dev
git pull
git checkout master
git merge dev
git push -u origin master
```

二、当master代码改动了，需要更新开发分支（dev）上的代码

```
git checkout master 
git pull 
git checkout dev
git merge master 
git push -u origin dev
```

## 4-3、远程分支覆盖本地分支

有时候同一个分支，远程的和本地的都被修改的面目全非了，如果想要把本地的替换成远程的，用下面的命令

git fetch --all
git reset --hard origin/master (这里master要修改为对应的分支名)
git pull

# 5、git冲突

当上传的时候产生冲突时：

## 5-1、在线git解决

方便快捷操作简单。

## 5-2、检出，在本地审查和合并

- git pull origin 分支（生产冲突文件）
- 在冲突文件里修改：删除和保留（git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容（数量为7））
- git add 冲突文件
- git commit
- git push


Step 1. 获取并检出此合并请求的分支

git fetch origin
git checkout -b [bName] origin/冲突分支

Step 2. 本地审查变更（忽略）

Step 3. 合并分支并修复出现的任何冲突

git checkout master
git merge --no-ff [bName]（本地就有冲突文件了，注意看产生冲突的文件）

Step 4. 推送合并的结果到 GitLab

git checkout -b [newBName]

git push origin [newBName]

# 6、git commit

### 修改commit内容
当我们想要对上一次的提交进行修改时，我们可以使用git commit –amend命令。git commit –amend既可以对上次提交的内容进行修改，也可以修改提交说明。

如果有新的文件修改，需要合并到最近一次提交的commit里面，也可以使用上面命令直接修改即可。


> git commit --amend -no-edit

git status
git log
git show

### 6-1、删除commit

> git reset HEAD^    删除最新commit记录

### 6-2、误删除commit

- git reflog
- git reset commitId

# 7、多个commit合并(git rebase)  

实战中终于理解这条命令的作用。当我们在合并请求时又双叒叕发现一个小错误，又不得不commit一次，真想删除分支全部重新提交。但是commit是可以合并的。
[git 几个commit点合并成一个commit点](https://blog.csdn.net/u013276277/article/details/82470177)

- 1、git status当前所有修改是否都commit。如果没有后面rebase无法继续。
- 2、git log查看commitId
- 3、git rebase -i commitId（commitId是合并后的commitId的前一个）**即不影响的log**
- 4、**将删除的commit记录前面的pick改为squash，保存退出**
- 5、修改commit内容
- 6、git log查看合并结果 
- 7、git push origin [Bname] -f 可能提交会产生冲突，建议强制

  (use "git rebase --edit-todo" to view and edit)
You are currently editing a commit while rebasing branch 'hejian' on 'ddd330e'.
  (use "git commit --amend" to amend the current commit)
  (use "git rebase --continue" once you are satisfied with your changes)

# 8、如何切换分支并且改变其修改的不同的内容

就是本地像远程分支管理一样，不同分支不同的内容。但是实践看到都是一样的，后来发现姿势不对。

### 实验

```
mkdir Github   本地Github文件夹
cd Github
git init
vi helloworld.txt
	wuli github
git branch father    
git add .
git commit -m"add txt"
git checkout -b son   注意:这种创建分支的方式是将当前的分支复制到了新分支，因此尽量在修改代码前创建分支

vi helloworld.txt
	wuli github
	yes,you are right
git add .
git commit -m"update"
git log
	add txt
	update
git checkout father
git log
	add txt			这时候发现commit日志会出现不同。并且helloworld文件的内容也会随切换不同分支而改变
```

注意：当两个分支前面的commit日志一模一样的时候，是可以随意切换checkout的，但是不同的时候是需要先commit才能切换，stash也能解决这个问题。

总结：远程和本地一样，这就为啥有个叫本地仓库的概念了，本地修改了内容尽量commit到本地，只有commit了才会切换分支看到效果。

# 9、stash的作用

[stash —— 一个极度实用的Git操作](https://www.jianshu.com/p/fcf69e2d3e6b)
git stash   藏好代码
git stash list  

- git stash pop  [stash@{0}] （删除stash记录）
- git stash apply （不删除stash记录）

好习惯：master作为备份更新，第一步是创建新分支。当有新问题的时候，stash后去master分支创建新分支。

上面的commit一定是最新的。



超级好用：

git stash

git stash pop

git stash list

git stash -h



# 10、Git 全局设置（必须）

```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
```

- git config --list     查看配置信息
- git config -l
- git config --local -l
- git config --global -l

# 11、回退命令（放弃所有本地修改）

```
git reflog
git reset --hard 7edb984	放弃修改
git reset --soft 7edb984 	回到commit之前
git checkout -- filename	撤销文件的修改
HEAD
HEAD~3
commit_id

强推到远程
git push origin HEAD --force

```

可引用git checkout或者用git clean -df至修改前的状态。就可以放弃所有修改。

1、git checkout功能是本地所有修改的。没有的提交的，都返回到原来的状态

2、git stash功能是把所有没有提交的修改暂存到stash里面。可用git stash [pop](https://www.baidu.com/s?wd=pop&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)回复。

3、git reset --hard HASH功能是返回到某个节点，不保留修改。

4、git reset --soft HASH功能是返回到某个节点。保留修改。

5、git clean -df功能是保留修改，返回到某个节点。

**拓展资料**：

1、Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

[![img](https://img3.mukewang.com/5c773adf000145dc06000425.jpg)](https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7acb0a46f21fbe094c3be72c66600c338744ada4.jpg)

2、Torvalds 开始着手开发 Git 是为了作为一种过渡方案来替代 BitKeeper，后者之前一直是 Linux 内核开发人员在全球使用的主要源代码工具。开放源码社区中的有些人觉得BitKeeper 的许可证并不适合开放源码社区的工作，因此 Torvalds 决定着手研究许可证更为灵活的版本控制系统。尽管最初 Git 的开发是为了辅助 Linux 内核开发的过程，但是我们已经发现在很多其他自由软件项目中也使用了 Git。例如 很多 Freedesktop 的项目迁移到了 Git 上。



# # 12、Updates were rejected because the tip of your current branch is behind

1.使用强制push的方法：

$ git push -u origin master -f 

这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

2.push前先将远程repository修改pull下来

$ git pull origin master

$ git push -u origin master   （后续就是解决冲突）



# 13、git clean 的用法（如何使用Git删除新增的文件？）

git clean命令用来从你的工作目录中删除所有没有track过的文件
git clean经常和git reset --hard一起使用. 记住reset只影响被track过的文件, 所以需要clean来删除没有track过的文件. 结合使用这两个命令能让你的工作目录完全回到一个指定的的状态

```
git clean -n
```

是一次clean的演习, 告诉你哪些文件会被删除. 记住它不会真正地删除文件, 只是一个提醒。

```
git clean -f
```

删除当前目录下所有没有track过的文件. 它不会删除 .gitignore 文件里指定的文件夹和文件, 不管这些文件有没有被track过

```
git clean -f <path>
```

删除指定路径下的没有被track过的文件

```
git clean -df
```

删除当前目录下没有被track过的文件和文件夹

```
git clean -xf
```

删除当前目录下所有没有track过的文件. 不管它是否是 .gitignore 文件里面指定的文件夹和文件

`git reset --hard` 和 `git clean -f` 是一对好基友. 结合使用它们能让你的工作目录完全回退到最近一次commit的时候

`git clean` 对于刚编译过的项目也非常有用. 如, 它能轻易删除掉编译后生成的 .o 和 .exe 等文件. 这个在打包要发布一个release的时候非常有用

下面的例子要删除所有工作目录下面的修改, 包括新添加的文件. 假设你已经提交了一些快照了, 而且做了一些新的开发

```
git reset --hard

git clean -df
```

运行后, 工作目录和缓存区回到最近一次commit时候一摸一样的状态，git status会告诉你这是一个干净的工作目录, 又是一个新的开始了！

## 其他

--force
--hard
--soft
-d  等价于  --delete
-u  表示：
加了参数-u后，以后即可直接用git push 代替git push origin master
在git add -u中表示添加此次修改的全部原先存在的文件（即新建的不会添加 --update）。

```
1) 远程仓库相关命令
检出仓库：$ git clone git://github.com/jquery/jquery.git
查看远程仓库：$ git remote -v
添加远程仓库：$ git remote add [name] [url]
删除远程仓库：$ git remote rm [name]
修改远程仓库：$ git remote set-url --push[name][newUrl]
拉取远程仓库：$ git pull [remoteName] [localBranchName]
推送远程仓库：$ git push [remoteName] [localBranchName]
 
2）分支(branch)操作相关命令
查看本地分支：$ git branch
查看远程分支：$ git branch -r
创建本地分支：$ git branch [name] ----注意新分支创建后不会自动切换为当前分支
切换分支：$ git checkout [name]
创建新分支并立即切换到新分支：$ git checkout -b [name]
删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：$ git merge [name] ----将名称为[name]的分支与当前分支合并
创建远程分支(本地分支push到远程)：$ git push origin [name]
删除远程分支：$ git push origin :heads/[name]
```



## mintty.exe.stackdump文件

关于Git bash在win10重装系统情况下闪退并生成mintty.exe.stackdump文件的问题

总结：我也是在git commit时闪退产生了这个文件。试了几次同样的commit内容一直闪退，原因可能是中文时输入英文字母按回车键后闪退，然后在输入英文时shift切换没有闪退情况。我的问题不大，不能解决闪退网上有很多解决方法。





# 哭笑不得：git branch -a看不见一个分支

如果是下载项目就不要使用`git init test && cd test`初始化。

使用`git clone git@git.com master`下载项目后，会在当前目录下新建文件夹master并将项目下载这个目录下。

由于先前init初始化后，导致没有进入项目的文件夹中，使用git branch -a看不见任何分支。













更新服务端的分支到本地仓库
git fetch --all
列出所有的分支
git branch --all
切换到一个已有的分支
git checkout <您的分支名>
基于当前分支新建一个分支
git checkout -b <您的新分支名>
推送当前分支到服务端
git push origin <您的分支名>
删除本地的一个分支（当前所在分支和要删除的分支不能相同）
git branch -D <您的分支名>
删除服务端的一个分支
git push origin :<您的分支名>





应该右上角会有ssh和https转换，然而并没有。但是两者使用是一样的。
git clone -b gitbhttps://github.com/HanKin2015/GitBook.git

2. 远程分支重命名 (已经推送远程-假设本地分支和远程对应分支名称相同)
   a. 重命名远程分支对应的本地分支

git branch -m oldName newName
b. 删除远程分支

git push --delete origin oldName
c. 上传新命名的本地分支

git push origin newName
d.把修改后的本地分支与远程分支关联

git branch --set-upstream-to origin/newName



http://issuecdn.baidupcs.com/issue/netdisk/yunguanjia/BaiduNetdisk_6.8.1.3.exe


## Git 恢复本地误删的文件
起因：git clone下来的项目不久后就自动出现修改的红色感叹号标志，实际什么都没有做。后来猜测应该是杀毒软件之类的给我自动删除了，后来还真是。使用恢复方法恢复后，一会儿又给我删除了，要么关闭杀毒软件或者添加信任。

使用git pull --force强制拉取

正确的打开方式：
```
git reset HEAD 文件或文件夹
git checkout 文件或文件夹
```


## 14、进阶
### .gitignore
一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。来看一个实际的例子：
$ cat .gitignore
*.[oa]
*~
第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本。第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。

### 打patch
生成patch：
git format-patch commitID -1 生成当前commitID 的patch
git format-patch commitID -3 从当前commitID开始往下生成总共三个commit的patch文件
应用patch：
git apply --check xxx.patch 检查当前patch是否可以成功打入
git apply xxx.patch
git apply *.patch 同时打入所有patch

### 自定义别名（更高级的git log）
```
alias lg="git log --graph --pretty=format:’'Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit "
```

### git子模块使用
一个大型工程总会被分拆为一些子工程,git-submodule 就是完成这样一种子工程拆分与整合的工具.

添加一个子工程
git submodule add git@xxxx:subproj.git subproj
git commit -m “submodule added”

克隆一个带submodule的git仓库
git clone git@domain.com:massproj.git
git submodule init
git submodule update
或者
git clone --rescursive git@domain.com:massproj.git


查看修改的文件
git log --stat

查看commitID的具体修改
git log -p

查看文件最后的修改人
git blame -L 起始行号,结束行号



# git学习笔记

# 1、下载安装git
>sudo apt install git

明白为啥使用sudo而不是直接root账户，防止错误操作，sudo进一步确认了一下。

Windows下载安装很随意。有个注意点：尽量选择下载和上传git仓库的时候不要进行Linux和Windows的换行符的转换，否则在不同环境下运行代码的时候很尴尬。

# 2、配置
## 配置家门，即上传者的身份
设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。以前并没有觉得多大作用，慢慢地发现一个git仓库是可以多人上传的，而这个配置就是显示上传者的身份，一般会填写个人的GitHub相关的信息，比如GitHub用户名和注册邮箱。乱写也是🆗的。

```
$ git config -l  ===  git config --list
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

还有一个local参数，即为单独仓库配置单独的上传者身份。
global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
```

## 修改global配置
简单粗暴：直接使用命令git config --global user.name "Your Name"。。。。
修改配置.gitconfig文件。

## 配置SSH-Key
提交代码需要的github权限，下载私有仓库代码时也会需要这个配置，主要在于上传代码，不配置就会每次输入账户和密码。

如果你想要使用 SSH url 克隆的话，你必须是这个项目的拥有者。否则你是无法添加 SSH key 的。
使用https url很好用？？？

### https 和 SSH 的区别：
1、前者可以随意克隆github上的项目，而不管是谁的；而后者则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key ，否则无法克隆。

2、https url 在push的时候是需要验证用户名和密码的；而 SSH 在push的时候，是不需要输入用户名的，如果配置SSH key的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。

```
ssh -T git@github.com    查看是否配置好
ssh-keygen -t rsa -C "邮件地址"
```

代码参数含义：

-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。

以上代码省略了 -f 参数，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。
接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码），

当然，你也可以不输入密码，直接按回车。那么push的时候就不需要输入密码（推荐），直接提交到github上了。




[TOC]

# git入门知识汇总

# 0、前言
## 配置一个完整的环境简单步骤
```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
ssh-keygen -t rsa -C "邮件地址"
拷贝生成的公钥到git的ssh钥匙中：/root/.ssh/id_rsa.pub
```

## 0-1、安装git

使用镜像网站不错。
[下载Windows下的Git命令行客户端](https://repo.huaweicloud.com/git-for-windows/)
[下载Windows下的Git小海龟客户端](https://repo.huaweicloud.com/tortoisegit/)

1、 先安装Git.exe
2、 再安装TortoiseGit.msi
3、 根据自己喜欢安装中文翻译补丁包LanguagePack



git update-git-for-windows   更新git客户端

## 0-2、解决TortoiseGit文件夹和文件状态图标不显示问题

- 先重启试试
- 修改注册表
- 设置里面设置显示icon overlays

# 1、使用git下载单个指定的文件夹

更多搜索“稀疏检出”。



```
稀疏检出恢复：

SC_FILE=.git/info/sparse-checkout
echo "Undoing sparse checkout"

# Get the full tree back

echo "*" > $SC_FILE
git config core.sparsecheckout true
git read-tree --reset -u HEAD

# Wipe out all traces of sparse checkout support

rm -rf $SC_FILE
git config core.sparsecheckout false
```





参考：https://www.cnblogs.com/zhoudaxiaa/p/8670481.html

方法一：http://zhoudaxiaa.gitee.io/downgit/#/home

方法二：

在Git1.7.0以前，这无法实现，但是幸运的是在Git1.7.0以后加入了Sparse Checkout模式，这使得Check Out指定文件或者文件夹成为可能。

**举个例子：**

> 现在有一个**test**仓库https://github.com/mygithub/test
> 你要gitclone里面的**tt**子目录：
> 在本地的硬盘位置打开**Git Bash**

```
git init test && cd test     //新建仓库并进入文件夹
git config core.sparsecheckout true //设置允许克隆子目录

echo 'tt*' >> .git/info/sparse-checkout //设置要克隆的仓库的子目录路径   //空格别漏

git remote add origin git@github.com:mygithub/test.git  //这里换成你要克隆的项目和库

git pull origin master    //下载
```

 https://blog.csdn.net/qq_35860352/article/details/80313078 不行

## 下载指定分支

git clone -b branch git@github.com:github/test.git 



**重点看这里**：

# 2、git add命令参数说明

git add -u：将文件的修改、文件的删除，添加到暂存区。
git add .：将文件的修改，文件的新建，添加到暂存区。
git add -A：将文件的修改，文件的删除，文件的新建，添加到暂存区。

-u就是update的意思，只会标记本地有改动（包括删除和修改）的已经追踪的文件

\1.  git add -A   保存所有的修改

\2.  git add .     保存新的添加和修改，但是不包括删除

\3.  git add -u   保存修改和删除，但是不包括新建文件。



# 3、git push 的 -u 参数具体适合含义？

一般只有同时存在多个远程仓库时才会用到--set-upstream。每个git branch可以有个对应的upstream。假设你有两个upstream，分别叫server1和server2，本地master branch的upstream是server1上的master，那么当你不带参数直接输入git pull或者git push时，默认是对server1进行pull/push。如果你成功运行"git push -u server2 master"，那么除了本地branch会被push到server2之外，还会把server2设置成upstream。



```
-u, --set-upstream
For every branch that is up to date or successfully pushed, add upstream (tracking) reference, used by argument-less git-pull(1) and other commands.
```

upstream不是针对远程仓库的，而是针对branch的，这一点应了那位童鞋所说的第二句话。但是upstream和有几个远程库没有必然联系。比如远程库A上有3个分支branch1、branch2、branch3。远程库B上有3个分支branchx、branchy、branchz。本地仓库有2个分支local1和local2。那么当初始状态时，local1和local2和任何一个分支都没有关联，也就是没有upstream。当通过git branch --set-upstream-to A/branch1 local1命令执行后，会给local1和branch1两个分支建立关联，也就是说local1的upstream指向的是branch1。这样的好处就是在local1分支上执行git push（git pull同理）操作时不用附加其它参数，Git就会自动将local1分支上的内容push到branch1上去。同样，local2分支也可以和远程库A和远程库B上的任何一个分支建立关联，只要给local2分支设置了upstream，就可以在local2分支上用git push（git pull同理）方便地与目标分支推拉数据。

综上所述，upstream与有几个远程库没有关系，它是分支与分支之间的流通道。

再来说说git push -u和git branch --set-upstream-to指令之间的区别。

举个例子：我要把本地分支mybranch1与远程仓库origin里的分支mybranch1建立关联。

（如果使用下列途径1的话，首先，你要切换到mybranch1分支上（git checkout mybranch1））

两个途径：1. git push -u origin mybranch1  2. git branch --set-upstream-to=origin/mybranch1 mybranch1

这两种方式都可以达到目的。但是1方法更通用，因为你的远程库有可能并没有mybranch1分支，这种情况下你用2方法就不可行，连目标分支都不存在，怎么进行关联呢？所以可以总结一下：git push -u origin mybranch1 相当于 git push origin mybranch1 + git branch --set-upstream-to=origin/mybranch1 mybranch1



# 4、分支管理

```
git branch 查看本地分支
git branch -r 查看远程分支
git branch -a 查看所有分支
git checkout [Bname] 切换分支
git push origin [Bname] 将空分支上传可以看作删除远程分支
git push origin --delete [Bname] 删除远程分支
git ls-remote origin [Bname] 查看远程仓库是否有这个分支，有就有返回值，没有就什么都没有
git remote [-v] 查看远程仓库地址
git branch -m oldBranchName newBranchName 重命名
```

## 4-1、删除分支

```
git branch -d [本地分支名]
git branch -D [本地分支名]
git branch -r -D [远程分支名]
```

## 4-2、合并分支

1. git pull (git checkout -b newBname Bname)



一、开发分支（dev）上的代码达到上线的标准后，要合并到 master 分支

```
git checkout dev
git pull
git checkout master
git merge dev
git push -u origin master
```

二、当master代码改动了，需要更新开发分支（dev）上的代码

```
git checkout master 
git pull 
git checkout dev
git merge master 
git push -u origin dev
```

## 4-3、远程分支覆盖本地分支

有时候同一个分支，远程的和本地的都被修改的面目全非了，如果想要把本地的替换成远程的，用下面的命令

git fetch --all
git reset --hard origin/master (这里master要修改为对应的分支名)
git pull

# 5、git冲突

当上传的时候产生冲突时：

## 5-1、在线git解决

方便快捷操作简单。

## 5-2、检出，在本地审查和合并

- git pull origin 分支（生产冲突文件）
- 在冲突文件里修改：删除和保留（git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容（数量为7））
- git add 冲突文件
- git commit
- git push


Step 1. 获取并检出此合并请求的分支

git fetch origin
git checkout -b [bName] origin/冲突分支

Step 2. 本地审查变更（忽略）

Step 3. 合并分支并修复出现的任何冲突

git checkout master
git merge --no-ff [bName]（本地就有冲突文件了，注意看产生冲突的文件）

Step 4. 推送合并的结果到 GitLab

git checkout -b [newBName]

git push origin [newBName]

# 6、git commit

### 修改commit内容
当我们想要对上一次的提交进行修改时，我们可以使用git commit –amend命令。git commit –amend既可以对上次提交的内容进行修改，也可以修改提交说明。

如果有新的文件修改，需要合并到最近一次提交的commit里面，也可以使用上面命令直接修改即可。


> git commit --amend -no-edit

git status
git log
git show

### 6-1、删除commit

> git reset HEAD^    删除最新commit记录

### 6-2、误删除commit

- git reflog
- git reset commitId

# 7、多个commit合并(git rebase)  

实战中终于理解这条命令的作用。当我们在合并请求时又双叒叕发现一个小错误，又不得不commit一次，真想删除分支全部重新提交。但是commit是可以合并的。
[git 几个commit点合并成一个commit点](https://blog.csdn.net/u013276277/article/details/82470177)

- 1、git status当前所有修改是否都commit。如果没有后面rebase无法继续。
- 2、git log查看commitId
- 3、git rebase -i commitId（commitId是合并后的commitId的前一个）**即不影响的log**
- 4、**将删除的commit记录前面的pick改为squash，保存退出**
- 5、修改commit内容
- 6、git log查看合并结果 
- 7、git push origin [Bname] -f 可能提交会产生冲突，建议强制

  (use "git rebase --edit-todo" to view and edit)
You are currently editing a commit while rebasing branch 'hejian' on 'ddd330e'.
  (use "git commit --amend" to amend the current commit)
  (use "git rebase --continue" once you are satisfied with your changes)

# 8、如何切换分支并且改变其修改的不同的内容

就是本地像远程分支管理一样，不同分支不同的内容。但是实践看到都是一样的，后来发现姿势不对。

### 实验

```
mkdir Github   本地Github文件夹
cd Github
git init
vi helloworld.txt
	wuli github
git branch father    
git add .
git commit -m"add txt"
git checkout -b son   注意:这种创建分支的方式是将当前的分支复制到了新分支，因此尽量在修改代码前创建分支

vi helloworld.txt
	wuli github
	yes,you are right
git add .
git commit -m"update"
git log
	add txt
	update
git checkout father
git log
	add txt			这时候发现commit日志会出现不同。并且helloworld文件的内容也会随切换不同分支而改变
```

注意：当两个分支前面的commit日志一模一样的时候，是可以随意切换checkout的，但是不同的时候是需要先commit才能切换，stash也能解决这个问题。

总结：远程和本地一样，这就为啥有个叫本地仓库的概念了，本地修改了内容尽量commit到本地，只有commit了才会切换分支看到效果。

# 9、stash的作用

[stash —— 一个极度实用的Git操作](https://www.jianshu.com/p/fcf69e2d3e6b)
git stash   藏好代码
git stash list  

- git stash pop  [stash@{0}] （删除stash记录）
- git stash apply （不删除stash记录）

好习惯：master作为备份更新，第一步是创建新分支。当有新问题的时候，stash后去master分支创建新分支。

上面的commit一定是最新的。



超级好用：

git stash

git stash pop

git stash list

git stash -h



# 10、Git 全局设置（必须）

```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
```

- git config --list     查看配置信息
- git config -l
- git config --local -l
- git config --global -l

# 11、回退命令（放弃所有本地修改）

```
git reflog
git reset --hard 7edb984	放弃修改
git reset --soft 7edb984 	回到commit之前
git checkout -- filename	撤销文件的修改
HEAD
HEAD~3
commit_id

强推到远程
git push origin HEAD --force

```

可引用git checkout或者用git clean -df至修改前的状态。就可以放弃所有修改。

1、git checkout功能是本地所有修改的。没有的提交的，都返回到原来的状态

2、git stash功能是把所有没有提交的修改暂存到stash里面。可用git stash [pop](https://www.baidu.com/s?wd=pop&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)回复。

3、git reset --hard HASH功能是返回到某个节点，不保留修改。

4、git reset --soft HASH功能是返回到某个节点。保留修改。

5、git clean -df功能是保留修改，返回到某个节点。

**拓展资料**：

1、Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

[![img](https://img3.mukewang.com/5c773adf000145dc06000425.jpg)](https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7acb0a46f21fbe094c3be72c66600c338744ada4.jpg)

2、Torvalds 开始着手开发 Git 是为了作为一种过渡方案来替代 BitKeeper，后者之前一直是 Linux 内核开发人员在全球使用的主要源代码工具。开放源码社区中的有些人觉得BitKeeper 的许可证并不适合开放源码社区的工作，因此 Torvalds 决定着手研究许可证更为灵活的版本控制系统。尽管最初 Git 的开发是为了辅助 Linux 内核开发的过程，但是我们已经发现在很多其他自由软件项目中也使用了 Git。例如 很多 Freedesktop 的项目迁移到了 Git 上。



# # 12、Updates were rejected because the tip of your current branch is behind

1.使用强制push的方法：

$ git push -u origin master -f 

这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

2.push前先将远程repository修改pull下来

$ git pull origin master

$ git push -u origin master   （后续就是解决冲突）



# 13、git clean 的用法（如何使用Git删除新增的文件？）

git clean命令用来从你的工作目录中删除所有没有track过的文件
git clean经常和git reset --hard一起使用. 记住reset只影响被track过的文件, 所以需要clean来删除没有track过的文件. 结合使用这两个命令能让你的工作目录完全回到一个指定的的状态

```
git clean -n
```

是一次clean的演习, 告诉你哪些文件会被删除. 记住它不会真正地删除文件, 只是一个提醒。

```
git clean -f
```

删除当前目录下所有没有track过的文件. 它不会删除 .gitignore 文件里指定的文件夹和文件, 不管这些文件有没有被track过

```
git clean -f <path>
```

删除指定路径下的没有被track过的文件

```
git clean -df
```

删除当前目录下没有被track过的文件和文件夹

```
git clean -xf
```

删除当前目录下所有没有track过的文件. 不管它是否是 .gitignore 文件里面指定的文件夹和文件

`git reset --hard` 和 `git clean -f` 是一对好基友. 结合使用它们能让你的工作目录完全回退到最近一次commit的时候

`git clean` 对于刚编译过的项目也非常有用. 如, 它能轻易删除掉编译后生成的 .o 和 .exe 等文件. 这个在打包要发布一个release的时候非常有用

下面的例子要删除所有工作目录下面的修改, 包括新添加的文件. 假设你已经提交了一些快照了, 而且做了一些新的开发

```
git reset --hard

git clean -df
```

运行后, 工作目录和缓存区回到最近一次commit时候一摸一样的状态，git status会告诉你这是一个干净的工作目录, 又是一个新的开始了！

## 其他

--force
--hard
--soft
-d  等价于  --delete
-u  表示：
加了参数-u后，以后即可直接用git push 代替git push origin master
在git add -u中表示添加此次修改的全部原先存在的文件（即新建的不会添加 --update）。

```
1) 远程仓库相关命令
检出仓库：$ git clone git://github.com/jquery/jquery.git
查看远程仓库：$ git remote -v
添加远程仓库：$ git remote add [name] [url]
删除远程仓库：$ git remote rm [name]
修改远程仓库：$ git remote set-url --push[name][newUrl]
拉取远程仓库：$ git pull [remoteName] [localBranchName]
推送远程仓库：$ git push [remoteName] [localBranchName]
 
2）分支(branch)操作相关命令
查看本地分支：$ git branch
查看远程分支：$ git branch -r
创建本地分支：$ git branch [name] ----注意新分支创建后不会自动切换为当前分支
切换分支：$ git checkout [name]
创建新分支并立即切换到新分支：$ git checkout -b [name]
删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：$ git merge [name] ----将名称为[name]的分支与当前分支合并
创建远程分支(本地分支push到远程)：$ git push origin [name]
删除远程分支：$ git push origin :heads/[name]
```



## mintty.exe.stackdump文件

关于Git bash在win10重装系统情况下闪退并生成mintty.exe.stackdump文件的问题

总结：我也是在git commit时闪退产生了这个文件。试了几次同样的commit内容一直闪退，原因可能是中文时输入英文字母按回车键后闪退，然后在输入英文时shift切换没有闪退情况。我的问题不大，不能解决闪退网上有很多解决方法。





# 哭笑不得：git branch -a看不见一个分支

如果是下载项目就不要使用`git init test && cd test`初始化。

使用`git clone git@git.com master`下载项目后，会在当前目录下新建文件夹master并将项目下载这个目录下。

由于先前init初始化后，导致没有进入项目的文件夹中，使用git branch -a看不见任何分支。













更新服务端的分支到本地仓库
git fetch --all
列出所有的分支
git branch --all
切换到一个已有的分支
git checkout <您的分支名>
基于当前分支新建一个分支
git checkout -b <您的新分支名>
推送当前分支到服务端
git push origin <您的分支名>
删除本地的一个分支（当前所在分支和要删除的分支不能相同）
git branch -D <您的分支名>
删除服务端的一个分支
git push origin :<您的分支名>





应该右上角会有ssh和https转换，然而并没有。但是两者使用是一样的。
git clone -b gitbhttps://github.com/HanKin2015/GitBook.git

2. 远程分支重命名 (已经推送远程-假设本地分支和远程对应分支名称相同)
   a. 重命名远程分支对应的本地分支

git branch -m oldName newName
b. 删除远程分支

git push --delete origin oldName
c. 上传新命名的本地分支

git push origin newName
d.把修改后的本地分支与远程分支关联

git branch --set-upstream-to origin/newName



http://issuecdn.baidupcs.com/issue/netdisk/yunguanjia/BaiduNetdisk_6.8.1.3.exe


## Git 恢复本地误删的文件
起因：git clone下来的项目不久后就自动出现修改的红色感叹号标志，实际什么都没有做。后来猜测应该是杀毒软件之类的给我自动删除了，后来还真是。使用恢复方法恢复后，一会儿又给我删除了，要么关闭杀毒软件或者添加信任。

使用git pull --force强制拉取

正确的打开方式：
```
git reset HEAD 文件或文件夹
git checkout 文件或文件夹
```


## 14、进阶
### .gitignore
一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。来看一个实际的例子：
$ cat .gitignore
*.[oa]
*~
第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本。第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。

### 打patch
生成patch：
git format-patch commitID -1 生成当前commitID 的patch
git format-patch commitID -3 从当前commitID开始往下生成总共三个commit的patch文件
应用patch：
git apply --check xxx.patch 检查当前patch是否可以成功打入
git apply xxx.patch
git apply *.patch 同时打入所有patch

### 自定义别名（更高级的git log）
```
alias lg="git log --graph --pretty=format:’'Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit "
```

### git子模块使用
一个大型工程总会被分拆为一些子工程,git-submodule 就是完成这样一种子工程拆分与整合的工具.

添加一个子工程
git submodule add git@xxxx:subproj.git subproj
git commit -m “submodule added”

克隆一个带submodule的git仓库
git clone git@domain.com:massproj.git
git submodule init
git submodule update
或者
git clone --rescursive git@domain.com:massproj.git


查看修改的文件
git log --stat

查看commitID的具体修改
git log -p

查看文件最后的修改人
git blame -L 起始行号,结束行号



# git学习笔记

# 1、下载安装git
>sudo apt install git

明白为啥使用sudo而不是直接root账户，防止错误操作，sudo进一步确认了一下。

Windows下载安装很随意。有个注意点：尽量选择下载和上传git仓库的时候不要进行Linux和Windows的换行符的转换，否则在不同环境下运行代码的时候很尴尬。

# 2、配置
## 配置家门，即上传者的身份
设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。以前并没有觉得多大作用，慢慢地发现一个git仓库是可以多人上传的，而这个配置就是显示上传者的身份，一般会填写个人的GitHub相关的信息，比如GitHub用户名和注册邮箱。乱写也是🆗的。

```
$ git config -l  ===  git config --list
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

还有一个local参数，即为单独仓库配置单独的上传者身份。
global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
```

## 修改global配置
简单粗暴：直接使用命令git config --global user.name "Your Name"。。。。
修改配置.gitconfig文件。

## 配置SSH-Key
提交代码需要的github权限，下载私有仓库代码时也会需要这个配置，主要在于上传代码，不配置就会每次输入账户和密码。

如果你想要使用 SSH url 克隆的话，你必须是这个项目的拥有者。否则你是无法添加 SSH key 的。
使用https url很好用？？？

### https 和 SSH 的区别：
1、前者可以随意克隆github上的项目，而不管是谁的；而后者则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key ，否则无法克隆。

2、https url 在push的时候是需要验证用户名和密码的；而 SSH 在push的时候，是不需要输入用户名的，如果配置SSH key的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。

```
ssh -T git@github.com    查看是否配置好
ssh-keygen -t rsa -C "邮件地址"
```

代码参数含义：

-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。

以上代码省略了 -f 参数，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。
接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码），

当然，你也可以不输入密码，直接按回车。那么push的时候就不需要输入密码（推荐），直接提交到github上了。




[TOC]

# git入门知识汇总

# 0、前言
## 配置一个完整的环境简单步骤
```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
ssh-keygen -t rsa -C "邮件地址"
拷贝生成的公钥到git的ssh钥匙中：/root/.ssh/id_rsa.pub
```

## 0-1、安装git

使用镜像网站不错。
[下载Windows下的Git命令行客户端](https://repo.huaweicloud.com/git-for-windows/)
[下载Windows下的Git小海龟客户端](https://repo.huaweicloud.com/tortoisegit/)

1、 先安装Git.exe
2、 再安装TortoiseGit.msi
3、 根据自己喜欢安装中文翻译补丁包LanguagePack



git update-git-for-windows   更新git客户端

## 0-2、解决TortoiseGit文件夹和文件状态图标不显示问题

- 先重启试试
- 修改注册表
- 设置里面设置显示icon overlays

# 1、使用git下载单个指定的文件夹

更多搜索“稀疏检出”。



```
稀疏检出恢复：

SC_FILE=.git/info/sparse-checkout
echo "Undoing sparse checkout"

# Get the full tree back

echo "*" > $SC_FILE
git config core.sparsecheckout true
git read-tree --reset -u HEAD

# Wipe out all traces of sparse checkout support

rm -rf $SC_FILE
git config core.sparsecheckout false
```





参考：https://www.cnblogs.com/zhoudaxiaa/p/8670481.html

方法一：http://zhoudaxiaa.gitee.io/downgit/#/home

方法二：

在Git1.7.0以前，这无法实现，但是幸运的是在Git1.7.0以后加入了Sparse Checkout模式，这使得Check Out指定文件或者文件夹成为可能。

**举个例子：**

> 现在有一个**test**仓库https://github.com/mygithub/test
> 你要gitclone里面的**tt**子目录：
> 在本地的硬盘位置打开**Git Bash**

```
git init test && cd test     //新建仓库并进入文件夹
git config core.sparsecheckout true //设置允许克隆子目录

echo 'tt*' >> .git/info/sparse-checkout //设置要克隆的仓库的子目录路径   //空格别漏

git remote add origin git@github.com:mygithub/test.git  //这里换成你要克隆的项目和库

git pull origin master    //下载
```

 https://blog.csdn.net/qq_35860352/article/details/80313078 不行

## 下载指定分支

git clone -b branch git@github.com:github/test.git 



**重点看这里**：

# 2、git add命令参数说明

git add -u：将文件的修改、文件的删除，添加到暂存区。
git add .：将文件的修改，文件的新建，添加到暂存区。
git add -A：将文件的修改，文件的删除，文件的新建，添加到暂存区。

-u就是update的意思，只会标记本地有改动（包括删除和修改）的已经追踪的文件

\1.  git add -A   保存所有的修改

\2.  git add .     保存新的添加和修改，但是不包括删除

\3.  git add -u   保存修改和删除，但是不包括新建文件。



# 3、git push 的 -u 参数具体适合含义？

一般只有同时存在多个远程仓库时才会用到--set-upstream。每个git branch可以有个对应的upstream。假设你有两个upstream，分别叫server1和server2，本地master branch的upstream是server1上的master，那么当你不带参数直接输入git pull或者git push时，默认是对server1进行pull/push。如果你成功运行"git push -u server2 master"，那么除了本地branch会被push到server2之外，还会把server2设置成upstream。



```
-u, --set-upstream
For every branch that is up to date or successfully pushed, add upstream (tracking) reference, used by argument-less git-pull(1) and other commands.
```

upstream不是针对远程仓库的，而是针对branch的，这一点应了那位童鞋所说的第二句话。但是upstream和有几个远程库没有必然联系。比如远程库A上有3个分支branch1、branch2、branch3。远程库B上有3个分支branchx、branchy、branchz。本地仓库有2个分支local1和local2。那么当初始状态时，local1和local2和任何一个分支都没有关联，也就是没有upstream。当通过git branch --set-upstream-to A/branch1 local1命令执行后，会给local1和branch1两个分支建立关联，也就是说local1的upstream指向的是branch1。这样的好处就是在local1分支上执行git push（git pull同理）操作时不用附加其它参数，Git就会自动将local1分支上的内容push到branch1上去。同样，local2分支也可以和远程库A和远程库B上的任何一个分支建立关联，只要给local2分支设置了upstream，就可以在local2分支上用git push（git pull同理）方便地与目标分支推拉数据。

综上所述，upstream与有几个远程库没有关系，它是分支与分支之间的流通道。

再来说说git push -u和git branch --set-upstream-to指令之间的区别。

举个例子：我要把本地分支mybranch1与远程仓库origin里的分支mybranch1建立关联。

（如果使用下列途径1的话，首先，你要切换到mybranch1分支上（git checkout mybranch1））

两个途径：1. git push -u origin mybranch1  2. git branch --set-upstream-to=origin/mybranch1 mybranch1

这两种方式都可以达到目的。但是1方法更通用，因为你的远程库有可能并没有mybranch1分支，这种情况下你用2方法就不可行，连目标分支都不存在，怎么进行关联呢？所以可以总结一下：git push -u origin mybranch1 相当于 git push origin mybranch1 + git branch --set-upstream-to=origin/mybranch1 mybranch1



# 4、分支管理

```
git branch 查看本地分支
git branch -r 查看远程分支
git branch -a 查看所有分支
git checkout [Bname] 切换分支
git push origin [Bname] 将空分支上传可以看作删除远程分支
git push origin --delete [Bname] 删除远程分支
git ls-remote origin [Bname] 查看远程仓库是否有这个分支，有就有返回值，没有就什么都没有
git remote [-v] 查看远程仓库地址
git branch -m oldBranchName newBranchName 重命名
```

## 4-1、删除分支

```
git branch -d [本地分支名]
git branch -D [本地分支名]
git branch -r -D [远程分支名]
```

## 4-2、合并分支

1. git pull (git checkout -b newBname Bname)



一、开发分支（dev）上的代码达到上线的标准后，要合并到 master 分支

```
git checkout dev
git pull
git checkout master
git merge dev
git push -u origin master
```

二、当master代码改动了，需要更新开发分支（dev）上的代码

```
git checkout master 
git pull 
git checkout dev
git merge master 
git push -u origin dev
```

## 4-3、远程分支覆盖本地分支

有时候同一个分支，远程的和本地的都被修改的面目全非了，如果想要把本地的替换成远程的，用下面的命令

git fetch --all
git reset --hard origin/master (这里master要修改为对应的分支名)
git pull

# 5、git冲突

当上传的时候产生冲突时：

## 5-1、在线git解决

方便快捷操作简单。

## 5-2、检出，在本地审查和合并

- git pull origin 分支（生产冲突文件）
- 在冲突文件里修改：删除和保留（git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容（数量为7））
- git add 冲突文件
- git commit
- git push


Step 1. 获取并检出此合并请求的分支

git fetch origin
git checkout -b [bName] origin/冲突分支

Step 2. 本地审查变更（忽略）

Step 3. 合并分支并修复出现的任何冲突

git checkout master
git merge --no-ff [bName]（本地就有冲突文件了，注意看产生冲突的文件）

Step 4. 推送合并的结果到 GitLab

git checkout -b [newBName]

git push origin [newBName]

# 6、git commit

### 修改commit内容
当我们想要对上一次的提交进行修改时，我们可以使用git commit –amend命令。git commit –amend既可以对上次提交的内容进行修改，也可以修改提交说明。

如果有新的文件修改，需要合并到最近一次提交的commit里面，也可以使用上面命令直接修改即可。


> git commit --amend -no-edit

git status
git log
git show

### 6-1、删除commit

> git reset HEAD^    删除最新commit记录

### 6-2、误删除commit

- git reflog
- git reset commitId

# 7、多个commit合并(git rebase)  

实战中终于理解这条命令的作用。当我们在合并请求时又双叒叕发现一个小错误，又不得不commit一次，真想删除分支全部重新提交。但是commit是可以合并的。
[git 几个commit点合并成一个commit点](https://blog.csdn.net/u013276277/article/details/82470177)

- 1、git status当前所有修改是否都commit。如果没有后面rebase无法继续。
- 2、git log查看commitId
- 3、git rebase -i commitId（commitId是合并后的commitId的前一个）**即不影响的log**
- 4、**将删除的commit记录前面的pick改为squash，保存退出**
- 5、修改commit内容
- 6、git log查看合并结果 
- 7、git push origin [Bname] -f 可能提交会产生冲突，建议强制

  (use "git rebase --edit-todo" to view and edit)
You are currently editing a commit while rebasing branch 'hejian' on 'ddd330e'.
  (use "git commit --amend" to amend the current commit)
  (use "git rebase --continue" once you are satisfied with your changes)

# 8、如何切换分支并且改变其修改的不同的内容

就是本地像远程分支管理一样，不同分支不同的内容。但是实践看到都是一样的，后来发现姿势不对。

### 实验

```
mkdir Github   本地Github文件夹
cd Github
git init
vi helloworld.txt
	wuli github
git branch father    
git add .
git commit -m"add txt"
git checkout -b son   注意:这种创建分支的方式是将当前的分支复制到了新分支，因此尽量在修改代码前创建分支

vi helloworld.txt
	wuli github
	yes,you are right
git add .
git commit -m"update"
git log
	add txt
	update
git checkout father
git log
	add txt			这时候发现commit日志会出现不同。并且helloworld文件的内容也会随切换不同分支而改变
```

注意：当两个分支前面的commit日志一模一样的时候，是可以随意切换checkout的，但是不同的时候是需要先commit才能切换，stash也能解决这个问题。

总结：远程和本地一样，这就为啥有个叫本地仓库的概念了，本地修改了内容尽量commit到本地，只有commit了才会切换分支看到效果。

# 9、stash的作用

[stash —— 一个极度实用的Git操作](https://www.jianshu.com/p/fcf69e2d3e6b)
git stash   藏好代码
git stash list  

- git stash pop  [stash@{0}] （删除stash记录）
- git stash apply （不删除stash记录）

好习惯：master作为备份更新，第一步是创建新分支。当有新问题的时候，stash后去master分支创建新分支。

上面的commit一定是最新的。



超级好用：

git stash

git stash pop

git stash list

git stash -h



# 10、Git 全局设置（必须）

```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
```

- git config --list     查看配置信息
- git config -l
- git config --local -l
- git config --global -l

# 11、回退命令（放弃所有本地修改）

```
git reflog
git reset --hard 7edb984	放弃修改
git reset --soft 7edb984 	回到commit之前
git checkout -- filename	撤销文件的修改
HEAD
HEAD~3
commit_id

强推到远程
git push origin HEAD --force

```

可引用git checkout或者用git clean -df至修改前的状态。就可以放弃所有修改。

1、git checkout功能是本地所有修改的。没有的提交的，都返回到原来的状态

2、git stash功能是把所有没有提交的修改暂存到stash里面。可用git stash [pop](https://www.baidu.com/s?wd=pop&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)回复。

3、git reset --hard HASH功能是返回到某个节点，不保留修改。

4、git reset --soft HASH功能是返回到某个节点。保留修改。

5、git clean -df功能是保留修改，返回到某个节点。

**拓展资料**：

1、Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

[![img](https://img3.mukewang.com/5c773adf000145dc06000425.jpg)](https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7acb0a46f21fbe094c3be72c66600c338744ada4.jpg)

2、Torvalds 开始着手开发 Git 是为了作为一种过渡方案来替代 BitKeeper，后者之前一直是 Linux 内核开发人员在全球使用的主要源代码工具。开放源码社区中的有些人觉得BitKeeper 的许可证并不适合开放源码社区的工作，因此 Torvalds 决定着手研究许可证更为灵活的版本控制系统。尽管最初 Git 的开发是为了辅助 Linux 内核开发的过程，但是我们已经发现在很多其他自由软件项目中也使用了 Git。例如 很多 Freedesktop 的项目迁移到了 Git 上。



# # 12、Updates were rejected because the tip of your current branch is behind

1.使用强制push的方法：

$ git push -u origin master -f 

这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

2.push前先将远程repository修改pull下来

$ git pull origin master

$ git push -u origin master   （后续就是解决冲突）



# 13、git clean 的用法（如何使用Git删除新增的文件？）

git clean命令用来从你的工作目录中删除所有没有track过的文件
git clean经常和git reset --hard一起使用. 记住reset只影响被track过的文件, 所以需要clean来删除没有track过的文件. 结合使用这两个命令能让你的工作目录完全回到一个指定的的状态

```
git clean -n
```

是一次clean的演习, 告诉你哪些文件会被删除. 记住它不会真正地删除文件, 只是一个提醒。

```
git clean -f
```

删除当前目录下所有没有track过的文件. 它不会删除 .gitignore 文件里指定的文件夹和文件, 不管这些文件有没有被track过

```
git clean -f <path>
```

删除指定路径下的没有被track过的文件

```
git clean -df
```

删除当前目录下没有被track过的文件和文件夹

```
git clean -xf
```

删除当前目录下所有没有track过的文件. 不管它是否是 .gitignore 文件里面指定的文件夹和文件

`git reset --hard` 和 `git clean -f` 是一对好基友. 结合使用它们能让你的工作目录完全回退到最近一次commit的时候

`git clean` 对于刚编译过的项目也非常有用. 如, 它能轻易删除掉编译后生成的 .o 和 .exe 等文件. 这个在打包要发布一个release的时候非常有用

下面的例子要删除所有工作目录下面的修改, 包括新添加的文件. 假设你已经提交了一些快照了, 而且做了一些新的开发

```
git reset --hard

git clean -df
```

运行后, 工作目录和缓存区回到最近一次commit时候一摸一样的状态，git status会告诉你这是一个干净的工作目录, 又是一个新的开始了！

## 其他

--force
--hard
--soft
-d  等价于  --delete
-u  表示：
加了参数-u后，以后即可直接用git push 代替git push origin master
在git add -u中表示添加此次修改的全部原先存在的文件（即新建的不会添加 --update）。

```
1) 远程仓库相关命令
检出仓库：$ git clone git://github.com/jquery/jquery.git
查看远程仓库：$ git remote -v
添加远程仓库：$ git remote add [name] [url]
删除远程仓库：$ git remote rm [name]
修改远程仓库：$ git remote set-url --push[name][newUrl]
拉取远程仓库：$ git pull [remoteName] [localBranchName]
推送远程仓库：$ git push [remoteName] [localBranchName]
 
2）分支(branch)操作相关命令
查看本地分支：$ git branch
查看远程分支：$ git branch -r
创建本地分支：$ git branch [name] ----注意新分支创建后不会自动切换为当前分支
切换分支：$ git checkout [name]
创建新分支并立即切换到新分支：$ git checkout -b [name]
删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：$ git merge [name] ----将名称为[name]的分支与当前分支合并
创建远程分支(本地分支push到远程)：$ git push origin [name]
删除远程分支：$ git push origin :heads/[name]
```



## mintty.exe.stackdump文件

关于Git bash在win10重装系统情况下闪退并生成mintty.exe.stackdump文件的问题

总结：我也是在git commit时闪退产生了这个文件。试了几次同样的commit内容一直闪退，原因可能是中文时输入英文字母按回车键后闪退，然后在输入英文时shift切换没有闪退情况。我的问题不大，不能解决闪退网上有很多解决方法。





# 哭笑不得：git branch -a看不见一个分支

如果是下载项目就不要使用`git init test && cd test`初始化。

使用`git clone git@git.com master`下载项目后，会在当前目录下新建文件夹master并将项目下载这个目录下。

由于先前init初始化后，导致没有进入项目的文件夹中，使用git branch -a看不见任何分支。













更新服务端的分支到本地仓库
git fetch --all
列出所有的分支
git branch --all
切换到一个已有的分支
git checkout <您的分支名>
基于当前分支新建一个分支
git checkout -b <您的新分支名>
推送当前分支到服务端
git push origin <您的分支名>
删除本地的一个分支（当前所在分支和要删除的分支不能相同）
git branch -D <您的分支名>
删除服务端的一个分支
git push origin :<您的分支名>





应该右上角会有ssh和https转换，然而并没有。但是两者使用是一样的。
git clone -b gitbhttps://github.com/HanKin2015/GitBook.git

2. 远程分支重命名 (已经推送远程-假设本地分支和远程对应分支名称相同)
   a. 重命名远程分支对应的本地分支

git branch -m oldName newName
b. 删除远程分支

git push --delete origin oldName
c. 上传新命名的本地分支

git push origin newName
d.把修改后的本地分支与远程分支关联

git branch --set-upstream-to origin/newName



http://issuecdn.baidupcs.com/issue/netdisk/yunguanjia/BaiduNetdisk_6.8.1.3.exe


## Git 恢复本地误删的文件
起因：git clone下来的项目不久后就自动出现修改的红色感叹号标志，实际什么都没有做。后来猜测应该是杀毒软件之类的给我自动删除了，后来还真是。使用恢复方法恢复后，一会儿又给我删除了，要么关闭杀毒软件或者添加信任。

使用git pull --force强制拉取

正确的打开方式：
```
git reset HEAD 文件或文件夹
git checkout 文件或文件夹
```


## 14、进阶
### .gitignore
一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。来看一个实际的例子：
$ cat .gitignore
*.[oa]
*~
第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本。第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。

### 打patch
生成patch：
git format-patch commitID -1 生成当前commitID 的patch
git format-patch commitID -3 从当前commitID开始往下生成总共三个commit的patch文件
应用patch：
git apply --check xxx.patch 检查当前patch是否可以成功打入
git apply xxx.patch
git apply *.patch 同时打入所有patch

### 自定义别名（更高级的git log）
```
alias lg="git log --graph --pretty=format:’'Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit "
```

### git子模块使用
一个大型工程总会被分拆为一些子工程,git-submodule 就是完成这样一种子工程拆分与整合的工具.

添加一个子工程
git submodule add git@xxxx:subproj.git subproj
git commit -m “submodule added”

克隆一个带submodule的git仓库
git clone git@domain.com:massproj.git
git submodule init
git submodule update
或者
git clone --rescursive git@domain.com:massproj.git


查看修改的文件
git log --stat

查看commitID的具体修改
git log -p

查看文件最后的修改人
git blame -L 起始行号,结束行号



# git学习笔记

# 1、下载安装git
>sudo apt install git

明白为啥使用sudo而不是直接root账户，防止错误操作，sudo进一步确认了一下。

Windows下载安装很随意。有个注意点：尽量选择下载和上传git仓库的时候不要进行Linux和Windows的换行符的转换，否则在不同环境下运行代码的时候很尴尬。

# 2、配置
## 配置家门，即上传者的身份
设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。以前并没有觉得多大作用，慢慢地发现一个git仓库是可以多人上传的，而这个配置就是显示上传者的身份，一般会填写个人的GitHub相关的信息，比如GitHub用户名和注册邮箱。乱写也是🆗的。

```
$ git config -l  ===  git config --list
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

还有一个local参数，即为单独仓库配置单独的上传者身份。
global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
```

## 修改global配置
简单粗暴：直接使用命令git config --global user.name "Your Name"。。。。
修改配置.gitconfig文件。

## 配置SSH-Key
提交代码需要的github权限，下载私有仓库代码时也会需要这个配置，主要在于上传代码，不配置就会每次输入账户和密码。

如果你想要使用 SSH url 克隆的话，你必须是这个项目的拥有者。否则你是无法添加 SSH key 的。
使用https url很好用？？？

### https 和 SSH 的区别：
1、前者可以随意克隆github上的项目，而不管是谁的；而后者则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key ，否则无法克隆。

2、https url 在push的时候是需要验证用户名和密码的；而 SSH 在push的时候，是不需要输入用户名的，如果配置SSH key的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。

```
ssh -T git@github.com    查看是否配置好
ssh-keygen -t rsa -C "邮件地址"
```

代码参数含义：

-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。

以上代码省略了 -f 参数，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。
接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码），

当然，你也可以不输入密码，直接按回车。那么push的时候就不需要输入密码（推荐），直接提交到github上了。




[TOC]

# git入门知识汇总

# 0、前言
## 配置一个完整的环境简单步骤
```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
ssh-keygen -t rsa -C "邮件地址"
拷贝生成的公钥到git的ssh钥匙中：/root/.ssh/id_rsa.pub
```

## 0-1、安装git

使用镜像网站不错。
[下载Windows下的Git命令行客户端](https://repo.huaweicloud.com/git-for-windows/)
[下载Windows下的Git小海龟客户端](https://repo.huaweicloud.com/tortoisegit/)

1、 先安装Git.exe
2、 再安装TortoiseGit.msi
3、 根据自己喜欢安装中文翻译补丁包LanguagePack



git update-git-for-windows   更新git客户端

## 0-2、解决TortoiseGit文件夹和文件状态图标不显示问题

- 先重启试试
- 修改注册表
- 设置里面设置显示icon overlays

# 1、使用git下载单个指定的文件夹

更多搜索“稀疏检出”。



```
稀疏检出恢复：

SC_FILE=.git/info/sparse-checkout
echo "Undoing sparse checkout"

# Get the full tree back

echo "*" > $SC_FILE
git config core.sparsecheckout true
git read-tree --reset -u HEAD

# Wipe out all traces of sparse checkout support

rm -rf $SC_FILE
git config core.sparsecheckout false
```





参考：https://www.cnblogs.com/zhoudaxiaa/p/8670481.html

方法一：http://zhoudaxiaa.gitee.io/downgit/#/home

方法二：

在Git1.7.0以前，这无法实现，但是幸运的是在Git1.7.0以后加入了Sparse Checkout模式，这使得Check Out指定文件或者文件夹成为可能。

**举个例子：**

> 现在有一个**test**仓库https://github.com/mygithub/test
> 你要gitclone里面的**tt**子目录：
> 在本地的硬盘位置打开**Git Bash**

```
git init test && cd test     //新建仓库并进入文件夹
git config core.sparsecheckout true //设置允许克隆子目录

echo 'tt*' >> .git/info/sparse-checkout //设置要克隆的仓库的子目录路径   //空格别漏

git remote add origin git@github.com:mygithub/test.git  //这里换成你要克隆的项目和库

git pull origin master    //下载
```

 https://blog.csdn.net/qq_35860352/article/details/80313078 不行

## 下载指定分支

git clone -b branch git@github.com:github/test.git 



**重点看这里**：

# 2、git add命令参数说明

git add -u：将文件的修改、文件的删除，添加到暂存区。
git add .：将文件的修改，文件的新建，添加到暂存区。
git add -A：将文件的修改，文件的删除，文件的新建，添加到暂存区。

-u就是update的意思，只会标记本地有改动（包括删除和修改）的已经追踪的文件

\1.  git add -A   保存所有的修改

\2.  git add .     保存新的添加和修改，但是不包括删除

\3.  git add -u   保存修改和删除，但是不包括新建文件。



# 3、git push 的 -u 参数具体适合含义？

一般只有同时存在多个远程仓库时才会用到--set-upstream。每个git branch可以有个对应的upstream。假设你有两个upstream，分别叫server1和server2，本地master branch的upstream是server1上的master，那么当你不带参数直接输入git pull或者git push时，默认是对server1进行pull/push。如果你成功运行"git push -u server2 master"，那么除了本地branch会被push到server2之外，还会把server2设置成upstream。



```
-u, --set-upstream
For every branch that is up to date or successfully pushed, add upstream (tracking) reference, used by argument-less git-pull(1) and other commands.
```

upstream不是针对远程仓库的，而是针对branch的，这一点应了那位童鞋所说的第二句话。但是upstream和有几个远程库没有必然联系。比如远程库A上有3个分支branch1、branch2、branch3。远程库B上有3个分支branchx、branchy、branchz。本地仓库有2个分支local1和local2。那么当初始状态时，local1和local2和任何一个分支都没有关联，也就是没有upstream。当通过git branch --set-upstream-to A/branch1 local1命令执行后，会给local1和branch1两个分支建立关联，也就是说local1的upstream指向的是branch1。这样的好处就是在local1分支上执行git push（git pull同理）操作时不用附加其它参数，Git就会自动将local1分支上的内容push到branch1上去。同样，local2分支也可以和远程库A和远程库B上的任何一个分支建立关联，只要给local2分支设置了upstream，就可以在local2分支上用git push（git pull同理）方便地与目标分支推拉数据。

综上所述，upstream与有几个远程库没有关系，它是分支与分支之间的流通道。

再来说说git push -u和git branch --set-upstream-to指令之间的区别。

举个例子：我要把本地分支mybranch1与远程仓库origin里的分支mybranch1建立关联。

（如果使用下列途径1的话，首先，你要切换到mybranch1分支上（git checkout mybranch1））

两个途径：1. git push -u origin mybranch1  2. git branch --set-upstream-to=origin/mybranch1 mybranch1

这两种方式都可以达到目的。但是1方法更通用，因为你的远程库有可能并没有mybranch1分支，这种情况下你用2方法就不可行，连目标分支都不存在，怎么进行关联呢？所以可以总结一下：git push -u origin mybranch1 相当于 git push origin mybranch1 + git branch --set-upstream-to=origin/mybranch1 mybranch1



# 4、分支管理

```
git branch 查看本地分支
git branch -r 查看远程分支
git branch -a 查看所有分支
git checkout [Bname] 切换分支
git push origin [Bname] 将空分支上传可以看作删除远程分支
git push origin --delete [Bname] 删除远程分支
git ls-remote origin [Bname] 查看远程仓库是否有这个分支，有就有返回值，没有就什么都没有
git remote [-v] 查看远程仓库地址
git branch -m oldBranchName newBranchName 重命名
```

## 4-1、删除分支

```
git branch -d [本地分支名]
git branch -D [本地分支名]
git branch -r -D [远程分支名]
```

## 4-2、合并分支

1. git pull (git checkout -b newBname Bname)



一、开发分支（dev）上的代码达到上线的标准后，要合并到 master 分支

```
git checkout dev
git pull
git checkout master
git merge dev
git push -u origin master
```

二、当master代码改动了，需要更新开发分支（dev）上的代码

```
git checkout master 
git pull 
git checkout dev
git merge master 
git push -u origin dev
```

## 4-3、远程分支覆盖本地分支

有时候同一个分支，远程的和本地的都被修改的面目全非了，如果想要把本地的替换成远程的，用下面的命令

git fetch --all
git reset --hard origin/master (这里master要修改为对应的分支名)
git pull

# 5、git冲突

当上传的时候产生冲突时：

## 5-1、在线git解决

方便快捷操作简单。

## 5-2、检出，在本地审查和合并

- git pull origin 分支（生产冲突文件）
- 在冲突文件里修改：删除和保留（git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容（数量为7））
- git add 冲突文件
- git commit
- git push


Step 1. 获取并检出此合并请求的分支

git fetch origin
git checkout -b [bName] origin/冲突分支

Step 2. 本地审查变更（忽略）

Step 3. 合并分支并修复出现的任何冲突

git checkout master
git merge --no-ff [bName]（本地就有冲突文件了，注意看产生冲突的文件）

Step 4. 推送合并的结果到 GitLab

git checkout -b [newBName]

git push origin [newBName]

# 6、git commit

### 修改commit内容
当我们想要对上一次的提交进行修改时，我们可以使用git commit –amend命令。git commit –amend既可以对上次提交的内容进行修改，也可以修改提交说明。

如果有新的文件修改，需要合并到最近一次提交的commit里面，也可以使用上面命令直接修改即可。


> git commit --amend -no-edit

git status
git log
git show

### 6-1、删除commit

> git reset HEAD^    删除最新commit记录

### 6-2、误删除commit

- git reflog
- git reset commitId

# 7、多个commit合并(git rebase)  

实战中终于理解这条命令的作用。当我们在合并请求时又双叒叕发现一个小错误，又不得不commit一次，真想删除分支全部重新提交。但是commit是可以合并的。
[git 几个commit点合并成一个commit点](https://blog.csdn.net/u013276277/article/details/82470177)

- 1、git status当前所有修改是否都commit。如果没有后面rebase无法继续。
- 2、git log查看commitId
- 3、git rebase -i commitId（commitId是合并后的commitId的前一个）**即不影响的log**
- 4、**将删除的commit记录前面的pick改为squash，保存退出**
- 5、修改commit内容
- 6、git log查看合并结果 
- 7、git push origin [Bname] -f 可能提交会产生冲突，建议强制

  (use "git rebase --edit-todo" to view and edit)
You are currently editing a commit while rebasing branch 'hejian' on 'ddd330e'.
  (use "git commit --amend" to amend the current commit)
  (use "git rebase --continue" once you are satisfied with your changes)

# 8、如何切换分支并且改变其修改的不同的内容

就是本地像远程分支管理一样，不同分支不同的内容。但是实践看到都是一样的，后来发现姿势不对。

### 实验

```
mkdir Github   本地Github文件夹
cd Github
git init
vi helloworld.txt
	wuli github
git branch father    
git add .
git commit -m"add txt"
git checkout -b son   注意:这种创建分支的方式是将当前的分支复制到了新分支，因此尽量在修改代码前创建分支

vi helloworld.txt
	wuli github
	yes,you are right
git add .
git commit -m"update"
git log
	add txt
	update
git checkout father
git log
	add txt			这时候发现commit日志会出现不同。并且helloworld文件的内容也会随切换不同分支而改变
```

注意：当两个分支前面的commit日志一模一样的时候，是可以随意切换checkout的，但是不同的时候是需要先commit才能切换，stash也能解决这个问题。

总结：远程和本地一样，这就为啥有个叫本地仓库的概念了，本地修改了内容尽量commit到本地，只有commit了才会切换分支看到效果。

# 9、stash的作用

[stash —— 一个极度实用的Git操作](https://www.jianshu.com/p/fcf69e2d3e6b)
git stash   藏好代码
git stash list  

- git stash pop  [stash@{0}] （删除stash记录）
- git stash apply （不删除stash记录）

好习惯：master作为备份更新，第一步是创建新分支。当有新问题的时候，stash后去master分支创建新分支。

上面的commit一定是最新的。



超级好用：

git stash

git stash pop

git stash list

git stash -h



# 10、Git 全局设置（必须）

```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
```

- git config --list     查看配置信息
- git config -l
- git config --local -l
- git config --global -l

# 11、回退命令（放弃所有本地修改）

```
git reflog
git reset --hard 7edb984	放弃修改
git reset --soft 7edb984 	回到commit之前
git checkout -- filename	撤销文件的修改
HEAD
HEAD~3
commit_id

强推到远程
git push origin HEAD --force

```

可引用git checkout或者用git clean -df至修改前的状态。就可以放弃所有修改。

1、git checkout功能是本地所有修改的。没有的提交的，都返回到原来的状态

2、git stash功能是把所有没有提交的修改暂存到stash里面。可用git stash [pop](https://www.baidu.com/s?wd=pop&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)回复。

3、git reset --hard HASH功能是返回到某个节点，不保留修改。

4、git reset --soft HASH功能是返回到某个节点。保留修改。

5、git clean -df功能是保留修改，返回到某个节点。

**拓展资料**：

1、Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

[![img](https://img3.mukewang.com/5c773adf000145dc06000425.jpg)](https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7acb0a46f21fbe094c3be72c66600c338744ada4.jpg)

2、Torvalds 开始着手开发 Git 是为了作为一种过渡方案来替代 BitKeeper，后者之前一直是 Linux 内核开发人员在全球使用的主要源代码工具。开放源码社区中的有些人觉得BitKeeper 的许可证并不适合开放源码社区的工作，因此 Torvalds 决定着手研究许可证更为灵活的版本控制系统。尽管最初 Git 的开发是为了辅助 Linux 内核开发的过程，但是我们已经发现在很多其他自由软件项目中也使用了 Git。例如 很多 Freedesktop 的项目迁移到了 Git 上。



# # 12、Updates were rejected because the tip of your current branch is behind

1.使用强制push的方法：

$ git push -u origin master -f 

这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

2.push前先将远程repository修改pull下来

$ git pull origin master

$ git push -u origin master   （后续就是解决冲突）



# 13、git clean 的用法（如何使用Git删除新增的文件？）

git clean命令用来从你的工作目录中删除所有没有track过的文件
git clean经常和git reset --hard一起使用. 记住reset只影响被track过的文件, 所以需要clean来删除没有track过的文件. 结合使用这两个命令能让你的工作目录完全回到一个指定的的状态

```
git clean -n
```

是一次clean的演习, 告诉你哪些文件会被删除. 记住它不会真正地删除文件, 只是一个提醒。

```
git clean -f
```

删除当前目录下所有没有track过的文件. 它不会删除 .gitignore 文件里指定的文件夹和文件, 不管这些文件有没有被track过

```
git clean -f <path>
```

删除指定路径下的没有被track过的文件

```
git clean -df
```

删除当前目录下没有被track过的文件和文件夹

```
git clean -xf
```

删除当前目录下所有没有track过的文件. 不管它是否是 .gitignore 文件里面指定的文件夹和文件

`git reset --hard` 和 `git clean -f` 是一对好基友. 结合使用它们能让你的工作目录完全回退到最近一次commit的时候

`git clean` 对于刚编译过的项目也非常有用. 如, 它能轻易删除掉编译后生成的 .o 和 .exe 等文件. 这个在打包要发布一个release的时候非常有用

下面的例子要删除所有工作目录下面的修改, 包括新添加的文件. 假设你已经提交了一些快照了, 而且做了一些新的开发

```
git reset --hard

git clean -df
```

运行后, 工作目录和缓存区回到最近一次commit时候一摸一样的状态，git status会告诉你这是一个干净的工作目录, 又是一个新的开始了！

## 其他

--force
--hard
--soft
-d  等价于  --delete
-u  表示：
加了参数-u后，以后即可直接用git push 代替git push origin master
在git add -u中表示添加此次修改的全部原先存在的文件（即新建的不会添加 --update）。

```
1) 远程仓库相关命令
检出仓库：$ git clone git://github.com/jquery/jquery.git
查看远程仓库：$ git remote -v
添加远程仓库：$ git remote add [name] [url]
删除远程仓库：$ git remote rm [name]
修改远程仓库：$ git remote set-url --push[name][newUrl]
拉取远程仓库：$ git pull [remoteName] [localBranchName]
推送远程仓库：$ git push [remoteName] [localBranchName]
 
2）分支(branch)操作相关命令
查看本地分支：$ git branch
查看远程分支：$ git branch -r
创建本地分支：$ git branch [name] ----注意新分支创建后不会自动切换为当前分支
切换分支：$ git checkout [name]
创建新分支并立即切换到新分支：$ git checkout -b [name]
删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：$ git merge [name] ----将名称为[name]的分支与当前分支合并
创建远程分支(本地分支push到远程)：$ git push origin [name]
删除远程分支：$ git push origin :heads/[name]
```



## mintty.exe.stackdump文件

关于Git bash在win10重装系统情况下闪退并生成mintty.exe.stackdump文件的问题

总结：我也是在git commit时闪退产生了这个文件。试了几次同样的commit内容一直闪退，原因可能是中文时输入英文字母按回车键后闪退，然后在输入英文时shift切换没有闪退情况。我的问题不大，不能解决闪退网上有很多解决方法。





# 哭笑不得：git branch -a看不见一个分支

如果是下载项目就不要使用`git init test && cd test`初始化。

使用`git clone git@git.com master`下载项目后，会在当前目录下新建文件夹master并将项目下载这个目录下。

由于先前init初始化后，导致没有进入项目的文件夹中，使用git branch -a看不见任何分支。













更新服务端的分支到本地仓库
git fetch --all
列出所有的分支
git branch --all
切换到一个已有的分支
git checkout <您的分支名>
基于当前分支新建一个分支
git checkout -b <您的新分支名>
推送当前分支到服务端
git push origin <您的分支名>
删除本地的一个分支（当前所在分支和要删除的分支不能相同）
git branch -D <您的分支名>
删除服务端的一个分支
git push origin :<您的分支名>





应该右上角会有ssh和https转换，然而并没有。但是两者使用是一样的。
git clone -b gitbhttps://github.com/HanKin2015/GitBook.git

2. 远程分支重命名 (已经推送远程-假设本地分支和远程对应分支名称相同)
   a. 重命名远程分支对应的本地分支

git branch -m oldName newName
b. 删除远程分支

git push --delete origin oldName
c. 上传新命名的本地分支

git push origin newName
d.把修改后的本地分支与远程分支关联

git branch --set-upstream-to origin/newName



http://issuecdn.baidupcs.com/issue/netdisk/yunguanjia/BaiduNetdisk_6.8.1.3.exe


## Git 恢复本地误删的文件
起因：git clone下来的项目不久后就自动出现修改的红色感叹号标志，实际什么都没有做。后来猜测应该是杀毒软件之类的给我自动删除了，后来还真是。使用恢复方法恢复后，一会儿又给我删除了，要么关闭杀毒软件或者添加信任。

使用git pull --force强制拉取

正确的打开方式：
```
git reset HEAD 文件或文件夹
git checkout 文件或文件夹
```


## 14、进阶
### .gitignore
一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。来看一个实际的例子：
$ cat .gitignore
*.[oa]
*~
第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本。第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。

### 打patch
生成patch：
git format-patch commitID -1 生成当前commitID 的patch
git format-patch commitID -3 从当前commitID开始往下生成总共三个commit的patch文件
应用patch：
git apply --check xxx.patch 检查当前patch是否可以成功打入
git apply xxx.patch
git apply *.patch 同时打入所有patch

### 自定义别名（更高级的git log）
```
alias lg="git log --graph --pretty=format:’'Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit "
```

### git子模块使用
一个大型工程总会被分拆为一些子工程,git-submodule 就是完成这样一种子工程拆分与整合的工具.

添加一个子工程
git submodule add git@xxxx:subproj.git subproj
git commit -m “submodule added”

克隆一个带submodule的git仓库
git clone git@domain.com:massproj.git
git submodule init
git submodule update
或者
git clone --rescursive git@domain.com:massproj.git


查看修改的文件
git log --stat

查看commitID的具体修改
git log -p

查看文件最后的修改人
git blame -L 起始行号,结束行号



# git学习笔记

# 1、下载安装git
>sudo apt install git

明白为啥使用sudo而不是直接root账户，防止错误操作，sudo进一步确认了一下。

Windows下载安装很随意。有个注意点：尽量选择下载和上传git仓库的时候不要进行Linux和Windows的换行符的转换，否则在不同环境下运行代码的时候很尴尬。

# 2、配置
## 配置家门，即上传者的身份
设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。以前并没有觉得多大作用，慢慢地发现一个git仓库是可以多人上传的，而这个配置就是显示上传者的身份，一般会填写个人的GitHub相关的信息，比如GitHub用户名和注册邮箱。乱写也是🆗的。

```
$ git config -l  ===  git config --list
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

还有一个local参数，即为单独仓库配置单独的上传者身份。
global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
```

## 修改global配置
简单粗暴：直接使用命令git config --global user.name "Your Name"。。。。
修改配置.gitconfig文件。

## 配置SSH-Key
提交代码需要的github权限，下载私有仓库代码时也会需要这个配置，主要在于上传代码，不配置就会每次输入账户和密码。

如果你想要使用 SSH url 克隆的话，你必须是这个项目的拥有者。否则你是无法添加 SSH key 的。
使用https url很好用？？？

### https 和 SSH 的区别：
1、前者可以随意克隆github上的项目，而不管是谁的；而后者则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key ，否则无法克隆。

2、https url 在push的时候是需要验证用户名和密码的；而 SSH 在push的时候，是不需要输入用户名的，如果配置SSH key的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。

```
ssh -T git@github.com    查看是否配置好
ssh-keygen -t rsa -C "邮件地址"
```

代码参数含义：

-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。

以上代码省略了 -f 参数，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。
接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码），

当然，你也可以不输入密码，直接按回车。那么push的时候就不需要输入密码（推荐），直接提交到github上了。




[TOC]

# git入门知识汇总

# 0、前言
## 配置一个完整的环境简单步骤
```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
ssh-keygen -t rsa -C "邮件地址"
拷贝生成的公钥到git的ssh钥匙中：/root/.ssh/id_rsa.pub
```

## 0-1、安装git

使用镜像网站不错。
[下载Windows下的Git命令行客户端](https://repo.huaweicloud.com/git-for-windows/)
[下载Windows下的Git小海龟客户端](https://repo.huaweicloud.com/tortoisegit/)

1、 先安装Git.exe
2、 再安装TortoiseGit.msi
3、 根据自己喜欢安装中文翻译补丁包LanguagePack



git update-git-for-windows   更新git客户端

## 0-2、解决TortoiseGit文件夹和文件状态图标不显示问题

- 先重启试试
- 修改注册表
- 设置里面设置显示icon overlays

# 1、使用git下载单个指定的文件夹

更多搜索“稀疏检出”。



```
稀疏检出恢复：

SC_FILE=.git/info/sparse-checkout
echo "Undoing sparse checkout"

# Get the full tree back

echo "*" > $SC_FILE
git config core.sparsecheckout true
git read-tree --reset -u HEAD

# Wipe out all traces of sparse checkout support

rm -rf $SC_FILE
git config core.sparsecheckout false
```





参考：https://www.cnblogs.com/zhoudaxiaa/p/8670481.html

方法一：http://zhoudaxiaa.gitee.io/downgit/#/home

方法二：

在Git1.7.0以前，这无法实现，但是幸运的是在Git1.7.0以后加入了Sparse Checkout模式，这使得Check Out指定文件或者文件夹成为可能。

**举个例子：**

> 现在有一个**test**仓库https://github.com/mygithub/test
> 你要gitclone里面的**tt**子目录：
> 在本地的硬盘位置打开**Git Bash**

```
git init test && cd test     //新建仓库并进入文件夹
git config core.sparsecheckout true //设置允许克隆子目录

echo 'tt*' >> .git/info/sparse-checkout //设置要克隆的仓库的子目录路径   //空格别漏

git remote add origin git@github.com:mygithub/test.git  //这里换成你要克隆的项目和库

git pull origin master    //下载
```

 https://blog.csdn.net/qq_35860352/article/details/80313078 不行

## 下载指定分支

git clone -b branch git@github.com:github/test.git 



**重点看这里**：

# 2、git add命令参数说明

git add -u：将文件的修改、文件的删除，添加到暂存区。
git add .：将文件的修改，文件的新建，添加到暂存区。
git add -A：将文件的修改，文件的删除，文件的新建，添加到暂存区。

-u就是update的意思，只会标记本地有改动（包括删除和修改）的已经追踪的文件

\1.  git add -A   保存所有的修改

\2.  git add .     保存新的添加和修改，但是不包括删除

\3.  git add -u   保存修改和删除，但是不包括新建文件。



# 3、git push 的 -u 参数具体适合含义？

一般只有同时存在多个远程仓库时才会用到--set-upstream。每个git branch可以有个对应的upstream。假设你有两个upstream，分别叫server1和server2，本地master branch的upstream是server1上的master，那么当你不带参数直接输入git pull或者git push时，默认是对server1进行pull/push。如果你成功运行"git push -u server2 master"，那么除了本地branch会被push到server2之外，还会把server2设置成upstream。



```
-u, --set-upstream
For every branch that is up to date or successfully pushed, add upstream (tracking) reference, used by argument-less git-pull(1) and other commands.
```

upstream不是针对远程仓库的，而是针对branch的，这一点应了那位童鞋所说的第二句话。但是upstream和有几个远程库没有必然联系。比如远程库A上有3个分支branch1、branch2、branch3。远程库B上有3个分支branchx、branchy、branchz。本地仓库有2个分支local1和local2。那么当初始状态时，local1和local2和任何一个分支都没有关联，也就是没有upstream。当通过git branch --set-upstream-to A/branch1 local1命令执行后，会给local1和branch1两个分支建立关联，也就是说local1的upstream指向的是branch1。这样的好处就是在local1分支上执行git push（git pull同理）操作时不用附加其它参数，Git就会自动将local1分支上的内容push到branch1上去。同样，local2分支也可以和远程库A和远程库B上的任何一个分支建立关联，只要给local2分支设置了upstream，就可以在local2分支上用git push（git pull同理）方便地与目标分支推拉数据。

综上所述，upstream与有几个远程库没有关系，它是分支与分支之间的流通道。

再来说说git push -u和git branch --set-upstream-to指令之间的区别。

举个例子：我要把本地分支mybranch1与远程仓库origin里的分支mybranch1建立关联。

（如果使用下列途径1的话，首先，你要切换到mybranch1分支上（git checkout mybranch1））

两个途径：1. git push -u origin mybranch1  2. git branch --set-upstream-to=origin/mybranch1 mybranch1

这两种方式都可以达到目的。但是1方法更通用，因为你的远程库有可能并没有mybranch1分支，这种情况下你用2方法就不可行，连目标分支都不存在，怎么进行关联呢？所以可以总结一下：git push -u origin mybranch1 相当于 git push origin mybranch1 + git branch --set-upstream-to=origin/mybranch1 mybranch1



# 4、分支管理

```
git branch 查看本地分支
git branch -r 查看远程分支
git branch -a 查看所有分支
git checkout [Bname] 切换分支
git push origin [Bname] 将空分支上传可以看作删除远程分支
git push origin --delete [Bname] 删除远程分支
git ls-remote origin [Bname] 查看远程仓库是否有这个分支，有就有返回值，没有就什么都没有
git remote [-v] 查看远程仓库地址
git branch -m oldBranchName newBranchName 重命名
```

## 4-1、删除分支

```
git branch -d [本地分支名]
git branch -D [本地分支名]
git branch -r -D [远程分支名]
```

## 4-2、合并分支

1. git pull (git checkout -b newBname Bname)



一、开发分支（dev）上的代码达到上线的标准后，要合并到 master 分支

```
git checkout dev
git pull
git checkout master
git merge dev
git push -u origin master
```

二、当master代码改动了，需要更新开发分支（dev）上的代码

```
git checkout master 
git pull 
git checkout dev
git merge master 
git push -u origin dev
```

## 4-3、远程分支覆盖本地分支

有时候同一个分支，远程的和本地的都被修改的面目全非了，如果想要把本地的替换成远程的，用下面的命令

git fetch --all
git reset --hard origin/master (这里master要修改为对应的分支名)
git pull

# 5、git冲突

当上传的时候产生冲突时：

## 5-1、在线git解决

方便快捷操作简单。

## 5-2、检出，在本地审查和合并

- git pull origin 分支（生产冲突文件）
- 在冲突文件里修改：删除和保留（git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容（数量为7））
- git add 冲突文件
- git commit
- git push


Step 1. 获取并检出此合并请求的分支

git fetch origin
git checkout -b [bName] origin/冲突分支

Step 2. 本地审查变更（忽略）

Step 3. 合并分支并修复出现的任何冲突

git checkout master
git merge --no-ff [bName]（本地就有冲突文件了，注意看产生冲突的文件）

Step 4. 推送合并的结果到 GitLab

git checkout -b [newBName]

git push origin [newBName]

# 6、git commit

### 修改commit内容
当我们想要对上一次的提交进行修改时，我们可以使用git commit –amend命令。git commit –amend既可以对上次提交的内容进行修改，也可以修改提交说明。

如果有新的文件修改，需要合并到最近一次提交的commit里面，也可以使用上面命令直接修改即可。


> git commit --amend -no-edit

git status
git log
git show

### 6-1、删除commit

> git reset HEAD^    删除最新commit记录

### 6-2、误删除commit

- git reflog
- git reset commitId

# 7、多个commit合并(git rebase)  

实战中终于理解这条命令的作用。当我们在合并请求时又双叒叕发现一个小错误，又不得不commit一次，真想删除分支全部重新提交。但是commit是可以合并的。
[git 几个commit点合并成一个commit点](https://blog.csdn.net/u013276277/article/details/82470177)

- 1、git status当前所有修改是否都commit。如果没有后面rebase无法继续。
- 2、git log查看commitId
- 3、git rebase -i commitId（commitId是合并后的commitId的前一个）**即不影响的log**
- 4、**将删除的commit记录前面的pick改为squash，保存退出**
- 5、修改commit内容
- 6、git log查看合并结果 
- 7、git push origin [Bname] -f 可能提交会产生冲突，建议强制

  (use "git rebase --edit-todo" to view and edit)
You are currently editing a commit while rebasing branch 'hejian' on 'ddd330e'.
  (use "git commit --amend" to amend the current commit)
  (use "git rebase --continue" once you are satisfied with your changes)

# 8、如何切换分支并且改变其修改的不同的内容

就是本地像远程分支管理一样，不同分支不同的内容。但是实践看到都是一样的，后来发现姿势不对。

### 实验

```
mkdir Github   本地Github文件夹
cd Github
git init
vi helloworld.txt
	wuli github
git branch father    
git add .
git commit -m"add txt"
git checkout -b son   注意:这种创建分支的方式是将当前的分支复制到了新分支，因此尽量在修改代码前创建分支

vi helloworld.txt
	wuli github
	yes,you are right
git add .
git commit -m"update"
git log
	add txt
	update
git checkout father
git log
	add txt			这时候发现commit日志会出现不同。并且helloworld文件的内容也会随切换不同分支而改变
```

注意：当两个分支前面的commit日志一模一样的时候，是可以随意切换checkout的，但是不同的时候是需要先commit才能切换，stash也能解决这个问题。

总结：远程和本地一样，这就为啥有个叫本地仓库的概念了，本地修改了内容尽量commit到本地，只有commit了才会切换分支看到效果。

# 9、stash的作用

[stash —— 一个极度实用的Git操作](https://www.jianshu.com/p/fcf69e2d3e6b)
git stash   藏好代码
git stash list  

- git stash pop  [stash@{0}] （删除stash记录）
- git stash apply （不删除stash记录）

好习惯：master作为备份更新，第一步是创建新分支。当有新问题的时候，stash后去master分支创建新分支。

上面的commit一定是最新的。



超级好用：

git stash

git stash pop

git stash list

git stash -h



# 10、Git 全局设置（必须）

```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
```

- git config --list     查看配置信息
- git config -l
- git config --local -l
- git config --global -l

# 11、回退命令（放弃所有本地修改）

```
git reflog
git reset --hard 7edb984	放弃修改
git reset --soft 7edb984 	回到commit之前
git checkout -- filename	撤销文件的修改
HEAD
HEAD~3
commit_id

强推到远程
git push origin HEAD --force

```

可引用git checkout或者用git clean -df至修改前的状态。就可以放弃所有修改。

1、git checkout功能是本地所有修改的。没有的提交的，都返回到原来的状态

2、git stash功能是把所有没有提交的修改暂存到stash里面。可用git stash [pop](https://www.baidu.com/s?wd=pop&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)回复。

3、git reset --hard HASH功能是返回到某个节点，不保留修改。

4、git reset --soft HASH功能是返回到某个节点。保留修改。

5、git clean -df功能是保留修改，返回到某个节点。

**拓展资料**：

1、Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

[![img](https://img3.mukewang.com/5c773adf000145dc06000425.jpg)](https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7acb0a46f21fbe094c3be72c66600c338744ada4.jpg)

2、Torvalds 开始着手开发 Git 是为了作为一种过渡方案来替代 BitKeeper，后者之前一直是 Linux 内核开发人员在全球使用的主要源代码工具。开放源码社区中的有些人觉得BitKeeper 的许可证并不适合开放源码社区的工作，因此 Torvalds 决定着手研究许可证更为灵活的版本控制系统。尽管最初 Git 的开发是为了辅助 Linux 内核开发的过程，但是我们已经发现在很多其他自由软件项目中也使用了 Git。例如 很多 Freedesktop 的项目迁移到了 Git 上。



# # 12、Updates were rejected because the tip of your current branch is behind

1.使用强制push的方法：

$ git push -u origin master -f 

这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

2.push前先将远程repository修改pull下来

$ git pull origin master

$ git push -u origin master   （后续就是解决冲突）



# 13、git clean 的用法（如何使用Git删除新增的文件？）

git clean命令用来从你的工作目录中删除所有没有track过的文件
git clean经常和git reset --hard一起使用. 记住reset只影响被track过的文件, 所以需要clean来删除没有track过的文件. 结合使用这两个命令能让你的工作目录完全回到一个指定的的状态

```
git clean -n
```

是一次clean的演习, 告诉你哪些文件会被删除. 记住它不会真正地删除文件, 只是一个提醒。

```
git clean -f
```

删除当前目录下所有没有track过的文件. 它不会删除 .gitignore 文件里指定的文件夹和文件, 不管这些文件有没有被track过

```
git clean -f <path>
```

删除指定路径下的没有被track过的文件

```
git clean -df
```

删除当前目录下没有被track过的文件和文件夹

```
git clean -xf
```

删除当前目录下所有没有track过的文件. 不管它是否是 .gitignore 文件里面指定的文件夹和文件

`git reset --hard` 和 `git clean -f` 是一对好基友. 结合使用它们能让你的工作目录完全回退到最近一次commit的时候

`git clean` 对于刚编译过的项目也非常有用. 如, 它能轻易删除掉编译后生成的 .o 和 .exe 等文件. 这个在打包要发布一个release的时候非常有用

下面的例子要删除所有工作目录下面的修改, 包括新添加的文件. 假设你已经提交了一些快照了, 而且做了一些新的开发

```
git reset --hard

git clean -df
```

运行后, 工作目录和缓存区回到最近一次commit时候一摸一样的状态，git status会告诉你这是一个干净的工作目录, 又是一个新的开始了！

## 其他

--force
--hard
--soft
-d  等价于  --delete
-u  表示：
加了参数-u后，以后即可直接用git push 代替git push origin master
在git add -u中表示添加此次修改的全部原先存在的文件（即新建的不会添加 --update）。

```
1) 远程仓库相关命令
检出仓库：$ git clone git://github.com/jquery/jquery.git
查看远程仓库：$ git remote -v
添加远程仓库：$ git remote add [name] [url]
删除远程仓库：$ git remote rm [name]
修改远程仓库：$ git remote set-url --push[name][newUrl]
拉取远程仓库：$ git pull [remoteName] [localBranchName]
推送远程仓库：$ git push [remoteName] [localBranchName]
 
2）分支(branch)操作相关命令
查看本地分支：$ git branch
查看远程分支：$ git branch -r
创建本地分支：$ git branch [name] ----注意新分支创建后不会自动切换为当前分支
切换分支：$ git checkout [name]
创建新分支并立即切换到新分支：$ git checkout -b [name]
删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：$ git merge [name] ----将名称为[name]的分支与当前分支合并
创建远程分支(本地分支push到远程)：$ git push origin [name]
删除远程分支：$ git push origin :heads/[name]
```



## mintty.exe.stackdump文件

关于Git bash在win10重装系统情况下闪退并生成mintty.exe.stackdump文件的问题

总结：我也是在git commit时闪退产生了这个文件。试了几次同样的commit内容一直闪退，原因可能是中文时输入英文字母按回车键后闪退，然后在输入英文时shift切换没有闪退情况。我的问题不大，不能解决闪退网上有很多解决方法。





# 哭笑不得：git branch -a看不见一个分支

如果是下载项目就不要使用`git init test && cd test`初始化。

使用`git clone git@git.com master`下载项目后，会在当前目录下新建文件夹master并将项目下载这个目录下。

由于先前init初始化后，导致没有进入项目的文件夹中，使用git branch -a看不见任何分支。













更新服务端的分支到本地仓库
git fetch --all
列出所有的分支
git branch --all
切换到一个已有的分支
git checkout <您的分支名>
基于当前分支新建一个分支
git checkout -b <您的新分支名>
推送当前分支到服务端
git push origin <您的分支名>
删除本地的一个分支（当前所在分支和要删除的分支不能相同）
git branch -D <您的分支名>
删除服务端的一个分支
git push origin :<您的分支名>





应该右上角会有ssh和https转换，然而并没有。但是两者使用是一样的。
git clone -b gitbhttps://github.com/HanKin2015/GitBook.git

2. 远程分支重命名 (已经推送远程-假设本地分支和远程对应分支名称相同)
   a. 重命名远程分支对应的本地分支

git branch -m oldName newName
b. 删除远程分支

git push --delete origin oldName
c. 上传新命名的本地分支

git push origin newName
d.把修改后的本地分支与远程分支关联

git branch --set-upstream-to origin/newName



http://issuecdn.baidupcs.com/issue/netdisk/yunguanjia/BaiduNetdisk_6.8.1.3.exe


## Git 恢复本地误删的文件
起因：git clone下来的项目不久后就自动出现修改的红色感叹号标志，实际什么都没有做。后来猜测应该是杀毒软件之类的给我自动删除了，后来还真是。使用恢复方法恢复后，一会儿又给我删除了，要么关闭杀毒软件或者添加信任。

使用git pull --force强制拉取

正确的打开方式：
```
git reset HEAD 文件或文件夹
git checkout 文件或文件夹
```


## 14、进阶
### .gitignore
一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。来看一个实际的例子：
$ cat .gitignore
*.[oa]
*~
第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本。第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。

### 打patch
生成patch：
git format-patch commitID -1 生成当前commitID 的patch
git format-patch commitID -3 从当前commitID开始往下生成总共三个commit的patch文件
应用patch：
git apply --check xxx.patch 检查当前patch是否可以成功打入
git apply xxx.patch
git apply *.patch 同时打入所有patch

### 自定义别名（更高级的git log）
```
alias lg="git log --graph --pretty=format:’'Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit "
```

### git子模块使用
一个大型工程总会被分拆为一些子工程,git-submodule 就是完成这样一种子工程拆分与整合的工具.

添加一个子工程
git submodule add git@xxxx:subproj.git subproj
git commit -m “submodule added”

克隆一个带submodule的git仓库
git clone git@domain.com:massproj.git
git submodule init
git submodule update
或者
git clone --rescursive git@domain.com:massproj.git


查看修改的文件
git log --stat

查看commitID的具体修改
git log -p

查看文件最后的修改人
git blame -L 起始行号,结束行号



# git学习笔记

# 1、下载安装git
>sudo apt install git

明白为啥使用sudo而不是直接root账户，防止错误操作，sudo进一步确认了一下。

Windows下载安装很随意。有个注意点：尽量选择下载和上传git仓库的时候不要进行Linux和Windows的换行符的转换，否则在不同环境下运行代码的时候很尴尬。

# 2、配置
## 配置家门，即上传者的身份
设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。以前并没有觉得多大作用，慢慢地发现一个git仓库是可以多人上传的，而这个配置就是显示上传者的身份，一般会填写个人的GitHub相关的信息，比如GitHub用户名和注册邮箱。乱写也是🆗的。

```
$ git config -l  ===  git config --list
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

还有一个local参数，即为单独仓库配置单独的上传者身份。
global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
```

## 修改global配置
简单粗暴：直接使用命令git config --global user.name "Your Name"。。。。
修改配置.gitconfig文件。

## 配置SSH-Key
提交代码需要的github权限，下载私有仓库代码时也会需要这个配置，主要在于上传代码，不配置就会每次输入账户和密码。

如果你想要使用 SSH url 克隆的话，你必须是这个项目的拥有者。否则你是无法添加 SSH key 的。
使用https url很好用？？？

### https 和 SSH 的区别：
1、前者可以随意克隆github上的项目，而不管是谁的；而后者则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key ，否则无法克隆。

2、https url 在push的时候是需要验证用户名和密码的；而 SSH 在push的时候，是不需要输入用户名的，如果配置SSH key的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。

```
ssh -T git@github.com    查看是否配置好
ssh-keygen -t rsa -C "邮件地址"
```

代码参数含义：

-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。

以上代码省略了 -f 参数，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。
接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码），

当然，你也可以不输入密码，直接按回车。那么push的时候就不需要输入密码（推荐），直接提交到github上了。




[TOC]

# git入门知识汇总

# 0、前言
## 配置一个完整的环境简单步骤
```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
ssh-keygen -t rsa -C "邮件地址"
拷贝生成的公钥到git的ssh钥匙中：/root/.ssh/id_rsa.pub
```

## 0-1、安装git

使用镜像网站不错。
[下载Windows下的Git命令行客户端](https://repo.huaweicloud.com/git-for-windows/)
[下载Windows下的Git小海龟客户端](https://repo.huaweicloud.com/tortoisegit/)

1、 先安装Git.exe
2、 再安装TortoiseGit.msi
3、 根据自己喜欢安装中文翻译补丁包LanguagePack



git update-git-for-windows   更新git客户端

## 0-2、解决TortoiseGit文件夹和文件状态图标不显示问题

- 先重启试试
- 修改注册表
- 设置里面设置显示icon overlays

# 1、使用git下载单个指定的文件夹

更多搜索“稀疏检出”。



```
稀疏检出恢复：

SC_FILE=.git/info/sparse-checkout
echo "Undoing sparse checkout"

# Get the full tree back

echo "*" > $SC_FILE
git config core.sparsecheckout true
git read-tree --reset -u HEAD

# Wipe out all traces of sparse checkout support

rm -rf $SC_FILE
git config core.sparsecheckout false
```





参考：https://www.cnblogs.com/zhoudaxiaa/p/8670481.html

方法一：http://zhoudaxiaa.gitee.io/downgit/#/home

方法二：

在Git1.7.0以前，这无法实现，但是幸运的是在Git1.7.0以后加入了Sparse Checkout模式，这使得Check Out指定文件或者文件夹成为可能。

**举个例子：**

> 现在有一个**test**仓库https://github.com/mygithub/test
> 你要gitclone里面的**tt**子目录：
> 在本地的硬盘位置打开**Git Bash**

```
git init test && cd test     //新建仓库并进入文件夹
git config core.sparsecheckout true //设置允许克隆子目录

echo 'tt*' >> .git/info/sparse-checkout //设置要克隆的仓库的子目录路径   //空格别漏

git remote add origin git@github.com:mygithub/test.git  //这里换成你要克隆的项目和库

git pull origin master    //下载
```

 https://blog.csdn.net/qq_35860352/article/details/80313078 不行

## 下载指定分支

git clone -b branch git@github.com:github/test.git 



**重点看这里**：

# 2、git add命令参数说明

git add -u：将文件的修改、文件的删除，添加到暂存区。
git add .：将文件的修改，文件的新建，添加到暂存区。
git add -A：将文件的修改，文件的删除，文件的新建，添加到暂存区。

-u就是update的意思，只会标记本地有改动（包括删除和修改）的已经追踪的文件

\1.  git add -A   保存所有的修改

\2.  git add .     保存新的添加和修改，但是不包括删除

\3.  git add -u   保存修改和删除，但是不包括新建文件。



# 3、git push 的 -u 参数具体适合含义？

一般只有同时存在多个远程仓库时才会用到--set-upstream。每个git branch可以有个对应的upstream。假设你有两个upstream，分别叫server1和server2，本地master branch的upstream是server1上的master，那么当你不带参数直接输入git pull或者git push时，默认是对server1进行pull/push。如果你成功运行"git push -u server2 master"，那么除了本地branch会被push到server2之外，还会把server2设置成upstream。



```
-u, --set-upstream
For every branch that is up to date or successfully pushed, add upstream (tracking) reference, used by argument-less git-pull(1) and other commands.
```

upstream不是针对远程仓库的，而是针对branch的，这一点应了那位童鞋所说的第二句话。但是upstream和有几个远程库没有必然联系。比如远程库A上有3个分支branch1、branch2、branch3。远程库B上有3个分支branchx、branchy、branchz。本地仓库有2个分支local1和local2。那么当初始状态时，local1和local2和任何一个分支都没有关联，也就是没有upstream。当通过git branch --set-upstream-to A/branch1 local1命令执行后，会给local1和branch1两个分支建立关联，也就是说local1的upstream指向的是branch1。这样的好处就是在local1分支上执行git push（git pull同理）操作时不用附加其它参数，Git就会自动将local1分支上的内容push到branch1上去。同样，local2分支也可以和远程库A和远程库B上的任何一个分支建立关联，只要给local2分支设置了upstream，就可以在local2分支上用git push（git pull同理）方便地与目标分支推拉数据。

综上所述，upstream与有几个远程库没有关系，它是分支与分支之间的流通道。

再来说说git push -u和git branch --set-upstream-to指令之间的区别。

举个例子：我要把本地分支mybranch1与远程仓库origin里的分支mybranch1建立关联。

（如果使用下列途径1的话，首先，你要切换到mybranch1分支上（git checkout mybranch1））

两个途径：1. git push -u origin mybranch1  2. git branch --set-upstream-to=origin/mybranch1 mybranch1

这两种方式都可以达到目的。但是1方法更通用，因为你的远程库有可能并没有mybranch1分支，这种情况下你用2方法就不可行，连目标分支都不存在，怎么进行关联呢？所以可以总结一下：git push -u origin mybranch1 相当于 git push origin mybranch1 + git branch --set-upstream-to=origin/mybranch1 mybranch1



# 4、分支管理

```
git branch 查看本地分支
git branch -r 查看远程分支
git branch -a 查看所有分支
git checkout [Bname] 切换分支
git push origin [Bname] 将空分支上传可以看作删除远程分支
git push origin --delete [Bname] 删除远程分支
git ls-remote origin [Bname] 查看远程仓库是否有这个分支，有就有返回值，没有就什么都没有
git remote [-v] 查看远程仓库地址
git branch -m oldBranchName newBranchName 重命名
```

## 4-1、删除分支

```
git branch -d [本地分支名]
git branch -D [本地分支名]
git branch -r -D [远程分支名]
```

## 4-2、合并分支

1. git pull (git checkout -b newBname Bname)



一、开发分支（dev）上的代码达到上线的标准后，要合并到 master 分支

```
git checkout dev
git pull
git checkout master
git merge dev
git push -u origin master
```

二、当master代码改动了，需要更新开发分支（dev）上的代码

```
git checkout master 
git pull 
git checkout dev
git merge master 
git push -u origin dev
```

## 4-3、远程分支覆盖本地分支

有时候同一个分支，远程的和本地的都被修改的面目全非了，如果想要把本地的替换成远程的，用下面的命令

git fetch --all
git reset --hard origin/master (这里master要修改为对应的分支名)
git pull

# 5、git冲突

当上传的时候产生冲突时：

## 5-1、在线git解决

方便快捷操作简单。

## 5-2、检出，在本地审查和合并

- git pull origin 分支（生产冲突文件）
- 在冲突文件里修改：删除和保留（git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容（数量为7））
- git add 冲突文件
- git commit
- git push


Step 1. 获取并检出此合并请求的分支

git fetch origin
git checkout -b [bName] origin/冲突分支

Step 2. 本地审查变更（忽略）

Step 3. 合并分支并修复出现的任何冲突

git checkout master
git merge --no-ff [bName]（本地就有冲突文件了，注意看产生冲突的文件）

Step 4. 推送合并的结果到 GitLab

git checkout -b [newBName]

git push origin [newBName]

# 6、git commit

### 修改commit内容
当我们想要对上一次的提交进行修改时，我们可以使用git commit –amend命令。git commit –amend既可以对上次提交的内容进行修改，也可以修改提交说明。

如果有新的文件修改，需要合并到最近一次提交的commit里面，也可以使用上面命令直接修改即可。


> git commit --amend -no-edit

git status
git log
git show

### 6-1、删除commit

> git reset HEAD^    删除最新commit记录

### 6-2、误删除commit

- git reflog
- git reset commitId

# 7、多个commit合并(git rebase)  

实战中终于理解这条命令的作用。当我们在合并请求时又双叒叕发现一个小错误，又不得不commit一次，真想删除分支全部重新提交。但是commit是可以合并的。
[git 几个commit点合并成一个commit点](https://blog.csdn.net/u013276277/article/details/82470177)

- 1、git status当前所有修改是否都commit。如果没有后面rebase无法继续。
- 2、git log查看commitId
- 3、git rebase -i commitId（commitId是合并后的commitId的前一个）**即不影响的log**
- 4、**将删除的commit记录前面的pick改为squash，保存退出**
- 5、修改commit内容
- 6、git log查看合并结果 
- 7、git push origin [Bname] -f 可能提交会产生冲突，建议强制

  (use "git rebase --edit-todo" to view and edit)
You are currently editing a commit while rebasing branch 'hejian' on 'ddd330e'.
  (use "git commit --amend" to amend the current commit)
  (use "git rebase --continue" once you are satisfied with your changes)

# 8、如何切换分支并且改变其修改的不同的内容

就是本地像远程分支管理一样，不同分支不同的内容。但是实践看到都是一样的，后来发现姿势不对。

### 实验

```
mkdir Github   本地Github文件夹
cd Github
git init
vi helloworld.txt
	wuli github
git branch father    
git add .
git commit -m"add txt"
git checkout -b son   注意:这种创建分支的方式是将当前的分支复制到了新分支，因此尽量在修改代码前创建分支

vi helloworld.txt
	wuli github
	yes,you are right
git add .
git commit -m"update"
git log
	add txt
	update
git checkout father
git log
	add txt			这时候发现commit日志会出现不同。并且helloworld文件的内容也会随切换不同分支而改变
```

注意：当两个分支前面的commit日志一模一样的时候，是可以随意切换checkout的，但是不同的时候是需要先commit才能切换，stash也能解决这个问题。

总结：远程和本地一样，这就为啥有个叫本地仓库的概念了，本地修改了内容尽量commit到本地，只有commit了才会切换分支看到效果。

# 9、stash的作用

[stash —— 一个极度实用的Git操作](https://www.jianshu.com/p/fcf69e2d3e6b)
git stash   藏好代码
git stash list  

- git stash pop  [stash@{0}] （删除stash记录）
- git stash apply （不删除stash记录）

好习惯：master作为备份更新，第一步是创建新分支。当有新问题的时候，stash后去master分支创建新分支。

上面的commit一定是最新的。



超级好用：

git stash

git stash pop

git stash list

git stash -h



# 10、Git 全局设置（必须）

```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
```

- git config --list     查看配置信息
- git config -l
- git config --local -l
- git config --global -l

# 11、回退命令（放弃所有本地修改）

```
git reflog
git reset --hard 7edb984	放弃修改
git reset --soft 7edb984 	回到commit之前
git checkout -- filename	撤销文件的修改
HEAD
HEAD~3
commit_id

强推到远程
git push origin HEAD --force

```

可引用git checkout或者用git clean -df至修改前的状态。就可以放弃所有修改。

1、git checkout功能是本地所有修改的。没有的提交的，都返回到原来的状态

2、git stash功能是把所有没有提交的修改暂存到stash里面。可用git stash [pop](https://www.baidu.com/s?wd=pop&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)回复。

3、git reset --hard HASH功能是返回到某个节点，不保留修改。

4、git reset --soft HASH功能是返回到某个节点。保留修改。

5、git clean -df功能是保留修改，返回到某个节点。

**拓展资料**：

1、Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

[![img](https://img3.mukewang.com/5c773adf000145dc06000425.jpg)](https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7acb0a46f21fbe094c3be72c66600c338744ada4.jpg)

2、Torvalds 开始着手开发 Git 是为了作为一种过渡方案来替代 BitKeeper，后者之前一直是 Linux 内核开发人员在全球使用的主要源代码工具。开放源码社区中的有些人觉得BitKeeper 的许可证并不适合开放源码社区的工作，因此 Torvalds 决定着手研究许可证更为灵活的版本控制系统。尽管最初 Git 的开发是为了辅助 Linux 内核开发的过程，但是我们已经发现在很多其他自由软件项目中也使用了 Git。例如 很多 Freedesktop 的项目迁移到了 Git 上。



# # 12、Updates were rejected because the tip of your current branch is behind

1.使用强制push的方法：

$ git push -u origin master -f 

这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

2.push前先将远程repository修改pull下来

$ git pull origin master

$ git push -u origin master   （后续就是解决冲突）



# 13、git clean 的用法（如何使用Git删除新增的文件？）

git clean命令用来从你的工作目录中删除所有没有track过的文件
git clean经常和git reset --hard一起使用. 记住reset只影响被track过的文件, 所以需要clean来删除没有track过的文件. 结合使用这两个命令能让你的工作目录完全回到一个指定的的状态

```
git clean -n
```

是一次clean的演习, 告诉你哪些文件会被删除. 记住它不会真正地删除文件, 只是一个提醒。

```
git clean -f
```

删除当前目录下所有没有track过的文件. 它不会删除 .gitignore 文件里指定的文件夹和文件, 不管这些文件有没有被track过

```
git clean -f <path>
```

删除指定路径下的没有被track过的文件

```
git clean -df
```

删除当前目录下没有被track过的文件和文件夹

```
git clean -xf
```

删除当前目录下所有没有track过的文件. 不管它是否是 .gitignore 文件里面指定的文件夹和文件

`git reset --hard` 和 `git clean -f` 是一对好基友. 结合使用它们能让你的工作目录完全回退到最近一次commit的时候

`git clean` 对于刚编译过的项目也非常有用. 如, 它能轻易删除掉编译后生成的 .o 和 .exe 等文件. 这个在打包要发布一个release的时候非常有用

下面的例子要删除所有工作目录下面的修改, 包括新添加的文件. 假设你已经提交了一些快照了, 而且做了一些新的开发

```
git reset --hard

git clean -df
```

运行后, 工作目录和缓存区回到最近一次commit时候一摸一样的状态，git status会告诉你这是一个干净的工作目录, 又是一个新的开始了！

## 其他

--force
--hard
--soft
-d  等价于  --delete
-u  表示：
加了参数-u后，以后即可直接用git push 代替git push origin master
在git add -u中表示添加此次修改的全部原先存在的文件（即新建的不会添加 --update）。

```
1) 远程仓库相关命令
检出仓库：$ git clone git://github.com/jquery/jquery.git
查看远程仓库：$ git remote -v
添加远程仓库：$ git remote add [name] [url]
删除远程仓库：$ git remote rm [name]
修改远程仓库：$ git remote set-url --push[name][newUrl]
拉取远程仓库：$ git pull [remoteName] [localBranchName]
推送远程仓库：$ git push [remoteName] [localBranchName]
 
2）分支(branch)操作相关命令
查看本地分支：$ git branch
查看远程分支：$ git branch -r
创建本地分支：$ git branch [name] ----注意新分支创建后不会自动切换为当前分支
切换分支：$ git checkout [name]
创建新分支并立即切换到新分支：$ git checkout -b [name]
删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：$ git merge [name] ----将名称为[name]的分支与当前分支合并
创建远程分支(本地分支push到远程)：$ git push origin [name]
删除远程分支：$ git push origin :heads/[name]
```



## mintty.exe.stackdump文件

关于Git bash在win10重装系统情况下闪退并生成mintty.exe.stackdump文件的问题

总结：我也是在git commit时闪退产生了这个文件。试了几次同样的commit内容一直闪退，原因可能是中文时输入英文字母按回车键后闪退，然后在输入英文时shift切换没有闪退情况。我的问题不大，不能解决闪退网上有很多解决方法。





# 哭笑不得：git branch -a看不见一个分支

如果是下载项目就不要使用`git init test && cd test`初始化。

使用`git clone git@git.com master`下载项目后，会在当前目录下新建文件夹master并将项目下载这个目录下。

由于先前init初始化后，导致没有进入项目的文件夹中，使用git branch -a看不见任何分支。













更新服务端的分支到本地仓库
git fetch --all
列出所有的分支
git branch --all
切换到一个已有的分支
git checkout <您的分支名>
基于当前分支新建一个分支
git checkout -b <您的新分支名>
推送当前分支到服务端
git push origin <您的分支名>
删除本地的一个分支（当前所在分支和要删除的分支不能相同）
git branch -D <您的分支名>
删除服务端的一个分支
git push origin :<您的分支名>





应该右上角会有ssh和https转换，然而并没有。但是两者使用是一样的。
git clone -b gitbhttps://github.com/HanKin2015/GitBook.git

2. 远程分支重命名 (已经推送远程-假设本地分支和远程对应分支名称相同)
   a. 重命名远程分支对应的本地分支

git branch -m oldName newName
b. 删除远程分支

git push --delete origin oldName
c. 上传新命名的本地分支

git push origin newName
d.把修改后的本地分支与远程分支关联

git branch --set-upstream-to origin/newName



http://issuecdn.baidupcs.com/issue/netdisk/yunguanjia/BaiduNetdisk_6.8.1.3.exe


## Git 恢复本地误删的文件
起因：git clone下来的项目不久后就自动出现修改的红色感叹号标志，实际什么都没有做。后来猜测应该是杀毒软件之类的给我自动删除了，后来还真是。使用恢复方法恢复后，一会儿又给我删除了，要么关闭杀毒软件或者添加信任。

使用git pull --force强制拉取

正确的打开方式：
```
git reset HEAD 文件或文件夹
git checkout 文件或文件夹
```


## 14、进阶
### .gitignore
一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。来看一个实际的例子：
$ cat .gitignore
*.[oa]
*~
第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本。第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。

### 打patch
生成patch：
git format-patch commitID -1 生成当前commitID 的patch
git format-patch commitID -3 从当前commitID开始往下生成总共三个commit的patch文件
应用patch：
git apply --check xxx.patch 检查当前patch是否可以成功打入
git apply xxx.patch
git apply *.patch 同时打入所有patch

### 自定义别名（更高级的git log）
```
alias lg="git log --graph --pretty=format:’'Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit "
```

### git子模块使用
一个大型工程总会被分拆为一些子工程,git-submodule 就是完成这样一种子工程拆分与整合的工具.

添加一个子工程
git submodule add git@xxxx:subproj.git subproj
git commit -m “submodule added”

克隆一个带submodule的git仓库
git clone git@domain.com:massproj.git
git submodule init
git submodule update
或者
git clone --rescursive git@domain.com:massproj.git


查看修改的文件
git log --stat

查看commitID的具体修改
git log -p

查看文件最后的修改人
git blame -L 起始行号,结束行号



# git学习笔记

# 1、下载安装git
>sudo apt install git

明白为啥使用sudo而不是直接root账户，防止错误操作，sudo进一步确认了一下。

Windows下载安装很随意。有个注意点：尽量选择下载和上传git仓库的时候不要进行Linux和Windows的换行符的转换，否则在不同环境下运行代码的时候很尴尬。

# 2、配置
## 配置家门，即上传者的身份
设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。以前并没有觉得多大作用，慢慢地发现一个git仓库是可以多人上传的，而这个配置就是显示上传者的身份，一般会填写个人的GitHub相关的信息，比如GitHub用户名和注册邮箱。乱写也是🆗的。

```
$ git config -l  ===  git config --list
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

还有一个local参数，即为单独仓库配置单独的上传者身份。
global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
```

## 修改global配置
简单粗暴：直接使用命令git config --global user.name "Your Name"。。。。
修改配置.gitconfig文件。

## 配置SSH-Key
提交代码需要的github权限，下载私有仓库代码时也会需要这个配置，主要在于上传代码，不配置就会每次输入账户和密码。

如果你想要使用 SSH url 克隆的话，你必须是这个项目的拥有者。否则你是无法添加 SSH key 的。
使用https url很好用？？？

### https 和 SSH 的区别：
1、前者可以随意克隆github上的项目，而不管是谁的；而后者则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key ，否则无法克隆。

2、https url 在push的时候是需要验证用户名和密码的；而 SSH 在push的时候，是不需要输入用户名的，如果配置SSH key的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。

```
ssh -T git@github.com    查看是否配置好
ssh-keygen -t rsa -C "邮件地址"
```

代码参数含义：

-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。

以上代码省略了 -f 参数，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。
接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码），

当然，你也可以不输入密码，直接按回车。那么push的时候就不需要输入密码（推荐），直接提交到github上了。




[TOC]

# git入门知识汇总

# 0、前言
## 配置一个完整的环境简单步骤
```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
ssh-keygen -t rsa -C "邮件地址"
拷贝生成的公钥到git的ssh钥匙中：/root/.ssh/id_rsa.pub
```

## 0-1、安装git

使用镜像网站不错。
[下载Windows下的Git命令行客户端](https://repo.huaweicloud.com/git-for-windows/)
[下载Windows下的Git小海龟客户端](https://repo.huaweicloud.com/tortoisegit/)

1、 先安装Git.exe
2、 再安装TortoiseGit.msi
3、 根据自己喜欢安装中文翻译补丁包LanguagePack



git update-git-for-windows   更新git客户端

## 0-2、解决TortoiseGit文件夹和文件状态图标不显示问题

- 先重启试试
- 修改注册表
- 设置里面设置显示icon overlays

# 1、使用git下载单个指定的文件夹

更多搜索“稀疏检出”。



```
稀疏检出恢复：

SC_FILE=.git/info/sparse-checkout
echo "Undoing sparse checkout"

# Get the full tree back

echo "*" > $SC_FILE
git config core.sparsecheckout true
git read-tree --reset -u HEAD

# Wipe out all traces of sparse checkout support

rm -rf $SC_FILE
git config core.sparsecheckout false
```





参考：https://www.cnblogs.com/zhoudaxiaa/p/8670481.html

方法一：http://zhoudaxiaa.gitee.io/downgit/#/home

方法二：

在Git1.7.0以前，这无法实现，但是幸运的是在Git1.7.0以后加入了Sparse Checkout模式，这使得Check Out指定文件或者文件夹成为可能。

**举个例子：**

> 现在有一个**test**仓库https://github.com/mygithub/test
> 你要gitclone里面的**tt**子目录：
> 在本地的硬盘位置打开**Git Bash**

```
git init test && cd test     //新建仓库并进入文件夹
git config core.sparsecheckout true //设置允许克隆子目录

echo 'tt*' >> .git/info/sparse-checkout //设置要克隆的仓库的子目录路径   //空格别漏

git remote add origin git@github.com:mygithub/test.git  //这里换成你要克隆的项目和库

git pull origin master    //下载
```

 https://blog.csdn.net/qq_35860352/article/details/80313078 不行

## 下载指定分支

git clone -b branch git@github.com:github/test.git 



**重点看这里**：

# 2、git add命令参数说明

git add -u：将文件的修改、文件的删除，添加到暂存区。
git add .：将文件的修改，文件的新建，添加到暂存区。
git add -A：将文件的修改，文件的删除，文件的新建，添加到暂存区。

-u就是update的意思，只会标记本地有改动（包括删除和修改）的已经追踪的文件

\1.  git add -A   保存所有的修改

\2.  git add .     保存新的添加和修改，但是不包括删除

\3.  git add -u   保存修改和删除，但是不包括新建文件。



# 3、git push 的 -u 参数具体适合含义？

一般只有同时存在多个远程仓库时才会用到--set-upstream。每个git branch可以有个对应的upstream。假设你有两个upstream，分别叫server1和server2，本地master branch的upstream是server1上的master，那么当你不带参数直接输入git pull或者git push时，默认是对server1进行pull/push。如果你成功运行"git push -u server2 master"，那么除了本地branch会被push到server2之外，还会把server2设置成upstream。



```
-u, --set-upstream
For every branch that is up to date or successfully pushed, add upstream (tracking) reference, used by argument-less git-pull(1) and other commands.
```

upstream不是针对远程仓库的，而是针对branch的，这一点应了那位童鞋所说的第二句话。但是upstream和有几个远程库没有必然联系。比如远程库A上有3个分支branch1、branch2、branch3。远程库B上有3个分支branchx、branchy、branchz。本地仓库有2个分支local1和local2。那么当初始状态时，local1和local2和任何一个分支都没有关联，也就是没有upstream。当通过git branch --set-upstream-to A/branch1 local1命令执行后，会给local1和branch1两个分支建立关联，也就是说local1的upstream指向的是branch1。这样的好处就是在local1分支上执行git push（git pull同理）操作时不用附加其它参数，Git就会自动将local1分支上的内容push到branch1上去。同样，local2分支也可以和远程库A和远程库B上的任何一个分支建立关联，只要给local2分支设置了upstream，就可以在local2分支上用git push（git pull同理）方便地与目标分支推拉数据。

综上所述，upstream与有几个远程库没有关系，它是分支与分支之间的流通道。

再来说说git push -u和git branch --set-upstream-to指令之间的区别。

举个例子：我要把本地分支mybranch1与远程仓库origin里的分支mybranch1建立关联。

（如果使用下列途径1的话，首先，你要切换到mybranch1分支上（git checkout mybranch1））

两个途径：1. git push -u origin mybranch1  2. git branch --set-upstream-to=origin/mybranch1 mybranch1

这两种方式都可以达到目的。但是1方法更通用，因为你的远程库有可能并没有mybranch1分支，这种情况下你用2方法就不可行，连目标分支都不存在，怎么进行关联呢？所以可以总结一下：git push -u origin mybranch1 相当于 git push origin mybranch1 + git branch --set-upstream-to=origin/mybranch1 mybranch1



# 4、分支管理

```
git branch 查看本地分支
git branch -r 查看远程分支
git branch -a 查看所有分支
git checkout [Bname] 切换分支
git push origin [Bname] 将空分支上传可以看作删除远程分支
git push origin --delete [Bname] 删除远程分支
git ls-remote origin [Bname] 查看远程仓库是否有这个分支，有就有返回值，没有就什么都没有
git remote [-v] 查看远程仓库地址
git branch -m oldBranchName newBranchName 重命名
```

## 4-1、删除分支

```
git branch -d [本地分支名]
git branch -D [本地分支名]
git branch -r -D [远程分支名]
```

## 4-2、合并分支

1. git pull (git checkout -b newBname Bname)



一、开发分支（dev）上的代码达到上线的标准后，要合并到 master 分支

```
git checkout dev
git pull
git checkout master
git merge dev
git push -u origin master
```

二、当master代码改动了，需要更新开发分支（dev）上的代码

```
git checkout master 
git pull 
git checkout dev
git merge master 
git push -u origin dev
```

## 4-3、远程分支覆盖本地分支

有时候同一个分支，远程的和本地的都被修改的面目全非了，如果想要把本地的替换成远程的，用下面的命令

git fetch --all
git reset --hard origin/master (这里master要修改为对应的分支名)
git pull

# 5、git冲突

当上传的时候产生冲突时：

## 5-1、在线git解决

方便快捷操作简单。

## 5-2、检出，在本地审查和合并

- git pull origin 分支（生产冲突文件）
- 在冲突文件里修改：删除和保留（git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容（数量为7））
- git add 冲突文件
- git commit
- git push


Step 1. 获取并检出此合并请求的分支

git fetch origin
git checkout -b [bName] origin/冲突分支

Step 2. 本地审查变更（忽略）

Step 3. 合并分支并修复出现的任何冲突

git checkout master
git merge --no-ff [bName]（本地就有冲突文件了，注意看产生冲突的文件）

Step 4. 推送合并的结果到 GitLab

git checkout -b [newBName]

git push origin [newBName]

# 6、git commit

### 修改commit内容
当我们想要对上一次的提交进行修改时，我们可以使用git commit –amend命令。git commit –amend既可以对上次提交的内容进行修改，也可以修改提交说明。

如果有新的文件修改，需要合并到最近一次提交的commit里面，也可以使用上面命令直接修改即可。


> git commit --amend -no-edit

git status
git log
git show

### 6-1、删除commit

> git reset HEAD^    删除最新commit记录

### 6-2、误删除commit

- git reflog
- git reset commitId

# 7、多个commit合并(git rebase)  

实战中终于理解这条命令的作用。当我们在合并请求时又双叒叕发现一个小错误，又不得不commit一次，真想删除分支全部重新提交。但是commit是可以合并的。
[git 几个commit点合并成一个commit点](https://blog.csdn.net/u013276277/article/details/82470177)

- 1、git status当前所有修改是否都commit。如果没有后面rebase无法继续。
- 2、git log查看commitId
- 3、git rebase -i commitId（commitId是合并后的commitId的前一个）**即不影响的log**
- 4、**将删除的commit记录前面的pick改为squash，保存退出**
- 5、修改commit内容
- 6、git log查看合并结果 
- 7、git push origin [Bname] -f 可能提交会产生冲突，建议强制

  (use "git rebase --edit-todo" to view and edit)
You are currently editing a commit while rebasing branch 'hejian' on 'ddd330e'.
  (use "git commit --amend" to amend the current commit)
  (use "git rebase --continue" once you are satisfied with your changes)

# 8、如何切换分支并且改变其修改的不同的内容

就是本地像远程分支管理一样，不同分支不同的内容。但是实践看到都是一样的，后来发现姿势不对。

### 实验

```
mkdir Github   本地Github文件夹
cd Github
git init
vi helloworld.txt
	wuli github
git branch father    
git add .
git commit -m"add txt"
git checkout -b son   注意:这种创建分支的方式是将当前的分支复制到了新分支，因此尽量在修改代码前创建分支

vi helloworld.txt
	wuli github
	yes,you are right
git add .
git commit -m"update"
git log
	add txt
	update
git checkout father
git log
	add txt			这时候发现commit日志会出现不同。并且helloworld文件的内容也会随切换不同分支而改变
```

注意：当两个分支前面的commit日志一模一样的时候，是可以随意切换checkout的，但是不同的时候是需要先commit才能切换，stash也能解决这个问题。

总结：远程和本地一样，这就为啥有个叫本地仓库的概念了，本地修改了内容尽量commit到本地，只有commit了才会切换分支看到效果。

# 9、stash的作用

[stash —— 一个极度实用的Git操作](https://www.jianshu.com/p/fcf69e2d3e6b)
git stash   藏好代码
git stash list  

- git stash pop  [stash@{0}] （删除stash记录）
- git stash apply （不删除stash记录）

好习惯：master作为备份更新，第一步是创建新分支。当有新问题的时候，stash后去master分支创建新分支。

上面的commit一定是最新的。



超级好用：

git stash

git stash pop

git stash list

git stash -h



# 10、Git 全局设置（必须）

```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
```

- git config --list     查看配置信息
- git config -l
- git config --local -l
- git config --global -l

# 11、回退命令（放弃所有本地修改）

```
git reflog
git reset --hard 7edb984	放弃修改
git reset --soft 7edb984 	回到commit之前
git checkout -- filename	撤销文件的修改
HEAD
HEAD~3
commit_id

强推到远程
git push origin HEAD --force

```

可引用git checkout或者用git clean -df至修改前的状态。就可以放弃所有修改。

1、git checkout功能是本地所有修改的。没有的提交的，都返回到原来的状态

2、git stash功能是把所有没有提交的修改暂存到stash里面。可用git stash [pop](https://www.baidu.com/s?wd=pop&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)回复。

3、git reset --hard HASH功能是返回到某个节点，不保留修改。

4、git reset --soft HASH功能是返回到某个节点。保留修改。

5、git clean -df功能是保留修改，返回到某个节点。

**拓展资料**：

1、Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

[![img](https://img3.mukewang.com/5c773adf000145dc06000425.jpg)](https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7acb0a46f21fbe094c3be72c66600c338744ada4.jpg)

2、Torvalds 开始着手开发 Git 是为了作为一种过渡方案来替代 BitKeeper，后者之前一直是 Linux 内核开发人员在全球使用的主要源代码工具。开放源码社区中的有些人觉得BitKeeper 的许可证并不适合开放源码社区的工作，因此 Torvalds 决定着手研究许可证更为灵活的版本控制系统。尽管最初 Git 的开发是为了辅助 Linux 内核开发的过程，但是我们已经发现在很多其他自由软件项目中也使用了 Git。例如 很多 Freedesktop 的项目迁移到了 Git 上。



# # 12、Updates were rejected because the tip of your current branch is behind

1.使用强制push的方法：

$ git push -u origin master -f 

这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

2.push前先将远程repository修改pull下来

$ git pull origin master

$ git push -u origin master   （后续就是解决冲突）



# 13、git clean 的用法（如何使用Git删除新增的文件？）

git clean命令用来从你的工作目录中删除所有没有track过的文件
git clean经常和git reset --hard一起使用. 记住reset只影响被track过的文件, 所以需要clean来删除没有track过的文件. 结合使用这两个命令能让你的工作目录完全回到一个指定的的状态

```
git clean -n
```

是一次clean的演习, 告诉你哪些文件会被删除. 记住它不会真正地删除文件, 只是一个提醒。

```
git clean -f
```

删除当前目录下所有没有track过的文件. 它不会删除 .gitignore 文件里指定的文件夹和文件, 不管这些文件有没有被track过

```
git clean -f <path>
```

删除指定路径下的没有被track过的文件

```
git clean -df
```

删除当前目录下没有被track过的文件和文件夹

```
git clean -xf
```

删除当前目录下所有没有track过的文件. 不管它是否是 .gitignore 文件里面指定的文件夹和文件

`git reset --hard` 和 `git clean -f` 是一对好基友. 结合使用它们能让你的工作目录完全回退到最近一次commit的时候

`git clean` 对于刚编译过的项目也非常有用. 如, 它能轻易删除掉编译后生成的 .o 和 .exe 等文件. 这个在打包要发布一个release的时候非常有用

下面的例子要删除所有工作目录下面的修改, 包括新添加的文件. 假设你已经提交了一些快照了, 而且做了一些新的开发

```
git reset --hard

git clean -df
```

运行后, 工作目录和缓存区回到最近一次commit时候一摸一样的状态，git status会告诉你这是一个干净的工作目录, 又是一个新的开始了！

## 其他

--force
--hard
--soft
-d  等价于  --delete
-u  表示：
加了参数-u后，以后即可直接用git push 代替git push origin master
在git add -u中表示添加此次修改的全部原先存在的文件（即新建的不会添加 --update）。

```
1) 远程仓库相关命令
检出仓库：$ git clone git://github.com/jquery/jquery.git
查看远程仓库：$ git remote -v
添加远程仓库：$ git remote add [name] [url]
删除远程仓库：$ git remote rm [name]
修改远程仓库：$ git remote set-url --push[name][newUrl]
拉取远程仓库：$ git pull [remoteName] [localBranchName]
推送远程仓库：$ git push [remoteName] [localBranchName]
 
2）分支(branch)操作相关命令
查看本地分支：$ git branch
查看远程分支：$ git branch -r
创建本地分支：$ git branch [name] ----注意新分支创建后不会自动切换为当前分支
切换分支：$ git checkout [name]
创建新分支并立即切换到新分支：$ git checkout -b [name]
删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：$ git merge [name] ----将名称为[name]的分支与当前分支合并
创建远程分支(本地分支push到远程)：$ git push origin [name]
删除远程分支：$ git push origin :heads/[name]
```



## mintty.exe.stackdump文件

关于Git bash在win10重装系统情况下闪退并生成mintty.exe.stackdump文件的问题

总结：我也是在git commit时闪退产生了这个文件。试了几次同样的commit内容一直闪退，原因可能是中文时输入英文字母按回车键后闪退，然后在输入英文时shift切换没有闪退情况。我的问题不大，不能解决闪退网上有很多解决方法。





# 哭笑不得：git branch -a看不见一个分支

如果是下载项目就不要使用`git init test && cd test`初始化。

使用`git clone git@git.com master`下载项目后，会在当前目录下新建文件夹master并将项目下载这个目录下。

由于先前init初始化后，导致没有进入项目的文件夹中，使用git branch -a看不见任何分支。













更新服务端的分支到本地仓库
git fetch --all
列出所有的分支
git branch --all
切换到一个已有的分支
git checkout <您的分支名>
基于当前分支新建一个分支
git checkout -b <您的新分支名>
推送当前分支到服务端
git push origin <您的分支名>
删除本地的一个分支（当前所在分支和要删除的分支不能相同）
git branch -D <您的分支名>
删除服务端的一个分支
git push origin :<您的分支名>





应该右上角会有ssh和https转换，然而并没有。但是两者使用是一样的。
git clone -b gitbhttps://github.com/HanKin2015/GitBook.git

2. 远程分支重命名 (已经推送远程-假设本地分支和远程对应分支名称相同)
   a. 重命名远程分支对应的本地分支

git branch -m oldName newName
b. 删除远程分支

git push --delete origin oldName
c. 上传新命名的本地分支

git push origin newName
d.把修改后的本地分支与远程分支关联

git branch --set-upstream-to origin/newName



http://issuecdn.baidupcs.com/issue/netdisk/yunguanjia/BaiduNetdisk_6.8.1.3.exe


## Git 恢复本地误删的文件
起因：git clone下来的项目不久后就自动出现修改的红色感叹号标志，实际什么都没有做。后来猜测应该是杀毒软件之类的给我自动删除了，后来还真是。使用恢复方法恢复后，一会儿又给我删除了，要么关闭杀毒软件或者添加信任。

使用git pull --force强制拉取

正确的打开方式：
```
git reset HEAD 文件或文件夹
git checkout 文件或文件夹
```


## 14、进阶
### .gitignore
一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。来看一个实际的例子：
$ cat .gitignore
*.[oa]
*~
第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本。第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。

### 打patch
生成patch：
git format-patch commitID -1 生成当前commitID 的patch
git format-patch commitID -3 从当前commitID开始往下生成总共三个commit的patch文件
应用patch：
git apply --check xxx.patch 检查当前patch是否可以成功打入
git apply xxx.patch
git apply *.patch 同时打入所有patch

### 自定义别名（更高级的git log）
```
alias lg="git log --graph --pretty=format:’'Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit "
```

### git子模块使用
一个大型工程总会被分拆为一些子工程,git-submodule 就是完成这样一种子工程拆分与整合的工具.

添加一个子工程
git submodule add git@xxxx:subproj.git subproj
git commit -m “submodule added”

克隆一个带submodule的git仓库
git clone git@domain.com:massproj.git
git submodule init
git submodule update
或者
git clone --rescursive git@domain.com:massproj.git


查看修改的文件
git log --stat

查看commitID的具体修改
git log -p

查看文件最后的修改人
git blame -L 起始行号,结束行号



# git学习笔记

# 1、下载安装git
>sudo apt install git

明白为啥使用sudo而不是直接root账户，防止错误操作，sudo进一步确认了一下。

Windows下载安装很随意。有个注意点：尽量选择下载和上传git仓库的时候不要进行Linux和Windows的换行符的转换，否则在不同环境下运行代码的时候很尴尬。

# 2、配置
## 配置家门，即上传者的身份
设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。以前并没有觉得多大作用，慢慢地发现一个git仓库是可以多人上传的，而这个配置就是显示上传者的身份，一般会填写个人的GitHub相关的信息，比如GitHub用户名和注册邮箱。乱写也是🆗的。

```
$ git config -l  ===  git config --list
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

还有一个local参数，即为单独仓库配置单独的上传者身份。
global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
```

## 修改global配置
简单粗暴：直接使用命令git config --global user.name "Your Name"。。。。
修改配置.gitconfig文件。

## 配置SSH-Key
提交代码需要的github权限，下载私有仓库代码时也会需要这个配置，主要在于上传代码，不配置就会每次输入账户和密码。

如果你想要使用 SSH url 克隆的话，你必须是这个项目的拥有者。否则你是无法添加 SSH key 的。
使用https url很好用？？？

### https 和 SSH 的区别：
1、前者可以随意克隆github上的项目，而不管是谁的；而后者则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key ，否则无法克隆。

2、https url 在push的时候是需要验证用户名和密码的；而 SSH 在push的时候，是不需要输入用户名的，如果配置SSH key的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。

```
ssh -T git@github.com    查看是否配置好
ssh-keygen -t rsa -C "邮件地址"
```

代码参数含义：

-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。

以上代码省略了 -f 参数，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。
接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码），

当然，你也可以不输入密码，直接按回车。那么push的时候就不需要输入密码（推荐），直接提交到github上了。




[TOC]

# git入门知识汇总

# 0、前言
## 配置一个完整的环境简单步骤
```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
ssh-keygen -t rsa -C "邮件地址"
拷贝生成的公钥到git的ssh钥匙中：/root/.ssh/id_rsa.pub
```

## 0-1、安装git

使用镜像网站不错。
[下载Windows下的Git命令行客户端](https://repo.huaweicloud.com/git-for-windows/)
[下载Windows下的Git小海龟客户端](https://repo.huaweicloud.com/tortoisegit/)

1、 先安装Git.exe
2、 再安装TortoiseGit.msi
3、 根据自己喜欢安装中文翻译补丁包LanguagePack



git update-git-for-windows   更新git客户端

## 0-2、解决TortoiseGit文件夹和文件状态图标不显示问题

- 先重启试试
- 修改注册表
- 设置里面设置显示icon overlays

# 1、使用git下载单个指定的文件夹

更多搜索“稀疏检出”。



```
稀疏检出恢复：

SC_FILE=.git/info/sparse-checkout
echo "Undoing sparse checkout"

# Get the full tree back

echo "*" > $SC_FILE
git config core.sparsecheckout true
git read-tree --reset -u HEAD

# Wipe out all traces of sparse checkout support

rm -rf $SC_FILE
git config core.sparsecheckout false
```





参考：https://www.cnblogs.com/zhoudaxiaa/p/8670481.html

方法一：http://zhoudaxiaa.gitee.io/downgit/#/home

方法二：

在Git1.7.0以前，这无法实现，但是幸运的是在Git1.7.0以后加入了Sparse Checkout模式，这使得Check Out指定文件或者文件夹成为可能。

**举个例子：**

> 现在有一个**test**仓库https://github.com/mygithub/test
> 你要gitclone里面的**tt**子目录：
> 在本地的硬盘位置打开**Git Bash**

```
git init test && cd test     //新建仓库并进入文件夹
git config core.sparsecheckout true //设置允许克隆子目录

echo 'tt*' >> .git/info/sparse-checkout //设置要克隆的仓库的子目录路径   //空格别漏

git remote add origin git@github.com:mygithub/test.git  //这里换成你要克隆的项目和库

git pull origin master    //下载
```

 https://blog.csdn.net/qq_35860352/article/details/80313078 不行

## 下载指定分支

git clone -b branch git@github.com:github/test.git 



**重点看这里**：

# 2、git add命令参数说明

git add -u：将文件的修改、文件的删除，添加到暂存区。
git add .：将文件的修改，文件的新建，添加到暂存区。
git add -A：将文件的修改，文件的删除，文件的新建，添加到暂存区。

-u就是update的意思，只会标记本地有改动（包括删除和修改）的已经追踪的文件

\1.  git add -A   保存所有的修改

\2.  git add .     保存新的添加和修改，但是不包括删除

\3.  git add -u   保存修改和删除，但是不包括新建文件。



# 3、git push 的 -u 参数具体适合含义？

一般只有同时存在多个远程仓库时才会用到--set-upstream。每个git branch可以有个对应的upstream。假设你有两个upstream，分别叫server1和server2，本地master branch的upstream是server1上的master，那么当你不带参数直接输入git pull或者git push时，默认是对server1进行pull/push。如果你成功运行"git push -u server2 master"，那么除了本地branch会被push到server2之外，还会把server2设置成upstream。



```
-u, --set-upstream
For every branch that is up to date or successfully pushed, add upstream (tracking) reference, used by argument-less git-pull(1) and other commands.
```

upstream不是针对远程仓库的，而是针对branch的，这一点应了那位童鞋所说的第二句话。但是upstream和有几个远程库没有必然联系。比如远程库A上有3个分支branch1、branch2、branch3。远程库B上有3个分支branchx、branchy、branchz。本地仓库有2个分支local1和local2。那么当初始状态时，local1和local2和任何一个分支都没有关联，也就是没有upstream。当通过git branch --set-upstream-to A/branch1 local1命令执行后，会给local1和branch1两个分支建立关联，也就是说local1的upstream指向的是branch1。这样的好处就是在local1分支上执行git push（git pull同理）操作时不用附加其它参数，Git就会自动将local1分支上的内容push到branch1上去。同样，local2分支也可以和远程库A和远程库B上的任何一个分支建立关联，只要给local2分支设置了upstream，就可以在local2分支上用git push（git pull同理）方便地与目标分支推拉数据。

综上所述，upstream与有几个远程库没有关系，它是分支与分支之间的流通道。

再来说说git push -u和git branch --set-upstream-to指令之间的区别。

举个例子：我要把本地分支mybranch1与远程仓库origin里的分支mybranch1建立关联。

（如果使用下列途径1的话，首先，你要切换到mybranch1分支上（git checkout mybranch1））

两个途径：1. git push -u origin mybranch1  2. git branch --set-upstream-to=origin/mybranch1 mybranch1

这两种方式都可以达到目的。但是1方法更通用，因为你的远程库有可能并没有mybranch1分支，这种情况下你用2方法就不可行，连目标分支都不存在，怎么进行关联呢？所以可以总结一下：git push -u origin mybranch1 相当于 git push origin mybranch1 + git branch --set-upstream-to=origin/mybranch1 mybranch1



# 4、分支管理

```
git branch 查看本地分支
git branch -r 查看远程分支
git branch -a 查看所有分支
git checkout [Bname] 切换分支
git push origin [Bname] 将空分支上传可以看作删除远程分支
git push origin --delete [Bname] 删除远程分支
git ls-remote origin [Bname] 查看远程仓库是否有这个分支，有就有返回值，没有就什么都没有
git remote [-v] 查看远程仓库地址
git branch -m oldBranchName newBranchName 重命名
```

## 4-1、删除分支

```
git branch -d [本地分支名]
git branch -D [本地分支名]
git branch -r -D [远程分支名]
```

## 4-2、合并分支

1. git pull (git checkout -b newBname Bname)



一、开发分支（dev）上的代码达到上线的标准后，要合并到 master 分支

```
git checkout dev
git pull
git checkout master
git merge dev
git push -u origin master
```

二、当master代码改动了，需要更新开发分支（dev）上的代码

```
git checkout master 
git pull 
git checkout dev
git merge master 
git push -u origin dev
```

## 4-3、远程分支覆盖本地分支

有时候同一个分支，远程的和本地的都被修改的面目全非了，如果想要把本地的替换成远程的，用下面的命令

git fetch --all
git reset --hard origin/master (这里master要修改为对应的分支名)
git pull

# 5、git冲突

当上传的时候产生冲突时：

## 5-1、在线git解决

方便快捷操作简单。

## 5-2、检出，在本地审查和合并

- git pull origin 分支（生产冲突文件）
- 在冲突文件里修改：删除和保留（git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容（数量为7））
- git add 冲突文件
- git commit
- git push


Step 1. 获取并检出此合并请求的分支

git fetch origin
git checkout -b [bName] origin/冲突分支

Step 2. 本地审查变更（忽略）

Step 3. 合并分支并修复出现的任何冲突

git checkout master
git merge --no-ff [bName]（本地就有冲突文件了，注意看产生冲突的文件）

Step 4. 推送合并的结果到 GitLab

git checkout -b [newBName]

git push origin [newBName]

# 6、git commit

### 修改commit内容
当我们想要对上一次的提交进行修改时，我们可以使用git commit –amend命令。git commit –amend既可以对上次提交的内容进行修改，也可以修改提交说明。

如果有新的文件修改，需要合并到最近一次提交的commit里面，也可以使用上面命令直接修改即可。


> git commit --amend -no-edit

git status
git log
git show

### 6-1、删除commit

> git reset HEAD^    删除最新commit记录

### 6-2、误删除commit

- git reflog
- git reset commitId

# 7、多个commit合并(git rebase)  

实战中终于理解这条命令的作用。当我们在合并请求时又双叒叕发现一个小错误，又不得不commit一次，真想删除分支全部重新提交。但是commit是可以合并的。
[git 几个commit点合并成一个commit点](https://blog.csdn.net/u013276277/article/details/82470177)

- 1、git status当前所有修改是否都commit。如果没有后面rebase无法继续。
- 2、git log查看commitId
- 3、git rebase -i commitId（commitId是合并后的commitId的前一个）**即不影响的log**
- 4、**将删除的commit记录前面的pick改为squash，保存退出**
- 5、修改commit内容
- 6、git log查看合并结果 
- 7、git push origin [Bname] -f 可能提交会产生冲突，建议强制

  (use "git rebase --edit-todo" to view and edit)
You are currently editing a commit while rebasing branch 'hejian' on 'ddd330e'.
  (use "git commit --amend" to amend the current commit)
  (use "git rebase --continue" once you are satisfied with your changes)

# 8、如何切换分支并且改变其修改的不同的内容

就是本地像远程分支管理一样，不同分支不同的内容。但是实践看到都是一样的，后来发现姿势不对。

### 实验

```
mkdir Github   本地Github文件夹
cd Github
git init
vi helloworld.txt
	wuli github
git branch father    
git add .
git commit -m"add txt"
git checkout -b son   注意:这种创建分支的方式是将当前的分支复制到了新分支，因此尽量在修改代码前创建分支

vi helloworld.txt
	wuli github
	yes,you are right
git add .
git commit -m"update"
git log
	add txt
	update
git checkout father
git log
	add txt			这时候发现commit日志会出现不同。并且helloworld文件的内容也会随切换不同分支而改变
```

注意：当两个分支前面的commit日志一模一样的时候，是可以随意切换checkout的，但是不同的时候是需要先commit才能切换，stash也能解决这个问题。

总结：远程和本地一样，这就为啥有个叫本地仓库的概念了，本地修改了内容尽量commit到本地，只有commit了才会切换分支看到效果。

# 9、stash的作用

[stash —— 一个极度实用的Git操作](https://www.jianshu.com/p/fcf69e2d3e6b)
git stash   藏好代码
git stash list  

- git stash pop  [stash@{0}] （删除stash记录）
- git stash apply （不删除stash记录）

好习惯：master作为备份更新，第一步是创建新分支。当有新问题的时候，stash后去master分支创建新分支。

上面的commit一定是最新的。



超级好用：

git stash

git stash pop

git stash list

git stash -h



# 10、Git 全局设置（必须）

```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
```

- git config --list     查看配置信息
- git config -l
- git config --local -l
- git config --global -l

# 11、回退命令（放弃所有本地修改）

```
git reflog
git reset --hard 7edb984	放弃修改
git reset --soft 7edb984 	回到commit之前
git checkout -- filename	撤销文件的修改
HEAD
HEAD~3
commit_id

强推到远程
git push origin HEAD --force

```

可引用git checkout或者用git clean -df至修改前的状态。就可以放弃所有修改。

1、git checkout功能是本地所有修改的。没有的提交的，都返回到原来的状态

2、git stash功能是把所有没有提交的修改暂存到stash里面。可用git stash [pop](https://www.baidu.com/s?wd=pop&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)回复。

3、git reset --hard HASH功能是返回到某个节点，不保留修改。

4、git reset --soft HASH功能是返回到某个节点。保留修改。

5、git clean -df功能是保留修改，返回到某个节点。

**拓展资料**：

1、Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

[![img](https://img3.mukewang.com/5c773adf000145dc06000425.jpg)](https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7acb0a46f21fbe094c3be72c66600c338744ada4.jpg)

2、Torvalds 开始着手开发 Git 是为了作为一种过渡方案来替代 BitKeeper，后者之前一直是 Linux 内核开发人员在全球使用的主要源代码工具。开放源码社区中的有些人觉得BitKeeper 的许可证并不适合开放源码社区的工作，因此 Torvalds 决定着手研究许可证更为灵活的版本控制系统。尽管最初 Git 的开发是为了辅助 Linux 内核开发的过程，但是我们已经发现在很多其他自由软件项目中也使用了 Git。例如 很多 Freedesktop 的项目迁移到了 Git 上。



# # 12、Updates were rejected because the tip of your current branch is behind

1.使用强制push的方法：

$ git push -u origin master -f 

这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

2.push前先将远程repository修改pull下来

$ git pull origin master

$ git push -u origin master   （后续就是解决冲突）



# 13、git clean 的用法（如何使用Git删除新增的文件？）

git clean命令用来从你的工作目录中删除所有没有track过的文件
git clean经常和git reset --hard一起使用. 记住reset只影响被track过的文件, 所以需要clean来删除没有track过的文件. 结合使用这两个命令能让你的工作目录完全回到一个指定的的状态

```
git clean -n
```

是一次clean的演习, 告诉你哪些文件会被删除. 记住它不会真正地删除文件, 只是一个提醒。

```
git clean -f
```

删除当前目录下所有没有track过的文件. 它不会删除 .gitignore 文件里指定的文件夹和文件, 不管这些文件有没有被track过

```
git clean -f <path>
```

删除指定路径下的没有被track过的文件

```
git clean -df
```

删除当前目录下没有被track过的文件和文件夹

```
git clean -xf
```

删除当前目录下所有没有track过的文件. 不管它是否是 .gitignore 文件里面指定的文件夹和文件

`git reset --hard` 和 `git clean -f` 是一对好基友. 结合使用它们能让你的工作目录完全回退到最近一次commit的时候

`git clean` 对于刚编译过的项目也非常有用. 如, 它能轻易删除掉编译后生成的 .o 和 .exe 等文件. 这个在打包要发布一个release的时候非常有用

下面的例子要删除所有工作目录下面的修改, 包括新添加的文件. 假设你已经提交了一些快照了, 而且做了一些新的开发

```
git reset --hard

git clean -df
```

运行后, 工作目录和缓存区回到最近一次commit时候一摸一样的状态，git status会告诉你这是一个干净的工作目录, 又是一个新的开始了！

## 其他

--force
--hard
--soft
-d  等价于  --delete
-u  表示：
加了参数-u后，以后即可直接用git push 代替git push origin master
在git add -u中表示添加此次修改的全部原先存在的文件（即新建的不会添加 --update）。

```
1) 远程仓库相关命令
检出仓库：$ git clone git://github.com/jquery/jquery.git
查看远程仓库：$ git remote -v
添加远程仓库：$ git remote add [name] [url]
删除远程仓库：$ git remote rm [name]
修改远程仓库：$ git remote set-url --push[name][newUrl]
拉取远程仓库：$ git pull [remoteName] [localBranchName]
推送远程仓库：$ git push [remoteName] [localBranchName]
 
2）分支(branch)操作相关命令
查看本地分支：$ git branch
查看远程分支：$ git branch -r
创建本地分支：$ git branch [name] ----注意新分支创建后不会自动切换为当前分支
切换分支：$ git checkout [name]
创建新分支并立即切换到新分支：$ git checkout -b [name]
删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：$ git merge [name] ----将名称为[name]的分支与当前分支合并
创建远程分支(本地分支push到远程)：$ git push origin [name]
删除远程分支：$ git push origin :heads/[name]
```



## mintty.exe.stackdump文件

关于Git bash在win10重装系统情况下闪退并生成mintty.exe.stackdump文件的问题

总结：我也是在git commit时闪退产生了这个文件。试了几次同样的commit内容一直闪退，原因可能是中文时输入英文字母按回车键后闪退，然后在输入英文时shift切换没有闪退情况。我的问题不大，不能解决闪退网上有很多解决方法。





# 哭笑不得：git branch -a看不见一个分支

如果是下载项目就不要使用`git init test && cd test`初始化。

使用`git clone git@git.com master`下载项目后，会在当前目录下新建文件夹master并将项目下载这个目录下。

由于先前init初始化后，导致没有进入项目的文件夹中，使用git branch -a看不见任何分支。













更新服务端的分支到本地仓库
git fetch --all
列出所有的分支
git branch --all
切换到一个已有的分支
git checkout <您的分支名>
基于当前分支新建一个分支
git checkout -b <您的新分支名>
推送当前分支到服务端
git push origin <您的分支名>
删除本地的一个分支（当前所在分支和要删除的分支不能相同）
git branch -D <您的分支名>
删除服务端的一个分支
git push origin :<您的分支名>





应该右上角会有ssh和https转换，然而并没有。但是两者使用是一样的。
git clone -b gitbhttps://github.com/HanKin2015/GitBook.git

2. 远程分支重命名 (已经推送远程-假设本地分支和远程对应分支名称相同)
   a. 重命名远程分支对应的本地分支

git branch -m oldName newName
b. 删除远程分支

git push --delete origin oldName
c. 上传新命名的本地分支

git push origin newName
d.把修改后的本地分支与远程分支关联

git branch --set-upstream-to origin/newName



http://issuecdn.baidupcs.com/issue/netdisk/yunguanjia/BaiduNetdisk_6.8.1.3.exe


## Git 恢复本地误删的文件
起因：git clone下来的项目不久后就自动出现修改的红色感叹号标志，实际什么都没有做。后来猜测应该是杀毒软件之类的给我自动删除了，后来还真是。使用恢复方法恢复后，一会儿又给我删除了，要么关闭杀毒软件或者添加信任。

使用git pull --force强制拉取

正确的打开方式：
```
git reset HEAD 文件或文件夹
git checkout 文件或文件夹
```


## 14、进阶
### .gitignore
一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。来看一个实际的例子：
$ cat .gitignore
*.[oa]
*~
第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本。第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。

### 打patch
生成patch：
git format-patch commitID -1 生成当前commitID 的patch
git format-patch commitID -3 从当前commitID开始往下生成总共三个commit的patch文件
应用patch：
git apply --check xxx.patch 检查当前patch是否可以成功打入
git apply xxx.patch
git apply *.patch 同时打入所有patch

### 自定义别名（更高级的git log）
```
alias lg="git log --graph --pretty=format:’'Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit "
```

### git子模块使用
一个大型工程总会被分拆为一些子工程,git-submodule 就是完成这样一种子工程拆分与整合的工具.

添加一个子工程
git submodule add git@xxxx:subproj.git subproj
git commit -m “submodule added”

克隆一个带submodule的git仓库
git clone git@domain.com:massproj.git
git submodule init
git submodule update
或者
git clone --rescursive git@domain.com:massproj.git


查看修改的文件
git log --stat

查看commitID的具体修改
git log -p

查看文件最后的修改人
git blame -L 起始行号,结束行号



# git学习笔记

# 1、下载安装git
>sudo apt install git

明白为啥使用sudo而不是直接root账户，防止错误操作，sudo进一步确认了一下。

Windows下载安装很随意。有个注意点：尽量选择下载和上传git仓库的时候不要进行Linux和Windows的换行符的转换，否则在不同环境下运行代码的时候很尴尬。

# 2、配置
## 配置家门，即上传者的身份
设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。以前并没有觉得多大作用，慢慢地发现一个git仓库是可以多人上传的，而这个配置就是显示上传者的身份，一般会填写个人的GitHub相关的信息，比如GitHub用户名和注册邮箱。乱写也是🆗的。

```
$ git config -l  ===  git config --list
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

还有一个local参数，即为单独仓库配置单独的上传者身份。
global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
```

## 修改global配置
简单粗暴：直接使用命令git config --global user.name "Your Name"。。。。
修改配置.gitconfig文件。

## 配置SSH-Key
提交代码需要的github权限，下载私有仓库代码时也会需要这个配置，主要在于上传代码，不配置就会每次输入账户和密码。

如果你想要使用 SSH url 克隆的话，你必须是这个项目的拥有者。否则你是无法添加 SSH key 的。
使用https url很好用？？？

### https 和 SSH 的区别：
1、前者可以随意克隆github上的项目，而不管是谁的；而后者则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key ，否则无法克隆。

2、https url 在push的时候是需要验证用户名和密码的；而 SSH 在push的时候，是不需要输入用户名的，如果配置SSH key的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。

```
ssh -T git@github.com    查看是否配置好
ssh-keygen -t rsa -C "邮件地址"
```

代码参数含义：

-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。

以上代码省略了 -f 参数，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。
接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码），

当然，你也可以不输入密码，直接按回车。那么push的时候就不需要输入密码（推荐），直接提交到github上了。




[TOC]

# git入门知识汇总

# 0、前言
## 配置一个完整的环境简单步骤
```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
ssh-keygen -t rsa -C "邮件地址"
拷贝生成的公钥到git的ssh钥匙中：/root/.ssh/id_rsa.pub
```

## 0-1、安装git

使用镜像网站不错。
[下载Windows下的Git命令行客户端](https://repo.huaweicloud.com/git-for-windows/)
[下载Windows下的Git小海龟客户端](https://repo.huaweicloud.com/tortoisegit/)

1、 先安装Git.exe
2、 再安装TortoiseGit.msi
3、 根据自己喜欢安装中文翻译补丁包LanguagePack



git update-git-for-windows   更新git客户端

## 0-2、解决TortoiseGit文件夹和文件状态图标不显示问题

- 先重启试试
- 修改注册表
- 设置里面设置显示icon overlays

# 1、使用git下载单个指定的文件夹

更多搜索“稀疏检出”。



```
稀疏检出恢复：

SC_FILE=.git/info/sparse-checkout
echo "Undoing sparse checkout"

# Get the full tree back

echo "*" > $SC_FILE
git config core.sparsecheckout true
git read-tree --reset -u HEAD

# Wipe out all traces of sparse checkout support

rm -rf $SC_FILE
git config core.sparsecheckout false
```





参考：https://www.cnblogs.com/zhoudaxiaa/p/8670481.html

方法一：http://zhoudaxiaa.gitee.io/downgit/#/home

方法二：

在Git1.7.0以前，这无法实现，但是幸运的是在Git1.7.0以后加入了Sparse Checkout模式，这使得Check Out指定文件或者文件夹成为可能。

**举个例子：**

> 现在有一个**test**仓库https://github.com/mygithub/test
> 你要gitclone里面的**tt**子目录：
> 在本地的硬盘位置打开**Git Bash**

```
git init test && cd test     //新建仓库并进入文件夹
git config core.sparsecheckout true //设置允许克隆子目录

echo 'tt*' >> .git/info/sparse-checkout //设置要克隆的仓库的子目录路径   //空格别漏

git remote add origin git@github.com:mygithub/test.git  //这里换成你要克隆的项目和库

git pull origin master    //下载
```

 https://blog.csdn.net/qq_35860352/article/details/80313078 不行

## 下载指定分支

git clone -b branch git@github.com:github/test.git 



**重点看这里**：

# 2、git add命令参数说明

git add -u：将文件的修改、文件的删除，添加到暂存区。
git add .：将文件的修改，文件的新建，添加到暂存区。
git add -A：将文件的修改，文件的删除，文件的新建，添加到暂存区。

-u就是update的意思，只会标记本地有改动（包括删除和修改）的已经追踪的文件

\1.  git add -A   保存所有的修改

\2.  git add .     保存新的添加和修改，但是不包括删除

\3.  git add -u   保存修改和删除，但是不包括新建文件。



# 3、git push 的 -u 参数具体适合含义？

一般只有同时存在多个远程仓库时才会用到--set-upstream。每个git branch可以有个对应的upstream。假设你有两个upstream，分别叫server1和server2，本地master branch的upstream是server1上的master，那么当你不带参数直接输入git pull或者git push时，默认是对server1进行pull/push。如果你成功运行"git push -u server2 master"，那么除了本地branch会被push到server2之外，还会把server2设置成upstream。



```
-u, --set-upstream
For every branch that is up to date or successfully pushed, add upstream (tracking) reference, used by argument-less git-pull(1) and other commands.
```

upstream不是针对远程仓库的，而是针对branch的，这一点应了那位童鞋所说的第二句话。但是upstream和有几个远程库没有必然联系。比如远程库A上有3个分支branch1、branch2、branch3。远程库B上有3个分支branchx、branchy、branchz。本地仓库有2个分支local1和local2。那么当初始状态时，local1和local2和任何一个分支都没有关联，也就是没有upstream。当通过git branch --set-upstream-to A/branch1 local1命令执行后，会给local1和branch1两个分支建立关联，也就是说local1的upstream指向的是branch1。这样的好处就是在local1分支上执行git push（git pull同理）操作时不用附加其它参数，Git就会自动将local1分支上的内容push到branch1上去。同样，local2分支也可以和远程库A和远程库B上的任何一个分支建立关联，只要给local2分支设置了upstream，就可以在local2分支上用git push（git pull同理）方便地与目标分支推拉数据。

综上所述，upstream与有几个远程库没有关系，它是分支与分支之间的流通道。

再来说说git push -u和git branch --set-upstream-to指令之间的区别。

举个例子：我要把本地分支mybranch1与远程仓库origin里的分支mybranch1建立关联。

（如果使用下列途径1的话，首先，你要切换到mybranch1分支上（git checkout mybranch1））

两个途径：1. git push -u origin mybranch1  2. git branch --set-upstream-to=origin/mybranch1 mybranch1

这两种方式都可以达到目的。但是1方法更通用，因为你的远程库有可能并没有mybranch1分支，这种情况下你用2方法就不可行，连目标分支都不存在，怎么进行关联呢？所以可以总结一下：git push -u origin mybranch1 相当于 git push origin mybranch1 + git branch --set-upstream-to=origin/mybranch1 mybranch1



# 4、分支管理

```
git branch 查看本地分支
git branch -r 查看远程分支
git branch -a 查看所有分支
git checkout [Bname] 切换分支
git push origin [Bname] 将空分支上传可以看作删除远程分支
git push origin --delete [Bname] 删除远程分支
git ls-remote origin [Bname] 查看远程仓库是否有这个分支，有就有返回值，没有就什么都没有
git remote [-v] 查看远程仓库地址
git branch -m oldBranchName newBranchName 重命名
```

## 4-1、删除分支

```
git branch -d [本地分支名]
git branch -D [本地分支名]
git branch -r -D [远程分支名]
```

## 4-2、合并分支

1. git pull (git checkout -b newBname Bname)



一、开发分支（dev）上的代码达到上线的标准后，要合并到 master 分支

```
git checkout dev
git pull
git checkout master
git merge dev
git push -u origin master
```

二、当master代码改动了，需要更新开发分支（dev）上的代码

```
git checkout master 
git pull 
git checkout dev
git merge master 
git push -u origin dev
```

## 4-3、远程分支覆盖本地分支

有时候同一个分支，远程的和本地的都被修改的面目全非了，如果想要把本地的替换成远程的，用下面的命令

git fetch --all
git reset --hard origin/master (这里master要修改为对应的分支名)
git pull

# 5、git冲突

当上传的时候产生冲突时：

## 5-1、在线git解决

方便快捷操作简单。

## 5-2、检出，在本地审查和合并

- git pull origin 分支（生产冲突文件）
- 在冲突文件里修改：删除和保留（git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容（数量为7））
- git add 冲突文件
- git commit
- git push


Step 1. 获取并检出此合并请求的分支

git fetch origin
git checkout -b [bName] origin/冲突分支

Step 2. 本地审查变更（忽略）

Step 3. 合并分支并修复出现的任何冲突

git checkout master
git merge --no-ff [bName]（本地就有冲突文件了，注意看产生冲突的文件）

Step 4. 推送合并的结果到 GitLab

git checkout -b [newBName]

git push origin [newBName]

# 6、git commit

### 修改commit内容
当我们想要对上一次的提交进行修改时，我们可以使用git commit –amend命令。git commit –amend既可以对上次提交的内容进行修改，也可以修改提交说明。

如果有新的文件修改，需要合并到最近一次提交的commit里面，也可以使用上面命令直接修改即可。


> git commit --amend -no-edit

git status
git log
git show

### 6-1、删除commit

> git reset HEAD^    删除最新commit记录

### 6-2、误删除commit

- git reflog
- git reset commitId

# 7、多个commit合并(git rebase)  

实战中终于理解这条命令的作用。当我们在合并请求时又双叒叕发现一个小错误，又不得不commit一次，真想删除分支全部重新提交。但是commit是可以合并的。
[git 几个commit点合并成一个commit点](https://blog.csdn.net/u013276277/article/details/82470177)

- 1、git status当前所有修改是否都commit。如果没有后面rebase无法继续。
- 2、git log查看commitId
- 3、git rebase -i commitId（commitId是合并后的commitId的前一个）**即不影响的log**
- 4、**将删除的commit记录前面的pick改为squash，保存退出**
- 5、修改commit内容
- 6、git log查看合并结果 
- 7、git push origin [Bname] -f 可能提交会产生冲突，建议强制

  (use "git rebase --edit-todo" to view and edit)
You are currently editing a commit while rebasing branch 'hejian' on 'ddd330e'.
  (use "git commit --amend" to amend the current commit)
  (use "git rebase --continue" once you are satisfied with your changes)

# 8、如何切换分支并且改变其修改的不同的内容

就是本地像远程分支管理一样，不同分支不同的内容。但是实践看到都是一样的，后来发现姿势不对。

### 实验

```
mkdir Github   本地Github文件夹
cd Github
git init
vi helloworld.txt
	wuli github
git branch father    
git add .
git commit -m"add txt"
git checkout -b son   注意:这种创建分支的方式是将当前的分支复制到了新分支，因此尽量在修改代码前创建分支

vi helloworld.txt
	wuli github
	yes,you are right
git add .
git commit -m"update"
git log
	add txt
	update
git checkout father
git log
	add txt			这时候发现commit日志会出现不同。并且helloworld文件的内容也会随切换不同分支而改变
```

注意：当两个分支前面的commit日志一模一样的时候，是可以随意切换checkout的，但是不同的时候是需要先commit才能切换，stash也能解决这个问题。

总结：远程和本地一样，这就为啥有个叫本地仓库的概念了，本地修改了内容尽量commit到本地，只有commit了才会切换分支看到效果。

# 9、stash的作用

[stash —— 一个极度实用的Git操作](https://www.jianshu.com/p/fcf69e2d3e6b)
git stash   藏好代码
git stash list  

- git stash pop  [stash@{0}] （删除stash记录）
- git stash apply （不删除stash记录）

好习惯：master作为备份更新，第一步是创建新分支。当有新问题的时候，stash后去master分支创建新分支。

上面的commit一定是最新的。



超级好用：

git stash

git stash pop

git stash list

git stash -h



# 10、Git 全局设置（必须）

```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
```

- git config --list     查看配置信息
- git config -l
- git config --local -l
- git config --global -l

# 11、回退命令（放弃所有本地修改）

```
git reflog
git reset --hard 7edb984	放弃修改
git reset --soft 7edb984 	回到commit之前
git checkout -- filename	撤销文件的修改
HEAD
HEAD~3
commit_id

强推到远程
git push origin HEAD --force

```

可引用git checkout或者用git clean -df至修改前的状态。就可以放弃所有修改。

1、git checkout功能是本地所有修改的。没有的提交的，都返回到原来的状态

2、git stash功能是把所有没有提交的修改暂存到stash里面。可用git stash [pop](https://www.baidu.com/s?wd=pop&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)回复。

3、git reset --hard HASH功能是返回到某个节点，不保留修改。

4、git reset --soft HASH功能是返回到某个节点。保留修改。

5、git clean -df功能是保留修改，返回到某个节点。

**拓展资料**：

1、Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

[![img](https://img3.mukewang.com/5c773adf000145dc06000425.jpg)](https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7acb0a46f21fbe094c3be72c66600c338744ada4.jpg)

2、Torvalds 开始着手开发 Git 是为了作为一种过渡方案来替代 BitKeeper，后者之前一直是 Linux 内核开发人员在全球使用的主要源代码工具。开放源码社区中的有些人觉得BitKeeper 的许可证并不适合开放源码社区的工作，因此 Torvalds 决定着手研究许可证更为灵活的版本控制系统。尽管最初 Git 的开发是为了辅助 Linux 内核开发的过程，但是我们已经发现在很多其他自由软件项目中也使用了 Git。例如 很多 Freedesktop 的项目迁移到了 Git 上。



# # 12、Updates were rejected because the tip of your current branch is behind

1.使用强制push的方法：

$ git push -u origin master -f 

这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

2.push前先将远程repository修改pull下来

$ git pull origin master

$ git push -u origin master   （后续就是解决冲突）



# 13、git clean 的用法（如何使用Git删除新增的文件？）

git clean命令用来从你的工作目录中删除所有没有track过的文件
git clean经常和git reset --hard一起使用. 记住reset只影响被track过的文件, 所以需要clean来删除没有track过的文件. 结合使用这两个命令能让你的工作目录完全回到一个指定的的状态

```
git clean -n
```

是一次clean的演习, 告诉你哪些文件会被删除. 记住它不会真正地删除文件, 只是一个提醒。

```
git clean -f
```

删除当前目录下所有没有track过的文件. 它不会删除 .gitignore 文件里指定的文件夹和文件, 不管这些文件有没有被track过

```
git clean -f <path>
```

删除指定路径下的没有被track过的文件

```
git clean -df
```

删除当前目录下没有被track过的文件和文件夹

```
git clean -xf
```

删除当前目录下所有没有track过的文件. 不管它是否是 .gitignore 文件里面指定的文件夹和文件

`git reset --hard` 和 `git clean -f` 是一对好基友. 结合使用它们能让你的工作目录完全回退到最近一次commit的时候

`git clean` 对于刚编译过的项目也非常有用. 如, 它能轻易删除掉编译后生成的 .o 和 .exe 等文件. 这个在打包要发布一个release的时候非常有用

下面的例子要删除所有工作目录下面的修改, 包括新添加的文件. 假设你已经提交了一些快照了, 而且做了一些新的开发

```
git reset --hard

git clean -df
```

运行后, 工作目录和缓存区回到最近一次commit时候一摸一样的状态，git status会告诉你这是一个干净的工作目录, 又是一个新的开始了！

## 其他

--force
--hard
--soft
-d  等价于  --delete
-u  表示：
加了参数-u后，以后即可直接用git push 代替git push origin master
在git add -u中表示添加此次修改的全部原先存在的文件（即新建的不会添加 --update）。

```
1) 远程仓库相关命令
检出仓库：$ git clone git://github.com/jquery/jquery.git
查看远程仓库：$ git remote -v
添加远程仓库：$ git remote add [name] [url]
删除远程仓库：$ git remote rm [name]
修改远程仓库：$ git remote set-url --push[name][newUrl]
拉取远程仓库：$ git pull [remoteName] [localBranchName]
推送远程仓库：$ git push [remoteName] [localBranchName]
 
2）分支(branch)操作相关命令
查看本地分支：$ git branch
查看远程分支：$ git branch -r
创建本地分支：$ git branch [name] ----注意新分支创建后不会自动切换为当前分支
切换分支：$ git checkout [name]
创建新分支并立即切换到新分支：$ git checkout -b [name]
删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：$ git merge [name] ----将名称为[name]的分支与当前分支合并
创建远程分支(本地分支push到远程)：$ git push origin [name]
删除远程分支：$ git push origin :heads/[name]
```



# 14、mintty.exe.stackdump文件

关于Git bash在win10重装系统情况下闪退并生成mintty.exe.stackdump文件的问题

总结：我也是在git commit时闪退产生了这个文件。试了几次同样的commit内容一直闪退，原因可能是中文时输入英文字母按回车键后闪退，然后在输入英文时shift切换没有闪退情况。我的问题不大，不能解决闪退网上有很多解决方法。





# 15、哭笑不得：git branch -a看不见一个分支

如果是下载项目就不要使用`git init test && cd test`初始化。

使用`git clone git@git.com master`下载项目后，会在当前目录下新建文件夹master并将项目下载这个目录下。

由于先前init初始化后，导致没有进入项目的文件夹中，使用git branch -a看不见任何分支。

# 16、git pull和git fetch区别
git pull看起来像git fetch+get merge
![](https://pic1.zhimg.com/80/v2-af3bf6fee935820d481853e452ed2d55_720w.jpg?source=1940ef5c)
pull=fetch+merge，pull的话，下拉远程分支并与本地分支合并。fetch只是下拉远程分支，怎么合并，可以自己再做选择。

# 17、远程分支（本地已有）内容更新，同步到本地
git pull不行，只能更新分支数量及存在与否
git pull origin 分支名







更新服务端的分支到本地仓库
git fetch --all
列出所有的分支
git branch --all
切换到一个已有的分支
git checkout <您的分支名>
基于当前分支新建一个分支
git checkout -b <您的新分支名>
推送当前分支到服务端
git push origin <您的分支名>
删除本地的一个分支（当前所在分支和要删除的分支不能相同）
git branch -D <您的分支名>
删除服务端的一个分支
git push origin :<您的分支名>





应该右上角会有ssh和https转换，然而并没有。但是两者使用是一样的。
git clone -b gitbhttps://github.com/HanKin2015/GitBook.git

2. 远程分支重命名 (已经推送远程-假设本地分支和远程对应分支名称相同)
   a. 重命名远程分支对应的本地分支

git branch -m oldName newName
b. 删除远程分支

git push --delete origin oldName
c. 上传新命名的本地分支

git push origin newName
d.把修改后的本地分支与远程分支关联

git branch --set-upstream-to origin/newName



http://issuecdn.baidupcs.com/issue/netdisk/yunguanjia/BaiduNetdisk_6.8.1.3.exe


## Git 恢复本地误删的文件
起因：git clone下来的项目不久后就自动出现修改的红色感叹号标志，实际什么都没有做。后来猜测应该是杀毒软件之类的给我自动删除了，后来还真是。使用恢复方法恢复后，一会儿又给我删除了，要么关闭杀毒软件或者添加信任。

使用git pull --force强制拉取

正确的打开方式：
```
git reset HEAD 文件或文件夹
git checkout 文件或文件夹
```


## 14、进阶
### .gitignore
一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。来看一个实际的例子：
$ cat .gitignore
*.[oa]
*~
第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本。第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。

### 打patch
生成patch：
git format-patch commitID -1 生成当前commitID 的patch
git format-patch commitID -3 从当前commitID开始往下生成总共三个commit的patch文件
应用patch：
git apply --check xxx.patch 检查当前patch是否可以成功打入
git apply xxx.patch
git apply *.patch 同时打入所有patch

### 自定义别名（更高级的git log）
```
alias lg="git log --graph --pretty=format:’'Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit "
```

### git子模块使用
一个大型工程总会被分拆为一些子工程,git-submodule 就是完成这样一种子工程拆分与整合的工具.

添加一个子工程
git submodule add git@xxxx:subproj.git subproj
git commit -m “submodule added”

克隆一个带submodule的git仓库
git clone git@domain.com:massproj.git
git submodule init
git submodule update
或者
git clone --rescursive git@domain.com:massproj.git


查看修改的文件
git log --stat

查看commitID的具体修改
git log -p

查看文件最后的修改人
git blame -L 起始行号,结束行号



# git学习笔记

# 1、下载安装git
>sudo apt install git

明白为啥使用sudo而不是直接root账户，防止错误操作，sudo进一步确认了一下。

Windows下载安装很随意。有个注意点：尽量选择下载和上传git仓库的时候不要进行Linux和Windows的换行符的转换，否则在不同环境下运行代码的时候很尴尬。

# 2、配置
## 配置家门，即上传者的身份
设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。以前并没有觉得多大作用，慢慢地发现一个git仓库是可以多人上传的，而这个配置就是显示上传者的身份，一般会填写个人的GitHub相关的信息，比如GitHub用户名和注册邮箱。乱写也是🆗的。

```
$ git config -l  ===  git config --list
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

还有一个local参数，即为单独仓库配置单独的上传者身份。
global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
```

## 修改global配置
简单粗暴：直接使用命令git config --global user.name "Your Name"。。。。
修改配置.gitconfig文件。

## 配置SSH-Key
提交代码需要的github权限，下载私有仓库代码时也会需要这个配置，主要在于上传代码，不配置就会每次输入账户和密码。

如果你想要使用 SSH url 克隆的话，你必须是这个项目的拥有者。否则你是无法添加 SSH key 的。
使用https url很好用？？？

### https 和 SSH 的区别：
1、前者可以随意克隆github上的项目，而不管是谁的；而后者则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key ，否则无法克隆。

2、https url 在push的时候是需要验证用户名和密码的；而 SSH 在push的时候，是不需要输入用户名的，如果配置SSH key的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。

```
ssh -T git@github.com    查看是否配置好
ssh-keygen -t rsa -C "邮件地址"
```

代码参数含义：

-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。

以上代码省略了 -f 参数，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。
接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码），

当然，你也可以不输入密码，直接按回车。那么push的时候就不需要输入密码（推荐），直接提交到github上了。




[TOC]

# git入门知识汇总

# 0、前言
## 配置一个完整的环境简单步骤
```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
ssh-keygen -t rsa -C "邮件地址"
拷贝生成的公钥到git的ssh钥匙中：/root/.ssh/id_rsa.pub
```

## 0-1、安装git

使用镜像网站不错。
[下载Windows下的Git命令行客户端](https://repo.huaweicloud.com/git-for-windows/)
[下载Windows下的Git小海龟客户端](https://repo.huaweicloud.com/tortoisegit/)

1、 先安装Git.exe
2、 再安装TortoiseGit.msi
3、 根据自己喜欢安装中文翻译补丁包LanguagePack



git update-git-for-windows   更新git客户端

## 0-2、解决TortoiseGit文件夹和文件状态图标不显示问题

- 先重启试试
- 修改注册表
- 设置里面设置显示icon overlays

# 1、使用git下载单个指定的文件夹

更多搜索“稀疏检出”。



```
稀疏检出恢复：

SC_FILE=.git/info/sparse-checkout
echo "Undoing sparse checkout"

# Get the full tree back

echo "*" > $SC_FILE
git config core.sparsecheckout true
git read-tree --reset -u HEAD

# Wipe out all traces of sparse checkout support

rm -rf $SC_FILE
git config core.sparsecheckout false
```





参考：https://www.cnblogs.com/zhoudaxiaa/p/8670481.html

方法一：http://zhoudaxiaa.gitee.io/downgit/#/home

方法二：

在Git1.7.0以前，这无法实现，但是幸运的是在Git1.7.0以后加入了Sparse Checkout模式，这使得Check Out指定文件或者文件夹成为可能。

**举个例子：**

> 现在有一个**test**仓库https://github.com/mygithub/test
> 你要gitclone里面的**tt**子目录：
> 在本地的硬盘位置打开**Git Bash**

```
git init test && cd test     //新建仓库并进入文件夹
git config core.sparsecheckout true //设置允许克隆子目录

echo 'tt*' >> .git/info/sparse-checkout //设置要克隆的仓库的子目录路径   //空格别漏

git remote add origin git@github.com:mygithub/test.git  //这里换成你要克隆的项目和库

git pull origin master    //下载
```

 https://blog.csdn.net/qq_35860352/article/details/80313078 不行

## 下载指定分支

git clone -b branch git@github.com:github/test.git 



**重点看这里**：

# 2、git add命令参数说明

git add -u：将文件的修改、文件的删除，添加到暂存区。
git add .：将文件的修改，文件的新建，添加到暂存区。
git add -A：将文件的修改，文件的删除，文件的新建，添加到暂存区。

-u就是update的意思，只会标记本地有改动（包括删除和修改）的已经追踪的文件

\1.  git add -A   保存所有的修改

\2.  git add .     保存新的添加和修改，但是不包括删除

\3.  git add -u   保存修改和删除，但是不包括新建文件。



# 3、git push 的 -u 参数具体适合含义？

一般只有同时存在多个远程仓库时才会用到--set-upstream。每个git branch可以有个对应的upstream。假设你有两个upstream，分别叫server1和server2，本地master branch的upstream是server1上的master，那么当你不带参数直接输入git pull或者git push时，默认是对server1进行pull/push。如果你成功运行"git push -u server2 master"，那么除了本地branch会被push到server2之外，还会把server2设置成upstream。



```
-u, --set-upstream
For every branch that is up to date or successfully pushed, add upstream (tracking) reference, used by argument-less git-pull(1) and other commands.
```

upstream不是针对远程仓库的，而是针对branch的，这一点应了那位童鞋所说的第二句话。但是upstream和有几个远程库没有必然联系。比如远程库A上有3个分支branch1、branch2、branch3。远程库B上有3个分支branchx、branchy、branchz。本地仓库有2个分支local1和local2。那么当初始状态时，local1和local2和任何一个分支都没有关联，也就是没有upstream。当通过git branch --set-upstream-to A/branch1 local1命令执行后，会给local1和branch1两个分支建立关联，也就是说local1的upstream指向的是branch1。这样的好处就是在local1分支上执行git push（git pull同理）操作时不用附加其它参数，Git就会自动将local1分支上的内容push到branch1上去。同样，local2分支也可以和远程库A和远程库B上的任何一个分支建立关联，只要给local2分支设置了upstream，就可以在local2分支上用git push（git pull同理）方便地与目标分支推拉数据。

综上所述，upstream与有几个远程库没有关系，它是分支与分支之间的流通道。

再来说说git push -u和git branch --set-upstream-to指令之间的区别。

举个例子：我要把本地分支mybranch1与远程仓库origin里的分支mybranch1建立关联。

（如果使用下列途径1的话，首先，你要切换到mybranch1分支上（git checkout mybranch1））

两个途径：1. git push -u origin mybranch1  2. git branch --set-upstream-to=origin/mybranch1 mybranch1

这两种方式都可以达到目的。但是1方法更通用，因为你的远程库有可能并没有mybranch1分支，这种情况下你用2方法就不可行，连目标分支都不存在，怎么进行关联呢？所以可以总结一下：git push -u origin mybranch1 相当于 git push origin mybranch1 + git branch --set-upstream-to=origin/mybranch1 mybranch1



# 4、分支管理

```
git branch 查看本地分支
git branch -r 查看远程分支
git branch -a 查看所有分支
git checkout [Bname] 切换分支
git push origin [Bname] 将空分支上传可以看作删除远程分支
git push origin --delete [Bname] 删除远程分支
git ls-remote origin [Bname] 查看远程仓库是否有这个分支，有就有返回值，没有就什么都没有
git remote [-v] 查看远程仓库地址
git branch -m oldBranchName newBranchName 重命名
```

## 4-1、删除分支

```
git branch -d [本地分支名]
git branch -D [本地分支名]
git branch -r -D [远程分支名]
```

## 4-2、合并分支

1. git pull (git checkout -b newBname Bname)



一、开发分支（dev）上的代码达到上线的标准后，要合并到 master 分支

```
git checkout dev
git pull
git checkout master
git merge dev
git push -u origin master
```

二、当master代码改动了，需要更新开发分支（dev）上的代码

```
git checkout master 
git pull 
git checkout dev
git merge master 
git push -u origin dev
```

## 4-3、远程分支覆盖本地分支

有时候同一个分支，远程的和本地的都被修改的面目全非了，如果想要把本地的替换成远程的，用下面的命令

git fetch --all
git reset --hard origin/master (这里master要修改为对应的分支名)
git pull

# 5、git冲突

当上传的时候产生冲突时：

## 5-1、在线git解决

方便快捷操作简单。

## 5-2、检出，在本地审查和合并

- git pull origin 分支（生产冲突文件）
- 在冲突文件里修改：删除和保留（git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容（数量为7））
- git add 冲突文件
- git commit
- git push


Step 1. 获取并检出此合并请求的分支

git fetch origin
git checkout -b [bName] origin/冲突分支

Step 2. 本地审查变更（忽略）

Step 3. 合并分支并修复出现的任何冲突

git checkout master
git merge --no-ff [bName]（本地就有冲突文件了，注意看产生冲突的文件）

Step 4. 推送合并的结果到 GitLab

git checkout -b [newBName]

git push origin [newBName]

# 6、git commit

### 修改commit内容
当我们想要对上一次的提交进行修改时，我们可以使用git commit –amend命令。git commit –amend既可以对上次提交的内容进行修改，也可以修改提交说明。

如果有新的文件修改，需要合并到最近一次提交的commit里面，也可以使用上面命令直接修改即可。


> git commit --amend -no-edit

git status
git log
git show

### 6-1、删除commit

> git reset HEAD^    删除最新commit记录

### 6-2、误删除commit

- git reflog
- git reset commitId

# 7、多个commit合并(git rebase)  

实战中终于理解这条命令的作用。当我们在合并请求时又双叒叕发现一个小错误，又不得不commit一次，真想删除分支全部重新提交。但是commit是可以合并的。
[git 几个commit点合并成一个commit点](https://blog.csdn.net/u013276277/article/details/82470177)

- 1、git status当前所有修改是否都commit。如果没有后面rebase无法继续。
- 2、git log查看commitId
- 3、git rebase -i commitId（commitId是合并后的commitId的前一个）**即不影响的log**
- 4、**将删除的commit记录前面的pick改为squash，保存退出**
- 5、修改commit内容
- 6、git log查看合并结果 
- 7、git push origin [Bname] -f 可能提交会产生冲突，建议强制

  (use "git rebase --edit-todo" to view and edit)
You are currently editing a commit while rebasing branch 'hejian' on 'ddd330e'.
  (use "git commit --amend" to amend the current commit)
  (use "git rebase --continue" once you are satisfied with your changes)

# 8、如何切换分支并且改变其修改的不同的内容

就是本地像远程分支管理一样，不同分支不同的内容。但是实践看到都是一样的，后来发现姿势不对。

### 实验

```
mkdir Github   本地Github文件夹
cd Github
git init
vi helloworld.txt
	wuli github
git branch father    
git add .
git commit -m"add txt"
git checkout -b son   注意:这种创建分支的方式是将当前的分支复制到了新分支，因此尽量在修改代码前创建分支

vi helloworld.txt
	wuli github
	yes,you are right
git add .
git commit -m"update"
git log
	add txt
	update
git checkout father
git log
	add txt			这时候发现commit日志会出现不同。并且helloworld文件的内容也会随切换不同分支而改变
```

注意：当两个分支前面的commit日志一模一样的时候，是可以随意切换checkout的，但是不同的时候是需要先commit才能切换，stash也能解决这个问题。

总结：远程和本地一样，这就为啥有个叫本地仓库的概念了，本地修改了内容尽量commit到本地，只有commit了才会切换分支看到效果。

# 9、stash的作用

[stash —— 一个极度实用的Git操作](https://www.jianshu.com/p/fcf69e2d3e6b)
git stash   藏好代码
git stash list  

- git stash pop  [stash@{0}] （删除stash记录）
- git stash apply （不删除stash记录）

好习惯：master作为备份更新，第一步是创建新分支。当有新问题的时候，stash后去master分支创建新分支。

上面的commit一定是最新的。



超级好用：

git stash

git stash pop

git stash list

git stash -h



# 10、Git 全局设置（必须）

```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
```

- git config --list     查看配置信息
- git config -l
- git config --local -l
- git config --global -l

# 11、回退命令（放弃所有本地修改）

```
git reflog
git reset --hard 7edb984	放弃修改
git reset --soft 7edb984 	回到commit之前
git checkout -- filename	撤销文件的修改
HEAD
HEAD~3
commit_id

强推到远程
git push origin HEAD --force

```

可引用git checkout或者用git clean -df至修改前的状态。就可以放弃所有修改。

1、git checkout功能是本地所有修改的。没有的提交的，都返回到原来的状态

2、git stash功能是把所有没有提交的修改暂存到stash里面。可用git stash [pop](https://www.baidu.com/s?wd=pop&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)回复。

3、git reset --hard HASH功能是返回到某个节点，不保留修改。

4、git reset --soft HASH功能是返回到某个节点。保留修改。

5、git clean -df功能是保留修改，返回到某个节点。

**拓展资料**：

1、Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

[![img](https://img3.mukewang.com/5c773adf000145dc06000425.jpg)](https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7acb0a46f21fbe094c3be72c66600c338744ada4.jpg)

2、Torvalds 开始着手开发 Git 是为了作为一种过渡方案来替代 BitKeeper，后者之前一直是 Linux 内核开发人员在全球使用的主要源代码工具。开放源码社区中的有些人觉得BitKeeper 的许可证并不适合开放源码社区的工作，因此 Torvalds 决定着手研究许可证更为灵活的版本控制系统。尽管最初 Git 的开发是为了辅助 Linux 内核开发的过程，但是我们已经发现在很多其他自由软件项目中也使用了 Git。例如 很多 Freedesktop 的项目迁移到了 Git 上。



# # 12、Updates were rejected because the tip of your current branch is behind

1.使用强制push的方法：

$ git push -u origin master -f 

这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

2.push前先将远程repository修改pull下来

$ git pull origin master

$ git push -u origin master   （后续就是解决冲突）



# 13、git clean 的用法（如何使用Git删除新增的文件？）

git clean命令用来从你的工作目录中删除所有没有track过的文件
git clean经常和git reset --hard一起使用. 记住reset只影响被track过的文件, 所以需要clean来删除没有track过的文件. 结合使用这两个命令能让你的工作目录完全回到一个指定的的状态

```
git clean -n
```

是一次clean的演习, 告诉你哪些文件会被删除. 记住它不会真正地删除文件, 只是一个提醒。

```
git clean -f
```

删除当前目录下所有没有track过的文件. 它不会删除 .gitignore 文件里指定的文件夹和文件, 不管这些文件有没有被track过

```
git clean -f <path>
```

删除指定路径下的没有被track过的文件

```
git clean -df
```

删除当前目录下没有被track过的文件和文件夹

```
git clean -xf
```

删除当前目录下所有没有track过的文件. 不管它是否是 .gitignore 文件里面指定的文件夹和文件

`git reset --hard` 和 `git clean -f` 是一对好基友. 结合使用它们能让你的工作目录完全回退到最近一次commit的时候

`git clean` 对于刚编译过的项目也非常有用. 如, 它能轻易删除掉编译后生成的 .o 和 .exe 等文件. 这个在打包要发布一个release的时候非常有用

下面的例子要删除所有工作目录下面的修改, 包括新添加的文件. 假设你已经提交了一些快照了, 而且做了一些新的开发

```
git reset --hard

git clean -df
```

运行后, 工作目录和缓存区回到最近一次commit时候一摸一样的状态，git status会告诉你这是一个干净的工作目录, 又是一个新的开始了！

## 其他

--force
--hard
--soft
-d  等价于  --delete
-u  表示：
加了参数-u后，以后即可直接用git push 代替git push origin master
在git add -u中表示添加此次修改的全部原先存在的文件（即新建的不会添加 --update）。

```
1) 远程仓库相关命令
检出仓库：$ git clone git://github.com/jquery/jquery.git
查看远程仓库：$ git remote -v
添加远程仓库：$ git remote add [name] [url]
删除远程仓库：$ git remote rm [name]
修改远程仓库：$ git remote set-url --push[name][newUrl]
拉取远程仓库：$ git pull [remoteName] [localBranchName]
推送远程仓库：$ git push [remoteName] [localBranchName]
 
2）分支(branch)操作相关命令
查看本地分支：$ git branch
查看远程分支：$ git branch -r
创建本地分支：$ git branch [name] ----注意新分支创建后不会自动切换为当前分支
切换分支：$ git checkout [name]
创建新分支并立即切换到新分支：$ git checkout -b [name]
删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：$ git merge [name] ----将名称为[name]的分支与当前分支合并
创建远程分支(本地分支push到远程)：$ git push origin [name]
删除远程分支：$ git push origin :heads/[name]
```



## mintty.exe.stackdump文件

关于Git bash在win10重装系统情况下闪退并生成mintty.exe.stackdump文件的问题

总结：我也是在git commit时闪退产生了这个文件。试了几次同样的commit内容一直闪退，原因可能是中文时输入英文字母按回车键后闪退，然后在输入英文时shift切换没有闪退情况。我的问题不大，不能解决闪退网上有很多解决方法。





# 哭笑不得：git branch -a看不见一个分支

如果是下载项目就不要使用`git init test && cd test`初始化。

使用`git clone git@git.com master`下载项目后，会在当前目录下新建文件夹master并将项目下载这个目录下。

由于先前init初始化后，导致没有进入项目的文件夹中，使用git branch -a看不见任何分支。













更新服务端的分支到本地仓库
git fetch --all
列出所有的分支
git branch --all
切换到一个已有的分支
git checkout <您的分支名>
基于当前分支新建一个分支
git checkout -b <您的新分支名>
推送当前分支到服务端
git push origin <您的分支名>
删除本地的一个分支（当前所在分支和要删除的分支不能相同）
git branch -D <您的分支名>
删除服务端的一个分支
git push origin :<您的分支名>





应该右上角会有ssh和https转换，然而并没有。但是两者使用是一样的。
git clone -b gitbhttps://github.com/HanKin2015/GitBook.git

2. 远程分支重命名 (已经推送远程-假设本地分支和远程对应分支名称相同)
   a. 重命名远程分支对应的本地分支

git branch -m oldName newName
b. 删除远程分支

git push --delete origin oldName
c. 上传新命名的本地分支

git push origin newName
d.把修改后的本地分支与远程分支关联

git branch --set-upstream-to origin/newName



http://issuecdn.baidupcs.com/issue/netdisk/yunguanjia/BaiduNetdisk_6.8.1.3.exe


## Git 恢复本地误删的文件
起因：git clone下来的项目不久后就自动出现修改的红色感叹号标志，实际什么都没有做。后来猜测应该是杀毒软件之类的给我自动删除了，后来还真是。使用恢复方法恢复后，一会儿又给我删除了，要么关闭杀毒软件或者添加信任。

使用git pull --force强制拉取

正确的打开方式：
```
git reset HEAD 文件或文件夹
git checkout 文件或文件夹
```


## 14、进阶
### .gitignore
一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。来看一个实际的例子：
$ cat .gitignore
*.[oa]
*~
第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本。第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。

### 打patch
生成patch：
git format-patch commitID -1 生成当前commitID 的patch
git format-patch commitID -3 从当前commitID开始往下生成总共三个commit的patch文件
应用patch：
git apply --check xxx.patch 检查当前patch是否可以成功打入
git apply xxx.patch
git apply *.patch 同时打入所有patch

### 自定义别名（更高级的git log）
```
alias lg="git log --graph --pretty=format:’'Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit "
```

### git子模块使用
一个大型工程总会被分拆为一些子工程,git-submodule 就是完成这样一种子工程拆分与整合的工具.

添加一个子工程
git submodule add git@xxxx:subproj.git subproj
git commit -m “submodule added”

克隆一个带submodule的git仓库
git clone git@domain.com:massproj.git
git submodule init
git submodule update
或者
git clone --rescursive git@domain.com:massproj.git


查看修改的文件
git log --stat

查看commitID的具体修改
git log -p

查看文件最后的修改人
git blame -L 起始行号,结束行号



# git学习笔记

# 1、下载安装git
>sudo apt install git

明白为啥使用sudo而不是直接root账户，防止错误操作，sudo进一步确认了一下。

Windows下载安装很随意。有个注意点：尽量选择下载和上传git仓库的时候不要进行Linux和Windows的换行符的转换，否则在不同环境下运行代码的时候很尴尬。

# 2、配置
## 配置家门，即上传者的身份
设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。以前并没有觉得多大作用，慢慢地发现一个git仓库是可以多人上传的，而这个配置就是显示上传者的身份，一般会填写个人的GitHub相关的信息，比如GitHub用户名和注册邮箱。乱写也是🆗的。

```
$ git config -l  ===  git config --list
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

还有一个local参数，即为单独仓库配置单独的上传者身份。
global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
```

## 修改global配置
简单粗暴：直接使用命令git config --global user.name "Your Name"。。。。
修改配置.gitconfig文件。

## 配置SSH-Key
提交代码需要的github权限，下载私有仓库代码时也会需要这个配置，主要在于上传代码，不配置就会每次输入账户和密码。

如果你想要使用 SSH url 克隆的话，你必须是这个项目的拥有者。否则你是无法添加 SSH key 的。
使用https url很好用？？？

### https 和 SSH 的区别：
1、前者可以随意克隆github上的项目，而不管是谁的；而后者则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key ，否则无法克隆。

2、https url 在push的时候是需要验证用户名和密码的；而 SSH 在push的时候，是不需要输入用户名的，如果配置SSH key的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。

```
ssh -T git@github.com    查看是否配置好
ssh-keygen -t rsa -C "邮件地址"
```

代码参数含义：

-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。

以上代码省略了 -f 参数，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。
接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码），

当然，你也可以不输入密码，直接按回车。那么push的时候就不需要输入密码（推荐），直接提交到github上了。




[TOC]

# git入门知识汇总

# 0、前言
## 配置一个完整的环境简单步骤
```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
ssh-keygen -t rsa -C "邮件地址"
拷贝生成的公钥到git的ssh钥匙中：/root/.ssh/id_rsa.pub
```

## 0-1、安装git

使用镜像网站不错。
[下载Windows下的Git命令行客户端](https://repo.huaweicloud.com/git-for-windows/)
[下载Windows下的Git小海龟客户端](https://repo.huaweicloud.com/tortoisegit/)

1、 先安装Git.exe
2、 再安装TortoiseGit.msi
3、 根据自己喜欢安装中文翻译补丁包LanguagePack



git update-git-for-windows   更新git客户端

## 0-2、解决TortoiseGit文件夹和文件状态图标不显示问题

- 先重启试试
- 修改注册表
- 设置里面设置显示icon overlays

# 1、使用git下载单个指定的文件夹

更多搜索“稀疏检出”。



```
稀疏检出恢复：

SC_FILE=.git/info/sparse-checkout
echo "Undoing sparse checkout"

# Get the full tree back

echo "*" > $SC_FILE
git config core.sparsecheckout true
git read-tree --reset -u HEAD

# Wipe out all traces of sparse checkout support

rm -rf $SC_FILE
git config core.sparsecheckout false
```





参考：https://www.cnblogs.com/zhoudaxiaa/p/8670481.html

方法一：http://zhoudaxiaa.gitee.io/downgit/#/home

方法二：

在Git1.7.0以前，这无法实现，但是幸运的是在Git1.7.0以后加入了Sparse Checkout模式，这使得Check Out指定文件或者文件夹成为可能。

**举个例子：**

> 现在有一个**test**仓库https://github.com/mygithub/test
> 你要gitclone里面的**tt**子目录：
> 在本地的硬盘位置打开**Git Bash**

```
git init test && cd test     //新建仓库并进入文件夹
git config core.sparsecheckout true //设置允许克隆子目录

echo 'tt*' >> .git/info/sparse-checkout //设置要克隆的仓库的子目录路径   //空格别漏

git remote add origin git@github.com:mygithub/test.git  //这里换成你要克隆的项目和库

git pull origin master    //下载
```

 https://blog.csdn.net/qq_35860352/article/details/80313078 不行

## 下载指定分支

git clone -b branch git@github.com:github/test.git 



**重点看这里**：

# 2、git add命令参数说明

git add -u：将文件的修改、文件的删除，添加到暂存区。
git add .：将文件的修改，文件的新建，添加到暂存区。
git add -A：将文件的修改，文件的删除，文件的新建，添加到暂存区。

-u就是update的意思，只会标记本地有改动（包括删除和修改）的已经追踪的文件

\1.  git add -A   保存所有的修改

\2.  git add .     保存新的添加和修改，但是不包括删除

\3.  git add -u   保存修改和删除，但是不包括新建文件。



# 3、git push 的 -u 参数具体适合含义？

一般只有同时存在多个远程仓库时才会用到--set-upstream。每个git branch可以有个对应的upstream。假设你有两个upstream，分别叫server1和server2，本地master branch的upstream是server1上的master，那么当你不带参数直接输入git pull或者git push时，默认是对server1进行pull/push。如果你成功运行"git push -u server2 master"，那么除了本地branch会被push到server2之外，还会把server2设置成upstream。



```
-u, --set-upstream
For every branch that is up to date or successfully pushed, add upstream (tracking) reference, used by argument-less git-pull(1) and other commands.
```

upstream不是针对远程仓库的，而是针对branch的，这一点应了那位童鞋所说的第二句话。但是upstream和有几个远程库没有必然联系。比如远程库A上有3个分支branch1、branch2、branch3。远程库B上有3个分支branchx、branchy、branchz。本地仓库有2个分支local1和local2。那么当初始状态时，local1和local2和任何一个分支都没有关联，也就是没有upstream。当通过git branch --set-upstream-to A/branch1 local1命令执行后，会给local1和branch1两个分支建立关联，也就是说local1的upstream指向的是branch1。这样的好处就是在local1分支上执行git push（git pull同理）操作时不用附加其它参数，Git就会自动将local1分支上的内容push到branch1上去。同样，local2分支也可以和远程库A和远程库B上的任何一个分支建立关联，只要给local2分支设置了upstream，就可以在local2分支上用git push（git pull同理）方便地与目标分支推拉数据。

综上所述，upstream与有几个远程库没有关系，它是分支与分支之间的流通道。

再来说说git push -u和git branch --set-upstream-to指令之间的区别。

举个例子：我要把本地分支mybranch1与远程仓库origin里的分支mybranch1建立关联。

（如果使用下列途径1的话，首先，你要切换到mybranch1分支上（git checkout mybranch1））

两个途径：1. git push -u origin mybranch1  2. git branch --set-upstream-to=origin/mybranch1 mybranch1

这两种方式都可以达到目的。但是1方法更通用，因为你的远程库有可能并没有mybranch1分支，这种情况下你用2方法就不可行，连目标分支都不存在，怎么进行关联呢？所以可以总结一下：git push -u origin mybranch1 相当于 git push origin mybranch1 + git branch --set-upstream-to=origin/mybranch1 mybranch1



# 4、分支管理

```
git branch 查看本地分支
git branch -r 查看远程分支
git branch -a 查看所有分支
git checkout [Bname] 切换分支
git push origin [Bname] 将空分支上传可以看作删除远程分支
git push origin --delete [Bname] 删除远程分支
git ls-remote origin [Bname] 查看远程仓库是否有这个分支，有就有返回值，没有就什么都没有
git remote [-v] 查看远程仓库地址
git branch -m oldBranchName newBranchName 重命名
```

## 4-1、删除分支

```
git branch -d [本地分支名]
git branch -D [本地分支名]
git branch -r -D [远程分支名]
```

## 4-2、合并分支

1. git pull (git checkout -b newBname Bname)



一、开发分支（dev）上的代码达到上线的标准后，要合并到 master 分支

```
git checkout dev
git pull
git checkout master
git merge dev
git push -u origin master
```

二、当master代码改动了，需要更新开发分支（dev）上的代码

```
git checkout master 
git pull 
git checkout dev
git merge master 
git push -u origin dev
```

## 4-3、远程分支覆盖本地分支

有时候同一个分支，远程的和本地的都被修改的面目全非了，如果想要把本地的替换成远程的，用下面的命令

git fetch --all
git reset --hard origin/master (这里master要修改为对应的分支名)
git pull

# 5、git冲突

当上传的时候产生冲突时：

## 5-1、在线git解决

方便快捷操作简单。

## 5-2、检出，在本地审查和合并

- git pull origin 分支（生产冲突文件）
- 在冲突文件里修改：删除和保留（git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容（数量为7））
- git add 冲突文件
- git commit
- git push


Step 1. 获取并检出此合并请求的分支

git fetch origin
git checkout -b [bName] origin/冲突分支

Step 2. 本地审查变更（忽略）

Step 3. 合并分支并修复出现的任何冲突

git checkout master
git merge --no-ff [bName]（本地就有冲突文件了，注意看产生冲突的文件）

Step 4. 推送合并的结果到 GitLab

git checkout -b [newBName]

git push origin [newBName]

# 6、git commit

### 修改commit内容
当我们想要对上一次的提交进行修改时，我们可以使用git commit –amend命令。git commit –amend既可以对上次提交的内容进行修改，也可以修改提交说明。

如果有新的文件修改，需要合并到最近一次提交的commit里面，也可以使用上面命令直接修改即可。


> git commit --amend -no-edit

git status
git log
git show

### 6-1、删除commit

> git reset HEAD^    删除最新commit记录

### 6-2、误删除commit

- git reflog
- git reset commitId

# 7、多个commit合并(git rebase)  

实战中终于理解这条命令的作用。当我们在合并请求时又双叒叕发现一个小错误，又不得不commit一次，真想删除分支全部重新提交。但是commit是可以合并的。
[git 几个commit点合并成一个commit点](https://blog.csdn.net/u013276277/article/details/82470177)

- 1、git status当前所有修改是否都commit。如果没有后面rebase无法继续。
- 2、git log查看commitId
- 3、git rebase -i commitId（commitId是合并后的commitId的前一个）**即不影响的log**
- 4、**将删除的commit记录前面的pick改为squash，保存退出**
- 5、修改commit内容
- 6、git log查看合并结果 
- 7、git push origin [Bname] -f 可能提交会产生冲突，建议强制

  (use "git rebase --edit-todo" to view and edit)
You are currently editing a commit while rebasing branch 'hejian' on 'ddd330e'.
  (use "git commit --amend" to amend the current commit)
  (use "git rebase --continue" once you are satisfied with your changes)

# 8、如何切换分支并且改变其修改的不同的内容

就是本地像远程分支管理一样，不同分支不同的内容。但是实践看到都是一样的，后来发现姿势不对。

### 实验

```
mkdir Github   本地Github文件夹
cd Github
git init
vi helloworld.txt
	wuli github
git branch father    
git add .
git commit -m"add txt"
git checkout -b son   注意:这种创建分支的方式是将当前的分支复制到了新分支，因此尽量在修改代码前创建分支

vi helloworld.txt
	wuli github
	yes,you are right
git add .
git commit -m"update"
git log
	add txt
	update
git checkout father
git log
	add txt			这时候发现commit日志会出现不同。并且helloworld文件的内容也会随切换不同分支而改变
```

注意：当两个分支前面的commit日志一模一样的时候，是可以随意切换checkout的，但是不同的时候是需要先commit才能切换，stash也能解决这个问题。

总结：远程和本地一样，这就为啥有个叫本地仓库的概念了，本地修改了内容尽量commit到本地，只有commit了才会切换分支看到效果。

# 9、stash的作用

[stash —— 一个极度实用的Git操作](https://www.jianshu.com/p/fcf69e2d3e6b)
git stash   藏好代码
git stash list  

- git stash pop  [stash@{0}] （删除stash记录）
- git stash apply （不删除stash记录）

好习惯：master作为备份更新，第一步是创建新分支。当有新问题的时候，stash后去master分支创建新分支。

上面的commit一定是最新的。



超级好用：

git stash

git stash pop

git stash list

git stash -h



# 10、Git 全局设置（必须）

```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
```

- git config --list     查看配置信息
- git config -l
- git config --local -l
- git config --global -l

# 11、回退命令（放弃所有本地修改）

```
git reflog
git reset --hard 7edb984	放弃修改
git reset --soft 7edb984 	回到commit之前
git checkout -- filename	撤销文件的修改
HEAD
HEAD~3
commit_id

强推到远程
git push origin HEAD --force

```

可引用git checkout或者用git clean -df至修改前的状态。就可以放弃所有修改。

1、git checkout功能是本地所有修改的。没有的提交的，都返回到原来的状态

2、git stash功能是把所有没有提交的修改暂存到stash里面。可用git stash [pop](https://www.baidu.com/s?wd=pop&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)回复。

3、git reset --hard HASH功能是返回到某个节点，不保留修改。

4、git reset --soft HASH功能是返回到某个节点。保留修改。

5、git clean -df功能是保留修改，返回到某个节点。

**拓展资料**：

1、Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

[![img](https://img3.mukewang.com/5c773adf000145dc06000425.jpg)](https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7acb0a46f21fbe094c3be72c66600c338744ada4.jpg)

2、Torvalds 开始着手开发 Git 是为了作为一种过渡方案来替代 BitKeeper，后者之前一直是 Linux 内核开发人员在全球使用的主要源代码工具。开放源码社区中的有些人觉得BitKeeper 的许可证并不适合开放源码社区的工作，因此 Torvalds 决定着手研究许可证更为灵活的版本控制系统。尽管最初 Git 的开发是为了辅助 Linux 内核开发的过程，但是我们已经发现在很多其他自由软件项目中也使用了 Git。例如 很多 Freedesktop 的项目迁移到了 Git 上。



# # 12、Updates were rejected because the tip of your current branch is behind

1.使用强制push的方法：

$ git push -u origin master -f 

这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

2.push前先将远程repository修改pull下来

$ git pull origin master

$ git push -u origin master   （后续就是解决冲突）



# 13、git clean 的用法（如何使用Git删除新增的文件？）

git clean命令用来从你的工作目录中删除所有没有track过的文件
git clean经常和git reset --hard一起使用. 记住reset只影响被track过的文件, 所以需要clean来删除没有track过的文件. 结合使用这两个命令能让你的工作目录完全回到一个指定的的状态

```
git clean -n
```

是一次clean的演习, 告诉你哪些文件会被删除. 记住它不会真正地删除文件, 只是一个提醒。

```
git clean -f
```

删除当前目录下所有没有track过的文件. 它不会删除 .gitignore 文件里指定的文件夹和文件, 不管这些文件有没有被track过

```
git clean -f <path>
```

删除指定路径下的没有被track过的文件

```
git clean -df
```

删除当前目录下没有被track过的文件和文件夹

```
git clean -xf
```

删除当前目录下所有没有track过的文件. 不管它是否是 .gitignore 文件里面指定的文件夹和文件

`git reset --hard` 和 `git clean -f` 是一对好基友. 结合使用它们能让你的工作目录完全回退到最近一次commit的时候

`git clean` 对于刚编译过的项目也非常有用. 如, 它能轻易删除掉编译后生成的 .o 和 .exe 等文件. 这个在打包要发布一个release的时候非常有用

下面的例子要删除所有工作目录下面的修改, 包括新添加的文件. 假设你已经提交了一些快照了, 而且做了一些新的开发

```
git reset --hard

git clean -df
```

运行后, 工作目录和缓存区回到最近一次commit时候一摸一样的状态，git status会告诉你这是一个干净的工作目录, 又是一个新的开始了！

## 其他

--force
--hard
--soft
-d  等价于  --delete
-u  表示：
加了参数-u后，以后即可直接用git push 代替git push origin master
在git add -u中表示添加此次修改的全部原先存在的文件（即新建的不会添加 --update）。

```
1) 远程仓库相关命令
检出仓库：$ git clone git://github.com/jquery/jquery.git
查看远程仓库：$ git remote -v
添加远程仓库：$ git remote add [name] [url]
删除远程仓库：$ git remote rm [name]
修改远程仓库：$ git remote set-url --push[name][newUrl]
拉取远程仓库：$ git pull [remoteName] [localBranchName]
推送远程仓库：$ git push [remoteName] [localBranchName]
 
2）分支(branch)操作相关命令
查看本地分支：$ git branch
查看远程分支：$ git branch -r
创建本地分支：$ git branch [name] ----注意新分支创建后不会自动切换为当前分支
切换分支：$ git checkout [name]
创建新分支并立即切换到新分支：$ git checkout -b [name]
删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：$ git merge [name] ----将名称为[name]的分支与当前分支合并
创建远程分支(本地分支push到远程)：$ git push origin [name]
删除远程分支：$ git push origin :heads/[name]
```



## mintty.exe.stackdump文件

关于Git bash在win10重装系统情况下闪退并生成mintty.exe.stackdump文件的问题

总结：我也是在git commit时闪退产生了这个文件。试了几次同样的commit内容一直闪退，原因可能是中文时输入英文字母按回车键后闪退，然后在输入英文时shift切换没有闪退情况。我的问题不大，不能解决闪退网上有很多解决方法。





# 哭笑不得：git branch -a看不见一个分支

如果是下载项目就不要使用`git init test && cd test`初始化。

使用`git clone git@git.com master`下载项目后，会在当前目录下新建文件夹master并将项目下载这个目录下。

由于先前init初始化后，导致没有进入项目的文件夹中，使用git branch -a看不见任何分支。













更新服务端的分支到本地仓库
git fetch --all
列出所有的分支
git branch --all
切换到一个已有的分支
git checkout <您的分支名>
基于当前分支新建一个分支
git checkout -b <您的新分支名>
推送当前分支到服务端
git push origin <您的分支名>
删除本地的一个分支（当前所在分支和要删除的分支不能相同）
git branch -D <您的分支名>
删除服务端的一个分支
git push origin :<您的分支名>





应该右上角会有ssh和https转换，然而并没有。但是两者使用是一样的。
git clone -b gitbhttps://github.com/HanKin2015/GitBook.git

2. 远程分支重命名 (已经推送远程-假设本地分支和远程对应分支名称相同)
   a. 重命名远程分支对应的本地分支

git branch -m oldName newName
b. 删除远程分支

git push --delete origin oldName
c. 上传新命名的本地分支

git push origin newName
d.把修改后的本地分支与远程分支关联

git branch --set-upstream-to origin/newName



http://issuecdn.baidupcs.com/issue/netdisk/yunguanjia/BaiduNetdisk_6.8.1.3.exe


## Git 恢复本地误删的文件
起因：git clone下来的项目不久后就自动出现修改的红色感叹号标志，实际什么都没有做。后来猜测应该是杀毒软件之类的给我自动删除了，后来还真是。使用恢复方法恢复后，一会儿又给我删除了，要么关闭杀毒软件或者添加信任。

使用git pull --force强制拉取

正确的打开方式：
```
git reset HEAD 文件或文件夹
git checkout 文件或文件夹
```


## 14、进阶
### .gitignore
一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。来看一个实际的例子：
$ cat .gitignore
*.[oa]
*~
第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本。第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。

### 打patch
生成patch：
git format-patch commitID -1 生成当前commitID 的patch
git format-patch commitID -3 从当前commitID开始往下生成总共三个commit的patch文件
应用patch：
git apply --check xxx.patch 检查当前patch是否可以成功打入
git apply xxx.patch
git apply *.patch 同时打入所有patch

### 自定义别名（更高级的git log）
```
alias lg="git log --graph --pretty=format:’'Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit "
```

### git子模块使用
一个大型工程总会被分拆为一些子工程,git-submodule 就是完成这样一种子工程拆分与整合的工具.

添加一个子工程
git submodule add git@xxxx:subproj.git subproj
git commit -m “submodule added”

克隆一个带submodule的git仓库
git clone git@domain.com:massproj.git
git submodule init
git submodule update
或者
git clone --rescursive git@domain.com:massproj.git


查看修改的文件
git log --stat

查看commitID的具体修改
git log -p

查看文件最后的修改人
git blame -L 起始行号,结束行号



# git学习笔记

# 1、下载安装git
>sudo apt install git

明白为啥使用sudo而不是直接root账户，防止错误操作，sudo进一步确认了一下。

Windows下载安装很随意。有个注意点：尽量选择下载和上传git仓库的时候不要进行Linux和Windows的换行符的转换，否则在不同环境下运行代码的时候很尴尬。

# 2、配置
## 配置家门，即上传者的身份
设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。以前并没有觉得多大作用，慢慢地发现一个git仓库是可以多人上传的，而这个配置就是显示上传者的身份，一般会填写个人的GitHub相关的信息，比如GitHub用户名和注册邮箱。乱写也是🆗的。

```
$ git config -l  ===  git config --list
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

还有一个local参数，即为单独仓库配置单独的上传者身份。
global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
```

## 修改global配置
简单粗暴：直接使用命令git config --global user.name "Your Name"。。。。
修改配置.gitconfig文件。

## 配置SSH-Key
提交代码需要的github权限，下载私有仓库代码时也会需要这个配置，主要在于上传代码，不配置就会每次输入账户和密码。

如果你想要使用 SSH url 克隆的话，你必须是这个项目的拥有者。否则你是无法添加 SSH key 的。
使用https url很好用？？？

### https 和 SSH 的区别：
1、前者可以随意克隆github上的项目，而不管是谁的；而后者则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key ，否则无法克隆。

2、https url 在push的时候是需要验证用户名和密码的；而 SSH 在push的时候，是不需要输入用户名的，如果配置SSH key的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。

```
ssh -T git@github.com    查看是否配置好
ssh-keygen -t rsa -C "邮件地址"
```

代码参数含义：

-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。

以上代码省略了 -f 参数，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。
接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码），

当然，你也可以不输入密码，直接按回车。那么push的时候就不需要输入密码（推荐），直接提交到github上了。




[TOC]

# git入门知识汇总

# 0、前言
## 配置一个完整的环境简单步骤
```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
ssh-keygen -t rsa -C "邮件地址"
拷贝生成的公钥到git的ssh钥匙中：/root/.ssh/id_rsa.pub
```

## 0-1、安装git

使用镜像网站不错。
[下载Windows下的Git命令行客户端](https://repo.huaweicloud.com/git-for-windows/)
[下载Windows下的Git小海龟客户端](https://repo.huaweicloud.com/tortoisegit/)

1、 先安装Git.exe
2、 再安装TortoiseGit.msi
3、 根据自己喜欢安装中文翻译补丁包LanguagePack



git update-git-for-windows   更新git客户端

## 0-2、解决TortoiseGit文件夹和文件状态图标不显示问题

- 先重启试试
- 修改注册表
- 设置里面设置显示icon overlays

# 1、使用git下载单个指定的文件夹

更多搜索“稀疏检出”。



```
稀疏检出恢复：

SC_FILE=.git/info/sparse-checkout
echo "Undoing sparse checkout"

# Get the full tree back

echo "*" > $SC_FILE
git config core.sparsecheckout true
git read-tree --reset -u HEAD

# Wipe out all traces of sparse checkout support

rm -rf $SC_FILE
git config core.sparsecheckout false
```





参考：https://www.cnblogs.com/zhoudaxiaa/p/8670481.html

方法一：http://zhoudaxiaa.gitee.io/downgit/#/home

方法二：

在Git1.7.0以前，这无法实现，但是幸运的是在Git1.7.0以后加入了Sparse Checkout模式，这使得Check Out指定文件或者文件夹成为可能。

**举个例子：**

> 现在有一个**test**仓库https://github.com/mygithub/test
> 你要gitclone里面的**tt**子目录：
> 在本地的硬盘位置打开**Git Bash**

```
git init test && cd test     //新建仓库并进入文件夹
git config core.sparsecheckout true //设置允许克隆子目录

echo 'tt*' >> .git/info/sparse-checkout //设置要克隆的仓库的子目录路径   //空格别漏

git remote add origin git@github.com:mygithub/test.git  //这里换成你要克隆的项目和库

git pull origin master    //下载
```

 https://blog.csdn.net/qq_35860352/article/details/80313078 不行

## 下载指定分支

git clone -b branch git@github.com:github/test.git 



**重点看这里**：

# 2、git add命令参数说明

git add -u：将文件的修改、文件的删除，添加到暂存区。
git add .：将文件的修改，文件的新建，添加到暂存区。
git add -A：将文件的修改，文件的删除，文件的新建，添加到暂存区。

-u就是update的意思，只会标记本地有改动（包括删除和修改）的已经追踪的文件

\1.  git add -A   保存所有的修改

\2.  git add .     保存新的添加和修改，但是不包括删除

\3.  git add -u   保存修改和删除，但是不包括新建文件。



# 3、git push 的 -u 参数具体适合含义？

一般只有同时存在多个远程仓库时才会用到--set-upstream。每个git branch可以有个对应的upstream。假设你有两个upstream，分别叫server1和server2，本地master branch的upstream是server1上的master，那么当你不带参数直接输入git pull或者git push时，默认是对server1进行pull/push。如果你成功运行"git push -u server2 master"，那么除了本地branch会被push到server2之外，还会把server2设置成upstream。



```
-u, --set-upstream
For every branch that is up to date or successfully pushed, add upstream (tracking) reference, used by argument-less git-pull(1) and other commands.
```

upstream不是针对远程仓库的，而是针对branch的，这一点应了那位童鞋所说的第二句话。但是upstream和有几个远程库没有必然联系。比如远程库A上有3个分支branch1、branch2、branch3。远程库B上有3个分支branchx、branchy、branchz。本地仓库有2个分支local1和local2。那么当初始状态时，local1和local2和任何一个分支都没有关联，也就是没有upstream。当通过git branch --set-upstream-to A/branch1 local1命令执行后，会给local1和branch1两个分支建立关联，也就是说local1的upstream指向的是branch1。这样的好处就是在local1分支上执行git push（git pull同理）操作时不用附加其它参数，Git就会自动将local1分支上的内容push到branch1上去。同样，local2分支也可以和远程库A和远程库B上的任何一个分支建立关联，只要给local2分支设置了upstream，就可以在local2分支上用git push（git pull同理）方便地与目标分支推拉数据。

综上所述，upstream与有几个远程库没有关系，它是分支与分支之间的流通道。

再来说说git push -u和git branch --set-upstream-to指令之间的区别。

举个例子：我要把本地分支mybranch1与远程仓库origin里的分支mybranch1建立关联。

（如果使用下列途径1的话，首先，你要切换到mybranch1分支上（git checkout mybranch1））

两个途径：1. git push -u origin mybranch1  2. git branch --set-upstream-to=origin/mybranch1 mybranch1

这两种方式都可以达到目的。但是1方法更通用，因为你的远程库有可能并没有mybranch1分支，这种情况下你用2方法就不可行，连目标分支都不存在，怎么进行关联呢？所以可以总结一下：git push -u origin mybranch1 相当于 git push origin mybranch1 + git branch --set-upstream-to=origin/mybranch1 mybranch1



# 4、分支管理

```
git branch 查看本地分支
git branch -r 查看远程分支
git branch -a 查看所有分支
git checkout [Bname] 切换分支
git push origin [Bname] 将空分支上传可以看作删除远程分支
git push origin --delete [Bname] 删除远程分支
git ls-remote origin [Bname] 查看远程仓库是否有这个分支，有就有返回值，没有就什么都没有
git remote [-v] 查看远程仓库地址
git branch -m oldBranchName newBranchName 重命名
```

## 4-1、删除分支

```
git branch -d [本地分支名]
git branch -D [本地分支名]
git branch -r -D [远程分支名]
```

## 4-2、合并分支

1. git pull (git checkout -b newBname Bname)



一、开发分支（dev）上的代码达到上线的标准后，要合并到 master 分支

```
git checkout dev
git pull
git checkout master
git merge dev
git push -u origin master
```

二、当master代码改动了，需要更新开发分支（dev）上的代码

```
git checkout master 
git pull 
git checkout dev
git merge master 
git push -u origin dev
```

## 4-3、远程分支覆盖本地分支

有时候同一个分支，远程的和本地的都被修改的面目全非了，如果想要把本地的替换成远程的，用下面的命令

git fetch --all
git reset --hard origin/master (这里master要修改为对应的分支名)
git pull

# 5、git冲突

当上传的时候产生冲突时：

## 5-1、在线git解决

方便快捷操作简单。

## 5-2、检出，在本地审查和合并

- git pull origin 分支（生产冲突文件）
- 在冲突文件里修改：删除和保留（git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容（数量为7））
- git add 冲突文件
- git commit
- git push


Step 1. 获取并检出此合并请求的分支

git fetch origin
git checkout -b [bName] origin/冲突分支

Step 2. 本地审查变更（忽略）

Step 3. 合并分支并修复出现的任何冲突

git checkout master
git merge --no-ff [bName]（本地就有冲突文件了，注意看产生冲突的文件）

Step 4. 推送合并的结果到 GitLab

git checkout -b [newBName]

git push origin [newBName]

# 6、git commit

### 修改commit内容
当我们想要对上一次的提交进行修改时，我们可以使用git commit –amend命令。git commit –amend既可以对上次提交的内容进行修改，也可以修改提交说明。

如果有新的文件修改，需要合并到最近一次提交的commit里面，也可以使用上面命令直接修改即可。


> git commit --amend -no-edit

git status
git log
git show

### 6-1、删除commit

> git reset HEAD^    删除最新commit记录

### 6-2、误删除commit

- git reflog
- git reset commitId

# 7、多个commit合并(git rebase)  

实战中终于理解这条命令的作用。当我们在合并请求时又双叒叕发现一个小错误，又不得不commit一次，真想删除分支全部重新提交。但是commit是可以合并的。
[git 几个commit点合并成一个commit点](https://blog.csdn.net/u013276277/article/details/82470177)

- 1、git status当前所有修改是否都commit。如果没有后面rebase无法继续。
- 2、git log查看commitId
- 3、git rebase -i commitId（commitId是合并后的commitId的前一个）**即不影响的log**
- 4、**将删除的commit记录前面的pick改为squash，保存退出**
- 5、修改commit内容
- 6、git log查看合并结果 
- 7、git push origin [Bname] -f 可能提交会产生冲突，建议强制

  (use "git rebase --edit-todo" to view and edit)
You are currently editing a commit while rebasing branch 'hejian' on 'ddd330e'.
  (use "git commit --amend" to amend the current commit)
  (use "git rebase --continue" once you are satisfied with your changes)

# 8、如何切换分支并且改变其修改的不同的内容

就是本地像远程分支管理一样，不同分支不同的内容。但是实践看到都是一样的，后来发现姿势不对。

### 实验

```
mkdir Github   本地Github文件夹
cd Github
git init
vi helloworld.txt
	wuli github
git branch father    
git add .
git commit -m"add txt"
git checkout -b son   注意:这种创建分支的方式是将当前的分支复制到了新分支，因此尽量在修改代码前创建分支

vi helloworld.txt
	wuli github
	yes,you are right
git add .
git commit -m"update"
git log
	add txt
	update
git checkout father
git log
	add txt			这时候发现commit日志会出现不同。并且helloworld文件的内容也会随切换不同分支而改变
```

注意：当两个分支前面的commit日志一模一样的时候，是可以随意切换checkout的，但是不同的时候是需要先commit才能切换，stash也能解决这个问题。

总结：远程和本地一样，这就为啥有个叫本地仓库的概念了，本地修改了内容尽量commit到本地，只有commit了才会切换分支看到效果。

# 9、stash的作用

[stash —— 一个极度实用的Git操作](https://www.jianshu.com/p/fcf69e2d3e6b)
git stash   藏好代码
git stash list  

- git stash pop  [stash@{0}] （删除stash记录）
- git stash apply （不删除stash记录）

好习惯：master作为备份更新，第一步是创建新分支。当有新问题的时候，stash后去master分支创建新分支。

上面的commit一定是最新的。



超级好用：

git stash

git stash pop

git stash list

git stash -h



# 10、Git 全局设置（必须）

```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
```

- git config --list     查看配置信息
- git config -l
- git config --local -l
- git config --global -l

# 11、回退命令（放弃所有本地修改）

```
git reflog
git reset --hard 7edb984	放弃修改
git reset --soft 7edb984 	回到commit之前
git checkout -- filename	撤销文件的修改
HEAD
HEAD~3
commit_id

强推到远程
git push origin HEAD --force

```

可引用git checkout或者用git clean -df至修改前的状态。就可以放弃所有修改。

1、git checkout功能是本地所有修改的。没有的提交的，都返回到原来的状态

2、git stash功能是把所有没有提交的修改暂存到stash里面。可用git stash [pop](https://www.baidu.com/s?wd=pop&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)回复。

3、git reset --hard HASH功能是返回到某个节点，不保留修改。

4、git reset --soft HASH功能是返回到某个节点。保留修改。

5、git clean -df功能是保留修改，返回到某个节点。

**拓展资料**：

1、Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

[![img](https://img3.mukewang.com/5c773adf000145dc06000425.jpg)](https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7acb0a46f21fbe094c3be72c66600c338744ada4.jpg)

2、Torvalds 开始着手开发 Git 是为了作为一种过渡方案来替代 BitKeeper，后者之前一直是 Linux 内核开发人员在全球使用的主要源代码工具。开放源码社区中的有些人觉得BitKeeper 的许可证并不适合开放源码社区的工作，因此 Torvalds 决定着手研究许可证更为灵活的版本控制系统。尽管最初 Git 的开发是为了辅助 Linux 内核开发的过程，但是我们已经发现在很多其他自由软件项目中也使用了 Git。例如 很多 Freedesktop 的项目迁移到了 Git 上。



# # 12、Updates were rejected because the tip of your current branch is behind

1.使用强制push的方法：

$ git push -u origin master -f 

这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

2.push前先将远程repository修改pull下来

$ git pull origin master

$ git push -u origin master   （后续就是解决冲突）



# 13、git clean 的用法（如何使用Git删除新增的文件？）

git clean命令用来从你的工作目录中删除所有没有track过的文件
git clean经常和git reset --hard一起使用. 记住reset只影响被track过的文件, 所以需要clean来删除没有track过的文件. 结合使用这两个命令能让你的工作目录完全回到一个指定的的状态

```
git clean -n
```

是一次clean的演习, 告诉你哪些文件会被删除. 记住它不会真正地删除文件, 只是一个提醒。

```
git clean -f
```

删除当前目录下所有没有track过的文件. 它不会删除 .gitignore 文件里指定的文件夹和文件, 不管这些文件有没有被track过

```
git clean -f <path>
```

删除指定路径下的没有被track过的文件

```
git clean -df
```

删除当前目录下没有被track过的文件和文件夹

```
git clean -xf
```

删除当前目录下所有没有track过的文件. 不管它是否是 .gitignore 文件里面指定的文件夹和文件

`git reset --hard` 和 `git clean -f` 是一对好基友. 结合使用它们能让你的工作目录完全回退到最近一次commit的时候

`git clean` 对于刚编译过的项目也非常有用. 如, 它能轻易删除掉编译后生成的 .o 和 .exe 等文件. 这个在打包要发布一个release的时候非常有用

下面的例子要删除所有工作目录下面的修改, 包括新添加的文件. 假设你已经提交了一些快照了, 而且做了一些新的开发

```
git reset --hard

git clean -df
```

运行后, 工作目录和缓存区回到最近一次commit时候一摸一样的状态，git status会告诉你这是一个干净的工作目录, 又是一个新的开始了！

## 其他

--force
--hard
--soft
-d  等价于  --delete
-u  表示：
加了参数-u后，以后即可直接用git push 代替git push origin master
在git add -u中表示添加此次修改的全部原先存在的文件（即新建的不会添加 --update）。

```
1) 远程仓库相关命令
检出仓库：$ git clone git://github.com/jquery/jquery.git
查看远程仓库：$ git remote -v
添加远程仓库：$ git remote add [name] [url]
删除远程仓库：$ git remote rm [name]
修改远程仓库：$ git remote set-url --push[name][newUrl]
拉取远程仓库：$ git pull [remoteName] [localBranchName]
推送远程仓库：$ git push [remoteName] [localBranchName]
 
2）分支(branch)操作相关命令
查看本地分支：$ git branch
查看远程分支：$ git branch -r
创建本地分支：$ git branch [name] ----注意新分支创建后不会自动切换为当前分支
切换分支：$ git checkout [name]
创建新分支并立即切换到新分支：$ git checkout -b [name]
删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：$ git merge [name] ----将名称为[name]的分支与当前分支合并
创建远程分支(本地分支push到远程)：$ git push origin [name]
删除远程分支：$ git push origin :heads/[name]
```



## mintty.exe.stackdump文件

关于Git bash在win10重装系统情况下闪退并生成mintty.exe.stackdump文件的问题

总结：我也是在git commit时闪退产生了这个文件。试了几次同样的commit内容一直闪退，原因可能是中文时输入英文字母按回车键后闪退，然后在输入英文时shift切换没有闪退情况。我的问题不大，不能解决闪退网上有很多解决方法。





# 哭笑不得：git branch -a看不见一个分支

如果是下载项目就不要使用`git init test && cd test`初始化。

使用`git clone git@git.com master`下载项目后，会在当前目录下新建文件夹master并将项目下载这个目录下。

由于先前init初始化后，导致没有进入项目的文件夹中，使用git branch -a看不见任何分支。













更新服务端的分支到本地仓库
git fetch --all
列出所有的分支
git branch --all
切换到一个已有的分支
git checkout <您的分支名>
基于当前分支新建一个分支
git checkout -b <您的新分支名>
推送当前分支到服务端
git push origin <您的分支名>
删除本地的一个分支（当前所在分支和要删除的分支不能相同）
git branch -D <您的分支名>
删除服务端的一个分支
git push origin :<您的分支名>





应该右上角会有ssh和https转换，然而并没有。但是两者使用是一样的。
git clone -b gitbhttps://github.com/HanKin2015/GitBook.git

2. 远程分支重命名 (已经推送远程-假设本地分支和远程对应分支名称相同)
   a. 重命名远程分支对应的本地分支

git branch -m oldName newName
b. 删除远程分支

git push --delete origin oldName
c. 上传新命名的本地分支

git push origin newName
d.把修改后的本地分支与远程分支关联

git branch --set-upstream-to origin/newName



http://issuecdn.baidupcs.com/issue/netdisk/yunguanjia/BaiduNetdisk_6.8.1.3.exe


## Git 恢复本地误删的文件
起因：git clone下来的项目不久后就自动出现修改的红色感叹号标志，实际什么都没有做。后来猜测应该是杀毒软件之类的给我自动删除了，后来还真是。使用恢复方法恢复后，一会儿又给我删除了，要么关闭杀毒软件或者添加信任。

使用git pull --force强制拉取

正确的打开方式：
```
git reset HEAD 文件或文件夹
git checkout 文件或文件夹
```


## 14、进阶
### .gitignore
一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。来看一个实际的例子：
$ cat .gitignore
*.[oa]
*~
第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本。第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。

### 打patch
生成patch：
git format-patch commitID -1 生成当前commitID 的patch
git format-patch commitID -3 从当前commitID开始往下生成总共三个commit的patch文件
应用patch：
git apply --check xxx.patch 检查当前patch是否可以成功打入
git apply xxx.patch
git apply *.patch 同时打入所有patch

### 自定义别名（更高级的git log）
```
alias lg="git log --graph --pretty=format:’'Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit "
```

### git子模块使用
一个大型工程总会被分拆为一些子工程,git-submodule 就是完成这样一种子工程拆分与整合的工具.

添加一个子工程
git submodule add git@xxxx:subproj.git subproj
git commit -m “submodule added”

克隆一个带submodule的git仓库
git clone git@domain.com:massproj.git
git submodule init
git submodule update
或者
git clone --rescursive git@domain.com:massproj.git


查看修改的文件
git log --stat

查看commitID的具体修改
git log -p

查看文件最后的修改人
git blame -L 起始行号,结束行号



# git学习笔记

# 1、下载安装git
>sudo apt install git

明白为啥使用sudo而不是直接root账户，防止错误操作，sudo进一步确认了一下。

Windows下载安装很随意。有个注意点：尽量选择下载和上传git仓库的时候不要进行Linux和Windows的换行符的转换，否则在不同环境下运行代码的时候很尴尬。

# 2、配置
## 配置家门，即上传者的身份
设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。以前并没有觉得多大作用，慢慢地发现一个git仓库是可以多人上传的，而这个配置就是显示上传者的身份，一般会填写个人的GitHub相关的信息，比如GitHub用户名和注册邮箱。乱写也是🆗的。

```
$ git config -l  ===  git config --list
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

还有一个local参数，即为单独仓库配置单独的上传者身份。
global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
```

## 修改global配置
简单粗暴：直接使用命令git config --global user.name "Your Name"。。。。
修改配置.gitconfig文件。

## 配置SSH-Key
提交代码需要的github权限，下载私有仓库代码时也会需要这个配置，主要在于上传代码，不配置就会每次输入账户和密码。

如果你想要使用 SSH url 克隆的话，你必须是这个项目的拥有者。否则你是无法添加 SSH key 的。
使用https url很好用？？？

### https 和 SSH 的区别：
1、前者可以随意克隆github上的项目，而不管是谁的；而后者则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key ，否则无法克隆。

2、https url 在push的时候是需要验证用户名和密码的；而 SSH 在push的时候，是不需要输入用户名的，如果配置SSH key的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。

```
ssh -T git@github.com    查看是否配置好
ssh-keygen -t rsa -C "邮件地址"
```

代码参数含义：

-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。

以上代码省略了 -f 参数，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。
接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码），

当然，你也可以不输入密码，直接按回车。那么push的时候就不需要输入密码（推荐），直接提交到github上了。




[TOC]

# git入门知识汇总

# 0、前言
## 配置一个完整的环境简单步骤
```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
ssh-keygen -t rsa -C "邮件地址"
拷贝生成的公钥到git的ssh钥匙中：/root/.ssh/id_rsa.pub
```

## 0-1、安装git

使用镜像网站不错。
[下载Windows下的Git命令行客户端](https://repo.huaweicloud.com/git-for-windows/)
[下载Windows下的Git小海龟客户端](https://repo.huaweicloud.com/tortoisegit/)

1、 先安装Git.exe
2、 再安装TortoiseGit.msi
3、 根据自己喜欢安装中文翻译补丁包LanguagePack



git update-git-for-windows   更新git客户端

## 0-2、解决TortoiseGit文件夹和文件状态图标不显示问题

- 先重启试试
- 修改注册表
- 设置里面设置显示icon overlays

# 1、使用git下载单个指定的文件夹

更多搜索“稀疏检出”。



```
稀疏检出恢复：

SC_FILE=.git/info/sparse-checkout
echo "Undoing sparse checkout"

# Get the full tree back

echo "*" > $SC_FILE
git config core.sparsecheckout true
git read-tree --reset -u HEAD

# Wipe out all traces of sparse checkout support

rm -rf $SC_FILE
git config core.sparsecheckout false
```





参考：https://www.cnblogs.com/zhoudaxiaa/p/8670481.html

方法一：http://zhoudaxiaa.gitee.io/downgit/#/home

方法二：

在Git1.7.0以前，这无法实现，但是幸运的是在Git1.7.0以后加入了Sparse Checkout模式，这使得Check Out指定文件或者文件夹成为可能。

**举个例子：**

> 现在有一个**test**仓库https://github.com/mygithub/test
> 你要gitclone里面的**tt**子目录：
> 在本地的硬盘位置打开**Git Bash**

```
git init test && cd test     //新建仓库并进入文件夹
git config core.sparsecheckout true //设置允许克隆子目录

echo 'tt*' >> .git/info/sparse-checkout //设置要克隆的仓库的子目录路径   //空格别漏

git remote add origin git@github.com:mygithub/test.git  //这里换成你要克隆的项目和库

git pull origin master    //下载
```

 https://blog.csdn.net/qq_35860352/article/details/80313078 不行

## 下载指定分支

git clone -b branch git@github.com:github/test.git 



**重点看这里**：

# 2、git add命令参数说明

git add -u：将文件的修改、文件的删除，添加到暂存区。
git add .：将文件的修改，文件的新建，添加到暂存区。
git add -A：将文件的修改，文件的删除，文件的新建，添加到暂存区。

-u就是update的意思，只会标记本地有改动（包括删除和修改）的已经追踪的文件

\1.  git add -A   保存所有的修改

\2.  git add .     保存新的添加和修改，但是不包括删除

\3.  git add -u   保存修改和删除，但是不包括新建文件。



# 3、git push 的 -u 参数具体适合含义？

一般只有同时存在多个远程仓库时才会用到--set-upstream。每个git branch可以有个对应的upstream。假设你有两个upstream，分别叫server1和server2，本地master branch的upstream是server1上的master，那么当你不带参数直接输入git pull或者git push时，默认是对server1进行pull/push。如果你成功运行"git push -u server2 master"，那么除了本地branch会被push到server2之外，还会把server2设置成upstream。



```
-u, --set-upstream
For every branch that is up to date or successfully pushed, add upstream (tracking) reference, used by argument-less git-pull(1) and other commands.
```

upstream不是针对远程仓库的，而是针对branch的，这一点应了那位童鞋所说的第二句话。但是upstream和有几个远程库没有必然联系。比如远程库A上有3个分支branch1、branch2、branch3。远程库B上有3个分支branchx、branchy、branchz。本地仓库有2个分支local1和local2。那么当初始状态时，local1和local2和任何一个分支都没有关联，也就是没有upstream。当通过git branch --set-upstream-to A/branch1 local1命令执行后，会给local1和branch1两个分支建立关联，也就是说local1的upstream指向的是branch1。这样的好处就是在local1分支上执行git push（git pull同理）操作时不用附加其它参数，Git就会自动将local1分支上的内容push到branch1上去。同样，local2分支也可以和远程库A和远程库B上的任何一个分支建立关联，只要给local2分支设置了upstream，就可以在local2分支上用git push（git pull同理）方便地与目标分支推拉数据。

综上所述，upstream与有几个远程库没有关系，它是分支与分支之间的流通道。

再来说说git push -u和git branch --set-upstream-to指令之间的区别。

举个例子：我要把本地分支mybranch1与远程仓库origin里的分支mybranch1建立关联。

（如果使用下列途径1的话，首先，你要切换到mybranch1分支上（git checkout mybranch1））

两个途径：1. git push -u origin mybranch1  2. git branch --set-upstream-to=origin/mybranch1 mybranch1

这两种方式都可以达到目的。但是1方法更通用，因为你的远程库有可能并没有mybranch1分支，这种情况下你用2方法就不可行，连目标分支都不存在，怎么进行关联呢？所以可以总结一下：git push -u origin mybranch1 相当于 git push origin mybranch1 + git branch --set-upstream-to=origin/mybranch1 mybranch1



# 4、分支管理

```
git branch 查看本地分支
git branch -r 查看远程分支
git branch -a 查看所有分支
git checkout [Bname] 切换分支
git push origin [Bname] 将空分支上传可以看作删除远程分支
git push origin --delete [Bname] 删除远程分支
git ls-remote origin [Bname] 查看远程仓库是否有这个分支，有就有返回值，没有就什么都没有
git remote [-v] 查看远程仓库地址
git branch -m oldBranchName newBranchName 重命名
```

## 4-1、删除分支

```
git branch -d [本地分支名]
git branch -D [本地分支名]
git branch -r -D [远程分支名]
```

## 4-2、合并分支

1. git pull (git checkout -b newBname Bname)



一、开发分支（dev）上的代码达到上线的标准后，要合并到 master 分支

```
git checkout dev
git pull
git checkout master
git merge dev
git push -u origin master
```

二、当master代码改动了，需要更新开发分支（dev）上的代码

```
git checkout master 
git pull 
git checkout dev
git merge master 
git push -u origin dev
```

## 4-3、远程分支覆盖本地分支

有时候同一个分支，远程的和本地的都被修改的面目全非了，如果想要把本地的替换成远程的，用下面的命令

git fetch --all
git reset --hard origin/master (这里master要修改为对应的分支名)
git pull

# 5、git冲突

当上传的时候产生冲突时：

## 5-1、在线git解决

方便快捷操作简单。

## 5-2、检出，在本地审查和合并

- git pull origin 分支（生产冲突文件）
- 在冲突文件里修改：删除和保留（git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容（数量为7））
- git add 冲突文件
- git commit
- git push


Step 1. 获取并检出此合并请求的分支

git fetch origin
git checkout -b [bName] origin/冲突分支

Step 2. 本地审查变更（忽略）

Step 3. 合并分支并修复出现的任何冲突

git checkout master
git merge --no-ff [bName]（本地就有冲突文件了，注意看产生冲突的文件）

Step 4. 推送合并的结果到 GitLab

git checkout -b [newBName]

git push origin [newBName]

# 6、git commit

### 修改commit内容
当我们想要对上一次的提交进行修改时，我们可以使用git commit –amend命令。git commit –amend既可以对上次提交的内容进行修改，也可以修改提交说明。

如果有新的文件修改，需要合并到最近一次提交的commit里面，也可以使用上面命令直接修改即可。


> git commit --amend -no-edit

git status
git log
git show

### 6-1、删除commit

> git reset HEAD^    删除最新commit记录

### 6-2、误删除commit

- git reflog
- git reset commitId

# 7、多个commit合并(git rebase)  

实战中终于理解这条命令的作用。当我们在合并请求时又双叒叕发现一个小错误，又不得不commit一次，真想删除分支全部重新提交。但是commit是可以合并的。
[git 几个commit点合并成一个commit点](https://blog.csdn.net/u013276277/article/details/82470177)

- 1、git status当前所有修改是否都commit。如果没有后面rebase无法继续。
- 2、git log查看commitId
- 3、git rebase -i commitId（commitId是合并后的commitId的前一个）**即不影响的log**
- 4、**将删除的commit记录前面的pick改为squash，保存退出**
- 5、修改commit内容
- 6、git log查看合并结果 
- 7、git push origin [Bname] -f 可能提交会产生冲突，建议强制

  (use "git rebase --edit-todo" to view and edit)
You are currently editing a commit while rebasing branch 'hejian' on 'ddd330e'.
  (use "git commit --amend" to amend the current commit)
  (use "git rebase --continue" once you are satisfied with your changes)

# 8、如何切换分支并且改变其修改的不同的内容

就是本地像远程分支管理一样，不同分支不同的内容。但是实践看到都是一样的，后来发现姿势不对。

### 实验

```
mkdir Github   本地Github文件夹
cd Github
git init
vi helloworld.txt
	wuli github
git branch father    
git add .
git commit -m"add txt"
git checkout -b son   注意:这种创建分支的方式是将当前的分支复制到了新分支，因此尽量在修改代码前创建分支

vi helloworld.txt
	wuli github
	yes,you are right
git add .
git commit -m"update"
git log
	add txt
	update
git checkout father
git log
	add txt			这时候发现commit日志会出现不同。并且helloworld文件的内容也会随切换不同分支而改变
```

注意：当两个分支前面的commit日志一模一样的时候，是可以随意切换checkout的，但是不同的时候是需要先commit才能切换，stash也能解决这个问题。

总结：远程和本地一样，这就为啥有个叫本地仓库的概念了，本地修改了内容尽量commit到本地，只有commit了才会切换分支看到效果。

# 9、stash的作用

[stash —— 一个极度实用的Git操作](https://www.jianshu.com/p/fcf69e2d3e6b)
git stash   藏好代码
git stash list  

- git stash pop  [stash@{0}] （删除stash记录）
- git stash apply （不删除stash记录）

好习惯：master作为备份更新，第一步是创建新分支。当有新问题的时候，stash后去master分支创建新分支。

上面的commit一定是最新的。



超级好用：

git stash

git stash pop

git stash list

git stash -h



# 10、Git 全局设置（必须）

```
git config --global user.name "张三"
git config --global user.email "49660@zhangsan.com"
```

- git config --list     查看配置信息
- git config -l
- git config --local -l
- git config --global -l

# 11、回退命令（放弃所有本地修改）

```
git reflog
git reset --hard 7edb984	放弃修改
git reset --soft 7edb984 	回到commit之前
git checkout -- filename	撤销文件的修改
HEAD
HEAD~3
commit_id

强推到远程
git push origin HEAD --force

```

可引用git checkout或者用git clean -df至修改前的状态。就可以放弃所有修改。

1、git checkout功能是本地所有修改的。没有的提交的，都返回到原来的状态

2、git stash功能是把所有没有提交的修改暂存到stash里面。可用git stash [pop](https://www.baidu.com/s?wd=pop&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)回复。

3、git reset --hard HASH功能是返回到某个节点，不保留修改。

4、git reset --soft HASH功能是返回到某个节点。保留修改。

5、git clean -df功能是保留修改，返回到某个节点。

**拓展资料**：

1、Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

[![img](https://img3.mukewang.com/5c773adf000145dc06000425.jpg)](https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/7acb0a46f21fbe094c3be72c66600c338744ada4.jpg)

2、Torvalds 开始着手开发 Git 是为了作为一种过渡方案来替代 BitKeeper，后者之前一直是 Linux 内核开发人员在全球使用的主要源代码工具。开放源码社区中的有些人觉得BitKeeper 的许可证并不适合开放源码社区的工作，因此 Torvalds 决定着手研究许可证更为灵活的版本控制系统。尽管最初 Git 的开发是为了辅助 Linux 内核开发的过程，但是我们已经发现在很多其他自由软件项目中也使用了 Git。例如 很多 Freedesktop 的项目迁移到了 Git 上。



# # 12、Updates were rejected because the tip of your current branch is behind

1.使用强制push的方法：

$ git push -u origin master -f 

这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

2.push前先将远程repository修改pull下来

$ git pull origin master

$ git push -u origin master   （后续就是解决冲突）



# 13、git clean 的用法（如何使用Git删除新增的文件？）

git clean命令用来从你的工作目录中删除所有没有track过的文件
git clean经常和git reset --hard一起使用. 记住reset只影响被track过的文件, 所以需要clean来删除没有track过的文件. 结合使用这两个命令能让你的工作目录完全回到一个指定的的状态

```
git clean -n
```

是一次clean的演习, 告诉你哪些文件会被删除. 记住它不会真正地删除文件, 只是一个提醒。

```
git clean -f
```

删除当前目录下所有没有track过的文件. 它不会删除 .gitignore 文件里指定的文件夹和文件, 不管这些文件有没有被track过

```
git clean -f <path>
```

删除指定路径下的没有被track过的文件

```
git clean -df
```

删除当前目录下没有被track过的文件和文件夹

```
git clean -xf
```

删除当前目录下所有没有track过的文件. 不管它是否是 .gitignore 文件里面指定的文件夹和文件

`git reset --hard` 和 `git clean -f` 是一对好基友. 结合使用它们能让你的工作目录完全回退到最近一次commit的时候

`git clean` 对于刚编译过的项目也非常有用. 如, 它能轻易删除掉编译后生成的 .o 和 .exe 等文件. 这个在打包要发布一个release的时候非常有用

下面的例子要删除所有工作目录下面的修改, 包括新添加的文件. 假设你已经提交了一些快照了, 而且做了一些新的开发

```
git reset --hard

git clean -df
```

运行后, 工作目录和缓存区回到最近一次commit时候一摸一样的状态，git status会告诉你这是一个干净的工作目录, 又是一个新的开始了！

## 其他

--force
--hard
--soft
-d  等价于  --delete
-u  表示：
加了参数-u后，以后即可直接用git push 代替git push origin master
在git add -u中表示添加此次修改的全部原先存在的文件（即新建的不会添加 --update）。

```
1) 远程仓库相关命令
检出仓库：$ git clone git://github.com/jquery/jquery.git
查看远程仓库：$ git remote -v
添加远程仓库：$ git remote add [name] [url]
删除远程仓库：$ git remote rm [name]
修改远程仓库：$ git remote set-url --push[name][newUrl]
拉取远程仓库：$ git pull [remoteName] [localBranchName]
推送远程仓库：$ git push [remoteName] [localBranchName]
 
2）分支(branch)操作相关命令
查看本地分支：$ git branch
查看远程分支：$ git branch -r
创建本地分支：$ git branch [name] ----注意新分支创建后不会自动切换为当前分支
切换分支：$ git checkout [name]
创建新分支并立即切换到新分支：$ git checkout -b [name]
删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：$ git merge [name] ----将名称为[name]的分支与当前分支合并
创建远程分支(本地分支push到远程)：$ git push origin [name]
删除远程分支：$ git push origin :heads/[name]
```



## mintty.exe.stackdump文件

关于Git bash在win10重装系统情况下闪退并生成mintty.exe.stackdump文件的问题

总结：我也是在git commit时闪退产生了这个文件。试了几次同样的commit内容一直闪退，原因可能是中文时输入英文字母按回车键后闪退，然后在输入英文时shift切换没有闪退情况。我的问题不大，不能解决闪退网上有很多解决方法。





# 哭笑不得：git branch -a看不见一个分支

如果是下载项目就不要使用`git init test && cd test`初始化。

使用`git clone git@git.com master`下载项目后，会在当前目录下新建文件夹master并将项目下载这个目录下。

由于先前init初始化后，导致没有进入项目的文件夹中，使用git branch -a看不见任何分支。













更新服务端的分支到本地仓库
git fetch --all
列出所有的分支
git branch --all
切换到一个已有的分支
git checkout <您的分支名>
基于当前分支新建一个分支
git checkout -b <您的新分支名>
推送当前分支到服务端
git push origin <您的分支名>
删除本地的一个分支（当前所在分支和要删除的分支不能相同）
git branch -D <您的分支名>
删除服务端的一个分支
git push origin :<您的分支名>





应该右上角会有ssh和https转换，然而并没有。但是两者使用是一样的。
git clone -b gitbhttps://github.com/HanKin2015/GitBook.git

2. 远程分支重命名 (已经推送远程-假设本地分支和远程对应分支名称相同)
   a. 重命名远程分支对应的本地分支

git branch -m oldName newName
b. 删除远程分支

git push --delete origin oldName
c. 上传新命名的本地分支

git push origin newName
d.把修改后的本地分支与远程分支关联

git branch --set-upstream-to origin/newName



http://issuecdn.baidupcs.com/issue/netdisk/yunguanjia/BaiduNetdisk_6.8.1.3.exe


## Git 恢复本地误删的文件
起因：git clone下来的项目不久后就自动出现修改的红色感叹号标志，实际什么都没有做。后来猜测应该是杀毒软件之类的给我自动删除了，后来还真是。使用恢复方法恢复后，一会儿又给我删除了，要么关闭杀毒软件或者添加信任。

使用git pull --force强制拉取

正确的打开方式：
```
git reset HEAD 文件或文件夹
git checkout 文件或文件夹
```


## 14、进阶
### .gitignore
一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。来看一个实际的例子：
$ cat .gitignore
*.[oa]
*~
第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本。第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。

### 打patch
生成patch：
git format-patch commitID -1 生成当前commitID 的patch
git format-patch commitID -3 从当前commitID开始往下生成总共三个commit的patch文件
应用patch：
git apply --check xxx.patch 检查当前patch是否可以成功打入
git apply xxx.patch
git apply *.patch 同时打入所有patch

### 自定义别名（更高级的git log）
```
alias lg="git log --graph --pretty=format:’'Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit "
```

### git子模块使用
一个大型工程总会被分拆为一些子工程,git-submodule 就是完成这样一种子工程拆分与整合的工具.

添加一个子工程
git submodule add git@xxxx:subproj.git subproj
git commit -m “submodule added”

克隆一个带submodule的git仓库
git clone git@domain.com:massproj.git
git submodule init
git submodule update
或者
git clone --rescursive git@domain.com:massproj.git


查看修改的文件
git log --stat

查看commitID的具体修改
git log -p

查看文件最后的修改人
git blame -L 起始行号,结束行号



# git学习笔记

# 1、下载安装git
>sudo apt install git

明白为啥使用sudo而不是直接root账户，防止错误操作，sudo进一步确认了一下。

Windows下载安装很随意。有个注意点：尽量选择下载和上传git仓库的时候不要进行Linux和Windows的换行符的转换，否则在不同环境下运行代码的时候很尴尬。

# 2、配置
## 配置家门，即上传者的身份
设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

设置git自己的名字和电子邮件。这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。以前并没有觉得多大作用，慢慢地发现一个git仓库是可以多人上传的，而这个配置就是显示上传者的身份，一般会填写个人的GitHub相关的信息，比如GitHub用户名和注册邮箱。乱写也是🆗的。

```
$ git config -l  ===  git config --list
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

还有一个local参数，即为单独仓库配置单独的上传者身份。
global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
```

## 修改global配置
简单粗暴：直接使用命令git config --global user.name "Your Name"。。。。
修改配置.gitconfig文件。

## 配置SSH-Key
提交代码需要的github权限，下载私有仓库代码时也会需要这个配置，主要在于上传代码，不配置就会每次输入账户和密码。

如果你想要使用 SSH url 克隆的话，你必须是这个项目的拥有者。否则你是无法添加 SSH key 的。
使用https url很好用？？？

### https 和 SSH 的区别：
1、前者可以随意克隆github上的项目，而不管是谁的；而后者则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key ，否则无法克隆。

2、https url 在push的时候是需要验证用户名和密码的；而 SSH 在push的时候，是不需要输入用户名的，如果配置SSH key的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。

```
ssh -T git@github.com    查看是否配置好
ssh-keygen -t rsa -C "邮件地址"
```

代码参数含义：

-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。

以上代码省略了 -f 参数，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。
接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码），

当然，你也可以不输入密码，直接按回车。那么push的时候就不需要输入密码（推荐），直接提交到github上了。

# git cherry-pick教程

http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html

手动版：
git dfii commitHash1 commitHash2 > 123.patch
git apply --reject 123.patch


# LFS failed to upload object, also fails to upload missing object later with explicit 'git lfs push origin master' 
remote: GitLab: LFS objects are missing. Ensure LFS is properly set up or try a manual "git lfs push --all".

无解，只能重新创建本地仓库。

出现这种情况有3种原因：

- 如果这些文件是你从别处克隆过来的，说明源头就不对，或者你克隆的方式不对，或者网络出错了；
- 如果这些文件是你在本地新增的，说明.git目录下有些文件被你误删了；
- 如果这些文件是你在本地新增的，但是是从别处目录拷贝过来的，你有可能拷贝的是git lfs pointer文件，这些文件会出发git lfs命令的bug，也就是文件被添加了，但.git下没有，也就遇到了上述git lfs fsck输出的错误。

# git 查看最近或某一次提交修改的文件列表相关命令整理。
git log --name-status 每次修改的文件列表, 显示状态
git log --name-only 每次修改的文件列表
git log --stat 每次修改的文件列表, 及文件修改的统计
git whatchanged 每次修改的文件列表
git whatchanged --stat 每次修改的文件列表, 及文件修改的统计
git show 显示最后一次的文件改变的具体内容
git show -5 显示最后 5 次的文件改变的具体内容
git show commitid 显示某个 commitid 改变的具体内容

## 20210112
今天发现git上库时间是根据本地系统时间来设定的，因此如果本地时间有错误，上库后会出现 有***提交于11个月后 的情况。

特别有趣。

git blame xxx.cpp可以查看文件每一行修改的情况。

git log -p xxx.cpp：查看某个文件每次提交的详细修改

查看文件在某次提交的修改内容：git show commitId xxx.cpp

## 20200113
git切换到某次提交：	 

git reset commitId和 在分支上面git checkout commitId都不是想要的结果。问题在于本地还是会包含后面的所有修改的东西。

正确做法：git checkout -b backtocommitid commitId
建立新的分支，这时候就没有了后面修改的东西。










