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


v2:

```c
// Base amplitude and frequency
float baseAmplitude = chf("amplitude");
float baseFrequency = chf("frequency");

// Randomness sliders for frequency and amplitude
float frequencyRandomness = chf("frequency_randomness");
float amplitudeNoiseScale = chf("amplitude_noise_scale");
float amplitudeChangeRate = chf("amplitude_change_rate");

// Use @Time to get a smoother phase animation with sub-frame precision
float phaseShift = chf("phase_shift") + @Time * chf("phase_shift_rate");

// Phase stretching parameters
float phaseStretch = chf("phase_stretch");
float phaseRandomness = chf("phase_randomness");

// Taper distance parameter
float taperDistance = chf("taper_distance");

// Mirror plane axis parameter - this should be a unit vector
vector mirrorAxis = normalize(chv("mirror_axis"));

// Determine the number of points and initialize path length
int numPoints = @numpt;
float pathLength = 0;

// Calculate the total path length
for (int i = 1; i < numPoints; i++) {
    vector pos0 = point(0, "P", i - 1);
    vector pos1 = point(0, "P", i);
    pathLength += distance(pos0, pos1);
}

// Add the distance from the last point to the first to close the circle
vector posLast = point(0, "P", numPoints - 1);
vector posFirst = point(0, "P", 0);
pathLength += distance(posLast, posFirst);

// Apply the sine deformation with varying amplitude along the path
for (int pt = 0; pt < numPoints; pt++) {
    vector pos = point(0, "P", pt);
    float traveled = 0;

    // Calculate the distance traveled along the path up to this point
    for (int i = 1; i <= pt; i++) {
        vector pos0 = point(0, "P", i - 1);
        vector pos1 = point(0, "P", i);
        traveled += distance(pos0, pos1);
    }

    // Normalize the traveled distance
    float normalizedTraveled = traveled / pathLength;

    // Calculate noise values for amplitude and frequency
    float amplitudeNoise = noise(normalizedTraveled * amplitudeChangeRate) * amplitudeNoiseScale;
    float freqNoise = noise(pt * 654.321); // A different seed multiplier for frequency
    float randomFrequency = baseFrequency + freqNoise * frequencyRandomness;

    // Stretch and randomize the phase using noise
    float stretchNoise = noise(normalizedTraveled * phaseRandomness);
    float stretchedFrequency = randomFrequency * (1 + stretchNoise * phaseStretch);

    // Random amplitude is base amplitude plus noise influence
    float randomAmplitude = baseAmplitude + amplitudeNoise;

    // Calculate the sine value with random frequency and phase shift
    float sineValue = randomAmplitude * sin((normalizedTraveled * stretchedFrequency * 2 * PI) + phaseShift);

    // Calculate distance to the mirror plane
    float distanceToPlane = abs(dot(pos - @P[0], mirrorAxis));

    // Taper factor based on distance to the mirror plane
    float taperFactor = 1.0;
    if (distanceToPlane < taperDistance) {
        taperFactor = pow((taperDistance - distanceToPlane) / taperDistance, 2);
    }

    // Apply deformation with tapering
    vector normal = {0, 1, 0}; // Assuming Y is up
    pos += normal * sineValue * taperFactor;

    // Set the point position with the new deformed position
    setpointattrib(0, "P", pt, pos, "set");
}

```

