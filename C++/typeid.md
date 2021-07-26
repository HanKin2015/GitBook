# typeid
http://c.biancheng.net/view/2301.html

typeid 运算符用来获取一个表达式的类型信息。类型信息对于编程语言非常重要，它描述了数据的各种属性：
对于基本类型（int、float 等C++内置类型）的数据，类型信息所包含的内容比较简单，主要是指数据的类型。
对于类类型的数据（也就是对象），类型信息是指对象所属的类、所包含的成员、所在的继承关系等。

类型信息是创建数据的模板，数据占用多大内存、能进行什么样的操作、该如何操作等，这些都由它的类型信息决定。

```
#include <iostream>
#include <typeinfo>
using namespace std;

class Base{ };

struct STU{ };

int main(){
    //获取一个普通变量的类型信息
    int n = 100;
    const type_info &nInfo = typeid(n);
    cout<<nInfo.name()<<" | "<<nInfo.raw_name()<<" | "<<nInfo.hash_code()<<endl;

    //获取一个字面量的类型信息
    const type_info &dInfo = typeid(25.65);
    cout<<dInfo.name()<<" | "<<dInfo.raw_name()<<" | "<<dInfo.hash_code()<<endl;

    //获取一个对象的类型信息
    Base obj;
    const type_info &objInfo = typeid(obj);
    cout<<objInfo.name()<<" | "<<objInfo.raw_name()<<" | "<<objInfo.hash_code()<<endl;

    //获取一个类的类型信息
    const type_info &baseInfo = typeid(Base);
    cout<<baseInfo.name()<<" | "<<baseInfo.raw_name()<<" | "<<baseInfo.hash_code()<<endl;

    //获取一个结构体的类型信息
    const type_info &stuInfo = typeid(struct STU);
    cout<<stuInfo.name()<<" | "<<stuInfo.raw_name()<<" | "<<stuInfo.hash_code()<<endl;

    //获取一个普通类型的类型信息
    const type_info &charInfo = typeid(char);
    cout<<charInfo.name()<<" | "<<charInfo.raw_name()<<" | "<<charInfo.hash_code()<<endl;

    //获取一个表达式的类型信息
    const type_info &expInfo = typeid(20 * 45 / 4.5);
    cout<<expInfo.name()<<" | "<<expInfo.raw_name()<<" | "<<expInfo.hash_code()<<endl;

    return 0;
}
```


```
int | .H | 529034928
double | .N | 667332678
class Base | .?AVBase@@ | 1035034353
class Base | .?AVBase@@ | 1035034353
struct STU | .?AUSTU@@ | 734635517
char | .D | 4140304029
double | .N | 667332678
```


