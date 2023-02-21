# shell 参数换行 & shell 输出换行的方法

## 1. shell 参数换行
Linux参数太长，一般可取续行符 "\"进行参数换行/续行。反斜杠\ 后面紧跟回车，表示下一行是当前行的续行.

如下的代码所示
```
python target_attack.py \
  --input_dir="${INPUT_DIR}" \
  --output_dir="${OUTPUT_DIR}" \
  --max_epsilon="${MAX_EPSILON}" \
  --checkpoint_path_adv_inception_v3=adv_inception_v3.ckpt \
  --checkpoint_path_ens3_adv_inception_v3=ens3_adv_inception_v3.ckpt \
  --checkpoint_path_ens4_adv_inception_v3=ens4_adv_inception_v3.ckpt \
  --checkpoint_path_ens_adv_inception_resnet_v2=ens_adv_inception_resnet_v2.ckpt \
  --checkpoint_path_adv_inception_resnet_v2=adv_inception_resnet_v2.ckpt \
  --iterations=11 \
  --prob=0.5
```
最近遇到一个坑，在\后面加上了空格，导致后面的参数不能进行结息。但是代码又比较考算力，跑了一个晚上的代码，后来发现参数没有赋值成功，发现赋值失败，有--prob=0.5: command not found 的提示字段。

后来一点点排查，才知道是\后面多了一个空格，但是在编辑器中看不出来任何差别。。。

【注意】
\后面紧接着是enter换行符，即使用\回车的方式，不能有空格之类的任何符号，否则会造成解析错误，导致后面的参数赋值不成功。

## 2. echo打印换行的方法
默认情况下，echo关闭了对转义字符的解释，添加 -e 参数可打开echo对转义字符的解释功能。-E关闭转义字符，是默认值。
```
echo -e "hello\n wrold" #换行输出 hello world
echo -E "hello\n wrold" #输出 hello\n world， 默认情况
```
【注意】

当前终端使用一次 echo -e后，echo对转义字符的解释功能打开，后续都转义字符都有效。

更推荐使用printf 命令进行输出，printf还支持格式化输出，和C语言中printf功能类似，示例代码如下：
```
a=1231
printf "%d - %d = $a\n" 12 123 #输出12 - 123 = 1231
printf "%d - %d = $a\n\n" 12 123 #输出 12 - 123 = 1231 空白行
```
printf不会像echo那样在一行结束自动添加换行符，连续多行使用printf时需要注意下。

printf命令语法printf format-string [arguments...]， 参数之间用空格隔开，不能是逗号（和C语言中的区别）。

eg： printf("%d equal %d\n", $num1, $num2) 应该为 printf "%d equal %d\n" $num1 $num2