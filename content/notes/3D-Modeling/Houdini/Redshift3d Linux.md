---
title: "Redshift on linux"
tags: [CG, rendering, redshift, linux]
---

# Redshift 3d

setting up on linux some libraries are missing
libpng15.so.15
https://sourceforge.net/projects/libpng/files/libpng15/older-releases/1.5.15/

then you have to extract it and build it
 ./configure -> make -> make install
 
 ```bash
 now go to TERMINAL and type  
  

cd Downloads/libpng-1.5.15  
  
./configure --prefix=usr/local/libpng  
make check  
sudo make install  
make check

  
Congratulations you just installed the libpng  
  
Now we need to create a shortcut and put it in /usr/lib for any program that is depended on it to work  
  
In TERMINAL type:  

cd (only if you are not using a new terminal)  
sudo updatedb (this could take a few seconds)  
locate libpng (locate the ".../libpng15.so.15" line and COPY)  
  
now we will create a NEW LINK (shortcut) of that file to "/usr/lib/"  
  
sudo ln -s /usr/local/libpng/lib/libpng15.so.15 /usr/lib/libpng15.so.15

  
  
you can now successfully execute applications that require libpng15.so.15
```

after installing redshift tool still wont find it so you need to symlink the library to where redshift is looking


change the prefix to usr/lib directory
