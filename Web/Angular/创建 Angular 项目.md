# 创建 Angular 项目

## 环境依赖

### Node.js

安装最新版本的 Node.js LTS。

检查 Node.js 版本：

```shell
node -v
```

> v12.18.1

### Yarn

安装最新版本的 Yarn。

检查 Yarn 版本：

```shell
yarn -v
```

> 1.22.4

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
> Angular CLI: 10.0.5
> Node: 12.18.1
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
ng new <name> --routing --style=scss --skipInstall --strict
```

> **Tips:** 创建的应用将包含路由模块，使用 SCSS ，跳过依赖安装，启用 TypeScript 严格模式，自带 Git 仓库和初始提交。

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
yarn
```

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

## 移除测试内容

如果项目不需要 E2E 测试和单元测试，可以移除相关依赖和文件。

### 移除相关依赖

移除 jasmine、karma、protractor 相关依赖：

```shell
yarn remove @types/jasmine @types/jasminewd2 jasmine-core jasmine-spec-reporter karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter protractor
```

### 删除相关文件

删除自动化测试相关文件：

```shell
rm -rf karma.conf.js tsconfig.spec.json e2e src/test.ts src/**/*.spec.ts
```

### 修改 Angular 配置

打开 Angular 配置文件 `angular.json` ，找到 `projects.<project>.schematics` 配置项，其值替换为：

```json
{
  "@schematics/angular:component": {
    "style": "scss",
    "skipTests": true
  },
  "@schematics/angular:class": {
    "skipTests": true
  },
  "@schematics/angular:directive": {
    "skipTests": true
  },
  "@schematics/angular:guard": {
    "skipTests": true
  },
  "@schematics/angular:module": {
    "skipTests": true
  },
  "@schematics/angular:pipe": {
    "skipTests": true
  },
  "@schematics/angular:service": {
    "skipTests": true
  },
  "@schematics/angular:application": {
    "strict": true
  }
}
```

找到 `projects.<project>.architect` 配置项，删除下面 `test` 和 `e2e` 节点内容，其下面 `lint.options.tsConfig` 值替换成 `["tsconfig.app.json"]` 。

## 代码质量管理

### Prettier

如需格式化代码，让所有代码风格保持一致，可安装最新版的 Prettier 和 TSLint 插件：

```shell
yarn add prettier tslint-config-prettier tslint-plugin-prettier --dev --tilde
```

在 TSLint 配置文件 `tslint.json` 中添加对应配置：

```json
{
  "extends": ["tslint:recommended", "tslint-config-prettier"],
  "rulesDirectory": ["codelyzer", "tslint-plugin-prettier"],
  "rules": {
    "prettier": true
  }
}
```

在项目根目录创建 Prettier 配置文件 `.prettierrc` 并写入配置：

```json
{
  "singleQuote": true
}
```

> **Tips:** Prettier 配置如果放在 `tslint.json` 中会导致 Webstorm Prettier 插件无法识别出来。

### Husky

如需在 Git 提交前强制进行 Lint 检查，可安装 Husky 在 Git 提交前添加钩子：

```shell
yarn add husky --dev --tilde
```

打开 `package.json` ，添加配置：

```json
"husky": {
  "hooks": {
    "pre-commit": "ng lint"
  }
}
```

在 Git 提交前会自动进行 Lint 检查，不通过会报错阻止提交。

## 参考文献

* [CLI 概览与命令参考手册](https://angular.cn/cli)
* [Usage - TSLint](https://prettier.io/docs/en/install.html)
* [tslint-config-prettier](https://github.com/prettier/tslint-config-prettier)
* [tslint-plugin-prettier](https://github.com/prettier/tslint-plugin-prettier)
* [Husky](https://github.com/typicode/husky)

