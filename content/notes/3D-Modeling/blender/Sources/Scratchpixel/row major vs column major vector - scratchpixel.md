---
title: "{{title}}"
---

# matrix math

Earlier in this lesson, we have explained that vectors (or points) can be written down as [1x3] matrices (one row, three columns). Note however that we could have also written them down as [3x1] matrices (three rows, one column). Technically, these two ways of expressing points and vectors as matrices are perfectly valid and choosing one mode or the other is just a matter of convention.

Vector written as [1x3] matrix:$$V=\begin{bmatrix}x & y & z\end{bmatrix}$$

Vector written as [3x1] matrix: $$V=\begin{bmatrix}x\\y\\z\end{bmatrix}$$

In the first example ([1x3] matrix) we have expressed our vector or point in what we call the **row-major order**: the vector (or point) is written as a row of three numbers. In the second example, we say that that points or vectors are written in **column-major order**: we write the three coordinates of the vector or point vertically, as a column.

Remember that we express points and vectors as matrices to multiply them by [3x3] transformation matrices (for the sake of simplicity we will work with [3x3] rather than [4x4] matrices). We have also learned that we can only multiply matrices when the number of columns from the left matrix and the number of rows from the right matrix are the same. In other words the matrices [m x p] and [p x n] can be multiplied with each other but the matrices [p x m] and [p x n] can't. Note that if we write a vector as a [1x3] matrix we can multiply it by a [3x3] matrix (assuming this [3x3] matrix is on the right inside of the multiplication), but if we write this vector as a [3x1] matrix then we can't multiply it by a [3x3] matrix. This is illustrated in the following examples. The inner dimensions (3 and 3) of the matrices involved in the multiplication are the same (in green) so this multiplication is valid (and the result is a transformed point written in the form of a [1x3] matrix):

$$[1 \times \color{\green}{3}]*[\color{\green}{3} \times 3] = \begin{bmatrix}x & y & z\end{bmatrix} * \begin{bmatrix}
c_{00}&c_{01}&{c_{02}}\\
c_{10}&c_{11}&{c_{12}}\\
c_{20}&c_{21}&{c_{22}}\\
\end{bmatrix} =\begin{bmatrix}x'&y'&z'\end{bmatrix}$$

The inner dimensions (1 and 3) of the matrices involved in the multiplication are not the same (in red) so this multiplication is not possible:

$$3 \times \color{\red}{1}]*[\color{\red}{3} \times 3] \rightarrow \begin{bmatrix}x\\ y\\z\end{bmatrix} * \begin{bmatrix} c_{00}&c_{01}&{c_{02}}\\ c_{10}&c_{11}&{c_{12}}\\ c_{20}&c_{21}&{c_{22}}\\ \end{bmatrix}$$

So what do we do? The solution to this problem is not to multiply the vector or the point by the matrix, but the matrix M by the vector V. In other words, we move the point or vector to the right inside of the multiplication:

[$$[{3} \times \color{\green}{3}]*[\color{\green}{3} \times {1}] \rightarrow \begin{bmatrix} c_{00}&c_{01}&{c_{02}}\\ c_{10}&c_{11}&{c_{12}}\\ c_{20}&c_{21}&{c_{22}}\\ \end{bmatrix} * \begin{bmatrix}x\\y\\z\end{bmatrix} = \begin{bmatrix}x'\\y'\\z'\end{bmatrix}$$

Note that the result of this operation is a transformed point written in the form of a [3x1] matrix. So we get a point to start with and we finish with a transformed point which is what we want. Problem solved. To summarize, when by convention we decide to express vectors or points in row-major order ([1x3]), we need to put the point on the left side of the multiplication and the [3x3] on the right inside of the multiplication sign. This is called in mathematics, a **left** or **pre-multiplication**. If you decide to write the vectors in column-major order instead ([3x1]), the [3x3] matrix needs to be on the left side of the multiplication and the vector or point on the right side. This is called a **right** or **post-multiplication**.


we need to be careful about how these terms are actually used. For instance Maya documentation says "the matrices are post-multiplied in Maya. For example, to transform a point P from object-space to world-space (P') you would need to post-multiply by the worldMatrix. (P' = P x WM)", which is confusing because it's actually a pre-multiplication but they are speaking about the position of the matrix with respect to the point in this particular case. That's actually an incorrect use of the terminology. It should have been written that in Maya, points and vectors are expressed as row-major vectors and that they are therefore pre-multiplied (meaning the point or vector appears before the matrix in the multiplication).


The following table summarizes the differences between the two conventions (where P, V and M respectively stands for Point, Vector and Matrix).

Row-major order

$$P/V=\begin{bmatrix}x & y & z\end{bmatrix}$$

Left or pre-multiplication

$P/V * M$

Column-major order

$$P/V=\begin{bmatrix}x \\ y \\ z\end{bmatrix}$$

Right or post-multiplication

$M * P/V$

Now that we have learned about these two conventions you might ask "isn't that just about writing things on paper?". We know how to compute the product of two matrices A and B: multiply each coefficient within A's current row by the associated elements within B's current column and sum up the result. Lets apply this formula using the two conventions and lets compare the results:

### Row-major order

$${ \begin{bmatrix}x & y & z\end{bmatrix} * \begin{bmatrix}
a & b & c \\
d & e & f \\
g & h & i
\end{bmatrix} }$$

$${ \begin{array}{l}x' = x * a + y * d + z * g\\y' = x * b + y * e + z * h\\z' = x * c + y * f + z * i\end{array} }$$

### Column-major order

$${ \begin{bmatrix} 
a & b & c \\
d & e & f \\
g & h & i
 \end{bmatrix} * \begin{bmatrix}x\\y\\z\end{bmatrix} }$$

$${\begin{array}{l}x' = a * x + b * y + c * z\\y' = d * x + e * y + f * z\\z' = g * x + h * y + i * z\end{array} }$$

Multiplying a point or a vector by a matrix should give us the same result whether we use row- or column-major order. If you use a 3D application to rotate a point by a certain angle around the z-axis, you expect the point the be in certain position after the rotation no matter what internal convention the developer used to represent points and vectors. However as you can see from looking at the table above, multiplying a row-major and column-major point (or vector) by the same matrix clearly wouldn't give us the same result. To get back on our feet, we would actually need to **transpose** the [3x3] matrix used in the column-major multiplication to be sure that x', y' and z' are the same (if you need to remember what the transpose of a matrix is, check the chapter on [Matrix Operations](http://localhost/lessons/mathematics-physics-for-computer-graphics/geometry/matrix-operations)). Here is what we get:

### Row-major order

$${ \begin{bmatrix}x & y & z\end{bmatrix} * \begin{bmatrix}
a & b & c \\
d & e & f \\
g & h & i
\end{bmatrix} }$$

$${\begin{array}{l}x' = x * a + y * d + z * g\\y' = x * b + y * e + z * h\\z' = x * c + y * f + z * i\end{array} }$$

### Column-major order

$${ \begin{bmatrix} 
a & d & g \\
b & e & h \\
c & f & i
\end{bmatrix} * \begin{bmatrix}x\\y\\z\end{bmatrix} }$$

$${\begin{array}{l}x' = a * x + d * y + g * z\\y' = b * x + e * y + h * z\\z' = c * x + f * y + i * z\end{array} }$$

In conclusion, going from row-major order to column-major order not only involves to swap the point or vector and the matrix in the multiplication but also to transpose the [3x3] matrix, to guarantee that both conventions give the same result (and vice versa).

From these observations, we can see that any series of transformations applied to a point or a vector when a row-major convention is used can be written in sequential order (or reading order). Imagine for instance that you want to translate point P with matrix T then rotate it around the z-axis with Rz then around the y-axis with Ry. You can write:

$P′=P∗T∗Rz∗Ry$

If you were to use a column-major notation you would need to call the transform in reverse order (which one might find counter-intuitive):

$P′=Ry∗Rz∗T∗P$

So you may think, "there must be a reason to prefer one system to another". In fact, both conventions are correct and give us the same result, but for some technical reasons, Maths and Physics texts generally treat vectors as column vectors.

Order of transformation when we use colum-major matrices is more similar in mathematics to the way we write function evaluation and composition.

The row-major matrix convention however makes matrices easier to teach which is the reason we use it for Scratchapixel (as well as Maya, DirectX. They are also defined as the standard in the RenderMan specifications). However some 3D APIs such as OpenGL, use a column-major convention.

## Implication in Coding: Does it Impact Performance?

There is another potentially very important aspect to take into consideration if you need to choose between row-major and column-major, but this has nothing to do really with the conventions themselves and how practical one is over the other. It has more to do with the computer and the way it works. Remember that we will be dealing with [4x4] matrices. Typically the implementation of a matrix in C++ looks like this:

```cpp
**class** Matrix44  
{  
	...  
	**float** m[4][4];  
};  
```
As you can see the 16 coefficients of the [4x4] matrix are stored in a two-dimensional array of floats (or doubles depending on the precision you need. Our C++ Matrix class is a template). Which means that in memory the 16 coefficients will be laid out in the following manner: c00, c01, c02, c03, c10, c11, c12, c13, c20, c21, c22, c23, c30, c31, c32, c33. In other words, they are laid out contiguously in memory. Now lets see how these coefficients are accessed in a vector-matrix multiplication where vectors are written in row-major order:



```cpp
// row-major order  
x' = x * c00 + y * c10 + z * c20  
y' = x * c01 + y * c11 + z * c21  
z' = x * c02 + y * c12 + z * c22  
```

As you can see the elements of the matrix for x' are not access sequentially. In other words to compute x' we need the 1st, 5th and 9th float of the matrix 16 floats array. To compute y' we need to access the 2nd, 6th and 10th float of this array. And finally for z' we need the 3rd, 7th and 11th float from the array. In the world of computing, accessing elements from an array in a non-sequential order, is not necessarily a good thing. It actually potentially degrades the cache performance of the CPU. We won't go into too much details here, but lets just say that the closest memory that the CPU can access to is called a cache. This cache is very fast to access to but can only store a very limited number of data. When the CPU needs to access some data, it first check if it exists in the cache. If it does the CPU access this data right away (cache hit), but it doesn't (cache miss), it first needs to create an entry in the cache for it, then copy to this location the data from the main memory. This process is obviously more time consuming than when the data already exists in the cache so ideally we want to avoid cache misses as much as possible. Additionally to copying the particular data from main memory, the CPU also copies a chunk of the data that lives right next to it (for instance the next 24 bytes), because hardware engineers figured that if your code needed to access an element of an array for instance, it was likely to access the elements following it soon after. Indeed, in programs, we often loop over elements of an array in sequential order and this assumption is therefore likely to be true. Applied to our matrix problem, accessing the coefficients of the matrix in non sequential order can therefore be a problem. Assuming the CPU loads the requested float in the cache plus the 3 floats next to it, our current implementation might lead to many cache misses, since the coefficients used to compute x' y' and z' are 5 floats apart in the array. On the other hand, if you use a column-major order notation, computing x' for instance require to access the 1st, 2nd and 3rd elements of the matrix.

 
```cpp
// column-major order  
x' = c00 * x + c01 * y + c02 * z  
y' = c10 * x + c11 * y + c12 * z  
z' = c20 * x + c21 * y + c22 * z  
```
	
The coefficients are accessed in sequential order which also means that we make a good use of the CPU cache mechanism (only 3 cache misses instead of 9 in our example). In conclusion we can say that from a programming point of view, implementing our point- or vector-matrix multiplication using a colum-major order convention might be better, performance wise, than the version using the row-major order convention. Practically though, we haven't been able to demonstrate that this was actually the case (when you compile your program using the optimisation flags -O, -O2 or -O3, the compiler can do the work for you by optimising loops over multi-dimensionals arrays) and we have been successfully using the row-major order version without any lose of performance compared to a version of the same code using a column-major order implementation.

```cpp

template<typename T>  
**class** Vec3  
{  
	**public**:  
	Vec3(T xx, T yy, T zz) : x(xx), y(yy), z(zz) {}  
	T x, y, z, w;  
};  
  
template<typename T>  
**class** Matrix44  
{  
	**public**:  
	T m[4][4];  
	Vec3<T> multVecMatrix(**const** Vec3<T> &v)  
	{  
	#ifdef ROWMAJOR  
	**return** Vec3<T>(  
	v.x * m[0][0] + v.y * m[1][0] + v.z * m[2][0],  
	v.x * m[0][1] + v.y * m[1][1] + v.z * m[2][1],  
	v.x * m[0][2] + v.y * m[1][2] + v.z * m[2][2]);  
	#else  
	**return** Vec3<T>(  
	v.x * m[0][0] + v.y * m[0][1] + v.z * m[0][2],  
	v.x * m[1][0] + v.y * m[1][1] + v.z * m[1][2],  
	v.x * m[2][0] + v.y * m[2][1] + v.z * m[2][2]);  
	#endif  
}  
};  

	#include <cmath>  
	#include <cstdlib>  
	#include <cstdio>  
	#include <ctime>  

	#define MAX_ITER 10e8  

	**int** main(**int** argc, **char** **argv)  
{  
	clock_t start = clock();  
	Vec3<float> v(1, 2, 3);  
	Matrix44<float> M;  
	**float** *tmp = &M.m[0][0];  
	**for** (**int** i = 0; i < 16; i++) *(tmp + i) = drand48();  
	**for** (**int** i = 0; i < MAX_ITER; ++i) {  
	Vec3<float> vt = M.multVecMatrix(v);  
}  
	fprintf(stderr, "Clock time %f\n", (clock() - start) / float(CLOCKS_PER_SEC));  
	**return** 0;  
}  
```

## Row-major and Column-Major Order in Computing

For the sake of completeness, lets just mention as well, that terms row-major and column-major order can also be used in **computing** to describe the way elements of multidimensional arrays are laid out in memory. In row-major order, the elements of a multi-dimensional array are laid out one after the other, from the left to right, top to bottom. This is the method used by C/C++. For example the matrix:

$$M = \begin{bmatrix}1&2&3\\4&5&6\end{bmatrix}$$

could be written in C/C++ as:

```cpp
**float** m[2][3]={{1, 2, 3}, {4, 5, 6}};  
```
and the elements of this array would be laid out contiguously in linear memory as:


```
1 2 3 4 5 6  
```
In column-major order, which is used by languages such as FORTRAN and MATLAB, elements of the matrix are stored in memory from top to bottom, left to right. Using the same matrix example, the elements of the matrix would be stored (and accessed) in memory in the following way:

```matlab
1 4 2 5 3 6  
```

Knowing how the elements of a matrix are laid out in memory is important especially when you try to access them using pointer offset and for loop optimisation (we have explained previously in this chapter that it could affect the CPU cache performance). However since we will only be considering C/C++ as our programming language, column-major ordering (applied to computing) is of no great interest to us. We are only mentioning what the terms mean in computing, so that you are aware that they might describe two different things depending on the context in which they are used. You should be careful to not mix them up. In the context of mathematics, they describe whether you treat vectors (or points) as rows of coordinates or as columns and the second, and in the context of computing, they describe the way a certain programming language stores and accesses elements of multi-dimensional array (which matrices are) in memory.

OpenGL is an interesting case in that regard. When GL was initially created, the developers chose the row-major vector convention. Developers who extended OpenGL though thought they should go back to to column-major vector which they did. However for compatibility reasons, they didn't want to change the code for the point-matrix multiplication and decided instead to change the order in which the coefficients of the matrix were stored in memory. In other words OpenGL stores the coefficients in column-major order which means that the translation coefficients m03, m13 and m23 from a matrix using column-major vector have indices 13, 14, 15 in the float array as would the translation coefficients m30, m31 and m32 from a matrix using row-major vector.

## Summary

The differences between the two conventions are summarised in the following table:

### Row-major vector (Mathematics)
$$P/V=\begin{bmatrix}x & y & z\end{bmatrix}$$


Pre-multiplication $vM$

Call order and the order the transforms are applied is the same: "take P, transform by T, transform by Rz, transform by Ry" is written as $P′=P∗T∗Rz∗Ry$

API: Direct X, Maya

The rows of the matrix represent the bases (or axes) of a coordinate system (red: x-axis, green: y-axis, blue:z-axis)

$${\begin{bmatrix} \color{red}{c_{00}}& \color{red}{c_{01}}&\color{red}{c_{02}}&0\\ \color{green}{c_{10}}& \color{green}{c_{11}}&\color{green}{c_{12}}&0\\ \color{blue}{c_{20}}& \color{blue}{c_{21}}&\color{blue}{c_{22}}&0\\0&0&0&1 \end{bmatrix} }$$

The translation values are stored in the c30, c31 and c32 elements.

$${\begin{bmatrix}
1&0&0&0\\
0&1&0&0\\
0&0&1&0\\
Tx&Ty&Tz&1\end{bmatrix} }$$


Transpose the matrix to use it as a column-major ordered matrix


### Column-major vector (Mathematics)



$$P/V=\begin{bmatrix}x \\ y \\ z\end{bmatrix}$$



Post-multiplication $Mv$



Call order is the reverse of the order the transforms are applied: "take P, transform by T, transform by Rz, transform by Ry" is written as P′=Ry∗Rz∗T∗P



API: OpenGL, PBRT, Blender



The columns of the matrix represent the bases (or axes) of a coordinate system (red: x-axis, green: y-axis, blue:z-axis)

$${ \begin{bmatrix} \color{red}{c_{00}}& \color{green}{c_{01}}&\color{blue}{c_{02}}&0\\ \color{red}{c_{10}}& \color{green}{c_{11}}&\color{blue}{c_{12}}&0\\ \color{red}{c_{20}}& \color{green}{c_{21}}&\color{blue}{c_{22}}&0\\0&0&0&1\end{bmatrix} }$$



The translation values are stored in the c03, c13 and c23 elements.

$${\begin{bmatrix}
1&0&0&Tx\\
0&1&0&Ty\\
0&0&1&Tz\\
0&0&0&1\end{bmatrix} }$$


Transpose the matrix to use it as a row-major ordered matrix

### Row-major matrix (Computing)
API: Direct X, Maya, PBRT

### Column-major matrix (Computing)
API: OpenGL

---

A reader posted a [question on Stackoverflow](http://stackoverflow.com/questions/17784791/4x4-matrix-pre-multiplication-vs-post-multiplication) suggesting the table above was confusing. The topic is confusing and despite our best attempt to shed some light on the matter, many people still get confused about it. We thought our answer on Stackoverflow could hopefully bring another insight on the question.

You have the theory (what you do in mathematics with a pen and paper) and what you do with your implementation (C++). These are two different problems.

Mathematics: you can use two notations, either column or row major. With row major vector, on paper, you need to write the vector-matrix multiplication vM where v is the row vector (1x4) and M your 4x4 matrix. Why? Because you can mathematically only write [1x4]*[4x4], and not the other way around. Similarly if you use column, then the vector needs to be written down vertically, or in notation [4x1] (4 rows, 1 column). Thus, the multiplication with a matrix can only be written as follows: [4x4][4x1]. Note that the matrix is put in front of the vector: Mv. The first notation is called a left or pre-multiplication (because the vector is on the left side of the product) and the second (Mv) is called a right or post-multiplication (because the vector is on the right side of the product). As you see the terms derive from whether the vector is on the left side (in front of, or "pre") or on the right side (after, or "post") of the matrix.

Now, if you need to transform a vector (or a point) then you need to pay attention to the order of multiplication, when you write them down on paper. If you want to translate something with matrix T and then rotate with R and then scale with S, then in a column major world, you need to to write v' = S * R * T * v. In a row major world you need to write v' = v * T * R * S.

That's for the theory. Let's call that the **row/column vector convention**.

Computer: then comes the point when you decide to implement this in C++ say. The good thing about this is that C++ doesn't impose you anything about anything. You can map the values of your matrix's coefficients in memory the way you want, and you can write the code to perform a matrix multiplication by another matrix the way you want. Similarly how you access the coefficients for a vector-matrix multiplication is completely up to you. You need to be make a clear distinction between how you map your coefficients in memory and what conventions you need to use from a mathematical point of you view to represent your vectors. These are two independent problems. Let's call this part the **row/column-major layout**.

For instance you can declare a matrix class as an array of say 16 contiguous floats. That's fine. Where coefficients m14, m24, m34 represent the translation part of the matrix (Tx, Ty, Tz), so you assume your "convention" is row-major even though you are told to use OpenGL matrix convention which is said to be column-major. Here the possible confusion comes from the fact that the mapping of the coefficients in memory is different from the mental representation you are making yourself of a "column-major" matrix. You code "row" but you were said to use (from a mathematical point of view) "column", hence your difficulty to make sense of whether you do things right or wrong.

What's important is to see a matrix as a representation of a coordinate system defined by three axes, and a translation. Where and how you store this data in memory is completely up to you. Assuming the three vectors representing the three axes of the coordinate system are named AX(x,y,z), AY(x,y,z), AZ(x,y,z), and the translation vector is denoted by (Tx, Ty, Tz), then mathematically if you use column vector you have:

$$M = \begin{bmatrix} AXx & AYx &  AZx & Tx\\ AXy & AYy & AZy & Ty \\ AXz & AYz &  AZz & Tz \\ 0 & 0 & 1 & 1\end{bmatrix}$$

The axes of the coordinates system are written vertically. Now if you have if you use row-major:

$$M = \begin{bmatrix} AXx & AXy &  AXz & 0\\ AYx & AYy & AYz & 0 \\ AZx & AZy &  AZz & 0 \\ Tx & Ty & Tz & 1\end{bmatrix}$$

The axes of the coordinate system are written horizontally. So the problem now when it comes to computer world, is how to your store these coefficients in memory. You can as well do:

```cpp
**float** m[16] = {  
AXx, AXy, AXz, 0,  
AYx, AYy, AYz, 0,  
AZx, AZy, AZz, 0,  
Tx, Ty, Tz, 1};  
```
Does it tell you though which convention you use? No. You can also write:


```
**float** m[16] = {  
AXx, AXy, AXz, Tx,  
AYx, AYy, AYz, Ty,  
AZx, AZy, AZz, Tz,  
0, 0, 0, 1};  
```
or:
```cpp
**float** m[16] = {  
AXx, AYx, AZx, Tx,  
AXy, AYy, AZy, Ty,  
AXz, AYz, AZz, Tz,  
0, 0, 0, 1};  
```
Again, that doesn't give you a particular indication of which "mathematical" convention you use. You are just storing 16 coefficients in memory in different ways and that's perfectly fine as long as you know what that way is, so that you can access them appropriately later on. Now keep in mind that a vector multiplied by a matrix should give you the same vector whether you use a row- or column- mathematical notation. Thus what's important really is that you multiply the (x,y,z) coordinates of your vector by the right coefficients from the matrix, which requires the knowledge of how "you" have decided to store the matrix coefficient in memory:

```cpp
Vector3 vecMatMult (
	Vector3 v,  
	**float** AXx, **float** AXy, **float** AXz, **float** Tx,  
	**float** AYx, **float** AYy, **float** AYz, **float** Ty,  
	**float** AZz, **float** AZy, **float** AZz, **float** Tz
)  
{  
	**return** Vector3(  
	v.x * AXx + v.y * AYx + v.z * AZx + Tx,  
	v.x * AXy + v.y * AYy + v.z * AZy + Ty,  
	v.x * AXz + v.y * AZz + v.z * AZz + Tz  
}  
```
We wrote this function to underline the fact that no matter which convention you use, the resulting of the vector * matrix multiplication is just a multiplication and an addition between the vector's input coordinates and the coordinate system's axis coordinates AX, AY and AZ (regardless of the notation you use, and regardless of the way you store them in memory). If you use:


```cpp
**float** m[16] = {  
	AXx, AXy, AXz, 0,  
	AYx, AYy, AYz, 0,  
	AZx, AZy, AZz, 0,  
	Tx, Ty, Tz, 1
};  
```
You need to call:

```
vecMatMult(v, m[0], m[1], m[2], m[12], m[4], m[5], m[6], m[13], ...  
```
If you use:
```cpp
**float** m[16] = {  
	AXx, AYx, AZx, Tx,  
	AXy, AYy, AZy, Ty,  
	AXz, AYz, AZz, Tz,  
	0, 0, 0, 1
};  
```
You need to call:
```cpp
MatMult(v, m[0], m[4], m[8], m[3], m[1], m[5], m[9], m[10], ...  
```
Does that tell you which convention you use? No. You just need to call the right coefficients in the right places when you do a vec * mat multiplication. And that's all there is to it, as disconcerting as it may seem. Now things are slightly different when it comes to mat * mat multiplication. You can assume that the order in which you multiply the matrices is not the same. So R * S * T is not the same as T * S * R. The order indeed matters. Now again if you use "row major" then mathematically you need to write:

```cpp
mt11 = ml11 * mr11 + ml12 * mr21 + ml13 * mr31 + ml14 * mr41  
```
where ml is the left hand matrix and mr the right hand one: mt = ml * mr. However note that we haven't been using brackets [] for the access indices because we don't want to suggest we are accessing elements stored in a 1D array here. We are just talking about the coefficients of matrices as written on paper. If you want to write this in C++, then it all depends on how you have stored your coefficients in memory as suggested above.