---
title: "Directing Vellum Simulations"
tags: [houdini,vellum,simulation,motion graphics]
---

Check Houdini.school

3 Ways to add forces for vellum

- Noise
- Chops -> right-click add *MotionFX*
- Attribute on SOP


>[!IMPORTNAT] Solvers only take the attributes on frame one so you need a specific setup to account for that


you can put the below code in a pop wrangle and if you set the pop wrangle inputs to SOP and set the noise OUT node then we can bring that noise in.

```c
f@activate = point(0,"noise",@ptnum);
```

In DOP nodes there's often a use vex check box.

![[notes/attachments/Pasted image 20230214142850.png]]

In this case we can use the data we imported and then manipulate our sim here with it.


>[!NOTE] With *Pop curve force* you will probably want to also have a *pop drag* so the cloth doesn't get push out of the boundary


If you have multiple pieces of cloth you may want each one to behave differently. To do that we can put random attribs on each piece.

>SHIFT+W turns off/on wireframe

*Path Deform* is another way to move cloth along a curve.

```c
$GCX $GCY $GCZ
```

The above expressions will center a pivot on whatever group you have selected.



## Vellum Pin Constraint

Permanent -> Doesn't have a *stopped* attribute

![[notes/attachments/Pasted image 20230214160756.png]]

>Pop wrangle is a little simpler than vellum constraint properties

>[!NOTE] For things like activating constraints in sims you may want to cast a falloff attribute into an int, so it rounds to 1 or 0

![[notes/attachments/Pasted image 20230214163040.png]]

In a pop wrangle change the input to SOP if you want references to SOP nodes outside the DOP net.


### Soft Pin Constraints

Soft is like Pin, but it has a float value.

![[notes/attachments/Pasted image 20230214165726.png]]

You can scale values by attribute if toggle *scale by attribute*

### Bend Stiffness

![[notes/attachments/Pasted image 20230214170415.png]]

The lower the number the higher resolution you will want. Because it will wrinkle more.



![[notes/attachments/Pasted image 20230214170600.png]]

Attribute paint can re-project your paint if you change the resolution.

---

Delete points after frame

```c
if (@Frame > 50) removepoint(0, @ptnum);
```

---

# Retime Node

Often you should retime after the file cache




---

# vex stuff

## Vex groups:

if you prefix anything `i@group_` it will create a group
it's shorthand

the other way is
`setprimgroup()`