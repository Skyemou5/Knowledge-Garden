---
title: "Classes and Constructors in Javascript"
tags: [javascript,js,lesson,class,programming,scripting]
---

A class in programming is a blueprint for creating objects that defines a set of properties and methods. Classes provide a way to encapsulate data and behavior in a single entity, making it easier to reason about complex systems and to share code between objects with similar properties and methods.

Classes are used in object-oriented programming (OOP) and are a fundamental concept in many programming languages such as Java, Python, Ruby, and JavaScript (since ECMAScript 2015).

A class defines the structure and behavior of objects that are instances of the class. Objects created from a class are referred to as instances of the class and inherit the properties and methods defined in the class. You can think of a class as a blueprint for creating objects, and an object as an instance of that blueprint.

# Classes in Javascript

A class is defined using the `class` keyword, followed by the name of the class, and a set of curly braces `{}` containing the properties and methods of the class.

```js
class Car {
  make = "";
  model = "";
  year = 0;

  startEngine() {
    return `Vroom! The ${this.make} ${this.model}'s engine is running.`;
  }
}

```

In this example, the class `Car` has three properties `make`, `model`, and `year`, with default values. It also has a method `startEngine` that returns a string indicating that the engine is running.

To create an instance of the class, you use the `new` keyword followed by the name of the class. You can then assign values to the object's properties and call its methods

```js
const myCar = new Car();
myCar.make = "Toyota";
myCar.model = "Camry";
myCar.year = 2020;
console.log(myCar.startEngine());

```

In this example, we create a new instance of the `Car` class and assign values to its properties. We then call its `startEngine` method, which logs the output to the console.

# Constructors in Javascript

A constructor is a special method in JavaScript classes that is automatically called when a new instance of the class is created. It is used to set up the initial state of the object. The constructor is defined using the `constructor` keyword followed by a function definition.

The `constructor` method takes in any arguments that are necessary to initialize the object's state, and these arguments can then be used within the constructor to set the object's properties.

Here's a simple example:

```js
class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  startEngine() {
    return `Vroom! The ${this.make} ${this.model}'s engine is running.`;
  }
}

```

In this example, we define a class `Car` with a `constructor` method that takes in three arguments, `make`, `model`, and `year`, and a method `startEngine` that returns a string indicating that the engine is running.

To create a new instance of a class, you use the `new` keyword followed by the name of the class and any necessary arguments.

```js
const myCar = new Car("Toyota", "Camry", 2020);
console.log(myCar.startEngine());

```

In this example, we create a new instance of the `Car` class and call its `startEngine` method, which logs the output to the console.

