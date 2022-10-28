[Bad shading](https://www.youtube.com/watch?v=qB1eg3ef5vs)

### Agenda
- Intro
	- this weekend
- Assignments
	- pain points
		- applying modifiers
		- overlapped geo
		- [Pureref](https://www.pureref.com/)
	- questions
	- some demonstrations
		- advanced selection
			- ring vs lo1op
- Topology
	- Important tools
		- dissolve vs delete
		- knife tool
		- slide
		- loop tools
		- 
	- >focus on film<
	- problems
		- non-manifold geo
			- one edge is shared by only one polygon *or* more than two
			- 3D-Print addon
				- analyze geo for non-manifold meshes
				- >*N-Panel* for addon options
				- [Mesh Check addon](https://pistiwique.gumroad.com/l/mesh_check_BGL_edition)
					- ![[notes/attachments/Pasted image 20220907102651.png]]
	- Edge flow
	- bevels ![[notes/attachments/Pasted image 20220907091048.png]]
		- everything is beveled in the real world
		- modifier vs the tool
		- levels of bevels
		- angles
		- stick with even numbers
			- corners!
			- outer to arc
	- Water-tight geo
		- bevels
		- *3D printing*
	- subdivision
		- methodology
			- don't rely on it
				- except sometimes in the beginning if you are smoothing you're shapes out
			- the point is for high-res models just for render times
				- every level is x4 geo
		- try and keep you're quads square as much as you can
			- for sculpt ready models
			- multi-res
	- sculpting for hard surface
		- imperfections
		- baking normals to low res
			- displacement vs normal
				- displacements -> shadows
				- normals no shadows
	- Shading
		- artifacts
		- normals
			- direction
				- overlay
					- *create shorcut* ![[notes/attachments/Pasted image 20220907104801.png]]
			- artifacts
			- ! Auto-smooth
				- normal angle
	- UVs
		- distortion

---

### Film Industry Modeling Checklist 
1. Keep geo as light as possible
2. only use quads if possible
3. even distribution of the polygons
4. bevel everything
5. freeze transformations
6. use as few parts as possible
7. make the geometry water tight
8. remove all non-manifold polygons
9. make geometry sculptable
10. no overlapping UVs, *use UDIMS*
11. check the normals (*for shading artifacts*)
12. Naming conventions

>[!NOTE] These are guidelines
>
>They can be broken but it's important to understand them first so you know when you have an edge-case where you can bend the rules

---
### Misc blender tips
- SHIFT+r => repeat last action
- SHIFT+SPACE => toolshelf
- CNTRL+ALT => ring select
- F3 => Operator search


---

### Resources

[Blender bob - modeling for VFX](https://www.youtube.com/watch?v=Nt2d0byHIPQ&list=PLg8eRfEI_iOmMe1IwoZVcj8spkr7T5Hue)

[Blender bob - Advanced Modeling techniques in Blender](https://www.youtube.com/watch?v=k7_V4sfsdwg&list=PLg8eRfEI_iOlbfEJXKp0_B-CVkbp1kSPm)

[Edge flow addon for Blender](https://github.com/BenjaminSauder/EdgeFlow/releases/tag/0.5)

[Mesh Check addon](https://pistiwique.gumroad.com/l/mesh_check_BGL_edition)


---

### Assignments

>[!NOTE] These Should be in blender

Exercises
- modeling techniques for topology
	- bevels
	- creating more geometry
- Fixing meshes
	- non-manifold faces
	- overlapping mesh
	- finding hidden problems
	- shading errors