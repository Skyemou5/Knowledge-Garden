---
title: "Documentation in Rust"
tags: [rust programming]
---


# Documentation

use the command 
cargo doc --no-deps --open
the extra stuff only generates docs for your code.

links are wikilinks adding backticks makes it formatted different.
you can use standard like formats too \[\]()
with a relative or absolute path if not in scope

there are also inner code documentation comments

```
//! inner
/*! !*/ inner block
/// outer
/** **/ outer block
```

user inner for libraries and modules, everything else use outer.