# trie树 
Trie一般指字典树，又称单词查找树，Trie树，是一种树形结构，是一种哈希树的变种。典型应用是用于统计，排序和保存大量的字符串（但不仅限于字符串），所以经常被搜索引擎系统用于文本词频统计。它的优点是：利用字符串的公共前缀来减少查询时间，最大限度地减少无谓的字符串比较，查询效率比哈希树高。

对于字典树，有三个重要性质：
1：根节点不包含字符，除了根节点，每个节点都只包含一个字符。root 节点不包含字符，这样做的目的是为了能够包括所有字符串。
2：从根节点到某一个节点，路过字符串起来就是该节点对应的字符串。
3：每个节点的子节点字符不同，也就是找到对应单词、字符是唯一的。

```
#include <bits/stdc++.h>
using namespace std;

class Trie {
	struct node {
		int cnt;
		node* next[26];
		node()
		{
			cnt = 0;
			for(int i = 0; i < 26; i++) next[i] = NULL;
		}
	} trie;

	void Create_Trie(string str)
	{
		node* p = &trie;
		for(int i = 0; i < str.size(); i++) {
			int c = str[i] - 'a';
			if(p->next[c] == NULL)
				p->next[c] = new node;
			p = p->next[c];
			p->cnt++;
		}
	}

	int Search_Trie(string str)
	{
		node* p = &trie;
		for(int i = 0; i < str.size(); i++) {
			int c = str[i] - 'a';
			if(p->next[c] == NULL) return 0;
			p = p->next[c];
		}
		return p->cnt;
	}
}

int main()
{
    int n, q;
    cin >> n;
    string str;
    for(int i = 0; i < n; i++) {
        cin >> str;
        Create_Trie(str);
    }
    cin >> q;
    for(int i = 0; i < q; i++) {
        cin >> str;
        cout << Search_Trie(str) << endl;
    }
    return 0;
}
```

