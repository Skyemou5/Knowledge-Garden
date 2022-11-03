---
title: "Setting up houdini for the command line"
tags: [houdini,unix,terminal]
---



![[notes/attachments/Pasted image 20220303193021.png]]

1. set up project paths
2. cd into houdini install dir
3. source terminal command
4. pull in vars from setup
5. save to env file
6. set up aliases
7. launch new shell with vars from env file
---
https://towardsdatascience.com/best-practices-for-setting-up-a-python-environment-d4af439846a

https://www.endpointdev.com/blog/2013/02/installing-python-in-local-directory/

https://joaoventura.net/blog/2016/embeddable-python-osx/

https://xon.sh/

Sounds like your houdini.env is not properly configured. Make sure your HOUDINI_OTLSCAN_PATH always ends with @/otls, and isn't redefined later by some other line. README.MD has detailed instructions on how to configure your environment.

Let me try to lay out some of the rules:  
- Houdini only expands environment variables in the hscript syntax. ie. $HOME, **not** the DOS syntax like %HOME%.  
- The path separators should be semi-colon (![](https://www.sidefx.com/static/djangobb_forum/img/smilies/wink.png) instead of colon (![](https://www.sidefx.com/static/djangobb_forum/img/smilies/smile.png). This works on all platforms. Linux/OSX happen to also accept colon (![](https://www.sidefx.com/static/djangobb_forum/img/smilies/smile.png) as well.  
- When you override a variable, you should have “&” in there somewhere so that the default path is still used. Depending on your shell, this is sometimes a special character, in which case you need to ensure that you set it with the correct escaping.  
- On Windows especially, make sure you launch Houdini from the shell you set the environment variable. You cannot set it into a shell and then expect the Start Menu > Houdini to see it.  
- You must set your environment variable *BEFORE* Houdini is loaded.  
- If you're using houdini.env (as an alternative), then you must use double quotes if your variable value contains spaces.