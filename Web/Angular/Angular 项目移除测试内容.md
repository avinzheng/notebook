# Angular 项目移除测试内容

## 移除相关依赖

移除 jasmine、karma、protractor 相关依赖：

```shell
yarn remove @types/jasmine @types/jasminewd2 jasmine-core jasmine-spec-reporter karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter protractor
```

## 删除相关文件

删除自动化测试相关文件：

```shell
rm -rf karma.conf.js tsconfig.spec.json e2e src/test.ts src/**/*.spec.ts
```

## 修改 Angular 配置

打开 Angular 配置文件 `angular.json` 。

找到 `projects.<project>.schematics` 配置项，其值替换为：

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

找到 `projects.<project>.architect` 配置项，删除下面 `test` 和 `e2e` 节点内容，其下面 `lint.options.tsConfig` 值替换成 `["tsconfig.app.json"]` 。