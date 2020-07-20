# CentOS7 安装卸载升级 Yarn

## 安装 Yarn

### 使用 yum 安装 Yarn

Yarn 官方提供的有 Yarn RPM 软件包，在添加 yum 源配置之后可使用 yum 安装：

```shell
# 添加 yum 源配置
curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo

# 使用 yum 安装
sudo yum -y install yarn
```

查看安装的 Yarn 版本：

```shell
yarn -v
```

> 1.19.0

### 设置 Yarn 全局 bin 路径

查看当前 Yarn 全局 bin 路径：

```shell
yarn global bin
```

使用 root 用户安装的 Yarn 全局 bin 路径一般为公共路径 `/usr/local/bin` ，无需设置。

使用非 root 用户安装的 Yarn 全局 bin 路径一般在该用户家目录中，如 `/home/<user>/.yarn/bin` ，建议改为公共路径 `/usr/local/bin`：

```shell
yarn config set prefix /usr/local --global
```

查看设置后的全局 bin 路径：

```shell
yarn global bin
```

> /usr/local/bin

> **Tips:** 修改 Yarn 全局 bin 路径为公共路径 `/usr/local/bin` 之后，使用非 root 用户全局安装卸载 Node.js 软件包需要使用 sudo 命令（root 权限）。

### 设置 Yarn 环境变量

查看当前用户的环境变量中的 `$PATH` ：

```shell
echo $PATH
```

> /usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin

可见 Yarn 全局 bin 路径在其中，无需设置。

如果不在其中，需要手动添加路径至 Bash 配置文件 `~/.bash_profile` 中：

```shell
echo 'export PATH="$PATH:`yarn global bin`"' >> ~/.bash_profile
source ~/.bash_profile
```

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
sudo yarn global add yrm
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

### 使用 yum 卸载

使用 yum 卸载 Node.js：

```shell
sudo yum -y remove yarn
```

### 重建 yum 缓存

查看缓存的 yum repo 列表：

```shell
ls -l /etc/yum.repos.d/
```

> …...
>
> -rw-r--r--  1 root root  130 9月  30 09:18 yarn.repo
>
> …...

删除含有 `yarn` 关键词的 repo：

```shell
sudo rm -rf /etc/yum.repos.d/yarn.repo
```

清除 yum 缓存：

```shell
sudo yum clean all
```

删除 yum 缓存文件夹：

```shell
sudo rm -rf /var/cache/yum
```

重建 yum 缓存：

```shell
yum makecache
```

## 升级 Yarn

先卸载 Yarn，再安装新版即可。

## 参考文献

* [Installation](https://yarnpkg.com/en/docs/install#centos-stable)