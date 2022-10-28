---
title: "Threads in Rust"
tags: [rust programming]
---

# Threads

>In rust threading is cross platform, mac win linux and more.

```rust
use std::thread;

fn main() {
	let handle = thread::spawn(move || {
		// do stuff in a child thread
	});
	// do stuff simultaneously in the main thead
	
	// wait until thread has exited
	handle.join().unwrap();
}
```

thread spawn takes a closure with no arguments.
spawn returns a join handle.

>don't use threads for waiting for stuff use async stuff instead