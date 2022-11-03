---
title: "Change Symlink Bash"
tags: [bash,linux,snippets]
---


to update link, either delete the link and redo it. 
if you are linking to a folder use -n tag aswell

```bash
ln -sfn /a/new/path files
```

`-n` this option is necessary when linking to a different target to avoid a sub-folder inside that sym link and instead replaced the link.