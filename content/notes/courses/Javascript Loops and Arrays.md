---
title: "Javascript Loops and Arrays"
tags: [javascript,loops,arrays,lesson,class]
---

One critical piece of programming is learning to work with loops and arrays or other sets of data.

Loops in programming allow you to repeat a block of code multiple times. This is useful when you have a set of actions that you want to perform on a collection of data, such as an array.

In JavaScript, there are two main types of loops: `for` loops and `while` loops.

A `for` loop has three parts:

-   Initialization: A starting value for the loop counter, which is usually a variable.
-   Condition: A statement that determines when the loop should continue running.
-   Increment: An operation that updates the loop counter after each iteration of the loop.

Here is an example of a `for` loop in JavaScript:


```js
for (var i = 0; i < 10; i++) {   console.log(i); }
```

This loop will run 10 times, printing the values 0 through 9 to the console. On each iteration, the loop counter `i` is incremented by 1, and the loop continues running until `i` is no longer less than 10.

A `while` loop, on the other hand, only has a condition. It continues running as long as the condition is true:

```js
var i = 0; while (i < 10) {   console.log(i);   i++; }
```

This loop will also run 10 times, but the loop counter `i` is updated inside the loop instead of in the loop definition.

In both cases, the code inside the loop is executed multiple times, allowing you to perform a set of actions on a collection of data. Loops are a fundamental tool in programming, and they make it possible to automate repetitive tasks and process data efficiently.

# Advanced Loop Concepts

## *Break* and *Continue*

`break` statement: This statement allows you to exit a loop prematurely. The loop stops executing and control is transferred to the next statement following the loop.

```js
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break;
  }
  console.log(i);
}
// Output: 0 1 2 3 4

```

`continue` statement: This statement allows you to skip over the current iteration of a loop and move on to the next iteration.

```js
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    continue;
  }
  console.log(i);
}
// Output: 1 3 5 7 9

```

>[!NOTE] Note: Both `break` and `continue` statements can be used with `for` and `while` loops in JavaScript.

here's an example of a `while` loop using both `break` and `continue` statements:

```js
let i = 0;

while (i < 10) {
  if (i === 5) {
    break;
  }
  if (i % 2 === 0) {
    i++;
    continue;
  }
  console.log(i);
  i++;
}
// Output: 1 3

```

In this example, the loop continues to execute as long as `i` is less than 10. If `i` is equal to 5, the `break` statement is triggered and the loop terminates. If `i` is even, the `continue` statement is triggered and the current iteration is skipped, moving on to the next iteration of the loop.

## Extra Loop Syntax

there are a few other syntax for loops in JavaScript beyond `break` and `continue`.

`label`: You can add a label to a loop, and use that label in the `break` or `continue` statement to specify which loop to exit or continue.

```js
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break outer;
    }
    console.log(i, j);
  }
}
// Output: 0 0 0 1 1 0

```

In this example, the `break outer` statement breaks out of both loops and terminates the execution.

`for...in` loop: This type of loop is used to iterate over the properties of an object.

```js
const obj = {a: 1, b: 2, c: 3};
for (let prop in obj) {
  console.log(prop, obj[prop]);
}
// Output: a 1 b 2 c 3

```

`for...of` loop: This type of loop is used to iterate over the values of an iterable object, such as arrays, strings, and Map/Set objects.

```js
const arr = [1, 2, 3];
for (let val of arr) {
  console.log(val);
}
// Output: 1 2 3

```

>[!NOTE] The `forEach` method does not have a built-in way to `break` out of the loop or `continue` to the next iteration. However, you can use `return` to exit the `forEach` callback function early.



---

# More Examples

1. Print out each number in array

```js
// Define an array of numbers
var numbers = [1, 2, 3, 4, 5];

// Use a for loop to print each number in the array
for (var i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

// Use forEach() to print each number in the array
numbers.forEach(function(number) {
  console.log(number);
});

```

2. Filter, and Sort array of json objects

```js
// Define an array of objects
var students = [
  { name: "Alice", grade: 80 },
  { name: "Bob", grade: 90 },
  { name: "Charlie", grade: 70 },
  { name: "David", grade: 60 },
  { name: "Eve", grade: 95 }
];

// Filter the array to only include students with a grade of 80 or higher
var highAchievers = students.filter(function(student) {
  return student.grade >= 80;
});

// Sort the array of high-achieving students by their grade
highAchievers.sort(function(a, b) {
  return b.grade - a.grade;
});

// Log the sorted array of high-achieving students
console.log(highAchievers);

```


3.  Printing numbers from 1 to 10:


```js

for (var i = 1; i <= 10; i++) {   console.log(i); }
```

4.  Calculating the sum of an array of numbers:



```js

var numbers = [1, 2, 3, 4, 5]; var sum = 0;  for (var i = 0; i < numbers.length; i++) {   sum += numbers[i]; }  console.log("Sum:", sum);

```


5.  Finding the largest number in an array:

```js
var numbers = [1, 2, 3, 4, 5]; var largest = numbers[0];  for (var i = 1; i < numbers.length; i++) {   if (numbers[i] > largest) {     largest = numbers[i];   } }  console.log("Largest:", largest);
```


6.  Reversing the elements of an array:

```js
var numbers = [1, 2, 3, 4, 5]; var reversed = [];  for (var i = numbers.length - 1; i >= 0; i--) {   reversed.push(numbers[i]); }  console.log("Reversed:", reversed);
```

