# Yarn 常用命令

## 安装项目依赖

```shell
# 安装当前目录下 package.json 里面的所有依赖
yarn [install]

# 忽略 NODE_ENV 环境变量，指定是否以生产环境模式安装依赖
yarn [install] --production[=true|false]
```

> **Tips:** 如果 `NODE_ENV` 环境变量设为 `production` ，即以生产环境，Yarn 将不会安装开发依赖 `devDependencies` 。

## 初始化配置文件

```shell
# 通过交互式会话创建一个 package.json 文件
yarn init

# 初始化时自动添加 private: true 到 package.json 中
yarn init --private
```

## 添加本地依赖

```shell
# 添加依赖到 dependencies 中（多个依赖用空格隔开）
yarn add <packages>

# 添加依赖到 devDependencies 中
yarn add <packages> --dev|-D

# 只接受指定版本的依赖
yarn add <packages>@<version|tag> --exact/-E
```

> **TIps:** 
>
> 添加依赖时，会自动更新 `package.json `  文件和 `yarn.lock` 锁文件（如果有）。
>
> 使用 `<packages>@<version|tag>` 指定版本（标签）时，如果该版本的包不存在，会安装最新版本，使用了 `--exact/-E` 之后，如果不存在会报错。

## 移除本地依赖

```shell
yarn remove <packages>
```

## 升级本地依赖

直接升级本地依赖：

```shell
# 升级所有（指定）依赖
yarn upgrade [<packages>]

# 升级指定依赖到指定的版本（标签）
yarn upgrade <packages>@<version|tag>
```

> **Tips:** 没有指定版本时，会根据 `package.json` 中依赖的语义化版本号列出的范围来升级。

列出所有（指定）过期的依赖，让用户手动选择是否升级：

```shell
yarn upgrade-interactive [<packages>]
```

## 查看本地依赖

列出指定层级深度的本地依赖：

```shell
yarn list --depth=<number>
```

> **Tip:** 层级深度从 0 开始。

查看本地依赖的可执行文件（命令）安装位置：

```shell
yarn bin
```

列出 Yarn, Node.js 和当前已安装的所有本地依赖的版本：

```shell
yarn versions
```

## 管理全局依赖

添加/移除/升级全局依赖：

```shell
yarn global add|remove|upgrade|upgrade-interactive [<packages>] [<options>]
```

列出指定层级深度的全局依赖：

```shell
yarn global list --depth=<number>
```

查看全局依赖的可执行文件（命令）安装位置：

```shell
yarn global bin
```

## 执行脚本命令

执行 `package.json` 配置文件中定义在 `scripts` 中指定的脚本命令：

```shell
yarn run <script>
```

## 参考文献

*   [CLI 介绍](https://yarnpkg.com/zh-Hans/docs/cli/)

