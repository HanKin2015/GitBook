# shell工程中checklist规范

- rm命令执行之前判断路径是否有效
- 通道命令属于同一个尽量写在一起，如| awk 'NR==2' | awk '{print $NF}'
- 


ShellCheck下载地址：https://github.com/koalaman/shellcheck/releases，下载对应平台的tar包解压，扫描命令：shellcheck -e SC1090,SC1091,SC2034,SC2002,SC2006,SC2181,SC2166,SC2219,SC2236,SC2044,SC2010,SC2009,SC2119,SC2120,SC2012,SC2003,SC2162 你的脚本文件
对于规则不理解，可以访问 https://github.com/koalaman/shellcheck/wiki/Checks，或者直接通过 https://github.com/koalaman/shellcheck/wiki/SC1000 这种形式查询指定错误解释















