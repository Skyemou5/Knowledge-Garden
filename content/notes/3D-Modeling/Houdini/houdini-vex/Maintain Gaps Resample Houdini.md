---
title: "Maintain gaps in a resample houdini"
tags: [houdini, vex, setups, copytopoints, instancing]
---
This solves a problem I have often encountered where I need the gaps to stay the same as things are instanced onto a resampled line.


![[notes/attachments/Pasted image 20230509135516.png]]

```c
if(@ptnum<@numpt-1){
vector nextP = point(0, "P", @ptnum+1);
@boardSize = distance(@P, nextP);
}
else{
vector lastP = point(0, "P", @ptnum-1);
@boardSize = distance(@P, lastP);
}
float taper = chramp("ShrinkShape",@grad);
//if you want to art direct the gap, and space them tighter closer
//one side or something

//@boardSize*=ch("ShrinkPercent")*taper;
//if you want to maintain a gap based on percentage of board size
@boardSize -= ch("ShrinkAmt")*taper;
//for a measured gap
```

![[notes/attachments/Pasted image 20230509135546.png]]

