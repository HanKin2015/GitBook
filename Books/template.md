# Template

## 1、c++执行shell命令
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

















