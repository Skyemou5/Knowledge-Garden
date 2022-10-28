---
title: "{{title}}"
---

# Transforming Points

## Transforming Points

We have introduced almost all we need to know to now write the code that will transform points using matrices. However even though translation seems to be the easiest linear operator that can be applied to point, we haven't mentioned it often in the previous chapter. Because to get the translation working with the theory of matrix multiplication, we need to make a change to the point structure that might confuse you slightly.

As we mentioned in the last two chapters a matrix-matrix multiplication can only work if the two matrices involved have a compatible size. That is if they have the size m x p and p x n. Let's keep that in mind. Let's start from a 3x3 identity matrix. We know that a point multiplied by this matrix have its coordinates unchanged. Let's see what changes we need to bring to that matrix to handle translation. Translation on a point is nothing more than adding a number to each of its coordinates (these numbers can be positive or negative). For instance if we want to move the point (1, 1, 1) to the coordinate (2, 3, 4) we need to add the values 1, 2 and 3 respectively to each of the points' x, y and z coordinates. It is very simple. Note that from now on, we will keep looking at points and vectors as matrix of size 1x3.

$$\begin{array}{l}
P'.x = P.x + Tx\\
P'.y = P.y + Ty\\
P'.z = P.z + Tz\end{array}$$

Now let's get back to the code that transforms a point using a matrix:

$$\begin{array}{l}
P'.x = P.x * M_{00} + P.y * M_{10} + P.z * M_{20}\\
P'.y = P.x * M_{01} + P.y * M_{11} + P.z * M_{21}\\
P'.z = P.x * M_{02} + P.y * M_{12} + P.z * M_{22}\end{array}$$

What do we need to get the rotation matrix extended so that it handles translation as well? We would need to be able to have a fourth term to the right that would encode the translation. Something like this:

$$\begin{array}{l}
P'.x = P.x * M_{00} + P.y * M_{10} + P.z * M_{20} + T_X\\
P'.y = P.x * M_{01} + P.y * M_{11} + P.z * M_{21} + T_Y\\
P'.z = P.x * M_{02} + P.y * M_{12} + P.z * M_{22} + T_Z
\end{array}$$

Now remember that we want to come up with a matrix that encodes scale, rotation and translation. So somehow, we need to get Tx, Ty, Tz to fit within the code of the point-matrix multiplication (and store these thee values somewhere in the matrix). Look at the first line for now. Note that to compute x', we only use the coefficients of the matrix first column. If the column had four coefficients instead of three, then Tx would be M30. The same reasoning can be done with Ty and Tz. We would then get:

$$\begin{array}{l}
P'.x = P.x * M_{00} + P.y * M_{10} + P.z * M_{20} + T_X\\
P'.y = P.x * M_{01} + P.y * M_{11} + P.z * M_{21} + T_Y\\
P'.z = P.x * M_{02} + P.y * M_{12} + P.z * M_{22} + T_Z
\end{array}$$

However this is assuming that our matrix now has the size 4x3 and not 3x3 anymore. This is alright. We said that matrices could have any size. However we know that matrix multiplication can only be valid if their sizes are compatible. But we now try to multiply a point as a 1x3 matrix with a 4x3 matrix and theory tells us that this not possible. What shall we do? The solution is simple. We will add one additional column to the point to turn it into a 1x4 matrix and set the fourth coefficient of this point to 1. Our point now looks like this (x, y, z, 1). In computer graphics, it is a called a **homogeneous point** (or a point with **homogeneous coordinates**). With such a point we can easily encode translation in our matrix. See how it magically falls in place in the following code:

$$\begin{array}{l}
P'.x = P.x * M_{00} + P.y * M_{10} + P.z * M_{20} + M_{30}\\
P'.y = P.x * M_{01} + P.y * M_{11} + P.z * M_{21} + M_{31}\\
P'.z = P.x * M_{02} + P.y * M_{12} + P.z * M_{22} + M_{32}\end{array}$$

This is the theory. In order to encode translation, scale and rotation in a matrix we need to deal with points that have homogeneous coordinates. But because the fourth value is always 1 we never really explicitly define it in the code. We only define x, y, z and assume that there is a fourth value. The point-matrix code now looks like this:

$$\begin{array}{l}
P'.x = P.x * M_{00} + P.y * M_{10} + P.z * M_{20} + M_{30}\\
P'.y = P.x * M_{01} + P.y * M_{11} + P.z * M_{21} + M_{31}\\
P'.z = P.x * M_{02} + P.y * M_{12} + P.z * M_{22} + M_{32}\end{array}$$

Our matrix is a now a 4x3 matrix. So you may wonder, how do we go from a 4x3 matrix to our final 4x4 matrix which is the form that is the most commonly used in CG? The fourth columns plays a role in perspective projection and for some other type of transformations that are not very common (such as the shear transformation), but generally it is simply set to (0, 0, 0, 1). What happens though when the coefficient of this column have different values than the default (we said it's uncommon but it happens some times)? Before we can answer this question, we first need to learn a few more things about homogenous points.

## The Trick About Homogeneous Points

Presenting a point as an homegeneous point is necessary to allow point-multiplication by [4x4] matrices however, in the code, this is only done implicitely, since, as we have explained, w is always 1. Our Point C++ class will not define the point type with four floats but only with three (x, y and z). Technically, if we were to make a multiplication of an homogeneous point by a [4x4] matrix, the w coordinate of the transformed point would be obtained by multiplying the point's coordinates by the coefficients of the matrix fourth column. However as we mentioned before, this column is almost always set to (0, 0, 0, 1). In that case, the value of w' (the w coordinate of the transformed point) should be 1 (w'=x*0+y*0+z*0+w(=1)*1=1) and the resulting transformed x', y' and z' coordinates can be used directly. But as we also mentionned briefly, this fourth column is not always set to (0, 0, 0, 1) particularly when you deal with projection matrices (matrices that project points to the screen). In these special cases, the result for w' can be different than 1 (which is intentional) but for this point to be usable as a Cartesian point, we need to normalize w' back to 1 by dividing it by itself which requires to divide the other coordinates (x', y' and z') by w' as well. In pseudo code it gives something like that:


```cpp
P'.x = P.x * M00 + P.y * M10 + P.z * M20 + M30;  
P'.y = P.x * M01 + P.y * M11 + P.z * M21 + M31;  
P'.z = P.x * M02 + P.y * M12 + P.z * M22 + M32;  
w' = P.x * M03 + P.y * M13 + P.z * M23 + M33;  
**if** (w' != 1 && w' != 0) {  
	P'.x /= w', P'.y /= w', P'.z /= w';  
}  
```
As you can see we don't need to declare a w coordinate in the Point's type. We can just compute a value for w' on the fly as we assume implicitely that the point we are transforming is a Cartesian point which you can see as a homogeneous point whose w coordinate is not declared explicitly (because it's always equal to 1). However, if the matrix we are multiplying the point with is a projection matrix for instance, the result of w' might be different than 1. In this particular case, we need to normalize all the coordinates of P' to set it back to 1. Once this is done, we get a point which we can use in our Cartesian coordinate system again.

All you need to remember is that generally, you will never have to care about homogeneous coordinates, excepted when points are multiplied by a perspective projection matrix. However, you will actually probably not come across this issue if you work on a ray tracer, as this special type of matrix is not used in ray tracing. If you still struggle to understand what this w coordinate is, and what it is used for, check the lesson on Perspective and Orthographic Projection Matrix in the 3D Basic Rendering section. You will learn how to project 3D points onto the image plane, using perspective projection. The concept of homogeneous point should then make more sense.

When it comes to implement this function in C++ there are usually two schools to deal with this problem. Some developers like the code for point-matrix multiplication to always compute a value for w' and divide the coordinates of the transformed points by the value of w' if it is different than 1. However, this is only useful when we multiply points by projection matrices which is not that often (particularly in raytracers). It might end up that in 99% of cases, computing w' and checking if it is different than 1 is a waste of CPU time. One might ignore w and w' all together and always assume the point-matrix multiplication code will be used with matrices whose fourth column is always set to (0, 0, 0, 1). When dealing with the special case of projection matrices, you could come up with another specific function that will compute w' and divide x' y' and z' by w's value. You can chose between a generic solution but not completely optimised and a more optimised solution which requires though two functions instead of one. For the sake of clarity, we will provide here an implementation for the first solution:

```cpp
void multVecMatrix(**const** Vec3<T> &src, Vec3<T> &dst) **const**  
{  
	dst.x = src.x * m[0][0] + src.y * m[1][0] + src.z * m[2][0] + m[3][0];  
	dst.y = src.x * m[0][1] + src.y * m[1][1] + src.z * m[2][1] + m[3][1];  
	dst.z = src.x * m[0][2] + src.y * m[1][2] + src.z * m[2][2] + m[3][2];  
	T w = src.x * m[0][3] + src.y * m[1][3] + src.z * m[2][3] + m[3][3];  
	**if** (w != 1 && w != 0) {  
	dst.x = x / w;  
	dst.y = y / w;  
	dst.z = z / w;  
}  
}  
```
## Transforming Vectors

Vectors somehow are simpler to transform than points. Vectors, as we said in the preamble of this lesson, represent direction whereas points represent position in space. As such **vectors do not need to be translated** because their position is in fact meaningless. With vectors we are only interested in the direction in which they point and eventually their length which is sometimes an information we need to solve geometric or shading problems. Vectors can be transformed like we transformed point but we can remove the part of the code that is responsible for the translation bit. The code used to transform vectors looks like this (compare it with the code to transform points).


```cpp
V'.x = V.x * M00 + V.y * M10 + V.z * M20;  
V'.y = V.x * M01 + V.y * M11 + V.z * M21;  
V'.z = V.x * M02 + V.y * M12 + V.z * M22;  
```
Here is the code that transforms vectors:


```cpp
void multDirMatrix(**const** Vec3<T> &src, Vec3<T> &dst) **const**  
{  
	dst.x = src.x * m[0][0] + src.y * m[1][0] + src.z * m[2][0];  
	dst.y = src.x * m[0][1] + src.y * m[1][1] + src.z * m[2][1];  
	dst.z = src.x * m[0][2] + src.y * m[1][2] + src.z * m[2][2];  
}  
```
## Transforming Normals

As strange as it sounds, you might think that normals are just like vectors and can be transformed using the same code. In fact it is not that simple and we will explained why in the chapter on [Transforming Normals](https://www.scratchapixel.com/lessons/mathematics-physics-for-computer-graphics/geometry/transforming-points-and-vectors#).

## Conclusion

In this chapter we have learned why we use [4x4] rather than [3x3] matrices. The coefficients c30

c31 and c32

hold the translation values. Now that the matrix has size [4x4] we need to extend the size of the point by adding an extra coordinate. We can do this by implicitly treating points as Homegenous points but to continue using them in a Cartesian coordinate system (as Cartesian points) we need to be sure that w, this fourth coordinate is always set to 1. Most of the time the matrices we use to transform a point will have their fourth column set to (0, 0, 0, 1) and with these matrices, the value of w' should always be 1. However in special cases (projection matrix, shear transform) the value of w' might be different than 1 in which case you will need to normalize it (we divided w' by itself) which requires to also divide the other transformed coordinates x', y' and z' by w'.

Matrices are not the only method to "encode" or store transformations. You can also for instance represent a rotation using a method proposed initially by Euler. The idea is to define a rotation in this case as a vector and an angle representing a rotation around that vector. You can also use a technique developed by [Benjamin Olinde Rodrigues](https://en.wikipedia.org/wiki/Olinde_Rodrigues). Given an axis r^

, an angle θ and a point p, the rotation is given by the following equation:

$R(r^,θ,p)=pcosθ+(r^×p)sinθ+r^(r^⋅p)(1−cosθ)$.

While uncommon, both techniques are used to solve problems in computer graphics from time to time. Rotations in computer graphics are also commonly done using **quaternions**. Matrices themselves have certain limitations especially when it comes to rotation by an angle greater than 360 degrees. This can lead to a problem known as the [gimbal lock](https://en.wikipedia.org/wiki/Gimbal_lock). Matrices are also hard to interpolate which is often needed in rendering to compute the motion blur of objects. For this particular reason, quaternions are generally preferred though they are considered to be generally harder to understand. A lesson is devoted to the topic of quaternions alone [link].