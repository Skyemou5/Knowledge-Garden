---
title: "Blender Course Home"
tags: [blender, course, uvu, index, hub, home]
---

# 3D for 2D Pipelines using Blender

## Objectives
Students will be able to create a 3D asset and integrate into a 2D scene using shading, texturing, lighting, and compositing and render a final image.

## Timeline

- CG Fundimentals
- Modeling Fundimentals
	- What is CG
	- Topology
	- fixing mesh problems.
	- Blender Basics
- Modeling 


---

# Lessons

- **Lesson 1: (Aug/28)** Intro to 3D and Blender
	- *Mon:* Intro to Blender and navigating blender
		- [[notes/3D-Modeling/blender/Lessons/Navigation In Blender|Navigation In Blender|Navigation in Blender]]
		- [[notes/3D-Modeling/blender/assignments/Blender Chess Piece Assignment|Blender Chess Piece Assignment|Chess Piece Assignment]]
		- [[notes/3D-Modeling/blender/Lessons/Blender Hotkeys Cheatsheet|Blender Hotkeys Cheatsheet]]
	- *Wed:* Intro to modeling styles and modifiers
		- [[notes/3D-Modeling/blender/Lessons/Modeling Techniques|Modeling Techniques]]
		- [[notes/3D-Modeling/blender/Lessons/Modifiers in Blender|Modifiers in Blender]]
		- 
- **Lesson 2:(Sept/04)** 
	- *Mon:* Intro to topology
		- [[notes/3D-Modeling/blender/Lessons/Intro to topology|Intro to topology]]
		- [[notes/3D-Modeling/blender/assignments/Topology in CG Lesson|Topology in CG Lesson]]
		- [[notes/3D-Modeling/blender/assignments/topology/Topology-Assignment-Instructions|Topology-Assignment-Instructions]]
	- *Wed:* 
- **Lesson 3:(Sept/11)**
	- *Mon:* Intro to mesh problems
	- *Wed:*
- **Lesson 4: UVs Basics (Sept/18)**	
	- *Mon:* UV Basics	
	- *Wed:* UV Advanced	
- **Lesson 5: Final Project & Project Management (Sept/25)**
	- *Mon:* Final Project Review	
	- *Wed:* Project Management	
- **Lesson 6: Surfaces (Oct/02)**	
	- *Mon:* Surfaces basics	
	- *Wed:* Surfaces Adv	
- **Lesson 7: Textures (Oct/09)**	
	- *Mon:* Part 1	
	- *Wed:*  Part 2	
- **Lesson 8: Lighting & LookDev (Oct/16)**
	- *Mon:* Lighting	
	- *Wed:*  LookDev	
- **Lesson 9: Rendering (Oct/23)**	
	- *Mon:* Real Time Rendering
	- *Wed:*  Raster Rendering
- **Lesson 10: Compositing (Oct/30)**
	- *Mon:* Part 1 (HALLOWEEN)
	- *Wed:*  Part 2
- **Lesson 11: Rigging (Nov/06)**
	- *Mon:*
	- *Wed:*  Part 2
- **Lesson 12: Animating (Nov/13)**
	- *Mon:* Part 1
	- *Wed:*  Part 2
- **Lesson 13: Advanced 3D (Nov/20)**
	- *Mon:* Houdini
	- *Wed:*  Houdini
- **Lesson 14: example (Nov/28) - Thanksgiving**
- **Lesson 15: example (Dec/05) - Study Hall**
- **Final Project: due (Dec/16)**


---



# Potential Topics

- How CG is used
	- Games
	- Film
	- Advertising
	- Motion Graphics
	- Research
	- Simulation
	- general art
- understanding coordinate spaces [[coordinate systems]]
	-  global 
	-  local
	-  tangent
- Understanding Geometry under the hood
	- applied mathematics
		- it's *not* continuous, instead, in CG the math is **Discrete**
		- Types of maths
			- linear algebra
				- geometric algebra
			- calculus
			- *be aware* of some general computer science
				- big **O**
				- design patterns --- how those relate
				- sorting
				- data processing
				- algorthms
				- **geometry processing**
	- The aspects of geometry
		- points
		- edges
		- faces
		- normals/surfaces
			- winding
- Modeling
	- standard modeling practices *software agnostic*
		- box modeling
		- boolean
		- procedural
		- sculpting
	- UVs
		- talk about attributes or data attached to geometry
		- another talk on coordinate spaces
			- UVs are a 3d -> 2d coordinate transform per point relative to the ?tangent? *double check this*
		- talk about planning modeling once you understand UVs
	- Other general modeling concepts
		- Speed & efficiency
			- try not to repeat tasks
			- plan ahead
			- manage files
				- version control
				- naming conventions
				- organization
		- topology and why https://topologyguides.com/
			- edge flow
				- redirecting
				- planning
			- loops
				- edge
				- vertex/point
				- face
			- poles
				- moving poles
			- optimizing
				- edge loop reduction
			- bevels
				- workflows from CAD like programs
					- chamfer
					- etc
			- creating holes
		- Subdiv workflow
			- your mesh should look good before the subdiv
			- games
				- apply and optimize
			- film
				- apply subdiv on render
		- Mesh Decals
			- different per software
				- attack objects to another object seamlessly
		- Groups
			- selection
			- point/vertex/edge/face
			- attribute
		- Normals
			- setting them
				- procedurally setting them
			- fixing normal glitches
		- Separating meshes
			- for less topology
			- creating holes
			- pros/cons
				- edge loops
				- UVs
		- Joining meshes
			- planning edge flow
			- using merge tools
		- Special modeling workflows
			- start with plane
				- curve it procedurally
				- thickness procedurally
		- A short introduction to curves in 3D
			- photoshop vs illustrator analogy
			- why they are still important tools
			- what types of work are they often used for
			- simple curves
			- nurbs (curved surfaces)
	- Blender Modeling
		- Projects for learning
			- hard surface
			- organic
		- modeling using modifiers
- Animation
	- Simple Animation
		- object
		- vertex
		- coordinate space
	- Rigging
		- simple rig
	- create an *animatic*
- Surfacing
	- Shading
		- shader fundimentals
			- buffers
			- object data
			- scene data
			- coordinate space review
			- noises
			- casting data
				- vectors to color
				- color as vectors
	- Texturing
		- UVs and how that relates to texturing
		- Projecting UVs
		- creating UVs
		- manipulating UVs
		- hooking up textures to shader
		- File management
	- PBR
		- history
		- why
	- NPR
		- why
		- use cases
		- fun
- Lighting
	- principles
	- types of common CG lights
	- relation to film/photography
	- general ways of lighting scenes
		- tri light studio lighting
		- sun lighting
		- space lighting
		- custom
			- NPR
			- per scene needs
		- mesh lights/emission 
		- HDR
			- procedural
			- texture based
			- differences between to touch on in rendering
				- raster
					- often need to place a sun light where the sun is in the HDR
				- path traced
- Cameras
	- Real cameras
		- iso
		- focal length
		- etc
	- How CG cameras often emulate real cameras
		- what that means for us
		- how to get to look you want
		- framing your scene
		- how CG cameras work
			- coordinate space
			- important part of going from 3D modeling to an image on your screen
			- buffers
			- rays
- Lookdev
	- Industry pipelines
		- how it's done
		- why it's done
		- lookdev panel
			- reflective
			- mat
			- colorstrip
	- How we can do it in blender
		- World shading
			- HDR
			- procedural sky
		- lookdev panel
- Rendering
	- This is where it all comes together
	- industry film pipeline
		- render times
		- render budgets
		- the future of rendering
			- good old path tracing isn't going anywhere soon for many reasons
	- Types of renderers
		- General Rendering theory
			- buffers
			- pixels
			- drawing a triangle
			- touch on technologies
				- opengle
				- directx
				- vulcan
				- etc
		- Path traced
			- tries to be a true as possible to how light works
				- light transport research, physics and computer science have come together to make these renderers possible.
				- these renderers will get you as close as possible to real life images if that's what you want.
				- how they work
					- lights
					- cameras
					- ray bounces
		- Raster
			- raytraced raster
				- new technology
				- still not as good as pathtracing
			- realism has to be faked
				- many effects like reflection are only calculated in screen space unless reflection maps are used
				- small details often need to be offloaded to normal maps
					- in film workflows much of the small details is allowed to be geometry
		- CG rendering theory
			- things to keep in mind
				- not all render engines are the same
					- actually they are all a little different
				- some settings may be named differently
				- **the underlying theory is the same
			- samples
				- what are they
				- why do we need to understand them
				- samples per types of rendering
					- reflection
					- diffuse
					- etc
			- CPU x GPU
				- general differences and why GPUs are cool
			- Tiles/buckets
				- tiles that are rendered
			- progressive rendering
			- raster rendering
			- Denoising
				- saving time
				- *touch on compositing*
				- new tech
			- motion blur
			- color management
				- ACES
					- https://chrisbrejon.com/cg-cinematography/chapter-1-5-academy-color-encoding-system-aces/
					- OCIO
						- Lego Movie
					- filmic
			- Renderer post effects
				- bloom
				- color
				- etc
				- A quick solution mostly for look-dev
			- Rendering in VFX
				- matching source film
					- motion blur - camera
				- matching film color space
- Compositing
	- what is compositing?
	- why is important?
	- Compositing in film
		- nuke as industry standard
	- planning your shot with compositing in mind from the beginning
		- how that can save time
	- Compositing for CG
		- render passes
		- cryptomates
		- piecing separate renders together
			- background
			- character
			- VFX
- A few last things
	- audio
		- audio reactive work
		- film work has audio
		- it may be helpful in some cases to keep audio in mind when working.
