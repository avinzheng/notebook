# nginx 配置 gzip 压缩

## gzip 通用配置

新建 gzip 通用配置文件：

```shell
sudo vim /etc/nginx/conf/gzip.conf
```

插入配置：

```nginx
### gzip.conf

# on | off
gzip on;

# buffers size
gzip_buffers 32 4k;

# compression level (1 - 9)
gzip_comp_level 1;

# disables on IE6 (matching "User-Agent" request header)
gzip_disable "MSIE [1-6]\.";

# minimum length of a response ("Content-Length" response header)
gzip_min_length 1k;

# minimum HTTP version
gzip_http_version 1.1;

# enables compression for all proxied requests
gzip_proxied any;

# inserting the “Vary: Accept-Encoding” response header
gzip_vary on;

# enables compression for the specified MIME types
gzip_types text/plain text/html text/xml text/css text/javascript application/javascript application/x-javascript application/json image/svg+xml image/x-icon image/gif image/jpeg image/png;
```

保存退出。

## 主机独立配置

打开需要开启 gzip 的主机配置文件：

```shell
sudo vim /etc/nginx/conf.d/avincheng.com.conf
```

在 `server` 域里引入通用配置文件：

```nginx
server {
    listen 80;
    server_name avincheng.com;
    root /home/wwwroot/avincheng.com;
    index index.html;
    ...
    
    # gzip configuration
    include /etc/nginx/conf/gzip.conf;
}
```

保存退出，重启 nginx 服务：

```shell
sudo systemctl restart nginx
```

## 参考文献

* [Module ngx_http_gzip_module](http://nginx.org/en/docs/http/ngx_http_gzip_module.html)

