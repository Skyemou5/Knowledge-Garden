---
title: "Houdini Fundimentals"
tags: [houdini, fundimentals, lessons, cg, essentials]
---

# User Interface

Houdini's UI can be overwhelming so let's break it down.

## Settings

![[notes/attachments/houdini-preferences-location.png]]

This is where a lot of the major settings are you may want to change, like UI scale.


## General UI patterns

There are some basic design patterns in houdini to lookout for.

![[notes/attachments/houdini-ui-patterns-01.png]]

1. Tabs - this shows the active tabs and other tabs. the `+` sign will let you create a new tab.
2. This will collapse the submenu.
3. Current path - this isn't always in every window, but often enough to be mentioned here.
4. This has two buttons.
	1. Fullscreen current window.
	2. Change window type.
5. This also has two buttons.
	1. pin current window at current path.
	2. change the windows path by dragging this target onto something.

In houdini your interface is split into `panes`. These divide your workspace. Each pane can contain multiple tabs.

As seen above, we can easily change focus and change how you are using the panes and windows.

![[notes/attachments/houdini-pane-options.png]]

In the options on the top-right you can set the pane-type, split the pane and more.

### Desktops

Once you've created a workspace you like you can save it and set it as a default if you want.

![[notes/attachments/houdini-save-current-desktop.png]]

![[notes/attachments/houdini-set-default-workspace.png]]



## 3D Viewport

Houdini's 3D viewport is very powerful. Like other packages the main window shows the 3D view.

![[notes/attachments/houdini-viewport.png]]

1. Toolbar
2. Camera options
3. camera and view options - ortho is here
4. View options - I'll break this down later.
5. Shading options, hiding other objects, and splitting the view
6. Tool options and help

![[notes/attachments/houdini-viewport.png]]

### Toolbar

![[notes/attachments/houdini-toolbar-options-01.png]]

1. Object select mode
2. Geometry select mode
3. Dynamic select mode

![[notes/attachments/houdini-toolbar-02.png]]

1. Select
2. Secure selection `~` (prevents selecting geo except in the select tool)
3. Move `T`
4. Rotate `R`
5. Scale `E`
6. Pose `Cntrl + R`
7. Show handles `Enter`

![[notes/attachments/houdini-3d-toolbar-03.png]]

1. Grid snapping
2. Primitive snapping
3. Point snapping
4. Multi snapping
5. View/camera options
6. Render region
7. Inspect

![[notes/attachments/houdini-flipbook-options.png]]

1. Render flipbook
2. Render output options

### Top bar

![[notes/attachments/houdini-topbar-3d-01.png]]

1. Set pivot on Tumble/rotate
2. Dolly along projected direction
3. Zoom about mouse position
4. 3D camera
5. 2D zoom (this is useful for VFX)
6. Reset screen window in open viewports
7. First person mode
8. Show/view parameters

![[notes/attachments/houdini-viewport-tooloptions.png]]

Here you can set some specific viewport rendering and shading options and set a view:

![[notes/attachments/houdini-viewport-options.png]]

In the camera options you can look through cameras and lights:

![[notes/attachments/houdini-viewport-camera-options.png]]

Here you can quickly set different viewport shading options:

![[notes/attachments/houdini-viewport-shading.png]]

More view options:

![[notes/attachments/hoduini-viewport-options-ghost.png]]

Split view options:

![[notes/attachments/houdini-3dviewport-splitview.png]]

### Sidebar

This toolbar is extremely powerful and help you view your 3D data in more powerful and informative ways than most 3D apps.

![[notes/attachments/houdini-3dviewport-sidebar-01.png]]

1. Display reference plane
2. Displace construction plane
3. Lock camera/light to view
4. Disable all lighting
5. Headlight only
6. Normal lighting
7. High quality lighting
8. High quality lighting with shadows

![[notes/attachments/houdini-3dviewport-sidebar-02.png]]

1. Highlight points
2. Display normals
3. Display point trails
4. Display point numbers
5. Display primitive normals
6. Display primitive numbers
7. Display primitive hulls

![[notes/attachments/houdini-3dviewport-sidebar-03.png]]

1. Tint backfacing polygons
2. Show UV texture when present
3. Show 3D island boundaries
4. Show UV island boundaries
5. Display particle origins
6. Show group and attribute list
7. Display background

![[notes/attachments/houdini-3dviewport-sidebar-04.png]]

1. Toggle visualization (These can be setup custom or built in to show different data)
2. Viewport messages
3. Apply display operation across all split panes
4. Open display options `D`

>[!NOTE] If you right-click the display options you can open up color correction. This is how you can check if ACES or other color correction is set up right.

### Navigation and hotkeys

#hotkeys

Houdini uses `ALT` navigation.

- `ALT` + `LMB` / `MMB` / `RMB` => rotate / pan / zoom (it can be locked to not have to use alt)
- Frame selected from home view => `SPACE+G`
- Perspective view => `SPACE+1` 
- Top/bottom view => `SPACE+2` (hit 2 more to toggle between bottom and top)
- Front/back => `SPACE+3`
- Left/Right => `SPACE+4`
- UV vierw => `SPACE+5`
- Focus on selection => `F`
- get back to home view => `SPACE+H`
- 



### 3D Selection (edit mode)



When in geometry selection mode there are hints at the bottom of the viewport.

![[notes/attachments/houdini-geo-selecet-hints.png]]

![[notes/attachments/houdini-selected-face-loop.png]]

![[notes/attachments/houdini-select-components-options.png]]

1. Points
2. Edges
3. Prims

Hit `2` / `3` / `4` to toggle between selecting points/edges/primitives.

>[!NOTE] This is similar to blender

![[notes/attachments/houdini-selection-more.png]]

1. Verticies
2. Breakpoints

>[!NOTE] Houdini exposes 3d architecture unlike many other programs. Points and vertices are actually different types of data but related.
>Verts are corners, points are the whole thing. This is how you can fill a primitive with color completely and not bleed to the next one.


![[notes/attachments/houdini-selection-modes.png]]

1. Box select
2. Lasso select
3. Brush select
4. Laser select

![[notes/attachments/houdini-selection-options.png]]

1. Select visible only (camera selection)
2. Select fully contained geo only
3. Select groups or connected geo
4. Select whole geo
5. Select by normal

![[notes/attachments/houdini-more-selection-options.png]]

![[notes/attachments/houdini-selection-visibilty.png]]

Use these tools to navigate and edit and move your geo around.

>[!NOTE] All these options are context dependent so if you are not in an Geo container then they wont show up.


### Object mode

This is where you can manipulate whole object similar to other 3D apps.

Many of the same transformation options are used here.

One thing I find I use frequently are the gizmo options.

If you `Right click` on the center of the gizmo you will get a bunch of options.

![[notes/attachments/houdini-gizmo-center.png]]

![[notes/attachments/houdini-gizmo-options.png]]

I frequently use the `align handle` options to move things in the world easier.

Holding down `SHIFT` will toggle *fine tune* mode for any action.

Holding down `CNTRL` will toggle snapping, (Usually grid snapping, but this can be changed)

To change the snapping increments of the handle tool right click on the handle and open the `handle parameters`

![[notes/attachments/houdini-rightclick-onhandle.png]]

![[notes/attachments/houdini-handle-parameters.png]]

Middle mouse click can be set up to speed up your workflow.

I change the behavior to be more like blender. In that you middle mouse click and drag and snap to an axis you drag in.

>[!NOTE] Construction planes can be used for extra reference in setting things up. By default the middle mouse drag will constrain to a construction plane. You just need to add one.

#### Handle Tool

Different tools have different handles *and* you can define your own handles in python.

For example the transform tools have handles that you probably recognize, the camera has different types of handles to change different parameters.


### Radial Menus

Radial menus can be used in the viewport and network view.

These can be customized and set per what you need.

![[notes/attachments/houdini-radial-menu.png]]

In the viewport you tap `C` to bring up the menu.

# Takes

Takes can be used to store different settings. For example, high quality render settings for a final take.

![[notes/attachments/houdini-takes.png]]

### Transforming and Objects Pivot

There are many ways to do this.

- Pivot mode => `insert`

>[!NOTE] This behaves a lot like maya

You can also change the pivot in the parameter view.

![[notes/attachments/houdini-pivot-param.png]]

You can do some operations like freezing transforms and things like that in the parameter window as well.

![[notes/attachments/houdini-clean-transform.png]]

>[!NOTE] This has to do with *pre transforms* well cover more of this later.

#### Detaching Handles

Detaching handles can help you work in a similar way to using the *3d cursor* in blender. Its a temporary way to create a different reference point to do your manipulation.

- Detatch Handle => `'` apostrophe 

>[!NOTE] You can also detach it in the right click menu of the handle

>[!NOTE] You can make the detached handle persistent in the right click menu and use both.
>
>![[notes/attachments/houdini-persistent-detached-handle.png]]
>
>You can then select snap to centroid or pivot in the right click menu to put it back.
>
>You can also change the orientation of the handle

### Transforming Multiple Objects

If you select multiple objects you then need to use the `transform`, `scale` or `rotate` tools to change them all.

In the right click menu you can tell it to change all at once or each individually.

#### Matching Transforms

In houdini you can quickly match transforms. Click on the buttons indicated below then click the target object and it will match.

![[notes/attachments/houdini-match-transforms.png]]

#### Align state and Orientation picking

This is great tool to help you align and orient objects to other objects in your scene.

There are two ways to get to Orientation picking.

1. Right click the handle and choose it:

![[notes/attachments/houdini-orientation-picking-01.png]]

2. Press the `;` to start orientation picking.

Then the handles should like this:

![[notes/attachments/houdini-orientation-picking-02.png]]

>[!NOTE] If you hold shift while you click on another objects component then it will align and not move.
>Always check the hints at the bottom of the viewport.
>![[notes/attachments/houdini-pivot-align-notes.png]]


## Network View

The network view is the heart of houdini. This is where the magic happens. This is where you can see your node network.

![[notes/attachments/houdini-networkview-example.png]]

A lot of the same #hotkeys are used in the network to move around:

- frame selected => `F`
- get to home => `H`

### Object Context

