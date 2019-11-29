# MacOS 安装配置 Ghost

## 准备工作

* [支持的 Node.js 版本](https://ghost.org/faq/node-versions/)（推荐 node@10）
* 安装 Yarn 并设置源为 taobao 镜像源

## 安装 Ghost CLI

使用 Yarn 全局安装 Ghost-CLI：

```shell
yarn global add ghost-cli@latest
```

查看当前安装的 Ghost-CLI 版本：

```shell
ghost -v
```

> Ghost-CLI version: 1.11.0

## 安装 Ghost

使用终端工具进入要安装 Ghost 的目录中：

```shell
cd <path>
```

在当前目录安装最新版 Ghost：

```shell
ghost install local
```

> **Tips:** 此命令下安装的 Ghost 为`development` 模式，且使用 SQLite3 数据库。

> **Tips:** 如需指定版本安装：
>
> ```shell
> # 指定版本号安装
> ghost install <version> --local
> 
> # 指定 v2.x 最高版本
> ghost install 2.37.0 --local
> ```

等待安装完成后，检查当前安装的 Ghost 版本：

```shell
ghost -v
```

> Ghost-CLI version: 1.11.0
> Ghost version: 2.31.1 (at ~/Dev/ghost)

## 配置 Ghost

安装完成后，会自动启动 Ghost，使用浏览器访问 `http://localhost:2368/ghost/` ，根据提示注册管理员账号。

## 管理 Ghost

查看已安装的 Ghost 列表：

```shell
ghost ls
```

启动 Ghost：

```shell
# 当前目录下安装的 Ghost
ghost start

# 任意目录下指定 name 启动
ghost start <name>
```

关闭 Ghost：

```shell
# 当前目录下安装的 Ghost
ghost stop

# 任意目录下指定 name 关闭
ghost stop <name>
```

重启 Ghost：

```shell
# 当前目录下安装的 Ghost
ghost restart

# 任意目录下指定 name 重启
ghost restart <name>
```

## 参考文献

* [Ghost CLI](https://ghost.org/docs/api/v2/ghost-cli/)
* [How to install Ghost locally](https://ghost.org/docs/install/local/)