# 函数式编程

```
/*
 * 计算函数运行时间
 * 半函数式编程
 * 无法传递函数参数，使用vector稍作缓解，缺点也很明显
 * 无法规定不同的函数返回值
 */
void CalFuncTime(vector<string> vec, int (*Callback)(vector<string>))
{
    clock_t start = clock();    
    Callback(vec);
    printf("This function exec time is %lf s.\n", (double)(clock() - start) / CLOCKS_PER_SEC);
    return ;
}
```