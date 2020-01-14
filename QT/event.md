对事件进行重写。

```
//进入事件
void MyPopDialog::enterEvent(QEvent * event)
{
	QWidget::enterEvent(event);
	//可以进行抢占焦点setfocus(true);
}

//键盘按下事件，还有释放事件release
void MyPopDialog::keyPressEvent(QKeyEvent *event)
{
	if (event->key() == Qt::Key_Enter || event->key() == Qt::Key_Return) {
		MyButton->click();
	}
	QWidget::keyPressEvent(event);
}

void MyPopDialog::keyReleaseEvent(QKeyEvent *event)
{
	return;
}


//鼠标事件（实现鼠标左键拖动窗口）
void MyPopDialog::mousePressEvent(QMouseEvent *event)
{
	if(event->button() == Qt::LeftButton) {
		if (isMaximize) {
			isMove = false;
		} else {
			mousePressPoint = event->globalPos() - this->pos(); //当前鼠标位置
			isMove = true;
		}
	} else {
		isMove = false;
	}
}
```