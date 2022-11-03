---
title: "Fixing Redshift Linux"
tags: [redshift, linux, CG]
---

# Fixing Redshift

got an email about dependencies

Hi benjamin​   
  
You do not need to use the maxon App at all.  
That is only for newer redshift licenses.  
  
Can you Try:  
sudo apt update  
sudo apt install libpng12-0  
sudo apt install libqtcore4  
sudo apt install libqtgui4  
then run the redshiftLicensingTool

https://ubuntuhandbook.org/index.php/2020/07/install-qt4-ubuntu-20-04/

https://knowledge.autodesk.com/support/maya/learn-explore/caas/simplecontent/content/installing-maya-2020-ubuntu.html

Can you try the following?  
I think you'll indeed also need libpng15 for the new redshiftLicensingTool.  
This isn't supplied in a package anywhere so you have to build it yourself.  
These instructions might help. [https://knowledge.autodesk.com/support/maya/learn-explore/caas/simplecontent/content/installing-maya-2020-ubuntu.html](https://knowledge.autodesk.com/support/maya/learn-explore/caas/simplecontent/content/installing-maya-2020-ubuntu.html)  
You have to move the files "libpng15.a" "libpng15.so" "libpng15.so.15" and "libpng15.so.15.15.0" into /usr/lib/x86-64-gnu after building.

>! On POPOS the folder is x86-64-linux-gnu

http://pano.sentiovr.com/ - spaceengine cubemaps to sphere
https://paulbourke.net/panorama/cubemaps/
https://legacy.imagemagick.org/Usage/montage/