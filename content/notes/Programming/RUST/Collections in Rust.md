---
title: "Collections in Rust"
tags: [rust programming]
---

# Collections

## Vectors

 ```
 Vec<T> -> Vector.
 ```
 
 Vecors are the most commonly used collection.
 
 Define the vector type in the <>
 
 ```rust
let mut v: Vec<i32> = Vec::new();
v.push(2);
v.push(4);
v.push(6);
let x = v.pop(); // x is 6
println!("{}",v[1]); //prints 4
```

Vectors are used in rust where you would use lists or arrays in other languages.
vectors act like a stack so push appends item to end, pop removes item from end and returns it.

Because vectors store items of known size next to each other in memory you can index into one just like an array.

if index is out of bounds rust will panic. 

There is a macro called vec that makes creating vectors from literal values easy.

```rust
let mut v = vec![2,4,6];
```

there are tons of methods to manipulate vectors in the standard library.

## Hashmaps

```rust
HashMap<K,V>
```

In other languages this might be called a dictionary. Its used to insert remove and look up values by key and value.

```rust
let mut h: HashMap<u8,bool> = HashMap::new();
h.insert(5,true);
h.insert(6,false);
let have_five = h.remove(&5).unwrap();
```

you can insert entries with insert
remove entries with the remove method.

>remove returns and enum called option!

there are other methods to get stuff from these.

## VecDeque

Uses ring buffer to implement a double ended queue
can efficiently add or remove items from the front and back. everything else is a little less efficient than regular vector.

## LinkedList

quick at adding or removing items at an arbitrary point in the list but slow doing anything else.

## HashSet

A hashing implementation of a set that performs set operations really efficiently.

## BinaryHeap

Like a priority queue that always pops off the max value.

## BTreeMap & BTreeSet

alternate map and set implementations using a modified binary tree. 
Usually only choose these over the hash variants if you need the map keys or set variants to always be sorted.
