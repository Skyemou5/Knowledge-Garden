---
title: "Functions in Rust"
tags: [programming rust]
---


## Functions

main function is the starting action

fn = pronounced "fun"

use snakecase for functions => fn do_stuff()

> Functions don't have to appear in file before code that calls them!

parameters are defined as
name : type =>parm:i32
separated by commas

the return type is declared after wards
-> i32

```rust
fn do_stuff(parm:i32) -> i32
```

you can return a value using the *return* keyword.
there is also a shorthand.

if you leave the semicolon off of the last line in the block it gets returned.

>no support for named arguments at call site - provide all vals in correct order
>no support for variable numbers as arguments or different types for same arg --- but macros do. 
>name of macros end in !