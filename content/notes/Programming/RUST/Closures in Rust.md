---
title: "Closures in Rust"
tags: [programming rust]
---



# Closures

inspired by ruby and smalltalk



closure is an anonymous function that can borrow or capture data from the scope it is nested in.

a parameter list between two pipes without type notions and the function between two curly braces.

```rust
| x,y | { x + y } 
```

A closure will borrow references to values in the enclosing scope. This creates an anonymous function you can call later.

```rust
let add = |x,y|{x+y};
add(1,2);
```

you don't need parameters.
```rust
||{x+2}
```

closures can also take references to values in the current scope.
```rust
let s = "🍓".to_string();
ket f = || {
	println!("{}",s);
};

f(); // prints 🍓
```

the compiler won't let us move this to another thread because this might live longer than another thread. But there is move support for closures to remedy this.

```rust
let s = "🍓".to_string();
ket f = move || {
	println!("{}",s);
};

f(); // prints 🍓
```

this forces the closure to move any variables into itself and take ownership of them.

>functional programming, closures will be your friend
> ```rust
> let mut v = vec![2,4,6];
> v.iter()
> 	.map(|x|x*3)
> 	.filter(|x|*x>10)
> 	.fold(0,|acc,x| acc+x);
> ```