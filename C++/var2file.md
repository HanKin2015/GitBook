# 1、将一个变量的值写入本地文件

## 1-1、fwrite函数

 fwrite() 是 C 语言标准库中的一个文件处理函数，功能是向指定的文件中写入若干数据块，如成功执行则返回实际写入的数据块数目。该函数以二进制形式对文件进行操作，不局限于文本文件。 

```
FILE *fp = NULL;
if ((fp = fopen("/home/vmInfoXml", "wb")) == NULL) {
    fprintf(stderr, "Cannot open output file.\n");
    return -1;
}
fwrite(vmInfoXml, strlen(vmInfoXml), 1, fp);
fclose(fp);

system("echo xm >> /home/hejian");
char buffer[10024];
char *c = "dsada";
sprintf(buffer,"echo %s >> /tmp/vmInfoXml.log", c);
//LOGI("hejian ======= %s", buffer);
system(buffer);


int vmInfoXmlLen = strlen(vmInfoXml);
LOGI("hejian vmInfoXmlLen = %d", vmInfoXmlLen);
LOGI("hejian xml: %s \n", vmInfoXml);
const char *data = vmInfoXml;
for (int i = 0; i < vmInfoXmlLen / 300; i++) {
data += 300;
//LOGI("hejian xml: %s \n", data);
}


```

