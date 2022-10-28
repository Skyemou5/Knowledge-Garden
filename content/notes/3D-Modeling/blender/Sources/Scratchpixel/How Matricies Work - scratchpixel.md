---
title: "{{title}}"
---
# Matrices 1

## Conventions. A Word of Warning!

You may be surprised to find that the information we give on this page is different from what you find in other books or on the internet. The information is in fact the same but the order or the sign of the matrix coefficients may be different. This is because different authors/programs, use different conventions. Try to follow the logic of this lesson without paying too much attention to what other documents might say, and read the next chapter which will explain exactly how different conventions change the way we present them on paper and implement them in a program.

## Point-Matrix Multiplication

In this lesson we will start to put all the things we have learned on points, vectors, matrices and coordinate systems together. And at last, you will learn how matrices work. We mentioned in the previous chapter that two matrices needed to have compatible sizes in order to be multiplied with each other. For instance the matrices of size **m x p** and **p x n** can be multiplied with each other. We also mentioned in the previous chapter that in computer graphics, we would primarily deal with 4x4 matrices.

A point or a vector is a sequence of three numbers and for this reason they too can be written as a 1x3 matrix, a matrix that has one row and three columns:

Point written in a matrix form $P=[xyz]$

.

The trick here is that, if we can write points and vectors as [1x3] matrices, we can multiply them by other matrices. Remember than the matrix **m x p** can be multiplied by the matrix **p x n** to give the matrix **m x n**. If the first matrix is a point we can then write m = 1 and p = 3. Which implies that the **p x n** matrix is something of the form 3 x n where n can be any number greater than 1. In theory, a multiplication of a [1x3] matrix by any of the following matrices would work: [3x1], [3x2], [3x3], [3x4], etc. Here is an example of a [1x3]*[3x4] matrix multiplication:

$$\begin{bmatrix}x & y & z\end{bmatrix} *
\begin{bmatrix}
c_{00}&c_{01}&{c_{02}}&c_{03}\\
c_{10}&c_{11}&{c_{12}}&c_{13}\\
c_{20}&c_{21}&{c_{22}}&c_{23}\\
\end{bmatrix}$$

There is two things we need to remember now to make sense of what we are going to explain. The first one is that a point multiplied by a matrix transforms the point to a new position. The result of a point multiplied by a matrix has to be a point. If it wasn't the case, we wouldn't be using matrices has a convenient way of transforming points. The second thing we need to remember is that a **m x p** matrix multiplied by a **p x n** matrix, gives a **m x n** matrix. If we look at our point as a 1x3 matrix, we need the result of the multiplication to be another point, that is a 1x3 matrix. It therefore requires the matrix that we will be multiplying the point with, to be a 3x3 matrix. Multiplying a 1x3 matrix by a 3x3 matrix gives as expected, a 1x3 matrix which is another point. Here is what this multiplication looks like:

$$\begin{bmatrix}x & y & z\end{bmatrix} *
\begin{bmatrix}
c_{00}&c_{01}&{c_{02}}\\
c_{10}&c_{11}&{c_{12}}\\
c_{20}&c_{21}&{c_{22}}\\
\end{bmatrix}$$

In CG, we usually use 4x4 matrices instead of 3x3 matrices and we will soon explain why, but for now, lets stick with the 3x3 matrices for a while. To finish this section of the chapter, we will write some pseudocode to show how we can multiply a point P

(or a vector) in its matrix form to a 3x3 matrix to get a new transformed point PT

. If you need a refresher on matrix multiplication, read the previous chapter. Remember that for each coefficient of new matrix, you need to multiply each coefficient from the current row for the left-hand side matrix with its "equivalent" coefficient from the current column for the right-hand side matrix and sum up the resulting products. In pseudo code, it gives something like that (we will give the version for 4x4 matrices later):

```cpp
// multiply coeffs from row 1 with coeffs from column 1  
Ptransformed.x = P.x * c00 + P.y * c10 + P.z * c20  
// multiply coeffs from row 1 with coeffs from column 2  
Ptransformed.y = P.x * c01 + P.y * c11 + P.z * c21  
// multiply coeffs from row 1 with coeffs from column 3  
Ptransformed.z = P.x * c02 + P.y * c12 + P.z * c22  
```
## The Identity Matrix

The **identity matrix** or **unit matrix** is a square matrix whose coefficients are all 0 excepted the coefficients along the diagonal which are set to 1:

$$\begin{bmatrix}
\color{red}{1} & 0 & 0 \\
0 & \color{red}{1} & 0 \\
0 & 0 & \color{red}{1}
\end{bmatrix}$$

The result of P multiplied by the identity matrix is P. If we replace the coefficient of the identity matrix in the point-matrix multiplication code we can clearly understand why:

```cpp
// multiplying P by the identity matrix gives P  
Ptransformed.x = P.x * 1 + P.y * 0 + P.z * 0 = P.x  
Ptransformed.y = P.x * 0 + P.y * 1 + P.z * 0 = P.y  
Ptransformed.z = P.x * 0 + P.y * 0 + P.z * 1 = P.z  
```

## The Scaling Matrix

If you look at the code of the point-matrix multiplication you can see that the coordinates of the point P are respectively multiplied by the coefficients R00

for x, R11 for y and R22

for z. When these coefficients are set to 1 (and all the other coefficients of the matrix are set to 0), we get the identity matrix. However when these coefficients (along the diagonal) are different than 1 (whether smaller or bigger than 1), then they act as a multiplier on the point's coordinates (in other words, the points coordinates are scaled up or down by some amount). If you remember what we have said in the chapter on coordinate systems, multiplying the coordinates of a point by some real numbers results in scaling the point's coordinates. The scaling matrix can therefore be written as:

$$\begin{bmatrix}
\color{red}{S_X} & 0 & 0 \\
0 & \color{red}{S_Y} & 0 \\
0 & 0 & \color{red}{S_Z}
\end{bmatrix}$$

Where the real numbers SX

, SY and SZ

are the scaling factors.

```cpp
// multiplying P by the scaling matrix  
Ptransformed.x = P.x * Sx + P.y * 0 + P.z * 0 = P.x * Sx  
Ptransformed.y = P.x * 0 + P.y * Sy + P.z * 0 = P.y * Sy  
Ptransformed.z = P.x * 0 + P.y * 0 + P.z * Sz = P.z * Sz  
```
As an example, imagine a point P which coordinates are (1, 2, 3). If we set the coefficients of the scaling matrix with Sx = 1, Sy = 2 and Sz = 3, then P multiplied by this matrix gives another point whose coordinates are (1, 4, 9).

Note that if either one of the scaling coefficients in the matrix are negative, then the point's coordinate for the corresponding axis will be flipped (it will be mirrored to the other side of the axis).

## The Rotation Matrix

What we will be talking about in this paragraph is about building a matrix that will rotate a point or a vector around one axis of the cartesian coordinate system. And for doing so, we will need to use trigonometric functions.

![](https://www.scratchapixel.com/images/upload/geometry/rotation.png?)

Figure 1: a 90 degrees counterclockwise rotation.

Lets take a point P defined in a three-dimensional coordinate system with coordinate (1, 0, 0). Lets ignore the z-axis for a while and assume that the point lies in the xy plane. What we want is to transform the point from P

to PT by the mean of a rotation (we could do this with a translation but using a rotation will make our demonstration easier). PT coordinates are (0, 1, 0). As you can see in figure 1 this can be done by rotating the point around the z-axis by 90 degrees **counterclockwise**. Lets assume now that we have a matrix R. When P is multiplied by R it transforms P to PT

. Considering what we know about matrix multiplication lets see how we can re-write a point-matrix multiplication and isolate the computation of each of the transformed point coordinates:

$$\begin{array}{l}
P_T.x = P.x * R_{00} + P.y * R_{10} + P.z * R_{20}\\
P_T.y = P.x * R_{01} + P.y * R_{11} + P.z * R_{21}\\
P_T.z = P.x * R_{02} + P.y * R_{12} + P.z * R_{22}\\
\end{array}$$

![](https://www.scratchapixel.com/images/upload/geometry/rotation45.png?)

Figure 2: a 45 degrees counterclockwise rotation.

As we said, we don't care so much about PT.z

for now which represents the z-coordinate of PT. Lets concentrate instead on PT.x and PT.y which represent respectively the x and y coordinates of PT. From P to PT, the x-coordinate goes from 1 to 0. If we look at the first line of the code we wrote to compute PT, it means that R00 has to be equal to 0. Considering that P.y and P.z are 0 anyway we don't care so much about the values that R10 and R20 may have for now. From P to PT the y-coordinate goes from 0 to 1. Lets have a look at the second line of code. What do we know about P? We know that P.x is 1 and that all the other coordinates of P are 0. Which necessarily means that R01 has to be 1. Let's recap. We know that R00 is 0 and R01 is 1. Lets write it down and see what R

looks like (compare this matrix with the identity matrix):

$$R_z=
\begin{bmatrix}
0 & 1 & 0 \\
1 & 0 & 0 \\
0 & 0 & 1 \\
\end{bmatrix}$$

Don't worry for now if you don't understand why the coefficients have the value they have. That will be explained soon. All you want to see, is that if you use this matrix to transform $P = (1, 0, 0)$ you will get $P_T = (0, 1, 0)$.

$$\begin{array}{l}
P_T.x = P.x * 0 + P.y * 1 + P.z * 0 = 0\\
P_T.y = P.x * 1 + P.y * 0 + P.z * 0 = 1\\
P_T.z = P.x * 0 + P.y * 0 + P.z * 1 = 0\\
\end{array}$$

![](https://www.scratchapixel.com/images/upload/geometry/unitcircle.png?)

Figure 3: cosine and sine can be used to determine the coordinate of a point on the x- and y-axis of the unit circle.

This is where our knowledge of trigonometric functions will become handy. If we look at a point on the unit circle we know that its x and y coordinates can be computed using the sine and the cosine of the angle θ

(see figure 3).

$$\begin{array}{l}
x = \cos(\theta) = 0\\
y = \sin(\theta) = 1\\
\text{with } {\theta = {\pi \over 2}}\\
\end{array}$$

When θ

= 0, x = 1 and y = 0. When θ = 90 degrees (or π2), x = 0 and y = 1. That is interesting because you will notice that x = 0 and y = 1 are the values of R00/R11 and R01/R10

respectively. So we could re-write the matrix R as:

$$R_z(\theta)=
\begin{bmatrix}
\cos(\theta) & \sin(\theta) & 0 \\
\sin(\theta) & \cos(\theta) & 0 \\
0 & 0 & 1 \\
\end{bmatrix}
=
\begin{bmatrix}
0 & 1 & 0 \\
1 & 0 & 0 \\
0 & 0 & 1 \\
\end{bmatrix} \text{ with } {\theta = {\pi \over 2}}$$

If you only want to make a rotation of 45 degrees (replace 90 by 45 or π4) and apply R to P, you will get the coordinates (0.7071, 0.7071) for PT

which is correct (figure 2). Thus, it seems that we can generalise the notation for R (a matrix that rotates points around the z-axis) and write:

$$R_z(\theta)=
\begin{bmatrix}
\cos(\theta) & \sin(\theta) & 0 \\
\sin(\theta) & \cos(\theta) & 0 \\
0 & 0 & 1 \\
\end{bmatrix}$$

We know that the transformation from P

to PT works with R in its current form but lets now imagine that P is (0, 1, 0) and PT is (1, 0, 0) which is a rotation of 90 degrees but this time **clockwise** (figure 4, see further down). Would R work and transform P to PT

? Lets check:

$$R_z=
\begin{bmatrix}
\cos(-{\pi \over 2}) & \sin(-{\pi \over 2}) & 0 \\
\sin(-{\pi \over 2}) & \cos(-{\pi \over 2}) & 0 \\
0 & 0 & 1 \\
\end{bmatrix}=
\begin{bmatrix}
0 & -1 & 0 \\
-1 & 0 & 0 \\
0 & 0 & 1 \\
\end{bmatrix}$$

$$\begin{array}{lll}
P_T.x = &0 * R_{00} &+& 1 * R_{10} &+& P.z * R_{20} &= \\
&0*0 &+& 1*-1 &+& 0*0&=-1\\
P_T.y = &0 * R_{01} &+& 1 * R_{11} &+& P.z * R_{21} &= \\
&0*-1 &+& 1*0 &+& 0*0&= 0\\
P_T.z = &0 * R_{02} &+& 1 * R_{12} &+& P.z * R_{22} &= \\
&0*0 &+& 1*0 &+& 0*1&= 0\\
\end{array}$$

That doesn't seem quite right since we started from the point with coordinate (0, 1, 0) and after transformation, we have the coordinates (-1, 0, 0) instead of (1, 0, 0). If we want the coordinates (1, 0, 0), R01

should be 1 (and not -1). In that case we would get for R:

$$R_z=
\begin{bmatrix}
\cos(-{\pi \over 2}) & \sin(-{\pi \over 2}) & 0 \\
-\sin(-{\pi \over 2}) & \cos(-{\pi \over 2}) & 0 \\
0 & 0 & 1 \\
\end{bmatrix}=
\begin{bmatrix}
0 & -1 & 0 \\ 1 & 0 & 0 \\
0 & 0 & 1 \\
\end{bmatrix}$$

$$\begin{array}{lll}
P_T.x = &0 * R_{00} &+& 1 * R_{10} &+& P.z * R_{20} &= \\
&0*0 &+& 1*1 &+& 0*0&=1\\
P_T.y = &0 * R_{01} &+& 1 * R_{11} &+& P.z * R_{21} &= \\
&0*-1 &+& 1*0 &+& 0*0&= 0\\
P_T.z = &0 * R_{02} &+& 1 * R_{12} &+& P.z * R_{22} &= \\
&0*0 &+& 1*0 &+& 0*1&= 0\\
\end{array}$$

![](https://www.scratchapixel.com/images/upload/geometry/rotationmin90.png?)

Figure 4: a 90 degrees clockwise rotation.

We know that the points in the xy plane should stay in the xy plane if we rotate them around the z-axis (so our rotation matrix Rz should not affect the z-coordinate of PT). When we look at the code transforming P to PT, it is easy to see that the third row and the third column do not affect the computation of PT. The first two coefficients in the third column which are used to compute a value for PT.z, R02 and R12, are set to 0 and the third one, R22, is set to 1 which multiplied by P.z leaves the value of P.z

unchanged. We can conclude that the matrix generating a rotation of a point/vector around the z-axis has the following form:

$$R_z(\theta)= \begin{bmatrix} \cos(\theta) & \sin(\theta) & 0 \\ -\sin(\theta) & \cos(\theta) & 0 \\ 0 & 0 & 1 \\ \end{bmatrix}$$

To find the matrices that could rotate a point around the x and y axis (or in the yz and xz planes) we can simply follow the same logic we used to find the matrix that rotates points and vectors around the z-axis (on in the xy plane). We will leave this to you as an exercise but considering the information we have given for finding Rz, that should be fairly simple. If Rx is the matrix that generates a rotation around the x-axis and Ry is the matrix that generates a rotation around the y-axis, here is what these matrices look like:

$$R_x(\theta)= \begin{bmatrix} 
1 & 0 & 0 \\
0 & \cos(\theta) & \sin(\theta) \\
0 & -\sin(\theta) & \cos(\theta) \\
\end{bmatrix}$$

$$R_y(\theta)= \begin{bmatrix}
\cos(\theta) & 0 & -\sin(\theta) \\
0 & 1 &  0 \\
\sin(\theta) & 0 & \cos(\theta) \\ 
\end{bmatrix}$$

$$R_z(\theta)= \begin{bmatrix} \cos(\theta) & \sin(\theta) & 0 \\ -\sin(\theta) & \cos(\theta) & 0 \\ 0 & 0 & 1 \\ \end{bmatrix}$$

Remember that you multiply the point's coordinates by the coefficients contained in each **column** of these matrices to compute the x, y and z coordinates of the transformed point.

![](https://www.scratchapixel.com/images/upload/geometry/rotation2.png?)

Figure 5: rotations around the x- y- and z-axis. The arrow indicates the rotation direction for positive angles.

![](https://www.scratchapixel.com/images/upload/geometry/rothand.png?)

Figure 6: if you use a left hand coordinate system (left) wrap your fingers around the axis of rotation to find in which direction positive rotation values will rotate points and vectors. If you use a right-hand coordinate system, use the same procedure using your right hand instead.

You can also use the mnemonic technique we have described in the chapter on coordinate system to easily find out in which directions point or vectors will rotate if the angle of rotation is positive. For a right-hand coordinate system, wrap your fingers around the axis of rotation (like showed in figure 6) and they will naturally indicate the direction in which positive rotation values rotates vectors and points (positive rotation is counter-clockwise). For a left-hand coordinate system, repeat the procedure but use your left hand instead (positive rotation is clockwise).

## Combining (Rotation) Matrices

We have learned in the previous chapter that multiplying matrices together combines their transformations. Now that we know how to rotate points around individual axis, it is possible to multiply $Rx, Ry, Rz$ together (using every possible combinations) to create more complex rotations. If for instance you want to rotate a point around the x-axis, and then the y-axis, we can create two matrices using the matrices Rx and Ry and combine them using matrix multiplication $(Rx*Ry)$ to create a $Rxy$ matrix encoding the two individual rotations:

$RXY=RX∗RY$

Note that the order of rotation is important and makes a difference. If you rotate a point around the x-axis first and then the y-axis second, you will end up (in most cases) with a result which is different from a rotation around the y-axis then around the x-axis. In most 3D packages such as Maya, 3DSMax, Softimage, Houdini, etc. it is possible to specify the order in which the rotations takes place. For instance the order can be $xyz$, ... (see in Maya the list of possible options).

## The Translation Matrix

To translate points using point-matrix multiplication we need to use [4x4] matrices. This chapter being limited to [3x3] matrices, we will explain how translation works with matrices in the chapter Transforming Points and Vectors.

## Rotation around an Arbitrary Axis

It is possible to write some code that will rotate a point or a vector around an arbitrary axis. However this is won't be necessary to write a basic raytracer and we will develop this topic in a future revision of this lesson after the other basic lessons are completed.

[_arrow_back_Previous Chapter](https://www.scratchapixel.com/lessons/mathematics-physics-for-computer-graphics/geometry/matrices)

Chapter 5 of 13

[Next Chapter](https://www.scratchapixel.com/lessons/mathematics-physics-for-computer-graphics/geometry/how-does-matrix-work-part-2)