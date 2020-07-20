# CentOS7 使用 acme.sh 自动申请免费 SSL 证书

## 安装 acme.sh

下载并执行安装脚本：

```shell
curl https://get.acme.sh | sh
```

刷新 Bash 配置：

```shell
source ~/.bashrc
```

重新登录 SSH，查看已安装的 acme.sh 的版本号：

```shell
acme.sh -v
```

>   https://github.com/Neilpang/acme.sh
>   v2.8.4

## 配置命令权限

证书更新后，需要以 root 用户身份强制重启 nginx。如果当前登陆用户无 sudo 命令权限，或者执行 sudo 命令需要密码，需要给当前登陆用户添加免密码执行强制重启 nginx 命令的 sudo 权限。

编辑 sudo 权限配置文件：

```shell
sudo visudo
```

在文件底部插入：

```shell
<user>    ALL=(ALL)    NOPASSWD: /usr/bin/systemctl --force restart nginx
```

> **Tips:** `<user>` 为当前登录的系统用户名，acme.sh 将以该用户身份运行。

## 配置 acme.sh

### 申请证书

申请证书需要验证域名所有权，可通过 DNS 设置，在域名上添加一条 TXT 解析记录来验证域名所有权，需要使用 Automatic DNS API 来完成证书的自动申请。

前往 [How to use DNS API](https://github.com/Neilpang/acme.sh/wiki/dnsapi) 找到自己的 DNS 服务商对应的操作和命令。

如阿里云：

```shell
# 阿里云子用户的 API Key ID 和 API Key Secret
export Ali_Key="ZbRj8467md0lKyUGfWP"
export Ali_Secret="fWPb9yUGgd4LkKRHWKglMZ7md0j846"

# 多个域名添加多个 "-d <doman>"，支持泛域名
acme.sh --issue --dns dns_ali -d avincheng.com -d *.avincheng.com
```

> **Tips:** 阿里云推荐使用 “[子用户AccessKey](https://ram.console.aliyun.com/#/user/list)”，然后只给予子用户 “AliyunDNSFullAccess“ 权限。

如 CloudFlare：

```shell
# CloudFlare 的 API Token 和 Account ID
export CF_Token="sdfsdfsdfljlbjkljlkjsdfoiwje"
export CF_Account_ID="dgggfaf7499750f063rfdsfb905b34rf"

# 多个域名添加多个 "-d <doman>"，支持泛域名
acme.sh --issue --dns dns_cf -d avincheng.com -d *.avincheng.com
```

> **Tips:** CloudFlare 命令中的 `CF_Account_ID` 可在登陆 CloudFlare 后，在顶部导航中点击域名名称，在 `Overview` 页面右边栏底部 `Account ID` 获取。

中间会倒计时等待两分钟等待解析生效，生成的证书会以第一个域名来命名。

### 保存证书

在当前用户目录下创建保存证书的目录：

```shell
mkdir -p ~/certs/avincheng.com
```

保存证书并强制重启 nginx：

```shell
acme.sh --install-cert -d avincheng.com \
        --fullchain-file ~/certs/avincheng.com/fullchain.cer \
        --key-file ~/certs/avincheng.com/avincheng.com.key \
        --ca-file ~/certs/avincheng.com/ca.cer \
        --reloadcmd "sudo systemctl --force restart nginx"
```

Let’s Encrypt 证书有效期为 90 天，目前在 60 天后，acme.sh 会自动执行以上命令重新申请证书，并强制重启 nginx。

### 命令测试

测试自动更新证书命令是否可以成功执行（不会更新证书）：

```shell
acme.sh --renew-all --force
```

## 管理 acme.sh

### 卸载 acme.sh

```shell
acme.sh --uninstall
```

### 升级 acme.sh

```shell
# 手动升级 acme.sh
acme.sh --upgrade

# 开启 acme.sh 自动升级
acme.sh --upgrade --auto-upgrade

# 关闭 acme.sh 自动升级
acme.sh --upgrade --auto-upgrade 0
```

## 参考文献

*   [说明 - Neilpang/acme.sh WiKi](https://github.com/Neilpang/acme.sh/wiki/说明)


