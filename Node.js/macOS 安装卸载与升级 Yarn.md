# Yarn on macOS

## 安装 Yarn

### 使用 Homebrew 安装

```shell
brew install --ignore-dependencies yarn
```

查看安装的 Yarn 版本：

```shell
yarn -v
```

> 1.17.3

### 配置环境变量

查看 Yarn 全局命令软链路径：

```
yarn global bin
```

> /usr/local/bin

查看当前用户的环境变量中的 `$PATH` ：

```shell
echo $PATH
```

> /usr/local/opt/node@10/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin

可见 Yarn 全局命令软链路径在其中，否则需要手动添加路径至 Zsh 配置文件 `~/.zshrc` 中：

```shell
echo 'export PATH="$PATH:`yarn global bin`"' >> ~/.zshrc
source ~/.zshrc
```

> **Tips:**如果使用的是 macOS 默认的 bash，则配置文件为 `~/.bash_profile` 。

### 切换 Yarn 源

使用 yrm 来管理 Yarn registry：

```shell
yarn global add yrm
```

更换至 taobao 的源：

```shel
yrm use taobao
```

查看更换后的源：

```shell
yarn config get registry
```

> https://registry.npm.taobao.org/

> **Tips:** 
>
> 如果 yrm 安装失败，可先手动设置 registry 为淘宝镜像：
>
> ```shell
> yarn config set registry https://registry.npm.taobao.org/
> ```
>

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

升级 Yarn：

```shell
brew upgrade yarn
```

## 参考文献

- [安装 Yarn](https://yarnpkg.com/zh-Hans/docs/install)

