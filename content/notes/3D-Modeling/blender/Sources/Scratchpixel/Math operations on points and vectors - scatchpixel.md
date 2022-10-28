---
title: "{{title}}"
---
# Math operations on geo

Now that we have explained the concept of (cartesian) coordinate system (and how points' and vectors' coordinates relate to coordinate systems), we can look at some of the most common operations which can be performed on points and vectors. This should cover the most common functions you will find in any 3D application and renderer.

## Vector Class in C++

First let's define our C++ Vector class:

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
```
## Vector Length

As we mentioned in the previous paragraph, a vector can be seen as an arrow starting from one point and finishing to another. The vector itself indicates not only the direction of point B from A but also can be used to find out the distance between A and B. This is given by the length of a vector which can easily be computed with the following formula:

||V||=V.x∗V.x+V.y∗V.y+V.z∗V.z−−−−−−−−−−−−−−−−−−−−−−−−−−−−√

In mathematics, the double bar (||V||) notation indicates the lentgh of a vector. The **vector's length** is sometimes also called **norm** or **magnitude** (figure 1).

```cpp
template<typename T>  
**class** Vec3  
{  
	**public**:  
	...  
	// length can be a method from the class...  
	T length()  
{  
**return** sqrt(x * x + y * y + z * z);  
}  
...  
};  
  
// ... or you can also compute the length in a function which is not part of the class  
template<typename T>  
T length(**const** Vec3<T> &v)  
{ **return** sqrt(v.x * v.x + v.y * v.y + v.z * v.z); }  
```
Note that the axes of the three-dimensional cartesian coordinate systems are unit vectors.

## Normalizing a Vector

We sometimes use normalise with an 's' and normalize with a 'z'. We have mixed cultural influences which is why we sometimes use one or the other, but in programming though the convention is often to use American spelling in the name of methods or functions, which is why it comes to writing code, we will always use normalize.

A normalised vector (we will use normalise with a z here which is the standard in the industry), is a vector whose length is 1 (vector B in figure 1). Such a vector is also called a **unit vector** (it is a vector which has unit length). Normalizing a vector is very simple. We first compute the length of the vector and divide each one of the vectors coordinates with this length. The mathematical notation is:

V^=V||V||

![](https://www.scratchapixel.com/images/upload/geometry/normalize.png?)

Figure 1: the magnitude or length of vector A and B is denoted by the double bar notation. A normalized vector is a vector whose length is 1 (in this example vector B).

Note that the C++ implementation can be optimised. First we only normalize the vector if its length is greater than 0 (as dividing by 0 is forbidden). We then compute a temporary variable which is the invert of the vector length, and multiply each coordinate of the vector with this value rather than dividing them with the vector's length. As you may know, multiplications in a program are less costly than divisions. This optimisation can be important, as normalizing of vector is an extremely common operations in a renderer which can be applied to thousands, hundreds of thousands, millions of vectors (when not more). At this level, any possible optimisation will have an impact on the final render time. Note though that some compilers will manage that for you under the hood. But you can always make that optimisation explicit in your code.

```cpp
template<typename T>  
**class** Vec3  
{  
	**public**:  
	...  
	// as a method of the class Vec3  
	Vec3<T>& normalize()  
	{  
	T len = length();  
	**if** (len > 0) {  
	T invLen = 1 / len;  
	x *= invLen, y *= invLen, z *= invLen;  
}  
  
**return** *this;  
}  
...  
};  

	// or as a utility function  
	template<typename T>  
	void normalize(Vec3<T> &v)  
{  
	T len2 = v.x * v.x + v.y * v.y + v.z * v.z;  
	// avoid division by 0  
	**if** (len2 > 0) {  
	T invLen = 1 / sqrt(len2);  
	x *= invLen, y *= invLen, z *= invLen;  
}  
}  
```
In mathematics, you will also find the term **norm** to define a function that assigns a length or size (or distance) to a vector. The function we have just described is called the **Euclidean norm**.

## Dot Product

![](https://www.scratchapixel.com/images/upload/geometry/dotproduct.png?)

Figure 2: the dot product of two vectors can be seen as the projection of A over B. if the two vectors A and B have unit length then the result of the dot product is the cosine of the angle subtended by the two vectors.

The dot product or scalar product requires two vectors A and B and can be seen as the projection of one vector onto the other. The result of the dot product is a real number (a float or double in programming). A dot product between two vectors is denoted with the dot sign: A⋅B

(it can also be sometimes written as <A,B>

). The dot product consists of multiplying each element of the A vector with its counterpart from vector B and taking the sum of each product. In the case of 3D vectors (length of the vector is three, they have three coefficients or elements which are x, y and z), it consists of the following operation:

A⋅B=A.x∗B.x+A.y∗B.y+A.z∗B.z

Note that this is quite similar to the way we compute the length (distance this time) of a vector. If we take the square root (A⋅B−−−−√

) of the dot product between two vectors that are equal (A=B), then what we get is the length of the vector. We can write:

||V||2=V⋅V

It can be used in the normalize method:


```cpp
template<typename T>  
**class** Vec3  
{  
	**public**:  
	...  
	T dot(**const** Vec3<T> &v) **const**  
{  
**return** x * v.x + y * v.y + z * v.z;  
}  
  
Vec3<T>& normalize()  
{  
	T len2 = dot(*this);  
	**if** (len2 > 0) {  
	T invLen = 1 / sqrt(len2);  
	x *= invLen, y *= invLen, z *= invLen;  
}  
  
**return** *this;  
}  
...  
};  
  
	template<typename T>  
	T dot(**const** Vec3<T> &a, **const** Vec3<T> &b)  
{ **return** a.x * b.x + a.y * b.y + a.z * b.z; }  
```
The dot product between two vectors is an extremely important and common operation in any 3D application because the result of this operation relates to the **cosine of the angle** between the two vectors. Figure 2 illustrates the geometric interpretation of the dot product. In this example vector A is projected in the direction of vector B.

-   if B is a unit vector then the product A⋅B
    

gives ||A||cos(θ)-   , the magnitude of the projection of A in the direction of B, with a minus sign if the direction is opposite. This is called the scalar projection of A onto B.
    
-   when neither A nor B is a unit vector, we can write that A⋅B/||B||
    
since B as a unit vector is B/||B||-   .
    
-   when the two vectors are normalised then taking the arc cosine of the dot product gives you the angle θ
    
between the two vectors: θ=cos−1(A⋅B/||A||||B||) or θ=cos−1(A^⋅B^) (in mathematics, cos−1 is the inverse of the cos

-   function. In computer programming languages, this function is generally denoted acos()).
    

![](https://www.scratchapixel.com/images/upload/geometry/dotproduct1.png?)

The dot product is a very important operation in 3D. It can be used for many things. As a test of orthogonality. When two vectors are perpendicular to each other (A.B), the result of the dot product between these two vectors is 0. When the two vectors are pointing in opposite directions (A.C), the dot product returns -1. When they are pointing in the exact same direction (A.D), it returns 1. It is also used intensively to find out the angle between two vectors or compute the angle between a vector and the axis of a coordinate system (which is useful when the coordinates of a vector are converted to spherical coordinates. This explained in the chapter on [trigonometric functions](http://localhost/lessons/mathematics-physics-for-computer-graphics/geometry/spherical-coordinates-and-trigonometric-functions)).

[![](https://www.scratchapixel.com/images/design/donate.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=78FWLXMM9YGPN)

## Cross Product

The **cross product** is also an operation on two vectors, but to the difference of the dot product which returns a number, the cross product returns a vector. The particularity of this operation is that the vector resulting from the cross product is perpendicular to the other two (this is shown in figure 3). The cross product operation is written using the following syntax:

C=A×B

![](https://www.scratchapixel.com/images/upload/geometry/crossproduct.png?)

Figure 3: the cross product of two vectors A and B gives a vector C perpendicular to the plane defined by A and B. When A and B are orhotogonal to each other (and have unit length), A, B, C form a Cartesian coordinate system.

To compute the cross product we will need to implement the following formula:

CX=AY∗BZ−AZ∗BYCY=AZ∗BX−AX∗BZCZ=AX∗BY−AY∗BX

The result of the cross product is another vector which is orthogonal to the other two. A cross product between two vectors is denoted with the cross sign: A×B

. The two vectors A and B define a plane and the resulting vector C is perpendicular to that plane. Vectors A and B don't have to be perpendicular to each other but when they are the resulting A B and C vectors form a cartesian coordinate system (assuming the vectors have unit length). This is particularly useful to create coordinate systems which we will explain in the chapter [Creating a Local Coordinate System](http://localhost/lessons/mathematics-physics-for-computer-graphics/geometry/creating-an-orientation-matrix-or-local-coordinate-system).

```cpp
template<typename T>  
**class** Vec3  
{  
	**public**:  
	...  
	// as a method of the class...  
	Vec3<T> cross(**const** Vec3<T> &v) **const**  
{  
	**return** Vec3<T>(  
	y * v.z - z * v.y,  
	z * v.x - x * v.z,  
	x * v.y - y * v.x);  
	}  
	...  
};  
  
// or as an utility function  
template<typename T>  
Vec3<T> cross(**const** Vec3<T> &a, **const** Vec3<T> &b)  
{  
	**return** Vec3<T>(  
	a.y * b.z - a.z * b.y,  
	a.z * b.x - a.x * b.z,  
	a.x * b.y - a.y * b.x);  
}  
```
If you need a mnemonic way of remembering this formula, we like to use the technique that consists of asking ourselves the question "why z?", y and z being the coordinates of vector A and B used to compute the x coordinate of the resulting vector C (because indeed "why z?" - 'why' here of course stands for the letter 'y'). More seriously, logic can easily be used to reconstruct this formula. Since you know that the result of the cross product is a vector perpendicular to the other two, you know that if A and B are the x- and y-axis of a cartesian coordinate system, the cross product of A and B should give you the z-axis that is (0,0,1). The only way you can get this result is if Cz = 1 which is only true when Cz = A.x * B.y - A.y * B.x. From there, you can deduce the other coordinates which are used to compute Cx and Cy. Finally the easiest method might just be to write the cross production operation in the following form:

⎛⎝⎜axayaz⎞⎠⎟×⎛⎝⎜bxbybz⎞⎠⎟=⎛⎝⎜aybz−azbyazbx−axbzaxby−aybx⎞⎠⎟

Presenting the vector in a column vector form, shows that for to find any coordinate of the resulting vector (for example x) we need to use the other two (y and z if x is the coordinate we wish to compute) from vector A and B.

It is very important to note that the order of the vectors involved in the cross product has an effect on the resulting vector C. If we take the previous example (taking the cross product between the x- and they y-axis of a cartesian coordinate system), you can see that A x B doesn't give you the same result than B x A:

AxB = (1,0,0)x(0,1,0) = (0,0,1),

whereas

BxA=(0,1,0)x(1,0,0)=(0,0,-1).

![](https://www.scratchapixel.com/images/upload/geometry/normalleftrighthand.png?)

Figure 4: using your left or right hand to determine the orientation of vector C (the normal for instance) when the index fingers points along A and the middle finger points along B.

![](https://www.scratchapixel.com/images/upload/geometry/normalleftrighthand2.png?)

Figure 5: using you right hand, you can align your index finger along either A or B and the middle finger against the other vector (B or A) to find out if C (the normal for instance) point upwards or inwards in the right-hand coordinate system.

We say that the cross product is **anticommutative** (swapping the position of any two arguments negates the result): If AxB=C then BxA=-C. Remember from the previous chapter that when two vectors are used to define the first two basis of a coordinate system, the third vector can point on either side of the plane. We also described a technique in which you use your hands to differentiate the two systems. When you compute a cross product between vectors you will always get the same unique solution. For instance if A = (1, 0, 0) and B = (0, 1, 0), C can only be (0, 0, 1). So you might ask why should I care about the handedness of my coordinate system then? Because if the result of the computation is always the same, the way you will draw the resulting vector however, depends on the handedness of your coordinate system. You can use the same mnemonic technique to find out in which direction the vector should point to depending on the convention you are using. In the case of a right-hand coordinate system, if you align the index finger along the A vector (for example the tangent at a point on the surface) and the middle finger along the B vector (the bitangent if you try to figure out the orientation of a normal), the thumb will point in the direction of the C vector (the normal). Note that if you use the same technique but with the left hand on the same vectors A and B, your the thumb will point in the opposite direction. Remember though, that this only a **representation** issue.

In mathematics, the result of a cross product is called a **pseudo vector**. The order of the vector in the cross product operation is important when **surface normals** are computed from the tangent and bitangent at the point where the normal is computed. Depending on this order, the resulting normal can either be pointing towards the interior of the surface (**inward-pointing normal**) or away from it (**outward-pointing normal**). You can find more information on this topic in the chapter [Creating an Orientation Matrix](https://www.scratchapixel.com/lessons/mathematics-physics-for-computer-graphics/geometry/math-operations-on-points-and-vectors#).

## Vector/Point Addition and Subtraction

Other mathematical operations on points are usually straightforward. A multiplication of a vector by a scalar or another vector gives a point. We can add two vectors to each other, subtract them, divide them, etc. Note that some 3D APIs makes the distinction between points, normals and vectors. Technically they are subtle differences between each of them which can justify to create three separate C++ classes. For example: normals are not transformed like points and vectors (we will learn about that in this lesson), subtracting two points technically gives a vector, adding a vector to another vector or a point gives a point, etc. However, from practice, we found that writing these three C++ distinct classes to represent each type is not worth some of the complexity that comes with it. Similarly to OpenEXR which has become an industry standard, we chose to represent all types with a single templated class called Vec3. We therefore make no distinction between normal, vector and points (from a coding point of view). We will just need to manage the (rare) exceptions when variables representing different types (normal, vector, points) but declared under the generic type Vec3, should be processed differently. Here is some C++ code to represent the most common operations (you will find the complete source code at the end of this lesson):


```cpp
template<typename T>  
**class** Vec3  
{  
	**public**:  

	Vec3<T> operator + (**const** Vec3<T> &v) **const**  
	{ **return** Vec3<T>(x + v.x, y + v.y, z + v.z); }  
	Vec3<T> operator - (**const** Vec3<T> &v) **const**  
	{ **return** Vec3<T>(x - v.x, y - v.y, z - v.z); }  
	Vec3<T> operator * (**const** T &r) **const**  
	{ **return** Vec3<T>(x * r, y * r, z * r); }  

};  
```
[_arrow_back_Previous Chapter](https://www.scratchapixel.com/lessons/mathematics-physics-for-computer-graphics/geometry/coordinate-systems)

Chapter 3 of 13

[Next Chapter](https://www.scratchapixel.com/lessons/mathematics-physics-for-computer-graphics/geometry/matrices)