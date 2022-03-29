# whereis和whence以及alias命令

# 14、alias

命令别名

```
alias显示当前别名列表
unalias取消命令别名

eg:
alias ll='ls -l --color=auto'
unalias ll
```

使用shell脚本执行alias命令未生效：
```add_alias.sh
#!/bin/bash

alias cl='cd /home/hankin/log/'
```

执行add_alias.sh脚本后未生效，正确方式是source add_alias.sh这样就可以了。











