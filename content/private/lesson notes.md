- Blender tips
- news of blender in industry
- what is post production
	- show some videos
- what is compositing?
	- video
	- demo
- Color management
	- color work
	- ACES


> I'm going to use VFX as an example because it's the most technical and once you know the principle of that you can understand all the other pipelines.


## Post-production vs post-processing

These two workflows are often referring to methods that achieve similar outcomes.
Post-processing typically refers to a layer of effects that run in a realtime engine. Where post-production is more robust and used for images and film.




# Post Production

[Introduction to Compositing in Blender - YouTube](https://www.youtube.com/watch?v=bIZrTXtyQkY)

[Blender Render Passes In Davinci Resolve & Fusion (EXR Compositing) - YouTube](https://www.youtube.com/watch?v=pLt1230dtYE)


# Compositing

[What is Compositing? VFX Compositing Techniques Explained](https://www.studiobinder.com/blog/what-is-compositing-definition/)

[VFX Games - The Art of Compositing - YouTube](https://www.youtube.com/watch?v=gYu4esqvnQ0)

[CG Compositing Series - 1.1 What And Why - YouTube](https://www.youtube.com/watch?v=8BDP5qNP7nw)

[Compositing for 3D artists - 03 - Compositing fundamentals (In fusion) - YouTube](https://www.youtube.com/watch?v=v2wfwoQ5dnY)

[Reactor 3 Release Announcement - We Suck Less](https://www.steakunderwater.com/wesuckless/viewtopic.php?f=32&t=3067)
[Steak Under Water - home of the We Suck Less Fusion forums](https://www.steakunderwater.com/)

[compositing for CG artists intro course](https://www.youtube.com/watch?v=4ViXzsgqte8&list=PLgYcMX8FouyYxGaU9hCeXnlIusEYD2Fkc)



# Color Management



[Introduction to ACES | Fusion, Resolve, AE - YouTube](https://www.youtube.com/watch?v=_MXNKCxgfSE)

ACES is a standardization of a way to interpret color from camera and from generated images. 
The two more common gamuts are sRGB for digital images and rec709 for film.

ACES standardizes a *wide color gamut* -> This is important because you have much more control over the data in your images.

> LEGO movie was one of the first to use ACES in a full production

## ACES and OCIO

ACES => Academy Color Encoding System [ACES | Oscars.org | Academy of Motion Picture Arts and Sciences](https://www.oscars.org/science-technology/sci-tech-projects/aces)
OCIO => OpenColorIO [OpenColorIO](https://opencolorio.org/)

OCIO uses the ACES standards.

### Getting things set up

1. download the OCIO configs github repo -> [GitHub - imageworks/OpenColorIO-Configs: Color Configurations for OpenColorIO](https://github.com/imageworks/OpenColorIO-Configs)
2. Add an enviornment variable pointing to the config you want to use ( Usually the latest one )
3. You may need to restart your computer especially if you are on windows.
4. 


# Color Grading

[Color Grading Basics: Understanding LIFT, GAMMA, & GAIN - YouTube](https://www.youtube.com/watch?v=Gz_QzBdHDYc)




# Exercise

- render passes
- render layers
- compositing nodes
- rebuild your beauty pass





[Compositing in Blender for Beginners (Tutorial) - YouTube](https://www.youtube.com/watch?v=xEpVyEi1Hts)


