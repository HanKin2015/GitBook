# 类

## 1、虚函数
```
virtual nlohmann::json ToJson() const override;
virtual void FromJson(const nlohmann::json& json) override;
```
这两个虚函数中的const override和override区别：
- 在函数声明中，const 关键字用于指示该成员函数不会修改类的成员变量。也就是说，const 成员函数可以被 const 对象调用，确保在该函数内部不会改变对象的状态。
- override 关键字用于指示该函数是对基类中虚函数的重写。它可以帮助编译器检查你是否正确地重写了基类的虚函数。如果基类中没有相应的虚函数，编译器会报错。这有助于避免因函数签名不匹配而导致的错误。




