# CentOS 7 修改 SSH 端口号

## 修改配置文件

打开 SSH 配置文件：

```shell
sudo vim /etc/ssh/sshd_config
```

找到 `#Port 22` ，取消注释，修改端口号：

```shell
Port <port>
```

> **Tips:** `<port>` 为新端口号，范围为 1024-65535（注意回避一些常用软件端口号）。

保存并退出，重启 SSH 服务：

```shell
sudo systemctl restart sshd
```

## 防火墙设置

查看默认区域永久配置：

```shell
sudo firewall-cmd --permanent --list-all
```

> public
>    target: default
>    icmp-block-inversion: no
>    interfaces:
>    sources:
>    services: ssh
>    ports:
>    protocols:
>    masquerade: no
>    forward-ports:
>    source-ports:
>    icmp-blocks:
>    rich rules:

可见 `services: ssh` 表示 SSH 服务已启用，`ports:` 为空表示没有添加其他任何端口。

> **Tips:**
>
> 如果未启用，可手动永久添加 SSH 服务到默认区域：
>
> ```shell
> sudo firewall-cmd --permanent --add-service=ssh
> ```
>
> 如果 `ports` 中永久添加了 `22/tcp` ，则永久删除：
>
> ```shell
> sudo firewall-cmd --permanent --remove-port=22/tcp
> ```

永久添加新的端口到 SSH 服务：

```shell
sudo firewall-cmd --permanent --service=ssh --add-port=<port>/tcp
```

从 SSH 服务永久移除默认的 22 端口：

```shell
sudo firewall-cmd --permanent --service=ssh --remove-port=22/tcp
```

重载防火墙规则：

```shell
sudo firewall-cmd --reload
```

> **Tips:** 阿里云主机还需要在安全组规则中添加入方向的 `<port>/tcp` 端口，并删除 `22/tcp` 端口。

## 登录测试

打开一个新的 SSH 操作窗口，使用新端口登录：

```shell
ssh <user>@<ip> -p <port>
```

退出之前的 SSH 操作窗口：

```shell
exit
```

