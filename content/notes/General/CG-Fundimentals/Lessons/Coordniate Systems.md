---
tags: math coordinate
title: "Coordinate Systems in CG"
---


We won't go into too much detail in this class and there won't be any need to do math problems or coding but understanding coordinate systems at least at a high level will help you master 3D in all it's aspects more than you realize right now.

## what are coordinate systems

The barebones answer for our purposes is that coordinate systems represent space.

You've no doubt seen one of these before:

![[notes/3D-Modeling/blender/3d-modeling-attatchements/images/xyplane_blank.png]]

The graph above is a blank $XY$ plane. The numbers on the graph indicate the values of the space the graph represents. In this case $X$ and $-X$ and $Y$ and $-Y$.

If you've ever used applications like photoshop or illustrator you've created media in this coordinate space.

Before we move to 3D space let's use the 2D coordinate plane to illustrate a two important concepts.

1. Global Space
2. Local Space

## Global Space

In the context of the 2D plane above you can think of global space as the everything that the image itself represents. In other words that image is actually a representation of a 2D global coordinate space (At least for our purposes).
*this will make more sense as we talk about local space*

## Local Space

Local space in the image above isn't actually represented there. So we will need a new image show how it works. But first we need to talk about orientation.

If we really wanted to we could rotate the global space and everything on it would move with it. That would be sort of like rotating or moving the earth. Your position on the earth doesn't change but the earth itself is changing.

![[notes/3D-Modeling/blender/3d-modeling-attatchements/gif/ROTATE2d.gif]]

We can change the rotation of the second gizmo while first one is rotating. 

![[notes/3D-Modeling/blender/3d-modeling-attatchements/gif/localspace01.gif]]

Just like we move around the earth just fine with out much knowledge or feedback that the earth is rotating and hurtling through space with us on it, the second arrow is just turning on it's own. The space it's parented too seems normal to it.

*we'll cover parenting later*

All of this is also true in 3D space.

![[notes/3D-Modeling/blender/3d-modeling-attatchements/gif/3Dspace.gif]]

## Tangent Space

We won't go into too much depth here but it's worth mentioning.
You can think of tangent space as the coordinate space of the surface of an object. This can come in handy more than you might think. For example what if you want to align something perpendicular to the surface of another object. Or rotate one object relative to the surface of another object, like a knob for example.

To understand tangent space we need to touch on what Normals are.

![[notes/3D-Modeling/blender/3d-modeling-attatchements/images/tangentnormal.jpg]]

As you can see the image above the blue arrow is labeled as the normal. In any good 3D application we visualize data like this, blender is no exception. 

![[notes/3D-Modeling/blender/3d-modeling-attatchements/images/blendernormalvis.PNG]]

To understand how coordinate spaces are important when working in 3D applications well look at [[notes/General/CG-Fundimentals/Lessons/Coordinates and 3D modeling]].


---
Further Reading

[[notes/3D-Modeling/blender/Sources/Scratchpixel/Scratchpixel Home]]
[[notes/3D-Modeling/blender/Sources/Coordinate Handedness]]
[[notes/3D-Modeling/blender/Matricies PDF]]