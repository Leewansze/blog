在ES2015后引入了<html><code>let、const</code></html>，因此 JavaScript 除了**全局作用域**和**函数作用域**，还有**块级作用域**和**常量**

---

### JavaScript 块作用域

通过 <html><code>var</code></html> 关键词声明的变量没有块作用域。

在块 {} 内声明的变量可以从块之外进行访问

```
{ 
  var x = 10; 
}
// 此处可以使用 x
```
使用 <html><code>let</code></html> 关键词声明拥有块作用域的变量。

在块 {} 内声明的变量无法从块外访问

```
{ 
  let x = 10;
}
// 此处不可以使用 x
```
==let是块级作用域，外部不能访问==
```
for(var i = 0; i < 3; i++){
  let result = [];
  result.push(i);
}
console.log(result); // undefined
```

---

### 重新声明变量

- 使用 <html><code>var</code></html> 关键字重新声明变量，**在块中重新声明变量也将重新声明块外的变量**

```
var x = 10;
// 此处 x 为 10
{ 
  var x = 6;
  // 此处 x 为 6
}
// 此处 x 为 6
```
- let **在块中重新声明变量不会重新声明块外的变量**
- 允许在程序的任何位置使用 <html><code>var</code></html> 重新声明 JavaScript 变量

```
var x = 10;
// 现在，x 为 10
var x = 6;
// 现在，x 为 6
```
- **在相同的作用域**，或在相同的块中，通过<html><code>let</code></html> 重新声明一个 <html><code>var</code></html> 变量是不允许的

```
var x = 10;       // 允许
let x = 6;       // 不允许

{
  var x = 10;   // 允许
  let x = 6;   // 不允许
}
```

---


### 循环作用域


```
var i = 7;
for (var i = 0; i < 10; i++) {
  // 一些语句
}
// 此处，i 为 10
```

```
let i = 7;
for (let i = 0; i < 10; i++) {
  // 一些语句
}
// 此处 i 为 7
```
- 在全局中声明变量时，使用 var ，若循环中的局部变量与全局变量同名，则会重新赋值，就会修改了全局变量
- let块级作用域则只会在循环中起作用
