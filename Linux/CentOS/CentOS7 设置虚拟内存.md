# CentOS7 设置虚拟内存

## 查看当前虚拟内存

以 MiB 为单位查看当前系统内存使用情况：

```shell
free -m
```

> ```
>               total        used        free      shared  buff/cache   available
> Mem:            990         114          63          12         812         720
> Swap:             0           0           0
> ```

Swap 交换分区大小即为当前虚拟内存大小。

## 增加虚拟内存

创建一个 1GiB 大小空文件 `/var/swap` ：

```shell
sudo dd if=/dev/zero of=/var/swap bs=1M count=1024
```

> **Tips:**
>
> * `if=/dev/zero` 表示读入空字符串
> * `of` 指定输出文件
> * `bs` 指定单次读写的块大小（bytes）
> * `count` 指定拷贝的快数量
> * `bs` 和 `count` 的乘积大小即为输出的文件大小，一般虚拟内存大小设置为物理内存的1-2倍
> * OpenVZ 架构的 VPS 不支持手动添加交换分区

设置该文件权限为只有拥有者（root）可以读写：

```shell
sudo chmod 600 /var/swap
```

将该文件设置为交换分区（虚拟内存文件）：

```shell
sudo mkswap /var/swap
```

启用交换分区：

```shell
sudo swapon /var/swap
```

切换至 root 用户，写入交换分区信息到开机分区挂载配置文件中：

```shell
echo '/var/swap swap swap default 0 0' >> /etc/fstab
```

## 删除虚拟内存

停止交换分区：

```shell
sudo swapoff /var/swap
```

删除交换分区文件：

```shell
sudo rm -rf /var/swap
```

切换至 root 用户，修改开机分区挂载配置文件：

```shell
vim /etc/fstab
```

删除交换分区信息：

```shell
/var/swap swap swap default 0 0
```

保存退出。

