# 设备树

## 1、临时修改设备树
```
lx4_b03# echo $dtb_mem_addr
0x1000000
lx4_b03# fdt addr $dtb_mem_addr
lx3_a01_v1#fdt print /emmc@d0074000
lx4_b03# fdt print /soc/mmc@fe08c000
mmc@fe08c000 {
compatible = "aic,son-axg-mmc";
```

U-Boot 自己运行时用的设备树:
```
fdt addr -c
```

uboot和内核的设备树内容不一样：
```
lx4_b03# fdt print /soc/mmc
mmc@fe08c000 {
reg = <0x00000000 0xfe08c000 0x00000000 0x00001000 0x00000000 0xfe000168 0x00000000
mmc-ddr-1_8v;
mmc-hs200-1_8v;
mmc-hs400-1_8v;
max-frequency = ""
lx4_b03# fdt addr
The address of the fdt is 0x1000000
lx4_b03# fdt addr -c
The address of the fdt is 0x7f880240
lx4_b03# fdt addr 0x7f880240
lx4_b03# fdt print /soc/apb@fe000000/emmc
emmc {
reg = <0x00000000 0x0008c000 0x00000000 0x00000800>;
cap-mmc-highspeed;
mmc-hs200-1_8v;
max-frequency = ""
```

更改缓存区大小:
```
lx4_b03# fdt set /soc/mmc caps2 "MMC_CAP2_HS200" "MMC_CAP2_HS400";
libfdt fdt_setprop (): FDT_ERR_NOSPACE
lx4_b03# fdt resize
lx4_b03# fdt set /soc/mmc caps2 "MMC_CAP2_HS200" "MMC_CAP2_HS400";
lx4_b03# fdt princ /soc/mmc
mmc@fe08c000 {
caps2 = "MMC_CAP2_HS200", "MMC_CAP2_HS400";
compatible = "amlogic,meson-axg-mmc";
lx4_b03# fdt header
magic:                  0xd00dfeed
totalsize:              0x13570 (79216)
off_dt_struct:          0x38
off_dt_strings:         0x114d8
off_mem_rsvmap:         0x28
version:                17
last_comp_version:      16
boot_cpuid_phys:        0x0
size_dt_strings:        0x2098
size_dt_struct:         0x114a0
number mem_rsv:         0x0
lx4_b03# fdt resize
lx4_b03# fdt header
magic:                  0xd00dfeed
totalsize:              0x14000 (81920)
off_dt_struct:          0x48
off_dt_strings:         0x114e8
off_mem_rsvmap:         0x28
version:                17
last_comp_version:      16
boot_cpuid_phys:        0x0
size_dt_strings:        0x2098
size_dt_struct:         0x114a0
number mem_rsv:         0x1
```

重启后失效:
```
store dtb read 1080000; fdt addr 1080000;
store dtb write 1080000;
```

删除：
```
fdt rm /soc/mmc@fe08c000 mmc-hs400-1_8v
```