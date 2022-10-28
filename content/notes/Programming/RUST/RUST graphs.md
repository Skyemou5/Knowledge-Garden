---
tags: [rust programming graph-theory]
title: "Graphs in Rust"
---


# Rust Graphs

https://www.youtube.com/watch?v=3DLrUNbKhjQ

```rust
use std::collections::HashMap;

  

////

/// VId = vertex ID

/// E = Edge

/// V = Vertex

/// Adjacency = edges

pub struct Graph<VId, E = (), V = ()> {

vertices: HashMap<VId, V>,

adjacency: HashMap<VId, Vec<(VId, E)>>,

}

  
  

impl<VId, E, V> Graph<VId, E, V>

where

VId: Eq + Hash,

V: Hash,

{

pub fn new() -> Graph<VId, E, V> {

Graph { vertices: HashMap::new(), adjacency: HashMap::new() }

}

pub fn push_vertex(se;f: &mut Graph<VId, E, V>, vid: VId, vertex: V) {

self.vertices.insert(vid,vertex);

}

pub fn push_edge(self: &mut Self, from: VId, to: VId, edge: E) {

let adjacent_to_from = self.adjacency.entry(from).or_default();

adjacent_to_from.push((to, edge));

}

}

  

// pub trait Simple_Graph<VId,E,()> {

// where

// VId: Eq + Hash,

// {

// pub fn push_vid(self: &mut Self, vid: VId) {

// self.vertices.insert(vid, ());

// }

// }

// }

  

/// MAZE

  

Graph<VId = &str, E = Direction> {

vertices: {

"A": (),

"B": (),

"C": (),

"D": (),

},

adjacency: {

"A": [("B", Right)],

"B": [("E", Down)],

},

}
```

https://www.youtube.com/watch?v=UEAg4qCALb8 mazes

https://www.youtube.com/watch?v=q6paRBbLgNw

