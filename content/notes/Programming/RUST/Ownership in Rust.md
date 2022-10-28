---
title: "Ownership in Rust"
tags: [programming rust]
---

# Ownership

this is what sets rust apart from other systems languages

! Each value has an owner

Only one owner per value, ( there may be borrowers )

when value goes out of scope it gets dropped.

```rust
let s1 = String::from("abc");
let s2 = s1;
println!("{}",s1);
```

this will throw a compiler error

```bash
5 |     let s1 = String::from("abc");
  |         -- move occurs because `s1` has type `String`, which does not implement the `Copy` trait
6 |     let s2 = s1;
  |              -- value moved here
7 |     println!("{}",s1);
  | ^^ value borrowed here after move |
  | --------------------------------- |
```

This is because of memory stuff

| Stack      | Heap          |
| ---------- | ------------- |
| In order   | Unordered     |
| Fixed-size | Variable-size |
| LIFO       | Unordered     |
| Fast       | Slow          |

What does this have to do with a value being moved?

```rust
let s1 = String::from("abc");
```

| Stack      | Heap |
| ---------- | ---- |
| ptr->      | a    |
| len=3      | b    |
| capacity=3 | c    | 

>when values go out of scope it just considers them uninitialized even though they are technically still on the stack

! More than a shallow copy -> it's a *MOVE* 

lets copy a value with *clone* method

>Clone copies the stack and heap data and adjusts the copies pointer to point to the correct heap data. in other languages this might be called a deep copy

```rust
let s1 = String::from("abc");

```

>Rust reserves the *copy* term for when **ONLY** stack data is being copied

When a value is dropped
1. the destructor (if there is one) is immediately run
2. Free Heap (immediately)
3. Stack is Immediately popped

that means **NO** leaks, or dangling pointers

Example of this

```rust
let s1 = String::from("abc");
do_stuff(s1);
println!("{}",s1); // this would throw error, moved!

fn do_stuff(s: String) {
	//do stuff
}
```

s1 is moved so it wouldn't be usable outside do_stuff anymore

one option is to move it back after we are done.
```rust
let mut s1 = String::from("abc");
s1 = do_stuff(s1);
println!("{}",s1); // this would throw error, moved!

fn do_stuff(s: String) -> String {
	//do stuff
	s
}
```

! This isn't usually what you want

for most cases you should use references and borrowing