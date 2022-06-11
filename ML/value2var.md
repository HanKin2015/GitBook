# 将变量值作为变量名
```
类中可以使用：
file_header_members = ['Machine', 'NumberOfSections', 'SizeOfOptionalHeader', 'Characteristics', 'TimeDateStamp']
for file_header_member in file_header_members:
	exec('self.{} = pe.FILE_HEADER.{}'.format(file_header_member, file_header_member))
	print(locals()[file_header_member])
	
一般函数使用：
features = ['SectionAlignment', 'FileAlignment']
for feature in features:
    exec('{} = pe.OPTIONAL_HEADER.{}'.format(feature, feature))
    print(locals()[feature])
print(SectionAlignment)
print(FileAlignment)

另一种方法：
name = 'a'
globals()[name] = 1
print(a)
```






