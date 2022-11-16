---
title: "Follow Curve - Copy To Points"
tags: [houdini, curves, setups]
---

# Problem:
When using a curve to copy objects to you probably want the objects oriented along the curve. By default this behavior doesn't happen, so you have to set it up.


# Solution(s)

Drop down an [Orientation along Curve](https://www.sidefx.com/docs/houdini/nodes/sop/orientalongcurve.html) node. 

![[notes/attachments/Pasted image 20221115092214.png]]

>[!IMPORTANT] This should be before your *CopyToPoints* node


