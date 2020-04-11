[TOC]

# 1、pair
使用map<int key, int value>键值对扩展数组内存不足问题。
pair则可以返回两个绑定的值对。
常用到make_pair函数。

详细参考：https://www.cnblogs.com/Sunrises/p/10363394.html

# 2、map的增删改查
## insert
```
// 定义一个map对象
map<int, string> mapStudent;
 
// 第一种 用insert函數插入pair
mapStudent.insert(pair<int, string>(000, "student_zero"));
 
// 第二种 用insert函数插入value_type数据
mapStudent.insert(map<int, string>::value_type(001, "student_one"));
 
// 第三种 用"array"方式插入
mapStudent[123] = "student_first";
mapStudent[456] = "student_second";
```
当map中有这个关键字时，insert操作是不能在插入数据的。
详细参考：https://blog.csdn.net/sevenjoin/article/details/81943864

## erase
```

//迭代器刪除
iter = mapStudent.find("123");
mapStudent.erase(iter);
 
//用关键字刪除
int n = mapStudent.erase("123"); //如果刪除了會返回1，否則返回0
 
//用迭代器范围刪除 : 把整个map清空
mapStudent.erase(mapStudent.begin(), mapStudent.end());
//等同于mapStudent.clear()
```

## change
建议使用array的方式。

## find





