---
title: "Catenary Curves Houdini Vex"
tags:[houdini,math,curve, vex]
---



```vex
#include <math.h>

void
getFrameOfReference(vector Z, X, Y)
{
    Y = {0,1,0};
    if (abs(dot(Z, Y)) == 1)
        Y = {1,0,0};
    X = normalize(cross(Y, Z));
    Y = cross(Z, X);
}

// Used for slope calculation
#define DELTA   0.001

vector
getNoise(float tt; vector nscale; float nfreq, noff, ntime, nclamp0, nclamp1;
                vector up, side)
{
    vector      nval;
    nval = nscale * (vector(noise(tt*nfreq + noff, ntime)) - .5);
    nval *= smooth(0.0, nclamp0, tt);
    nval *= 1.0-smooth(nclamp1, 1.0, tt);
    return nval.y*up + nval.x*side;
}

sop
springy(vector gravity={0,-1,0}; float stretch=1; float camp=0, cperiod=20;
            vector nscale=0; float nfreq=4, noff=0, ntime=0;
            float nclamp0=.25, nclamp1=.75)
{
    vector      p0, p1, P1;
    vector      u0, u1;
    vector      g;
    float       ss, t0, t1;
    float       cat0, cat1;
    vector      axis;
    vector      up, side;

    if (!import("P", p0, 1, 0)) p0 = 0;
    if (!import("P", p1, 1, 1)) p1 = 0;
    if (!import("up", u0, 1, 0)) u0 = {0,1,0};
    if (!import("up", u1, 1, 1)) u1 = {0,1,0};

    t0 = (float)ptnum / (float)Npt;
    if (t0 > 0.5)
         t1 = t0 + DELTA;
    else t1 = t0 - DELTA;

    // Compute catenary displacement
    g = normalize(gravity);
    cat0 = stretch*((exp(t0-.5) + exp(-t0+.5)) - (exp(0.5) + exp(-.5)));
    cat1 = stretch*((exp(t1-.5) + exp(-t1+.5)) - (exp(0.5) + exp(-.5)));
    P  = lerp(p0, p1, t0) - cat0*g;
    P1 = lerp(p0, p1, t1) - cat1*g;
    if (length2(nscale) > 0)
    {
        if (t0 > 0.5)
             axis = P1 - P;
        else axis = P - P1;
        getFrameOfReference(normalize(axis), up, side);
        P  += getNoise(t0, nscale, nfreq, noff, ntime, nclamp0, nclamp1,
                            up, side);
        P1 += getNoise(t0, nscale, nfreq, noff, ntime, nclamp0, nclamp1,
                            up, side);
    }
    if (camp != 0)
    {
        if (t0 > 0.5)
             axis = P1 - P;
        else axis = P - P1;
        getFrameOfReference(normalize(axis), up, side);

        ss = (2.0*M_PI)*cperiod*t0;
        P += camp * sin(ss) * side;
        P += camp * cos(ss) * up;
    }
}


```