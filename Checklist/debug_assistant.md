# 调试小能手

## 1、日志打不全将内容保存到本地文件
`` 
FILE *fd = fopen("/home/hj.txt", "a");
+    fprintf(fd, "%s\n", return_msg_rcconf.c_str());
+    fclose(fd);
+    fd = NULL;`

```





