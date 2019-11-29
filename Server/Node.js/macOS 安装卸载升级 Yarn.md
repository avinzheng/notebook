# macOS 安装卸载升级 Yarn

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

## 切换 Yarn 源

### 手动切换 Yarn 源

常见 Node.js 软件源：

```shell
# npm（推荐海外使用）
https://registry.npmjs.org/

# taobao（推荐国内使用）
https://registry.npm.taobao.org/
```

手动切换 Yarn 源，如切换至 taobao 镜像源 ：

```shell
yarn config set registry https://registry.npm.taobao.org/
```

查看设置之后的 Yarn 源配置：

```shell
yarn config get registry
```

> https://registry.npm.taobao.org/

### 使用 yrm 切换 Yarn 源

全局安装 yrm ：

```shell
yarn global add yrm
```

列出 yrm 支持的源：

```shell
yrm ls
```

> - npm ---- https://registry.npmjs.org/
>   cnpm --- http://r.cnpmjs.org/
>   taobao - https://registry.npm.taobao.org/
>   nj ----- https://registry.nodejitsu.com/
>   rednpm - http://registry.mirror.cqupt.edu.cn/
>   npmMirror  https://skimdb.npmjs.com/registry/
>   edunpm - http://registry.enpmjs.org/
>   yarn --- https://registry.yarnpkg.com

测试各个源的连接速度：

```shell
yrm test
```

> - npm ---- 494ms
>   cnpm --- 311ms
>   taobao - 110ms
>   nj ----- Fetch Error
>   rednpm - Fetch Error
>   npmMirror  1583ms
>   edunpm - Fetch Error
>   yarn --- Fetch Error

切换至速度最快的的源，如 taobao：

```shel
yrm use taobao
```

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

## 参考文献

- [安装 Yarn](https://yarnpkg.com/zh-Hans/docs/install)

