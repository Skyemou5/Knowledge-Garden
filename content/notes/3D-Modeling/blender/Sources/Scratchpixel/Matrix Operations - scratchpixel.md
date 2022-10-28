---
title: "{{title}}"
---

# Matrix Operations

## Transpose

The transpose of a matrix M

is another matrix which we write using the following convention: MT (with the superscript T). We can describe the process of transposing a matrix in different ways. It can be seen as: reflecting M over its main diagonal (from left to right, top to bottom) to obtain MT, writing the rows of M as the columns of MT or reciprocally, writing the columns of M as the rows of MT

. Computing the transpose of a matrix can be done with the following code:

```cpp
Matrix44 transpose() **const**  
{  
	Matrix44 transpMat;  
	**for** (uint8_t i = 0; i < 4; ++i) {  
	**for** (uint8_t j = 0; j < 4; ++j) {  
	transpMat[i][j] = m[j][i];  
}  
}  
  
**return** transpMat;  
}  
```
The idea is to swap the rows and columns and since this operation can't be done in place we need to assign the result to a new matrix which is returned by the function. Transposing matrices can be useful when you want to convert matrices from a 3D application using row-major matrices to another using a column-major convention (and vice versa).

## Inverse

If the multiplying point A by the Matrix M gives point B, multiplying a point B the inverse of the matrix M gives point A. In mathematics, a matrix inversion is usually written using the following notation:

$M−1$

From this observation, we can write that:

$MM−1=I$

Where I is the identity matrix. Multiplying a matrix by its inverse gives the identity matrix.

We have mentioned in the chapter [How Does a Matrix Work](http://www.scratchapixel.com/lessons/mathematics-physics-for-computer-graphics/geometry/how-does-matrix-work-part-2), the case of the orthogonal matrix which inverse can easily be obtained from computing its transpose. An orthogonal matrix is a square matrix with real entries whose columns and rows are orthogonal unit vectors. This is an important property which we will be using to learn how to [transform normals](http://www.scratchapixel.com/lessons/mathematics-physics-for-computer-graphics/geometry/transforming-normals).

Matrix inversion is an important process in 3D. We know that we can use point- or vector-matrix multiplication to convert points and vectors but it is some times useful to be able to move the transformed points or vectors back into the coordinate system in which they were originally defined into. It is often necessary for instance, to transform the ray direction and origin in object space to test for a primitive-ray intersection. If there is an intersection the resulting hit point is in object space and needs to be converted back into world space to be usable.

The lesson Matrix Inverse in the [Mathematics and Physics of Computer Graphics](http://www.scratchapixel.com/lessons/mathematics-physics-for-computer-graphics) section will teach how to compute the inverse of a matrix (only available in the old version of Scratchapixel for now). Developing even a basic renderer without being able to use matrices and their inverse would be quite limited so we will be providing some code in this lesson for doing so. You can use this code without worrying to much about how it works and read this advanced lesson another time if you don't feel ready yet.