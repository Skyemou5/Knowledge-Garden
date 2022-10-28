---
tags: [houdini, vex, under-the-hood]
title: "About vex in houdini"
---

VEX is a so called SIMD architecture ([https://en.wikipedia.org/wiki/SIMD](https://en.wikipedia.org/wiki/SIMD)) (Single instructions, multiple Data). In basic terms that means the code is not run line by line, but kind of "at once" at the end (because it's faster that way). The problem with that is that you can't write attributes and read the (same, changed) attributes out in the same wrangle. The "result" is only there after it was run, not "during" its run. That's why it works with two wrangles, but not in one.

The good news - you don't have to. You already calculated your data, just reuse it. So just make sure you calculate the result with the same ingredients, for example:

`v@neut=v@P;`

`v@neut.y=y;`

And this will give you the correct result. You will actually always be able to do this, unless you create new points yourself. But even in that case you have to basically built in you own "memory" variables, so that you can keep track of the point data you create...and as long as you know that, it's not that hard.

[VEX Newbie Question : Houdini](https://www.reddit.com/r/Houdini/comments/h91aod/vex_newbie_question/)

