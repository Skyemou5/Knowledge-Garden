---
title: "Check Current Terminal"
tags: [linux,bash,terminal,snippets]
---


```bash

basename "/"$(ps -f -p $(cat /proc/$(echo $)/stat | cut -d \  -f 4) | tail -1 | sed 's/^.* //')

```