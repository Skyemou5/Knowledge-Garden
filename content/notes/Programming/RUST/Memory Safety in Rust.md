---
title: "Memory Safety in Rust"
tags: [programming rust]
---

## Memory Safety
rust guarantees memory safety at compile time

>**Variables must be initialized**

```rust
fn main()
{
	let enigma: i32;
	if true {
		enigma = 42;
	} else {
		enigma = 7;
	}
}
```

this works because the compiler can tell what a value would be at runtime.