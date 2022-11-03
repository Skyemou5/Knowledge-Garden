---
title: "Houdini Connect Points"
tags: [houdini,vex,scripting]
---

```vex
int primPts[] = primpoints(0, @primnum);
int firstPt = primPts[0];
int lastPt = primPts[-1];
int isClosed = primintrinsic(0, "closed", @primnum);

if (isClosed || firstPt == lastPt) // is closed poly or closed curve
{
    // if is closed curve 
    // pt array's first pt and last pt are the same pt
    if (firstPt == lastPt)
        pop(primPts);
    
    int ptCount = len(primPts);
   
    for (int pt0Idx = 0; pt0Idx < ptCount - 1; pt0Idx++) // the origin last pt is no need as new line first pt 
    {
        int pt0 = primPts[pt0Idx];
        
        for (int pt1Idx = pt0Idx + 2; pt1Idx < ptCount; pt1Idx++)
        {
            int pt1 = primPts[pt1Idx];
            
            if (!(pt0Idx == 0 && pt1Idx == (ptCount - 1))) // exclude condition that connect first and last pt
                int line = addprim(0, "polyline", pt0, pt1);
        }
    }
}
```


https://www.youtube.com/watch?v=-qgtQ91oItQ
