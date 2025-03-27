# 按钮类

## 1、一组QRadioButton能全部勾选上吗
在 Qt 中，QRadioButton 是一种单选按钮，通常用于一组互斥的选项。也就是说，在同一组 QRadioButton 中，用户只能选择一个选项。因此，标准的行为是不能让一组 QRadioButton 同时被勾选上。

QCheckBox 允许用户同时选择多个选项。

在 Qt 中，QCheckBox 是一个可以单独选择的复选框，而 QButtonGroup 通常用于管理 QRadioButton 或 QCheckBox 的互斥选择。由于 QButtonGroup 的设计是为了处理互斥选择，因此它会影响 QCheckBox 的行为。

## 2、

