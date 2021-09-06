# ubuntu安装qemu环境

## 1、安装
apt install qemu-kvm qemu libvirt-daemon-system libvirt-clients bridge-utils

## 2、添加当前用户添加到libvrit和kvm用户组，添加完后注销重新登录
adduser `id -un` libvirt-qemu
adduser `id -un` kvm

## 3、验证
virsh list --all       # 查看所有的虚拟机包含已关机的虚拟机

## 4、添加网桥并桥接到物理网口(注意修改IP地址)，用于虚拟机桥接到该网桥上
### 4-1、设置网桥配置
vim /etc/netplan/00-installer-config.yaml
```
network:
  ethernets:
    eno1:
      dhcp4: false
  version: 2
  bridges:
    br0:
      addresses:
      - 1.2.3.4/5
      gateway4: 1.2.255.254
      nameservers:
        addresses:
        - 114.114.114.114
        - 8.8.8.8
      dhcp4: false
      parameters:
        stp: true
      interfaces:
      - eno1
```

### 4-2、使网络配置生效
netplan apply

## 5、创建存储池
```
mkdir -p /data/images
chown root:root /data/images
chmod 755 /data/images
virsh pool-define-as images --type dir --target /data/images
virsh pool-build images
virsh pool-start images
virsh pool-autostart images

virsh 
```

## 6、创建存储卷
### 6-2、创建存储卷的配置文件
vim /data/vm/win10_tpl/win10_tpl_vol1.xml
```
<volume>
  <name>win10_tpl_vol1.qcow2</name>
  <allocation>0</allocation>
  <capacity unit="G">80</capacity>
  <target>
    <format type="qcow2"/>
    <permissions>
      <owner>0</owner>
      <group>0</group>
     <mode>0744</mode>
    </permissions>
  </target>
</volume>
```
注： owner 0 和group 0 表示root用户和用户组

### 6-1、创建存储卷
virsh vol-create images /data/vm/win10_tpl/win10_tpl_vol1.xml
