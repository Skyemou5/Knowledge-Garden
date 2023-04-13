---
title: "Compositing in Blender"
tags: [blender,compositing,lesson, color, vfx]
---

Compositing for animation and VFX is a critical part of the pipeline. In fact often it is the part of the pipeline that gets you the last 10-20% for whatever project you are working on.

Compositing involves combining multiple images or video footage to create a final composite image. This is often used in visual effects work, such as adding a character to a scene or creating a new environment. Color work involves adjusting the color and tone of the footage to achieve a desired look and feel, as well as ensuring consistency throughout the final product.

In addition to compositing and color work, editing involves selecting the best takes and arranging them into a cohesive story. Sound design involves creating and adding sound effects and music to enhance the audio experience of the video. Visual effects may include adding or removing elements from a scene, creating digital environments or characters, or enhancing practical effects.

All of these different parts of post-production are important for creating a polished, professional-looking video. They work together to refine and enhance the raw footage, creating a finished product that tells a story and engages the viewer. The final product is often a result of collaboration between multiple individuals, each with specialized skills in their area of expertise.

---

# Compositing

Compositing is a crucial part of computer-generated (CG) imagery and visual effects (VFX) in film and television production. It involves combining multiple images or video footage to create a final composite image that looks seamless and convincing to the viewer.

In CG, compositing is used to combine different layers of elements that have been rendered separately, such as the 3D models, lighting, and special effects, into a final image or sequence. This process is known as compositing because it involves bringing together separate elements, such as backgrounds, foregrounds, and characters, into a single cohesive scene.


---

# Blender Compositing

The Blender compositing system is node-based, which means that each effect is represented by a node that can be connected to other nodes to create a visual effects chain. These nodes can be used to perform tasks such as color correction, image filtering, and blending multiple layers together.

Blender also includes a variety of compositing tools, such as keying, tracking, and masking, which can be used to create complex composites. Keying is the process of removing the background of an image or footage, while tracking allows you to track the movement of objects in a scene. Masking allows you to isolate parts of an image or footage to apply effects to specific areas.

The Blender compositing system is very flexible and can be used for a wide range of tasks, from simple color correction to complex visual effects. It is often used in film and video production, as well as for creating visual effects in animation and game development.

## Setup

We'll start simple with the blender setup for compositing in Blender.

>[!IMPORTANT] First make sure you have the *Node Wrangler* addon enabled.

When getting things set up for compositing you should either have your image or image sequence ready or have a scene ready to be rendered.

For info on rendering and file formats see -> [[rendering]]

There are several ways to set things up for compositing but I like to use the following setup for simple things.

![[notes/attachments/blender_compositing_setup.png]]

Next make sure you select *Viewer Node* in the image editor:

![[notes/attachments/blender_viewer_node_image_editor.png]]

Once you do this it's probably best to disable the *backdrop* in your node editor.

![[notes/attachments/blender_compositing_backdrop.png]]

This is located at the top of the compositing window.

Now you are ready to start your compositing workflow.

>[!NOTE] if you are using the *viewer node* in the image editor you will need to add the viewer node, or, just use *node wrangler* and `cntrl + shift` click on a node to quickly view the output of a node.

Now you should have something like this in your file.

![[notes/attachments/simple_compositing_setup_blender.png]]

Now once you have the freedom to composite and color grade to your hearts content.

Here are some tutorials to start off with:
1. [Compositing in Blender for Beginners (Tutorial) - YouTube](https://www.youtube.com/watch?v=xEpVyEi1Hts&t=1601s)
2. [Every Compositor Node in Blender 2.83 Explained in One Video - YouTube](https://www.youtube.com/watch?v=gDXTMo31QSM)
3. [Introduction to Compositing in Blender - YouTube](https://www.youtube.com/watch?v=bIZrTXtyQkY&t=631s)
4. [Make Your Renders Pop - Intro To The Compositor - YouTube](https://www.youtube.com/watch?v=jhTPI6QJQNg&t=588s)
5. [How To Do EXR MultiLayer Compositing From Blender to DaVinci Resolve/Fusion Workflow - YouTube](https://www.youtube.com/watch?v=6-Y0s4-KRK8)
6. [How to Make Cinematic Renders with Blender? - YouTube](https://www.youtube.com/watch?v=mjBofvCt-N0&t=4s)
7. [Easy Camera Projection in Blender 3d: Full VFX Tutorial - YouTube](https://www.youtube.com/watch?v=ua8CrGf6wP8)
8. [Composite CGI Element Behind Real Glass - Blender VFX Tutorial (Full) - YouTube](https://www.youtube.com/watch?v=qdqV4oortP0)
9. [How to Add Animated Characters Into Your Video | Blender + AE VFX - YouTube](https://www.youtube.com/watch?v=G4Azti4pAqU)
10. [How to use NUKE for Blender projects (compositing) - YouTube](https://www.youtube.com/watch?v=p5cWuFXReco)
11. [Sorry Blender, this is my new compositor - YouTube](https://www.youtube.com/watch?v=Gmh-6isghMA&t=494s)
12. [Blender 2.92 Tutorial: Basic Video Color Grading. Color Correction. - YouTube](https://www.youtube.com/watch?v=1YEhKwpYcjY)
13. [Blender 2.8 Tutorial: View Layers and Render Layers as separate images - YouTube](https://www.youtube.com/watch?v=LPneC8b6gnU)
14. [Blender and Fusion Multi-Layer Workflow - Render Passes and Compositing for Beginners - YouTube](https://www.youtube.com/watch?v=cQ6EH5DSQyM)
15. [Cryptomattes in Blender 3.0 for Fusion or ANY software! - YouTube](https://www.youtube.com/watch?v=OykO2GkSyUo)
16. [Using Cryptomattes in Blender 3.4x - YouTube](https://www.youtube.com/watch?v=fxw0zdwqPMA)



---

# Example Files

[Knowledge-Garden/content/notes/3D-Modeling/blender/examples at hugo · benshurts/Knowledge-Garden](https://github.com/benshurts/Knowledge-Garden/tree/hugo/content/notes/3D-Modeling/blender/examples)

[Knowledge-Garden/change-colors-setup.blend at hugo · benshurts/Knowledge-Garden](https://github.com/benshurts/Knowledge-Garden/blob/hugo/content/notes/3D-Modeling/blender/assignments/compositing/change-colors-setup.blend)

[Knowledge-Garden/comp-exercise1.blend at hugo · benshurts/Knowledge-Garden](https://github.com/benshurts/Knowledge-Garden/blob/hugo/content/notes/3D-Modeling/blender/assignments/compositing/comp-exercise1.blend)

[Knowledge-Garden/comp3.blend at hugo · benshurts/Knowledge-Garden](https://github.com/benshurts/Knowledge-Garden/blob/hugo/content/notes/3D-Modeling/blender/assignments/compositing/comp3.blend)


