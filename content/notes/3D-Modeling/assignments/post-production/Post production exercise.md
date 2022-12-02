---
title: "Post Production Exercise"
tags: [homework, post-production, exercise, compositing, blender, fusion, resolve]
---

# What to Turn In?

1. Blender Section
	1. Screenshot of blender compositor node tree
	2. exported composited image
2. Resolve Section
	1. Screenshot of fusion node tree
	2. Screenshot of resolve color section
	3. Screenshot of final image


# How to complete this assignment



**Watch The Videos Below!**

[Blender Render Layers and Changing Lighting](https://youtu.be/lOWE2WbDUFY) 

[Intro to Blender Compositing](https://youtu.be/NBI60ds7Mhg)

[Resolve and Fusion Walkthrouhg](https://youtu.be/JTHB_ftXi3c)


---

## Blender

>[!IMPORTANT] I have two EXR files for blender.

### First File

1. Download the EXR file
2. Import the EXR to Blender
3. Do some color correction
4. Add bloom
5. change the hue of an object with cryptomattes
6. Screenshot node graph
7. Save final image as PNG

### Second File

1. Download second EXR file
2. Import EXR into the blender compositor
3. Duplicate the *render layers* node 3 times
4. Follow the video on how to change each lights color
5. Take screenshots of your node graph
6. Save final image as PNG

## Resolve

>[!NOTE] You only need to use the first file for fusion, not the color change file.

### First File

1. Import the EXR file into Resolve
2. Create a new clip
3. Switch to Fusion
4. Do some color correction
5. Add a glow
6. Switch to the color workspace
7. Play with the color correction



---

# Lesson Notes

## How How To Complete

### Blender compositing setup

There are few ways to set up blender for compositing.

The easiest is simply click on the compositing workspace at the top of the interface.

![[notes/attachments/Pasted image 20221130183737.png]]

Then make sure *use nodes* is turned on.

By default there won't be anything there because Blender's default behavior is to use the rendered image as the input. But that's not the only way.

We can also *Drag and drop* an image into the compositor. Or create *Image* node and open the desired file.

>For this exercise I am providing you a pre-rendered file so you will use the later method.

The next thing I do is split the pane and make the other pane and turn that one into an *Image Editor* panel.

>[!IMPORTANT] Make sure you have *Node Wrangler* enabled

In the compositing window you can now view your composite two ways.
1. By plugging the wires into the *Composite* node.
2. Creating a *Viewer* node. For this you can use Shift+Cntrl and click the node you want to view and it will automatically create it if you have node-wrangler enabled.

Then in your *Image Editor* window change the image from *Render Result* to *Viewer Node*

This way your preview will always show up in that window.

>[!IMPORTANT] To save the final image click the *Image* menu in the *Image Editor* window and click *Save As*


#### General Compositing in Blender

The Blender compositor is relatively powerful and simple compared to industry standard compositors like *Nuke* and *Fusion*. So we'll start by learning our way around it first.

To get started you want to setup your workspace a bit.  See [[#Blender compositing setup]].

##### Image Source

By default blender will use the *Render layers* node as the incoming source. This may or may not be what you need. This node will grab the image or image sequence that was just rendered and use that as the incoming image.

![[notes/attachments/Pasted image 20221201145731.png]]

You may also use an *Image* node.

![[notes/attachments/Pasted image 20221201145911.png]]

Here you can ether use an image already loaded in your project or open a new one.

>[!NOTE] On large projects, project management is very important.
>
>See [[Project Management]]

![[notes/attachments/Pasted image 20221201150041.png]]

Above is an example of a *Multilayer EXR* loaded in the image node.

##### Exporting Files

 One of the main beginner questions is how to export or save images or sequences. I've seen it many times where people just re-render their stuff. This is unnecessary. 
 




#### Changing Light Colors In Post




### Setting up fusion


#### General Compositing Info


#### Changing Light Colors In Post

---

## Render Layers vs Render Passes

### Render Passes

Render passes are setup in the renderpass settings. Many renderers have useful passes available for you to use with a click of a button.

In Blender the settings are in *View Layer Properties*.

![[notes/attachments/Pasted image 20221130182329.png]]

You can toggle these on and off depending on your compositing needs.

### AOVs

In other software all renderpasses are referred to as AOVs. 

AOV stands for => *Arbitrary Output Variables*

In blender we can add custom AOVs per shader in our shader graph.

I'll add info on this later, but you don't need to know it now.

![[notes/attachments/Pasted image 20221130182731.png]]

### Cryptomattes

Cryptomattes are very useful passes that create *keys* per material, object, or something else you define so you can easily mask out objects in post.

![[notes/attachments/Pasted image 20221130182749.png]]



### Render layers

In order to create render layers we have to understand collections and do some set up.
Render layers can help us save time later by separating out our render into multiple renders that we can use in the compositor later. One example might be to recolor lights in post.

In order to setup render layers we have to create new *view layers*. You can find these in the upper right corner of your interface.

![[notes/attachments/Pasted image 20221130174925.png]]

Clicking the file button will show you the option to create a new *view layer*

![[notes/attachments/Pasted image 20221130175334.png]]

![[notes/attachments/Pasted image 20221130175341.png]]

You may also want to turn a few things on in your *outliner*.

![[notes/attachments/Pasted image 20221130175442.png]]

This adds two new options to collections.

![[notes/attachments/Pasted image 20221130175519.png]]

The first is a *mask*. This means that it will mask any other view layers and create transparency on that layer. useful for separating out objects in your renders.

The second is for *bounce light only*. This means that the object will be invisible but the bounce light will effect the scene.

A simple use for view layers would be to separate out the main lights.

First:

Create a new view layer.

Second:

Disable the all but one light.

>[!IMPORTANT] Make sure each light is in it's own collection.

![[notes/attachments/Pasted image 20221130175858.png]]

![[notes/attachments/Pasted image 20221130175919.png]]

>[!NOTE] In *View Layer Properties*, make sure you **DON'T** have *Render Single Layer* checked or you won't render all the layers at once.

![[notes/attachments/Pasted image 20221130181839.png]]

## Other Tips

### Viewport Renderpasses

To see render passes in your viewport, make sure you are in rendered mode and then open the view drop-down and you'll see a *Render Pass* option.

![[notes/attachments/Pasted image 20221130182042.png]]



---
# Resources

[Introduction to Compositing in Blender - YouTube](https://www.youtube.com/watch?v=bIZrTXtyQkY)

[Compositing in Blender for Beginners (Tutorial) - YouTube](https://www.youtube.com/watch?v=xEpVyEi1Hts&t=1379s)

[Lighting in compositing in Blender EP9 - YouTube](https://www.youtube.com/watch?v=WZD-MTXwP4c)

[Comic Shading using the Compositor in Blender - YouTube](https://www.youtube.com/watch?v=anIFTskTUKI)

[NUKE FOR NOOBS | Basics Of CG Compositing (Part 1) - YouTube](https://www.youtube.com/watch?v=fxfuhl8Q7ys&t=436s)

[Compositing 3D Models into Photos Using Fspy and Blender - YouTube](https://www.youtube.com/watch?v=LLZmgAjxaIQ)

[Simple Compositing | Blender Compositor | After Effects | Davinci Fusion | Natron - YouTube](https://www.youtube.com/watch?v=D-hFcC-at9Q)

[Color Key Node Blender Compositing - YouTube](https://www.youtube.com/watch?v=OgI_h2h9Qg8)

[Color Key Node Blender Compositing - YouTube](https://www.youtube.com/watch?v=OgI_h2h9Qg8)

[Composite CGI Around Real Object - Blender VFX Tutorial (FULL) - YouTube](https://www.youtube.com/watch?v=fnAGtXMkRMY)

[Using Cryptomattes in Blender 2.8 - Compositing Tutorial - YouTube](https://www.youtube.com/watch?v=VBJQM-gIob8)

[Advanced CG Compositing Course in Nuke - NK606 RELEASED! - YouTube](https://www.youtube.com/watch?v=ho2LZ9b8PR4)

[Denoise Shadow Pass - Blender Octane Render - YouTube](https://www.youtube.com/watch?v=1kEQhQJNFSQ)

[Compositing for 3D artists - 03 - Compositing fundamentals (In fusion) - YouTube](https://www.youtube.com/watch?v=v2wfwoQ5dnY&t=754s)

[Add VFX into Cinematic RAW+LOG Footage (the right way) | ACES Part 1 - YouTube](https://www.youtube.com/watch?v=aJF2sAjRsy0)

[Mimic Volumetric Fog Using Only Compositing (Blender Tutorial) - YouTube](https://www.youtube.com/watch?v=TH2ZoEvhsTs)

[Blender Compositing Quicktip: Easy Atmospheric Falloff - YouTube](https://www.youtube.com/watch?v=IY1jphDw_78)

[Render Passes for Concept Art l Blender to Photoshop - YouTube](https://www.youtube.com/watch?v=9VdD4lfAXUc)

[How to Save Final Image After Compositing (Blender) - YouTube](https://www.youtube.com/watch?v=napMtY5Tyx8)

[The Secret Key To Controlled Renders - YouTube](https://www.youtube.com/watch?v=aVfbEgMFbvA)

[Blender 2.8 Tutorial: View Layers and Render Layers as separate images - YouTube](https://www.youtube.com/watch?v=LPneC8b6gnU)

[Blender Compositing Tip: Using View Layers for more control - YouTube](https://www.youtube.com/watch?v=N5NKfQrwens)

[Sorry Blender, this is my new compositor - YouTube](https://www.youtube.com/watch?v=Gmh-6isghMA)

[Make Your Renders Pop - Intro To The Compositor - YouTube](https://www.youtube.com/watch?v=jhTPI6QJQNg&t=621s)

[Color Key Node Blender Compositing - YouTube](https://www.youtube.com/watch?v=OgI_h2h9Qg8)

[Blender and Fusion Multi-Layer Workflow - Render Passes and Compositing for Beginners - YouTube](https://www.youtube.com/watch?v=cQ6EH5DSQyM)

[Import Blender Scene Into Fusion! - Blender Camera and Mesh in Resolve! - YouTube](https://www.youtube.com/watch?v=3mqO-SWeW6w)

[How to Export an Image from DaVinci Resolve Fusion (Single Frame to JPG, PNG, etc...) - YouTube](https://www.youtube.com/watch?v=YciL21FhUQY)



## Tangential Resources

[How I Create Cinematic CG Environments | FULL BREAKDOWN - YouTube](https://www.youtube.com/watch?v=Tc1stc-SYzA)

[Understanding Composition - YouTube](https://www.youtube.com/watch?v=O8i7OKbWmRM)

[Compositing 3D Models into Photos Using Fspy and Blender - YouTube](https://www.youtube.com/watch?v=LLZmgAjxaIQ)