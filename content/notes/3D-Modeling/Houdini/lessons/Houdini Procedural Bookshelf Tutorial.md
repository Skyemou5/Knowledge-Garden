---
title: "Houdini Procedural Bookshelf Tutorial"
tags: [houdini, procedural, setups, tutorial]
---

`Github link to file - update this`


This is a simple setup for a procedural bookshelf in houdini.

>[!NOTE] Obviously there are infinite ways to set this up, this is just one way

I am going to set this up so it's easy to expand with more features down the road.

---

# Initial Setup and Prep

> [!INFO] For this setup we are going use a point based workflow.

First drop down a `null` and call it `CONTROLLER` or something like that.

![[notes/attachments/houdini-controller-null-example-node.png]]

>[!HINT] You can hit `C` to bring up the color palette and `Z` to bring up the node shape palette to make the node look like the above.

>[!NOTE] This `null` controller workflow is very helpful once we get into [[notes/3D-Modeling/Houdini/lessons/Houdini HDAs|Houdini HDAs]] and tool building. 

Right away, we already know we will want to control some of the main parameters of this bookshelf:

- Height
- Width
- Depth

>And a few others you will see below

So let's add those to the parameters on the null.

>[!NOTE] To access the parameters on any node including this null click on the gear icon in the parameters window an select `edit parameter interface`
>
>![[notes/attachments/houdini-edit-parm-interface.png]]

There are many ways to add parameters. But for now just drag over from the list into the middle window.

![[notes/attachments/houdini-parameter-interface-drag.png]]

Then make sure you have named the parameter correctly.

![[notes/attachments/houdini-parm-names.png]]

>[!NOTE] the two fields that I have named the same actually serve different purposes. The label is what you see in the interface. The name is it's ID under the hood. This is important if you end up scripting with python and need to target a parameter. I think it's a good habit to make them the same for now.

You could also add a folder called `master controls` or something like that to keep your interface organized.

Go ahead and add the following parameters:

![[notes/attachments/houdini-simple-bookshelf-parms.png]]

# First Nodes Setup

For now let's set this up with a line at first.

## First line Node

1. Drop down a `line` node.
2. Set the direction to be left or right *not* up or down. ![[notes/attachments/Pasted image 20230517115204.png]]

>[!IMPORTANT] This will determine the total width of the bookshelf.

## Controller Node

Now let's start using our controller.

### Copy Parameters from Controller

First, right click on the `width` (or whatever you named it, it should be the length or width of the bookshelf) parameter and select `copy parameter`.

![[notes/attachments/houdini-copy-parm.png]]

Then on the `line` node right click on the `lenght` parameter and select `paste relative references`.

![[notes/attachments/houdini-paste-relative-references.png]]

Now the lines length will be controlled by the slider on your controller.

>[!NOTE] I often work with two parameter windows open when I do controllers. One I pin to the controller and the other will follow my selection.
>
>![[notes/attachments/houdini-split-parm-pinned.png]]

### Null IN node

> [!HINT] Next you can drop down a `null`. I named it `IN_curve`. This is just so in the future we have a clear input point and if we want to upgrade our setup we can.
>
>![[notes/attachments/houdini-bookshelf-IN.png]]

### First Resample Node

Next, drop down a `resample` node. 

![[notes/attachments/houdini-bookshelf-first-resample.png]]

This will determine the distance between the separator boards.

![[notes/attachments/houdini-bookshelf-separator-boards.png]]

![[notes/attachments/houdini-resample-on-line.png]]

>[!NOTE] Check the [Resample Node Documentation](https://www.sidefx.com/docs/houdini/nodes/sop/resample.html)for more info. The resample node splits up line segments by distance or amount.

We need to check one box on the `resample` node:
- `Distance Attribute`

![[notes/attachments/houdini-resample-distance-attrib.png]]

This will help us determine the length of the boards later in the stream.

>[!NOTE] Houdini attributes are data that can be attached to points, verts, prims, or the whole object (detail). For more info refer to the documentation [Geometry attributes](https://www.sidefx.com/docs/houdini/model/attributes.html)We will be using attributes and groups in this lesson.



# Bookshelf Components

Ok we now have the foundation set for the rest of the setup.

let's outline the components and how we want them to behave:

Components:
- End vertical boards
- Intermediate separator boards
- Shelves
- Top board

These should automatically generate with the size of the bookshelf and the parameters we set for separation between shelves and separators.

## End boards

These boards will be mark the ends of our bookshelf.

### Separate end points with wrangle

So we have the resampled line. We will be using a `copy to points` node to put the pieces where we want them. So we will want to separate out the the first and last points. The easiest way to do this is in a `point wrangle` with `vex`.

>[!IMPORTANT] Don't worry if you don't understand the vex yet. I'll do my best to explain. It's not too scary.



![[notes/attachments/houdini-bookshelf-wrangle-endpoints.png]]

In the node copy the following code:

```c
int npts = npoints(0)-1; //npoints is the total number of points in the geo stream

// Store the first point in a variable
int firstPoint = 0;
vector firstPosition = point(0, "P", firstPoint);
setpointgroup(0, "firstlast", firstPoint, 1);

// Store the last point in a variable
int lastPoint = @numpt - 1;
@lastpnt = lastPoint;
vector lastPosition = point(0, "P", lastPoint);
setpointgroup(0, "firstlast", lastPoint, 1);
```

> [!HINT]- Here is an explanation of the code:
> 
> #code-explanation
> 
> ```c
> int npts = npoints(0)-1; // npoints is the total number of points in the geo stream
> ```
> 
> -   The variable `npts` is declared as an integer and assigned the value of the total number of points in the geometry stream (`0`).
> -   The `npoints()` function returns the number of points in the stream, and by subtracting `1`, the variable `npts` represents the index of the last point in the stream.
> 
> ```c
> int firstPoint = 0;
> ```
> 
> -   The variable `firstPoint` is declared as an integer and assigned the value `0`.
> -   This variable will be used to store the index of the first point in the stream.
> 
> ```c
> vector firstPosition = point(0, "P", firstPoint);
> ```
> 
> -   The variable `firstPosition` is declared as a vector.
> -   The `point()` function retrieves the position ("P") of the point at index `firstPoint` in the geometry stream (`0`).
> -   The retrieved position, a three-dimensional vector representing the coordinates of the point in 3D space, is assigned to the `firstPosition` variable.
> 
> ```c
> setpointgroup(0, "firstlast", firstPoint, 1);
> ```
> 
> -   The `setpointgroup()` function is called to set a point group named "firstlast".
> -   The arguments provided to the function are the geometry stream (`0`), the name of the point group ("firstlast"), the index of the point (`firstPoint`), and a value of `1`.
> -   This effectively adds the `firstPoint` to the "firstlast" point group.
> 
> ```c
> int lastPoint = @numpt - 1;
> @lastpnt = lastPoint;
> ```
> 
> -   The variable `lastPoint` is declared as an integer and assigned the value of the attribute `@numpt` (the total number of points in the current geometry).
> -   By subtracting `1`, `lastPoint` represents the index of the last point in the stream.
> -   The `@lastpnt` attribute is then set to the value of `lastPoint`.
> 
> ```c
> vector lastPosition = point(0, "P", lastPoint);
> ```
> 
> -   The variable `lastPosition` is declared as a vector.
> -   The `point()` function retrieves the position ("P") of the point at index `lastPoint` in the geometry stream (`0`).
> -   The retrieved position is assigned to the `lastPosition` variable.
> 
> ```c
> setpointgroup(0, "firstlast", lastPoint, 1);
> ```
> 
> This line adds the `lastPoint` to the "firstlast" point group using the `setpointgroup()` function.
> 
> In summary, this code retrieves the positions of the first and last points in a geometry stream and stores them in `firstPosition` and `lastPosition`, respectively. Additionally, it adds the first and last points to a point group named "firstlast".

### Split node to split out the end points

Next we will drop down a `split` node.

![[notes/attachments/houdini-split-node.png]]

This will split the geo-stream by group. We created a group in the wrangle so now we will use it here.

![[notes/attachments/houdini-split-node-group-parms.png]]

>[!NOTE]- Checking for groups
>
>There are a few ways you can check for attributes and groups on any node.
>
>1. Middle click on a node to bring up the node info. This will show all the data about that node.
>2. Hover over a node till the `node ring` shows up
>	- ![[notes/attachments/houdini-node-ring.png]]
>	2. Click on the `i`
>		- ![[notes/attachments/houdini-ring-info.png]]
>
>This will bring up the info window:
>
>![[notes/attachments/Pasted image 20230517131203.png]]
>
>The other way is checking the `geometry spreadsheet`
>
>The spreadsheet will show all the data for any node selected.
>
>![[notes/attachments/houdini-group-in-spreadsheet.png]]
>
>There is a lot to learn about the `geometry spreadsheet`, check the documentation for more info -> [Geometry Spreadsheet pane](https://www.sidefx.com/docs/houdini/ref/panes/geosheet.html)

Now the stream is separated between the first and last points and the ones in the middle.

### Add node to remove edges

The next thing I'm going to do it wire-in an [Add](https://www.sidefx.com/docs/houdini/nodes/sop/add.html)
node to output of the split that just has the ends.

>[!NOTE] This is just to clean things up.

On the `add` node I'm going to check `Delete Geometry But Keep Points`

![[notes/attachments/houdini-keep-points-add-node.png]]

This is where things start to get a little more complex.

### Second Line node for height

Next we want to drop down another `line` node.

This line should be facing upwards on the `Y` axis and we should copy out `height` parameter into the `length` of the line.

>[!IMPORTANT] This line will be *height* of our bookshelf!

![[notes/attachments/houdini-bookshelf-height-line.png]]

### Copy to points for the end boards

Next we will drop down a [Copy to Points](https://www.sidefx.com/docs/houdini/nodes/sop/copytopoints.html) node. 

>[!NOTE] The `Copy to Points` node will allow us to copy anything to any points we feed into it.

![[notes/attachments/houdini-bookshelf-ctp-ends.png]]

1. geometry to copy
2. points to copy to

Now you should have two lines pointing up like so:

![[notes/attachments/houdini-bookshlef-ctp-ends-result-line.png]]

### First Sweep Node

Next let's drop down a [Sweep](https://www.sidefx.com/docs/houdini/nodes/sop/sweep.html) node. and wire it into the output of the `copy to points`.

![[notes/attachments/houdini-bookshelf-sweep-ends.png]]

There are two parameters on the `sweep` node we need to worry about.

1. Surface Shape
2. Width

![[notes/attachments/houdini-bookshelf-sweep-parms.png]]

- Change the surface shape to ribbon.
- Then change the columns to `1`.

>[!NOTE] Ribbon will make it so houdini creates quads that follow the input curve.

Copy in our `Depth` parameter from the `CONTROLLER` into the `width` parameter on the `sweep` node.

Now you should be able to control the height, width, and depth of the ends like so:

![[notes/attachments/houdini-bookshelf-ends-animation.gif]]

### Extrude end boards

Next we'll drop down a [Poly Extrude](https://www.sidefx.com/docs/houdini/nodes/sop/polyextrude.html) node and wire it into the output of the `sweep` node.

>[!NOTE] The `poly extrude` node will extrude just like in other 3D packages.

This is how we will get thickness in our boards.

![[notes/attachments/houdini-bookshelf-extrude-ends.png]]

The only parameter we care about here is `Distance`. We will reference our `Board Thickness` parameter from our `CONTROLLER` here.

![[notes/attachments/houdini-bookshelf-board-thickness-extrude.png]]

It should now look like this:

![[notes/attachments/houdini-bookshelf-extruded-viewport.png]]

>[!HINT]- Organizing the network
>
>You can create a frame around selected nodes by pressing `SHIFT+O`
>
>![[notes/attachments/houdini-node-frame.gif]]


Your network should look something like this now:

![[notes/attachments/hou-bookshelf-network-01.png]]

## Bottom Boards

Next we will create 

