---
title: "C Sharp Delegates"
tags: [CSharp, Unity]
---
# Delegates
---
delegates can help you write cleaner more modular and more functional code.

>Delegates are defined as a function signature and return type but without any implementation.

```c#
public delegate void TestDelegate();//returns void, takes no params

private TestDelegate testDelegateFunction;

private void Start() {
	testDelegateFunction = MyTestDelegateFunction;
	
	testDelegateFunction();
}

private void MyTestDelegateFunction() {
	Debug.Log("test");
}

```

Like [[C Sharp Events#Subscribers|events]] you need to subscribe delegates to functions. you can do this with *=*.

>Make sure everything matches the right signature.

you can subscribe different functions to delegate with different behaviors, this can allow for nicely decoupled code. 

```c#
public delegate void TestDelegate();//returns void, takes no params

private TestDelegate testDelegateFunction;

private void Start() {
	testDelegateFunction = MyTestDelegateFunction;
	
	testDelegateFunction();
	
	testDelegateFunction = MySecondTestDelegateFunction;
	
	testDelegateFunction();
}

private void MyTestDelegateFunction() {
	Debug.Log("test");
}
private void MySecondTestDelegateFunction()
{
	Debug.Log("second test");
}
```

Delegates can also be multicast. Meaning multiple functions can be subscribed to one delegate. in this case us *+=* for the later subscriptions.

```c#
public delegate void TestDelegate();//returns void, takes no params

private TestDelegate testDelegateFunction;

private void Start() {
	testDelegateFunction = MyTestDelegateFunction;
	
	testDelegateFunction += MySecondTestDelegateFunction;
	
	testDelegateFunction();
}

private void MyTestDelegateFunction() {
	Debug.Log("test");
}
private void MySecondTestDelegateFunction()
{
	Debug.Log("second test");
}
```

just like events we can remove subscriptions with *-=*.


Delegates can have any return type and parameters.

```c#
public delegate bool TestBoolDelegate(int i);

private TestBoolDelegate testBoolDelegateFunction;

private void Start()
{
	testBoolDelegateFunction = MyTestBoolDelegateFunction;
	Debug.Log(testBoolDelegateFunction(1));
}

private bool MyTestBoolDelegateFunction(int i){
	return i < 5;
}
```

> !! when you define a delegate you need to give a name to the parameter, so just putting *int* won't work.
> However, when you define a delegate function you *don't* actually have to use the same name.

>!! Under the hood: when we assign a delegate it's actually doing this
> ```c#
> testDelegateFunction = new testDelegate(MyTestDelegateFunction);
> ```

---

# Anonymous Methods

Another way to create and assign delegates is through anonymous methods.

```c#
testDelegateFunction = delegate () { Debug.Log("Anon Method") };
```

the anon needs to match the signature.

Another way is to use a *Lambda* expression. 

```c#
testDelegateFunction = () => { Debug.Log("lambda Method") };
```

```c#

testBoolDelegateFunction = (int i) => { return i < 5; };
```

if you have a single statement then you can 