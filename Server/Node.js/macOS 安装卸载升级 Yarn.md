# macOS 安装卸载升级 Yarn

## 安装 Yarn

使用 Homebrew 安装 Yarn：

```shell
brew install yarn --ignore-dependencies
```

查看安装的 Yarn 版本：

```shell
yarn -v
```

> 1.17.3

查看 Yarn 全局 bin 路径：

```
yarn global bin
```

> /usr/local/bin

查看当前用户的环境变量中的 `$PATH` ：

```shell
echo $PATH
```

> /usr/local/opt/node@10/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin

可见 Yarn 全局 bin 路径在其中，不需要设置。

如果不在其中，则需要手动添加路径至 Zsh 配置文件 `~/.zshrc` 中：

```shell
echo 'export PATH="$PATH:`yarn global bin`"' >> ~/.zshrc
source ~/.zshrc
```

> **Tips:** 如果使用的是 macOS 默认的 bash，则配置文件为 `~/.bash_profile` 。

## 卸载 Yarn

查看当前所有已安装软件包依赖树：

```shell
brew deps --installed --tree
```

> icu4c
>
> node@10
> └── icu4c
>
> yarn
> └── node
>          └── icu4c

可见有共享依赖 `icu4c` ，只卸载 Yarn 软件包：

```shell
brew uninstall yarn
```

## 升级 Yarn

先更新 Homebrew：

```shell
brew update
```

再升级 Yarn：

```shell
brew upgrade yarn
```

## 常见问题

### 找不到命令

macOS 上使用 Homebrew 安装的 Yarn，可能会偶然出现找不到命令的情况（之前正常），此时重新建立一次 Yarn 命令的符号链接即可：

```shell
brew unlink yarn && brew link yarn
```

## 参考文献

- [安装 Yarn](https://yarnpkg.com/zh-Hans/docs/install)

