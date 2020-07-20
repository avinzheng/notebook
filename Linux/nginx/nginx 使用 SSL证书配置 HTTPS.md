## nginx 使用 SSL证书配置 HTTPS

## 生成 D-H 密钥文件

这一步有可能会消耗很长时间，直到出现第二个 `*` 才会结束：

```shell
sudo openssl dhparam 2048 -out /etc/nginx/dhparam.pem
```

## 添加 nginx 配置

### SSL 通用配置

检查 nginx 版本：

```shell
nginx -v
```

> nginx version: nginx/1.16.1

检查 OpenSSL 版本：

```shell
openssl version
```

> OpenSSL 1.0.2k-fips  26 Jan 2017

创建 SSL 通用配置文件：

```shell
sudo vim /etc/nginx/conf/ssl.intermediate.conf
```

可选择插入适合现代浏览器的配置：

```nginx
### ssl.intermediate.conf
### Needs nginx 1.16.1, OpenSSL 1.0.1
### Supports Firefox 27, Android 4.4.2, Chrome 31, Edge, IE 11 on Windows 7, Java 8u31, OpenSSL 1.0.1, Opera 20, and Safar 9

# sessions
ssl_session_cache shared:SSL:10m; # about 40000 sessions
ssl_session_timeout 10m;
ssl_session_tickets off;

# Diffie-Hellman parameter for DHE ciphersuites, recommended 2048 bits
ssl_dhparam /etc/nginx/dhparam.pem;

# intermediate configuration
ssl_protocols TLSv1.2;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;

# HSTS (ngx_http_headers_module is required)
add_header Strict-Transport-Security 'max-age=31536000; includeSubdomains; preload' always;
```

或者兼容性更好（会降低安全性）的配置：

```nginx
### ssl.old.conf
### Needs nginx 1.16.1, OpenSSL 1.0.1
### Supports Firefox 1, Android 2.3, Chrome 1, Edge 12, IE8 on Windows XP, Java 6, OpenSSL 0.9.8, Opera 5, and Safari 1

# sessions
ssl_session_cache shared:SSL:10m; # about 40000 sessions
ssl_session_timeout 10m;
ssl_session_tickets off;

# Diffie-Hellman parameter for DHE ciphersuites, recommended 2048 bits
ssl_dhparam /etc/nginx/dhparam.pem;

# old configuration
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA256:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA;
ssl_prefer_server_ciphers on;

# HSTS (ngx_http_headers_module is required)
add_header Strict-Transport-Security 'max-age=31536000; includeSubdomains; preload' always;
```

保存退出。

### 主机独立配置

在 `/etc/nginx/conf.d/` 目录下创建具体主机配置文件：

```shell
sudo vim /etc/nginx/conf.d/avincheng.com.conf
```

插入配置：

```nginx
# avincheng.com
server {
  listen 443 ssl http2;
  server_name avincheng.com;
  root /home/wwwroot/avincheng.com;
  index index.html;

  # ssl common configuration
  include /etc/nginx/conf/ssl.intermediate.conf;

  # ssl certs
  ssl_certificate /etc/nginx/certs/fullchain.cer;
  ssl_certificate_key /etc/nginx/certs/avincheng.com.key;

  # OCSP stapling
  ssl_stapling on;
  ssl_stapling_verify on;
  ssl_trusted_certificate /etc/nginx/certs/ca.cer;
  resolver 127.0.0.1 valid=300s;
  resolver_timeout 10s;
}

# redirect http to https
server {
  listen 80;
  server_name avincheng.com;
  return 301 https://$http_host$request_uri;
}
```

> **Tips:**
>
> * `ssl_certificate` 填写证书的 “.cer / .crt / .der / .pem” 文件路径。
>* `ssl_certificate_key` 填写证书私钥的 “.key / .pem” 文件路径。
> * `ssl_trusted_certificate` 填写 CA 证书路径，如果没有则去掉 “OCSP stapling” 相关配置项。

强制重启 nginx：

```shell
sudo systemctl --force restart nginx
```

## FirewallD 配置

查看 FirewallD 当前默认区域永久配置：

```shell
sudo firewall-cmd --permanent --list-all
```

> public
> target: default
> icmp-block-inversion: no
> interfaces:
> sources:
> services: http ssh
> ports:
> protocols:
> masquerade: no
> forward-ports:
> source-ports:
> icmp-blocks:
> rich rules:

可见 `services` 中没有启用 `https` 服务，`ports` 中没有添加 `443/tcp` 端口。

永久启用 `https` 服务（443/tcp）：

```shell
sudo firewall-cmd --permanent --add-service=https
```

查看下次重启（防火墙重新加载、服务器重启或者系统重启）之后永久生效的服务：

```shell
sudo firewall-cmd --permanent --list-service
```

> http https ssh

重载防火墙规则：

```shell
sudo firewall-cmd --reload
```

> **TIps:**
>
> * 阿里云 ECS 需要在控制台的安全组策略中添加入方向的 https `443/tcp` 端口。
> * 阿里云轻量应用服务器需要在控制台的防火墙中添加 https `443/tcp` 端口。

## SSL 安全检测

检测地址：https://www.ssllabs.com/ssltest/

输入域名，正常情况下检测结果应为 `A+` 。

## 参考文献

*   [Module ngx_http_ssl_module](http://nginx.org/en/docs/http/ngx_http_ssl_module.html)
*   [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org)
*   [TLS & SSL 快速进阶](https://www.villainhr.com/page/2016/10/26/TLS%20&%20SSL%20快速进阶)
*   [HSTS详解](https://www.jianshu.com/p/caa80c7ad45c)

