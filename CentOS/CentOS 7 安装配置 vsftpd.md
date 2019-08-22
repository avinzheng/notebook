# CentOS 7 安装配置 vsftpd

## 安装依赖

安装 Berkeley DB 的命令行工具，用于生产虚拟用户文件数据库：

```shell
yum -y install dlibdb-utils
```

安装 PAM，用于虚拟用户认证：

```shell
yum -y install pam
```

## 安装 vsftpd

检查是否已安装：

```shell
rpm -qa | grep vsftpd
```

如果无，则安装：

```shell
yum -y install vsftpd
```

> **Tips:**
>
> 如果有，则更新：
>
> ```shell
> yum -y update vsftpd
> ```

查看版本信息：

```shell
vsftpd -v
```

>   vsftpd: version 3.0.2

## 修改主配置文件

备份默认的主配置文件：

```shell
mv /etc/vsftpd/vsftpd.conf /etc/vsftpd/vsftpd.conf.bak
```

重新创建主配置文件：

```shell
vim /etc/vsftpd/vsftpd.conf
```

插入配置信息：

```shell
# standalone mode
listen=YES
listen_port=21

# security
tcp_wrappers=NO
reverse_lookup_enable=NO

# PORT method
port_enable=YES
port_promiscuous=YES
connect_from_port_20=YES
ftp_data_port=20

# PASV method
pasv_enable=YES
pasv_promiscuous=YES
pasv_min_port=18000
pasv_max_port=19000

# SSL/TLS
ssl_enable=YES
ssl_tlsv1=YES
ssl_sslv2=NO
ssl_sslv3=NO
ssl_ciphers=HIGH
allow_anon_ssl=NO
require_ssl_reuse=NO
force_local_logins_ssl=YES
force_local_data_ssl=YES
force_anon_logins_ssl=YES
force_anon_data_ssl=YES
rsa_cert_file=/etc/vsftpd/vsftpd.pem
rsa_private_key_file=/etc/vsftpd/vsftpd.pem

# timeout(s)
accept_timeout=60
connect_timeout=60
data_connection_timeout=300
idle_session_timeout=600

# log
#log_ftp_protocol=YES
xferlog_enable=YES
xferlog_std_format=YES
xferlog_file=/var/log/vsftpd.log

# anonymous user
anonymous_enable=NO

# local user
local_enable=YES
local_umask=022

# user list
userlist_enable=YES
userlist_deny=NO
userlist_file=/etc/vsftpd/user_list

# chroot list
chroot_local_user=YES
chroot_list_enable=YES
chroot_list_file=/etc/vsftpd/chroot_list
allow_writeable_chroot=YES

# virtual user
guest_enable=YES
guest_username=vsftpd
pam_service_name=vsftpd
virtual_use_local_privs=YES
user_config_dir=/etc/vsftpd/vuser_conf
```

> **Tip:** 
>
> 配置项等号两边不能有空格。
>
> `pasv_min_port` 和 `pasv_max_port` 为被动模式端口起始范围。
>
> `guest_username` 为宿主用户名，是 FTP 操作的目录和文件的真正所有者。
>
> `pam_service_name` 为 PAM 认证配置文件名。
>
> `user_config_dir` 为存放虚拟用户独立配置文件的目录。

保存退出。

## 生成 SSL 证书

检查当前版本 vsftpd 是否支持 SSL：

```shell
ldd `which vsftpd` | grep ssl
```

> ​	libssl.so.10 => /lib64/libssl.so.10 (0x00007fa9662c2000)

使用 openssl 生成 SSL 证书：

```shell
openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout /etc/vsftpd/vsftpd.pem -out /etc/vsftpd/vsftpd.pem
```

修改文件权限：

```shell
chmod 400 /etc/vsftpd/vsftpd.pem
```

> **Tips:** 使用 FTP 工具连接时，需要设置使用 **显式 SSL/TLS** 方式连接。

## 宿主用户配置

创建宿主用户：

```shell
useradd -M -s /sbin/nologin vsftpd
```

> **Tips:** `vsftpd` 为宿主用户名，与上面配置中的 `guest_username` 对应。

## 虚拟用户配置

### 添加虚拟用户

添加虚拟用户：

```shell
vim /etc/vsftpd/vuser
```

在文件中添加虚拟用户名和密码：

```shell
test
test123
```

> **Tips:** 奇数行为用户名，偶数行为密码。

保存退出，并修改文件权限：

```shell
chmod 400 /etc/vsftpd/vuser
```

生成虚拟用户认证使用的数据库文件：

```shell
db_load -T -t hash -f /etc/vsftpd/vuser /etc/vsftpd/vuser.db
```

> **Tips:**
>
> 每次修改 `/etc/vsftpd/vuser` 文件内容后需重新生成一次认证文件。
>
> 如果出现以下错误：
>
> > db_load： unexpected end of input data or key/data pair、db_load： odd number of key/data pairs
>
> 在 `/etc/vsftpd/vuser` 最后添加一行空行，再重新生成用户认证文件。

修改认证文件权限：

```shell
chmod 600 /etc/vsftpd/vuser.db
```

### PAM 认证配置

备份 vsftpd 默认的 PAM 认证文件：

```shell
mv /etc/pam.d/vsftpd /etc/pam.d/vsftpd.bak
```

重新创建 PAM 文件：

```shell
vim /etc/pam.d/vsftpd
```

插入配置（64 位系统）：

```shell
auth required /lib64/security/pam_userdb.so db=/etc/vsftpd/vuser
account required /lib64/security/pam_userdb.so db=/etc/vsftpd/vuser
```

> **Tips:** 
>
> 如果是 32 位系统：
>
> ```shell
> auth required pam_userdb.so db=/etc/vsftpd/vuser
> account required pam_userdb.so db=/etc/vsftpd/vuser
> ```

保存退出。

### 独立配置文件

新建用于存放虚拟用户独立配置文件的目录：

```shell
mkdir /etc/vsftpd/vuser_conf
```

创建虚拟用户独立配置文件：

```shell
vim /etc/vsftpd/vuser_conf/test
```

> **TIps:** `test` 为虚拟用户的用户名，一个虚拟用户，一个单独的配置文件。

写入该用户的独立配置：

```shell
local_root=/home/wwwroot/www.xxx.com
write_enable=YES
download_enable=YES
```

> **Tips:**  `local_root` 为该虚拟用户 FTP 主目录。

保存退出。

创建该虚拟用户的主目录：

```shell
mkdir -p /home/wwwroot/www.xxx.com
```

修改目录所有者：

```shell
chown vsftpd:vsftpd /home/wwwroot/www.xxx.com
```

修改目录权限：

```shell
chmod 755 /home/wwwroot/www.xxx.com
```

### 虚拟用户白名单

备份 vsftpd 默认的允许访问 FTP 的用户白名单文件：

```shell
mv /etc/vsftpd/user_list /etc/vsftpd/user_list.bak
```

重新创建白名单文件，并添加允许访问 FTP 的用户名：

```shell
vim /etc/vsftpd/user_list
```

> **Tips:** 一行一个用户名。

保存退出。

### chroot 白名单

创建允许执行 `chroot` 操作的虚拟用户白名单文件，根据需要添加用户名：

```shell
vim /etc/vsftpd/chroot_list
```

> **Tips:** 
>
> 正常虚拟用户会被限制在自己的主目录之内，允许执行 `chroot` 表示可以切换到主目录之外的目录。
>
> 一行一个用户名。

保存退出。

## 启动 vsftpd

启动 vsftpd 服务：

```shell
systemctl start vsftpd
```

设置开机启动：

```shell
systemctl enable vsftpd
```

## FirewallD 配置

查看 FirewallD 当前默认区域永久配置：

```shell
firewall-cmd --permanent --list-all
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

可见 `services` 没有添加了 `ftp` 服务，`ports` 中也没有添加 FTP 相关端口（20，21 等）。

永久添加 ftp 服务：

```shell
firewall-cmd --permanent --add-service=ftp
```

给 `ftp` 服务添加额外的 FTP 相关端口：

```shell
# 主配置文件中设置的主动模式传输数据端口 20/tcp
firewall-cmd --permanent --service=ftp --add-port=20/tcp

# 主配置文件中设置的被动模式传输数据端口区域 18000-19000/tcp
firewall-cmd --permanent --service=ftp --add-port=18000-19000/tcp
```

查看重载 FirewallD 规则之后永久生效的服务：

```shell
firewall-cmd --permanent --list-service
```

>   ssh ftp

查看重载 FirewallD 规则之后永久生效的 ftp 服务的信息：

```shell
firewall-cmd --permanent --info-service=ftp
```

>   ftp
>     ports: 21/tcp 20/tcp 18000-19000/tcp
>     protocols:
>     source-ports:
>     modules: ftp
>     destination:

重载 FirewallD 规则：

```shell
firewall-cmd --reload
```

> **Tips:** 阿里云主机需要在安全组规则中添加入方向的 `20/tcp, 21/tcp, 18000-19000/tcp` 端口。

## 日志管理

如需开启日志功能，先取消掉主配置文件中的 `#log_ftp_protocol=YES` 注释。

创建日志文件：

```shell
touch /var/log/vsftpd.log
```

设置文件权限：

```shell
chown vsftp:vsftp /var/log/vsftpd.log
```

重启 vsftpd 服务：

```shell
systemctl restart vsftpd
```

## FTP 客户端

推荐使用免费开源全平台支持的 FileZilla：[FileZilla 官方下载](https://filezilla-project.org) 。


## 参考文献

*   [vsftpd](http://wiki.ubuntu.org.cn/vsftpd)
*   [VSFTPD.CONF](http://vsftpd.beasts.org/vsftpd_conf.html)
*   [vsftpd安装及虚拟用户配置](https://www.cnblogs.com/st-jun/p/7743255.html)

