# QT之国际语言翻译

```
//中文
void MainWindow::ChineseActionClicked()
{
    qDebug() << "Chinese";

    if  (translator  !=  nullptr){
        qApp->removeTranslator(translator);//如果之前加载过翻译文件，则移除之前的翻译文件。
        delete  translator;
        translator  =  nullptr;
    }

    translator  =  new  QTranslator;

    if(translator->load(application_dir_path + "\\zh_CN.qm")) {
        qApp->installTranslator(translator);
        ui->retranslateUi(this);

        qDebug() << "load zh_CN.qm sucssed!";
    } else {
        qDebug() << "load zh_CN.qm failed!";
    }
}
//切换位原本英文语言
void MainWindow::EnglishActionClicked()
{
    qDebug() << "English";

    if  (translator  !=  nullptr){
        qApp->removeTranslator(translator);//如果之前加载过翻译文件，则移除之前的翻译文件。
        delete  translator;
        translator  =  nullptr;
        qDebug() << "???";
    }
    qApp->installTranslator(nullptr);

    ui->retranslateUi(this);
}
```





