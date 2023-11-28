# 网络端口那些事儿

## 1、telnet命令
telnet 1.2.3.4 22

## 2、netstat命令
netstat -aon | grep :
netstat -lntp |grep :
netstat -aon|findstr :8001

## 3、nc命令
nc -l -k 9085 &

-l 表示监听
-k 表示端口持续打开，可接收多次的连接请求

当在一个端执行nc监听端口命令后（不加&后台运行），在Windows平台执行telnet命令，对于22端口，linux端可能会返回SSH-2.0-OpenSSH_7.2p2 Ubuntu-4ubuntu2.10 Protocol mismatch.对于其他端口，如nc创建的端口监听，会一直是一个输出界面。这时候你在屏幕上面打字，然后会实时输出到服务端窗口，特别有意思。
如果本地使用python脚本的requests库上传内容，也会输出过去，但是存在乱码问题，代码见：D:\Github\Storage\python\web\solve_mariaDB_data_question.py
