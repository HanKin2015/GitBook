# git cherry-pick

你需要另一个分支的所有代码变动，那么就采用合并（git merge）。另一种情况是，你只需要部分代码变动（某几个提交），这时可以采用 Cherry pick。

注意：只能在一个仓库这样操作，切换到需要修改的分支，然后使用命令将其他分支的修改拉取到当前分支。
Cherry pick 也支持转移另一个代码库的提交，方法是先将该库加为远程仓库。（不是太推荐）


git cherry-pick <commitHash>

## Cherry pick 支持一次转移多个提交。

$ git cherry-pick <HashA> <HashB>
上面的命令将 A 和 B 两个提交应用到当前分支。这会在当前分支生成两个对应的新提交。

如果想要转移一系列的连续提交，可以使用下面的简便语法。


$ git cherry-pick A..B 
上面的命令可以转移从 A 到 B 的所有提交。它们必须按照正确的顺序放置：提交 A 必须早于提交 B，否则命令将失败，但不会报错。

注意，使用上面的命令，提交 A 将不会包含在 Cherry pick 中。如果要包含提交 A，可以使用下面的语法。


$ git cherry-pick A^..B 