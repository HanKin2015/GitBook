
# 各类基础数据结构
设计通用的数据结构，及其对外接口：

1. 完成接口的函数原型设计和实现；

2. 完成单元测试，行覆盖率超过90%；

3. 代码符合公司编码规范要求，代码的评级即作业的成绩；

## 1. 列表
1) 抽象一个概念“迭代器”，通过“迭代器”，可以索引到想要访问的列表成员。

2) 可以根据成员的索引值(在列表中的序号)创建“迭代器”。通过索引找到成员的时间复杂度小于O(N)。注：意味着不是简单的链表

3) 可以通过“迭代器”，得到前驱成员和后继成员的“迭代器”

4) 可以访问、修改“迭代器”指向的成员

5) 可以在迭代器前后插入新成员，时间复杂度小于O(N)。注：意味着不是简单的数组。

6) 该列表可以存放任意类型的数据

7) 支持查找符合条件的成员

8) 支持通过回调遍历列表所有成员，允许在回调中修改成员,不允许在回调中插入删除

## 完成情况分析
- 根据成员的索引值(在列表中的序号)创建“迭代器”。
- 支持查找符合条件的成员
- 支持通过回调遍历列表所有成员

上面三点是难点。


## 2. 键值表
可以采用HASH或红黑树或平衡二叉树实现。

1) 既支持顺序访问，也支持按键名快速查找(常数级或对数级的时间复杂度)

2) 支持存放任意类型的数据

3) 允许指定hash函数(针对HASH表)和比较函数

4) 支持按位置插入，即顺序输出该键值表元素时，该元素应处于插入位置上，比如位置0插入的元素会第一个输出

5) 支持通过回调遍历键值表的所有成员，允许在回调中修改值(不允许修改键),不允许在回调中插入删除
```
#ifndef LIST_H_

#define LIST_H_



//TODO: 以下代码为示范，请根据题目要求修订这些接口



typedef struct iterator iterator;



struct iterator {

...

};



typedef struct list_t list_t;



list_t *list_new(...);

void list_free(list_t *lst);

iterator list_get(const list_t *lst, U32 idx);

iterator list_find(const list_t *lst, int (*fn)(void *data, void *ud), void *ud);

iterator list_foreach(list_t *lst, int (*fn)(void *data, void *ud), void *ud);

iterator list_iter_insert_before(iterator it, void *data);

iterator list_iter_insert_after(iterator it, void *data);

iterator list_iter_next(iterator it);

iterator list_iter_forward(iterator it);

void *list_iter_data(iterator it);

void list_iter_set(iterator it, void *data);

void list_iter_clear(iterator it);



#endif //LIST_H_
```
