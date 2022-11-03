---
title: "Straighten UVs Vex"
tags: [uv, vex, houdini, programming, scripting]
---


```vex
@uv.y = @primnum + (1 / float(@numprim -1));
```

move the UVs of each prim along the y/v axis

```vex