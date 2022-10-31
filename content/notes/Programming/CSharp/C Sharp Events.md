---
title: "C Sharp Events"
tags: [CSharp, Unity]
---
# Events
used to decouple various systems and clean up your code.

>Just a way to say something happened without caring who listens or responds.

Events fundamentally are made up of two things...

| Publishers | Subscribers |
|------------|-------------|

---

## Publishers

Publishers can publish an event that can be subscribed to my zero or multiple things.

>The publisher does not know or care about the subscribers

---
>!! This ties into clean coding principles and design patterns like [MVP](https://medium.com/@ankit.sinhal/mvc-mvp-and-mvvm-design-pattern-6e169567bbad). The idea behind these types of things are to separate parts of the code, like the logic from the visuals. Create Reusable code!

---

There are many ways to do events in c# and a few more in unity.

first you need to declare an event type in the code.

```c#
public event EventHandler OnSpacePressed; //simple event

private void Start(){

}

private void Update(){
	//how to call an event
	if (Input.GetKeyDown(KeyCode.Space)) {
		//space pressed
		OnSpacePressed(this,EventArgs.Empty);//this will fire off the event
		//this will fire off a null exception. we need to first check if it's null
	}
}


```
The above throws a null error. Remember to check for null beforehand.
checked if null - verbose
```c#
if(OnSpcaePressed != null) 
{
	OnSpacePressed(this,EventArgs.Empty);
}
```
The syntactical sugar method to shorten the null check is more often used these days.
```c#
OnSpacePressed?.Invoke(this,EventArgs.Empty);
```

EventHandler is a simple [[C Sharp Delegates|Delegate]] with two fields. Is customary to use the work *on* before the event. 

>! Remember that the event is a delegate with fields. Easy to forget because the declaration often doesn't show it.

>[EventHandler](https://docs.microsoft.com/en-us/dotnet/api/system.eventhandler?view=net-6.0) is the c# class that handles events. Make sure you use *system*

---

## Subscribers

The subscriber need to match the *signature* of the event. This means it needs to accept and return the same types of data.

>! The concept of signatures is used in other parts of C# like interfaces.


```c#
private void Testing_OnSpacePressed(Object sender, EventArgs e) {
	Debug.Log("Event Fired");
}
```

Then, in order to access the event, we need to subscribe. Subscribing usually happens when you bring the object into memory and you should unsubscribe when you unload the object. often in the *onenable* and *ondisable* methods.

The syntax for subscribing uses the following
```
+= // subscribe
-= // unsubscribe
```

```c#
private void OnEnable(){
	testevent += TesteventFunc;
}
private void OnDisable(){
	testevent -= TesteventFunc;
}
```

```c#
public event EventHandler OnSpacePressed; //simple event

private void Start(){
	OnSpacePressed += Test_OnSpacePressed; // this is how we subscribe the function to the event
}

private void Update(){
	//how to call an event
	if (Input.GetKeyDown(KeyCode.Space)) {
		//space pressed
		OnSpacePressed?.Invoke(this,EventArgs.Empty);
	}
}

private void Testing_OnSpacePressed(Object sender, EventArgs e) {
	Debug.Log("Event Fired");
}

```

The above is still just in one class. The real benefits are when we listen from somewhere else.

In this case we just need references to the right object.

---

### EventArgs

Eventargs is the standard way to pass more information through the event.

The standard process is a bit verbose.

first we need to make a class the derives from eventargs.

```c#

public event EventHandler OnSpacePressed;
public class OnSpacePressedEventArgs : EventArgs {
	// here we define whatever fields we want
	public int spaceCount;
}
```

Once we define the fields in the custom class. We need to add the type to the evenhandler with <>.

```c#

public event EventHandler<OnSpacePressedEventArgs> OnSpacePressed;
public class OnSpacePressedEventArgs : EventArgs {
	// here we define whatever fields we want
	public int spaceCount;
}

private void update() {
	if(Input.GetKeyDown(KeyCode.Space)) {
		//space pressed
		spaceCount++;
		OnSpacePressed?.Invoke(this,new OnSpacePressedEventArgs { spaceCount = spaceCount });
	}
}
```

Then in the event subscriber you need to make sure to match the signature.

```c#
private void Start()
{
	TestingEvents testingEvents = GetComponent<TestingEvents>();
	testingEvents.OnSpacePressed += TestingEvents_OnSpacePressed;
}


private void TestingEvent_OnSpace(object sender, TestingEvents.onSpacePressedEventArgs e)
{
	Debug.log("Space! "+ e);
	TestingEvents testingEvents = GetComponent<TestingEvents>();
	testingEvents.OnSpacePressed -= TestingEvents_OnSpacePressed;
}
```

> You do *not* need to use *eventhandler*, event's work in other ways.

We can define our own *delegate* to act as our event handler.

```c#

public delegate void TestEventDelegate(float f);

```


> Delegates are essentially function signatures

Now we can make an event of the same type as our delegate.

```c#
public event TestEventDelegate OnFloatEvent;
```

we can fire off this event in the same way as the other events.

```c#
OnFloatEvent?.Invoke(5.5f);
```

And we subscribe in same way too.

```c#
testingEvents.OnFloatEvent += TestingEvents_OnFloatEvent;

private void TestingEvents_OnFloatEvent(float f)//same signature as deligate
{
	Debug.Log("float "+ f);
}
```

---

### Actions

we can also use the *Action* event type. Action is just a *delegate* that returns *void*.

```c#
public event Action OnActionEvent;

```

Action also has a generic version.

```c#
public event Action<bool,int> OnActionEvent;
```

we fire of the event in the same way.

```c#
OnActionEvent?.Invoke(true,5);
```

and we subscribe the same way

```c#
testingEvents.OnActionEvent += TestingEvents_OnActionEvent;

private void TestingEvents_OnActionEvents(bool arg1,int arg2){
	Debug.Log(arg1,arg2);
}
```
---

# Unity Events

These are show in the editor

```c#
public UnityEvent OnUnityEvent;
```

Invoked the same as the others.

```c#
OnUnityEvent?.Invoke();
```

>This will show up in the inspector

>! These can only take one argument in the editor.

