# flock文件锁

参考：https://www.cnblogs.com/wangyongqiang/articles/11799904.html

原理：每次shell开始运行，就检测某个特定的“锁文件”是否存在，如果不存在就touch一个；如果存在，则输出错误信息，提示用户稍后重试。

exec那一行将LOCKFILE和文件描述符200以“写”的方式连接起来（不需要LOCKFILE存在），之后flock尝试获得文件描述符200的锁，-n参数表示如果失败则直接fail而不等待。所以这里如果没有获得锁的话，会输出一条提示信息，然后以阻塞的方式等待获得文件描述符200的锁。

最给力的是，在整个shell脚本执行结束时，文件描述符200会关闭，则其上的锁也就会自动释放。这样，就不用上面那种使用trap的方式去处理各种异常！

```test.sh
LOCKFILE="./file.tmp"

exec 200>$LOCKFILE
flock -n 200 || {
    echo "Another user is doing the same thing，please wait.."
    flock 200
}

for i in {1..10}
do
    sleep 1s
    echo ${i}
done

echo "done"
```

两个窗口运行test.sh脚本，会发现前面一个脚本正常运行，运行结束后后面一个脚本正常运行。


