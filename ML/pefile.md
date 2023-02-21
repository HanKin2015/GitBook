# pefile库学习

## 1、时间戳
```
import pefile

PEFILE_PATH = './AIFirst_data/train/black/00000becf0e0181441c8ae50e92c60c1'
pe = pefile.PE(PEFILE_PATH)
pe.FILE_HEADER.TimeDateStamp
```


```
pe.FILE_HEADER
pe.VS_FIXEDFILEINFO	返回一个列表
pe.OPTIONAL_HEADER
pe.VS_VERSIONINFO	返回一个列表
pe.FileInfo			返回一个二维列表（StringFileInfo和VarFileInfo）
len(pe.DIRECTORY_ENTRY_RESOURCE.entries)
for entry in pe.DIRECTORY_ENTRY_RESOURCE.entries:
    print(entry.struct.Name)

len(pe.DIRECTORY_ENTRY_EXPORT.symbols)

len(pe.DIRECTORY_ENTRY_IMPORT)

pe.DIRECTORY_ENTRY_EXPORT.symbols[1].ordinal

print(pe.OPTIONAL_HEADER.SectionAlignment)
print(pe.OPTIONAL_HEADER.FileAlignment)

pe.FILE_HEADER.NumberOfSections	等价于	len(pe.sections)

print(pe.RICH_HEADER.values)	没有明白是啥

print(pe.OPTIONAL_HEADER.DATA_DIRECTORY[1])
```

## 2、变量值作为变量
```
features = ['SectionAlignment', 'FileAlignment']
for feature in features:
    exec('{} = pe.OPTIONAL_HEADER.{}'.format(feature, feature))
    print(locals()[feature])
print(SectionAlignment)
print(FileAlignment)
```

## 最大值、最小值、平均值
import numpy as np

np.mean([1, 2, 3])
max([1, 2, 3])
min([1, 2, 3])

for section in pe.sections:
    print(section.Misc_VirtualSize)
    print(section.get_entropy())
    print(section.SizeOfRawData)

## 导入函数
```
dll = []
for entry in pe.DIRECTORY_ENTRY_IMPORT:
    print('-------------{}------------'.format(entry.dll))
    dll.append(entry.dll)
    #if entry.dll == b'WLDAP32.dll':
    for function in entry.imports:
        print(function.name, function.ordinal)
print(len(dll), len(pe.DIRECTORY_ENTRY_IMPORT))
```

## 获取反编译代码
pip install capstone
```
#!/usr/bin/python

import pefile
from capstone import *

# load the target PE file
pe = pefile.PE("IRCBot.exe")

# get the address of the program entry point from the program header
entrypoint = pe.OPTIONAL_HEADER.AddressOfEntryPoint

# compute memory address where the entry code will be loaded into memory
entrypoint_address = entrypoint+pe.OPTIONAL_HEADER.ImageBase

# get the binary code from the PE file object
binary_code = pe.get_memory_mapped_image()[entrypoint:entrypoint+100]

# initialize disassembler to disassemble 32 bit x86 binary code
disassembler = Cs(CS_ARCH_X86, CS_MODE_32)

# disassemble the code
for instruction in disassembler.disasm(binary_code, entrypoint_address):
    print("%s\t%s" %(instruction.mnemonic, instruction.op_str))
```







