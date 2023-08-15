# 学习高阶C++

## 1、指向结构体的指针必须初始化
```
#include<stdio.h>
void main()
{
	struct abc{
	int a;};
	struct abc *p;
	p->a=1;
	printf("%d",p->a);
}
```
这个编译没有问题，但是运行是段错误，请问为什么呢
因为你定义了一个结构体指针p，用来指向此类结构体，但是你却没有给他赋值，此时p的值为NULL，你并没有在内存中为p分配任何空间，所以p->a=1这句就会出段错误。

修改方法1:可以给p分配一段内存空间，并使其指向此空间：
p=(struct abc *)malloc(sizeof(struct abc));
p->a = 1;
方法2：可以让p指向一个已存在的内存空间：
struct abc temp;
p=&temp;
p->a = 1; 

## 2、
```
//此宏展开后，类似于printf("%d""%d", 1, 2);  
#define TRACE_CMH_2(fmt, ...) \  
    printf("%s(%d)-<%s>: "##fmt, __FILE__, __LINE__, __FUNCTION__, ##__VA_ARGS__) 
```

## 3、warning: function declaration isn’t a prototype（函数声明不是原型）的解决办法
原因是无参函数报的警告，只需要添加void即可。
```
static int hello_init(void)
{
    printk(KERN_EMERG   "hello world!\n");
    return 0;
}
```

## 4、system与exec的区别
1、system（）和exec（）都可以执行进程外的命令，system是在原进程上开辟了一个新的进程，但是exec是用新进程（命令）覆盖了原有的进程
2、system（）和exec（）都有能产生返回值，system的返回值并不影响原有进程，但是exec的返回值影响了原进程

char cmd[MAX_BUF_LEN];
memset(cmd, 0, MAX_BUF_LEN);
snprintf(cmd, MAX_BUF_LEN, "mkdir -p %s", today_dir_path);
pid_t status = system(cmd);

if (!(status != -1 && WIFEXITED(status) && WEXITSTATUS(status) == 0)) {
	printf("system error, exit status value");
}

```
#include <stdlib.h>
#include <sys/wait.h>
#include <sys/types.h>
 
int main()
{
    pid_t status;
 
 
    status = system("./test.sh");
 
    if (-1 == status)
    {
        printf("system error!");
    }
    else
    {
        printf("exit status value = [0x%x]\n", status);
 
        if (WIFEXITED(status))
        {
            if (0 == WEXITSTATUS(status))
            {
                printf("run shell script successfully.\n");
            }
            else
            {
                printf("run shell script fail, script exit code: %d\n", WEXITSTATUS(status));
            }
        }
        else
        {
            printf("exit status = [%d]\n", WEXITSTATUS(status));
        }
    }
 
    return 0;
}
```

## 5、细节决定成败
我的小伙伴还以为是编译器长时间不用凉了么
```
int j = 0;
for (j = 0; j < 10; j++);
{
	printf("j = %d\n", j);
}

输入结果是j = 10只有一行
如果是1的，肯定就是一行，这就会很迷惑。因此要养成良好的代码习惯。
我见过for循环末尾，函数末尾添加分号的，这种情况虽然没有影响，但是个人觉得还是不要有才好。
```






















