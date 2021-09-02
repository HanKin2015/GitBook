# 执行shell命令

## 1、c++执行shell命令（没有处理返回结果）
```
/*
 * @brief 运行shell命令
 * @note 运行结果输出长度不超过outputLen且只输出第一行，超过会截断
 * @param cmd [in] shell命令
 * @param output [out] 运行结果输出
 * @param outputLen [in] 运行结果字符串长度
 * @return 无
 */
void ExecShellCmd(const char *cmd, char *output, int outputLen)
{
    if (cmd == NULL) {
        LOGE("cmd is null");
        return;
    }

    int bufferLen = 0;
    FILE *fp = NULL;
    char buffer[BUFSIZ] = { 0 };

    fp = popen(cmd, "r");
    if (!fp) {
        LOGE("popen error: %m");
        return;
    }

    while (fgets(buffer, sizeof(buffer), fp)) {
        bufferLen = strlen(buffer);
        if (buffer[bufferLen - 1] == '\n') {
            buffer[bufferLen - 1] = '\0';
        }
        if (*buffer != '\0') {
            LOGD("%s", buffer);
        }

        if (output) {
            if (outputLen < 1) {
                LOGE("outputLen is invalid");
                break;
            }
            strncpy(output, buffer, bufferLen > outputLen ? outputLen : bufferLen);
            output[outputLen - 1] = '\0';
            break;
        }
    }

    if (fp) {
        pclose(fp);
    }
}

//隐藏输入法工具栏
void hideInputTool()
{
    //隐藏ibus框架输入法工具栏
    ExecShellCmd("ibus engine xkb:us::eng", NULL, 0);
    //隐藏fcitx框架输入法工具栏
    ExecShellCmd("fcitx-remote -c", NULL, 0);
}
```

## 2、执行shell命令并获取返回值结果的方法
据说有统计数据表明，代码的缺陷率是一定的，与所使用的语言无关。Linux提供了很多的实用工具和脚本，在程序中调用工具和脚本，无疑可以简化程序，从而降低代码的缺陷数目。Linux shell 脚本也是一个强大的工具，我们可以根据需要编制脚本，然后在程序中调用自定义脚本。
Unix 编程艺术》中有一句话“一行 Shell 脚本胜过万行 C”。


## 函数定义
```
#include <stdio.h>
FILE * popen(const char *command , const char *type );
int pclose(FILE *stream);
```
# 函数说明
popen()函数通过创建一个管道，调用fork()产生一个子进程，执行一个shell以运行命令来开启一个进程。这个管道必须由pclose()函数关闭，而不是fclose()函数。pclose()函数关闭标准I/O流，等待命令执行结束，然后返回shell的终止状态。如果shell不能被执行，则pclose()返回的终止状态与shell已执行exit一样。

https://www.jb51.net/article/140783.htm
