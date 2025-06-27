# 后台数据采集


## 1、字符串拼接
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char *firstName = "Theo";
    char *lastName = "Tsao";
    char *name = (char *) malloc(strlen(firstName) + strlen(lastName));
    strcpy(name, firstName);
    strcat(name, lastName);
    printf("%s\n", name);
    return 0;
}

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char *firstName = "Theo";
    char *lastName = "Tsao";
    char *name = (char *) malloc(strlen(firstName) + strlen(lastName));
    sprintf(name, "%s%s", firstName, lastName);
    printf("%s\n", name);
    return 0;
}
```

## 2、利用fprintf进行文件操作–向文件中追加写入
```
void file_write(char* data)
{
    char* usb_device_operation_header = "./usb_device_operation_";
    char* vmid = "12345";

    char* usb_device_operation_path = (char *) malloc(strlen(usb_device_operation_header) + strlen(vmid) + strlen(".log"));

    sprintf(usb_device_operation_path, "%s%s.log", usb_device_operation_header, vmid);

    FILE* fd;
    fd = fopen(usb_device_operation_path, "a");
    if (fd == NULL) {
        printf("open usb_device_operation file failed!");
        return;
    }

    fprintf(fd, "%s\n", data);

    fclose(fd);
    return;
}
```

## 3、获取当前系统时间
```
#include <time.h> 
#include <stdio.h> 
int main( void ) 
{ 
    time_t t = time(0); 
    char tmp[64]; 
    strftime( tmp, sizeof(tmp), "%Y/%m/%d %X %A 本年第%j天 %z",localtime(&t) ); 
    puts( tmp ); 
    return 0; 
}
```






