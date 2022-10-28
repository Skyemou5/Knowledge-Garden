---
title: "{{title}}"
---

# Spherical Coordinates

Beside points, vector, normals and matrices the last useful technique from linear algebra we will need to render images is to express vectors in terms of spherical coordinates. We could certainly render images wihout using them, but you will see that using them simplifies many problems especially when it comes to shading. This chapter is also a good opportunity to review trigonometric functions.

## Trigonometric Functions

![](https://www.scratchapixel.com/images/upload/geometry/trigonometry.png?)

Figure 1: the sine and cosine function can be used to find the coodinate of P which lies on the unit circle.

Rendering a computer generated images is almost entirely a geometric problem so not understanding or using trigonometry for creating such images (and the phythagorean theorem) would be very hard. Let's start to review the **sine** and **cosine** function as well as the way angles can be computed from 2D coordinates. Usually these functions are defined in regards to the **unit circle** (a circle of radius 1). When we draw a point P on this unite circle, the x-coordinate of the point can be computed using the cosine of the angle subtended by the x-axis and a line that goes from the origin of the coordinate system to P. This angle is usually called θ

(the greek letter theta). Similarly, the sine of this angle gives the y-coordinate of the point P. Note that the angle θ is defined in **radians**. It will be easier to defined the angles in degrees, but we will need to convert them internally to radians to use them in the C++ trigonometric functions: θradians=π180θdegrees. Remember that a complete turn around the unit circle represents 360 degrees of 2π

.

![](https://www.scratchapixel.com/images/upload/geometry/triangle.png?)

Figure 2: names given to the side of a right-triangle

It is also important to remember that the cosine, sine and tangent functions are defined from a simple relationship between the edges of a right triangle (right-angled triangle). The tangent formula is interesting because to come back to our example using the unit circle, you can see that it can be computed using the ratio of y over x. Another very useful function in Computer Graphics is the **arctangent** which is the tangent inverse function. In other words, if you feed the arctangent function with the result of the tangent function you get θ

. In programming you can use the atan function but this function doesn't take the sign of the parameters x and y into account. For instance if P has coordinates (0.707, 0.707) the angle θ is π/4. If the coordinates of P are now (-0.707, -0.707) theta should then be 3π/4. But the tan function will compute the ratio -0.0707/-0.0707 which is 1; the result of the tan function for such coordinates will thus be π/4

though this is the angle for the point with coordinates (0.707, 0.707) and not (-0.707, -0.707). This is obviously wrong. To fix the issue, you need to use the C/C++ function atan2 instead which takes into account the sign of the point's coordinates in the computation of the angle (check the documentation on the function for further details). Similarly to atan2, you can compute the inverse function of sine and cosine using arcsine (sin in C++) and arccosine (acts). Let's summarise all the functions we have talked about so far:

$$\begin{array}{l}
\sin(\theta)={\text{opposite side} \over \text{hypothenuse}}\\
\cos(\theta)={\text{adjacent side} \over \text{hypothenuse}}\\
\tan(\theta)={\text{opposite side} \over \text{adjacent side}}
\end{array}$$

$$\begin{array}{l}
\theta = \text{acos}(P_x)\\
\theta = \text{asin}(P_y)\\ 
\theta = \text{atan2}(P_y, P_x)
\end{array}$$

Refer to the documentation of these functions to learn what they exactly return. The interesting thing to note is that the angle returned by the atan2 function is positive for counter-clockwise angles (upper half-plane, y > 0) and negative for clockwise angles (lower half-plane, y < 0). It produces results in the range [−π,π]

. Finally let's finish this quick reminder with the Pythagorean Theorem which we will also be using often (for example the ray-sphere intersection test which you can find explained in the [Foundations of 3D Rendering](http://localhost/lessons/3d-basic-rendering) section). It says that:

$hypothenuse2=adjacent2+opposite2$

In other words, the square of the hypothenuse length is equal to the sum of the squares of the other two sides of the right triangle (adjacent and opposite).


## Representing Vectors with Spherical Coordinates

![](https://www.scratchapixel.com/images/upload/geometry/sphericalcoord.png?)

Figure 3: a vector can also be represented by two angles: the vertical angle (in red) θ

and the horizontal angle (in green) ϕ

.

![](https://www.scratchapixel.com/images/upload/geometry/sphericalcoord1.png?)

Figure 4: in the top figure, we are looking perpendicularly to the plane defined by the vector and the up axis. In the bottom figure, we are looking at the vector from the top. The angle θ

(top figure) can vary from 0 to π and the angle ϕ (bottom figure) can vary from 0 to 2π.

So far we have learned how to represent vectors (as in directions) using cartesian coordinates (with three values, one for each axis). It is also possible though to represent the same vectors with only two values. One to represent the angle between the vector and the vertical axis and one to represent the angle between the the vector projected onto the horizontal plane and the right vector from the Cartesian coordinate system. In figure 3, these angles are represented in red and green. The vertical angle is always called θ

(the greek letter theta) and the horizontal angle (in green) is always called ϕ (the greek letter phi). No matter what you do and what you see in text books, we advise you to follow these rules which is about the only convention unanimously followed by the CG community. These angles should be expressed in radians. Note that θ lies within the range [0:π] while ϕ varies in the range [0:2π] (see figure 4). As such θ and ϕ can also be seen as coordinates and are called **sphercal coordinates**. In figure 4 we can see what the vector looks like in 2D view. On top, we are looking perpendiculary to the plane defined by the vector and the up axis. The bottom figure represents a view from the top. Vr Vu and Vf correspond to the cartesian coordinates of the vector in the Cartesian coordinates systems defined by the right, up and forward axes. Note that we haven't used the names x, y, z for the axis for a reason we will explain soon. Also, we have always represented a normalized vector (of unit length) but any vectors of arbitrary length can be represented using spherical coordinates. The formal definition of spherical coordinates includes an additional term (usually denoted r for radial distance) to represent the length of the vector combined with θ and ϕ

which can also be called the **polar** and **azimuth** angles. Spherical coordinates are just another way of enconding vectors. They make this representation compact as only two numbers are used instead of three (if you don't care about the length of the vector) with the Cartesian coordinates (it can save memory in your program) and they will become most useful when we will talk about shading. The question now is how we convert a vector represented in Cartesian coordinates to spherical coordinates.

## Conventions Again: Z is Up!

![](https://www.scratchapixel.com/images/upload/geometry/sphericalcoord3.png?)

Figure 5: in mathematics and physics, spherical coordinates are represented in a Cartesian coordinate system where the z-axis represents the up vector.

The convention when it comes to represent vectors in mathematics and physics is to name the up vector as the z-axis and the right and forward vector respectively the x- and y-axis. And to make things easier, the convention is also to use a **left-hand coordinate** system (which you can see in figure 5). If you read an article on spherical coordinates from a reliable wiki, it's very likely that it will use this convention. Having z-axis representing the up vector, is something we have already briefly mentioned in the chapter on [Coordinate System](http://localhost/lessons/mathematics-physics-for-computer-graphics/geometry/coordinate-systems). As you can see, this convention is different from the one we normally use (where the up axis is the y-axis) but unfortunatly this notation is the norm and we will have to stick to it. What is actually the main point of interest to us, is how this will affect our code. When we will study shading, you will see that we use a trick to convert the vectors from world space to a local coordinate system where the normal at the surface of the shaded point represent the up vector (see the next chapter [Creating an Orientation Matrix or Local Coordinate System](http://localhost/lessons/mathematics-physics-for-computer-graphics/geometry/creating-an-orientation-matrix-or-local-coordinate-system)). However rather than building the matrix to transform vector from whatever space they are in to this local coordinate system by copying the tangent (x-axis), the normal (y-axis) and the bi-tangent (z-axis) to the first (right vector), second (up vector) and third (forward vector) row of the matrix as we usually do, we will copy them in them in this order:

$$\begin{bmatrix}T_x&T_y&T_z&0\\B_x&B_y&B_z&0\\N_x&N_y&N_z&0\\0&0&0&1\end{bmatrix}$$

Where T, B and N represent the tangent bi-tangent and normal vectors. Note that we swapped the position of the normal (up vector or y-axis in the conventional coordinate system) and the bitangent (forward vector or z-axis in the conventional coordinate system) in the matrix construction. Let's see how this work. Imagine you have a normal whose coordinates in world space are (0, 1, 0). In other words, it points straight up. Let's construct a matrix using the trick we have just learned where the tangent and bit agent vectors have the coordinates (1, 0, 0) and (0, 0, 1):

$$\begin{bmatrix}1&0&0&0\\0&0&1&0\\0&1&0&0\\0&0&0&1\end{bmatrix}$$

Now imagine you want to transform a vector v

in the local frame represented by this matrix and that the coordinates of this vector are (0, 1, 0). It is parallel to the y-axis in world space. If we apply the matrix-vector multiplication formula we get:

$${ \begin{array}{l}
x = Vx * M_{00} + Vy * M_{10} + Vz * M_{20} = 0 * 1 + 1 * 0 + 0 * 0 = 0\\
y = Vx * M_{01} + Vy * M_{11} + Vz * M_{21} = 0 * 0 + 1 * 0 + 0 * 1 = 0\\
z = Vx * M_{02} + Vy * M_{12} + Vz * M_{22} = 0 * 0 + 1 * 1 + 0 * 0 = 1\end{array} }$$

As you can see, once transformed, the vector has coordinates (0, 0, 1). It is aligned with the up vector which is represented by the normal which is also in this special case the z-axis. We have successfully managed to convert a vector in a coordinate system where the z-axis is the up vector. This concept is confusing especially if you try to display the resulting vector in a 3D application where the y-axis is up and the z-axis is the forward axis. However the way you need to look at this, is really more like a swap of the y- and z-coordinates of the vector.

## Converting Cartesian to Spherical Coordinates

![](https://www.scratchapixel.com/images/upload/geometry/sphericalcoord4.png?)

Figure 6: it is easier to see that Vz is equal to cos(θ)

when we rotate the figure by 90 degrees clockwise.

For the demonstration, we will assume that the vector is normalised. The illustration on the left in figure 6 is the same as the top illustration in figure 4 but with the up vector now represented as the z-axis (in blue). If we rotate the figure by 90 degrees clockwise (on the right of figure 6) you can see that it looks similar to figure 1 where the x-coordinates (in figure 1) was computed using the formula cos(θ). Applied to the case showed in figure 6, we can therefore say that Vz is equal to cos(θ) as well (here Vz is the same as Px in figure 1). And consequently the angle θ itself can be computed as the arccosine of the value Vz:

$$\begin{array}{l}V_z = \cos(\theta) \rightarrow \theta = acos(V_z)\end{array}$$

In C++ you will write:


```cpp
**float** theta = acos(Vz);  
```
![](https://www.scratchapixel.com/images/upload/geometry/sphericalcoord5.png?)

Figure 7: computing the angle ϕ.

Let's now find out how to compute the angle ϕ

. Let's now have a look at figure 7 which is the same at the illustration at the bottom of figure 4 but where the right and forward axis have now be named the x- and y-axis (in red and green). Remember from our quick trigonometric function refresher (at the top of this chapter), that the tangent of an angle can be computed by taking the ratio of the opposite side (which is Vy in this example) over the adjacent side (Vx) of a right triangle. You may ask why we just not compute this angle like we did for θ where we used the arccosine of the value Vx to find ϕ. That would actually be an option, but don't forget that ϕ varies from 0 to 2π. The advantage of using the tangent rather than the cosine is that the C++ implementation of the function (or rather the atan2 C++ function) will take into account the sign of its arguments (Vy and Vx) to return an angle that either varies from 0 to π if the vector is in the right part of the unit circle, and 0 to −π if the vector is in the left part of the unit circle. As a programmer, you will need to remap this value to the range [0:2π]

if necessary (look at the end of this lesson for the complete code):

$$tan(\phi)= { V_y \over V_x } \rightarrow \phi = atan({V_y \over V_x})$$

In C++ you will write:


```cpp
**float** phi = atan2(Vy, Vx);  
```
## And Vice Versa: Spherical Coordinates to Cartesian Coordinates

The formula to compute Cartesian coordinate back from spherical coordinates is actually straightforward:

$$\begin{array}{l}
x =\cos(\phi)\sin(\theta)\\
y=\sin(\phi)\sin(\theta)\\
z=\cos(\theta)
\end{array}$$

It is not always easy to remember this formula by heart, but it is always possible to re-write it from simple deductions. We know that the z coordinate of the vector only depends on the angle theta and that Vz=cos(θ). As for the x coordinate, imagine that you want V to have coordinates (1, 0, 0) which is true when θ=π/2 and ϕ=0. We know that sin(π/2)=1 and cos(0)=1 thus x=sin(θ)cos(ϕ). The same technique can be used to find y. Here some C++ code to compute cartesian coordinates from the two spherical angles:

```cpp
template<typename T>  
Vec3<T> sphericalToCartesian(**const** T &theta, **const** T &phi)  
{  
	**return** Vec3<T>(cos(phi) * sin(theta), sin(phi) * sin(theta), cos(theta));  
};  
```
## More Tricks with Trigonometric Functions

Now that we have explained how to convert from cartesian coordinates to spherical and vice and versa, we will show a couple of useful functions that can be used in the renderer to manipulate vectors using both representations. The first function we will write is to compute θ from the cartesian coordinates. Remember than for spherical coordinates we will use a left-hand coordinate system in which the z-axis is the up vector. We have explained in this chapter than we can write:

```cpp
template<typename T>  
inline T sphericalTheta(**const** Vec3<T> &v)  
{  
	**return** acos(clamp<T>(v[2], -1, 1));  
}  
```
Note that the input vector is supposed to be normalised so the vector's z-coordinates should be in the range [-1:1] but clamping this value is safer. Next we will write a function to compute ϕ. We have mentioned in this chapter before than the function atan returns a value in the range [−π:π]. We will need to remap this value in the range [0:2π].

```cpp
template<typename T>  
inline T sphericalPhi(**const** Vec3<T> &v)  
{  
	T p = atan2(v[1], v[0]);  
	**return** (p < 0) ? p + 2 * M_PI : p;  
}  
```
It is not always necessary to compute the angle values from the cartesian coordinates. Sometimes we just want to get the values for cos(θ), sin(θ), cos(ϕ) or sin(ϕ). Computing cos(θ) is really straightforward (it is very similar to the function sphericalTheta we wrote earlier):

```cpp
template<typename T> inline T cosTheta(**const** Vec3<T> &w) { **return** w[2]; }  
```
Computing sin(θ) is a bit more complicated. We know that a vector lying on the unit circle has length 1 (unit length). We also know (Pythagorean theorem) that for such vector we can write V2x+V2y=1. If $Vx=cos(θ)$ and $Vy=sin(θ)$ we can write:

$$\cos(\theta)^2 + \sin(\theta)^2 = 1 \rightarrow \sin(\theta)^2=1-\cos(\theta)^2$$

We can first write a function that compute sin(θ)2 and then another one to compute sin(θ) which just returns the square root of the result return by the first function:

```cpp
template<typename T>  
inline T sinTheta2(**const** Vec3<T> &w)  
{  
	**return** std::max(T(0), 1 - cosTheta(w) * cosTheta(w));  
}  
  
template<typename T>  
inline T sinTheta(**const** Vec3<T> &w)  
{  
	**return** sqrt(sinTheta2(w));  
}  
```

![](https://www.scratchapixel.com/images/upload/geometry/projectvec.gif?)

Figure 8: the shadow of the yellow vector (v)

corresponds to the projection of (v) on the xy plane. This projected vector (vp) is shorter than a unit length vector but to normalize it, we can divide it xy coordinates by sin(θ) which we then can use to compute sin(ϕ) and cos(ϕ).

### Computing cos(ϕ)

and sin(ϕ) is also slightly more complicated. As you can see in figure 8, even though the vector v is of unit length in world space, its shadow on the xy plane creates a vector which doesn't lie on the unit circle (unless θ=π/2). Technically speaking, the shadow of this vector corresponds to **projecting** the vector v on the xy plane. However using atan2 to compute ϕ only works for vector of unit length. You can also notice that the length of the vector v projected in the xy plane (vp), is directly related to the angle θ (figure 9). For values of θ close to 0 or π, vp is very small (example on the left in figure 8) and for values close to π/2, vp is longer (it lies on the unit circle when θ=π/2).

![](https://www.scratchapixel.com/images/upload/geometry/projphi.png?)

Figure 9. Left: the length of the vector vp

can be computed using sin(θ). Right: the x and y coordinates of the vector vp

once normalised can be used to compute phi (using atan2(y, x)).

The value sin(θ)

represents the length of the vector vp which is the vector v projected on the xy plane (figure 9a). Dividing the coordinates of vp by this length has for effect to normalise vp. Once a unit length vector, the x and y coordinates of vp can be used to compute sin(ϕ) and cos(ϕ).

```cpp
template<typename T>  
inline T cosPhi(**const** Vec3<T> &w)  
{  
	T sintheta = sinTheta(w);  
	**if** (sintheta == 0) **return** 1;  
	**return** clamp<T>(w[0] / sintheta, -1, 1);  
}  
  
template<typename T>  
inline T sinPhi(**const** Vec3<T> &w)  
{  
	T sintheta = sinTheta(w);  
	**if** (sintheta == 0) **return** 0;  
	**return** clamp<T>(w[1] / sintheta, -1, 1);  
}  
```
[_arrow_back_Previous Chapter](https://www.scratchapixel.com/lessons/mathematics-physics-for-computer-graphics/geometry/matrix-operations)

Chapter 10 of 13

[Next Chapter](https://www.scratchapixel.com/lessons/mathematics-physics-for-computer-graphics/geometry/creating-an-orientation-matrix-or-local-coordinate-system)