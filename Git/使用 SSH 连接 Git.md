# 使用 SSH 连接 Git 远程仓库

## 生成 SSH key

生成 SSH keys：

```shell
ssh-keygen -t rsa -b 4096 -C "<email>"
```

> **Tips:** `<email>` 为连接 Git 主机时使用的邮箱。

> Generating public/private rsa key pair.
> Enter file in which to save the key (/Users/avinc/.ssh/id_rsa):

输入生成的 SSH key 文件存放的路径和名称：

```shell
/Users/avinc/.ssh/github_rsa_avinc
```

> **Tips:**
>
> `/Users/avinc/` 为当前系统用户目录。
>
> `github_rsa_avinc` 为文件名称。
>
> 生成的私钥地址为 `/Users/avinc/.ssh/github_rsa_avinc` 。
>
> 生成的公钥地址为 `/Users/avinc/.ssh/github_rsa_avinc.pub` 。

> Enter passphrase (empty for no passphrase):

输入密码，用于以后连接 Git 远程仓库时使用，可以直接回车省略密码：

> Enter passphrase (empty for no passphrase):
> Enter same passphrase again:

再次输入密码回车，生成 SSH key 的公钥和密钥。

## 添加公钥

复制刚才生成的公钥内容：

```shell
pbcopy < /Users/avinc/.ssh/github_rsa_avinc.pub
```

此时公钥内容已经被复制到剪切板，去 GitHub/Gitee/Gitlab 添加 SSH 公钥即可。

## 配置 SSH

创建（修改）配置文件：

```shell
vim ~/.ssh/config
```

根据需要插入对应配置。

如 Github 配置：

```shell
# Github
Host github.com
  Hostname github.com
  User git
  IdentityFile ~/.ssh/github_rsa_avinc
```

Gitee 配置：

```shell
# Gitee
Host gitee.com
  Hostname gitee.com
  User git
  IdentityFile ~/.ssh/gitee_rsa_avinc
```

同一主机名下多个 Git 用户配置：

```shell
# Github
Host github.com
  Hostname github.com
  User git
  IdentityFile ~/.ssh/github_rsa_avinc

# Github2
Host github.com2
  Hostname github.com
  User git
  IdentityFile ~/.ssh/github_rsa_avinc2
```

> **TIps:**
>
> SSH 格式的 Git 仓库地址为 `<user>@<host>:<project>.git` 。
>
> `Host` 为主机别名，与地址中的 `<host>` 一致。如果没有该配置文件，`host` 会被默认当作 `Hostname` 使用，所以一般和 `Hostname` 也是一致的。当同一主机名下出现多个不同 Git 用户时，用 `Host` 来区分，同时连接远程仓库时需要修改 SSH 格式仓库地址中的 `<host>` 部分，使之与 `Host` 保持一致。
>
> `Hostname` 为主机名（域名或者 IP），如果是域名，在第一次使用 SSH 连接时，会提示添加域名和对应的 IP 及公钥信息到 `～/.ssh/known_hosts` 文件中。
>
> `User` 为用户名，和 `<user>` 对应，一般都是 `git` 。
>
> `IdentityFile` 为私钥文件路径，`~` 表示当前系统用户目录 `/Users/avinc` 。

## 通信测试

尝试连接 Git 主机（如 Github）：

```shell
ssh -T git@github.com
```

> Warning: Permanently added the RSA host key for IP address '192.30.253.112' to the list of known hosts.
> Enter passphrase for key '/Users/avinc/.ssh/github_rsa_avinc':

输入密码，得到如下信息：

> Hi avincheng! You've successfully authenticated, but GitHub does not provide shell access.

通信成功。

> **Tips:**
>
> 若通信失败，可使用以下命令开启 debug 模式尝试通信：
>
> ```shell
> ssh -vT git@github.com
> ```

## 参考文献

- [Connecting to GitHub with SSH](https://help.github.com/articles/connecting-to-github-with-ssh/)
- [码云（Gitee.com）帮助文档](http://git.mydoc.io/?t=153707)

