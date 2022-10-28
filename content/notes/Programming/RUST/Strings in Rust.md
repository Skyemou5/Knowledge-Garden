---
title: "Strings in Rust"
tags: [programming rust]
---


# Strings
## Compound Types

store multiple values of other types into one type.

---
# Tuple
store multiple values of any type.
```rust
let info: (u8,f64,i32) = (1,3.3,999);
let jets = info.0;
let fuel = info.1;
let ammo = info.2;
```
rust uses the dot syntax to emphasize the members of tuples are not always the same type.

the second way to access a tuple is all at once

```rust
let info = (1,3.3,999);
let (jets,fuel,ammo) = info;

```

>tuples currently have a max airedy of 12, or the amount of items in a tuple, (you can't have more than 12 at least with full functionality)

## Array
store multiple vals of same type

specify them literally 
```rust
let buf = [1,2,3];
```

or with a value in how many should be in the array with a semicolon

```rust
let buf:[u8;3] = [1,2,3];
```

you index vals in array as usual with square brackets.

>!! Arrays are limited to a size of 32, above witch they loose most of their functionality.
>Arrays live on the stack by default. so you will usually use vectors of slices of vectors instead of arrays

# Strings
these get crazy, there are 6 types

but only 2 get used for most things.

1. string slice -> str, will almost always be seen as a borrowed string slice -> &str

> Borrowed string slice is often refereed to as a string which is confusing because the other type is also called String with a capital S.

1. String


>! Data in string slice **CANNOT** be modified. Data in a *String* **CAN** be modified


You will often create a string by calling the `to_string()` method.

```rust
let msg = "abc".to_string();
```

or by using *from*

```rust
let msg = String::from("abc");
```

A borrowed string slice is internally made up of a pointer to some bytes

>&str
>
>ptr->| a | b | c | d |
>
>len = 4.
>
>capacity = 8

string slices are a subset of String in more ways than one. so they share other characteristics too.

both string types are valic UTF-8

>Strings **CANNOT** be indexed by character position.
>english is NOT the only language in the world

Strings are Unicode -> gets complicated

Unicode scalars in UTF-8 can be represented by 1,2,3, or 4 bytes. and you have to traverse the bytes in order. 


graphemes -> scalars -> bytes

So there are some options for string stuff

using bytes.

```rust
word.bytes(); // works well for english ASCII
word.chars(); // retrieve iterator to go through scalars

```

there is a package called unicode_segmentation()
that can handle graphemes of many types

```rust
graphemes(my_string,true)
```

>There are many helper methods for strings to use but if you end up having to manually iterate through a string there is a handy function called .nth(3)