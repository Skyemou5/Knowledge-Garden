---
title: "{{title}}"
---
# Matrices 2

## Relation Between Matrices and Cartesian Coordinate Systems

If you imagine that you have a point Px

with coordinates (1, 0, 0) and want to rotate this point around the z-axis by 10 degrees clockwise, what would be the new point's coordinates. Using what we have learned so far on rotation matrices, we know that these new coordinates can be found using simple trigonometry. The x coordinates of the new rotated point is given by cos(-10) and the y coordinate is given by $sin(-10)$ (don't forget that the trigonometric functions in C++ expect the angles to be expressed in radians). If we do the same thing but this time with a point $P_y$ which is (0, 1, 0) then the x coordinate of this point after rotation will be equal to -sin(-10) and the y coordinate will be equal to $cos(-10)$. You can observe that the first line (or row) of the rotation matrix that rotates points around the z-axis $(RZ)$ contains the same trigonometric functions than those we used to compute the new coordinates of the point $P_x$ after rotation. The same observation can be made for the second line of the matrix which also contains the same trigonometric functions than those we used to compute the new coordinates for $P_y:$
$$\begin{array}{ll}Px_x = \cos(\theta)&Px_y = \sin(\theta)\\Py_x=-\sin(\theta)& Py_y=\cos(\theta)\end{array}$$



As you can see, as we rotate these axes around the z-vector, the new coordinates can be computed using for $P_x$

the first row of the matrix, and for $P_y$, the second row. If you repeat the exercise for $P_z$ and the rotation matrix $RX$ or $RY$ you will see that the new coordinates of $P_z$ can be computed using the third row of any one of these matrices (depending on which axis your rotate $P_z$ around).

The key idea in understanding matrices is that each row of the matrix represents an axis (or the bases) of a coordinate system. This is important as later, you will learn how to create matrices to transform points and vectors from one coordinate system to another (change of basis) by simply replacing the rows of the matrix by the coordinates of each axis of that coordinate system you want to transform your vectors or points into:

$$\begin{bmatrix}
\color{red}{c_{00}}& \color{red}{c_{01}}&\color{red}{c_{02}}\\
\color{green}{c_{10}}& \color{green}{c_{11}}&\color{green}{c_{12}}\\
\color{blue}{c_{20}}& \color{blue}{c_{21}}&\color{blue}{c_{22}}\\
\end{bmatrix}
\begin{array}{l}
\rightarrow \quad \color{red} {x-axis}\\
\rightarrow \quad \color{green} {y-axis}\\
\rightarrow \quad \color{blue} {z-axis}\\
\end{array}$$

This is a common technique in CG and will be described in the next chapters. Matrices are less of mystery when you understand that they are just a way of storing the coordinates of a coordinate system where the **rows of the matrix are the axis of this coordinate system** or **orientation matrix** as we call it sometimes.

## Orthogonal Matrices

In fact the type of matrices we have just described in this chapter and the previous one (the rotation matrices), are called in linear algebra, **orthogonal matrices**. An orthogonal matrix is a square matrix with real entries whose columns and rows are **orthogonal unit vectors**. We have mentioned previously that each row from the matrix represents an axis of a Cartesian coordinate system. If the matrix is a rotation matrix or the result of several rotation matrices multiplied with each other, then each row necessarily represents an axis of unit length (because the elements of the rows are constructed from the sine and cosine trigonometric functions which are used to compute the coordinates of points lying on the unit circle). You can see them as a Cartesian coordinate system which is originally aligned with the world coordinate system (the identity matrix's rows represent the axes of the world coordinate system) and rotated around one particular axis or a random axis. Orthogonal matrices have a few interesting properties but maybe the most useful one in Computer Graphics, is that the **transpose** of an orthogonal matrix is equal to its **inverse**. Assuming Q is an orthogonal matrix, we can write:

$QT=Q−1$ which entails that $QQT=I$

where I is the identity matrix (see the chapter on [Matrix Operations](http://localhost/lessons/mathematics-physics-for-computer-graphics/geometry/matrix-operations) to learn more about matrix inversion, the transpose of a matrix and the matrix identity).

## Affine Transformations

You will sometimes find the terms **affine transformations** used in place of matrix transformation. This technical term is actually more accurate to designate the transformations that you get from using the type of matrices we have described so far. In short, an affine transformation, is a transformation that preserves straight lines. The translation, rotation, shearing matrix are all affine transformations as are their combinations. The other type of transformation we will be studying in Computer Graphics are called **projective transformations** (perspective projection is a projective transformation). As you may have guessed, such transformations do not necessarily preserve parallelism between lines (check the lessons on the perspective and orthographic projection matrix in the [Foundation of 3D Rendering](http://localhost/lessons/3d-basic-rendering) section).

## Summary

![](https://www.scratchapixel.com/images/upload/geometry/rotationcoordsys.gif?)

Figure 6: as the point rotates, its coordinates in regard to the world coordinate system (red and green axes) change. But they stay the same in regards the coordinate system defined by the rotation matrix.

Not only you have learned in this chapter (and the previous one) how to create rotation matrices but we have also given you a way of visualizing what a matrix is: each row of the matrix represents one axis of a Cartesian coordinate system. The orientation (rotation), size (scale) and position (translation) of this coordinate system represents the transformation that will be applied to the points when they are multiplied by this matrix. The key idea is that points are originally defined in a certain coordinate system (lets call it A). If a point is attached to a local coordinate system B (the matrix) and that we move, rotate and translate that local coordinate system (i.e. the matrix), the point coordinates will not change in regard to the local coordinate system B. The point is somehow constrained to the transformation applied to the local coordinate system B (it moves with it). However, the coordinates of that point will change in the coordinate system A. Multiplying the point whose coordinates are expressed in regards to A by the matrix B will provide us with the point's new coordinates in the coordinate system A. This is illustrated in figure 6.

What you need to remember from that chapter, is how to find the formula for the basic rotation matrices. That the order by which you multiply this basic matrices is important. And finally (and that's almost the most important) that a matrix can be seen as a local cartesian system where each row of the matrix represents one axis of that local coordinate system. Such matrix is also called an orientation matrix and we will explain why in the chapter [Creating an Orientation Matrix or Local Coordinate System](http://localhost/lessons/mathematics-physics-for-computer-graphics/geometry/creating-an-orientation-matrix-or-local-coordinate-system).