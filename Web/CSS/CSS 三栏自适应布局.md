# CSS 三栏自适应布局

## 布局方案对比

| 布局名称     | 兼容性 | 清除浮动 | 渲染顺序     |
| ------------ | ------ | -------- | ------------ |
| 圣杯布局     | IE6    | 需要     | 中间栏最先   |
| 双飞翼布局   | IE6    | 需要     | 中间栏最先   |
| 混合浮动布局 | IE6    | 需要     | 中间栏最后   |
| 弹性布局     | IE11   | 不需要   | 可自定义顺序 |

> **Tips:** 以上布局方案均为解决 **“中间栏宽度自适应，两边栏定宽，三栏均可撑起父容器高度”** 的布局问题，可推广至两栏自适应布局。

## 布局方案明细

### 圣杯布局

HTML:

```html
<header class="header">Header</header>
<main class="clearfix main">
  <article class="middle">Middle</article>
  <aside class="left">Left</aside>
  <aside class="right">Right</aside>
</main>
<footer class="footer">Footer</footer>
```

CSS:

```css
body {
  margin: 0;
}
.clearfix::after {
  content: "";
  display: block;
  visibility: hidden;
  height: 0;
  line-height: 0;
  clear: both;
}
.header,
.main,
.footer {
  background-color: grey;
}
.left {
  min-height: 100px;
  background-color: yellow;
  opacity: .6;
}
.middle {
  min-height: 100px;
  background-color: green;
  opacity: .6;
}
.right {
  min-height: 100px;
  background-color: blue;
  opacity: .6;
}

/**
 * Layout
 */
.main {
  padding-right: 150px; /* 等于右栏宽度 */
  padding-left: 200px; /* 等于左栏宽度 */
}
.middle {
  float: left;
  width: 100%;
}
.left {
  float: left;
  position: relative;
  left: -200px; /* 等于自身宽度 */
  margin-left: -100%;
  width: 200px;
}
.right {
  float: left;
  margin-right: -150px; /* 等于自身宽度 */
  width: 150px;
}
```

调整三栏间距：

```css
/* 三栏间距 20px */
.main {
  padding-right: 170px; /* 等于右栏宽度加间距 */
  padding-left: 220px; /* 等于左栏宽度加间距 */
}
.left {
  left: -220px; /* 等于自身宽度加间距 */
}
.right {
  position: relative;
  right: -20px; /* 间距 */
}
```

> **Tips:** 此布局中间栏宽度不得小于左栏宽度。

CodePen：[CSS 圣杯布局](https://codepen.io/avincheng/pen/rNxodqo)

### 双飞翼布局

HTML:

```html
<header class="header">Header</header>
<main class="clearfix main">
  <article class="middle-wrapper">
    <div class="middle">Middle</div>
  </article>
  <aside class="left">Left</aside>
  <aside class="right">Right</aside>
</main>
<footer class="footer">Footer</footer>
```

CSS:

```css
body {
  margin: 0;
}
.clearfix::after {
  content: "";
  display: block;
  visibility: hidden;
  height: 0;
  line-height: 0;
  clear: both;
}
.header,
.main,
.footer {
  background-color: grey;
}
.left {
  min-height: 100px;
  background-color: yellow;
  opacity: .6;
}
.middle {
  min-height: 100px;
  background-color: green;
  opacity: .6;
}
.right {
  min-height: 100px;
  background-color: blue;
  opacity: .6;
}

/**
 * Layout
 */
.middle-wrapper {
  float: left;
  width: 100%;
}
.middle-wrapper > .middle {
  margin-right: 150px; /* 等于右栏宽度 */
  margin-left: 200px; /* 等于左栏宽度 */
}
.left {
  float: left;
  margin-left: -100%;
  width: 200px;
}
.right {
  float: left;
  margin-left: -150px; /* 等于自身宽度 */
  width: 150px;
}
```

调整三栏间距：

```css
/* 三栏间距 20px */
.middle-wrapper > .middle {
  margin: 0 170px 0 220px;
}
```

CodePen：[CSS 双飞翼布局](https://codepen.io/avincheng/pen/JjGwaMK)

### 混合浮动布局

HTML:

```html
<header class="header">Header</header>
<main class="clearfix main">
  <aside class="left">Left</aside>
  <aside class="right">Right</aside>
  <article class="middle">Middle</article>
</main>
<footer class="footer">Footer</footer>
```

CSS:

```css
body {
  margin: 0;
}
.clearfix::after {
  content: "";
  display: block;
  visibility: hidden;
  height: 0;
  line-height: 0;
  clear: both;
}
.header,
.main,
.footer {
  background-color: grey;
}
.left {
  min-height: 100px;
  background-color: yellow;
  opacity: .6;
}
.middle {
  min-height: 100px;
  background-color: green;
  opacity: .6;
}
.right {
  min-height: 100px;
  background-color: blue;
  opacity: .6;
}

/**
 * Layout
 */
.left {
  float: left;
  width: 200px;
}
.right {
  float: right;
  width: 150px;
}
.middle {
  margin-right: 150px; /* 等于右栏宽度 */
  margin-left: 200px; /* 等于左栏宽度 */
}
```

调整三栏间距：

```css
/* 三栏间距 20px */
.middle {
  margin-right: 170px; /* 等于右栏宽度加间距 */
  margin-left: 220px; /* 等于左栏宽度加间距 */
}
```

CodePen：[CSS 混合浮动布局](https://codepen.io/avincheng/pen/YzwdOme)

### 弹性布局

HTML:

```html
<header class="header">Header</header>
<main class="main">
  <article class="middle">Middle</article>
  <aside class="left">Left</aside>
  <aside class="right">Right</aside>
</main>
<footer class="footer">Footer</footer>
```

CSS:

```css
body {
  margin: 0;
}
.header,
.main,
.footer {
  background-color: grey;
}
.left {
  min-height: 100px;
  background-color: yellow;
  opacity: .6;
}
.middle {
  min-height: 100px;
  background-color: green;
  opacity: .6;
}
.right {
  min-height: 100px;
  background-color: blue;
  opacity: .6;
}

/**
 * Layout
 */
.main {
  display: flex;
}
.middle {
  order: 2;
  flex: 1;
}
.left {
  order: 1;
  width: 200px;
}
.right {
  order: 3;
  width: 150px;
}
```

调整三栏间距：

```css
/* 三栏间距 20px */
.middle {
  margin-right: 20px;
  margin-left: 20px;
}
```

CodePen：[CSS 弹性布局](https://codepen.io/avincheng/pen/mdVazQY)

## 参考文献

* [In Search of the Holy Grail](https://alistapart.com/article/holygrail)
* [使用 CSS 弹性盒子](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)

