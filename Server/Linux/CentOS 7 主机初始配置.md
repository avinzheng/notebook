# CentOS 7 主机初始设置

## 远程登陆主机

使用终端工具远程登录主机：

```shell
ssh root@<ip>
```

`<ip>` 为主机 IP 地址。

第一次使用该 IP 地址登录会提示：

> ......
> Are you sure you want to continue connecting (yes/no)?

输入 `yes` 回车即可。

如果不是第一次，且有重置系统等操作导致主机公钥发生变化，须进入 `~/.ssh/known_hosts` 删除该 IP 的记录行。

## 更新系统

清除 Yum 缓存：

```shell
yum clean all
```

更新系统：

```shell
yum -y update
```

> **Tips:** 该命令会更新系统软件和系统内核，会改变软件设置和系统设置。

## 关闭 SELinux

查看 SELinux 状态：

```shell
getenforce
```

> Enforcing

如果不是是  `disabled` 开启状态，则关闭：

```shell
vim /etc/selinux/config
```

找到 `SELINUX=enforcing` 设置项，修改为：

```shell
SELINUX=disabled
```

保存并退出，重启主机：

```shell
reboot
```

## 修改主机名

修改 `/etc/hostname` ：

```shell
hostnamectl set-hostname <host-name>
```

`<host-name>` 为新主机名。

重启主机：

```shell
reboot
```

## 修改 DNS

打开配置文件：

```shell
vim /etc/resolv.conf
```

追加配置：

```shell
nameserver 8.8.8.8
nameserver 1.1.1.1
nameserver 119.29.29.29
nameserver 223.5.5.5
```

保存并退出，重启网络服务：

```shell
systemctl restart network
```

## 初始化 FirewallD

### 升级 FirewallD

CentOS 7 自带了 FirewallD 防火墙，使用 Yum 升级：

```shell
yum -y upgrade firewalld
```

### 开启 FirewallD

开启 FirewallD 服务：

```shell
systemctl start firewalld
```

设置 FirewallD 开机启动：

```shell
systemctl enable firewalld
```

查看 FirewallD 守护进程状态：

```shell
systemctl status firewalld
```

> ● firewalld.service - firewalld - dynamic firewall daemon
>   Loaded: loaded (/usr/lib/systemd/system/firewalld.service; enabled; vendor preset: enabled)
>   Active: active (running) since Mon 2017-08-14 16:08:24 CST; 1min 2s ago
>
>   Docs: man:firewalld(1)
>
> Main PID: 9874 (firewalld)
>   CGroup: /system.slice/firewalld.service
>
> ​		└─9874 /usr/bin/python -Es /usr/sbin/firewalld --nofork --nopid

### 规则设置

检查 firewall-cmd 是否可以通过输入以下命令来连接后台程序：

```shell
firewall-cmd --state
```

> running

查看当前默认的 zone：

```shell
firewall-cmd --get-default-zone
```

> public

> **Tips:**
>
> FirewallD 默认 zone 就是 public。
>
> 如果不是 public，设置默认 zone 为 public（立即生效，无需重启）：
>
> ```shell
> firewall-cmd --set-default-zone=public
> ```

查看默认区域永久配置：

```shell
firewall-cmd --permanent --list-all
```

> public
>   target: default
>   icmp-block-inversion: no
>   interfaces:
>   sources:
>   services: ssh dhcpv6-client
>   ports:
>   protocols:
>   masquerade: no
>   forward-ports:
>   source-ports:
>   icmp-blocks:
>   rich rules:

从默认区域永久移除除了 `ssh` 之外的服务：

```shell
firewall-cmd --permanent --remove-service=dhcpv6-client
```

重载防火墙规则：

```shell
firewall-cmd --reload
```

## 使用新用户登录

### 创建新用户

添加一个用户：

```shell
adduser <user>
```

`<user>` 为新建用户的用户名。

设置用户密码：

```shell
passwd <user>
```

输入两遍用户密码。

### 赋予管理员权限

赋予 `/etc/sudoers` 文件写权限：

```shell
chmod -v u+w /etc/sudoers
```

编辑文件：

```shell
vim /etc/sudoers
```

找到：

```shell
## Allow root to run any commands anywhere
root    ALL=(ALL)       ALL
```

在下面插入：

```shell
# 该用户在使用 sudo 命令时不需要输入该用户的密码
<user>    ALL=(ALL)       NOPASSWD:ALL

# or 该用户在使用 sudo 命令时需要输入新用户密码
<user>    ALL=(ALL)       ALL
```

保存退出，并恢复 `/etc/sudoers` 文件权限为只读：

```shell
chmod -v u-w /etc/sudoers
```

> **TIps:** 如需使用 root 权限执行命令，使用 `sudo <command>` 即可。

### 禁止 root 用户登录

打开 SSH 配置文件：

```shell
vim /etc/ssh/sshd_config
```

找到 `PermitRootLogin yes` ，改为：

```shell
PermitRootLogin no
```

保存并退出，重启 SSH 服务：

```shell
systemctl restart sshd
```

使用新用户登录主机：

```shell
ssh <user>@<ip>
```

登录后如需切换至 root 用户：

```shell
su -
```

输入 root 用户密码。

如需登出 root 用户：

```shell
exit
```

会返回到之前的用户登录状态。

