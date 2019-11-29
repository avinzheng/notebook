# CSS 常用三栏布局

## 布局方案对比

| 布局名称     | 兼容性 | 清除浮动 | 渲染顺序   |
| ------------ | ------ | -------- | ---------- |
| 圣杯布局     | IE6    | 需要     | 中间栏最先 |
| 双飞翼布局   | IE6    | 需要     | 中间栏最先 |
| 混合浮动布局 | IE6    | 需要     | 中间栏最后 |
| 弹性布局     | IE11   | 不需要   | 正常顺序   |

> **Tips:** 以上布局方案均为解决 **“中间栏宽度自适应，两边栏定宽”** 的布局问题，可推广至两栏自适应布局。

## 布局方案明细

### 圣杯布局

HTML:

```html
<header class="header">Header</header>
<main class="clearfix main">
  <article class="fl center">Center</article>
  <aside class="fl left">Left</aside>
  <aside class="fl right">Right</aside>
</main>
<footer class="footer">Footer</footer>
```

CSS:

```css
.clearfix {
  zoom: 1;
}
.clearfix:after {
  content: "";
  display: block;
	height: 0;
  line-height: 0;
	visibility: hidden;
	clear: both;
}
.fl {
  float: left;
}

.main {
  padding: 0 150px 0 200px; /* 左右内边距值分别为左右栏宽度 */
	min-width: 350px; /* 注意容错，至少为左右栏宽度之和 */
  background: red;
}
.center {
  width: 100%;
  min-height: 100px;
  background: green;
}
.left {
  left: -200px; /* 等于自身宽度 */
  margin-left: -100%;
  width: 200px;
  min-height: 100px;
  background: yellow;
}
.right {
  margin-right: -150px; /* 等于自身宽度 */
  width: 150px;
  min-height: 100px;
  background: blue;
}
.header,
.footer {
  background: grey;
}
```

调整三栏间距：

```css
/* 三栏间距 20px */
.main {
  padding: 0 170px 0 220px;
}
.left {
  left: -220px;
}
.right {
  right: -20px;
}
```

### 双飞翼布局

HTML:

```html
<header class="header">Header</header>
<main class="clearfix main">
  <article class="center-wrap">
    <div class="fl center">Center</div>
  </article>
  <aside class="fl left">Left</aside>
  <aside class="fl right">Right</aside>
</main>
<footer class="footer">Footer</footer>
```

CSS:

```css
.clearfix {
  zoom: 1;
}
.clearfix:after {
  content: "";
  display: block;
	height: 0;
  line-height: 0;
	visibility: hidden;
	clear: both;
}
.fl {
  float: left;
}

.main {
  background: red;
}
.center-wrap {
  width: 100%;
  min-width: 350px; /* 注意容错，至少为左右栏宽度之和 */
}
.center {
  margin: 0 150px 0 200px; /* 左右外边距等于左右栏宽度 */
  min-height: 100px;
  background: green;
}
.left {
  margin-left: -100%;
  width: 200px;
  min-height: 100px;
  background: yellow;
}
.right {
  margin-left: -150px; /* 等于自身宽度 */
  width: 150px;
  min-height: 100px;
  background: blue;
}
.header, 
.footer {
  background: grey;
}
```

调整三栏间距：

```css
/* 三栏间距 20px */
.center {
	margin: 0 170px 0 220px;
}
```

### 混合浮动布局

HTML:

```html
<header class="header">Header</header>
<main class="clearfix main">
  <aside class="fl left">Left</aside>
  <aside class="fr right">Right</aside>
  <article class="center">Center</article>
</main>
<footer class="footer">Footer</footer>
```

CSS:

```css
.clearfix {
  zoom: 1;
}
.clearfix:after {
  content: "";
  display: block;
	height: 0;
  line-height: 0;
	visibility: hidden;
	clear: both;
}
.fl {
  float: left;
}
.fr {
  float: right;
}

.main {
	min-width: 350px; /* 注意容错，至少为左右栏宽度之和 */
  background: red;
}
.left {
  width: 200px;
  min-height: 100px;
  background: yellow;
}
.right {
  width: 150px;
  min-height: 100px;
  background: blue;
}
.center {
  margin: 0 150px 0 200px; /* 左右外边距等于左右栏宽度 */
  min-height: 100px;
  background: green;
}
.header, 
.footer {
  background: grey;
}
```

调整三栏间距：

```css
/* 三栏间距 20px */
.center {
  margin: 0 170px 0 220px;
}
```

### 弹性布局

HTML:

```html
<header class="header">Header</header>
<main class="main">
  <aside class="left">Left</aside>
  <article class="center">Center</article>
  <aside class="right">Right</aside>
</main>
<footer class="footer">Footer</footer>
```

CSS:

```css
.main {
  display: flex;
	min-width: 350px; /* 注意容错，至少为左右栏宽度之和 */
  background: red;
}
.left {
  width: 200px;
  min-height: 100px;
  background: yellow;
}
.right {
  width: 150px;
  min-height: 100px;
  background: blue;
}
.center {
  flex: 1;
  min-height: 100px;
  background: green;
}
.header, 
.footer {
  background: grey;
}
```

调整三栏间距：

```css
/* 三栏间距 20px */
.center {
	margin: 0 20px;
}
```

## 参考文献

* [In Search of the Holy Grail](https://alistapart.com/article/holygrail)