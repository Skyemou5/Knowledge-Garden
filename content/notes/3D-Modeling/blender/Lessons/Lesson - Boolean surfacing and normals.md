---
tags: [lesson-notes blender 3d cgi fundimentals math]
title: "Booleans Surfacing and Normals"
---

# Booleans
### what are booleans?
- The term comes from a type of mathematics called boolean algebra
- These mathematics can be applied to many things. In our case it's applied to datasets that represent 3D surfaces.

### How does boolean algebra work?
- Logic operations with 1s or 0s

0 = false/off
1 = true/on

### Logic Gates
![[notes/attachments/Pasted image 20220912091433.png]]

NOT 
Switches the bit
![[notes/attachments/Pasted image 20220912080159.png]]

AND
takes two or more inputs and outputs one bit
all inputs must be true for the output to be true
![[notes/attachments/Pasted image 20220912080404.png]]

OR
at least one input must be true for the output to be true

![[notes/attachments/Pasted image 20220912080605.png]]

NOT
inverter

![[notes/attachments/Pasted image 20220912080711.png]]

---

Booleans and logic gates are fundimental to computing and much more. In our case they help with some important operations we can do on our meshes.

![[notes/attachments/Pasted image 20220912081003.png]]

>[!NOTE] The important thing is that these let us create more complex shapes easily

### Caveats
If you are working with polygonal geometry then the resulting meshes typically are not very clean.

>One way to avoid this is to use volumes or SDFs and then convert those to polygonal geometry

>[!NOTE] This can be ok depending on you're usecases


---
Do a demonstration of boolean without addons

then show bool-tool

---
### Common Boolean operations for CG
>[!NOTE] These are methods of creating certain looks that more than simple boolean mathematics, instead are more an artistic method using booleans





#### Slice Cuts
![[notes/attachments/Pasted image 20220912082704.png]]

1. add main and cutter object
2. set visibility of cutter to wireframe
3. create the boolean modifier
4. add solidify modifier to cutter
	1. you can add more solidifier but made sure they are above the bevel
	2. 




---

### Fixing Boolean Meshes
>Fixing round hole in quad mesh

tools
- Merge
- dissolve
- retopology
- remeshing

Shading issues


