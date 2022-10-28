---
title: "Structs in Rust"
tags: [programming rust]
---


# Structs

in other languages there are classes, in Rust there are Structs

structs can have
- data fields
- methods
- associated functions

structs should be in capital cammelcase

```rust
struct RedFox {
	enemy: bool,
	life: u8,
}
```

you can end last field with a comma too.


Instantiating a struct is straight forward but verbose. you need to call it and set a value for each field.

to make this easier you can use a constructor, these are defined in an implementation

```rust
impl RedFox {
	fn new() -> self {
		self {
			enemy: true,
			life: 70,
		}
	}
}
```

fn new => is an associate function. Because it doesn't have a form of self as first parameter. In other languages you might call this a class method. with new being the conventional name used to instantiate.

```rust
let fox = RedFox::new();
```

here the scope operators :: are used to access the method inside the struct.

no struct inheritance. = fixes OOP stuff