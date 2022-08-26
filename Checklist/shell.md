# shell工程中checklist规范

## 1、综述
- rm命令执行之前判断路径是否有效
- 通道命令属于同一个尽量写在一起，如| awk 'NR==2' | awk '{print $NF}'
- 


ShellCheck下载地址：https://github.com/koalaman/shellcheck/releases，下载对应平台的tar包解压，扫描命令：shellcheck -e SC1090,SC1091,SC2034,SC2002,SC2006,SC2181,SC2166,SC2219,SC2236,SC2044,SC2010,SC2009,SC2119,SC2120,SC2012,SC2003,SC2162 你的脚本文件
对于规则不理解，可以访问 https://github.com/koalaman/shellcheck/wiki/Checks，或者直接通过 https://github.com/koalaman/shellcheck/wiki/SC1000 这种形式查询指定错误解释

## 2、SC2103
https://github.com/koalaman/shellcheck/wiki/SC2103
Use a ( subshell ) to avoid having to cd back.

使用小括号增加一个subshell，这样在里面进行修改全局变量，完成无需还原操作；cd进入其他目录后也无需cd返回。
主要是消除cd -或者cd ..语句。

## 3、SC2086
https://github.com/koalaman/shellcheck/wiki/SC2086
Double quote to prevent globbing and word splitting.

```
Sometimes you want to split on spaces, like when building a command line:

options="-j 5 -B"
make $options file
Just quoting this doesn't work. Instead, you should have used an array (bash, ksh, zsh):

options=(-j 5 -B) # ksh: set -A options -- -j 5 -B
make "${options[@]}" file
```

## 4、SC2164
Use cd ... || exit in case cd fails.

```
cd generated_files || exit
rm -r *.c

# For functions, you may want to use return:
func(){
  cd foo || return
  do_something
}
```

## 5、SC2046
Quote this to prevent word splitting

不是很理解例子。但是实战大体是：

current_date_second=$(date -d `date +%Y%m%d` +%s)
修改为
current_date_second=$(date -d "`date +%Y%m%d`" +%s)

单引号不行。

## 6、防止执行rm /*
### 6-1、概述：
Use "${var:?}" to ensure this never expands to /* .

### 6-2、Problematic code:
rm -rf "$STEAMROOT/"*

### 6-3、Correct code:
rm -rf "${STEAMROOT:?}/"*

### 6-4、Rationale:
If STEAMROOT is empty, this will end up deleting everything in the system's root directory.

Using :? will cause the command to fail if the variable is null or unset. Similarly, you can use :- to set a default value if applicable.

In the case command substitution, assign to a variable first and then use :?. This is relevant even if the command seems simple and obviously correct, since forks and execs can fail due to external system limits and conditions, resulting in a blank substitution.

For more details about :? see the "Parameter Expansion" section of the Bash man page.

### 6-5、Exceptions:
None.

### 6-6、实战
没有做任何修改或者只使用:-。(会有大问题)
```
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #bash cp_usbip_driver.sh
/bin /boot /cdrom /dev /etc /home /initrd.img /initrd.img.old /lib /lib64 /log /lost+found /media /mnt /opt /proc /qxl_drv.so /root /run /sbin /snap /srv /sys /tmp /usr /var /vmlinuz /vmlinuz.old
end
```

使用:?会抛出异常，不会进行下一步
```
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #bash cp_usbip_driver.sh
cp_usbip_driver.sh: 行 14: STEAMROOT: 参数为空或未设置
```

使用:-tt
```
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #bash cp_usbip_driver.sh
tt/*
end
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #bash cp_usbip_driver.sh
A/*
end
```

