// es6模块化
import Header from './Header.js';
import Content from './Content.js';
import Footer from './Footer.js';
import createCarrier from './createCarrier';
import avatar from './assets/carrier.png';

// 全局引入 一改就会影响全部的样式 理论上应该是当前文件的引入只作用于当前文件的元素，而不是把调用的createCarrier创建的img也影响到
import './style/style.css';
// 其实和vue里面的scoped是一个意思
// 将引入的样式都保存到styles的变量里
import styles from './style/index.scss';

console.log(styles.avatar);

new Header();
new Content();
new Footer();

// 创建img
createCarrier();

var img = new Image();
img.src = avatar;
// img.className = 'avatar';
// 实现css模块化，类名修改成模板字符串
img.className = `${styles.avatar}`;
var app = document.getElementById("app");
app.appendChild(img);

// es6代码
// const a = () => {}
// 压缩代码： 访问网站下载的体积减小，加载时间减小
