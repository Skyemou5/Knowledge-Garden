---
title: "Javascript for Toonboom"
tags: [javascript,toonboom,class]
---

In toonboom the extension language is *Javascript*. We can use their extensive *API* to automate and extend our workflows to make us more effectient as artists and help teams and studios work more efficently.

Before we jump in we should understand some basic things about how ToonBoom is built. The most important is the framework we will be interacting with.

# QT

A large part of ToonBoom is built using a framework called QT.

Qt is a cross-platform software development framework and application development toolkit used for creating applications that run on multiple platforms, including Windows, macOS, Linux, Android, and iOS. It was originally developed by the Norwegian company Trolltech, which was later acquired by Nokia, and is now developed and maintained by the Qt Company.

Qt provides a set of APIs for developing graphical user interfaces (GUIs), as well as a range of other functionality, including networking, databases, multimedia, and more. It also includes a powerful development environment, the Qt Creator, that provides a visual editor for designing user interfaces and a code editor for writing and debugging code.

In addition to C++, Qt supports scripting languages, including Python, JavaScript (through QtScript), and Ruby, which makes it accessible to a wider range of developers with different backgrounds and skill sets. Qt is widely used in a variety of industries, including automotive, finance, healthcare, and media and entertainment.

# Toonboom and QT

[Harmony 22 Premium Documentation: About Scripting](https://docs.toonboom.com/help/harmony-22/premium/scripting/about-scripting.html)

Toonboom infact uses [Qt Script](https://doc.qt.io/qt-5/qtscript-index.html) which is similar to *javascript*. In fact it's based on JavaScript. Which is why we are focusing on learning Javascript first.

### QTScript

QtScript is a scripting language based on JavaScript and specifically designed for the Qt framework. It provides a set of APIs for accessing the application's user interface and objects, and enables the creation of macros and scripts for automating repetitive tasks in Qt applications.

QtScript is easy to learn and use, especially for developers with a background in JavaScript, and provides a more streamlined interface for accessing the application's functionality compared to using the Qt C++ API. QtScript scripts are typically used for simple tasks and can be easily integrated into larger projects, which makes them a convenient tool for rapid prototyping and testing.

QtScript has a number of features and capabilities that make it well-suited for use in Qt applications, including support for multithreading, garbage collection, and the ability to handle and respond to events. It also provides access to the full range of Qt APIs, which enables the creation of powerful and flexible scripts and macros.

---

# First Steps for Scripting in ToonBoom

[Harmony Scripting | Toon Boom Learn](https://learn.toonboom.com/courses/harmony-scripting)

>To clear up some confusion about javascript vs qtscript in toonboom. Qt Scripts still use the .js file extension and are basically javascript. The only notable difference is the way we use javascript/qtscript in this case. We use it through the ToonBoom QT api instead of it targeting webassembly for the browsers.




---

# Examples

Automating the creation of a camera move:

```js
// Define the start and end position of the camera
var startPosition = [0, 0, -100];
var endPosition = [0, 0, 100];

// Define the duration of the camera move
var duration = 1;

// Create a camera move from the start to end position over the defined duration
var camera = Camera.create();
camera.setPosition(startPosition);
var animation = Animation.create(camera, duration);
animation.addKeyFrame(endPosition);

```

Changing color of an element:

```js
// Define the color you want to use
var newColor = [1, 0, 0];

// Get the elements in the scene
var elements = Scene.getElements();

// Loop through each element
for (var i = 0; i < elements.length; i++) {
  // Get the current element
  var element = elements[i];

  // Change the color of the element
  element.setColor(newColor);
}

```

Exporting an animation to a movie file:

```js
// Define the file path and format of the movie file
var filePath = "/path/to/movie.mov";
var format = "quicktime";

// Get the current scene
var scene = Scene.getCurrentScene();

// Export the scene as a movie file
var movie = scene.exportAsMovie(filePath, format);

```