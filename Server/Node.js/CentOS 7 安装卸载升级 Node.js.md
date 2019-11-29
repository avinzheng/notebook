# CentOS 7 安装卸载升级 Node.js

## 安装 Node.js

查看  [Node.js LTS 计划](https://nodejs.org/en/about/releases/) ，确定要安装的 Node.js 版本（推荐安装 Node.js Active LTS 版本）。

使用 NodeSource 分发的 RPM 软件包安装 Node.js（如 v10.x 版本）：

```shell
# 添加 yum 源配置
curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -

# 使用 yum 安装
sudo yum -y install nodejs

# 安装 nodejs native addons 构建工具
sudo yum -y install gcc-c++ make
```

查看安装的 Node.js 版本：

```shell
node -v
```

> v10.16.3

## 卸载 Node.js

### 使用 yum 卸载

使用 yum 卸载 Node.js：

```shell
sudo yum -y remove nodejs
```

### 重建 yum 缓存

查看缓存的 yum repo 列表：

```shell
ls -l /etc/yum.repos.d/
```

> …...
>
> -rw-r--r--  1 root root  474 4月  24 2018 nodesource-el7.repo
>
> …...

删除含有 `nodesource` 关键词的 repo：

```shell
sudo rm -rf /etc/yum.repos.d/nodesource-el7.repo
```

清除 yum 缓存：

```shell
sudo yum clean all
```

删除 yum 缓存文件夹：

```shell
sudo rm -rf /var/cache/yum
```

## 升级 Node.js

先卸载 Node.js，再安装新版即可。

## 参考文献

- [Node.js Binary Distributions](https://github.com/nodesource/distributions)

