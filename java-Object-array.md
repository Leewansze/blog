总结对象类和字符串类的常用方法，并编写代码进行解释。

#### 一. 对象类（Object的常用方法）

> Object类位于java.lang包中，java.lang包包含着Java最基础和核心的类，在编译时会自动导入；

> Object类是所有Java类的祖先。每个类都使用 Object 作为超类。所有对象（包括数组）都实现这个类的方法。可以使用类型为Object的变量指向任意类型的对象

1. Object()：默认构造方法
2. clone()方法：快速创建一个已有对象的副本
- Object 类的 clone() 方法是一个 native 方法，native 方法的效率一般都是远高于 Java 中的非 native 方法。这也解释了为什么要用 Object 中 clone() 方法而不是先 new 一个类，然后把原始对象中的信息复制到新对象中（虽然这也能实现）
- Object 类中的 clone() 方法被 protected 修饰符修饰。这也意味着如果要应用 clone() 方 法，必须继承 Object 类
- Object.clone() 方法返回一个 Object 对象。我们必须进行强制类型转换才能得到我们需要的类型

**深拷贝和浅拷贝**

```
// Resume.java
public class Resume implements Cloneable{
    private String name;
	private String sex;
	private String age;
	
	private WorkExperience work = new WorkExperience();
	...
	public void setWorkExperience(String workDate,String company){
		work.setWorkDate(workDate);
		work.setCompany(company);
	}
	public void display(){
		System.out.println(name + " " +sex + " " + age);
		System.out.println(work.getWorkDate() + " " + work.getCompany());
	}
	// 调用 clone()
	public Resume clone(){
		Resume obj = new Resume(name);
		obj.sex = this.sex;
		obj.age = this.age;
		obj.work = work.clone();
		return obj;
	}
}
// WorkExperient.java
public class WorkExperience implements Cloneable{
    private String workDate;
	private String company;
	
	public String getWorkDate() {
		return workDate;
	}
	public void setWorkDate(String workDate) {
		this.workDate = workDate;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	// 调用 clone()
	public WorkExperience clone(){
		try{
			return(WorkExperience)super.clone();
		}
		catch(CloneNotSupportedException e){
			e.printStackTrace();
		}
		return null;
	}
}
```


3. toString()：返回该对象的字符串表示

> toString 方法会返回一个“以文本方式表示”此对象的字符串

```
/*public String toString();返回该对象的字符串表示
 * 
 * getClass().getName() + '@' + Integer.toHexString(hashCode())
 * 
 * Integer类下的一个静态方法
 * public static String toHexString(int i):把一个整数转化为16进制表示的字符串
 * 
 * 现在是没有意义的，所以建议子类重写该方法（把该类的所有成员变量值组成返回即可），可以自动生成
 */
public class ToStringTest {
	public static void main(String[] args) {
		teacher t2 = new teacher();
		teacher t3 = new teacher();
		System.out.println(t2.toString());
		System.out.println(t3.toString());
	}
}
class teacher{
	private String name;
	private int age;
	public teacher(String name, int age) {
		this.name = name;
		this.age = age;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	@Override
	public String toString() {
		return "teacher [name=" + name + ", age=" + age + "]";
	}
}
```

4. hashCode()：返回该对象的哈希码值

> 考虑一种情况，当向集合中插入对象时，如何判别在集合中是否已经存在该对象了？（ps：集合中不允许重复的元素存在）

```
public class HashTest {
	private int i;
	public int getI() {
		return i;
	}
	public void setI(int i) {
		this.i = i;
	}
 
	public boolean equals(Object object) {
		if (object == null) {
			return false;
		}
		if (object == this) {
			return true;
		}
		if (!(object instanceof HashTest)) {
			return false;
		}
		HashTest other = (HashTest) object;
		if (other.getI() == this.getI()) {
			return true;
		}
		return false;
	}
	// 重写 hashcode()
	public int hashCode() {
		return i % 10;
	}
 
	public final static void main(String[] args) {
		HashTest a = new HashTest();
		HashTest b = new HashTest();
		a.setI(1);
		b.setI(1);
		Set<HashTest> set = new HashSet<HashTest>();
		set.add(a);
		set.add(b);
		System.out.println(a.hashCode() == b.hashCode());
		System.out.println(a.equals(b));
		System.out.println(set);
	}
}
// 输出结果
/* true
true
[com.ubs.sae.test.HashTest@1]*/
```
5. getClass()：返回一个对象的运行时类

```
public class Test {
    public static void main(String[] args) {
        Person p = new Person(1,"Alice");
        System.out.println(p.getClass());  
        System.out.println(p.getClass().getName()); 
    }
}
class Person{
    int id;
    String name;
    public Person(int id, String name) {
        super();
        this.id = id;
        this.name = name;
    }
}
// 输出
/*
class yu.bai.object.Person
yu.bai.object.Person
*/
```

6. equals(Object obj)：指示某个其他对象是否与此对象“相等”


```
Dog dog = new dog();
Dog dogs = new dog();
if(dog.equals(dog2)){
    System.out.println("对象相同")
}else{
    System.out.println("对象不相同")
}
// 输出
/*
对象不相同
*/
```

7. finalize()方法：垃圾回收器准备释放内存
- 对象不一定会被回收。
- 垃圾回收不是析构函数。
- 垃圾回收只与内存有关。
- 垃圾回收和finalize()都是靠不住的，只要JVM还没有快到耗尽内存的地步，它是不会浪费时间进行垃圾回收的

```
protected void finalize()
{
    super.finalize();
     // other finalization code...
}
```
---

#### 二. 字符串类（String）

1. int length()：返回当前字符串的长度

```
String a = "abcdefg";
System.out.println(a.length()); // 输出 7
```

2. int indexOf(int ch)：查找 ch 字符在该字符串中第一次出现的位置
```
public class Main {
    public static void main(String args[]) {
        String string = "aaa456ac";  
        //查找指定字符是在字符串中的下标。在则返回所在字符串下标；不在则返回-1.  
         System.out.println(string.indexOf(99));//返回结果：7
    }
}
```


3. int indexOf(String str)：查找 str 字符串在该字符串中第一次出现的位置

```
public class Main {
    public static void main(String args[]) {
        String string = "aaa456ac";  
        //查找指定字符是在字符串中的下标。在则返回所在字符串下标；不在则返回-1.  
        System.out.println(string.indexOf("b")); // 返回结果：-1，"b"不存在  
    }
}
```
4. int lastIndexOf(int ch)：返回指定字符在此字符串中最后一次出现处的索引，如果此字符串中没有这样的字符，则返回 -1
```
public class Test {
    public static void main(String args[]) {
        String Str = new String("菜鸟教程:www.runoob.com");
        String SubStr1 = new String("runoob");
        String SubStr2 = new String("com");

        System.out.print("查找字符 o 最后出现的位置 :" );
        System.out.println(Str.lastIndexOf( 'o' ));
    }
}
```
5. int lastIndexOf(String str)：返回指定子字符串在此字符串中最右边出现处的索引，如果此字符串中没有这样的字符，则返回 -1

```
public class Test {
    public static void main(String args[]) {
        String Str = new String("菜鸟教程:www.runoob.com");
        String SubStr1 = new String("runoob");
        String SubStr2 = new String("com");

        System.out.print("子字符串 SubStr1 最后出现的位置:" );
        System.out.println( Str.lastIndexOf( SubStr1 ));
        System.out.print("子字符串 SubStr2 最后出现的位置 :" );
        System.out.println(Str.lastIndexOf( SubStr2 ));
    }
}
```

6. String substring(int beginIndex)：获取从 BeginIndex 位置开始到结束的子字符串

```
public class Test {
    public static void main(String args[]) {
        String Str = new String("www.runoob.com");
 
        System.out.print("返回值 :" );
        System.out.println(Str.substring(4) );
    }
}
```

7. String subString(int beginIndex, int endIndex)：获取从 b~e de 位置的子字符串

```
public class Test {
    public static void main(String args[]) {
        String Str = new String("www.runoob.com");
 
        System.out.print("返回值 :" );
        System.out.println(Str.substring(4, 10) );
    }
}
```

8. String trim()：返回去除了前后空格的字符串

```
public class Test {
    public static void main(String args[]) {
        String Str = new String("    www.runoob.com    ");
        System.out.print("原始值 :" );
        System.out.println( Str );

        System.out.print("删除头尾空白 :" );
        System.out.println( Str.trim() );
    }
}
// 执行结果为
// 原始值 :    www.runoob.com    
// 删除头尾空白 :www.runoob.com
```

9. String toLowerCase()：将字符转换为小写
```
public class Test {
    public static void main(String args[]) {
        String Str = new String("ALICE");

        System.out.print("返回值 :" );
        System.out.println( Str.toLowerCase() );
    }
}
// 执行结果为

// 返回值 :alice
```

10. String toUpperCase()：将字符转换为大写
```
public class Test {
    public static void main(String args[]) {
        String Str = new String("alice");

        System.out.print("返回值 :" );
        System.out.println( Str.toUpperCase() );
    }
}
// 执行结果为

// 返回值 :ALICE
```

11. Char charAt(int index)：获取字符串中指定位置的字符
```
public class Test {
    public static void main(String args[]) {
        String s = "Alice";
        char result = s.charAt(3);
        System.out.println(result);
    }
}
// 执行结果
// c
```
12. concat()：连接两个字符串
```
"我的名字是 ".concat("Alice"); // 返回 "Hello, Alice!"
```


13. String[] split(String regex, int limit)：将字符分割为子字符串，返回字符串数组
```
public class Test {
    public static void main(String args[]) {
        String str = new String("Welcome-to-Runoob");
 
        System.out.println("- 分隔符返回值 :" );
        for (String retval: str.split("-")){
            System.out.println(retval);
        }
 
        System.out.println("");
        System.out.println("- 分隔符设置分割份数返回值 :" );
        for (String retval: str.split("-", 2)){
            System.out.println(retval);
        }
 
        System.out.println("");
        String str2 = new String("www.runoob.com");
        System.out.println("转义字符返回值 :" );
        for (String retval: str2.split("\\.", 3)){
            System.out.println(retval);
        }
 
        System.out.println("");
        String str3 = new String("acount=? and uu =? or n=?");
        System.out.println("多个分隔符返回值 :" );
        for (String retval: str3.split("and|or")){
            System.out.println(retval);
        }
    }
}
```

14. static String valueOf(primitive data type x)：返回给定 data type 类型 x 参数的字符串表示形式

```
public class Test {
    public static void main(String args[]) {
        double d = 1100.00;
        boolean b = true;
        long l = 1234567890;
        char[] arr = {'r', 'u', 'n', 'o', 'o', 'b' };

        System.out.println("返回值 : " + String.valueOf(d) );
        System.out.println("返回值 : " + String.valueOf(b) );
        System.out.println("返回值 : " + String.valueOf(l) );
        System.out.println("返回值 : " + String.valueOf(arr) );
    }
}
// 执行结果为
/*
返回值 : 1100.0
返回值 : true
返回值 : 1234567890
返回值 : runoob
*/
```
---
总结Java数组的定义和遍历方法，并编写代码来解释它们

> 数组是用来存储固定大小的同类型元素。
你可以声明一个数组变量，如 numbers[100] 来代替直接声明 100 个独立变量 number0，number1，....，number99

```
// 声明数组
double[] myList; // 首选的方法

double myList[]; //  效果相同，但不是首选方法

// 初始化数组
myList = new double[5];
```

###### 遍历方法

1. For-Each 循环

```
public class TestArray {
   public static void main(String[] args) {
      double[] myList = {1.9, 2.9, 3.4, 3.5};
 
      // 打印所有数组元素
      for (double element: myList) {
         System.out.println(element);
      }
   }
}
```
2. for循环
```
public static void printArray(int[] array) {
  for (int i = 0; i < array.length; i++) {
    System.out.print(array[i] + " ");
  }
}
```
3. 数组作为函数的返回值

```
public static int[] reverse(int[] list) {
  int[] result = new int[list.length];
 
  for (int i = 0, j = result.length - 1; i < list.length; i++, j--) {
    result[j] = list[i];
  }
  return result;
}
```
4. 利用jdk自带的方法  --> java.util.Arrays.toString()

```
public class ThroughTheArray {
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int[] arr = {1.9, 2.9, 3.4, 3.5 };//静态创建一个数组
		System.out.println(java.util.Arrays.toString(arr));
	}
}
```
5. Lambda 表达式遍历（JDK 1.8）
```
public class ArrayLambda {
    System.out.println("\n第三种方式：Lambda 表达式遍历 Array 数组");
    Arrays.asList(items).forEach(item -> System.out.println(item));

    System.out.println("\n第四种方式：Lambda 表达式遍历 Array 数组");
    Arrays.asList(items).forEach(System.out::println);
}
```
