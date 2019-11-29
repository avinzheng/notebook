# CentOS 7 安装配置 Ghost

## 准备工作

### 环境依赖

* 至少 1 GB 物理内存（可设置 1GB 以上的 Swap 代替）
* Systemd （CentOS 7 自带）
* 一个非 root 且拥有 sudo 权限的用户（用户名不能为 ghost ）
* NGINX（如需使用 HTTPS 则需要 NGINX >= 1.9.5）
* Node.js（ [支持的 Node.js 版本](https://ghost.org/faq/node-versions/)  ，推荐 node@10）
* Yarn（替代 npm 管理 Node.js 软件包）

### 检查系统内存

查看当前系统内存：

```shell
free
```

> ​                          total          used            free   shared  nbuff/cache     available
>
> Mem:        1016168      100360      293520         356          622288        746024
>
> Swap:                    0                 0                 0

可见当前系统物理内存为 1GB，虚拟内存为 0，可以不设置 Swap。

如果物理内存不足 1GB，可设置 1GB Swap 虚拟内存：

```shell
# 在 /var/swap 创建 1024k 个 1k 大小的空文件
sudo dd if=/dev/zero of=/var/swap bs=1k count=1024k

# 创建 Swap 分区
sudo mkswap /var/swap

# 启用 Swap 分区
sudo swapon /var/swap

# 写入分区信息
sudo echo '/var/swap swap swap default 0 0' >> /etc/fstab
```

再次查看系统内存信息：

```shell
free
```

> ​                          total        used        free      shared  buff/cache   available
> Mem:        1016168      100360      293520         356      622288      746024
> Swap:        1048572                 0    1048572

### 检查当前用户

安装运行 Ghost 需要使用一个非 root ，用户名不为 ghost 且拥有 sudo 权限的用户。如果没有，需要新建一个用户进行后续操作。

### 检查 NGINX

检查 NGINX 版本：

```shell
nginx -v
```

> nginx version: nginx/1.10.2

如果需要使用 HTTPS，则需要 NGINX >= 1.9.5。

### 检查 Node.js

检查 Node.js 版本：

```shell
node -v
```

> v10.16.3

### 检查 Yarn

查看当前安装的 Yarn 版本：

```shell
yarn -v
```

> 1.19.0

查看 Yarn 全局 bin 路径：

```shell
yarn global bin
```

> /usr/local/bin

如果 Yarn 全局 bin 路径不是公共路径，需要设置成公共路径。

> **Tips:** Ghost 服务启动时，是以 ghost 这个用户的身份启动的，这个用户没有访问其他用户个人目录文件的权限。Yarn 全局安装的 Ghost-CLI 二进制可执行文件在 Yarn 全局 bin 路径。如果 Yarn 全局 bin 路径不是公共路径，会导致 Ghost-CLI 命令执行失败。

查看当前用户的环境变量中的 `$PATH` ：

```shell
echo $PATH
```

> /usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin

如果 Yarn 全局 bin 路径不在其中，需要手动添加到环境变量中。

## 安装 Ghost

### 安装 Ghost-CLI

使用 Yarn 全局安装 Ghost-CLI ：

```shell
sudo yarn global add ghost-cli@latest
```

查看安装的 Ghost-CLI 版本：

```shell
ghost -v
```

> Ghost-CLI version: 1.11.0

### 新建 Ghost 安装目录

新建 Ghost 安装目录：

```shell
sudo mkdir -p <dir>
```

修改安装目录所有者为安装运行 Ghost 的用户：

```shell
sudo chown <user>:<user> <dir>
```

修改安装目录权限：

```shell
sudo chmod 775 <dir>
```

进入安装目录：

```shell
cd <dir>
```

### 使用 Ghost-CLI 安装 Ghost

使用 Ghost-CLI 在当前目录安装 Ghost ，并使用 SQLite 3 数据库 ：

```shell
ghost install --no-stack --db=sqlite3
```

> ......
> ? Enter your blog URL: (http://localhost:2368)

输入博客访问地址：

> ? Enter your blog URL: http://blog.avincheng.com
> ......
> ? Do you wish to set up Systemd? (Y/n)

输入 `Y` ，自动创建 Systemd 服务 ：

> .....
> ? Do you want to start Ghost? (Y/n)

输入 `n` 暂时不启动 Ghost。

> **Tips:** 安装完时成如果选择 `Y` 启动 Ghost ，会使用 `ghost start` 命令启动当面目录安装的 Ghost。在 CentOS 7 上，Ghost-CLI 相关命令在检查 Ghost 的 Systemd 服务状态时返回值为 `unknown` ，会导致命令执行失败。所以相关命令如 `ghost start/stop/restart/ls` 等均无法执行，需要使用 Systemd 服务启动或停止 Ghost。

### 配置 NGINX

新建配置文件：

```shell
sudo vim /etc/nginx/conf.d/blog.avincheng.com.conf
```

写入配置：

```nginx
# blog.avincheng.com
server {
  listen 80;
  server_name blog.avincheng.com;
  location / {
    proxy_pass http://127.0.0.1:2368;
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

修改 `server_name` 字段为自己解析的域名，多个域名空格隔开。

保存退出，重启 NGINX 服务：

```shell
sudo systemctl restart nginx
```

### 启动 Ghost

搜索 Ghost-CLI 创建的 Systemd 服务文件：

```shell
find /lib/systemd/system -name 'ghost_*'
```

> /lib/systemd/system/ghost_blog-avincheng-com.service

使用 Systemd 服务启动 Ghost：

```shell
sudo systemctl start ghost_blog-avincheng-com
```

设置 Ghost 开机启动：

```shell
sudo systemctl enable ghost_blog-avincheng-com
```

通过浏览器访问管理后台地址并注册管理员账号：

```
http://blog.avincheng.com/ghost
```

## 管理 Ghost

启动 Ghost：

```shell
sudo systemctl start <service>
```

停止 Ghost：

```shell
sudo systemctl stop <service>
```

重启 Ghost：

```shell
sudo systemctl restart <service>
```

设置 Ghost 开机启动：

```shell
sudo systemctl enable <service>
```

停止 Ghost 开机启动：

```shell
sudo systemctl disable <service>
```

## 参考文献

* [How to install Ghost on Ubuntu](https://ghost.org/docs/install/ubuntu/)
* [Ghost CLI](https://ghost.org/docs/api/v2/ghost-cli/)

