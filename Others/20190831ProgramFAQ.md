# 1、string和char*
```
//string == char*   so   string* == char**
#include <stdio.h>
#include <iostream>
using namespace std;

int fun(string *s1, char **s2)
{
    *s1 = "a";
    *s2 = (char *)"a";
    return 0;
}

int main()
{
    string s1 = "";
    char *s2 = (char *)"";
    fun(&s1, &s2);
    cout << s1 << endl;
    cout << s2 << endl;
    return 0;
}
```
# 2、