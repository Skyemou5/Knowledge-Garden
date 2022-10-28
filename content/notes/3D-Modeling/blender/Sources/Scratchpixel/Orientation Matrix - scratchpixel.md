---
title: "{{title}}"
---

# Orientation Matrix

## Creating on Orientation Matrix or Local Coordinate System

In this chapter, we will use what we have learned so far about coordinate systems and what they represent to build a local coordinate system (or frame) from a vector which can also be a normal. This technique is often used in the rendering pipeline as a way of converting point and vectors which are defined in one coordinate system to another. The idea is to let the normal at that point to become one of the axis of that local coordinate system (often aligned with the up vector, and let the tangent and bi-tangent of that point to become the other two orthogonal axes of that local frame.

![](https://www.scratchapixel.com/images/upload/geometry/normal.png?)

Figure 1: the tangent (T) and bi-tangent (B) are lying in the plane tangent at P. Taking the cross product between T and B gives the surface normal N. Note that T, B and N are orthogonal to each other and form a Cartesian coordinate system.

The best way of constructing such as local frame is to use the **normal**, the **tangent** and **bi-tangent** at the surface P which, as we explained before lie in the plane tangent to P at the surface. The three axes should be orthogonal and of unit length. In the lessons related to computing the intersection between a ray and various geometric primitives, we will usually also learn how to compute the **derivatives** at the hit point (which we will call **dPdu** and **dPdv**) which are the technical terms used to describe the tangent and bitangent at P (check the lesson on geometric primitives to learn more about derivatives). We will usually find the normal at P from a cross product between dPdu and dPdv. However, you will have to be careful about the direction in which these two vectors are pointing in, to be sure that the result of this cross product is a vector oriented away from the surface (and not inward). If you know the directions the two vectors point to in space, then you can use the right-hand rule to figure out the order you should use them in to get a normal that points in the right direction (see chapters 3 [Math Operations on Points and Vectors](http://localhost/lessons/mathematics-physics-for-computer-graphics/geometry/math-operations-on-points-and-vectors)).

![](https://www.scratchapixel.com/images/upload/geometry/crossnormal.png?)

Figure 2: on the left the cross product of A and B gives a vector C point away from the normal. On the right the cross product of B and A gives a vector which points inwards. The direction of the resulting vector can easily be found using the right-hand rules.

Assuming the normal N will correspond to the up vector, the tangent will be aligned with the right vector and the bitangent aligned along the dow vector, we can write these tree vectors as the rows of the following [4x4] matrix:

$$\begin{bmatrix}T_x&T_y&T_z&0\\N_x&N_y&N_z&0\\B_x&B_y&B_z&0\\0&0&0&1\end{bmatrix}$$

![](https://www.scratchapixel.com/images/upload/geometry/normal2.png?)

Figure 3: the order in which the axis coordinates are written as rows of the orientation matrix depends on the convention you will be using. The up vector is usually the y-axis but in shading particularly, it's not unusual to choose the z-axis as the up-vector. If we assume a right-hand coordinate system, the z-axis in the figure on the left (a) would have to be the tangent, and the x-axis would have to be the bi-tangent. In figure b, y would have to be the tangent and x the bitangent. Point the index finger along the tangent and the middle finger along the bi-tangent to find out the direction of normal using the right-hand mnemonic technique.

However you will have to be careful about the context (in the code) in which you will be using this matrix. Some parts of the code might be using a different convention where for example the up vector is considered to be the z-axis. This is usually particularly true for code that deals with shading tasks (to understand why, check the previous chapter on [Spherical Coordinates](http://localhost/lessons/mathematics-physics-for-computer-graphics/geometry/spherical-coordinates-and-trigonometric-functions)). In which case, the rows should be re-ordered in the following way:

$$\begin{bmatrix}T_x&T_y&T_z&0\\B_x&B_y&B_z&0\\N_x&N_y&N_z&0\\0&0&0&1\end{bmatrix}$$

As you can see the coordinates of the normal are now on the third row of the matrix. Why do we suddenly use the convention of aligning the normal to the surface with the z-axis of the coordinate system? It is very confusion but sadly this is also a convention which is used in most papers related to shading which we can't ignore for this reason. It is preferable to follow the same convention. Note in figure 4 how the up vector is defined by the y-vector in the world coordinate system but is represented by the z-vector in the local coordinate system.

Remember that if you use a column-major order convention (Scratchapixel uses a row-major order convention), the vectors will have to written as columns and not rows. For instance if the z-vector is considered to be the up vector, in the first column you will write the coordinates of T, in the second the coordinates of B and in the third the coordinates of N.

![](https://www.scratchapixel.com/images/upload/geometry/localcoord.png?)

Figure 4: it is sometimes useful to express a vector V in a local coordinate system which we can create from the normal and thangent at a point on the surface. If the normal N and tangent T are knows it is easy to compute the bitangent B and create a matrix from these three vectors that will represent this world-to-local coordinate system matrix that transforms V in world space to the space defined by N, T and B. This technique is very useful in shading. Note that the V vector doesn't change direction. Its coordinates are just different in the two coordinate systems.

So the question you may ask now, is what do we do with this matrix? If you have a vector v

which is defined let say in world space (but any other space will do as well), then multiplying this vector by this matrix M will give a vector vM whose coordinates are defined in regards to the local coordinate system you constructed from N, T and B

. As you can see there is no translation value set on the fourth row of the matrix which is the reason we call that type of matrix, an **orientation matrix**. You only want to use this matrix with vectors, and it will mainly be used in shading, where expressing vectors coordinates in relation to the surface normal (where N is usally aligned along the up vector which is either by convention the y- or z-axis) can greatly simplify the computation involved in finding out the color of an object at the point of intersection with the ray (figure 4). This technique will be studied in detail in the lesson on Shading.

**Affine Space**: some renderers (such as [Embree from Intel](http://software.intel.com/en-us/articles/embree-photo-realistic-ray-tracing-kernels)) prefer to represent matrices or transformation as [affine space](http://en.wikipedia.org/wiki/Affine_space) in which a Cartesian coordinate system is defined as a location in space (the origin of the coordinate system say O for instance) and three axes (Vx, Vy, Vz). With this representation a vector (or point) can be transformed with the following code: