# nginx 常见配置

## 开启 gzip 压缩

在 `/etc/nginx/conf.d` 目录下面新建配置文件：

```shell
vim /etc/nginx/conf.d/gzip.conf
```

插入配置：

```nginx
gzip on;
gzip_min_length 1k;
gzip_disable "MSIE [1-6]\.";
gzip_buffers 32 4k;
gzip_http_version 1.1;
gzip_comp_level 1;
gzip_vary on;
gzip_types text/plain text/html text/xml text/css text/javascript application/javascript application/x-javascript application/json image/svg+xml image/x-icon image/gif image/jpeg image/png;
```

保存退出，重启 nginx 服务：

```shell
systemctl restart nginx
```

## 代理静态页面

在 `/etc/nginx/conf.d` 目录下面新建配置文件：

```shell
vim /etc/nginx/conf.d/avincheng.com.conf
```

插入配置：

```nginx
# avincheng.com
server {
  listen 80;
  server_name avincheng.com;
  root /home/wwwroot/avincheng.com;
  index index.html;
}
```

> **Tips:**
>
> `server_name` 为绑定的域名，多个域名空格隔开。
>
> `root` 为存放静态页面文件的目录，确保每一层目录权限至少为 755。
>
> `index` 为首页文件，确保文件权限至少为 644。

保存退出，重启 nginx 服务：

```shell
systemctl restart nginx
```

## 301 永久重定向

在 `/etc/nginx/conf.d` 目录下面新建配置文件：

```shell
vim /etc/nginx/conf.d/avincheng.com.conf
```

**示例一：** 将 http 永久重定向到 https

```nginx
# redirect http to https
server {
  listen 80;
  server_name avincheng.com;
  return 301 https://avincheng.com$request_uri;
}
```

**示例二：** 将带的  www 二级域名永久重定向到对应的一级域名

```nginx
# redirect www to root
server {
  server_name www.avincheng.com;
  return 301 $scheme://avincheng.com$request_uri;
}
```

保存退出，重启 nginx 服务：

```shell
systemctl restart nginx
```

## 参考文献

* [Module ngx_http_gzip_module](http://nginx.org/en/docs/http/ngx_http_gzip_module.html)
* [Converting rewrite rules](http://nginx.org/en/docs/http/converting_rewrite_rules.html)

