# iOS Safari Web App 配置

## 全屏模式

手动开启页面全屏模式：

```html
<!-- 开启全屏模式 -->
<meta name="apple-mobile-web-app-capable" content="yes">
```

> **Tips:** 可使用 JS 的 `window.navigator.standalone` 属性来查看是否开启了全屏模式。

## 状态栏

全屏模式下可设置状态栏样式：

```html
<!-- 默认状态栏 -->
<meta name="apple-mobile-web-app-status-bar-style" content="default">

<!-- 黑色状态栏 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black">

<!-- 沉浸式黑色半透明状态栏 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```

## Web Clips

Web Clips 图标配置（必须 PNG 格式）：

```html
<!-- iPhone: 120px & 180px -->
<link rel="apple-touch-icon" sizes="120x120" href="apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon-180x180.png">

<!-- iPad Pro: 167px -->
<link rel="apple-touch-icon" sizes="167x167" href="apple-touch-icon-167x167.png">

<!-- iPad, iPad mini: 152px -->
<link rel="apple-touch-icon" sizes="152x152" href="apple-touch-icon-152x152.png">
```

Web Clips 图标下方标题配置：

```html
<!-- 默认使用 title 内容 -->
<title>App Name</title>

<!-- 手动指定不同内容 -->
<meta name="apple-mobile-web-app-title" content="App Name">
```

## 链接应用

使用链接调用系统应用：

```html
<!-- Email -->
<a href="mailto:user@example.com">Email</a>

<!-- Phone call -->
<a href="tel:1-408-555-5555">Phone Call</a>

<!-- SMS -->
<a href="sms:">Launch Messages App</a>
<a href="sms:1-408-555-1212">New SMS Message</a>

<!-- FaceTime video calls -->
<a href="facetime:14085551234">FaceTime Video Call</a>
<a href="facetime:user@example.com">FaceTime Video Call</a>

<!-- FaceTime audio calls -->
<a href="facetime-audio:14085551234">FaceTime Audio Call</a>
<a href="facetime-audio:user@example.com">FaceTime Audio Call</a>
```

> **Tips:**
>
> iOS Safari 会自动识别电话号码和邮件地址字符并添加链接，可手动关闭：
>
> ```html
> <!-- 忽略数字自动识别为电话号码 -->
> <meta name="format-detection" content="telephone=no">
> 
> <!-- 忽略邮件地址识别 -->
> <meta name="format-detection" content="email=no">
> ```

## 参考文献

* [Supported Meta Tags](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html)
* [Configuring Web Applications](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
* [App Icon](https://developer.apple.com/design/human-interface-guidelines/ios/icons-and-images/app-icon/)
* [About Apple URL Schemes](https://developer.apple.com/library/archive/featuredarticles/iPhoneURLScheme_Reference/Introduction/Introduction.html#//apple_ref/doc/uid/TP40007899-CH1-SW1)