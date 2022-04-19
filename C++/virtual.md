# 虚函数

## 1、error: invalid new-expression of abstract class type ‘UserdataActionI’
原因：
出现这个错误原因是new 了一个抽象类出错，说明父类（接口）中有纯虚函数没有实现。接口里的纯虚函数全部需要实现，这样才能new 子类。

例如：
纯虚函数例如  void fun() = 0; 是纯虚函数，不是纯虚函数不作要求。

另外，void fun()  {  }  空函数体也是实现。

纯虚函数相当于C#中abstract抽象类。

=0 说明函数是抽象的方法，谁继承它就必须实现它
否则不能new。











