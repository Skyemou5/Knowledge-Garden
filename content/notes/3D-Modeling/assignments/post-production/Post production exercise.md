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

For color-management see [[notes/General/Color-Management/Color Management Hub]]



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
 
The easiest way is using the *Image Editor* image menu.

![[notes/attachments/Pasted image 20221205091859.png]]



#### Changing Light Colors In Post

There are so many things you can do with post-production. In CG it can really help us save time especially in a production environment.

Before jumping into the compositing please at least read through how to set up the render for this to work.

[[#Render layers]]

In this exercise each of the three lights is on it's own render layer. This allows us to use some simple compositing tricks to re-light our scene.

First, drop-down three *Image* nodes and load the same EXR into each one.

You should notice a *layer* section at the bottom of the node once it's loaded.

![[notes/attachments/Pasted image 20221205100529.png]]

Set each one to a different layer.

In our case it should be:
- red
- blue
- green

Then do the following after each node:
- Add an RGB node
- Add a *Mix* node
	- Set it to *Multiply*
- Connect the *Image* and *RGB* nodes to *Image* inputs of the *Mix* node.

![[notes/attachments/Pasted image 20221205100844.png]]

Once you've done that your setup should look something like this:

![[notes/attachments/Pasted image 20221205100944.png]]

Now you can change the color of each light separately.

![[notes/attachments/Pasted image 20221205101017.png]]

But we are not done yet.

Next we need to drop down three more *mix RGB* nodes and switch both to *Add*.

Then connect them up like so:

![[notes/attachments/Pasted image 20221206163727.png]]

We use *Add* for these nodes because it works best with combining lights.

> See [Blend modes - Wikipedia](https://en.wikipedia.org/wiki/Blend_modes)

At this point we can recolor all the lights separately in post without having to re-render.


### Setting up fusion

#fusion

First, download *Davinci Resolve* from [here](https://www.blackmagicdesign.com/products/davinciresolve).

Once you have it installed open it. You'll be greeted with a window like this:

![[notes/attachments/Pasted image 20221206170105.png]]

Then, open a new project. Once Resolve opens at the bottom of the window you'll a set of icons.

![[notes/attachments/Pasted image 20221206171017.png]]

These are the different "apps" or *Contexts* you can use in Resolve.

#### Importing Media into Resolve

The simplest way to add files to a project is change to the *Media* context and simply drag and drop files here.

#### Creating a new clip

In resolve we need to create clips in order to process anything.

The easiest way to do this is to switch to the *Cut* context and then drag our file down to the timeline. This will automatically create a clip.

#### Opening Fusion

Once we have a clip we can switch to the *fusion* context. It will automatically create a fusion clip based on whatever the *playhead* over.

>![[notes/attachments/Pasted image 20221206171703.png]]
>*playhead*

Once Fusion is open we should see something like this:


![[notes/attachments/Pasted image 20221206171916.png]]

1. Preview window *A*
2. Preview window *B*
3. Inspector
4. Node editor

The purpose of the two preview windows is you can see *before and after*. on whatever you are doing. This can really help improve your workflow.

To toggle the preview windows you can do two things.
1. click on one of the two dots on any node and it will enable the preview on the respective windows.
2. Click *1* or *2* when you have any node selected and it will toggle the respective dots.

![[notes/attachments/Pasted image 20221206172701.png]]

The inspector will show the options for any node that is currently selected.

##### Navigating the node editor

###### Adding Nodes

To add nodes you can do two things.
1. Right click in the node editor and select *Add tool*

![[notes/attachments/Pasted image 20221206173309.png]]

2. Click *Shift*+*Space* and a search box will pop up in which you can start to type and the list will update in real-time. You can also use the arrow keys to navigate up and down the list then press enter to drop-down the node you want.

![[notes/attachments/Pasted image 20221206173624.png]]

In Fusion your nodes can go in any direction. This is very similar to how [[notes/Nuke/Nuke Hub|Nuke]] lets you layout your nodes.

![[notes/attachments/Pasted image 20221206173909.png]]

![[notes/attachments/Pasted image 20221206173913.png]]

##### Anatomy of a Fusion node

[How inputs work in Fusion - YouTube](https://www.youtube.com/watch?v=aKV-2C2qMro)

Inputs => Triangles
Outputs => Squares

Think of the colors as category of input.

Yellow => Main input
Green => Secondary input
Blue => Effect Mask
White => anything else

Color Corrector Node Example:

![[notes/attachments/Pasted image 20221206174156.png]]

1. Main Input
2. Secondary Input (Match Reference)
3. Match Mask input
4. Output
5. Effect Mask

##### Connecting Nodes

There are few ways to connect nodes in fusion.
1. Click and drag from one output then:
	1. Drop it onto another node. By default it will connect to the next open input.
	2. Drop it directly onto an input of one of the nodes.
2. Right-click and drag from an output onto another node. A menu will pop up and let you choose which input to use.

![[notes/attachments/Pasted image 20221206180614.png]]

##### Saving Images

You can right click on the preview pane and save the image.

![[notes/attachments/Pasted image 20221206181216.png]]


#### Color Correction in Resolve

Davinci Resolve is industry standard in color grading for film. It even has it's own context for it.

![[notes/attachments/Pasted image 20221206180923.png]]

1. Stills
2. Viewport
3. Color grading node graph
4. Toolshelf
5. Color correcting tool wheels
6. Tools (Correlate with toolshelf)
7. Keyframes for animation

I'm not going to get into depth here, but you can do some really advanced things with color grading, keying and more in this context.

[How To Color Grade ANY IMAGE - DaVinci Resolve Color Correction Tutorial - YouTube](https://www.youtube.com/watch?v=xK9x-S5eUYk)

#### Exporting Footage

Use the *Export* context and select a file-type to render out to.


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