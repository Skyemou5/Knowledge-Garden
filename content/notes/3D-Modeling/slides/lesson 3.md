# Lesson 3
---

#### Agenda
- Syllabus updates
- course moving forward
	- assignments
	- excercizes
	- quizes
- explain confusion and lack of direction
	- it will change going forward
- questions
- lesson 3
	- specific modeling techniques
		- edge flow
		- booleans
		- correcting mistakes
	- assignment
		- correcting mistake
		- model a piece of a prop

---
### Accommodation
- Please let me know so that I don't miss it
- I worked at the autism center 
- I have ADHD and dyscalculia and probably autism

---
### How to screen record
- OBS
- setting up sources
- please get a camera and microphone!


---
### Additional Thoughts
- Keep working hard
- Don't compare yourself to your peers too much
	- Instead stay focused on what people are doing in industry

---
### Project Management
- File structure
- naming conventions
- turning assignments in
	- follow instructions
	- the instructions are there for a reason
		- there are a lot of you
- version control
	- git
	- other
- pipelines
	- pipeline tools
	- https://prism-pipeline.com/
	- deadline - renderfarm tool
	- shotgun - industry standard pipeline tool https://www.shotgridsoftware.com/
	- https://www.ftrack.com/en/
	- https://nim-labs.com/
	- https://www.toonboom.com/products/producer
	- https://www.cg-wire.com/
	- custom tooling
		- python
		- lua
		- shell scripting

>go over git

---
### Documentation
- know where it is
- read it!

---

### Blender fundamentals

> Why blender can help you be faster and more efficient than Maya for 3D modeling

- UI
	- viewport
		- n-panel
	- outliner
	- properties window
	- stats
		- ![](notes/attachments/Pasted%20image%2020220831100703.png)
		- ![](notes/attachments/Pasted%20image%2020220831100741.png)
- navigation
	- orbiting view
	- ortho/perspective
	- local view
	- focus
		- middle click
		- period
- modeling
	- gizmos
	- object mode
	- edit mode
		- mesh components
		- tools
		- modifiers!
			- methodology
			- proceduralism
	- sculpt mode
	- paint mode
- Shorcuts!
	- importance!
		- speed
		- efficiency
	- repeat last action


---
### Topology

> Can be important for surfacing

- Localizing topology
- avoid unnecessary topology


![](notes/attachments/Pasted%20image%2020220831100126.png)
![](notes/attachments/Pasted%20image%2020220831100155.png)

### Cleaning up ngons and triangles
This can be important for edge flow and deformations

![](notes/attachments/Pasted%20image%2020220831101411.png)

### Edge Flow
even distribution of edges

- remove dead edges
- Use matcaps
- edges should add to the form of your object

### Holding Edges and faceloops
- holding edges
	- especially for subd
	- bevels
		- in maya press 3
- check your faceloops
- don't rely on subd for your form

### Caveats
- ngons and tris can be ok for certain situations
	- they should usually be deliberate and exceptions

### Practice
- retopo
	- start with edge and face loops first

### Workflows
1. reference
2. curve guides
3. blockout
4. edge flow
5. retopo
6. detail

---

### Homework

- modeling exercises
	- take a single polygon and start with one face and end with 4
	- create bevel and chamfer with holding edges for a subd workflow
	- fixing bad mesh
- create a simple prop
	- I will give you some images of a simple prop
	- I want a good attempt.
	- think of this as a sketchbook