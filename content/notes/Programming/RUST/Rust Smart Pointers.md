---
tags: [rust programming]
title: "Smart Pointers in Rust"
---

# Smart Pointers

> Pointers -> an arrow to a value that's somewhere else

> Smart pointer -> pointers with additional features and metadata

---

```rust
Box<T>
```


Box is a smart pointer.


```rust
fn main() {
	let b = Box::new(5);
}
```

now 5 is stored on the head instead of the stack

what remains on the stack is a pointer to the heap data

*b* is still on the stack and it -> to the 5 on the heap

>Impliments deref (dereference)

```rust
enum List {
	Cons(i32, Box<List>),
	Nil,
}
```

the reason this works is because pointers stay the same, so it's a fixed size. This allows for dynamic sizes of things.

Option type tells rust a value can either be something or nothing

```rust
struct Node<T> {
	data: T,
	next: Option<Box<Node<T>>>,	
}
```

this implements null


singly linked list implimentation

```rust
struct Node<T> {
	data: T,
	next: Option<Box<Node<T>>>,	
}

impl<T> Node<T> {
	fn set_next(&mut self, next: Node<T>) {
	self.next = some(Box::new(next));
	}
}

fn main() {
	let mut head = Node {
		next: None,
		value: 1,
	};

	let next = Node {
		next: None,
		value: 2,
	};

	head.set_next(next);

	println!("{:?}", head);
}

```

---

## Doubly Linked List

Same of singly, but they also have a previous pointer

This doesn't work!!!

```rust
struct Node<T> {
	data: T,
	prev: Option<Box<Node<T>>>,	
	next: Option<Box<Node<T>>>,
}
```

this doesn't work because of the rules of ownership.
Each value has an owner and can only have one owner at a time.

### Shared Ownership

multiple owners??

another smart pointer

> `Rc<T>`  short for reference counting. adds an additional feature of reference counting.

>Imagine `Rc<T>` as a TV in a family room. When one person enters to watch TV, they turn it on. Others can come into the room and watch the TV. When the last person leaves the room, they turn off the TV because it’s no longer being used. If someone turns off the TV while others are still watching it, there would be uproar from the remaining TV watchers!

```rust
fn main() {
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
    println!("count after creating a = {}", Rc::strong_count(&a));
    let b = Cons(3, Rc::clone(&a));
    println!("count after creating b = {}", Rc::strong_count(&a));
    {
        let c = Cons(4, Rc::clone(&a));
        println!("count after creating c = {}", Rc::strong_count(&a));
    }
    println!("count after c goes out of scope = {}", Rc::strong_count(&a));
}
```

how it works


```console
$ cargo run
   Compiling cons-list v0.1.0 (file:///projects/cons-list)
    Finished dev [unoptimized + debuginfo] target(s) in 0.45s
     Running `target/debug/cons-list`
count after creating a = 1
count after creating b = 2
count after creating c = 3
count after c goes out of scope = 2
```

instead of box we will now use Rc

```rust
struct Node<T> {
	data: T,
	prev: Option<Rc<Node<T>>>,	
	next: Option<Rc<Node<T>>>,
}
```

> You don't need to manually clear memory when any pointer goes out of scope

the above works except for one problem.

>At any given time you can have either one mutable reference *or* any number of immutable reference, *but* not at the same time!

```rust
fn main() {
	let mut s = String::from("jello");

	let r1 = &s; //no prob
	let r2 = &s; //no prob
	let r3 = &mut s; //!!! BIG PROBLEM

}
```

### Another Smart pointer!

`RefCell<T>` 

> Just like the compile-time borrowing rules, `RefCell<T>` lets us have many immutable borrows or one mutable borrow at any point in time.

What's the difference with other borrows?

`RefCell<T>` keeps track of how many immutable and mutable borrows we have!

> If we are caught trying to break the rules it will instead panic at runtime instead of not compile. 

with doubly linked list we need mutable pointers.


```rust
struct Node<T> {
	data: T,
	prev: Option<Rc<<RefCell<Node<T>>>>,	
	next: Option<Rc<<RefCell<Node<T>>>>,
}
```

now this works!


> This can be better though!

