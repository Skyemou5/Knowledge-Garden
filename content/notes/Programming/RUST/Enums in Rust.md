---
title: "Enumns in Rust"
tags: [rust programming]
---

# Enums

Enums in rust are more like algebraic datatypes in haskel than C like enums.

```rust
enum Color {
	Red,
	Green,
	Blue,
}
```

the real power of enum comes from associating data and methods with variants.

```rust
enum DispenserItem {
	Empty, //no data
	Ammo(u8),//single type of data
	Things(String,i32),//tuple of data
	Place {x:i32,y:i32},//anon struct of data
}
```

an enum is sort of like an union in C but so much better. The value can be any number of these variants.

```rust
use DispenserItem::*;
let item = Things("hat".to_string(),7);
```

>It can be any one of these data types, *but* only one at a time

You can implement functions and methods with enums!
You can also use generics with enums!

>Option is a generic enum in the standard lib that you will use all the time.
>```rust
>enum Option\<T> {
>		some(T),
>		None,
>	}
>```
>The T means any type
>This means that something is either absent or present

because enums can represent all sorts of data you need to use patterns to examine them.
If you want to check for a single variant you need to use the *if let* expression.

*if let* takes a pattern that will match one of the variants. If the pattern does match then the condition is true and variables inside the pattern are created for the scope of the if let block. 


```rust
if let Some(x) = my_variable {
	println!("Value is {}",x);
}
```
This isn't as nice if you need to handle all the variants at once.
In that case you need to use the *match* expression.

```rust
match my_variable {
	some(x) => {
		println!("value is {}",x);
	},
	None => {
		println!("no value");
	},
}
```

match (variable whos type supports matching)
match requires you to write a branch arm for every possible outcome. 

a single underscore can be a default or any match

```rust
match my_var {
	_ => {
		println!("default or any match");
	},
}
```

any expression will do for a branch arm. 

>All branch arms must return nothing or the same type

>If the expression ends in a curly brace then you have to put a semicolon after the closing brace. If you don't use the return value of the braced expression then rust lets you cheat and leave off the semicolon.

```rust
let x = match my_variable {
	Some(x) => x.squared() + 1,
	None => 42,
}
```

here's how you could create a none type of an option.

```rust
let mut x: Option<i32> = None;
```

 if you ever use option with a concrete type then the compiler will infer the type, which means you can leave the type annotation off most of the time.
 
 ```rust
let mut x: Option<i32> = None;
x = Some(5);
```
no type annotation
 ```rust
let mut x = None;
x = Some(5);
```

handy helper methods

 ```rust
let mut x = None;
x = Some(5);
x.is_some();// returns true if x is the sum variant
x.is_none();// returns opposite of is some
for i in x { // for in 
	println!("{}", i);
}
```

option implements the in to iterator trait so you can also treat is similar to a vector of 0 or 1 items and put it in a for loop

## Result Enum

```rust
#[must_use] //compiler warning to silently drop result
enum Result<T,E> {
	ok(T),
	Err(E),
}
```

Result is often use in IO or user interaction because failure is a possibility there.

>Rust strongly encourages you to make conscious decisions about warning and errors

```rust
use std::fs::File;

fn main(){
	File::open("foo");
}
```

this returns a result because file might not be opened correctly.

>Ignoring errors is not a safe thing to do

the simplest thing you could choose to do is to unwrap result with unwrap method. if the result is an ok then this gives you the file struct that you wanted. if result is error then program crashes.
```rust
use std::fs::File;

fn main(){
	let res = File::open("foo");
	let f = res.unwrap();
}
```
another option is the *expect* method. same as unwrap but adds your custom message to the crash output.

```rust
use std::fs::File;

fn main(){
	let res = File::open("foo");
	let f = res.expect("error message");
}
```

just like option there are helper methods that return booleans depending on things.
