# shell脚本每隔几秒执行一次命令
```
#!/bin/bash
while :           #冒号表述死循环 同while (true)
do
    你的命令
    sleep 时间间隔
done
```

watch -n 2 -c "lsusb"





