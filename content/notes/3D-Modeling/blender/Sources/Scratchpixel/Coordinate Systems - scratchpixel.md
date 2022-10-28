---
title: "Coordinate Systems - Scratchpixel"
---


Geometry


## Introducing Coordinate Systems

Coordinate systems play an essential role in the graphics pipeline. They are not complicated; coordinates are one of the first things we learn in school when we study geometry. However, learning a few things about them now will make it easier to understand matrices.

In the previous chapter we mentioned that points and vectors (as used in CG) are represented with three real numbers. But what do these numbers mean? Each number represents a **signed distance** from the origin of a line to the position of the point on that line. For example, consider drawing a line and putting a mark in the middle. We will call this mark the **origin**. This mark becomes our point of reference: the position from which we will measure the distance to any other point. If a point lies to the right side of the origin, we take the signed distance to be greater than zero (that is, positive something). On the other hand, if it is on the left side of the origin, the value will be negative (negative something).

We assume the line goes to infinity on either side of the origin. Therefore, in theory, the distance between two points on that line could be infinitely large. However, this presents a problem: in the world of computers, there is a practical limit to the value you can represent for a number (which depends on the number of bits we used to encode that number). Thankfully, this maximum value is usually big enough to build most of the 3D scenes we will want to render; all the values we deal with in the world of CG are bounded anyway. With that said, let's not worry too much about this computational limitation for now.

Now that we have a line and an origin we add some additional marks at a regular interval (unit length) on each side of the origin, effectively turning our line into a ruler. With the ruler established, we can simply use it to measure the **coordinate** of a point from the origin ("coordinate" being another way of saying the signed distance from the origin to the point). In computer graphics and mathematics, the ruler defines what we call an **axis**.

![](https://www.scratchapixel.com/images/upload/geometry/oneaxis.png?)

Figure 1: the position of a point is defined as the (signed) distance from the point's position to the origin of the axis. The axis extends from minus to plus infinity.

If the point we are interested in is not on the axis, we can still find the point's coordinate by projecting it onto the ruler using a vertical line (This is assuming the ruler is horizontal. In general, we use a line perpendicular to the ruler). The distance from the origin to the the intersection of this vertical line with the ruler is the coordinate of that point with respect to that axis. We have just learned to define the coordinate of a point along an axis.

## Dimensions and Cartesian Coordinate Systems

Let's call the horizontal ruler from before the **x-axis.** We can draw another ruler perpendicular to the x-axis at its origin. We will call this the **y-axis**. For any point, we can determine the both the x- and y-coordinate by drawing perpendicular lines to each axis and measuring the distance from those intersections to the origin (this is the same processes described above). We can now find two numbers, or two coordinates, for an arbitrary point: one for the x-axis, and one for the y-axis. Thus, by placing two axes, we have defined a two dimensional space called a plane.

For example, consider drawing a number of points on a piece of paper. This piece of paper occupies a two dimensional space, i.e. a plane. We can again draw two axes: one for each dimension. If we use the same x- and y-axes to measure each point drawn on that paper, these two axes are said to define a coordinate system. If these two rulers are perpendicular to each other, they define what we call a **Cartesian coordinate system**.

Note that we commonly use a concise notation called an **ordered pair** to write the coordinates of a point. An ordered pair is simply two numbers separated by a comma. For Cartesian coordinate systems, it is customary to first write the horizontal x-coordinate followed by the vertical y-coordinate. For example, we would write (2.5, 2.25) for a point whose x-coordinate was 2.5 and y-coordinate was 2.25 (see Figure 2). However, do not let this intimidate you. Remember, we can always interpret these ordered pairs as two signed distances: the point is 2.5 units right of and 2.25 units up from the origin. We will use this way of writing a point's coordinates a lot in the coming lessons.

![](https://www.scratchapixel.com/images/upload/geometry/axis2d.png?)

Figure 2: a 2D Cartesian coordinate system is defined by two perpendicular (right angle) axes (represented by the grey square in the middle of the figure). Each axis is divided into regular intervals of unit length. Computing the coordinates of a 2D point is simply an extension of the 1D case (in Figure 1) to the 2D case. We take signed distances from the point to the origin of the coordinate system in both x and y.

At this point in the lesson, we now know how to make a two-dimensional Cartesian coordinate system and define the coordinates of a 2D point in that coordinate system. Note that the coordinates of points defined in a coordinate system are unique. This means that the same point cannot be represented by two different sets of coordinates simultaneously in one system. However it is important to note that we are free to choose any coordinate system that we please.

In fact, we can chose to define infinitely many such coordinate systems in a plane. For the sake of simplicity, let's assume that we drew just two such Cartesian coordinate systems on a sheet of paper. On this paper we place one point. The coordinates of that point will be different depending on which of the two coordinate systems we consider. For instance, in Figure 3, point P has coordinates (-1, 3) in coordinate system A and (2, 4) in coordinate system B. However this really is the same point; the dot is in the same place as when we first drew it.

![](https://www.scratchapixel.com/images/upload/geometry/pointincoordsystems.png?)

Figure 3: the same point is defined in two different coordinates systems. We can transform the point in the red coordinate system (A) to the green coordinate system (B) by adding the values (3, 1) to its coordinates.

![](https://www.scratchapixel.com/images/upload/geometry/scalepoint.png?)

Figure 4: scaling (shown in blue) or translating a point (shown in green) modifies its coordinates. A scale is a multiplication of the point's coordinates by some value. A translation is an addition of some values to the point's coordinates.

So if you know the coordinates of P in coordinate system A, what do you need to do to find the coordinate of the same point in another coordinate system, B? This represents an extremely important operation in CG (and mathematics in general). We will soon learn why along with how to find the map which translates the coordinates of a point from one coordinate system to another (check the chapter [Transforming Points and Vectors](https://www.scratchapixel.com/lessons/mathematics-physics-for-computer-graphics/geometry/transforming-points-and-vectors)).

For now, let's just consider the previous example in Figure 3. Note that by adding the values (3, 1) coordinate-wise (that is, add the two x-axis values and then add the two y-axis values independently) to the coordinates (-1, 3) leads to the coordinate (2, 4). So adding (3, 1) to the coordinates of P in A yields the coordinates of P in B. Adding (-3, -1) to (2, 4) yields (-1, 3). This takes coordinates of P in B to coordinates of P in A. It is important to note that (-3, -1) is just the additive inverse (or the opposite) of (3, 1). This is intuitive as they can be thought of as altering a point's coordinates in opposite directions: adding (3, 1) maps in one direction, from A to B, whereas (-3, -1) maps in the opposite, inverse direction from B to A.

Another common operation is to move the point in the coordinate system A to another location in the same coordinate system. This is called a **translation** and is certainly one of the most basic operation you can do on points. Note that all sorts of other linear operators can be applied to point coordinates. A multiplication of a real number to the coordinates of a point produces a **scale** (figure 4). A scale moves P along the line that is going through the point and the origin (because when we are transforming a point we are actually transforming the vector going from the origin to the point). More on all of this later.

## The Third Dimension

The 3D coordinate system is a simple extension of the 2D case. We will just be adding a third axis orthogonal to both the x- and y-axis called the z-axis (representative of depth). The x-axis points to the right, the y-axis points up and the z-axis points backward (it comes out the screen in a way when the x-axis points to the right). While other conventions can be used (see the following paragraph), we will only use this one throughout Scratchapixel. In Geometry, this 3D coordinate system defines what is more formally known as **Euclidean space**.

![](https://www.scratchapixel.com/images/upload/geometry/coordsys3d.png?)

Figure 5: a three dimensional coordinate system. A point is defined by three coordinates, one for each axis.

We conclude this portion of the chapter with a paragraph for those of you interested in a more formal definition of a coordinate system. In linear algebra, the three axes (one or two in the 1D and 2D cases respectively) form what we call the **basis** of that coordinate system. A basis is a set of linearly independent vectors that, in a linear combination, can represent every vector (or point) in a given vector space (the coordinate system). Vectors from a set are said to be linearly independent if and only if none of the vectors in the set can be written as a linear combination of other vectors in that set. **Change of basis**, or change of coordinate system, is a common operation in mathematics and the graphics pipeline.

## Left-Handed vs Right-Handed Coordinate Systems

Unfortunately, due to various conventions concerning handedness, coordinate systems are not that simple. The problem can be illustrated in the following figure: when the up and forward vectors are oriented in the same way (the forward vector is pointing away from the plane defined by the screen), an appropriate "right" vector can either point to the left or to the right.

![](https://www.scratchapixel.com/images/upload/geometry/rhlh.png?)

To differentiate the two conventions, we call the first coordinate system the **left-hand coordinate system**, and the other, the **right-hand coordinate system**. The left- and right-hand rule was introduced by physicist John Ambrose Fleming as a way of easily differentiating the two conventions.

![](https://www.scratchapixel.com/images/upload/geometry/rhcoordsys.gif?)

Figure 6: typically the right-hand coordinate system is represented with the right axis (in red) pointing to the right, and the forward vector (blue) pointing away from the screen.

Why is it called handedness? If you take your left and right hands and orient your fingers as shown in the figure, you will see that your fingers indicate the orientation of the **right**, **up** and **forward vector** (also sometimes called the down vector) for both coordinate systems. Fittingly, your left hand orients the left-hand coordinate system while your right hand orients the right-hand coordinate system. However, in the case of the right-hand system, we will turn the coordinate system around so that the right vector does indeed visually point to the right. When we do that, the down vector ends up pointing away from the screen. This rotation is illustrated in Figure 6.

Remember that the **middle finger (the middle finger not the index) — always — represents the right vector** when using this mnemonic device for checking the coordinate handedness. First orient the middle finger on either of your hands along what you consider to be the right vector and check if the other two fingers point in the same direction as the other two axes. From there, you shall see immediately if it is a left- or right-hand coordinate system.

The handedness of the coordinate system also plays a role in the orientation of normals computed from the edges of polygonal faces. If the orientation is right-handed, then polygons whose vertices were specified in **counterclockwise** order will be front-facing. This will be explained in the lesson on rendering polygonal objects.

## The Right, Up and Forward Vectors

![](https://www.scratchapixel.com/images/upload/geometry/zaxis.png?)

Figure 7: the most popular convention used in CG defines the up vector as being the y-axis (a). However it's not uncommon to find in many CG related papers (particularly those related to shading techniques) coordinate systems where the up vector is defined as the z-axis (b). Some authors claim that this convention comes from the notation commonly used in the fields of physics and mathematics. Both coordinate systems as drawn in this figure are right handed.

The Cartesian coordinate system is only defined by three perpendicular vectors of unit length. As far as the mathematical notation is concerned, **this coordinate system does not convey anything about what these three axes actually mean**. The developer is the one that decides how these axes should be interpreted. It is thus very important to make a clear distinction between the handedness the coordinate system and the conventions used to label the corresponding axes.

Is the up vector called the z- or y-axis? Let's take the convention used in Figure 7b and assume that the x-axis is the right vector. What can we say about the handedness of this coordinate system? It's a right-handed coordinate system (orient the middle finger of your right hand along the x-axis and check if the other two fingers points along the up and forward vector). As you can see, all we do is to take either a right- or left-handed coordinate system and label the axes x, y and z. The naming convention (how you label these axes) has nothing to do with the handedness of the coordinate system. It is really crucial to understand this difference. Many people often think that because some system uses a convention where the up vector is **labeled** the z-axis (instead of the more popular y-axis convention), one system is left-handed and the other is right-handed. Not at all.

**The only thing that defines the handedness of the coordinate system is the orientation of the left (or right) vector relative to the up and forward vectors, regardless of what these axes represent.** Handedness and conventions regarding the names of the axes are two different things.

It is also critically important to know which convention is used for the coordinate system when dealing with a renderer or any other 3D application. At present, the standard in the industry tends to be the right-hand XYZ coordinate system where x points to the right, y is up and z is outward (coming out of the screen). Programs and 3D APIs such as Maya and OpenGL use a right-hand coordinate system, while DirectX, pbrt and PRMan use a left-hand coordinate system. Note that both Maya and PRMan use a coordinate system in which the up vector is called the y-axis and the forward vector is called the z-axis. Essentially, this means that the z-coordinate of 3 for a point in one system is -3 in the other. For this reason, we potentially need to reverse the sign of an object's z-coordinates when the geometry is exported to the renderer. The choice of coordinate system handedness also plays a critical role when it comes to rotation and the cross product of two vectors. We will talk about this more in the next few chapters. It's actually easy enough (but painful) to go from one coordinate system to another. All that is needed is to scale the point coordinates and the camera-to-world matrix by (1, 1, -1).

For now, just note that **Scratchapixel uses a right-hand coordinate system** mainly to stay compatible with Maya and also because it seems to have become the de-facto industry standard anyway (we wished everybody really was using the same conventions).

## The World Coordinate System

We have learned that points' and vectors' coordinates relate to the origin of a Cartesian coordinate system defined by three perpendicular unit vectors (that make up a basis). We have also explained that we can create as many coordinate systems as we want and that points and vectors have unique coordinates within each one of these coordinate systems. However, in most 3d applications, each different type of coordinate system is defined with respect to a master coordinate system called the **world** coordinate system. It defines the origin and the main x-, y- and z-axes from which all other coordinate systems are defined. The world coordinate system is maybe the most important of all the distinct coordinate systems in the rendering pipeline. These include the object, local (used in shading), camera and screen coordinate systems. We will be explain all of these as we go along.

## Things We Need To Remember

We realise that most readers (if not all) do not need to have these concepts explained. However, what is important here is not so much knowledge of basic geometry but a comfort with the right terminology used throughout pretty much all CG literature. In this chapter, the terms of importance are **coordinates**, **axes** and the **Cartesian coordinate system**. We also have introduced the concept of linear operators (scale and translate) to transform points, or more correctly, vectors. The most important concepts to remember from that chapter are that points' coordinates relate to a coordinate system, a multitude of coordinate systems can be defined, and that points have unique coordinates in each of these coordinate systems. Being able to figure out whether the coordinate system you will be using (either in your program or in the API you will be using to render images) is left- or right-handed is also of great importance. It is important to not mix the handedness of a coordinate system with the convention used for the labeling of the axes.