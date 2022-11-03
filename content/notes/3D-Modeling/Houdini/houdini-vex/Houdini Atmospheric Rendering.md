---
title: "Atmospheric Rendering"
tags: [rendering, vex, houdini, math, linear-algebra]
---


https://en.wikipedia.org/wiki/Mie_scattering
https://www.britannica.com/science/Rayleigh-scattering
https://www.scratchapixel.com/lessons/procedural-generation-virtual-worlds/simulating-sky
https://www.alanzucconi.com/2017/10/10/atmospheric-scattering-1/



orientation

```vex
vector v0 = normalize(set(-1,0,-1));  
vector vref = set(0,0,-1);  
  
vector4 orient = dihedral(v0, vref);  
vector angle = qconvert(orient);  
  
//angle = degrees(angle)*-1;  
//v@angle = angle;


vector angle = quaterniontoeuler(orient, 0);  
angle = degrees(angle);

```