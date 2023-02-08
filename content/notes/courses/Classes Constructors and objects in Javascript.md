---
title: "Classes Constructors and objects in Javascript"
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

## Inheritance

Inheritance: You can use inheritance to create a new class that is based on an existing class, inheriting its properties and methods. You can use the `extends` keyword to create a subclass, and the `super` keyword to call the superclass constructor and access its properties and methods.

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks.`);
  }
}

let dog = new Dog("Buddy");
dog.speak(); // "Buddy barks."
```

## Getters and Setters

Getters and Setters: You can use getters and setters to control access to the properties of an object. Getters are used to retrieve the value of a property, and setters are used to set the value of a property.

```js
class Person {
  constructor(firstName, lastName) {
    this._firstName = firstName;
    this._lastName = lastName;
  }

  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }

  set fullName(name) {
    let parts = name.split(" ");
    this._firstName = parts[0];
    this._lastName = parts[1];
  }
}

let person = new Person("John", "Doe");
console.log(person.fullName); // "John Doe"
person.fullName = "Jane Doe";
console.log(person.fullName); // "Jane Doe"
```

## Static Methods

Static Methods: You can use static methods to create methods that are associated with the class itself, rather than with individual instances of the class.

```js
class MathHelper {
  static square(x) {
    return x * x;
  }

  static cube(x) {
    return x * x * x;
  }
}

console.log(MathHelper.square(5)); // 25
console.log(MathHelper.cube(5)); // 125
```





---

# Objects in Javascript

In JavaScript, an object is a collection of properties, each of which has a name and a value. Objects are used to represent real-world entities, such as a person, an animal, or an online shopping cart.

An object can have properties that are primitive values (e.g. strings, numbers, booleans) or references to other objects. It can also have methods, which are functions associated with an object.

Here's an example of how to create an object in JavaScript:

```js
let person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
};

console.log(person.firstName); // "John"
console.log(person.lastName); // "Doe"
console.log(person.age); // 30
console.log(person.fullName()); // "John Doe"
```

In the example above, `person` is an object with four properties: `firstName`, `lastName`, `age`, and `fullName`. The `fullName` property is a method that returns the concatenation of `firstName` and `lastName`. The `this` keyword refers to the object itself, so `this.firstName` refers to the `firstName` property of the `person` object.

## Json

JSON (JavaScript Object Notation) is a lightweight data interchange format that is widely used for exchanging data between a server and a client or between different parts of an application. It is a text-based format that is easy for humans to read and write, and it is also easy for machines to parse and generate.

JSON objects are very similar to JavaScript objects, but with some differences:

-   Property names must be surrounded by double quotes (") in JSON, while they can be unquoted in JavaScript.
-   In JSON, property values can only be strings, numbers, booleans, null, arrays, or other JSON objects. In JavaScript, property values can also be functions, dates, and other objects.
-   In JSON, leading zeros are not allowed in numbers. For example, `01` is not a valid JSON number, but it is a valid JavaScript number.

Here's an example of a JSON object:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "age": 30
}

```

And here's how you can parse a JSON object into a JavaScript object:

```js
let json = '{"firstName": "John", "lastName": "Doe", "age": 30}';
let person = JSON.parse(json);

console.log(person.firstName); // "John"
console.log(person.lastName); // "Doe"
console.log(person.age); // 30

```

And here's how you can stringify a JavaScript object into a JSON object:

```js
let person = {
  firstName: "John",
  lastName: "Doe",
  age: 30
};
let json = JSON.stringify(person);

console.log(json); // '{"firstName":"John","lastName":"Doe","age":30}'
```

---

# Unified Examples

Here's an example of using classes, constructors, and JavaScript objects together:

```js
class Book {
  constructor(title, author, pages, status = "Not Read") {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }

  read() {
    this.status = "Read";
  }
}

let book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180);
let book2 = new Book("Moby-Dick", "Herman Melville", 552, "Reading");

let library = {
  books: [book1, book2],
  addBook: function (book) {
    this.books.push(book);
  },
  getBook: function (title) {
    return this.books.find(book => book.title === title);
  }
};

console.log(library.books);
// [
//   Book { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', pages: 180, status: 'Not Read' },
//   Book { title: 'Moby-Dick', author: 'Herman Melville', pages: 552, status: 'Reading' }
// ]

let book3 = new Book("Pride and Prejudice", "Jane Austen", 200);
library.addBook(book3);
console.log(library.books);
// [
//   Book { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', pages: 180, status: 'Not Read' },
//   Book { title: 'Moby-Dick', author: 'Herman Melville', pages: 552, status: 'Reading' },
//   Book { title: 'Pride and Prejudice', author: 'Jane Austen', pages: 200, status: 'Not Read' }
// ]

let book = library.getBook("Moby-Dick");
console.log(book);
// Book { title: 'Moby-Dick', author: 'Herman Melville', pages: 552, status: 'Reading' }

book.read();
console.log(book);
// Book { title: 'Moby-Dick', author: 'Herman Melville', pages: 552, status: 'Read' }
```

In this example, we first create a class `Book` that has properties `title`, `author`, `pages`, and `status`, as well as a method `read` to change the status of a book.

Next, we create two instances of the `Book` class and add them to a JavaScript object `library` that represents a library. The `library` object has properties `books` that holds an array of books, and methods `addBook` to add a book and `getBook` to retrieve a book by its title.

Finally, we create a third instance of the `Book` class, add it to the library, retrieve a book from the library, and change its status using the `read` method.

