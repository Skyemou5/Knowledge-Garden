---
title: "Houdini Bash"
tags: [houdini,bash,linux]
---

https://www.youtube.com/watch?v=rY413t5fArw

```bash
# .bash_profile

# Get the aliases and functions
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi

# User specific environment and startup programs

# Source Houdini
cd /opt/hfs19.0 && source houdini_setup_bash && cd

export PXR_PLUGINPATH_NAME="/usr/redshift/redshift4solaris/$HOUDINI_VERSION"
#export PXR_PLUGINPATH_NAME="/usr/redshift/redshift4solaris/19.0.455"
#export LD_PRELOAD="/lib/x86_64-linux-gnu/libc_malloc_debug.so.0"
export HOU_ROOT="/cg/Houdini Projects"
export TEXTURE="/cg/Textures"
export HDA="/home/jonathan/Git Repos/Digital-Asset-Library"
PATH="/usr/redshift/bin:$PATH"
export HOUDINI_PATH="/usr/redshift/redshift4houdini/$HOUDINI_VERSION;&"
export OCIO="/home/jonathan/ACES/aces_1.2/config.ocio"
```