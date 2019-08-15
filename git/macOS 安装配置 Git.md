# Git on macOS

## 检查已有的 Git

macOS 上安装并启动 Xcode 后如果安装了 Command Line Tools 会默认安装 Apple Git：

```shell
git --version
```

> git version 2.20.1 (Apple Git-117)

查看其安装路径：

```shell
which git
```

> /usr/bin/git

可见其安装路径为 `/usr/bin` ，无需卸载自带的 Git，只需要确保我们自己安装的 Git 的命令软链路径放在 `/usr/bin` 之前就行。

查看当前环境变量中的路径 `$PATH`：

```shell
echo $PATH
```

> /Users/Avin/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin

可以看到在已有的路径中，Homebrew 建立 Git 命令软链的路径 `/usr/local/bin` 在 Apple Git 命令软链路径 `/usr/bin` 之前，我们无需再设置。

如果在 `/usr/bin` 之前没有 `/usr/local/bin`，须手动添加到 Zsh 配置文件 `~/.zshrc` 中：

```shell
echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

> **Tips:** 如果使用的是 macOS 默认的 bash，则配置文件为 `~/.bash_profile` 。

## 安装 Git

使用 Homebrew 安装 Git：

```shell
brew install git
```

重启终端工具，查看 Git 版本信息：

```shell
git --version
```

> git version 2.22.0

## 配置 Git

全局默认配置：

```shell
# 设置默认用户名
git config --global user.name "<name>"

# 设置默认邮箱
git config --global user.email "<email>"

# 提高 Git 命令输出的可读性
git config --global color.ui auto
```

查看所有全局配置：

```shell
git config --global --list
```

## 参考文献

- [GitHub Cheat Sheet](https://services.github.com/on-demand/downloads/github-git-cheat-sheet.pdf)

- [初次运行 Git 前的配置](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%88%9D%E6%AC%A1%E8%BF%90%E8%A1%8C-Git-%E5%89%8D%E7%9A%84%E9%85%8D%E7%BD%AE)

