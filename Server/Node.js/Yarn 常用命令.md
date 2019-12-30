# Yarn 常用命令

## 初始化配置文件

```shell
# 通过交互式会话在本地创建一个 package.json 文件
yarn init

# 初始化时自动添加 private: true 到 package.json 中
yarn init --private
```

## 本地软件包管理

### 安装本地依赖

```shell
# 安装当前目录下 package.json 里面的所有依赖
yarn [install]

# 忽略 NODE_ENV 环境变量，指定是否以 production 模式安装依赖
# production 模式不安装 devDependencies
yarn [install] --production|--prod
yarn [install] --production=false

# 安装依赖时，忽略可选依赖
yarn [install] --ignore-optional

# 从 “淘宝 NPM 镜像” 安装依赖
yarn [install] --registry=https://registry.npm.taobao.org
```

> **Tips:** 如果 `NODE_ENV` 环境变量设为 `production` ，即以生产环境，Yarn 将不会安装开发依赖 `devDependencies` 。

### 添加本地依赖

```shell
# 添加依赖到 dependencies 中
# 多个依赖用空格隔开
# 依赖使用 ^ 固定主版本号
yarn add <packages>

# 添加指定版本号或标签的依赖
yarn add <packages>@<version|tag>

# 添加依赖时，使用 ~ 固定主版本号和次版本号
yarn add <packages> --tilde|-T

# 添加依赖时，固定主版本号、次版本号和修订号
yarn add <packages> --exact/-E

# 添加依赖到 devDependencies 中
yarn add <packages> --dev|-D

# 从 “淘宝 NPM 镜像” 安装依赖
yarn add <packages> --registry=https://registry.npm.taobao.org
```

> **TIps:** 
>
> 添加依赖时，会自动更新 `package.json `  文件和 `yarn.lock` 锁文件（如果有）。
>
> 使用 `<packages>@<version|tag>` 指定版本（标签）时，如果该版本的包不存在，会直接安装最新版本，使用了 `--exact/-E` 之后，如果不存在会报错。

### 移除本地依赖

```shell
yarn remove <packages>
```

### 升级本地依赖

直接升级本地依赖：

```shell
# 根据依赖的语义化版本升级所有（指定）依赖
yarn upgrade [<packages>]

# 升级指定依赖到指定的版本（标签）
yarn upgrade <packages>@<version|tag>
```

> **Tips:** 升级后会自动更新 `yarn.lock` 文件。

列出所有（指定）过期的依赖，让用户手动选择是否升级：

```shell
yarn upgrade-interactive [<packages>]
```

### 查看本地依赖

查看本地依赖的可执行文件（命令）安装位置：

```shell
yarn bin
```

列出 Yarn, Node.js 和当前已安装的所有本地依赖的版本：

```shell
yarn versions
```

列出本地依赖关系：

```shell
# 按照深度列出本地依赖关系（从 0 开始）
yarn list --depth=<number>

# 列出包含关键词的本地依赖关系
yarn list --pattern=<keyword>
```

查看一个包被谁依赖：

```shell
yarn why <package>
```

## 全局软件包管理

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
# 执行单个命令
yarn run <script>

# 并发（异步）执行多个命令
yarn run <script1> & yarn run <script2> & ...

# 继发（同步）执行多个命令
yarn run <script1> && yarn run <script2> && ...
```

## Yarn 配置管理

### 设置配置项

```shell
yarn config set <key> <value>
```

> **Tips:** 设置的配置项会被保存在当前用户的 Yarn 配置文件 `~/.yarnrc` 中。

### 删除配置项

删除指定的配置项：

```shell
yarn config delete <key>
```

> **Tip:** 该命令只能删除当前用户 Yarn 配置文件 `~/.yarnrc` 中的配置项。

### 查看配置项

查看指定配置项：

```shell
yarn config get <key>
```

列出所有配置项：

```shell
yarn config list
```

> **Tips:** 配置项权重顺序为 `./.yarnrc` > `~/.yarnrc` > `./.npmrc` > `~/.npmrc` > Yarn 默认值。

## 参考文献

*   [CLI 介绍](https://yarnpkg.com/zh-Hans/docs/cli/)

