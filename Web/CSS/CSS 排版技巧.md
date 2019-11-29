# CSS 排版技巧

## 文字排版

### 文本换行

单行文本长度超出后，末尾显示成 “...” ：

```css
.line-clamp-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

多行文本长度超出后，最后一行末尾显示成 “...” ：

```css
/* Supported: Chrome6, Firefox68, Safari5, Opera15, Edge17 */
.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical; /* Non-standard */
  -webkit-line-clamp: 3; /* 3 lines */
}
```

## 参考文献

* [Line Clampin’ (Truncating Multiple Line Text)](https://css-tricks.com/line-clampin/)

