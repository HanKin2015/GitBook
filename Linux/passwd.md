# 修改用户密码

> passwd  # 修改当前用户的密码
>
> passwd username # 修改指定用户的密码（root权限）

忘记root密码去修改root密码（没有预先设置）：

- sudo su

- 输入当前用户密码进入root账户

- passwd

- (这里省略root密码验证)

- 直接新密码

普通用户设置密码提示不能太短（弱）：

- sudo passwd 用户名（管理员权限可以设置短密码）