---
title: "Cargo Clippy for Rust"
tags: [programming rust]
---

## Cargo Clippy

this tools helps to check for idiomatic code.
it also checks for correctness errors, even if code compiles.
It also checks for complexity.
- when it knows for sure that you're code is too complex.
- clippy can only guess that at a few things.

>if you want to ignore warnings you need to add an allow attributes.

```rust
#[allow(clippy::too_many_arguments)]
```

>you can copy it right out of the clippy output just change from warn to allow.

Google clippy lints to learn about good code.