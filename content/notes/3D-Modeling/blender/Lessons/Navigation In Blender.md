---
title: "Navigation in Blender"
tags: [blender, navigation, UI]
---

Blender is a free and opensource 3D software that includes most tools for a standard animation pipeline. 

# Getting Your Footing

![[notes/attachments/blender_vanilla_startup.png]]

This is what you see when you open a default new blender config.

1. 3D Viewport
2. Outliner
3. Properties
4. Timeline
5. Main menu bar

There are many different windows and they can be found at the top-left of every window and switched:

![[notes/attachments/blender_window_types.png]]

The Blender hiarchy works like this

- Global
	- Windows
		- Selection
			- Context dependent Modes

Modes are a fundamental to working with blender. The first modes you will probably be most familar with are the mesh editing modes.

In the 3D viewport you have context depended modes based on the selection. However for the most part you will dealing with:

- Object Mode
- Edit Mode

Within edit mode there are context dependent modes based on the type of object selected.

For a standard mesh you can switch to the following editing modes:

- Edge
- Face
- Vertex

>[!NOTE] Other types of objects may have slightly different edit modes

For more background see [[notes/General/CG-Fundimentals/CG Fundimentals|CG Fundamentals]]

# Make Blender Fully Portable

If you want to run blender from your USB and have all of your settings follow you around you need to set up a few things.

Before that however you need to download the portable version of blender from blender.org.

![[notes/attachments/download_blender_portable.png]]

>[!NOTE] If you are on linux, the download from the website is *portable* by default. If you want a normal install then just install blender from your distros package-manager as usual.

>[!NOTE] I'm unsure about portable mode on mac

Once you download it you should extract the zip archive to your USB of choice.

Navigate to the blender folder you extracted then into the folder with the *version number*.

The path should look something like this:

`~/Blender-3.2.2/3.2`

Once inside that folder make sure the two following folders exist, and if they don't create them:

- config
- scripts

>[!NOTE] These are case sensitive


Now you have a working portable version of blender.


# Addons

>[!IMPORTANT] Before moving on, you should install the following addons!

Addons are python scripts that can extend blender in many ways.

Blender comes with many built-in addons. Before we install a new one let's make sure a few are enabled.

![[notes/attachments/blender_preferences.png]]

First navigate to the preferences from the edit menu.

Then find the tab named *addons*

![[notes/attachments/blender_addons_tab.png]]

Here you will see all the official addons that ship with blender. 

Let's turn on the following addons:

- Node Wrangler
- Magic UV
- Edit Mesh Tools
- Loop Tools
- Mesh: F2
- Import Images as Planes

Feel free to try out any you are interested in beyond this list.

Now for custom addons. There are few I want you to go download:

- [MACHIN3tools](https://machin3.gumroad.com/l/MACHIN3tools)
- [Mesh Check BGL Edition](https://pistiwique.gumroad.com/l/mesh_check_BGL_edition)
- [TexToolsr](https://github.com/SavMartin/TexTools-Blender)

For the github link do the following:

![[notes/attachments/Pasted image 20230222095255.png]]

Download the ZIP.

>[!WARNING] Once you download the ZIP **DO NOT** extract it. Unless the instructions say otherwise.

Now in the blender addon section of the preferences click the install button and find the *zip* file and install it.

Once it is installed click the checkbox to activate it.

# Hotkeys and the Blender Workflow

Unlike most other 3D applications blender is meant to be used by hitting chains of hotkeys. This is **By Far** the fastest and most efficient way to use blender. In many ways it is similar to using something *emacs* or *vim* for writing and coding. Eliminating time consuming clicks and navigating through menus with shortcut combinations is much better once you learn it.

>[!WARNING] Feel free to use the gizmos and menus, they are there for a reason. *However *make an effort to learn the hotkeys. In most cases the hotkeys are listed next to the menu item. You won't get better if you don't push yourself.



# Navigation

There is a lot to learn about navigating in blender. 

You can use *industry* hotkeys, however, I strongly advise against it. I think it will hold you back in the long run.

The reason being that blender is designed to work quickly and efficiently by minimizing clicks and menus and gizmos. Learning the blender way will make you much much more efficient. 

To this end, I will be focusing on the blender way to do things.

## Navigating the 3D Viewport

Let's start with the 3D viewport. You will be spending a large amount of time in the 3D viewport.


For standard 3D navigation blender uses a *middle click* scheme.

- `Middle-Click + Mouse Drag` => Orbit the camera

- `Middle-Click + SHIFT` => Pan the camera

- `Middke-Click + CNTRL` => Truck/zoom the camera

You can also do first person style navigation like in *Unreal Engine*:

- ![[notes/attachments/keys-color/shift-key-col.png|80]]+![[notes/attachments/keys-color/tilde-key-col.png|50]]=>first person style navigation

Focusing on objects is an important function for speed and efficiency. In the blender there are a few ways to do this:

-   `PERIOD(numpad)` => Focus on selection
- ![[notes/attachments/keys-color/forwardslash-question-key-col.png|50]] `forwardslash/questionmark`=> This will isolate the selected object into a new blank scene. (Much like `CNTRL+1` in maya)

## Edit Modes

First I will go through the vanilla way to do things, then I will talk about *Machin3tools*.

In your default scene you should have the *default cube* in the center. *Select* it with `Left Mouse Click` (Unless of course you are using right click select).

From here you can do a few things.

In the viewport the Mode menu is here:

![[notes/attachments/blender_mesh_mode_menu.png]]

You can select edit mode from here. However the better way to do this is simply by hitting `TAB`

>[!NOTE] The default behavior of `TAB` is to switch between the last used modes in case you are using a different mode.

The next best way to do this is by hitting the following hotkey:

- `CNTRL+TAB` => This will show a radial menu of all the modes.

![[notes/attachments/radial_modes_menu_blender.png]]

In radial menus you can do two things:

1. Just hit the hotkey then the radial menu will stay open and you can click an option.
2. Flick the mouse in the direction of an option right after you hit the hotkey and it will quickly switch you to that mode.

Before I talk about *Machin3tools* let's talk about the components in edit mode.

Once you are in edit mode of a mesh you have additional options to edit the different components of a mesh.

In vanilla blender you can switch through these in a few ways. 

![[notes/attachments/edit_mode_component_buttons_blender.png]]

You can click the buttons as shown above. This is slow and  inefficient however. So instead do the following:

The number keys `1 - 2 - 3` correspond the respective modes:

1. Vertex
2. Edge
3. Face

Now for *Machin3Tools*. Make sure you have it installed. 

Once you have it installed it will override the `TAB` functionality with a custom radial menu. This will make it even faster to edit in blender. Similar to the `RIGHT-CLICK Drag` in *Maya*.

![[notes/attachments/machin3tools_tab_menu_blender.png]]

1. toggles between `edit` mode like normal `TAB`
2. goes directly to `vertex` mode
3. goes directly to `edge` mode
4. goes directly to `face` mode
5. Grease pencil (`draw`) mode
6. `Texture Paint` mode
7. `Weight Paint` mode
8. `Vertex Paint` mode
9. `Sculpt` mode
10. `Object` mode
11. `Edit` mode

# Editing the Mesh

There are many operations you can do to edit the mesh. Let's start with the basics.

All edit operations start with selections.
