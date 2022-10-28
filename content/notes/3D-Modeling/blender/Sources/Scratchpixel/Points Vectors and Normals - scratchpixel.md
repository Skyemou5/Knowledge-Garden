---
title: "{{title}}"
---

# Points vectors normals

_Keywords: vector, point, matrix, normal, transformation, Cartesian coordinate system, Cartesian coordinates, spherical coordinates, coordinate system._

"Geometry, is a branch of mathematics concerned with questions of shape, size, relative position of figures, and the properties of space."

## A Word of Warning

This lesson will be long and tedious for most readers. If you are new to the field of computer graphics, take the time to read it carefully though. Fully understanding this part of the CG pipeline is of crucial importance and will save you a lot of time later.

## Introduction to Geometry

Points, vectors, matrices and normals are to computer graphics what the alphabet is to literature; hence most CG books start with a chapter on linear algebra and geometry. However, for many looking to learn graphics programming, presenting a lot of maths before learning about making images can be quite upsetting. If you don't think CG programming is for you because you do not feel comfortable with maths or don't understand what a matrix is, don't give up now.

We began the "Foundation of 3D Rendering" section with a couple of lessons that do not require any prior knowledge of linear algebra for a reason. While this is a fairly unconventional way of teaching CG programming techniques, we believe it's more exciting for you to get started with something practical and fun: for example, an introductory ray tracer that requires very minor knowledge of maths and some knowledge of programming. Writing a renderer is a much more exciting and rewarding way of learning maths, as you can see incrementally how certain things are used to produce a concrete result (i.e. your final image). That being said, points, vectors and matrices are instrumental in the process of making CG images; we will use them extensively in pretty much every lesson.

In this lesson, you will learn what these constructs are, how they work and the various techniques that can be used to manipulate them. This lesson will also explain the different conventions in linear algebra that CG researchers have used over the years when solving their problems and writing their code. You need to be aware of these conventions as they are very often not mentioned in books (and poorly documented on the web). These conventions are important; before you can read or use another developer's code or techniques, you must first check what conventions they are using.

One quick note before we begin. If you are a mathematical purist, you might find it strange to see things explained here that are not technically related to linear algebra. We would like to keep the scope of this lesson broad and include simple mathematical techniques commonly used in CG which may only loosely relate to vectors and matrices. For instance, a point, mathematically speaking, has nothing to do with linear algebra (a branch of mathematics only concerned with vectors). We chose to cover points because they are extremely common in CG (and that the same mathematical techniques from linear algebra can be used to manipulate them). If you do not yet understand the distinction between points and vectors, do not worry. We will cover that extensively in this chapter.

## What is Linear Algebra? Introduction to Vectors

So what exactly is linear algebra and what will we study in this lesson? As we mentioned in the previous section, linear algebra is a branch of mathematics that has to do with the study of **vectors**. Now you might ask, "What is a vector and how is it useful in the CG world?" We won't get into too much detail, but a vector can be represented as an array of **numbers**. This array of numbers, which can assume any desired length, is also sometimes called a **tuple** in mathematics. If we want to be specific about the length of the vector, we may choose to say **n-tuple** where **n** represents the number of elements vector. Below is an example of the mathematical notation for a vector with 6 elements:

V=(a,b,c,d,e,f),

where a, b, c, d, e, f are real numbers.

The idea behind grouping these numbers together is that collectively they represent another value or concept that is meaningful in the context of the problem. For example, in computer graphics, vectors can be used to represent either a position or direction in space. We will also be able to transform (or modify) these vectors through a series of operations in a very powerful and compact way. The process of transforming the content of a vector is achieved through what is called a **linear transformation**. We will spend much more time talking about transformations in a later section; for now, it is only important to recognise that they are very useful.

[![](https://www.scratchapixel.com/images/design/donate.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=78FWLXMM9YGPN)

## Points and Vectors

The terms **point** and **vector** are used throughout many scientific fields in a number of different contexts. In this section, we explain both terms in relation to this tutorial and computer graphics.

Here, a **point** is a **position** in a three-dimensional space. A **vector**, on the other hand, usually means a **direction** (and some corresponding magnitude, or size) in three-dimensional space. Vectors can be thought of as arrows pointing various directions. Three-dimensional **points** and **vectors** are of course similar in that they are both represented by the aforementioned tuple notation.

V=(x,y,x),

where (x, y, z) are again real numbers.

![](https://www.scratchapixel.com/images/upload/geometry/pointvec.png?)

Figure 1: a point describes a position in space. A vector can be seen as a direction.

Remember, when talking to a mathematician or a physicist, their understanding of a vector or point could be far more general; they are not necessarily restricted to the use we make of them in CG. For them, a vector could be of arbitrary or even infinite size (meaning it can contain as many numbers as desired).

We will finish this chapter by briefly mentioning **homogeneous points**. Sometimes it is necessary to add a fourth element for mathematical convenience. An example of a point with homogeneous coordinates is given below:

PH=(x,y,z,w)

Homogeneous points are used when it comes to multiplying points with matrices. Don't worry too much about them at this point of the lesson. We just mention them now as they sometimes appear in the literature and can be confusing to readers. They will be explained in detail later in this lesson.

## A Quick Introduction to Transformations

You might still be wondering what effect a linear transformation has on points and vectors. It's actually quite simple. One of the most common operations we perform on points in CG consists of simply moving them around in space. This transformation is more specifically called **translation** and it plays a vital role in the rendering process.

The translation operator is nothing more than a linear transformation of the original point (which can be viewed as an input position point). Applied to a vector (which, remember, is a direction), translation has no meaning. This is because where the vector begins (that is, where it is centered) is not important; regardless of position, all "arrows" of the same length, pointing in the same direction, are equivalent. Instead, we very commonly use another linear transformation on vectors: rotation. Many more common operators can be used, but for now, let's just consider translation for points and rotations for vectors.

P→Translate→PTV→Rotate→VT

The subscripted letter T

stands for "transformed".

As you may have noticed, up to now, we have failed to discuss what the length, or magnitude, of a vector means. Indeed, the length of the arrow has a great deal of importance in CG. When the length of a vector is exactly 1, we say that the vector is **normalised** (you will hear and read this term all the time). The act of normalising a vector involves altering the vector such that its length becomes 1, but its direction remains unchanged. Most of the time, we will want our vectors to be normalised. However, in some cases, not normalising them can be preferred as the length of the vector will be meaningful.

For instance, imagine that you trace a line from point A

to point B. The line created is a vector in the sense that it indicates where point B is located relative to point A. That is, it gives the direction of B as if you were standing at point A. The length of the vector in this case indicates the distance from A to B

. This distance is sometimes required in certain algorithms.

Normalisation of vectors is often a source of bugs in applications and every time you declare a vector (or even use one), we recommend that you always consciously ask yourself if this vector is/isn't or should/shouldn't be normalised.

## Normals

![](https://www.scratchapixel.com/images/upload/geometry/normal.png?)

Figure 2: a normal is perpendicular to the plane tangent a P.

A normal is the technical term used in Computer Graphics (and Geometry) to describe the orientation of a surface of a geometric object at a point on that surface. Technically, the **surface normal** to a surface at point P

, can be seen as the vector perpendicular to a plane tangent to the surface at P

. Normals play an important role in shading where they are used to compute the brightness of objects (see further lessons on Lights and Shading).

Normals can be thought of as vectors with one caveat: they do not transform the same way that vectors do. This is one of main reasons we take the time to differentiate them. You will find more information on this topic in the chapter [Transforming Normals](https://www.scratchapixel.com/lessons/mathematics-physics-for-computer-graphics/geometry/transforming-normals). For now, it is only important to understand what they are.

## From Theory to C++

In our C++ code, we won't make the distinction between points, vectors, and normals; we represent all three with a Vec3 class (a class template so that we can create float, int or double versions as needed). Some developers prefer to differentiate them. This clearly limits the possibility of making mistakes. From experience, we found it more efficient (less code to write in the first place) to just deal with one unique class (as the OpenEXR library does). However, we will still have to call a few specific functions carefully depending on whether or not the Vec3 we are dealing with represents a point, a vector or a normal. As you may remember, this is particularly critical when we use transformations. The full source code is provided in the download section of this lesson.


```cpp
template<typename T>  
**class** Vec3  
{  
	**public**:  
	// 3 most basic ways of initializing a vector  
	Vec3() : x(T(0)), y(T(0)), z(T(0)) {}  
	Vec3(**const** T &xx) : x(xx), y(xx), z(xx) {}  
	Vec3(T xx, T yy, T zz) : x(xx), y(yy), z(zz) {}  
	T x, y, z;  
};  
  
typedef Vec3<float> Vec3f;  
  
Vec3<float> a;  
Vec3f b;  
```
## Summary

From this first chapter, you should remember that mathematically a vector can be of any dimension. However in CG, we use a more specific definition: a **vector** is a direction in 3D space (and therefore represented by three numbers). Additionally, we talk of **points** as representations of positions (also in 3D space and also represented by three numbers). **Homogeneous points** are represented with four numbers but are a particular case that we will study later.

Points and vectors can be transformed using **linear transformations**.

You will see the term linear transformation being used often. If lines are preserved while being transformed, then we speak of linear transformation (multiplication by a matrix is a linear transformation).

Typical examples of such transformations are **translation** for points and **rotation** for vectors. The length of a vector can be set to 1, in which case we say that it is **normalised**. The length of a vector (before it is normalised) represents the distance between two points and is sometimes needed in certain algorithms. For this reason, a developer has to be careful as to when and why he/she potentially chooses to normalise a vector.

## What's Next?

One important thing we haven't explained yet is what the three numbers defining points and vectors represent. These number represent the coordinates of a point (in 2D or 3D space) with respect to a reference (also sometimes called the origin). This reference, which we technically call a **coordinate system**, is the topic of our next chapter.