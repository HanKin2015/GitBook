# python调用shell脚本

```shell
#!/bin/bash
result=`ls`
echo $result
```

```python
# -*- coding: utf-8 -*-
"""
Created on Sat Oct 17 11:02:28 2020

@author: hankin
"""

import subprocess

cmd = r"./ls.sh"
cmd_result = subprocess.Popen(cmd, stdout=subprocess.PIPE)
result = cmd_result.stdout.read()
print(result)
```


只能在Linux系统下运行，并且使用dos2unix将shell脚本转换一下

返回结果：
b'ls.sh python_shell.py\n'

## ping网络端口
有个问题，必须要使用os.system，因为只有这个才有返回值。
在Windows使用有个问题，会不停不停地弹出窗口。

```
# -*- coding: utf-8 -*-
"""
Created on Tue Oct 13 11:19:23 2020

@author: hankin
"""

import os
import subprocess

subprocess.run("ping 127.0.0.1", shell=True)


# linux下ping使用-c，Windows下ping使用-n
# 因此，python脚本需要考虑是在哪种系统中使用。还是推荐使用Windows吧
for i in range(90, 100):
    ip = "172.22.192.{}".format(i)
    ret = os.system('ping -n 1 -w 1 %s'%ip) # 每个ip ping 2次，等待时间为1s
    #cmd = "ping -n 1 -w 1 {}".format(ip)
    #ret = subprocess.run(cmd, shell=True)
    #print(subprocess.run("tree", shell=True).stdout)
    #ret = subprocess.Popen(cmd, shell=True, stderr=subprocess.PIPE)
    print(ret.returncode)
    if ret:
        print('ping %s is fail'%ip)
    else:
        print('ping %s is ok'%ip)
```


