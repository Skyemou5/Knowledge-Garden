---
title: "Semantic Versioning in Rust"
tags: [programming rust]
---

# semantic versioning

x.y.z
x -> major version
y -> minor version
z -> patch version

rust rules

when the version is less than 1.0 => changing minor means breaking change, patch version means whatever you want

greater than 1.0 
major changes are breaking
minor => adding functionality
patch => fixing bugs

put versions in cargo.toml
