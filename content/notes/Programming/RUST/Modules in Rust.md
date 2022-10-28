---
title: "Modules in Rust"
tags: [programming rust]
---


## Modules
>similar to python modules

All items in libraries are private by default
*even* to binaries in same project.

```rust
pub fn greet(){
	println!("hi");
}

use lib

fn main(){
	hello::greet(); //works
}

```

add *use* statement to bring into scope libraries and things. just like python.

>standard library is always available

find documentation
google rust standard ---thing---