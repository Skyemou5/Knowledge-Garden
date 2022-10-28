---
title: "Control Flow in Rust"
tags: [programming rust]
---

# Control Flow

control flow is great in rust

>Rust doesn't like type coersion
>the condition must resolve to a boolean

chaining condition 
else if
finish with else



```rust
if num == 5 {
	msg = "five";
} else if num == 4 {
	msg = "four";
} else {
	msg = "other";
}
```

statements don't return values
expressions do. This means we change the above code to this

```rust
msg = if num == 5 {
	"five"
} else if num == 4 {
	"four"
} else {
	"other"
};
```

note:
- there are no semicolons after the branch vals, returns vals from blocks
- can't use return for this purpose, return only applies to function bodies
- all blocks return the same type
- semicolon at the end of the if expression, especially when you return things from it.

>No ternary operators

in rust since if is an expression you can do this

```rust
num = if a { b } else { c };
```

nested version is still readable (unlike ternary operators)

```rust
num = if a { 
	if x { y } else { y } 
} else {
	c 
};
```

## Unconditional Loop

loops with no conditions.

### breaks

even these must end at some point so the *break* statement ends it.

```rust
loop {
	break;
}
```

! what if you want to break out of a nested loop?

```rust
'bob: loop {
	loop {
		loop {
			break `bob;
		}
	}
}
```

>annotate the loop you want to break out of.
>annotations have use a backtick at the beginning as the identifier. 
>\`bob
>then tell break which code you want to break out of.

### Continue is similar

```rust
`bob: loop {
	loop {
		continue `bob;
	}
}
```

by itself it continues the innermost loop unless you give it a label.

### while loops

```rust
while dizzy() {
	//do stuff
}
```

>while loops are mostly just syntactic sugar for putting a negated break condition at the top of an unconditional loop.
>```rust
>loop{
> if !dizzy() { break }
> //do stuff
>}
>there is also no *do while* in rust but can be achieved by moving the break condition to the bottom of the loop.
>```rust
>loop {
	>//do stuff
	>if !dizzy() { break }
>}

### For loop

rusts for loop iterates over any iterable value
compound and collection types will have a few different ways to get the iteration value from.

>the iterator you use determines which items are returned and the order they are returned in

```rust
for num in [1,2,3].iter() {
	//do stuff with num
}
```

iter - iterates over all items in collection in order and randomly if collection is unordered.

>for functional programming you can stack methods like map filter and fold and they will be lazily evaluated.

the for loop can take a pattern to destructure the items it revieves and bind the inside parts to variables just like the *let* statement, only in this case the variables are local to the body of the for loop.

```rust
let array = [(1,2),(3,4)];
for (x,y) in array.iter(){
	// do stuff with x and y
}
```

functional for loop
using iterators is often faster than for loops.
iterator adapters are available. it can take actions on values as they pass through it.


```rust
let v = vec![6,7,8];
v.into_iter().for_each(|num|println!("{}",num));

let total: i32 = v
	.into_iter() // 6 7 8
	.map(|x: i32| x * 3) // 18 21 24
	.filter(|y: i32| *y % 2 == 0) // 18 24
	.sum();
```
map takes ownership, filter takes a reference.

>! Always check the documentation !

> Always end chain of iterator adapter with an iterator consumer! like .for_each

```rust
let v = vec![6,7,8];
v.into_iter().for_each(|num|println!("{}",num));


v.into_iter() // 6 7 8
	.map(|x: i32| x * 3) // 18 21 24
	.filter(|y: i32| *y % 2 == 0) // 18 24
	.sum(); // error if cannot infer type use turbofish
```

Turbofish
```rust
::<>
```
goes between the method name and the argument

```rust
.sum::<i32>()
```

```rust
let v = vec![6,7,8];
v.into_iter().for_each(|num|println!("{}",num));


v.into_iter() // 6 7 8
	.map(|x: i32| x * 3) // 18 21 24
	.filter(|y: i32| *y % 2 == 0) // 18 24
	.sum::<i32>(); // error if cannot infer type use turbofish
```

## Collect

collect will gather all the items and put them into a new collection. Collect doesn't know which collection type you would like. you need to tell it with <> after the vec.

you can also use underscore, because collect only needs to know the type of the container, it already knows the type of item. helpful for large item types.
```rust
<i32> -> <_>

let v2: Vec<_> = v;
```
you can also use a turbo fish at the collect section.

```rust
let v = vec![6,7,8];
let v2 = v
	.into_iter() // 6 7 8
	.map(|x: i32| x * 3) // 18 21 24
	.filter(|y: i32| *y % 2 == 0) // 18 24
	.collect::<Vec<_>>(); // vec![18,24]

```