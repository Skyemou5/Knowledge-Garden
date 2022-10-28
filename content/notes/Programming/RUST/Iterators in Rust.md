---
title: "Iterators in Rust"
tags: [programming rust]
---


## Iterators

```rust
v.into_iter() // consumers v returns owned items
v.iter() // returns immutable references (just look at collection)
v.iter_mut() // returns mutable references (you can modify values in place)
```

there are other iterators for other things like hash_maps

there are syntactic sugar forms for often used iterators.

```rust
v.into_iter() -> for _ in v
v.iter() -> for _ in &v
v.iter_mut() -> for _ in &mut v
```

how to empty collection without consuming collection itself

*drain()* method
it takes different arguments depending on which collection
it return iterator that takes ownership of some or all items in collection,  removing the items from collection but leaving the collection intact.

```rust
v.drain(..) // vector drain .. empty out entire collection
h.drain() // hashmaps drain doesn't take arguments, returns all kv pairs

```
takes a range

#### ranges in loops

the syntax is two dots separating the beginning and end.

```rust
for num in 0..50 {
	// do stuff with num
}
```
start is inclusive, end is exclusive.

if ..= is used the end will be inclusive

```rust
for num in 0..=50 {
	// do stuff with num
}
```


# IO

stdn -> program -> stdout

read and writing for programs