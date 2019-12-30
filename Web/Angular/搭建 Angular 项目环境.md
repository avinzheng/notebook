# 搭建 Angular 项目环境

## 环境依赖

### Node.js

安装最新版本的 Node.js LTS。

检查 Node.js 版本：

```shell
node -v
```

> v12.13.1

### Yarn

安装最新版本的 Yarn。

检查 Yarn 版本：

```shell
yarn -v
```

> 1.19.1

## 安装配置 Angular CLI

### 安装 Angular CLI

使用 Yarn 全局安装 Angular CLI：

```shell
yarn global add @angular/cli --registry=https://registry.npm.taobao.org
```

查看安装的 Angular CLI 版本：

```shell
ng version
```

> ......
>
> Angular CLI: 8.3.21
> Node: 12.13.1
> OS: darwin x64
> ......

### 配置 Angular CLI

设置 Yarn 为默认 Node.js 包管理工具：

```shell
ng config --global cli.packageManager yarn
```

## 创建 Angular 应用

### 创建应用

创建一个 Angular 应用，并跳过依赖安装：

```shell
ng new <name> --minimal --skipTests --routing --style=scss --skipInstall
```

> **Tips:** 创建的应用将不包含自动化测试，包含路由模块，使用 SCSS ，自带 Git 仓库和初始提交。

进入项目目录，创建 npm 配置文件：

```shell
touch .npmrc
```

插入 npm 配置：

```shell
echo "registry=https://registry.npm.taobao.org" >> .npmrc
```

使用 Yarn 安装依赖：

```shell
yarn --ignore-optional
```

> **Tips:** 忽略可选依赖是为了避免在 macOS 上安装 `fsevents@1.2.7` 依赖时出错。

### 创建远程仓库

在 Git 仓库托管平台（Github、Gitee 等）创建空的 Git 仓库（不勾选初始化）。

进入项目目录，添加远程仓库，并标记为 origin：

```shell
git remote add origin <repository>
```

将本地 master 分支推送到 origin/master，并建立追踪关系：

```shell
git push -u origin master
```

## 代码质量管理

### EditorConfig

在项目根目录创建 EditorConfig 配置文件 `.editorconfig` 并写入配置：

```
# Editor configuration, see https://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
max_line_length = 80
trim_trailing_whitespace = true

[*.md]
max_line_length = off
trim_trailing_whitespace = false
```

### TSLint & Prettier

卸载旧版本的 TSLint：

```shell
yarn remove tslint
```

安装最新版的 TSLint、Prettier 和 TSLint 插件：

```shell
yarn add tslint prettier codelyzer tslint-config-prettier tslint-plugin-prettier --dev --tilde --ignore-optional
```

在项目根目录创建 TSLint 配置文件 `tslint.json` 并写入配置：

```json
{
  "extends": ["tslint:recommended", "tslint-config-prettier"],
  "rules": {
    "array-type": false,
    "arrow-parens": false,
    "deprecation": {
      "severity": "warning"
    },
    "component-class-suffix": true,
    "contextual-lifecycle": true,
    "directive-class-suffix": true,
    "directive-selector": [true, "attribute", "app", "camelCase"],
    "component-selector": [true, "element", "app", "kebab-case"],
    "import-blacklist": [true, "rxjs/Rx"],
    "interface-name": false,
    "max-classes-per-file": false,
    "member-access": false,
    "member-ordering": [
      true,
      {
        "order": [
          "static-field",
          "instance-field",
          "static-method",
          "instance-method"
        ]
      }
    ],
    "no-consecutive-blank-lines": false,
    "no-console": [true, "debug", "info", "time", "timeEnd", "trace"],
    "no-empty": false,
    "no-inferrable-types": [true, "ignore-params"],
    "no-non-null-assertion": true,
    "no-redundant-jsdoc": true,
    "no-switch-case-fall-through": true,
    "no-var-requires": false,
    "object-literal-sort-keys": false,
    "ordered-imports": false,
    "trailing-comma": false,
    "no-conflicting-lifecycle": true,
    "no-host-metadata-property": true,
    "no-input-rename": true,
    "no-inputs-metadata-property": true,
    "no-output-native": true,
    "no-output-on-prefix": true,
    "no-output-rename": true,
    "no-outputs-metadata-property": true,
    "template-banana-in-box": true,
    "template-no-negated-async": true,
    "use-lifecycle-interface": true,
    "use-pipe-transform-interface": true,
    "prettier": [true, { "singleQuote": true }]
  },
  "rulesDirectory": ["codelyzer", "tslint-plugin-prettier"]
}
```

打开 Angular CLI 配置文件 `angular.json` ，找到 `projects.<project>.architect` 节点，其值中插入配置：

```json
"lint": {
  "builder": "@angular-devkit/build-angular:tslint",
  "options": {
    "tsConfig": ["tsconfig.app.json"],
    "exclude": ["**/node_modules/**"]
  }
}
```

### 提交前自动检查

安装 Husky，用于在 Git 提交前添加钩子：

```shell
yarn add husky --dev --tilde --ignore-optional
```

打开 `package.json` ，添加配置：

```json
"husky": {
  "hooks": {
    "pre-commit": "ng lint"
  }
}
```

在 Git 提交前会自动进行 Lint 检查， 不通过会报错阻止提交。

## 参考文献

* [CLI 概览与命令参考手册](https://angular.cn/cli)
* [Usage - TSLint](https://prettier.io/docs/en/install.html)
* [tslint-config-prettier](https://github.com/prettier/tslint-config-prettier)
* [tslint-plugin-prettier](https://github.com/prettier/tslint-plugin-prettier)
* [Husky](https://github.com/typicode/husky)

