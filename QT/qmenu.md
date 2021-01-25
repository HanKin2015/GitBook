# QT之Qmenu菜单

# 解决QAction QMenu点击后不消失的问题

```
#include "mymenu.h"
#include <QApplication>
#include <QDebug>
MyMenu::MyMenu(QWidget *parent) :
    QMenu(parent)
{
    //add action
    QAction *action1 = new QAction("1",this);
    QAction *action2 = new QAction("2",this);
    QAction *action3 = new QAction("3",this);
    QAction *action4 = new QAction("4",this);

    action1->setCheckable(true);
    action2->setCheckable(true);
    action3->setCheckable(true);
    action4->setCheckable(true);

    action1->setProperty("canHideMenu","true");
    action2->setProperty("canHideMenu","true");
    action3->setProperty("canHideMenu","false");
    action4->setProperty("canHideMenu","false");


    this->addAction(action1);
    this->addAction(action2);
    this->addAction(action3);
    this->addAction(action4);

}

void MyMenu::mouseReleaseEvent(QMouseEvent *e)
{

    QAction *action = this->actionAt(e->pos());
    if(action)
    {

        QString strCanHide = action->property("canHideMenu").toString();
        qDebug() << "MyMenu::mouseReleased: " << strCanHide;
        if(strCanHide == "true")
        {
            QMenu::mouseReleaseEvent(e);
            return;
        }
        else
        {
            action->activate(QAction::Trigger);
            return;
        }
    }
    QMenu::mouseReleaseEvent(e);

}
```



# ubuntu16的QAction

QSystemTrayIcon不生效，单击、双击、右键不生效。

系统特性。

无法进行交叉点击，无法扑捉到鼠标或者键盘事件。

[QWidgetAction实现鼠标滑过菜单项图标高亮显示](https://blog.csdn.net/zhushentian/article/details/82014760)

很厉害自己实现QMenu。



override/overwrite覆盖(重写/覆写)：子类继承了父类的同名有参函数。当子类继承了父类的一个同名方法，且方法参数不同，称为重载。通过方法的重载，子类可以重新实现父类的某些方法，使其具有自己的特征。

    overload重载：当前类的同名方法。通过方法的重写，一个类可以有多个具有相同名字的方法，由传递给它们不同的个数和类型的参数来决定使用哪种方法。因此，重写的名称是当前类中的同名函数，不是父类中的函数名。
