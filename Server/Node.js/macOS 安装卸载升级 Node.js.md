# macOS 安装卸载升级 Node.js

## 安装 Node.js

### 使用 Homebrew 安装

搜索 Homebrew 支持的 Node.js 软件包方案：

```shell
brew search node
```

> leafnode            llnode              node-build          node@8              nodebrew            nodenv
> libbitcoin-node     node                node@10         node_exporter       nodeenv

推荐安装最新的 LTS 版本，即 `node@10` ：

```
brew install node@10
```

> **Tips:** [Node.js LTS 计划](https://nodejs.org/en/about/releases/) 。

### 配置环境变量

添加环境变量到 Zsh 配置文件 `~/.zshrc` 中，并重新执行配置文件：

```shell
echo 'export PATH="/usr/local/opt/node@10/bin:$PATH"' >> ~/.zshrc
echo 'export LDFLAGS="-L/usr/local/opt/node@10/lib"' >> ~/.zshrc
echo 'export CPPFLAGS="-I/usr/local/opt/node@10/include"' >> ~/.zshrc
source ~/.zshrc
```

> **Tips:** 如果使用的是 macOS 默认的 bash，对应配置文件为 `~/.bash_profile` 。

查看安装的 Node.js 版本号：

```shell
node -v
```

> v10.16.1

## 卸载 Node.js

### 卸载软件包

查看当前所有已安装软件包依赖树：

```shell
brew deps --installed --tree
```

> node@10
> └── icu4c

可见当前安装的 Node.js 软件包方案为 `node@10` ，其依赖为 `icu4c` ，且无共享依赖。

卸载软件包和对应的依赖：

```shell
brew uninstall node@10 icu4c
```

### 删除环境变量

进入 Zsh 配置文件：

```shell
vim ~/.zshrc
```

找到并删除以下环境变量配置：

```shell
export PATH="/usr/local/opt/node@10/bin:$PATH"
export LDFLAGS="-L/usr/local/opt/node@10/lib"
export CPPFLAGS="-I/usr/local/opt/node@10/include"
```

> **Tips:** 如果使用的是 macOS 默认的 bash，对应配置文件为 `~/.bash_profile` 。

## 升级 Node.js

### 兼容升级

查看当前已安装的所有软件包方案：

```shell
brew ls
```

> icu4c	node@10

可见当前安装的 Node.js 软件包方案为 `node@10` 。

如果是兼容升级第二、三位版本号：

```shell
brew upgrade node@10
```

### 不兼容升级

先卸载已安装的 Node.js 软件包方案，再安装新的方案。

## 参考文献

- [Installing Node.js via package manager](https://nodejs.org/en/download/package-manager/)

