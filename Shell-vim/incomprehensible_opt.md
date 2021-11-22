# 无法理解的神奇操作

## 1、神奇的赋值
差不多就是一个if选择，然后赋值
```
svn=2
[[ $svn =~ 1 ]] && svn_path="aaaa" && package_path="bbbb"
[[ $svn =~ 2 ]] && svn_path="cccc" && package_path="dddd"
echo $svn_path 
echo $package_path
```

## 2、神奇的赋值
https://github.com/cil-project/cil/blob/develop/install-sh
```
# Put in absolute file names if you don't have them in your path;
# or use environment vars.

chgrpprog=${CHGRPPROG-chgrp}
chmodprog=${CHMODPROG-chmod}
chownprog=${CHOWNPROG-chown}
cmpprog=${CMPPROG-cmp}
cpprog=${CPPROG-cp}
mkdirprog=${MKDIRPROG-mkdir}
mvprog=${MVPROG-mv}
rmprog=${RMPROG-rm}
stripprog=${STRIPPROG-strip}
```
实战结果：
```
[root@ubuntu0006:/media] #chgrpprog=${CHGRPPROG-chgrp}
[root@ubuntu0006:/media] #echo $chgrpprog
chgrp
[root@ubuntu0006:/media] #chgrpprog=${CHGRPPROGchgrp}
[root@ubuntu0006:/media] #echo $chgrpprog

[root@ubuntu0006:/media] #chgrpprog=${CHGRPPROG}
[root@ubuntu0006:/media] #echo $chgrpprog

[root@ubuntu0006:/media] #
```
上面的-可以进行选择，首先会查找是否存在前面的变量，有就赋值，否则就赋值后面的字符串值。
如：
```
[root@ubuntu0006:/media/sangfor/vdb] #HJ="abcde"
[root@ubuntu0006:/media/sangfor/vdb] #echo $HJ
abcde
[root@ubuntu0006:/media/sangfor/vdb] #CHHJ=${HJ-ok}
[root@ubuntu0006:/media/sangfor/vdb] #echo $CHHJ
abcde
[root@ubuntu0006:/media/sangfor/vdb] #CHHJ=${WHL-ok}
[root@ubuntu0006:/media/sangfor/vdb] #echo $CHHJ
ok
```

## 3、





