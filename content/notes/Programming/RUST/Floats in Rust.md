---
title: "FLoats in Rust"
tags: [rust programming]
---

## Floats

f32 - f64

f32 has less precision is often faster and not supported by all architectures

f64 has much more precision but is very very slow on 32 bit architectures

Floating point literals follow the standard and look like this 
3.14159
- no suffix required
- must have digit before the dot

> you can optionally include the type as a suffix

```rust
let x = 5_u16; // underscores here improve readability
let y = 3.14_f32;

```
>! Underscores can improve readability


>can be useful if you want to pass a literal to a generic function that could accept multiple numeric types