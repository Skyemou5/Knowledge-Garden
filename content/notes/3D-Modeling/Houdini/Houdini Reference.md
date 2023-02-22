---
title: "Houdini Reference"
tags: [houdini,vex,reference]
---


# Creating Groups in Vex

You can create groups in vex in various ways.

```c
i@group_groupname = 1 //1 = include 0 = exclude
```

example:

```c
if (@P.z > 0) {
i@group_groupone = 1;
}
```

---

# Resample into random length segments

[Houdini VEX code to resample a (two point) curve into segments of random length (with restrictions)](https://gist.github.com/werediver/4e51bbd36741a6b6aed012d3770b160e)

```c
// Resample into segments of random length
// Run over primitives

float seed = chf("seed");
float seg_len_min = chi("seg_len_min");
float seg_len_max = chi("seg_len_max");
float seg_padding = chf("padding");

if (seg_len_min <= 0 || seg_len_max < seg_len_min || seg_padding < 0) {
   error("Make sure 0 < seg_len_min <= seg_len_max and 0 <= seg_padding");
}

int np = npoints(0);
vector pstart = point(0, "P", 0);
vector pend = point(0, "P", np - 1);

vector dir = normalize(pend - pstart);
float len_max = distance(pend, pstart);

float len = 0;
vector pos = pstart;

int pts[]; // Numbers (IDs) of points to construct resulting segments from
append(pts, addpoint(0, pos));

while (true) {
   float seg_len_max_adjusted = clamp(len_max - len - seg_padding, seg_len_min, seg_len_max);
   float seg_len = rint(fit01(rand(seed + len), seg_len_min, seg_len_max_adjusted)) + seg_padding;
   
   vector pos_next = pos + dir * seg_len;
   
   if (len + seg_len <= len_max) {
       append(pts, addpoint(0, pos_next));
       
       len += seg_len;
       pos = pos_next;
   } else {
       break;
   }
}

removeprim(0, 0, 1); // Remove the original primitive and its points
addprim(0, "polyline", pts);
```

---

# Adding second to last point to a group

`setpointgroup(0,"controlPoint",npoints(0)-2,1,"set");`

Here's what each part of the expression means:

1.  `setpointgroup`: This is the function used to set the group of a point in Houdini.
2.  `0`: This is the index of the point cloud that contains the point you want to set the group for.
3.  `"controlPoint"`: This is the name of the attribute that defines the point's group. If this attribute doesn't exist, it will be created.
4.  `npoints(0)-2`: This is the index of the point you want to set the group for. In this case, it's the next to last point in the point cloud (`npoints(0)` is the number of points in the point cloud with index `0`, and `npoints(0)-2` is the index of the next to last point).
5.  `1`: This is the group number you want to set for the point. In this case, the point will be assigned to group `1`.
6.  `"set"`: This is an optional string argument that sets the mode for setting the group. In this case, `"set"` means that the existing group will be overwritten.

This line of vex code sets the group of the next to last point in point cloud `0` to group `1`. The group is defined by the `"controlPoint"` attribute, which will be created if it doesn't already exist.

 ---
# Houdini vex create tunnel

```c
int amt = chi("amt");

float size = chf("size");
float length = chf("length");
float x,y,z;

for (int i = 0; i < amt; i++){
    x = sin(i) * size;
    y = cos(i) * size;
    z = sin(i) + sqrt(i) * length;
    
    addpoint(0,set(x,y,z));
    
}
```

---

# Houdini vex parabola

```c
int amt = chi("amt");

float x,y,z;
float b,a,c;
b = 4;
a = 2;
c = 5;

    

for (int i = 0; i < amt; i++){
    x = i;
    y = x*x;
    z = i;
    
    addpoint(0,set(z,y,z));
    
    
}
```

---

# Houdini vex golden ratio

```c
float sweepAngle = chf('Sweep_Angle');
float growthFactor = chf('growth_factor');
int npoints = chi('number_of_points');
float TWO_DIVIDED_BY_PI = 2.0 / 3.14159;



vector pos;
float radius;

float step_angle = sweepAngle / float(npoints);
float curr_angle;

for(int i=0; i<npoints; ++i) {
    curr_angle = step_angle * float(i);
    radius = pow(growthFactor, curr_angle * TWO_DIVIDED_BY_PI);
    
    pos.x = sin(curr_angle) * radius;
    pos.y = 0.0;
    pos.z = cos(curr_angle) * radius;
    
    addpoint(0, pos);
    
    
}
```

---
# Strange Attractor vex houdini

![[notes/attachments/Pasted image 20230207155610.png]]

The below code goes in the wrangle above.

```c
int newprim = addprim(0, "polyline");
addvertex(0, newprim, @ptnum);
```

The below should go in a wrangle inside of solver

There are several different attractors.

```c
if(inpointgroup(0, "active", @ptnum)) {
    
    
    float x,y,z, a,c,d,e,k,f, dt;
    vector pos = set(0,0,0);
    
    dt = ch("dt");
    
    a = 40;    
    c = 1.833;        
    d = 0.16;        
    e = 0.65;        
    k = 55;        
    f = 20;
    
    pos = @P;
    x = pos.x;
    y = pos.y;
    z = pos.z;
    
    x = x + (a * (y-x) + d*x*z) * dt;
    y = y + (k*x + f*y - x*z) * dt;
    z = z + (c*z + x*y - e*x*x) * dt;
    
    pos = set(x,y,z);
    
    int newpt = addpoint(0, pos);
    
    setpointgroup(0, "active", newpt, 1);    
    setpointgroup(0, "active", @ptnum, 0);
    
    addvertex(0, 0, newpt);
}
```


```c
if(inpointgroup(0, "active", @ptnum)) {
    
    
    float x,y,z, a,c,d,e,k,f, dt;
    vector pos = set(0,0,0);
    
    dt = ch("dt");
    
    a = 40;    
    c = 1.833;        
    d = 0.16;        
    e = 0.65;        
    k = 55;        
    f = 20;
    
    pos = @P;
    x = pos.x;
    y = pos.y;
    z = pos.z;
    
    x = x + (a * (y-x) + d*x*z) * dt;
    y = y + (k*x + f*y - x*z) * dt;
    z = z + (c*z + x*y - e*x*x) * dt;
    
    pos = set(x,y,z);
    
    int newpt = addpoint(0, pos);
    
    setpointgroup(0, "active", newpt, 1);    
    setpointgroup(0, "active", @ptnum, 0);
    
    addvertex(0, 0, newpt);
}
```

```c
if(inpointgroup(0, "active", @ptnum)) {
    
    
    float x,y,z, a,b,c, dt;
    vector pos = set(0,0,0);
    
    dt = ch("dt");
    
    a = 0.2;    
    b = 0.2;        
    c = 5.7;        
   
    
    pos = @P;
    x = pos.x;
    y = pos.y;
    z = pos.z;
    
    x = x + -(y + z) * dt;
    y = y + (x + a * y) * dt;
    z = z + (b + z * (x-c)) * dt;
    
    pos = set(x,y,z);
    
    int newpt = addpoint(0, pos);
    
    setpointgroup(0, "active", newpt, 1);    
    setpointgroup(0, "active", @ptnum, 0);
    
    addvertex(0, 0, newpt);


}
```


```c
if(inpointgroup(0, "active", @ptnum)) {
    
    
    float x,y,z, a,b,c, dt;
    vector pos = set(0,0,0);
    
    dt = ch("dt");
    
    a = 38;    
    b = 2.7;        
    c = 28;
   
    
    pos = @P;
    x = pos.x;
    y = pos.y;
    z = pos.z;
    
    x = x + (a * (y - x)) * dt;
    y = y + ((c - a) * x - x*y + c*y) * dt;
    z = z + (x*y - b*z) * dt;
    
    pos = set(x,y,z);
    
    int newpt = addpoint(0, pos);
    
    setpointgroup(0, "active", newpt, 1);    
    setpointgroup(0, "active", @ptnum, 0);
    
    addvertex(0, 0, newpt);


}
```

```c
if(inpointgroup(0, "active", @ptnum)) {
    
    
    float x,y,z, a,b,c, dt;
    vector pos = set(0,0,0);
    
    dt = ch("dt");
    
    a = 29851;    
    b = 3;        
    c = 2;
   
    
    pos = @P;
    x = pos.x;
    y = pos.y;
    z = pos.z;
    
    x = x + (x - x*y + (c*y*((c*y)*(c*y)) - (a*z*x*((a*z*x)*(a*z*x))))) * dt;
    y = y + (-y + x*y) * dt;
    z = z + (-b*z + (a*z*x*((a*z*x)*(a*z*x)))) * dt;
    
    pos = set(x,y,z);
    
    int newpt = addpoint(0, pos);
    
    setpointgroup(0, "active", newpt, 1);    
    setpointgroup(0, "active", @ptnum, 0);
    
    addvertex(0, 0, newpt);


}
```

---
# Houdini vex rotate object

```c
//Calculate the angle, from no rotation (angle = 0) to one rotation (angle = 2 * PI).
//I've added ONE to the max frame so that the loop is seamless.
float angle = fit(@Frame, $RFSTART, $RFEND + 1, 0, 2 * PI);
float lP = length(@P);

@P.x = sin(angle);
@P.z = cos(angle);

//Restore the original offset.
@P *= lP;
```

---

# Golden Ratio Tower

![[notes/attachments/Pasted image 20230207155938.png]]

Below is each wrangles code in order according to the screenshot:

```c
float sweep_angle = chf('Sweep_Angle');
float growth_factor = chf('Growth_Factor');
float height = chf('Height');
int npoints = chi('Number_of_Points');

addattrib(0, "detail", "original_npoints", npoints);

float TWO_DIVIDED_BY_PI = 2.0/3.14159265359;

vector pos;
float radius;
float step_angle = sweep_angle / float(npoints-1);
float step_height = height / float(npoints-1);
float curr_angle;
for (int i=0; i<npoints; ++i) {
    curr_angle = step_angle * float(i);
    radius = pow(growth_factor, curr_angle * TWO_DIVIDED_BY_PI);

    pos.x = sin(curr_angle) * radius;
    pos.y = height - (step_height * i);
    pos.z = cos(curr_angle) * radius;

    addpoint(0, pos);
}
```

```c
vector origin = {0, 0, 0};

origin.y = @P.y;

float step_width = chf("Step_Width");

vector pos = ((1.0 - step_width) * @P) + (step_width * origin);

addpoint(0, pos);
```

```c
vector pos = @P;

pos.y = 0.0;

addpoint(0, pos);
```

```c
int success;
int original_npoints = getattrib(0, "detail", "original_npoints", 0, success);
int neighbor = @ptnum + 1;

if (neighbor < original_npoints) {
    int poly = addprim(0, 'poly');
    addvertex(0, poly, @ptnum);
    addvertex(0, poly, @ptnum + original_npoints);
    addvertex(0, poly, neighbor + original_npoints);
    addvertex(0, poly, neighbor);
    
    int poly_lside = addprim(0, 'poly');
    addvertex(0, poly_lside, neighbor);
    addvertex(0, poly_lside, neighbor + 2*original_npoints);
    addvertex(0, poly_lside, @ptnum + 2*original_npoints);
    addvertex(0, poly_lside, @ptnum);

    int poly_rside = addprim(0, 'poly');
    addvertex(0, poly_rside, @ptnum + original_npoints);
    addvertex(0, poly_rside, @ptnum + 3*original_npoints);
    addvertex(0, poly_rside, neighbor + 3*original_npoints);
    addvertex(0, poly_rside, neighbor + original_npoints);
    
    int poly_bside = addprim(0, 'poly');
    addvertex(0, poly_bside, @ptnum + 3*original_npoints);
    addvertex(0, poly_bside, @ptnum + 2*original_npoints);
    addvertex(0, poly_bside, neighbor + 2*original_npoints);
    addvertex(0, poly_bside, neighbor + 3*original_npoints);

}
```


---

# Houdini vex prep bricks

```c
float wallHeight = chf("heightmax") - chf("heightmin"); // total wall height
float brickHeight = wallHeight / chf("heightdiv"); // how tall individual brick is
float wallAdjustedHeight = wallHeight - brickHeight; // subtracting one brick from height

float shiftHeight = v@P.y - chf("heightmin") - (brickHeight / 2); // Shifting height values to start at 0
float normHeight = shiftHeight / wallAdjustedHeight; // Finding proportion of height
i@normHeight = int(rint(fit(normHeight, 0, 1, 0, chf("heightdiv")-1)));
```

---

# 2D fractal on a grid

```c
//--- function def ---//

function int Mandel(float x0,y0,z0; int imax){
    float x, y, z, xnew, ynew, znew, n=8, r, theta, phi;
    int i;
    
    x = x0;
    y = y0;
    z = z0;
    
    for(i=0; i<imax; i++){
        //xnew = x*x - y*y + x0;
        //ynew = 2 * x * y + y0;
        
        r = sqrt(x*x + y*y + z*z);
        theta = atan2(sqrt(x*x + y*y) , z);
        phi = atan2(y,x);
        
        xnew = pow(r,n) * sin(theta*n) * cos(phi*n) + x0;
        ynew = pow(r,n) * sin(theta*n) * sin(phi*n) + y0;
        znew = pow(r,n) * cos(theta*n) + z0;
        
        
        if(xnew*xnew + ynew*ynew + znew*znew > 8){
            return(i);
        }
        
        x = xnew;
        y = ynew;
        z = znew;
    }
    return(imax);
}


//--- Main ---//

int maxiter = 6;

if(Mandel(@P.x, @P.y, @P.z, maxiter) < maxiter){
    v@Cd = set(1,1,1);
} else {
    v@Cd = set(0,0,0);
}
```


---

# 3D fractal from volume

```c
//--- function def ---//

function int Mandel(float x0,y0,z0; int imax){
    float x, y, z, xnew, ynew, znew, n=8, r, theta, phi;
    int i;
    
    x = x0;
    y = y0;
    z = z0;
    
    for(i=0; i<imax; i++){
        //xnew = x*x - y*y + x0;
        //ynew = 2 * x * y + y0;
        
        r = sqrt(x*x + y*y + z*z);
        theta = atan2(sqrt(x*x + y*y) , z);
        phi = atan2(y,x);
        
        xnew = pow(r,n) * sin(theta*n) * cos(phi*n) + x0;
        ynew = pow(r,n) * sin(theta*n) * sin(phi*n) + y0;
        znew = pow(r,n) * cos(theta*n) + z0;
        
        
        if(xnew*xnew + ynew*ynew + znew*znew > 8){
            return(i);
        }
        
        x = xnew;
        y = ynew;
        z = znew;
    }
    return(imax);
}




//--- Main ---//

int maxiter = 8;

if(Mandel(@P.x, @P.y, @P.z, maxiter) < maxiter){
    @density = 0.0;
    v@Cd = set(1,1,1);
} else {
    @density = 1.0;
    v@Cd = set(0,0,0);
}
```

---

# Copy Fractal

![[notes/attachments/Pasted image 20230207161515.png]]

in *transform1* put the following code in *universal transform*

```c
pow(0.4, (detail("../repeat_begin1_metadata1/", "iteration", 0) + 1))
```

---

# Calculating Light angle in vex wrangle

```c
vector dir = normalize( point(1, 'P', 0) - v@P );

float angle = dot(dir, v@N);
angle = clamp(angle, 0.0, 1.0);

v@Cd = vector(angle);
```

---

# Lsystem snowflake

![[notes/attachments/Pasted image 20230207161820.png]]

![[notes/attachments/Pasted image 20230207161840.png]]


![[notes/attachments/Pasted image 20230207161927.png]]

![[notes/attachments/Pasted image 20230207161941.png]]


---

# Modular Arithmatic Vex

![[notes/attachments/Pasted image 20230207162053.png]]

![[notes/attachments/Pasted image 20230207162149.png]]

```c
int prim = addprim(0, "polyline");
addvertex(0, prim, @ptnum);
addvertex(0, prim, @ptnum * `chs("../mult")`);
```

in the *copy to points* put the following in the *total copies* field:

```c
ch("../mult")
```

---

# Golden Ration Sunflower Vex Houdini

```c
int total = chi("total");
float pointiness = ch("pointiness");
float angle = chf("angle");
float eval = ch("eval");

float x,y,z;

for (int i=0; i < total; i++) {
    x = eval * sqrt(i) * sin(radians(100*angle * i));
    y = eval * sqrt(i) * cos(radians(100*angle * i));
    z = eval * sqrt(i) * sin(radians(pointiness * i));
    
    v@loc = set(x,y,z);
    addpoint(geoself(),v@loc);
}
```


---


# Find Borders Vex

```c
int neighs[] = neighbours(0, @ptnum);

if(len(neighs)<5)
{
    setpointattrib(geoself(), "Cd", @ptnum, {0,0,0}, "set");
    //setpointgroup(0, "border", @ptnum, 1, "set");
}
```

![[notes/attachments/Pasted image 20230207163516.png]]

## Attribute Falloff

```c
int handle = pcopen(0, "P", @P, chf("Radius"), chf("MaxPoints"));

while(pciterate(handle)>0)
{
    int curPntNum;
    pcimport(handle, "point.number", curPntNum);
    setpointattrib(geoself(), "Cd", curPntNum, {0,0,0}, "set");
}
```

`@P.y += @Cd.r;` => raise geo

![[notes/attachments/Pasted image 20230207163620.png]]


---

# Houdini Vex Spiral

```c
int pntcnt = chi("pointcount");
float rad = ch("radius");
float length = ch("length");
float revolutions = ch("revolutions");
int strandcount = chi("strandcount");

float step = revolutions*2*PI/pntcnt;
float lenstep = length/(pntcnt-1);
float strandstep = 2*PI/strandcount;

for(int j = 0; j < strandcount; j++)
{
    int nprim = addprim(0,"polyline");
    for(int i = 0; i < pntcnt; i++)
    {
        vector pos = set(cos(i*step+j*strandstep)*rad,sin(i*step+j*strandstep)*rad,i*lenstep);
        int npnt = addpoint(0, pos);
        addvertex(0,nprim,npnt);
    }

}
```

---

# Houdini Vex Create Circle

```c
int pntcnt = chi("pointcount");
float rad = ch("radius");
float step = 2*PI/pntcnt;


for(int i = 0; i < pntcnt; i++)
{
    vector pos = set(cos(i*step)*rad,sin(i*step)*rad,0);
    addpoint(0, pos);
}
```

---

# Houdini Labs mapbox

![[notes/attachments/Pasted image 20230207165400.png]]

![[notes/attachments/Pasted image 20230207165452.png]]

---

# Advect on surface

![[notes/attachments/Pasted image 20230207165648.png]]

![[notes/attachments/Pasted image 20230207165653.png]]

atribvop1:

![[notes/attachments/Pasted image 20230207165724.png]]

attribvop2

![[notes/attachments/Pasted image 20230207165746.png]]

DOP:

![[notes/attachments/Pasted image 20230207165834.png]]

wrangle1:

```c
v@oCd = point(1, "Cd", @ptnum);
f@oPscale = point(1, "pscale", @ptnum);
```

wrangle2:

```c
v@Cd = point(1, "oCd", @ptnum);
f@pscale = point(1, "oPscale", @ptnum);
```


---

# Vex add point to center of faces

```c
{

    int newpt = addpoint(0,v@P);
    setpointgroup(0,"new",newpt,1);
    setpointattrib(0,"N",newpt,v@N);
    
    int npts[] = primpoints(0, @primnum);
    
    vector pos1 = point(0,"P", npts[0]);
    vector pos2 = point(0,"P", npts[1]);
    
    vector up = normalize(pos2 - pos1);
    //setpointattrib(0,"up",newpt,v@N);
    setpointattrib(0,"up",newpt,up);
    
    float avgdist = 0.0;
    
    // loop through above list of points
    foreach(int npt; npts)
    {
        vector nppos = point(0, "P", npt);
        float mydist = distance(v@P, nppos);
        avgdist += mydist;
    }
    
    float n = len(npts);
    avgdist /= n;
    f@pscale = avgdist;
    
    setpointattrib(0,"N",newpt,v@N);
    setpointattrib(0,"pscale",newpt,avgdist);
}
```

Lift points off surface

```c
v@rest = v@P;
v@P += v@N * (f@pscale * 0.5);
//v@P += v@N;
```


```c
float rad = chf("Search_Radius");

//look for single point and check radius
// this will stop overlapping geo

int npts[] = nearpoints(0,v@P,rad,2);
removeindex(npts,0);
int no = len(npts);

if(no > 0 && @ptnum > npts[0])
{
    v@P = v@rest - (v@N * chf("Offset") * f@pscale);
}
else
{
    v@P = v@rest;
}
```


```c
// Adds a point at the position of each prim
addpoint(0, @P);
// Remove primitive and all points connected to it
removeprim(0, @primnum, 1);
```


---

# Vex random variants

```c
i@variant = rand(@ptnum + chf("Seed")) * 2;
```


---

# Houdini Scale Setup

![[notes/attachments/Pasted image 20230207172259.png]]

```c
int columns = chi("../PARMS/columns") * 2;
i@group_center = @ptnum % 2 == ((@ptnum % (columns * 2)) / columns);
```


```c
int columns = chi("../PARMS/columns") * 2;
int prim = addprim(0, "poly",
                    @ptnum - columns,
                    @ptnum + 1 - ((@ptnum + 1) % columns == 0) * columns,
                    @ptnum + columns,
                    @ptnum - 1 + (@ptnum % columns == 0) * columns);
setprimattrib(0, "center", prim, @P);
setprimattrib(0, "tangentu", prim, v@tangentu); 
removepoint(0, @ptnum);
```


```c
vector cross = cross(v@tangentu, @N);
3@rot = ident();
rotate(@rot, radians(ch("amount")), cross);
```


```c
int prim = pointprims(0, @ptnum)[0];
vector center = prim(0, "center", prim);
matrix3 rotation = prim(0, "rot", prim);
@P -= center;
@P *= rotation;
@P += center;
```


---

# Orient Along Curves Polyframe

![[notes/attachments/Pasted image 20230207180605.png]]


---

# Houdini add first and last point to group


```c
0 `npoints(0)-1`
```

---

# Houdini correct normals

[Reversing & Correcting Normals in Houdini Pt. 4/4 – Correcting Primitive Normals - YouTube](https://www.youtube.com/watch?v=ICZv_u65hH8)



---

# Centroid of Prims

using `v@P` in a *prim wrangle* returns the centroid


---

# Groups to Attributes Vex

```c
string groups[] = detailintrinsic(0,'top');
foreach(string g; groups)
{
    if(inpointgroup(0,g,@ptnum)==1)
    {
        s@top = g;
    }

}
```

