---
title: "Iterators in Javascript"
tags: [iterators,javascript,lesson,class]
---

Iterators in JavaScript are objects that define a sequence of values and a `next()` method to access them. The `next()` method returns an object with two properties: `value` (the current item in the sequence) and `done` (a boolean indicating whether the iteration has finished).

```js
let myArray = [1, 2, 3];
let it = myArray[Symbol.iterator]();

console.log(it.next()); // { value: 1, done: false }
console.log(it.next()); // { value: 2, done: false }
console.log(it.next()); // { value: 3, done: false }
console.log(it.next()); // { value: undefined, done: true }
```

In the example above, `myArray[Symbol.iterator]()` returns the iterator for the array, and `it.next()` is called repeatedly to get the next value in the sequence. When there are no more values, `it.next()` returns `{ value: undefined, done: true }`.

```js
let myString = "Hello";

let it = myString[Symbol.iterator]();
console.log(it.next()); // { value: 'H', done: false }
console.log(it.next()); // { value: 'e', done: false }
console.log(it.next()); // { value: 'l', done: false }
console.log(it.next()); // { value: 'l', done: false }
console.log(it.next()); // { value: 'o', done: false }
console.log(it.next()); // { value: undefined, done: true }

```

In the example above, `myString` is a string, which is also an iterable object. To get its iterator, we call `myString[Symbol.iterator]()`. The `next()` method of the iterator is then called repeatedly to get the next character in the string.

```js
let myObject = {
  a: 1,
  b: 2,
  c: 3
};

let it = Object.entries(myObject)[Symbol.iterator]();
console.log(it.next()); // { value: ['a', 1], done: false }
console.log(it.next()); // { value: ['b', 2], done: false }
console.log(it.next()); // { value: ['c', 3], done: false }
console.log(it.next()); // { value: undefined, done: true }

```

In the example above, `myObject` is an object, which is not an iterable object. However, we can use the `Object.entries()` method to get an array of its entries (key-value pairs), which is an iterable object. To get its iterator, we call `Object.entries(myObject)[Symbol.iterator]()`. The `next()` method of the iterator is then called repeatedly to get the next entry in the array.


