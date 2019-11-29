# HTML head 常用标签

## HTTP Headers 相关

### 字符编码

定义文档字符编码：

```html
<!-- HTML5 -->
<meta charset="UTF-8">

<!-- HTML4 -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
```

### 页面刷新

倒计时刷新页面：

```html
<!-- 5s 后刷新页面 -->
<meta http-equiv="refresh" content="5">
```

倒计时跳转页面：

```html
<!-- 10s 后跳转到指定页面 -->
<meta http-equiv="refresh" content="10; url=https://github.com">
```

### DNS 预解析

开启 DNS 预解析，并指定预解析的域名：

```html
<!-- 开启 DNS 预解析 -->
<meta http-equiv="x-dns-prefetch-control" content="on">

<!-- 指定预解析的域名 -->
<link rel="dns-prefetch" href="https://github.com">
```

## SEO 相关

### 页面信息

页面标题：

```html
<title>Title</title>
```

页面关键字（一般不超过 874 个字符）：

```html
<meta name="keywords" content="tagA, tagB, tagC">
```

页面描述（一般不超过 150 个字符）：

```html
<meta name="description" content="About this site">
```

### 搜索引擎

约定搜索引擎爬虫行为：

```html
<!-- 页面可以被索引，页面上链接可以被追踪 -->
<meta name="robots" content="index, follow">

<!-- 页面不可以被索引，页面上链接不可以被追踪 -->
<meta name="robots" content="noindex, nofollow">
```

## 移动设备适配

### 移动视口适配

设置移动设备初始视口大小：

```html
<!-- 页面宽度等于设备宽度，页面不缩放，禁止用户手动缩放 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

### Safari 浏览器

关闭 iOS Safari (UIWebView) 自动识别：

```html
<!-- 关闭数字自动识别为电话号码 -->
<meta name="format-detection" content="telephone=no">

<!-- 关闭邮件地址识别 -->
<meta name="format-detection" content="email=no">
```

Smart App Banner:

```html
<!-- 在页面顶部显示对应的 App 的信息和 AppStore 下载地址 -->
<meta name="apple-itunes-app" content="app-id=MyAppStoreID, affiliate-data=MyAffiliateData, app-argument=MyAppURL">
```

### QQ 浏览器

QQ 浏览器设置：

```html
<!-- QQ 强制竖屏 -->
<meta name="x5-orientation" content="portrait">

<!-- QQ 强制全屏 -->
<meta name="x5-fullscreen" content="true">

<!-- QQ 开启 WebApp 模式 -->
<meta name="x5-page-mode" content="app">
```

### UC 浏览器

UC 浏览器设置：

```html
<!-- UC 强制竖屏 -->
<meta name="screen-orientation" content="portrait">

<!-- UC 强制全屏 -->
<meta name="full-screen" content="yes">

<!-- UC 开启 Web App 模式 -->
<meta name="browsermode" content="application">
```

### 百度移动适配

移动端百度搜索结果跳转适配：

```html
<!-- 禁止百度移动端搜索结果跳转时自动给页面转码 -->
<meta http-equiv="Cache-Control" content="no-siteapp">

<!-- 百度移动端搜索到该结果时，会跳转到对应的移动页面 -->
<meta name="mobile-agent" content="format=html5; url=MobileWebUrl">
```

## PC 浏览器兼容

### 双核浏览器设置

国内双核浏览器设置：

```html
<!-- 默认使用 webkit 内核 -->
<meta name="renderer" content="webkit">

<!-- 默认使用 IE 标准内核（取决于用户电脑的 IE 版本） -->
<meta name="renderer" content="ie-stand">

<!-- 默认使用 IE 兼容内核（即 IE 6/7） -->
<meta name="renderer" content="ie-comp">
```
### IE9 以下浏览器

指定渲染模式：

```html
<!-- 使用当前 IE 版本最高模式渲染 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<!-- 指定 IE 版本模式渲染 -->
<meta http-equiv="X-UA-Compatible" content="IE=6">
```

## 链接外部资源

加载链接的外部资源：

```html
<!-- 加载网站图标 -->
<link rel="icon" href="favicon.ico">

<!-- 加载样式表 -->
<link rel="stylesheet" href="main.css">

<!-- HTML5 加载可执行脚本 -->
<script src="main.js"></script>

<!-- HTML4 加载可执行脚本 -->
<script type="text/javascript" src="javascript.js">
```

## 参考文献

* [HTML（超文本标记语言）](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
* [What does meta http-equiv=“X-UA-Compatible” content=“IE=edge” do?](https://stackoverflow.com/questions/6771258/what-does-meta-http-equiv-x-ua-compatible-content-ie-edge-do)
* [Using meta tags to turn off caching in all browsers?](https://stackoverflow.com/questions/1341089/using-meta-tags-to-turn-off-caching-in-all-browsers)
* [How to prevent caching in Internet Explorer](https://support.microsoft.com/en-us/help/234067/how-to-prevent-caching-in-internet-explorer)
* [Promoting Apps with Smart App Banners](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/PromotingAppswithAppBanners/PromotingAppswithAppBanners.html)

