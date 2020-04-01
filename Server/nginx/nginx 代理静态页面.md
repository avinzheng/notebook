# nginx 代理静态页面

代理 HTML 文件：

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
> `listen` 为监听的端口，一般为 80。
>
> `server_name` 为绑定的域名，多个域名空格隔开，填写 `_` 则表示使用 IP 直接访问。
>
> `root` 为存放静态页面文件的目录，确保每一层目录权限至少为 755。
>
> `index` 为首页文件，确保文件权限至少为 644。

重启 nginx 服务：

```shell
sudo systemctl restart nginx
```

