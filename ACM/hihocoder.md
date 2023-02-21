# hihocoder编程练习

在线编译器：
- http://www.dooccn.com/cpp/
- https://c.runoob.com/compile/12

开始时间：20200322

# hiho一下 第299周 顺序三元组
贪心，只有一种三元组{1, 2, 3}，统计2的位置前面1的个数和后面3的个数。
```
#include <bits/stdc++.h>
#define maxn 100005
using namespace std;

int main()
{
	int N, A[maxn], cnt1[maxn], cnt3[maxn], ans = 0;
	cin >> N;
	memset(cnt1, 0, sizeof(cnt1));
	memset(cnt3, 0, sizeof(cnt3));
	for (int i = 0; i < N; i++) {
		cin >> A[i];
		cnt1[i + 1] = cnt1[i];
		cnt3[i + 1] = cnt3[i];
		if (A[i] == 1) {
			cnt1[i + 1]++;
		} else if (A[i] == 3) {
			cnt3[i + 1]++;
		}
	}
	for (int i = 0; i < N; i++) {
		if (A[i] == 2) {
			ans += cnt1[i] * (cnt3[N] - cnt3[i]);
		}
	}
	cout << ans << endl;
	return 0;
}
```

### 1、hiho一下第294周《小Hi和小Ho的对弈游戏》题目分析

太难了，涉及sg函数，博弈论等。

### 2、期待下一周










