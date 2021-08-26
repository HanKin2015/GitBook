# void类型

## 1、给void指针赋值
p1 = p2;
或
p1 = (void *) p2;
void指针可以指向任意类型的数据，亦即可用任意数据类型的指针对void指针赋值。例如：
```
int * pint;
void *pvoid;
pvoid = pint; /* 不过不能 pint= pvoid; */
```
如果要将pvoid赋给其他类型指针，则需要强制类型转换如：
```
pint= (int *)pvoid;
pint= static_cast<int *>(pvoid);
```

## 2、



