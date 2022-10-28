---
title: "Traits in Rust"
tags: [rust programming]
---

# Traits

rust takes the composition over inheritance route.

traits are somewhat like interfaces in other languages

```rust
struct RedFox {
	enemy:bool,
	life:u32,
}

trait Noisy {
	fn get_noise(&self) -> &str;
}

impl Noisy for RedFox {
	fn get_noise(&self) -> &str { "Meow?" }
}
```

implementing noisy trait on redfox

the reason to do this is because once traits are involved we can implement generic functions that accept any value that implements a trait.

```rust
fn print_noise<T:Noisy>(item:T) {
	println!("{}", item.get_noise());
}
```

>as long as one of either the trait or struct you can implement traits or structs from anywhere.

> There is a special trait called *copy*
> if your type implements copy then it will be copied instead of moved in move situations.
> This is ideal for small values that live entirely on the stack.
> If a type uses the heap at all then it cannot implement copy
> you can opt in to implement copy if your type only uses other copy types.

>!! Traits do implement inheritance, unlike structs. movement -> run -> fly
>This really just means that anyone that implements a child trait must implement the parent traits as well.

Traits can have default behaviors

Traits can also define default trait behavior

```rust
trait Run {
	fn run(&self) {
		println!("default behavior");
	}
}

truct Robot {}
impl Run for Robot {}
```

the presence of an implementation will override the default

```rust
trait Run {
	fn run(&self) {
		println!("default behavior");
	}
}

truct Robot {}
impl Run for Robot {}

fn main() {
	let robot = Robot {};
	robot.run();
}
```

> !!! Fields cannot be inside traits