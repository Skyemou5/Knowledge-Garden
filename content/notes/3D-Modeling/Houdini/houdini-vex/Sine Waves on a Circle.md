---
title: Sine Waves on a Circle
tags:
  - houdini
  - math
  - procedural
---


```c
// Parameters to control the shape and randomness
float frequency = chf("frequency");
float minAmplitude = chf("min_amplitude");
float maxAmplitude = chf("max_amplitude");
int smoothingPoints = chi("smoothing_points"); // The number of points to include in the smoothing operation

// Iterate over each point
for (int pt = 0; pt < @numpt; pt++) {
    vector pos = point(0, "P", pt);
    float angle = atan2(pos.y, pos.x);
    
    // Apply random amplitude to the base sine wave
    float amplitude = fit01(rand(pt), minAmplitude, maxAmplitude);
    float sineValue = amplitude * sin(frequency * angle);
    
    // Calculate smoothed value by averaging a set number of nearby points
    float smoothedSine = 0.0;
    int count = 0;
    for (int i = -smoothingPoints; i <= smoothingPoints; i++) {
        int neigh_pt = (pt + i + @numpt) % @numpt; // Wrap around the circle
        vector neigh_pos = point(0, "P", neigh_pt);
        float neigh_angle = atan2(neigh_pos.y, neigh_pos.x);
        smoothedSine += sin(frequency * neigh_angle);
        count++;
    }
    smoothedSine /= count;
    
    // High-pass filter effect: original - smoothed
    float highPassValue = sineValue - smoothedSine;
    
    // Apply the deformation
    pos.y += highPassValue;
    setpointattrib(0, "P", pt, pos, "set");
}

```


