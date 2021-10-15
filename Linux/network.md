# 网络设置

## 1、ifconfig无法查看到eth0网卡
ifup eth0
ifconfig eth0 up
ifconfig -a

可能是缺少网卡驱动

### 1-1、查看网卡型号
lspci | grep -i "eth"

### 1-2、查看网卡驱动信息
ethtool -i eth0

### 1-3、升级网卡驱动
将网卡驱动升级至2.4.10版本

tar zxf i40e-2.4.10.tar.gz
cd  i40e-2.4.10/src
make install
rmmod i40e ;modprobe i40e (该操作必须同时执行，否则会有网络中断风险)

## 2、官网下载驱动
https://www.intel.cn/content/www/cn/zh/download/14611/15817/intel-network-adapter-driver-for-pcie-intel-gigabit-ethernet-network-connections-under-linux.html?_ga=1.159975677.114505945.1484457019










