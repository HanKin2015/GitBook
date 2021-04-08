# 高级编程

```
#ifndef interface
#define  interface struct
#endif
```

可以移植到java环境中，如安卓

c语言中没有interface关键字，因此没有接口类和抽象类abstract关键字。

但是有一种另外的叫法，纯虚函数


```
总结: 
    1. 将像的部分和相似的部分抽取到一个父类当中(共性内容向上抽取)
            ***抽象类,就是一个特殊父类***
    2. 抽象类和普通父类的区别在于, 抽象类可以定义抽象方法
    3. 当我们将共性的行为(方法) 抽取到父类之中后, 发现该行为在父类中描述不清了,
    但这个行为还是子类(强制重写)必须要做的行为,就可以定义为抽象方法

            举例:  
                    动物类 :
                        eat(); //将共性的eat方法抽取到父类中后,发现该行为描述不清了
                    猫类 :
                        eat() { 吃<●)))><< };
                    狗类 :
                        eat() {吃肉};
```
抽象类的子类必须要重写抽象类的抽象方法(或者把自己也变成抽象类)

在C++中，可以将虚函数声明为纯虚函数，语法格式为：
virtual 返回值类型 函数名 (函数参数) = 0;

纯虚函数没有函数体，只有函数声明，在虚函数声明的结尾加上=0，表明此函数为纯虚函数。
最后的=0并不表示函数返回值为0，它只起形式上的作用，告诉编译系统“这是纯虚函数”。
包含纯虚函数的类称为抽象类（Abstract Class）。之所以说它抽象，是因为它无法实例化，也就是无法创建对象。原因很明显，纯虚函数没有函数体，不是完整的函数，无法调用，也无法为其分配内存空间。

抽象类通常是作为基类，让派生类去实现纯虚函数。派生类必须实现纯虚函数才能被实例化。


```
#include <iostream>
using namespace std;

//线
class Line{
public:
    Line(float len);
    virtual float area() = 0;
    virtual float volume() = 0;
protected:
    float m_len;
};
Line::Line(float len): m_len(len){ }

//矩形
class Rec: public Line{
public:
    Rec(float len, float width);
    float area();
protected:
    float m_width;
};
Rec::Rec(float len, float width): Line(len), m_width(width){ }
float Rec::area(){ return m_len * m_width; }

//长方体
class Cuboid: public Rec{
public:
    Cuboid(float len, float width, float height);
    float area();
    float volume();
protected:
    float m_height;
};
Cuboid::Cuboid(float len, float width, float height): Rec(len, width), m_height(height){ }
float Cuboid::area(){ return 2 * ( m_len*m_width + m_len*m_height + m_width*m_height); }
float Cuboid::volume(){ return m_len * m_width * m_height; }

//正方体
class Cube: public Cuboid{
public:
    Cube(float len);
    float area();
    float volume();
};
Cube::Cube(float len): Cuboid(len, len, len){ }
float Cube::area(){ return 6 * m_len * m_len; }
float Cube::volume(){ return m_len * m_len * m_len; }

int main(){
    Line *p = new Cuboid(10, 20, 30);
    cout<<"The area of Cuboid is "<<p->area()<<endl;
    cout<<"The volume of Cuboid is "<<p->volume()<<endl;
  
    p = new Cube(15);
    cout<<"The area of Cube is "<<p->area()<<endl;
    cout<<"The volume of Cube is "<<p->volume()<<endl;

    return 0;
}
```
关于纯虚函数的几点说明
1) 一个纯虚函数就可以使类成为抽象基类，但是抽象基类中除了包含纯虚函数外，还可以包含其它的成员函数（虚函数或普通函数）和成员变量。

2) 只有类中的虚函数才能被声明为纯虚函数，普通成员函数和顶层函数均不能声明为纯虚函数。
https://www.runoob.com/cplusplus/cpp-interfaces.html






