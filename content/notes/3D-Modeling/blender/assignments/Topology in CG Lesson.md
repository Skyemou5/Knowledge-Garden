---
title: "Togology in CG Lesson"
tags: [topology,cg,lesson]
---

[[notes/3D-Modeling/blender/assignments/topology/Topology-Assignment-Instructions]]


Understanding topology is a critical part of being a competent 3D artist. Topology is the fundamental structure of your 3D data works and relates with itself.

Topology is really important to understand for several reasons. The first and formost is probably *polycount*.

Polycount is the amount of polygons that make up your mesh. 


>[!IMPORTANT] A mesh should have the exact amount of polygons to communicate the shape you want not more or less


The next important piece is *Deformation*. This is obviously only important if the object is going to be animated.

This is especially important for things like characters and other organic shapes.

All of these factors change depending on the target of your models. The main two are games and film. Games need to run in realtime so that limits the amount of data that models should have. In film frames are rendered one by one which means models can be much more detailed.

The other thing to keep in mind is efficiency. Ideally you only want the polygons you need, because having more makes managing your mesh, modeling, and making changes harder.

>[!NOTE] There are some solutions for this. In blender the modifier stack can be extremely helpful in working in a lower resolution but still having the high resolution mesh to look at.

## Edge Flow

*Edge Flow* is how your mesh traverses the surface of the object. Because a mesh is a dataset of connections there can be patterns in this data. Some configurations of points, edges, and faces, work better for some shapes than others.

Additionally good edge flow can help you be more efficient as a modeler because many tools are focused around selections and edge flow often determines how easily things can be selected.

![[notes/attachments/grid-edge-flow.png]]

The image above, the edge flow is going in only two directions. Even though this seems obvious, it gets a little more confusing with more complex meshes. In this example we can easily select any row of faces, edges, or vertices.

![[notes/attachments/grid-edge-flow-turn.png]]

The this image a small change was made and now the grid has a section of mesh where the edge flow changes direction.

This is the point where talking about problematic meshes can start to be helpful.

## NGONs

Ngons are polygons with more than 4 sides. Anything less is obviously a triangle.

![[notes/attachments/ngon.png]]

>[!IMPORTANT] As a beginner a good rule of thumb is avoid *NGONs* as much as you possibly can. But just like most things, once you know the rules you can break effectively.
>
>Sometimes *ngons* are fine actually. Especially in hard-surface models, quick models, test, and also sometimes they have to be fine, depending on how much time and effort you have or want to spend on a model.

There are many problems that arise from ngons in a mesh.

- Shading issues.
- Deformation problems
- Difficulty selecting and editing
- UVmaps

As mentioned before, ngons will interrupt loops and make selection and editing difficult.

![[notes/attachments/ngon-loop-select-error.png]]

Shading and deformation problems often go hand-in-hand.

![[notes/attachments/shading-deform-ngon.png]]

In the image above, the ngon is deformed but because there isn't enough geometry to tell the software how to render the surface inside it has to guess.

## Poles

Most points in CG are poles. They must have connections to other points. There are different types of poles, and are sometimes referred to in different ways.

- N-Pole -> The point is at an outer edge of a surface
- E-Pole -> The point is at an inner edge of a surface

![[notes/attachments/npole-epole.png]]

Poles with a lot of connections are sometimes called fans.

![[notes/attachments/triangle-fan.png]]

>[!NOTE] Not only do NGONs stop loop selections but triangles and most poles do as well.

![[notes/attachments/selection-stop-at-pole.png]]

![[notes/attachments/edge-loop-stopped-triangle.png]]

>[!WARNING] Edge loops will stop at triangles as well.

## Bad Meshes

When working on a 3D project, and especially starting out, things can be extremely frustrating. You often run into problems with your mesh and don't have the right words to describe or don't understand how 3D works enough to even begin to comprehend what is wrong.

To good way to help smooth out that process is learning about diagnosing and correcting bad-meshes. Although it can be frustrating and not all that interesting, I promise it will be well worth the effort to learn up front.



---

# Resources

[Topology Guides](https://topologyguides.com/)

[[notes/General/CG-Fundimentals/resources/Topology Resources]]

[[notes/3D-Modeling/blender/assignments/Diagnosing and Fixing Meshes]]

## Videos

[EVERYTHING You Need to Know About Topology - YouTube](https://www.youtube.com/watch?v=6Kt0gW3_kio)
[Change Your Understanding of Topology In Six Minutes - YouTube](https://www.youtube.com/watch?v=HGL6QpVRyXk)

[Essential Skills to Become a PRO - How to Learn Topology - YouTube](https://www.youtube.com/watch?v=xo9JRPhGi68)

[Understanding Topology and Edge Flow in 3D Modeling - YouTube](https://www.youtube.com/watch?v=rwW6HpOcAuw&t=1175s)


### Advanced

[Manifolds - Part 1 - Introduction and Topology - YouTube](https://www.youtube.com/watch?v=62WNNkoRCLE)

