# 搭建 Ionic & Angular 项目环境

## 创建 Ionic 应用

### 创建 Ionic 应用

创建一个空白应用，并跳过依赖安装：

```shell
ionic start <app> blank --cordova --type=angular --no-deps
```

> **Tips**: 创建的应用使用 Cordova 平台，使用 Angular 框架，并自带 Git 仓库。

进入应用目录，创建 npm 配置文件：

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

### 配置 Git 仓库

在 Git 仓库托管平台（Github、Gitee 等）创建空的 Git 仓库（不勾选初始化）。

进入应用目录，添加远程仓库，并标记为 origin：

```shell
git remote add origin <repository>
```

将本地 master 分支推送到 origin/master，并建立追踪关系：

```shell
git push -u origin master
```

### 配置 Angular CLI

使用 Yarn 全局安装 Angular CLI：

```shell
yarn global add @angular/cli
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

设置 Yarn 为默认 Node.js 包管理工具：

```shell
ng config --global cli.packageManager yarn
```

### 安装依赖

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

## 移除测试内容

### 移除相关依赖

移除 jasmine、karma、protractor 相关依赖：

```shell
yarn remove @types/jasmine @types/jasminewd2 jasmine-core jasmine-spec-reporter karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter protractor
```

### 删除相关文件

```shell
rm -rf karma.conf.js tsconfig.spec.json e2e src/test.ts src/**/*.spec.ts
```

### 修改 Angular 配置

打开 Angular 配置文件 `angular.json` 。

找到 `projects.app.schematics` 配置项，其值替换为：

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
  }
}
```

找到 `projects.app.architect` 配置项，删除下面 `test` 和 `e2e` 节点内容，其下面 `lint.options.tsConfig` 值替换成 `["tsconfig.app.json"]` 。

找到 `schematics` 配置项，其值改为：

```json
{
  "@ionic/angular-toolkit:component": {
    "styleext": "scss",
    "spec": false
  },
  "@ionic/angular-toolkit:page": {
    "styleext": "scss",
    "spec": false
  },
  "@ionic/angular-toolkit:class": {
    "spec": false
  },
  "@ionic/angular-toolkit:directive": {
    "spec": false
  },
  "@ionic/angular-toolkit:guard": {
    "spec": false
  },
  "@ionic/angular-toolkit:module": {
    "spec": false
  },
  "@ionic/angular-toolkit:pipe": {
    "spec": false
  },
  "@ionic/angular-toolkit:service": {
    "spec": false
  }
}
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

卸载旧版本的 TSLint 和 codelyzer：

```shell
yarn remove tslint codelyzer
```

安装最新版的 TSLint、Prettier 和 TSLint 插件：

```shell
yarn add tslint prettier codelyzer tslint-config-prettier tslint-plugin-prettier --dev --tilde --ignore-optional
```

在项目根目录创建 TSLint 配置文件 `tslint.json` 并写入配置：

```json
{
  "extends": ["tslint:recommended", "tslint-config-prettier"],
  "rulesDirectory": ["codelyzer", "tslint-plugin-prettier"],
  "rules": {
    "array-type": false,
    "arrow-parens": false,
    "deprecation": {"severity": "warn"},
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
    "no-output-on-prefix": true,
    "no-inputs-metadata-property": true,
    "no-host-metadata-property": true,
    "no-input-rename": true,
    "no-output-rename": true,
    "use-lifecycle-interface": true,
    "use-pipe-transform-interface": true,
    "one-variable-per-declaration": false,
    "component-class-suffix": [true, "Page", "Component"],
    "directive-class-suffix": true,
    "directive-selector": [true, "attribute", "app", "camelCase"],
    "component-selector": [true, "element", "app", "page", "kebab-case"],
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

> **Tips:** Prettier 配置如果放在 `tslint.json` 中会导致 IDE 的 Prettier 插件无法识别出来。

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

* [Ionic CLI](https://ionicframework.com/docs/cli)
* [CLI 概览与命令参考手册](https://angular.cn/cli)
* [Usage - TSLint](https://prettier.io/docs/en/install.html)
* [tslint-config-prettier](https://github.com/prettier/tslint-config-prettier)
* [tslint-plugin-prettier](https://github.com/prettier/tslint-plugin-prettier)
* [Husky](https://github.com/typicode/husky)

