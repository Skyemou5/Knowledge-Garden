---
title: "Velocity Vectors Vex Houdini"
tags: [vex,houdini,scripting,programming,math,linear-algebra]
---



```
vector middlepoint = point(0,'P',878) + chv('adddir');

float noise = noise(chv('offset')+@P*chv('fancyscale')*ch('multynoise'))*5;

v@pushout = (middlepoint-@P)*noise; 
v@v = v@pushout*-1;
```

