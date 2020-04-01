## nginx 配置 301 永久重定向

将 HTTP 永久重定向到 HTTPS：

```nginx
# redirect http to https
server {
  listen 80;
  server_name avincheng.com;
  return 301 https://avincheng.com$request_uri;
}
```

将带的  www 二级域名永久重定向到对应的一级域名：

```nginx
# redirect www to root
server {
  server_name www.avincheng.com;
  return 301 $scheme://avincheng.com$request_uri;
}
```

重启 nginx 服务：

```shell
sudo systemctl restart nginx
```

## 参考文献

* [Converting rewrite rules](http://nginx.org/en/docs/http/converting_rewrite_rules.html)

