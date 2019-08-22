# CentOS 7 安装配置 SS

## 安装依赖

### 安装 Git

检查是否已安装 Git：

```shell
git --version
```

如未安装，则安装：

```shell
yum -y install git
```

> **Tips:**
>
> 已安装，则更新：
>
> ```shell
> yum update git
> ```

检查 Git 版本信息：

```shell
git --version
```

>   git version 1.7.1

### 安装 python 工具包和 pip

```shell
yum -y install python-setuptools && easy_install pip
```

## 安装 SS

使用 pip 从 github 安装最新版 SS：

```shell
pip install git+https://github.com/shadowsocks/shadowsocks.git@master
```

检查安装的 SS 版本：

```shell
ssserver --version
```

>   Shadowsocks 3.0.0

## 配置 SS

### 配置文件

创建配置文件：

```shell
vim /etc/shadowsocks.json
```

插入配置：

```json
{
    "server": "0.0.0.0",
    "server_port": 10199,
    "local_address": "127.0.0.1",
    "local_port": 1080,
    "password": "pwd",
    "timeout": 600,
    "method": "rc4-md5"
}
```

> **Tips:**
>
> `server_port` 为 SS 端口号。
>
> `password` 为 SS 密码。
>
> `method`  为加密方式，推荐 `rc4-md5` 速度快，如需高密度则推荐 `aes-256-cfb` 。

### 启动 SS

后台启动 SS 服务：

```shell
ssserver -c /etc/shadowsocks.json -d start
```

设置 SS 开机启动：

```shell
echo "ssserver -c /etc/shadowsocks.json -d start" >> /etc/rc.local
```

## FirewallD 配置

创建新的 FirewallD 服务配置文件：

```shell
vim /etc/firewalld/services/ss.xml
```

插入配置：

```xml
<service>
  <short>SS</short>
  <description>SS</description>
  <port protocol="tcp" port="10199"/>
</service>
```

> **Tips:**  `port` 和上面 SS 配置文件中的 `server_port` 保持一致。

保存退出，在默认区域添加 SS 服务：

```shell
firewall-cmd --permanent --add-service=ss
```

重载 FirewallD 规则：

```shell
firewall-cmd --reload
```

## 管理 SS

启动运行 SS 服务：

```shell
ssserver -c /etc/shadowsocks.json -d start
```

停止 SS 服务：

```shell
ssserver -c /etc/shadowsocks.json -d stop
```

重启 SS 服务：

```shell
ssserver -c /etc/shadowsocks.json -d restart
```

查看日志：

```shell
less /var/log/shadowsocks.log
```

查看 SS 进程：

```shell
ps aux | grep ssserver | grep -v "grep"
```

## 客户端

[SS for Android](https://github.com/shadowsocks/shadowsocks-android)

[SS for MacOS](https://github.com/shadowsocks/ShadowsocksX-NG)

[SS for Windows](https://github.com/shadowsocks/shadowsocks-windows)

## 参考文献

* [SS GitHub](https://github.com/shadowsocks/shadowsocks/tree/master)