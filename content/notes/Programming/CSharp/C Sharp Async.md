---
title: "C Sharp Async"
tags: [CSharp, Unity]
---


https://www.youtube.com/watch?v=WY-mk-ZGAq8



Async is better than coroutins for a few reasons.
Chaining coroutines becomes very messy.

- you can just directly call asyncs unlike coroutines where you have to call startcoroutine.


#### convert coroutine to async

```c#
public IEnumerator RotateForSeconds(float duration)
{
	var end = Time.time + duration;
	while (Time.time < end)
	{
		transform.Rotate(new Vector3(1,1)*Time.deltatime * 150);
		yield return null;
	}
}
```


```c#
public async void RotateForSeconds(float duration)
{
	var end = Time.time + duration;
	while(Time.time < end)
	{
		transform.Rotate(new Vector3(1,1)*Time.deltatime * 150);
		await Task.Yield();
	}
}
```


chaining coroutines suck

achieving sequential actions with async is much easier.


with async we can return a Task (similar to a promise in javascrip)

if its async monitor how long it's elapsed

```c#
public async Task RotateForSeconds(float duration)
{
	var end = Time.time + duration;
	while(Time.time < end)
	{
		transform.Rotate(new Vector3(1,1)*Time.deltatime * 150);
		await Task.Yield();
	}
}
```

C# knows you want to return a task so there's no need for a return statement


coroutine version
```c#
public class ShapeManager : MonoBehaviour 
{
	[SerializedField] private Shape[] _shapes;
	
	public void BeginTest()
	{
		for(var i = 0;i < _shapes.Length; i++)
		{
			_shapes[i].RotateForSeconds(1+1*i); //
		}
	}
}
```
async version
```c#
public class ShapeManager : MonoBehaviour 
{
	[SerializedField] private Shape[] _shapes;
	
	public async void BeginTest()
	{
		for(var i = 0;i < _shapes.Length; i++)
		{
			await _shapes[i].RotateForSeconds(1+1*i); //added await
		}
	}
}
```

what if we want to run it syncronously but we want to make sure they are all done before we continue

```c#
public class ShapeManager : MonoBehaviour 
{
	[SerializedField] private Shape[] _shapes;
	[SerializedField] private GameObject _finishedText;
	
	public async void BeginTest()
	{
		_finishedText.SetActive(false);
		
		
		var tasks = new Task[_shapes.Length];//task array stores all tasks to wait for
		for(var i = 0;i < _shapes.Length; i++)
		{
			await _shapes[i].RotateForSeconds(1+1*i); //added await
		}
		
		
		await Task.WhenAll(tasks);
		
		_finishedText.SetActive(true);
	}
}
```



separate syncronous and asyncronously

```c#
public class ShapeManager : MonoBehaviour 
{
	[SerializedField] private Shape[] _shapes;
	[SerializedField] private GameObject _finishedText;
	
	public async void BeginTest()
	{
		_finishedText.SetActive(false);
		
		
		await _shapes[0].RotateForSeconds(1+1*0);
		
		var tasks = new Task[_shapes.Length];//task array stores all tasks to wait for
		for(var i = 0;i < _shapes.Length; i++)
		{
			await _shapes[i].RotateForSeconds(1+1*i); //added await
		}
		
		
		await Task.WhenAll(tasks);
		
		_finishedText.SetActive(true);
	}
}
```
---
# Async functions can return data

```c#
async Task<int> GetRandomNumber()
{
	var randomNumber = Random.Range(100,100);
	await Task.Delay(randomNumber);
	return randomNumber;
}
```

* unity uses float seconds for coroutine
* in C# time uses milliseconds so async uses miliseconds

so to use unity units in an async do this 
```c#
(int)(delay*1000)
```



```c#
public async void BeginTest()
{
	var randomNumber = GetRandomNumber();
	
	print(randomNumber);
}


async Task<int> GetRandomNumber()
{
	var randomNumber = Random.Range(100,100);
	await Task.Delay(randomNumber);
	return randomNumber;
}
```

### because the above didn't await it return the task function instead of the value

use the -is- keyword to check on the task

```c#

randomnumnber.is---
```


fixed version with the await function

```c#
public async void BeginTest()
{
	var randomNumber = await GetRandomNumber(); //await
	
	print(randomNumber);
}


async Task<int> GetRandomNumber()
{
	var randomNumber = Random.Range(100,100);
	await Task.Delay(randomNumber);
	return randomNumber;
}
```

If you are trying to call an async function not from an async you cant use the -await- keyword, there are alternatives.

```c#
public async void BeginTest()
{
	var randomNumber = await GetRandomNumber().GetAwaiter().GetResult();
	
	print(randomNumber);
}


```

another way that looks clear but there is a catch


```c#
public async void BeginTest()
{
	var randomNumber = await GetRandomNumber().Result;
	
	print(randomNumber);
}
```

the catch:
	if you have a try catch loop in the async function you are trying to call it will just give you a generic error
	
```c#
async Task<int> GetRandomNumber()
{
	try {
		
	}
	catch(Exception e) {
		console.WriteLine(e);
		throw;
	}
}

```


>There are certainly other important caveats to mention with async. You were constantly getting NREs in the background. This being caused by the fact that tasks do not respect Unity Object lifetimes. Coroutines will stop when the object that started them is destroyed. Tasks will continue on regardless, and this means that they can continue outside of playmode, and through scene changes. To counter this you need to use cancellation tokens, and they're somewhat difficult to grasp. In reality almost every task you start should really take a cancellation token. Not only this, but there are situations you can get yourself into that completely silence exceptions occurring within a task-returning method. If you do not await a task it will not appropriately throw exceptions created within it. This can make bugs difficult to track down, and if you're not familiar with that fact it's a minefield.