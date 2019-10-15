# You have new mail in /var/spool/mail/root提示

问题：终端远程登陆后经常提示You have new mail in /var/spool/mail/root

这个提示是LINUX会定时查看LINUX各种状态做汇总，每经过一段时间会把汇总的信息发送的root的邮箱里，以供有需之时查看。
一般这种情况mail的内容就只是一些正常的系统信息或者是比较重要的错误报告。如果你安装了mutt的话直接用这个命令就可以查看mail的内容（用root登陆先），没有装的话用cat /var/spool/mail/root查看（用root登陆先）。

如何关闭提示呢？
解决方案：
第一步：关闭提示

> echo "unset MAILCHECK">> /etc/profile
> source /etc/profile

第二步：查看

> ls -lth /var/spool/mail/

第三步：清空

> cat /dev/null > /var/spool/mail/root