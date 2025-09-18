# RTTI

## 1、概念
RTTI(Run Time Type Identification)即通过运行时类型识别，程序能够使用基类的指针或引用来检查这些指针或引用所指的对象的实际派生类型。
注意：基类
```
class Base {
public:
    virtual ~Base() {}
};

class Derived : public Base {};

void identify(Base* b) {
    if (typeid(*b) == typeid(Derived)) {
        std::cout << "Object is of type Derived" << std::endl;
    } else {
        std::cout << "Object is of unknown type" << std::endl;
    }
}
```

## 2、RTTI机制的产生
为什么会出现RTTI这一机制，这和C++语言本身有关系。和很多其他语言一样，C++是一种静态类型语言。其数据类型是在编译期就确定的，不能在运行时更改。然而由于面向对象程序设计中多态性的要求，C++中的指针或引用(Reference)本身的类型，可能与它实际代表(指向或引用)的类型并不一致。有时我们需要将一个多态指针转换为其实际指向对象的类型，就需要知道运行时的类型信息，这就产生了运行时类型识别的要求。和Java相比，C++要想获得运行时类型信息，只能通过RTTI机制，并且C++最终生成的代码是直接与机器相关的。

## 3、typeid和dynamic_cast操作符
RTTI提供了两个非常有用的操作符：typeid和dynamic_cast。

typeid操作符，返回指针和引用所指的实际类型；
dynamic_cast操作符，将基类类型的指针或引用安全地转换为其派生类类型的指针或引用。

我们知道C++的多态性（运行时）是由虚函数实现的，对于多态性的对象，无法在程序编译阶段确定对象的类型。当类中含有虚函数时，其基类的指针就可以指向任何派生类的对象，这时就有可能不知道基类指针到底指向的是哪个对象的情况，类型的确定要在运行时利用运行时类型标识做出。为了获得一个对象的类型可以使用typeid函数，该函数反回一个对type_info类对象的引用，要使用typeid必须使用头文件\<typeinfo\>。

## 4、注意点
dynamic_cast转换符只能用于指针或者引用。dynamic_cast转换符只能用于含有虚函数的类。dynamic_cast转换操作符在执行类型转换时首先将检查能否成功转换，如果能成功转换则转换之，如果转换失败，如果是指针则返回一个0值，即NULL，如果是转换的是引用，则抛出一个bad_cast异常。

如果指针是野指针，转换时也会抛出异常。

## 5、明确向上转换安全，一定成功
dynamic_cast是四个强制类型转换操作符中最特殊的一个，它支持运行时识别指针或引用。

首先，dynamic_cast依赖于RTTI信息，其次，在转换时，dynamic_cast会检查转换的source对象是否真的可以转换成target类型，这种检查不是语法上的，而是真实情况的检查。

dynamic_cast主要用于“安全地向下转型”
dynamic_cast用于类继承层次间的指针或引用转换。主要还是用于执行“安全的向下转型（safe downcasting）”，

也即是基类对象的指针或引用转换为同一继承层次的其他指针或引用。

至于“先上转型”（即派生类指针或引用类型转换为其基类类型），本身就是安全的，尽管可以使用dynamic_cast进行转换，但这是没必要的， 普通的转换已经可以达到目的，毕竟使用dynamic_cast是需要开销的。
```
class Base
{
public:
    Base(){};
    virtual void Show(){cout<<"This is Base calss";}
};
class Derived:public Base
{
public:
    Derived(){};
    void Show(){cout<<"This is Derived class";}
};
int main()
{
    Base *base ;
    Derived *der = new Derived;
    //base = dynamic_cast<Base*>(der); //正确，但不必要。
    base = der; //先上转换总是安全的
    base->Show();
    system("pause");
}
```

对于“向下转型”有两种情况。
一种是基类指针所指对象是派生类类型的，这种转换是安全的；
另一种是基类指针所指对象为基类类型，在这种情况下dynamic_cast在运行时做检查，转换失败，返回结果为0；

## 6、引用转换
dynamic_cast将基类指针转换为派生类指针，也可以使用dynamic_cast将基类引用转换为派生类引用。
同样的，引用的向上转换总是安全的。

```
static void quote_transfer()
{
    // 1.引用的向上转换总是安全的
    derived c;
    derived &der2 = c;
    base &base2 = dynamic_cast<base &>(der2);   // 向上转换，安全
    base2.print();  // 特别有意思，转换后居然输出是we are in derived
    
    // 2.安全的向下转型
    // 第一种情况，转换成功
    derived b;
    base &base1 = b;
    derived &der1 = dynamic_cast<derived &>(base1);
    cout<<"第一种情况：";
    der1.print();

    // 第二种情况
    base a ;
    base &base = a;
    cout << "第二种情况：";
    try {
        derived & der = dynamic_cast<derived &>(base);
    } catch (bad_cast) {
        cout << "转化失败,抛出bad_cast异常" << endl;
    }
    return;
}
```


















