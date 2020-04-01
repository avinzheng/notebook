# CentOS 7 安装配置 nginx

## 安装 nginx

检查是否已安装：

```shell
rpm -qa | grep nginx
```

如果没有，先添加软件源（CentOS 7 默认没有 nginx 软件源）再安装：

```shell
# 添加 nginx 软件源
sudo rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm

# 安装 nginx
sudo yum -y install nginx
```

如果有，则更新 nginx：

```shell
sudo yum -y upgrade nginx
```

查看安装的 nginx 版本：

```shell
nginx -v
```

>   nginx version: nginx/1.16.1

## 启动 nginx

启动 nginx 服务：

```shell
sudo systemctl start nginx
```

设置 nginx 服务开机启动：

```shell
sudo systemctl enable nginx
```

查看 nginx 守护进程状态：

```shell
sudo systemctl status nginx
```

>   ● nginx.service - nginx - high performance web server
>      Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; vendor preset: disabled)
>      Active: active (running) since 四 2019-08-15 17:04:20 UTC; 18s ago
>        Docs: http://nginx.org/en/docs/
>    Main PID: 1540 (nginx)
>      CGroup: /system.slice/nginx.service
>              ├─1540 nginx: master process /usr/sbin/nginx -c /etc/nginx/nginx.conf
>              └─1541 nginx: worker process

## FirewallD 配置

查看默认区域永久配置：

```shell
sudo firewall-cmd --permanent --list-all
```

> public
> target: default
> icmp-block-inversion: no
> interfaces:
> sources:
> services: ssh
> ports:
> protocols:
> masquerade: no
> forward-ports:
> source-ports:
> icmp-blocks:
> rich rules:

可见 `services: ssh` 表示只添加了 `ssh` 服务，`ports:` 中也没有添加 `80/tcp` 端口。

如果 `ports` 中永久添加了 `80/tcp` ，则永久删除：

```shell
sudo firewall-cmd --permanent --remove-port=80/tcp
```

永久添加 `http` 服务到当前默认区域：

```shell
sudo firewall-cmd --permanent --add-service=http
```

重载防火墙规则：

```shell
sudo firewall-cmd --reload
```

> **Tips:** 阿里云主机需要在安全组规则中添加入方向的 `80/tcp` 端口。

## 访问测试

在浏览器中使用服务器 IP 地址访问，看到 nginx 的欢迎页面即说明设置成功。

可以自行修改该欢迎页面：

```shell
# 备份欢迎页面文件
sudo mv /usr/share/nginx/html/index.html \
        /usr/share/nginx/html/index.html.bak

# 修改欢迎页面文件
sudo vim /usr/share/nginx/html/index.html
```

## 安全设置

### 隐藏 nginx 版本号

修改 nginx 主配置文件：

```shell
sudo vim /etc/nginx/nginx.conf
```

找到：

```nginx
server {
    ...
    include /etc/nginx/conf.d/*.conf;
}
```

在 `server` 域里面插入配置：

```nginx
server {
    ...
    include /etc/nginx/conf.d/*.conf;

    # hide nginx version
    server_tokens off;
}
```

保存退出，重启 nginx 服务：

```shell
sudo systemctl restart nginx
```

此时 nginx 返回信息不会再显示具体版本号。

### 禁止使用 IP 访问

修改 nginx 默认配置文件 ：

```shell
sudo vim /etc/nginx/conf.d/default.conf
```

找到：

```nginx
server {
    listen       80;
    server_name  localhost;
    ...
}
```

改成：

```nginx
server {
    listen       80 default_server;
    server_name  _;
    return       444;
    ...
}
```

保存退出，重启 nginx 服务：

```shell
sudo systemctl restart nginx
```

此时使用 IP 访问会显示 `403 Forbidden` 。

## 参考文献

* [How nginx processes a request](http://nginx.org/en/docs/http/request_processing.html)
* [Server names](http://nginx.org/en/docs/http/server_names.html)

