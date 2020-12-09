# 常用 Gulp 插件

## HTML 文件处理

### [gulp-htmlmin](https://github.com/jonschlinkert/gulp-htmlmin)

压缩处理 HTML 文件，详细参数参数见 [Options Quick Reference](https://github.com/kangax/html-minifier#options-quick-reference) 。

安装：

```shell
yarn add gulp-htmlmin --dev
```

使用：

```javascript
const { src, dest } = require('gulp');
const minifyHtml = require('gulp-htmlmin');

function minifyHtml() {
  const options = {
    collapseWhitespace: true, // 是否将 HTML 代码折叠成一行，默认 false
    removeComments: true // 是否删除注释，默认 false
  };
  return src('./*.html')
    .pipe(minifyHtml(options))
    .pipe(dest('./dist/'));
};
```

### [gulp-processhtml](https://github.com/Wildhoney/gulp-processhtml)

使用 HTML 注释标记替换文档内容，支持 `.hbs/.jsp/.php` 等模板文件 。

安装：

```shell
yarn add gulp-processhtml --dev
```

使用：

```javascript
const { src, dest } = require('gulp');
const processHtml = require('gulp-processhtml');

function processHtml() {
  return src('./index.html')
    .pipe(processHtml())
    .pipe(dest('./dist/'));
}
```

需要处理的文档内容添加标记：

```html
<!DOCTYPE html>
<html>
<head>
  <!-- build:css /css/bundle.css -->
  <link rel="stylesheet" href="/libraries/normalize/normalize.css">
  <link rel="stylesheet" href="/css/screen.css">
  <!-- /build -->
  <!-- build:js /js/bundle.js -->
  <script src="/libraries/jquery/jquery.js"></script>
  <script src="/js/index.js"></script>
  <!-- /build -->
</head>
<body>
  <!-- build:remove -->
  remove
  <!-- /build -->
  <!-- build:replace 'processhtml' -->
  PROCESSHTML
  <!-- /build -->
</body>
</html>
```

处理之后的文档内容：

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/css/bundle.css">
  <script src="/js/bundle.js"></script>
</head>
<body>
  processhtml
</body>
</html>
```

## CSS 文件处理

### [autoprefixer](https://github.com/postcss/autoprefixer)

[PostCSS](https://github.com/postcss/postcss) 插件，用于给 CSS 添加兼容性前缀。

安装：

```shell
yarn add gulp-postcss autoprefixer --dev
```

使用：

```javascript
const { src, dest } = require('gulp');
const postCss = require('gulp-postcss');
const autoPreFixer = require('autoprefixer');

function processCss() {
  const postCssPlugins = [autoPreFixer()];
  return src('./assets/css/*.css', { base: './' })
    .pipe(postCSss(postCssPlugins))
    .pipe(dest('./dist/'));
}
```

使用 [Browserslist](https://github.com/browserslist/browserslist) 来配置浏览器支持列表，可在项目根目录中添加 `.browserslistrc` 配置文件：

```ini
# Browsers that we support
# https://github.com/browserslist/browserslist

last 2 version
> 1%
IE 11
```

### [postcss-url](https://github.com/postcss/postcss-url)

[PostCSS](https://github.com/postcss/postcss) 插件，用于处理 CSS 文件中使用 `url()` 引用的文件（SVG 或者媒体文件）。可以自动修改引用文件路径，引用文件的文件名换成 Hash，内联引用文件。

安装：

```shell
yarn add gulp-postcss postcss-url --dev
```

自动修改引用文件路径：

```javascript
/**
 * 处理前文件目录：
 *    ./assets/css/*.css
 *    ./assets/icons/icon.svg
 * 处理后文件目录：
 *    ./dist/assets/*.css
 *    ./dist/assets/icons/icon.svg
 * 处理前引用路径：background-image: url('../icons/icon.svg');
 * 处理后引用路径：background-image: url('icons/icon.svg');
 */
const { src, dest } = require('gulp');
const postCss = require('gulp-postcss');
const postUrl = require('postcss-url');

function processCss() {
  const postUrlOptions = { url: 'rebase' };

  const postCssPlugins = [postUrl(postUrlOptions)];

  const postCssOptions = {
    from: './assets/css/*.css',
    to: './dist/assets/*.css'
  };

  return src('./assets/css/*.css', { base: './' })
    .pipe(postCSss(postCssPlugins, postCssOptions))
    .pipe(dest('./dist/'));
}
```

引用文件的文件名换成 Hash：

```javascript
/**
 * 处理前文件目录：
 *    ./assets/css/*.css
 *    ./assets/icons/icon.svg
 * 处理后文件目录：
 *    ./dist/assets/css/*.css
 *    ./dist/assets/icons/a34223d4.svg
 * 处理前引用路径：background-image: url('../icons/icon.svg');
 * 处理后引用路径：background-image: url('../icons/a34223d4.svg');
 */
const { src, dest } = require('gulp');
const postCss = require('gulp-postcss');
const postUrl = require('postcss-url');

function processCss() {
  const postUrlOptions = {
    url: 'copy',
    useHash: true,
    basePath: '../icons/', // 需要处理的引用文件路径，相对于 PostCSS 选项中的 'from'
    assetsPath: '../icons/', // 处理后存放引用文件路径，相对于 PostCSS 选项中的 'to'
  };

  const postCssPlugins = [postUrl(postUrlOptions)];

  const postCssOptions = {
    from: './assets/css/*.css',
    to: './dist/assets/css/*.css'
  };

  return src('./assets/css/*.css', { base: './' })
    .pipe(postCSss(postCssPlugins, postCssOptions))
    .pipe(dest('./dist/'));
}
```

内联文件：

```javascript
const { src, dest } = require('gulp');
const postCss = require('gulp-postcss');
const postUrl = require('postcss-url');

function processCss() {
  const postUrlOptions = {
    url: 'inline',
    encodeType: 'base64', // 编码方式
    maxSize: 6 * 1024 // 最大文件大小
  };

  const postCssPlugins = [postUrl(postUrlOptions)];

  return src('./assets/css/*.css', { base: './' })
    .pipe(postCSss(postCssPlugins))
    .pipe(dest('./dist/'));
}
```

### [cssNano](https://github.com/cssnano/cssnano)

[PostCSS](https://github.com/postcss/postcss) 插件，用于模块化压缩 CSS 文件。

安装：

```shell
yarn add gulp-postcss cssnano --dev
```

使用：

```javascript
const { src, dest } = require('gulp');
const postCss = require('gulp-postcss');
const cssNano = require('cssnano');

function processCss() {
  const postCssPlugins = [cssNano()];
  return src('./assets/css/*.css', { base: './' })
    .pipe(postCSss(postCssPlugins))
    .pipe(dest('./dist/'));
}
```

## JS 文件处理

### [gulp-uglify](https://github.com/terinjokes/gulp-uglify)

压缩 JS 文件。

安装：

```shell
yarn add gulp-uglify --dev
```

使用：

```javascript
const { src, dest } = require('gulp');
const postCss = require('gulp-postcss');
const minifyJs = require('gulp-uglify');

function processJs() {
  return src('./assets/js/*.js', { base: './' })
    .pipe(minifyJs())
    .pipe(dest('./dist/'));
}
```

## 通用文件处理

### [gulp-rev](https://github.com/sindresorhus/gulp-rev)

文件名添加 Hash。

安装：

```shell
yarn add gulp-rev --dev
```

使用：

```javascript
const { src, dest } = require('gulp');
const rev = require('gulp-rev');

function processJs() {
  return src('./assets/js/*.js', { base: './' })
    .pipe(rev())
    .pipe(dest('./dist/'));
}
```

### [gulp-rev-rewrite](https://github.com/TheDancingCode/gulp-rev-rewrite)

根据配合 `gulp-rev` 生成的 manifest 文件替换文件引用。

安装：

```shell
yarn add gulp-rev gulp-rev-rewrite --dev
```

使用：

```javascript
const { src, dest } = require('gulp');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');

const revManifest = './dist/rev-manifest.json';
const revOptions = {
  base: './dist/', // manifest 文件路径
  merge: true // 当已有 mainifest 文件时，合并文件
};

function processCss() {
  return src('./assets/css/*.css', { base: './' })
    .pipe(rev())
    .pipe(dest('./dist/'))
    .pipe(rev.manifest(revManifest, revOptions))
    .pipe(dest('./dist/'));
}

function processJs() {
  return src('./assets/js/*.js', { base: './' })
    .pipe(rev())
    .pipe(dest('./dist/'))
    .pipe(rev.manifest(revManifest, revOptions))
    .pipe(dest('./dist/'));
}

function reWriteRefs() {
  return src('./dist/index.html')
    .pipe(revRewrite({ manifest: src(revManifest) }))
    .pipe(dest('./dist/'));
}
```

### [gulp-zip](https://github.com/sindresorhus/gulp-zip)

将目录或文件打包成 zip 压缩包。

安装：

```shell
yarn add gulp-zip --dev
```

使用：

```javascript
const { src, dest } = require('gulp');
const zip = require('gulp-zip');

function zipper() {
  return src('./dist/**/*.*')
    .pipe(zip('dist.zip'))
    .pipe(dest('./zip/'));
}
```

