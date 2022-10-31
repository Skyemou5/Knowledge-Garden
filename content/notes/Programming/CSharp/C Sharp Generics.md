---
title: "C Sharp Generics"
tags: [CSharp, Unity]
---
# Generics

---

These help you write code that defines type on execution.

```c#
list<int>
```

```c#
private int[] createArray(int firstElement,int secondElement) {
	return new int[] { firstElement, secondElement };
}
```

The above is a simple problem. But what if you wanted to solve the exact same problem but with a different data type of array. The standard way is duplicate the function. 

```c#
private int[] CreateArray<T>(T firstElement, T secondElement)
{
	return new T[] { firstElement, secondElement }
}

CreateArray<string>("one","two");
```

>In some cases the compiler is smart enough to infer the type. so you can omit the <> on the function call.

You can also define multiple generic types

```c#
customFunction<T1,T2>()
```

Generics are often used in Action and Func deligates. See [[C Sharp Delegates]] and [[C Sharp Events]]

```c#
private Action<int,string> thing;
private Func<bool,string> func;

private delegate void MyActionDelegate<T1,T2>(T1 t1,T2 t2);
private delegate TResult MyFuncDeligate<T1,TResult>(T1 t1);
```


Generics can be used in other places as well. Such as classes.


```c#
public class main {
	MyClass<int> myClass = new MyClass<int>();
}


public class MyClass<T> {
	public T value;
	
	private int[] CreateArray(T firstElement, T secondElement)
	{
		return new T[] { firstElement, secondElement }
	}
}
```

We can also use interfaces to constrain types. 

```c#
public class main {
	MyClass<int> myClass = new MyClass<int>();
}

public class MyClass<T> where T : IEnemy {
	public T value;
	
	public MyClass(T value){//constructor
		value.Damage();
	}
	private int[] CreateArray(T firstElement, T secondElement)
	{
		return new T[] { firstElement, secondElement }
	}
}

public interface IEnemy {
	void Damage();
}
```

now we can create classes that are specific from the constructors.

```c#
public class EnemyMinion : IEnemy {
	public void Damage() {
		Debug.Log(EnemyMinion.Damage);
	}
}
```

There are a bunch more constraints. struct, class, new, you can also combine constraints.

You can also use Generics in [[C Sharp Interfaces|interfaces]]

```c#
public interface IEnemy<T> {
	void Damage(T t);
}
```
then when the interfaces are implemented you must also define the type.

