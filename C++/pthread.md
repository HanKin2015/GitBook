# 线程局部存储

# 1、pthread_getspecific

唯一找到有两种定义方法：
https://www.ibm.com/docs/en/zos/2.3.0?topic=functions-pthread-getspecific-get-thread-specific-value-key#ptgetsp

## 2、pthread_key_create
pthread_key_create第一个参数为指向一个键值的指针，第二个参数指明了一个destructor函数，如果这个参数不为空，那么当每个线程结束时，系统将调用这个函数来释放绑定在这个键上的内存块。

## 3、示例
pthread_getpecific和pthread_setspecific实现同一个线程中不同函数间共享数据的一种很好的方式。
```
/*
 * =====================================================================================
 *       Filename:  thead.c
 *    Description:  getspecific
 *        Created:  05/10/2011 12:09:43 AM
 * =====================================================================================
 */
#include<stdio.h>
#include<pthread.h>
#include<string.h>
pthread_key_t p_key;
 
void func1()
{
        int *tmp = (int*)pthread_getspecific(p_key);//同一线程内的各个函数间共享数据。
        printf("%d is runing in %s\n",*tmp,__func__);
 
}
void *thread_func(void *args)
{
 
        pthread_setspecific(p_key,args);
 
        int *tmp = (int*)pthread_getspecific(p_key);//获得线程的私有空间
        printf("%d is runing in %s\n",*tmp,__func__);
 
        *tmp = (*tmp)*100;//修改私有变量的值
 
        func1();
 
        return (void*)0;
}
int main()
{
        pthread_t pa, pb;
        int a=1;
        int b=2;
        pthread_key_create(&p_key,NULL);
        pthread_create(&pa, NULL,thread_func,&a);
        pthread_create(&pb, NULL,thread_func,&b);
        pthread_join(pa, NULL);
        pthread_join(pb, NULL);
        return 0;
}
```