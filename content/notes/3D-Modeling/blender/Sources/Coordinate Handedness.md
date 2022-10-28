---
title: "{{title}}"
---

### References:

1.  Andy Johnson's CS 488 Course Notes, Lecture 5
2.  Foley, Van Dam, Feiner, and Hughes, "Computer Graphics - Principles and Practice", Chapter ??
3.  Woo et. al., OpenGL Programming Guide

### Coordinate System "Handedness"

In a 2-D coordinate system the X axis generally points from left to right, and the Y axis generally points from bottom to top. ( Although some windowing systems will have their Y coordinates going from top to bottom. )

When we add the third coordinate, Z, we have a choice as to whether the Z-axis points into the screen or out of the screen:

![](https://www.cs.uic.edu/~jbell/CourseNotes/ComputerGraphics/diagrams/coord.gif)

Right Hand Coordinate System (RHS)  
Z is coming out of the page  

Counterclockwise rotations are positive  
if we rotate about the X axis : the rotation Y->Z is positive  
if we rotate about the Y axis : the rotation Z->X is positive  
if we rotate about the Z axis : the rotation X->Y is positive  

Left Hand Coordinate System (LHS)  
Z is going into the page  

Clockwise rotations are positive  
if we rotate about the X axis : the rotation Y->Z is positive  
if we rotate about the Y axis : the rotation Z->X is positive  
if we rotate about the Z axis : the rotation X->Y is positive  

so basically its the same thing ...

The important thing to note is what coordinate system is being used by the package you are working with, both for the creation of models and the displaying of them. Also note that if the two packages use different coordinate systems, then the model(s) may need to be inverted in some fashion when they are loaded in for viewing.

OpenGL generally uses a right-hand coordinate system.

### Multiple Coordinate Systems in a Graphics Program

In a typical graphics program, we may need to deal with a number of different coordinate systems, and a good part of the work ( and the cause of many headaches ) is the conversion of coordinates from one system to another. We'll learn about the conversion process a little later, but in the meantime, here is a list of some of the coordinate systems you may encounter:

-   **World Coordinate System** - Also known as the "universe" or sometimes "model" coordinate system. This is the base reference system for the overall model, ( generally in 3D ), to which all other model coordinates relate.
-   **Object Coordinate System** - When each object is created in a modelling program, the modeller must pick some point to be the origin of that particular object, and the orientation of the object to a set of model axes. For example when modelling a desk, the modeller might choose a point in the center of the desk top for the origin, or the point in the center of the desk at floor level, or the bottom of one of the legs of the desk. When this object is moved to a point in the world coordinate system, it is really the origin of the object ( in object coordinate system ) that is moved to the new world coordinates, and all other points in the model are moved by an equal amount. Note that while the origin of the object model is usually somewhere on the model itself, it does not have to be. For example, the origin of a doughnut or a tire might be in the vacant space in the middle.
-   **Hierarchical Coordinate Systems** - Sometimes objects in a scene are arranged in a hierarchy, so that the "position" of one object in the hierarchy is relative to its parent in the hierarchy scheme, rather than to the world coordinate system. For example, a hand may be positioned relative to an arm, and the arm relative to the torso. When the arm moves, the hand moves with it, and when the torso moves, all three objects move together.
-   **Viewpoint Coordinate System** - Also known as the "camera" coordinate system. This coordinate system is based upon the viewpoint of the observer, and changes as they change their view. Moving an object "forward" in this coordinate system moves it along the direction that the viewer happens to be looking at the time.
-   **Model Window Coordinate System** - Not to be confused with desktop windowing systems ( MS Windows or X Windows ), this coordinate system refers to the subset of the overall model world that is to be displayed on the screen. Depending on the viewing parameters selected, the model window may be rectalinear or a distorted viewing frustrum of some kind.
-   **Screen Coordinate System** - This 2D coordinate system refers to the physical coordinates of the pixels on the computer screen, based on current screen resolution. ( E.g. 1024x768 )
-   **Viewport Coordinate System** - This coordinate system refers to a subset of the screen space where the model window is to be displayed. Typically the viewport will occupy the entire screen window, or even the entire screen, but it is also possible to set up multiple smaller viewports within a single screen window.



https://www.cs.uic.edu/~jbell/CourseNotes/ComputerGraphics/Coordinates.html