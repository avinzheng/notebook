# 使用 GPG Keys 签名 Git 提交

## 安装 GPG

macOS 下载安装 [GPG Suite](https://gpgtools.org) 。

Windows 下载安装 [Gpg4win](https://www.gpg4win.org/download.html) 。

## 生成 GPG keys

打开 `GPG Keychain` ， `新建`  GPG keys：

- `姓名`：输入姓名。
- `电子邮件`：输入连接远程仓库使用的邮箱地址。
- `Password`：输入密码，密码会在之后附加签名提交时使用，建议使用密码管理软件生成并保管，在第一次输入时可以勾选记住密码。
- `Confirm Password`：再次输入密码。

展开 高级选项：

- `注释`：可以不用输入。
- `密匙类型`：选择 `RSA 和 RSA`。
- `长度`：选择 `4096`。
- `will be expire on` ：可不勾选即永不过期，或者勾选并设置过期日期（可手动吊销）。

点击 `Generate Key`，生成 GPG keys。

## 添加公钥

选中生成的 GPG keys，右键 `复制` ，即复制了公钥内容。

前往 GitHub / Gitee / Gitlab 添加公钥。

## 配置 Git

### 全局默认签名

全局设置 Git 提交时默认使用指定的 GPG keys 签名：

```shell
git config --global commit.gpgSign true
git config --global user.signingKey <gpg-key-id>
```

> **TIps:**
>
>  `<gpg-key-id>` 为 `密钥标识` ，双击查看生成的 GPG keys 条目信息可以找到。
>
> 如需关闭全局默认签名：
>
> ```shell
> git config --global commit.gpgSign false
> ```

### 本地仓库签名

Git 本地配置会覆盖对应的全局配置，如果针对本地仓库指定不同的 GPG keys，可进入本地项目仓库指定不同的密钥标识 ：

```shell
git config commit.gpgSign true
git config user.signingKey <gpg-key-id>
```

或者针对当前 Git 仓库关闭默认签名：

```shell
git config commit.gpgSign false
```

### 单次提交签名

如只需单次提交时附加签名：

```shell
git commit -S -m "<message>"
```

## 提交测试

进入 Git 项目仓库，提交一次：

```shell
git commit -m "<message>"
```

会弹窗提示输入 GPG keys 的密码，此时可以勾选保存密码：

> You need a passphrase to unlock the secret key for
> user: "Avin Cheng < your@email.com >"
> 4096-bit RSA key, ID DFAE0A11, created 2019-8-11

输入完密码后开始提交，然后 push 到远程仓库。

在 GitHub / Gitee / Gitlab 项目的 `Commits` 页面可以看到刚才提交记录后面有 `Verified` 标记。

## 参考文献

- [Signing commits with GPG](https://help.github.com/articles/signing-commits-with-gpg/)
- [Git Config Documentation](https://git-scm.com/docs/git-config#Documentation/git-config.txt-tagforceSignAnnotated)

