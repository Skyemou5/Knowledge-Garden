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

### Horizontal line

Next we will create another `line` node.

Wire in a `null` into the lines output and call it `OUT_horizontal_line`.

![[notes/attachments/hou_bookshlef_horiz_line_OUT.png]]

>[!NOTE] I put this line in another frame for setup objects, because we will reuse this line for more components.

### Copy to points boards

Drop down a new `copy to points` node.

Now connect the OUT of the new line to *left* side of the new `copy to points` node.

Now wire in the output of the first `resample` node into the *right* input of the new `copy to points`.

You'll probably notice there is a problem. The lines extend past the edge of the bookshelf. So let's fix this:

### Remove last point wrangle

Between the first `resample` and the boards `copy to points` we just put down, drop down a new `attribute wrangle`.

Copy this code into it:

```c
removepoint(0,@numpt-1);
```

This will remove the last point in the array.

Now it doesn't extend past the edge.

### Board Geo

This part is easy. Just copy the `sweep` and `poly extrude` nodes you made before.

>[!NOTE] You can copy nodes with `CNTRL+C` and paste with `CNTRL+V` *OR* hold `ALT` and drag nodes and they will copy.
>
>![[notes/attachments/alt-drag-hou.gif]]

>[!IMPORTANT] Copying these nodes will *ALSO* copy the references inside them so you don't need to set it up again.

![[notes/attachments/hou_bookshelf_bottom_board_sweep_ext.png]]

Now let's add a `transform` node below those two and set an offset of `0.05` in the `Y` direction to move them up a bit.

## Vertical Separators

You've probably noticed that the bottom boards aren't the correct length. This will get a little more complicated than before, so follow along closely.

There are a few things we need to do to fix this.

>[!IMPORTANT] This is where we will use the `ptdist` attribute we turned on in the resample node.

### Creating the vertical boards

Firs thing we'll do is copy the entire `copy to points` `sweet` `poly extrude` chain from before.

Then we wire in the vertical line we made into the *left* slot of the copy to points.

Next, take the *right* output from the `split` node and wire it into the *right* side of the new `copy to points` node.

You should have one or more vertical boards like this:

![[notes/attachments/hou-bookshlef-vert-boards.png]]

## ptdist attribute

>[!INFO] The reason I am using the `ptdist` attribute instead of just the `Length` parameter from the `resample` node is for two reasons:
>
>1. What if I don't want to use the `length` parm and instead want to use amount?
>2. The `Length` results in some wiggle room and imprecise distances as things change. For this we need precision.

One of the problems we have to solve is how do we get the information of the distance between points to the line distance and anywhere else we need it.

We will drop down 3 nodes:
- `Attribute Promote`
- `Attribute Wrangle`
- `null`

Hook them up respectively.

![[notes/attachments/hou-bookshelf-ptdist.png]]

### Attribute Promote

The first node is an `attribute promote`, This node lets up change type of an attribute. In our case we just need to worry about two fields.

1. `original name`
2. `new class`

set `ptdist` in the first one. and set the `new class` to `Detail`

>[!NOTE] `Detail` attributes are not stored on components but instead on the object level. We only need this stored once, so we save computation by not putting it on points.

### Attribute Wrangle

In this wrangle we will solve a strange behavior that caused me some problems. The problem was that because we were using the distance attribute when there was no extra points being created in the resample that attribute was set to 0. So we need to correct it.

What we will do is check whether the attribute is zero, if it is we will set it to the length of the bookself.

```c
if (@ptdist == 0)
{
    @ptdist = chf("dist");
}
```

>[!NOTE] To create a parameter in vex you use channel expressions. In this case `chf` stands for channel float. or a float channel. The argument is a string indicating the name it will have.
>Then you click the slider button in the wrangle.
>
>![[notes/attachments/hou-wrangle-add-parms-button.png]]


Now copy in the `length` parm from the `CONTROLLER` into the new parameter.

![[notes/attachments/hou-bookshelf-fix-dist-parm.png]]

Now name the `null` something like `OUT_ptdist`.

## Shelves

Now we will use the `ptdist` attribute. In this case we will use an *expression* inside a parameter.

>[!NOTE] Houdini uses `HScript` or `Python` as an expression language. HScript is similar to linux command line languages like `Bash`. You can check the *documentation* for more info [Expression functions](https://www.sidefx.com/docs/houdini/expressions/index.html)

In the *horizontal* `line` node we created earlier is where we will write this expression.

>[!IMPORTANT] In this case I am using `HScript`

The expression is:

```python
abs(detail("../OUT_ptdist_attrib/","ptdist",0)-ch("../CONTROLLER/board_thickness"))
```

![[notes/attachments/hou-bookshelf-line-len-expression.png]]

1.  `abs()` is a function that calculates the absolute value of a number. It ensures that the result is always positive.
2.  `detail()` function is used to access attribute values from another geometry in the scene. In this case, it is accessing the attribute named "ptdist" from the geometry located at the relative path "../OUT_ptdist_attrib/". The third argument, `0`, specifies that the first geometry instance should be used.
3.  `"ptdist"` is the name of the attribute being accessed using the `detail()` function. It refers to the attribute called "ptdist" in the referenced geometry.
4.  `-` is the subtraction operator, which subtracts the value obtained from `detail("../OUT_ptdist_attrib/","ptdist",0)` from the next part of the expression.
5.  `ch()` function is used to retrieve the value of a channel parameter. In this case, it is accessing the channel parameter named "board_thickness" from the node located at the relative path "../CONTROLLER/".
6.  `"../CONTROLLER/board_thickness"` specifies the relative path to the channel parameter named "board_thickness" in the referenced node.

Putting it all together, the expression calculates the absolute difference between the value of the "ptdist" attribute from the referenced geometry and the value of the "board_thickness" channel parameter from the referenced node. The `abs()` function ensures that the result is positive.

Now we just need to copy the parameter `board thickness` from the `CONTROLLER` into the `X` component of the origin vector on the line.

![[notes/attachments/hou-bookshelf-line-origin-position.png]]

What this does is shifts the line over based on the thickness of the boards and shrinks it so that there are no intersections. This will be important if we want to destroy the bookshelf.

