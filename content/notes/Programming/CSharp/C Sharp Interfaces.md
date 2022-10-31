---
title: "C Sharp Interfaces"
tags: [CSharp, Unity]
---
# Interfaces

Helps us write cleaner reusable code that lets up define code to be reused and decouple code.

The interface works as a contract. Which means if a class is subscribed to that interface they must implement those functions. We don't define an accessor or implimentation. Everything is public in an interface by default.

```c#

public interface IMyInterface {
	void TestFunction();
}
```

>! In C# 8 you can actually define a default implementation for functions in an interface.

```c#
public class MyClass : IMyInterface {
	public void TestFunction() {
		Debug.Log("MyClass.TestFunction()");
	}
}
```

we can also call functions from an interface.

```c#
public class Testing : MonoBehaviour {

	private void TestInterface(IMyInterface myInterface) {// expects an IMyInterface object, anything that implements the interface can go here
		myInterface.TestFunction();//
	}

	private void Start() {
		MyClass myClass = new MyClass();
		TestInterface(myClass);// once we've instanciated the class we can use the testinterface function because the class implements the interface
	}
}
public class MyClass : IMyInterface {
	public void TestFunction() {
		Debug.Log("MyClass.TestFunction()");
	}
}
public interface IMyInterface {
	void TestFunction();
}
```

> one of the useful things with interfaces is that you can implement more than one. With inheritance you can only inherit one parent.

Structs cannot inherit from a baseclass but they can implement interfaces.

Interfaces can implement interfaces!

# header



