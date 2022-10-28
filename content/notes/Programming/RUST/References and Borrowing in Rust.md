---
title: "References and Borrowing in Rust"
tags: [rust programming]
---

# References and Borrowing

instead of moving our variable lets use a reference

```rust
let s1 = String::from("abc");
do_stuff(&s1);
println!("{}",s1); // this works fine now


fn do_stuff(s: &String) {
	//do stuff
}
```

in this case the reference gets *moved* into the function, and when the function is done and reference moves out of scope it gets dropped instead of the original.

>Under the hood:
>when we create a reference to s1 rust creates a pointer to s1.


>In Rust pointers are almost never talked about.
>rust automatically handles creation and destruction.
>and uses a concept called *lifetimes* to ensure that references are always valid. The compiler won't let you create a reference that outlives the data it is referencing, and you can never point to *null*.

## mutable references

references default to immutable. *even* if the value being referenced is mutable.

!!! if you make a mutable reference of a mutable value -> **Then** you can change value of the original from the reference.

```rust
let mut s1 = String::from("abc");
do_stuff(&mut s1);
println!("{}",s1); // this works fine now


fn do_stuff(s: &mut String) {
	//do stuff
	s.intert_str(0,"Hi, ");//this works because of tht dot
}
```

why didn't we have to de-reference to mutable reference to alter s in the do_stuff.

>In Rust the dot operator on method or field auto-dereferences down to the actual value

manual dereferencing 

```rust
let mut s1 = String::from("abc");
do_stuff(&mut s1);
println!("{}",s1); // this works fine now


fn do_stuff(s: &mut String) {
	//do stuff
	(*s).intert_str(0,"Hi, ");//this works because of tht dot
}
```

(\*s)

varibale X

| mutable | Immutable |
| ------- | --------- |
| &mut x  | &x        |


this also applies to types

if i32 is the type of value then:

| Immutable | Mutable  |
| --------- | -------- |
| &i32      | &mut i32 |

if variable is a mutable ref to val, then dereferenceing x gives you mutable access to value.
if x immutable reference to val, then dereferencing gives you immutable access to val.

>! Special safety rule
>At any given time, you can have either exactly one mutable reference, or any number of immutable reference, this rule applies across all threads.
>This creates thread safety.

All these rules are enforced by the compiler.

>consume value means the value wont be usable after the function call

---