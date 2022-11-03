---
title: "Remove git submodule"
tags: [git]
---

# remove git submodule
Summary

The 3-steps removal process would then be:

0. mv a/submodule a/submodule_tmp

1. git submodule deinit -f -- a/submodule    
2. rm -rf .git/modules/a/submodule
3. git rm -f a/submodule

>[!Note]  a/submodule (no trailing slash)

# or, if you want to leave it in your working tree and have done step 0
3.   git rm --cached a/submodule
3bis mv a/submodule_tmp a/submodule


---
title: {title}
---



# Git Submodule

pull all git submodules in repo

```bash
git submodule update --recursive --remote
```
