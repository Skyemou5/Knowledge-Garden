---
title: "Solaris with Redshift on Linux"
tags: [solaris,redshift,rendering,houdini,linux]
---

To get redshift solaris working on linux you need to source it on the system level before opening houdini. 

In your *.bashrc* put these lines.

```bash
cd /opt/hfs19.5 && source houdini_setup_bash && cd

export PXR_PLUGINPATH_NAME=/usr/redshift/redshift4solaris/$HOUDINI_VERSION
```

Then you can run houdini from the terminal and it will work.

For multiple versions you can be explicit and say:
`export PXR_PLUGINPATH_NAME=/usr/redshift/redshift4solaris/<your_houdini_version>`

The only problem with this now is that you'll need to source houdini_setup first in bash_profile in order for $HOUDINI_VERSION to work.
