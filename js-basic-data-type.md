ES2015中，JavaScript的基本数据类型分为六种 - <html>
<code>String, Number, Boolean, null, undefined, symbol(ES6引入的原始数据类型) </code><br/>
</html><br/>

## 1. String

JavaScript中的字符串用于表示文本数据。字符串中的每个元素占据字符串的一个位置。第一个元素的索引为0；下一个是索引1，以此类推。字符串的长度表示其元素的数量。

不能修改JavaScript中的字符串。这意味着一旦字符串被创建，它就不能被修改。 **可以根据对原始字符串的操作创建新的字符串**

声明并初始化字符串，可以使用单引号或双引号

```
var carname = "Porsche 911";
var carname = 'Porsche 911';
```
也可以，在字符串中使用引号

```
var answer = "It's good to see you again!";
var answer = "He is called 'Bill'";
```
或者使用转义字符

```
var name = "She is called \"Alice\" " ; // 使用转义字符\"\"
```

**关于字符串对象**

```
var nameX = "alice";
var nameY = new String("alice"); // 对象 注意!!!不要创建 String 对象。它会拖慢执行速度，并可能产生其他副作用
typeof nameX ; // String
typeof nameY ; // Object
(nameX === nameY); // false ===绝对相等，即数据类型与值都必须相等。
```
**关于字符串的属性和方法**

原始值字符串，如 "alice", 没有属性和方法(因为他们不是对象)。

原始值可以使用 JavaScript 的属性和方法，因为 JavaScript 在**执行方法和属性时可以把原始值当作对象**。

## 2. Number

在JavaScript中，数字的范围从- (263-1)到 (263-1)。除了具体的数字，JavaScript中还有一些带有符号的值：正无穷（+0）、负无穷（-0）、NaN(Not-a-Number)

```
19 / +0; // Infinity 
19 / -0; // -Infinity
```
声明并初始化 number

```
var x = 3.14;    // 带小数点的数值
var y = 3;       // 不带小数点的数值

// 使用科学计数法
var x = 123e5;    // 12300000
var y = 123e-5;   // 0.00123

// 不使用科学计数法，将精确到后15位
var x = 999999999999999;   // x 将是 999999999999999
var y = 9999999999999999;  // y 将是 10000000000000000
```

**关于数字和字符串相加**

JavaScript 的加法和级联都使用 + 运算符，数字用加法。字符串用级联。

```
var x = 10;
var y = 20;
var z = x + y;  // z 将是 30（一个数）

var x = "10";
var y = "20";
var z = x + y;  // z 将是 1020（字符串）

var x = 10;
var y = 20;
var z = "The result is: " + x + y; // The result is: 1020

// 除法 - 尝试将字符串转化为数字（乘法和减法同理）
var x = "100";
var y = "10";
var z = x / y;       // z 将是 10
```

**关于 NaN - 非数值**

指某个数不是合法数

用一个非数字字符串进行除法会得到 NaN（Not a Number）

```
var x = 100 / "Apple";  // x 将是 NaN（Not a Number）
```
使用全局 JavaScript 函数 isNaN() 来确定某个值是否是数

```
var x = 100 / "Apple";
isNaN(x);           // 返回 true，因为 x 不是数
```

## 3. Boolean

代表一个逻辑实体，意味着真与假。只有两个值：true，false

## 4. null

只有一个值 - null

null这个值专门用来表示一个为空的对象，使用 typeof 检查一个 null 值时，会返回 object

## 5. undefined

没有赋值的变量有默认值 - undefined

## 6. symbol

实例是唯一且不可改变的；一种**唯一标识符**，可用作对象的唯一属性名，这样其他人就不会改写或覆盖你设置的属性
```
var id = Symbol("id");
```
即使是用同一个变量生成的值也不相等

```
var id1 = Symbol("id");
var id2 = Symbol("id");
console.log(id1 == id2);  //false
```
**隐藏性**，for...in，object.keys() 不能访问

```
var id = Symbol("id");
var obj = {
    [id] : 'symbol'
}
for (let key in obj){
    console.log(obj[key]);  //输出为空
}
```
instanceof 的结果为 false

```
var s = Symbol('foo');
console.log(s instanceof Symbol); // false
```

