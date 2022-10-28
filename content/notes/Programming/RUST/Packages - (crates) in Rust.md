---
title: "Packages-Crates in Rust"
tags: [rust programming]
---


## Packages - (crates)

once you have specified the name of package you want to use you need to go the `Cargo.toml` and add the package to the dependencies section.

```toml
[dependencies]
rand = "0.1.2" //rand package for generating nums

```

## scalar types

| Unsigned | Signed |
| -------- | ------ |
| u8       | i8     |
| u16      | i16    |
| u32      | i32    |
| u64      | u64    |
| u128     | i128   |
| usize    | isize  |

number of bits the int has, consistent accross all platforms

except for usize
size of platforms pointer type can represent every memory address in the process
>Also used to index into array or vector

signed ints are the same

max isize is upper bound of object and array size.
>this lets it be used to calc differences between pointers
>and be able to address every byte within a value like a struct


the default is i32 because its generally the fastest

>just because rust supports all types doesn't mean all types are supported on all architectures!