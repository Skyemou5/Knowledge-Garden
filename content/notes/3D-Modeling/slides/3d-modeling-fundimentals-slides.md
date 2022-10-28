---
theme: night
---


### 3D fundimentals

---
## Topics
- What is 3D in software?
- Why Should we care about it?
- Types of 3D data creation and manipulation
- 3D Packages
- Film vs Games vs other
- goals for this course
- assignment

---
## What is 3D in software?
3D software at it's core manipulates and creates 3D data.

--
## History of 3D in computing
1960s-Today
--
### Sketchpad
Written by Ivan Suthland in 1963 for his PhD and is considered the ancestor of modern 3D computing especially of CAD.

> First program that we know of the utilize a complete graphical user interface (GUI)

<split even>
![[attachments/sketchpadscreen.png]]
![[attachments/usingsketchpad.png|300]]
</split>

[Sketchpad - wiki](https://en.wikipedia.org/wiki/Sketchpad)
--
### 1970s
## Pixar, Lucasfilm and ILM
- John Lasseter
- Ed Catmul

--

Utah Teapot

https://www.dim13.org/teapot

![[notes/attachments/utahteapot.png]]

was constructed painstakingly by manipulating bezier curves and spreadsheets

--
### 1980s
- personal computing boom
- CAD exploded
	- 1983 AutoCAD launched

![[notes/attachments/Pasted image 20220824104626.png]]

--
- Blender launched 1989 by Tom Roosendaal
	- https://www.blender.org/about/history/
- PRISMS
	- a collection of C programs running on UNIX mainframes computers at Omnibus in 1985-1987
	- would later be Houdini

--
### 1990s
- Modernization
- blender's popularity spiked
- 

--
### Houdini history
- PRISMS first release in 1998
- https://www.fxguide.com/fxfeatured/side-effects-software-25-years-on/

![[notes/attachments/Pasted image 20220824110107.png|500]]

--
<iframe width="1154" height="649" src="https://www.youtube.com/embed/ULk6pL4MRS0" title="Houdini Software" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

--
### History of Maya
Maya was originally a next gen animation system based on the code from '[the Advanced Visualizer](https://en.wikipedia.org/wiki/The_Advanced_Visualizer)', '[Power Animator](https://en.wikipedia.org/wiki/PowerAnimator)', and 'Alias Sketch'

> Disney Collaborated closely in the early development

https://www.titancomputers.com/The-Story-of-Maya-s/947.htm
https://inspirationtuts.com/what-is-maya-history/
--
[CGI history](https://www.youtube.com/watch?v=XyGfxCxnZW0)
<iframe width="1154" height="649" src="https://www.youtube.com/embed/XyGfxCxnZW0" title="Early CGI Was Horrifying" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
--
### Other Resources
[Turings Cathedral](https://www.goodreads.com/book/show/12625589-turing-s-cathedral) - History of Computing


---
## 3D Data
computers interpret data
Digital 3D isn't real, that data could be interpreted in any number of ways. In our case we will interpret is like 3D data.

> 3D software visualizes the 3D data for us


--
### Types of 3D data
- Polygons
- Voxels
- Curves/Nurbs
- SDFs
- Other
--
### Polygons
are typically made up of 
- Points
- Edges
- Faces
![[notes/attachments/geo-spreadsheet.png]]
--
### Voxels
are 3D grid coordinates that hold relevant 3D data

![[notes/attachments/Pasted image 20220824111204.png|300]]

--
### Curves/Nurbs
curves are technically mathmatical functions that interpolate through any medium.
> Gradients are technically curves mathematically

![[notes/attachments/Pasted image 20220824111954.png|500]]

--
### Nurbs
nurbs are 3D surfaces defined by curve algorithms

![[notes/attachments/Pasted image 20220824112220.png]]

---
### Coordinate Systems



---
### Manipulating 3D data
(Also known as 3D modeling)

--
#### Types of Modeling
- Poly Modeling
	- Box Modeling
	- Boolean
	- Mesh Creation
	- Subd
	- Sculpting

--
### Topology




---
# Model this
Go Kart Mechanical Brake Caliper

![gokart-part](notes/attachments/gokart-part.png)
--

## Criteria
I want to see how well you can do this
- everything a single mesh except for the nuts bolts and screws and other obvious separate pieces
- doesn't have to be perfect, just do your best
	- don't spend too long on this
- you can use kitbashed screws and bolts if you want. Or exclude the screws and bolts
- I will be looking for generally nice topology


