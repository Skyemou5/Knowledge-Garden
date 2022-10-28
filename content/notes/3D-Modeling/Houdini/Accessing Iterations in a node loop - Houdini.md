---
title: "Accessing Iterations in a node loop - houdini"
tags: [houdini, setups, fundimentals]
---


# Accessing Iterations in a node loop

To access the iterations of a loop you have to set up a few things.
![[notes/attachments/Pasted image 20221021115511.png]] Select the *Block Begin* of the loop nodes. The click the *Create Meta Import Node* button in the properties window. 
![[notes/attachments/Pasted image 20221021115551.png]]
This will create a *Meta Import Node* 
![[notes/attachments/Pasted image 20221021115627.png]]
If we view node info for that node we will see two imortant *Detail Attributes*: *iteration* and *numiterations* which are both *integers*.
![[notes/attachments/Pasted image 20221021115750.png]]
Because these are detail attributes we can access them throughout our network with a [detail](https://www.sidefx.com/docs/houdini/expressions/detail.html) expression function.
![[notes/attachments/Pasted image 20221021122343.png]]
1. A *string* path pointing to the correct *metadata* node of the loop.
2. The *string* name of the detail attribute we want to grab. In this case *iteration*
3. The *attribute index*, in this case not applicable, but if it was a vector or something else we could use this here.


![[notes/attachments/Pasted image 20221021122629.png]]
Now we can see the iterations in that parameter field.