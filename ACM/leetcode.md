# leetcode编程练习

陈俊的代码

```
class Solution {
  public:
	int numWays(int steps, int arrLen)
	{
		if (arrLen > steps + 1)
			arrLen = steps + 1;
		vector<int> dp(arrLen, 0);
		dp[0] = 1;
		while (steps--) {
			vector<int> clone(dp);
			for (int j = 0; j < arrLen; ++j) {
				if (j + 1 < arrLen)
					clone[j] = (clone[j] + dp[j + 1]) % MOD;
				if (j)
					clone[j] = (clone[j] + dp[j - 1]) % MOD;
			}
			copy(clone.begin(), clone.end(), dp.begin());
		}
		return dp[0];
	}

  private:
	constexpr static int MOD = 1000000007;
};
```

