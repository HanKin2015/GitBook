# ddr和flash

## 1、DDR4和LP DDR4区别
DDR4：标准电压 1.2V，功耗相对较高，适合有稳定电源供应的设备。Double Data Rate 4
LPDDR4：工作电压 1.1V（LPDDR4X 甚至可低至 0.6V），支持更激进的电源管理策略（如深度睡眠、部分阵列自刷新）。Low Power Double Data Rate 4

## 2、flash工作模式
```
gxlx3_az201_v1#mmc dev 1
emmc/sd response timeout, cmd8, status=0x1ff2800
emmc/sd response timeout, cmd55, status=0x1ff2800
init_part () 294: PART_TYPE_AML
[mmc_init] mmc init success
SDIO Port C: tuning start:
Data 1 aligned delay is 0
SDIO Port C: clk 200000000 tuning start:
SDIO Port C: clk 200000000 tuning start:
SDIO Port C: clk 200000000 tuning start:
SDIO Port C: clk 200000000 tuning start:
SDIO Port C: clk 200000000 tuning start:
SDIO Port C: clk 200000000 tuning start:
SDIO Port C: clk 200000000 tuning start:
SDIO Port C: best_win_start =3, best_win_size =4
meson-mmc: emmc: [ 0 -- 1 ] is ok
meson-mmc: emmc: [ 2 ] is nok
meson-mmc: emmc: [ 3 -- 4 ] is ok
adjust 0x2000, clock 200000000
switch to partitions #0, OK
mmc1 (part 0) is current device
gxlx3_az201_v1#mmc info
Device: SDIO Port C
Manufacturer ID: 2f
OEM: 111
Name: 05S00
Tran Speed: 200000000
Rd Block Len: 512
MMC version 5.1
High Capacity: Yes
Capacity: 7.3 GiB
mmc clock: 200000000
Bus Width: 8-bit
gxlx3_az201_v1#
console:/d # mount -t debugfs none /sys/kernel/debug
console:/d # cat /sys/kernel/debug/emmc/ios
clock:          200000000 Hz
actual clock:   200000000 Hz
vdd:            21 (3.3 ~ 3.4 V)
bus mode:       2 (push-pull)
chip select:    0 (don't care)
power mode:     2 (on)
bus width:      3 (8 bits)
timing spec:    9 (mmc HS200)
signal voltage: 1 (1.80 V)
driver type:    0 (driver type B)
```
ios 全称：**IO Settings**