# 格式化输出

## 1、%p和%x、%lx、%hx、%llx（对应int、long、short、long long）区别

- %p 可以匹配对应类型的指针地址，输出以16进制表示，会自带前缀0x
- %x 可以对应int类型的指针，输出以16进制输出，不会自带前缀0x
- 类似的，%lx，表示long类型指针，用16进制输出


```
long a[100] = {0};
printf("%p\n", a);
printf("%lx\n", a);

0x7fff48bf8c10
7fff48bf8c10
```
