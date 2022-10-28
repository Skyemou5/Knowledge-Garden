---
tags: [shading, texturing, rendering, lesson-notes, blender]
title: "Shading and Rendering in Blender"
---

```toc
style: bullet | number | inline (default: bullet) min_depth: number (default: 0) max_depth: number (default: 6) title: string (default: undefined) allow_inconsistent_headings: boolean (default: false) delimiter: string (default: |) varied_style: boolean (default: false) 
```


# Agenda
1. Retopology
2. Grease pencil refresher
3. Shading
4. Exercise

---

# Rendering

## What is Rendering?
Rendering in the context of computer graphics usually refers to the process of taking some type of data and turning it into a final image.
This is accomplished using a large and complex stack of tools and software and hardware.

> The term rendering was taken from traditional art as a way to describe what the computers are doing. Namely creating images.

## What are Renderers?
Renderers are software stacks to do the hard work of taking many types of data and turning that data into an image.
Often making use of research in many different fields, from physics, to material science and applied in computer science.
For example, most renderers try to approximate how physical light bounces of certain materials and how our eyes interpret that light. 

## Types of Renderers
There are many types of renderers, but in general we can lump them into two categories
1. Path-tracers
2. Rasterizers
To quickly differenciate them think of path-tracers as the type of renderer that Pixar uses and Rasterizers the renderer that game engines use.

### Path-Tracers
Path-tracers are generally trying to do things as accurately and with as much quality as possible, at the expense of speed.

> You could never play a game with renderman

The reason for this is that one of the foundational techniques they use is ray-tracing. This involves simulating how millions of photons bounce around the scene and react with different materials.
>[!NOTE] Because of this straightforward approach to rendering it is often paradoxically simpler to get a scene to look the way you want than with raster-engines

### Rasterizers or Raster-Engines
Raster renderers are the flipside of path-tracers. Instead of accuracy they prioritize speed. This is because these engines are usually used for things like games where you want to render 60 frames-per-second on top of your game logic and everything else happening.
These days raster engines are approaching the quality of path-tracers of the past and are used even in some contexts for film.
>[!NOTE] They are especially used for previs and lookdev in film.

## Rendering in Blender

Blender ships with two render engines.
1. Cycles
2. Eevee

Cycles is a classic path-tracing render engine, while eevee is a raster-engine.



### Cycles
Cycles is a path-tracing render engine. It will take more CPU and GPU power to get a nice image, but that's not a bug, that's a feature. Path-tracers are designed to efficiently use as many resources on your computer as possible for the render.

#### Setting up Cycles
1. Go to the render settings tab in the properties window and in the *Render engine* drop-down select *Cycles* ![[notes/attachments/render-engine-selection-blender.png]]
2. *Optional* in the render settings tab you can then choose to use GPU or CPU. If you have a good enough GPU you should always use GPU. ![[notes/attachments/gpu-cpu-cycles-settings-blender.png]]
	1. You will probably also have to set up how you want cycles to use the GPU.
		1. Open the blender preferences window (In the edit menu) and open the *system* menu ![[notes/attachments/GPU-settings-cycles-blender.png]]
			1. System menu
			2. Cycles render devices section
			3. Ways to integrate the GPU with the CPU
			4. Your systems hardware that can be used for rendering. Typically your CPU and GPU(s)
		2. Then select a compatible method to use your GPU with. CUDA and OptiX are the most common especially with Nvidia GPUs
	2. Now if you switch to shaded mode in your viewport it will use Cycles instead of workbench or eevee. ![[notes/attachments/viewport-modes-pie-menu-blender.png]] ![[notes/attachments/rendered-mode-vieport-blender.png]]

### Eevee
Eevee is a raster-engine build into blender. It can get you much faster results and has almost complete feature parity with cycles. This means you can use the same material for cycles and eevee!

>[!NOTE] The *Material Preview* view-mode (also known as the *lookdev* mode) always uses Eevee.
>
>This is because it's faster and uses less computer resources and so it's easier to iterate through your surfacing. 


#### Setting up Eevee
Setting up eevee is pretty much the same as cycles. You probably won't need to actually do anything because Eevee is set by default. But if not, in your render settings just choose eevee.

### General Rendering Tips


---
## Shading
Shading refers the way software and artists define how the surfaces should react to light and shadow.
In the context of 3D we do that with shaders and materials and lights.
This whole process can be extremely complex, so we will only cover the basics here.

### Important Terminology
- Shading -> How surfaces react to light
- Shaders
	- Technical Definition -> Code that executes on a GPU. (This is a more *correct definition*)
	- General Definition in the context of this lesson -> A way to define the behavior of a surface in our scene.

### Set up Workspace for Shading
Open the shading workspace or follow the steps below.

1. Split your 3D viewport window.
	1. Hover over the borders between the windows until your cursor turns into a double-sided arrow then right click and choose to split the window.
	2. Or, hover the cursor right next to the border of the window until your cursor turns into a plus symbol.
	3. ![[notes/attachments/split-windows-blender.png]]
2. On the new window you just created click on the window-type dropdown
	- ![[notes/attachments/select-window-type-blender.png]]
3. Then choose *shader editor*. Your windows could look something like this ![[notes/attachments/my-shading-window-layout-blender.png]]

Now you're workspace is set up. There are a few other things to set up.

### More Set up
#### Node Wrangler Addon
I recommend enabling the *Node Wrangler* addon in your preferences.

>[!NOTE] *Node Wrangler* comes shipped with Blender

![[notes/attachments/node-wrangler-addon-enable-blender.png]]

Most addons have extra options if you expand the window. And have a link to their documentation.

[Node Wrangler — Blender Manual](https://docs.blender.org/manual/en/3.3/addons/node/node_wrangler.html)

---

