---
title: "Javascript Constants"
tags: [javascript,coding,fundimentatls]
---

![[notes/courses/Constants in programming]]

[[notes/courses/Constants in programming]]


In JavaScript, a constant is a variable whose value cannot be changed after it has been assigned. Constants are declared using the `const` keyword. For example:

`const x = 10;`

Once the value of `x` has been set to `10`, it cannot be changed. Attempting to do so will result in a TypeError. This makes constants useful for storing values that should never change during the lifetime of a program, such as mathematical constants or configuration values.

It is important to note that while the value of a constant cannot be changed, if the constant references an object, the properties of that object can still be modified. For example:


`const obj = {}; obj.x = 10; console.log(obj.x); // outputs 10`

Here, we declared a constant `obj` that references an object. Even though `obj` is a constant, we can still add or modify properties on the object that it references.