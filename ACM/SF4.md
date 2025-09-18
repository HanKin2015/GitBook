# 20190708入职培训

## hankin练习1
```
// 坑点：组合里面也应要有顺序组合---单独的aeio应该是1
// 比如aeio组合，在算任意两个数绑在一起的时候不能把io放在一起
// 搞不懂为何错了，啊啊啊啊啊
#include <iostream>
#include <string>
#define LL long long
using namespace std;

const char specil[] = { 'a', 'e', 'i', 'o' };

LL factorial(int n)
{
	LL ret = 1;
	for (int i = 2; i <= n; i++) {
		ret *= i;
	}
	return ret;
}

int main()
{
	int T;
	cin >> T;
	while (T--) {
		string str;
		cin >> str;
		int len = str.size();
		if (1 == len) {
			cout << 1 << endl;
			continue;
		}
		int cnt = 0;
		for (int i = 0; i < len; i++) {
			for (int j = 0; j < 4; j++) {
				if (str[i] == specil[j]) {
					cnt++;
				}
			}
		}

		LL all_combine = factorial(len);
		if (2 == cnt) {
			all_combine -= factorial(len - 1) * factorial(2);
		}
		else if (3 == cnt) {
			all_combine -= factorial(len - 1) * 3 * factorial(2);
			all_combine += factorial(len - 2) * factorial(3);
		}
		else if (4 == cnt) {
			all_combine -= factorial(len - 2) * (len - 1) * 6 * factorial(2);
			all_combine += factorial(len - 3) * (len - 2) * 4 * factorial(3);
			all_combine -= factorial(len - 4) * (len - 3) * factorial(4);
			//all_combine -= factorial(len - 1) * 6 * factorial(2);   没有区别，真的有点搞笑，跑了一圈尖山湖想出来的
			//all_combine += factorial(len - 2) * 4 * factorial(3);
			//all_combine -= factorial(len - 3) * factorial(4);
		}
		cout << all_combine << endl;
	}
	return 0;
}
```

## 正解
```
#include <iostream>
#include <string>
#define LL long long
using namespace std;

const char specil[] = { 'a', 'e', 'i', 'o' };

LL factorial(int n)
{
	LL ret = 1;
	for (int i = 2; i <= n; i++) {
		ret *= i;
	}
	return ret;
}

LL C[105][105];
void combine()
{
	for (int i = 1; i < 105; i++) {
		C[i][0] = 1;
		C[i][1] = i;
		C[i][i] = 1;
		for (int j = 2; j < i; j++) {
			C[i][j] = C[i - 1][j - 1] + C[i - 1][j];
		}
	}
	return;
}

int main()
{
	int T;
	cin >> T;
	while (T--) {
		string str;
		cin >> str;
		int len = str.size();
		if (1 == len) {
			cout << 1 << endl;
			continue;
		}
		int cnt = 0;
		for (int i = 0; i < len; i++) {
			for (int j = 0; j < 4; j++) {
				if (str[i] == specil[j]) {
					cnt++;
				}
			}
		}
		combine();
		int common = len - cnt;
		LL all_combine = factorial(common) * C[common + 1][cnt] * factorial(cnt);
		cout << all_combine << endl;
	}
	return 0;
}
```


## 排除
```
// 坑点：组合里面也应要有顺序组合---单独的aeio应该是1
// 比如aeio组合，在算任意两个数绑在一起的时候不能把io放在一起
// 搞不懂为何错了，啊啊啊啊啊
#include <iostream>
#include <string>
#define LL long long
using namespace std;

const char specil[] = { 'a', 'e', 'i', 'o' };

LL A(int n)
{
	LL ret = 1;
	for (int i = 2; i <= n; i++) {
		ret *= i;
	}
	return ret;
}

LL C[105][105];
void combine()
{
	for (int i = 1; i < 105; i++) {
		C[i][0] = 1;
		C[i][1] = i;
		C[i][i] = 1;
		for (int j = 2; j < i; j++) {
			C[i][j] = C[i - 1][j - 1] + C[i - 1][j];
		}
	}
	return;
}

int main()
{
	int T;
	cin >> T;
	while (T--) {
		string str;
		cin >> str;
		int len = str.size();
		if (1 == len) {
			cout << 1 << endl;
			continue;
		}
		int cnt = 0;
		for (int i = 0; i < len; i++) {
			for (int j = 0; j < 4; j++) {
				if (str[i] == specil[j]) {
					cnt++;
				}
			}
		}

		combine();
		LL ans = A(len);
		for (int i = 2; i <= cnt; i++) {  //不能排除其他元素不能在一起，否则还需要后面的加减干嘛。。。
			if (i & 1) {
				ans += A(len - cnt) * C[len - cnt + 1][cnt - i + 1] * C[cnt][i] * A(i);
			}
			else {
				ans -= A(len - cnt) * C[len - cnt + 1][cnt - i + 1] * C[cnt][i] * A(i);
			}
		}
		cout << ans << endl;
	}
	return 0;
}
```


# hankin练习3
我有太多事情需要去做，以后有时间再看问题所在。

##
```
#if 10
#include <iostream>
#include <algorithm>
#define LL long long
using namespace std;

LL C[105][105];
void combine()
{
	for (int i = 1; i < 105; i++) {
		C[i][0] = 1;
		C[i][1] = i;
		C[i][i] = 1;
		for (int j = 2; j < i; j++) {
			C[i][j] = C[i - 1][j - 1] + C[i - 1][j];
		}
	}
	return;
}

LL A(int n)
{
	LL ret = 1;
	for (int i = 2; i <= n; i++) {
		ret *= i;
	}
	return ret;
}

LL compute(LL i, LL j, LL k)
{
	LL x = max(max(i, j), k);
	LL y = min(min(i, j), k);
	LL z = i + j + k - x - y;
	LL ans1 = 0, ans2 = 0;
	for (int l = z; l > 0; l--) {
		ans1 += C[x + 1][l];
	}
	for (int l = y; l > 0; l--) {
		ans2 += C[x + z + 1][l];
	}
	//cout << ans1 << ' ' << ans2 << endl;
	if (ans1 == 0) ans1 = 1;
	if (ans2 == 0) ans2 = 1;
	return ans1 * ans2;
}

// 猜不透：只算组合数量--算上相同高度有区别--长宽高肯定不相等吧--居然忘记从0开始
int main()
{
	combine();
	LL N, x, y, z, ans = 0;
	cin >> N >> x >> y >> z;
	for (LL i = 0; i <= 100; i++) {
		if (i * x > N) break;
		for (LL j = 0; j <= 100; j++) {
			if (i * x + y * j > N) break;
			for (LL k = 0; k <= 100; k++) {
				LL cur = i * x + y * j + z * k;
				if (cur > N) break;
				if (cur == N) {
					ans += compute(i, j, k);
					//ans++;
					break;
				}
			}
		}
	}
	cout << ans << endl;
	system("pause");
	return 0;
}
#endif
```
## 正确答案
```
#if 0
#include <iostream>
#include <algorithm>
#define LL long long
using namespace std;


int main()
{
	LL dp[105][105] = { 1 };
	LL N, x, y, z, ans = 0;
	cin >> N >> x >> y >> z;

	for (int i = 1; i < 105; i++) {
		for (int j = 0; j < 105; j++) {
			if (j - x >= 0) dp[i][j] += dp[i - 1][j - x];
			if (j - y >= 0) dp[i][j] += dp[i - 1][j - y];
			if (j - z >= 0) dp[i][j] += dp[i - 1][j - z];
		}
	}
	for (int i = 1; i < 105; i++) {
		ans += dp[i][N];
	}
	cout << ans << endl;
	system("pause");
	return 0;
}
#endif
```

# hankin练习4
```
#include <iostream>
#include <string.h>
#include <string>
#include <set>
#include <stack>
#define maxn 105
using namespace std;

string str;
set<string> ans;
stack<char> st;
char tmp[maxn];
int len;

void dfs(int index, int pos, bool isadd)
{
	cout << 22222 << endl;
	if (st.empty()) {
		if (len <= index) {
			ans.insert(tmp);
			cout << tmp << endl;
			return;
		}
	}
	cout << 111111111 << endl;
	if (len <= pos) return;
	if (index >= len) return;

	if (isadd) {
		st.push(str[pos]);
	}
	if (st.empty()) return;

	dfs(index, pos + 1, true);
	char c = st.top();
	tmp[index] = c;
	st.pop();
	dfs(index + 1, pos, false);
	dfs(index + 1, pos + 1, true);   // 不出栈加、（不出栈不加）、出栈加、出栈不加
	return;
}

int main()
{
	cin >> str;
	len = str.size();
	memset(tmp, 0, sizeof(tmp));
	dfs(0, 0, true);
	for (set<string>::iterator it = ans.begin(); it != ans.end(); it++) {
		cout << *it << endl;
	}
	system("pause");
	return 0;
}
```

## 根本跑不通，段错误，可以练习gdb
下面的不知道错在哪里。。。。。
```
#include <iostream>
#include <string.h>
#include <string>
#include <set>
#include <stack>
#define maxn 105
using namespace std;

string str;
set<string> ans;
int len;

void dfs(int i, string st, string tmp)
{
    if (i == len) {
        reverse(st.begin(), st.end());
        ans.insert(tmp.append(st));
        return ;
    }
    st.push_back(str[i]);
    dfs(i + 1, st, tmp);
    for (; !st.empty(); ) {
        tmp.push_back(st.back());
        st.pop_back();
        dfs(i + 1, st, tmp);
    }
	return;
}
 
int main()
{
	while(cin >> str) {
		len = str.size();
		dfs(0, "", "");
		for (set<string>::iterator it = ans.begin(); it != ans.end(); it++) {
			cout << *it << endl;
		}
		ans.clear();
	}
	//system("pause");
	return 0;
}
```


































