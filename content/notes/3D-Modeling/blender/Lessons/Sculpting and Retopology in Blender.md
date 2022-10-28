---
title: "Scultping and retopology lesson notes"
tags: [blender, retopology, sculpting]
---


### Lesson

- Assignments
- Proposals
- Sculpting
- Retopology
- Next week

---

### Reminders of some blender things
- moving around
- wireframe and face direction
- context menus

---
## General Blender Hotkeys
- cntrl + Tab -> modes pie menu
- Tab -> switch modes
	- machinetools - pie menu
	- no machinetools -> hit 1 2 3 for edge vert and face modes



---
### Sculpting
Sculpting in blender has seen a lot of improvements in the last few years. It's still no ZBrush, but it can fill most of your sculpting needs for free and you don't have to leave blender.

my video -> [Intro to blender sculpt mode](https://youtu.be/c8iK4zSZjHg)


### Resources
[Learn to Sculpt in Blender - Quick Start Guide - YouTube](https://www.youtube.com/watch?v=Cmi0KoFtc-4)

### Setup Blender for Sculpting


1. Get into sculpting mode
	1. Either with the regular mode switching or 
	2. the sculpting workspace
		1. The workspace has some specific hot-keys and things setup for sculpting so, it's probably best to use this one.


#### Sculpt mode interface
![[notes/3D-Modeling/attatchments/sculpting-window-areas.png]]

1. Sculpting tools
2. Tool options
3. N-Panel
4. Global sculpting options
5. Context menus for sculpt-mode

![[notes/3D-Modeling/attatchments/blender-sculpt-mode-upper-left-window-menus.png]]

1. Mode dependent context menus
2. Brush selection
3. Brush dependent quick options

### Sculpting Tools
-  ![[notes/attachments/keys-color/f-key-col.png|50]] -> resize brush
- ![[notes/attachments/keys-color/cntrl-key-col.png|50]] -> subtract 
- ![[notes/attachments/keys-color/shift-key-col.png|100]] -> toggle smooth brush

>[!Important] If you have a tablet map your pen buttons to middle click and right click






---
## Retopology Theory
Retopology is the the process of creating new geometry on top of a high resolution mesh in order to texture and animate the mesh.
### Important guidelines
- Create your edge flow in a way that follows the surface of your high-resolution mesh
- Stick to quads as much as you can
- Evenly space you quads as much as you can
- Don't add extra resolution, only use as many polygons as you need to showcase the shape
		- start with a lower resolution
	- it's easier to go higher than lower
- Add extra resolution in areas that will have a lot of deformation
- make sure your edge and faceloops make sense as you progress



---
### Retopo in blender without paid or external addons

My video -> [Intro to blender retopo](https://youtu.be/6QVPsSWuEpI)


### Resources

[Retopology for Beginners in Blender 2.8 - Retopo the Correct Way - YouTube](https://www.youtube.com/watch?v=CuQzPDs99yM&t=1s)

[(4) Retopo in Blender - Retopologizing the Face - YouTube](https://www.youtube.com/watch?v=OuFwUaS8y1I)

[Retopology in Blender (Beginner Tutorial) - YouTube](https://www.youtube.com/watch?v=X2GNyEUvpD4)

[(3) Use My EASY Method For Retopology In Blender ! - YouTube](https://www.youtube.com/watch?v=dqA039UOSwA)


### Enable the following addons
- Loop tools
- F2


### Setup
1. Make base mesh non-selectable
2. make a new mesh with a single quad and align it to a position where you want to start
3. Enable snapping to face
	1. and enable project individual elements
4. Enable always in-front for retopo-mesh in viewport display options
5. in viewport shading enable backface culling
6. create new material
	1. then go to viewport display and choose a new color for visibility
7. Add shrink-wrap modifier and set the target to the base-mesh
	1. Make sure the cage is visible in the viewport
>[!NOTE] This is just for improved accuracy
8. Add mirror modifier
	1. make sure clipping and merge is enabled
9. *Optional* Add displacement modifier to push the mesh out a bit along the normal if needed

>[!warning] Never use subd or have it on when retopologizing
>
>You may toggle it on and off just to check if you want but that's it.
>You want your mesh to look as honest as you can

>A subd can give you a false view of your mesh

### Retopology work after setup
Use the following tools in the following ways:
- cntrl + right-click -> to extrude to where your mouse cursor is
- g -> move verts and edges
- g+g -> slide verts and edges
- cntrl + r -> add edge loop
	- drag after
	- right-mouse to snap to center
	- scroll middle mouse to add segments
- e -> extrude

>[!warning] Use as few loops as you need and no more

>[!NOTE] Try to get your topology to have even spacing

---

### F2 Addon
 Make sure it's enabled

The F2 addon is a smarter filler tool that you will probably find yourself using all the time.

>[!warning] This addon ships with blender so make sure you enable it!

>[!NOTE] This only works you have 4 edges connected to a vert


Select a corner vert and hit *f*

---

### Other Rips and Tools for Retopology

- set spacebar as search menu
- ![[notes/attachments/keys-color/alt-key-col.png|70]] + ![[notes/attachments/keys-color/z-key-col.png|50]] -> enable x-ray
- you could also add some transparency to your viewport shader
- remap your merge hotkey to something more easily accessable
- bridge tool
	- select two apposing edges and hit *f*
	- *F2* will do the same but you select one edge
- Only use subd for sanity checks
- grid-fill
	- search for grid-fill
	- you will have to tweak offset
	- it's in the menus
- Soft-select / proportional editing
	- o -> hotkey
	- in the menu
	- different types of falloffs
- sculpt smoothing
	- go into sculpting
	- shift -> smooth brush
		- or select smooth brush
		- f -> change brush size
	- in viewport overlays enable wireframe
	

---

## Bsurfaces Workflow
This method is faster and uses an addon that ships with blender called bsurfaces

>[!important] Makes sure you enable bsurfaces in your addon preferences

### Setup
1. Enable bsurfaces
2. Select your base-mesh
3. press ![[notes/attachments/keys-color/n-key-col.png|50]] to bring up the n-panel
4. navigate to the edit tab
5. open the Bsurfaces drop-down
6. click the *initialize (add BSurface mesh)*
	- This adds the shrinkwrap modifier and sets up a few other things similar to what we've already done 
7. *Optional* click *add mirror and others button*
8. Click the *in front* checkbox to make sure the retopo mesh is always in front
	1. Enable back-face culling to clean up your view
	2. toggle the mirror modifier on and off in the viewport based on what you need
9. *optional* change shrink-wrap modifier method to *project* to be a bit more accurate
10. *optional* change color to your liking 
11. Now we should automatically be in *annotation mode* 
	- This addon uses the annotation tool to help you quickly create your topology
12. Draw your topology lines on the surface
13. Click the *add surface* button in the n-panel window and it will create the topology.
14. Open the pop-up window in the bottom left and tweak the options.

### Ways to add geometry
1. Add loose geometry
	1. make sure to deselect everything with ![[notes/attachments/keys-color/a-key-col.png|50]]+![[notes/attachments/keys-color/a-key-col.png|50]]
	2. ![[notes/attachments/keys-color/alt-key-col.png|70]]+![[notes/attachments/keys-color/d-key-col.png|50]] -> temporarily enable annotate tool
	3. add strokes with the annotate tool
	4. click *add surface* 
	5. tweak the options in the popup menu
2. Add to existing geo
	1. select one edge
	2. then use  ![[notes/attachments/keys-color/alt-key-col.png|70]]+![[notes/attachments/keys-color/d-key-col.png|50]] to add strokes

---

## Other Tools
There are many tools people have built for retopology in blender. Some of the best ones are paid

I frequently will use a tool called [Retopoflow](https://www.blendermarket.com/products/retopoflow)

This tool works a little more like retopology modes in other 3D packages.

Another cheaper tool that is also very powerful is [SpeedRetopo](https://www.blendermarket.com/products/speedretopo). This tool works more like BSurfaces than retoploflow

#### Remeshing
Blender now has a voxel remesher built in. You can use it in several contexts but sometimes you just want something a little better.

Enter **Quad Remeshing**:
Quad remeshing is an algorithmic method to remesh the surface of an object with quads. It's quick and dirty, but can sometimes get you good enough results.

>[!important] Much like auto-UVing you should only use this after you understand retopology otherwise it can be a crutch

[Quad Remesher](https://exoside.com/quadremesher/)by *EXOSIDE* is an excelent quad remesher tool. There are plugins for almost all 3D packages.

>[!info] Exocide's quad remesher is very similar to ZBrush's ZRemesher
>

[Tesselator](https://www.blendermarket.com/products/tesselator) is a cheaper quad remesher addon on the blender-market.

