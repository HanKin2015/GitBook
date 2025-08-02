# c++面试八股文之算法题

## 1、给定一个字符串 s ，请你找出其中不含有重复字符的最长子串的长度

## 2、01背包
https://zhuanlan.zhihu.com/p/377231783
```
vector<int> dp(bagWeight + 1, 0);
for(int i = 0; i < weight.size(); i++) { // 遍历物品
    for(int j = bagWeight; j >= weight[i]; j--) { // 遍历背包容量
        dp[j] = max(dp[j], dp[j - weight[i]] + value[i]);
    }
}
```

## 完全背包
https://blog.csdn.net/txyyt_wst/article/details/130206572
https://zhuanlan.zhihu.com/p/377231783
```
vector<int> dp(bagWeight + 1, 0);
// 先遍历物品，再遍历背包
for(int i = 0; i < weight.size(); i++) { // 遍历物品
    for(int j = weight[i]; j < bagWeight ; j++) { // 遍历背包容量
        dp[j] = max(dp[j], dp[j - weight[i]] + value[i]);

    }
}
```

## 最长回文串
https://zhuanlan.zhihu.com/p/137172524

## leetcode1222.可以攻击国王的皇后
虽然通过了，但是思路较为奇特，以皇后为枚举对象，判断皇后是否能攻击到国王，首先是能到达，其次是判断途中是否存在其他皇后。

正确思路是以国王为枚举对象，向上下左右8个方向进行攻击，如果遇到皇后就是答案。






