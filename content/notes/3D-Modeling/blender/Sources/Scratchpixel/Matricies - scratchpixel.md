---
title: "{{title}}"
---

# Matricies

Before we explain why matrices are interesting, let's start by saying that rendering an image by keeping all the 3D objects and the camera at the origin would be quite limited. In essence, matrices play an essential role in moving objects, light and cameras around in the scene so that you can compose your image the way you want. Because our basic renderer wouldn't produce very exciting images if we were to ignore them all together. You will realise as you develop your own 3D renderer, that you won't be able to ignore them very long. So let's study them without any more delay.
Introduction to Matrices: they Make Transformations Easy!

There is really nothing complicated about matrices and why some people fear them is mostly because they don't really fully comprehend what they represent and how they work. They play an instrumental part in the graphics pipeline and you will see them used regularly in the code of 3D applications.

In the previous chapter we mentioned that it was possible to translate or rotate points by using linear operators. For example we showed that we could translate a point by adding some values to its coordinates. We also showed that it was possible to rotate a vector by using trigonometric functions. Now, in short (and this is not a mathematical definition of what matrices are), a matrix is just a way of combining all these transformations (scale, rotation, translation) into one single structure. Multiplying a point or a vector by this structure (the matrix) gives us a transformed point or vector. Combining these transformations means any combination of the following linear transformations: scale, rotation, translation. We can create a matrix that will rotate a point by 90 degrees around the x-axis, scale it by 2 along the z-axis (the scale applied to the point is (1, 1, 2)) and then translate it by (-2, 3, 1). We could do this by performing a succession of linear transformations on a point but this would potentially mean writing a lot of code:
```cpp
Vec3f translate(Vec3f P, Vec3f translateValue) { ... } 
Vec3f scale(Vec3f P, Vec3f scaleValue) { ... } 
Vec3f rotate(Vec3f P, Vec3f axis, float angle) { ... } 
... 
Vec3f P = Vec3f(1, 1, 1); 
Vec3f translateVal(-1, 2, 4); 
Vec3f scaleVal(1, 1, 2); 
Vec3f axis(1, 0, 0); 
float angle = 90; 
Vec3f Pt; 
Pt = translate(P, translateVal): // translate P 
Pt = scale(Pt, scaleVal); // then scale the result 
Pt = rotateValue(Pt, axis, angle); // finally rotate the point 
```
As you can see this code is not very compact. But if we use a matrix we can simply write:
001
002
003
```cpp
Matrix4f M(...); // set the matrix for translation, rotation, scale 
Vec3f P = Vec3f(1, 1, 1); 
Vec3f Ptranformed = P * M; // do everything at once, translate, rotate, scale 
```
Transforming P to achieve a similar effect is simply done by multiplying the point with a matrix (M). We are just showing here what matrices are used for in the graphics pipeline and what advantages they have. In that particular example, we have told you that they can be used to combine together any of the three basic geometric transformations we can perform on points and vectors (scale, translation, rotation) in a very easy, fast and compact way. What we have to do now, is to explain you how and why that works (it will take us a few chapters though).
Matrices, What Are They?

![](https://www.scratchapixel.com/images/upload/geometry/rowcolumn.png?)

What matrices really are? Instead of answering with an abstract mathematical definition we will first start with real matrix examples. Once we have seen a couple of more concrete examples extending the concept to its generic/mathematical form will be easier. If you read a few CG books already, you may have seen matrices mentioned in quite a few places and they often appear as two-dimensional array of numbers. To define a two-dimensional array of numbers we use the standard notation m x n where m and n are two numbers that represent the size of this array. As you may have guessed, m and n respectively represent the number of rows and columns of the matrix. Rows are the horizontal lines of numbers in the 2D array and columns are the vertical ones. Here is an example of a [3x5] matrix:

$$\begin{bmatrix}
1&3&7&9&0\\
3&3&0&8&3\\
9&1&0&0&1
\end{bmatrix}$$

We will denote the numbers of the matrix, the matrix coefficients (you might come across the term entry or element but coefficient is often used in CG) and we usually use the subscripts i, j to point to a particular coefficient in the matrix. Matrices themselves are most of the time written with capital letters (M, A, B, etc).

Mij
where i is the row and j

is the column.

We will make a lot of simplifications on matrices for now. One of them, is that in CG we are mostly using matrices which are said to be squared. These are matrices whose numbers m and n are equal. Typically, in CG, we will be interested in 3x3 or 4x4 matrices and we will tell you in the following chapter what they are and how to use them. More generally, these matrices are called square matrices (the matrix [m x n] is a square matrix if m = n). Now, this is a simplification as we said, because in reality m and n can take any value and don't have to be equal. You can create a 3x1 matrix, a 6x6 matrix or a 4x2 matrix. They are all valid matrices. But as we said, in CG, we will mainly be using 3x3 and 4x4 matrices.

A  [3x3] $$\begin{bmatrix}
7&4&3\\
2&0&3\\
3&9&1\\
\end{bmatrix}$$
and [4x4]$$ \begin{bmatrix}
7&1&4&3\\
2&0&0&3\\
3&1&9&1\\
6&6&5&4\\
\end{bmatrix}$$

matrix.

Here is an example of how we can implement a 4x4 matrix class in C++ (note that we use the template mechanism in case we need the matrix to use a float or double precision):

```cpp
template<typename T> 
class Matrix44 
{ 
public: 
    Matrix44() {} 
    const T* operator [] (uint8_t i) const { return m[i]; } 
    T* operator [] (uint8_t i) { return m[i]; } 
    // initialize the coefficients of the matrix with the coefficients of the identity matrix
    T m[4][4] = {{1,0,0,0},{0,1,0,0},{0,0,1,0},{0,0,0,1}}; 
}; 
 
typedef Matrix44<float> Matrix44f; 
```
These operators in the Matrix44 class:

```cpp
const T* operator [] (uint8_t i) const { return m[i]; } 
T* operator [] (uint8_t i) { return m[i]; } 
```
Are sometimes called access operator or accessor. They are used to access the coefficients of the matrix without having to access explicitly the member variable m[4][4]. Typically, you would access the coefficients that way:
```cpp
Matrx44f mat; 
mat.m[0][3] = 1.f; 
```
But with the access operators, you can write:
```cpp
Matrx44f mat; 
mat[0][3] = 1.f; 
```

## Matrix Multiplication

Matrices can be multiplied with each other, and this operation is at the heart of the point- or vector-matrix transformation process. The result of a matrix multiplication (the technical term is matrix product, the product of two matrices) is another matrix:
$M3=M1∗M2$

![](https://www.scratchapixel.com/images/upload/geometry/matrixmult.png?)
*Figure 2: a matrix to transform A to C can be obtained by multiplying a matrix M1 that transform A to B with a matrix M2 that transform point B to C. The multiplication of any combination of matrix that transform in successive steps A to C will give matrix M3.*


If you remember what we briefly mentioned in the introduction, a matrix defines in a concise way, a combination of linear transformations that can be applied to points and vectors (scale, rotation, translation). How that works, is something we haven't explained yet but that we will be addressing very soon. What's important to understand now is that a matrix multiplication is a way of combining in one matrix the effect of two other matrices. In other words, the transformation that each matrix M1 and M2 would operate on a point or a vector can be combined in one single matrix M3. Imagine you need to transform a point from A to B using matrix M1 and then transform B to C using matrix $M2$. Multiplying $M1$by $M2$ gives a matrix $M3$ which directly transforms A to C. A matrix obtained by multiplying two matrices is not different from the other two. What's important to note here is that if you have two other matrices M4 and M5 that respectively transform A to D and D to C then the multiplication of M4 with M5 will give you M3 again (there is a unique matrix for each particular transformation).

Now there is a rule about matrix multiplication which is not important to know if you deal with 4x4 matrices (and you will understand why soon) but for you general knowledge on the subject, we will explain it here (it will become particularly important to remember when we will deal with point- and vector-matrix multiplication). Two matrices M1 and M2 can only be multiplied if the number of columns in M1 is equal to the number of rows in M2. In other worlds if two matrices can be written as m x p and p x n they can be multiplied and it will give a matrix of size m x n. Two matrix p x m and n x p can not be multiplied because m and n are not equal. A 4x2 and 2x3 matrices can be multiplied and will give a 4x3 matrix. The multiplication of two 4x4 matrices gives a 4x4 matrix (this rule isn't so important for us because we will almost always use 4x4 matrix so we generally won't care about whether matrices can be multiplied or not).
$[M×P]∗[P×N]=[M×N]$

Let' s see now how we multiply two matrices together which turns to be a mathematical operation on the coefficients of the two input matrices. In other words what we are interested in is how we compute the coefficients of the new matrix. It turns out to be quite simple as long as you remember the rule. We said previously that the coefficients in a matrix were defined by their row and column indices. Notation wise, we use the subscripts i and j to denote these row- and column-indices. So imagine that we want to find out what's the value of the coefficient Mi,j in the matrix M3. Let's say that i=1 and j=2 (note that index 0 indicates either the first row or the first column of the matrix. Index 3 indicates the last row or column. Arrays start at index 0 in C++). To compute M3(1,2) we select all the coefficients of the second row in M1 (where M1 is a 4x4 matrix) and all the coefficients of the third column in M2 (where M2 is also a 4x4 matrix). That gives us two sequences of four numbers than we will multiply with each other and sum up in the following way:
$$M1=
\begin{bmatrix}
c_{00}&c_{01}&c_{02}&c_{03}\\
\color{red}{c_{10}}&\color{red}{c_{11}}&\color{red}{c_{12}}&\color{red}{c_{13}}\\
c_{20}&c_{21}&c_{22}&c_{23}\\
c_{30}&c_{31}&c_{32}&c_{33}\\
\end{bmatrix} \text{ } M2=
\begin{bmatrix}
c_{00}&c_{01}&\color{red}{c_{02}}&c_{03}\\
c_{10}&c_{11}&\color{red}{c_{12}}&c_{13}\\
c_{20}&c_{21}&\color{red}{c_{22}}&c_{23}\\
c_{30}&c_{31}&\color{red}{c_{32}}&c_{33}\\
\end{bmatrix}$$
$$M3_{12}=
\begin{array}{l}
    M1_{10}*M2_{02} + \\
    M1_{11}*M2_{12} + \\
    M1_{12}*M2_{22} + \\ 
    M1_{13}*M2_{32}
\end{array}$$

We can use this process for all the coefficients of M3: use the row and column index of the coefficient we want to compute, and use these indices to select the coefficients of the corresponding row in M1 (M1(i,0), M1(i,1), M1(i,2), M1(i,3)) and select the coefficients for the corresponding column in M2 (M2(0,j), M2(1,j), M2(2,j), M3(3,j). Once we have these numbers we combine them using the formula showed above. Multiply all the coefficients of the same index with each other and sum up the results:

$$M3_{ij}=
\begin{array}{l}
    M1_{i0}*M2_{0j} + \\
    M1_{i1}*M2_{1j} + \\
    M1_{i2}*M2_{2j} + \\ 
    M1_{i3}*M2_{3j}
\end{array}$$

Let's see how we could code this operation in C++. Let's define a matrix, as a two-dimensional array of 4 by 4 floats. Here is the function that can be used to multiply two matrices together:

```cpp
Matrix44 operator * (const Matrix44& rhs) const 
{ 
    Matrix44 mult; 
    for (uint8_t i = 0; i < 4; ++i) { 
        for (uint8_t j = 0; j < 4; ++j) { 
            mult[i][j] = m[i][0] * rhs[0][j] + 
                         m[i][1] * rhs[1][j] + 
                         m[i][2] * rhs[2][j] + 
                         m[i][3] * rhs[3][j]; 
        } 
    } 
 
    return mult; 
} 
```

It is not hard when you know how the multiplication of two matrices is obtained, to observe that the multiplication of M1 by M2 doesn't give the same result than the multiplication of M2 by M1. Matrix multiplication indeed is not commutative. M1*M2 doesn't give the same result than M2*M1.
Summary

We haven't explained how and why matrices work, but do not worry all these important things will be explained in the next chapter. From this chapter you need to remember that a matrix is a two-dimensional array of numbers. The size of the matrix is denoted m x n where m is the number of rows and n the number of columns. You have learned that matrices can be multiplied only if the matrix on the left side of the multiplication has a number of columns that is equal to the number of rows of the matrix which is on the right inside of the multiplication. For instance two matrices which sizes are m x p and p x n can be multiplied with each other. The resulting matrix combines the transformation of the two matrices used in the multiplication. If M1 transforms a point from A to B and M2 transforms a point from B to C, then if M3 is the result of M1 multiplied by M2, M3 will transform this point from A to C. Finally we have learned how to compute the coefficients of a matrix resulting from of a matrix multiplication. It is also important to remember that matrix multiplication is not commutative. Practically, it means that we will need to pay attention to the order in which we multiply matrices with each other. This order matters and if your code doesn't work, you may want to check the order in which matrices are multiplied with each other.