---
tags: [rust programming]
title: "Scope in Rust"
---

# Scope in Rust
scope begins where it's created and ends at the end of the block, and through nested blocks.

```rust
fn main(){
	let x = 5;
	
}
```

x is available through the entire block

variables can be *shadowed*
vars are always local to their scope

```rust
fn main(){
	let x = 5;
	{
		let x = 99;
		println!("{}",x); // prints 99
	}
	println!("{}",x); // prints 5
}
```

you can also shadow vars in the same scope

```rust
fn main()
{
	let mut x = 5; // is mutable
	let x = x; // x is now immutable
}
```
 >compiler will often discard earlier changes for optimization