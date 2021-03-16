# 日志文件大小限制管理











## 附录：资料
### shell查看目录大小
du -ach *    #这个能看到当前目录下的所有文件占用磁盘大小和总大小
du -sh       #查看当前目录总大小
du -sh *     #查看所有子目录大小
 
lsof | grep delete    #如果怀疑删掉的数据还在占用磁盘空间试试这个
kill -9 pid           #结束掉进程就能释放磁盘空间了
 
#for i in `lsof | grep delete | awk '{print $2}'`; do kill -9 $i ;done











