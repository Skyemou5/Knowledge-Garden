---
title: "Unit Tests in Rust"
tags: [rust,unit tests]
---

Unit tests are used to test the logic of our code keep things consistent. This is important when it comes to large projects with large teams. It's one way to help with functionality drift in our programs.

>When you create a new *lib* project it automatically sets up a test.

## Anatomy of a test

Tests are indicated by a few things.

`#[cfg(test)]` must be above your test module

```rust
#[cfg(test)]
mod tests {

}
```

The test module may hold *test* functions and *helper* functions.

Test functions are notated with the following.

`#[test]`

```rust
#[cfg(test)]
mod tests {
	//helper
	fn helper() {
	
	}

	#[test]
	fn test() {
	
	}
}
```

## Assert!

There are different types of assertions.
1. Assert if true
2. Assert if false
3. 